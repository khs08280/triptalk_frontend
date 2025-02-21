import { Link, useLocation, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/hooks";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Message, MessagesResponse } from "@/api/ChatApi";
import { useInView } from "react-intersection-observer";
import formatDate from "@/utils/formatData";

const MESSAGE_SIZE = 30;

const Chatting = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>();

  const location = useLocation();
  const { title, location: tripLocation } = location.state;

  const { ref, inView } = useInView();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const newSocket = io("wss://localhost:9093", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect_success", (text: string) => {
      console.log(text);
    });
    setSocket(newSocket);

    newSocket.emit("join_room", { roomId, userId });
    newSocket.on("load_first_messages", (msgs: MessagesResponse) => {
      console.log(msgs);
      setMessages(msgs.messages);
      setNextCursor(msgs.nextPage);
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 10);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      if (msg.senderId === userId) {
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
          }
        }, 10);
      } else if (msg.senderId !== userId && !isAtBottom) {
        setShowNewMessage(true);
      }
    });

    socket.on("connect_error", (error: any) => {
      console.error("connection error", error);
    });

    return () => {
      socket.off("receive_message");
      socket.off("load_old_messages");
      socket.off("connect_error");
      socket.off("connect_success");
    };
  }, [socket, userId, isAtBottom]);

  const handleSendMessage = () => {
    if (!socket) return;
    if (!newMessage) return;
    socket.emit("send_message", {
      roomId,
      senderId: userId,
      message: newMessage,
    });
    setNewMessage("");
  };

  const handleScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
    setShowScrollButton(false);
    setShowNewMessage(false);
  };

  const getMoreMessages = () => {
    if (!socket || loadingRef.current || nextCursor == null) return;
    loadingRef.current = true;
    console.log("get메세지 실행");
    socket?.emit("get_more_messages", {
      roomId,
      oldestMessageId: nextCursor,
      size: MESSAGE_SIZE,
    });

    socket?.once("load_old_messages", (msgs: MessagesResponse) => {
      console.log(msgs);
      setNextCursor(msgs.nextPage);
      setMessages((prev) => {
        const newMessages = msgs.messages.filter(
          (newMessage) =>
            !prev.some(
              (existingMessage) => existingMessage.id === newMessage.id,
            ),
        );
        return [...newMessages, ...prev];
      });
      loadingRef.current = false;
    });
  };
  useEffect(() => {
    console.log(inView);
    if (inView) {
      getMoreMessages();
    }
  }, [inView]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const atBottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 200;
        setIsAtBottom(atBottom);
        setShowScrollButton(!atBottom);
        setShowNewMessage(false);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="fixed top-16 flex h-screen w-sm flex-col bg-gray-200">
      <header className="flex h-16 items-center justify-between bg-blue-300 p-4">
        <Link to="/trip">
          <ArrowBackIcon />
        </Link>
        <div className="flex flex-col items-center">
          <div className="text-xl">{title}</div>
          <div className="text-md">{tripLocation}</div>
        </div>
        <MenuRoundedIcon className="cursor-pointer" />
      </header>
      <main className="flex h-[calc(100vh-7rem)] flex-col">
        <div
          className="relative flex-grow overflow-y-auto p-4"
          ref={containerRef}
        >
          <div ref={ref} className="absolute top-40 h-1" />
          <div className="relative p-4">
            {messages.map((message) => {
              const isMyMessage = message.senderId === userId;
              return (
                <div key={message.id} className="mb-2 flex w-full flex-col">
                  <span
                    className={`mb-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {isMyMessage ? "" : message.nickname}
                  </span>
                  <div
                    className={`relative mb-1 w-fit max-w-3/4 rounded-xl p-3 py-1.5 ${
                      isMyMessage
                        ? "ml-auto bg-blue-300 before:absolute before:top-[10px] before:right-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-blue-300 before:border-r-transparent before:border-l-transparent"
                        : "mr-auto bg-red-200 before:absolute before:top-[10px] before:left-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-red-200 before:border-r-transparent before:border-l-transparent"
                    }`}
                  >
                    <div className="message-content break-words whitespace-pre-wrap text-gray-800">
                      {message.message}
                    </div>
                  </div>
                  <span
                    className={`text-sm opacity-50 ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {formatDate(message.sentAt)}
                  </span>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="relative flex flex-col">
          {showNewMessage && (
            <button
              onClick={handleScrollToBottom}
              className="absolute -top-15 right-40 cursor-pointer rounded bg-blue-500 px-2 py-1 text-white"
            >
              새 메시지 확인
            </button>
          )}
          {showScrollButton && (
            <button
              onClick={handleScrollToBottom}
              className="absolute -top-10 right-5 cursor-pointer rounded-full bg-blue-500 p-1 text-white opacity-90"
            >
              <ArrowDownwardRoundedIcon />
            </button>
          )}

          <div className="relative w-full">
            <textarea
              className="h-40 w-full resize-none bg-white p-4 pr-12 leading-5 outline-0"
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            ></textarea>
            <button
              className="absolute right-4 bottom-6 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleSendMessage}
            >
              전송
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatting;
