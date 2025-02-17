import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/hooks";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { getMessages, Message } from "@/api/ChatApi";
import { useInfiniteQuery } from "@tanstack/react-query";

const Chatting = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const userId = useAppSelector((state) => state.auth.user?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("wss://localhost:9093", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socket?.on("connect_success", (text: string) => {
      console.log(text);
    });
    setSocket(newSocket);

    newSocket.emit("join_room", { roomId, userId });

    // load_old_messages 이벤트 수신 (기존 메시지 로드)
    newSocket.on("load_old_messages", (lastMessages: Message[]) => {
      setMessages((prev) => [...prev, ...lastMessages]);
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "instant" });
        }
      }, 1);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제 (클린업)
    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log(msg.senderId, userId, isAtBottom);
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

    // 클린업: 이벤트 리스너 제거
    return () => {
      socket.off("receive_message");
      socket.off("load_old_messages");
      socket.off("connect_error");
      socket.off("connect_success");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!socket) return;
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

  interface InfiniteMessagesProps {
    roomId: string;
  }

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", roomId],
    queryFn: getMessages,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
  data;

  return (
    <div className="fixed top-16 flex h-screen w-md flex-col bg-amber-600">
      <header className="flex justify-between bg-blue-300 p-4">
        <Link to="/trip">
          <ArrowBackIcon />
        </Link>
        <div className="text-xl">{userId}</div>
        <MenuRoundedIcon />
      </header>
      <main className="flex-grow px-4 pr-1 pb-0">
        <div
          className="flex h-[34rem] flex-col space-y-4 overflow-y-auto p-4"
          ref={containerRef}
        >
          <div className="relative p-4">
            {messages.map((message) => {
              const isMyMessage = message.senderId === userId;
              return (
                <div className="flex w-full flex-col">
                  <span
                    className={`mb-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {message.senderId}
                  </span>
                  <div
                    key={message.id}
                    className={`relative mb-1 w-fit max-w-3/4 rounded-xl p-3 ${
                      isMyMessage
                        ? "ml-auto bg-blue-300 before:absolute before:top-[10px] before:right-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-blue-300 before:border-r-transparent before:border-l-transparent"
                        : "mr-auto bg-gray-200 before:absolute before:top-[10px] before:left-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-gray-200 before:border-r-transparent before:border-l-transparent"
                    }`}
                  >
                    <div className="message-content break-words whitespace-pre-wrap text-gray-800">
                      {message.message}
                    </div>
                  </div>
                  <span
                    className={`text-sm opacity-50 ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {message.sentAt}
                  </span>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="relative flex flex-col pr-3">
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
              className="absolute -top-10 right-5 cursor-pointer rounded-full bg-blue-500 p-1 text-white opacity-70"
            >
              <ArrowDownwardRoundedIcon />
            </button>
          )}

          <textarea
            className="h-34 w-full bg-white p-4"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleSendMessage}
          >
            전송
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chatting;
