import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/hooks";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Message, MessagesResponse } from "@/api/ChatApi";
import { useInView } from "react-intersection-observer";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const Chatting = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setTimeout(handleScrollToBottom, 50);
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
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("receive_message", (msg: Message) => {
  //     queryClient.setQueryData<InfiniteData<MessagesResponse>>(
  //       ["messages", roomId],
  //       (oldData) => {
  //         if (!oldData) {
  //           return {
  //             pages: [{ messages: [msg], hasMore: true }],
  //             pageParams: [null],
  //           };
  //         }

  //         const newPages = [...oldData.pages];
  //         if (newPages.length > 0) {
  //           newPages[newPages.length - 1] = {
  //             ...newPages[newPages.length - 1],
  //             messages: [...newPages[newPages.length - 1].messages, msg],
  //             hasMore: newPages[newPages.length - 1].hasMore, // hasMore 값을 유지
  //           };
  //         } else {
  //           newPages.push({ messages: [msg], hasMore: true });
  //         }
  //         return {
  //           ...oldData,
  //           pages: newPages,
  //           pageParams: [...oldData.pageParams],
  //         }; // pageParams도 복사
  //       },
  //     );

  //     if (msg.senderId === userId) {
  //       setTimeout(() => {
  //         if (messagesEndRef.current) {
  //           messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //         }
  //       }, 0);
  //     } else if (!isAtBottom) {
  //       setShowNewMessage(true);
  //     }
  //   });

  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, [socket, userId, isAtBottom, roomId, queryClient]);

  // const fetchMessages = async (
  //   context: QueryFunctionContext<
  //     ["messages", string | undefined],
  //     string | null
  //   >,
  // ): Promise<MessagesResponse> => {
  //   const { pageParam } = context;
  //   return new Promise((resolve, reject) => {
  //     if (!socket || !roomId) {
  //       resolve({ messages: [], hasMore: false });
  //       return;
  //     }
  //     // roomId가 undefined가 아님을 명시적으로 나타냄 (타입 가드)
  //     socket.emit("get_more_messages", {
  //       roomId: roomId,
  //       oldestMessageId: pageParam,
  //     });

  //     socket.once("load_old_messages", (data: MessagesResponse) => {
  //       resolve(data);
  //     });

  //     setTimeout(() => {
  //       reject(new Error("Timeout"));
  //     }, 5000);
  //   });
  // };

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery<MessagesResponse, Error>({
  //   queryKey: ["messages", roomId],
  //   queryFn: fetchMessages, // roomId 제거
  //   initialPageParam: null,
  //   getNextPageParam: (lastPage) => {
  //     return lastPage.messages.length > 0
  //       ? lastPage.messages[lastPage.messages.length - 1].id
  //       : undefined;
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: !!roomId,
  // });

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      isFirstRender.current = false;
    }
  }, []);

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
          <div ref={ref} className="h-1" />
          <div className="relative p-4">
            {messages.map((message) => {
              const isMyMessage = message.senderId === userId;
              return (
                <div key={message.id} className="flex w-full flex-col">
                  <span
                    className={`mb-1 ${isMyMessage ? "ml-auto" : "mr-auto"}`}
                  >
                    {message.senderId}
                  </span>
                  <div
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
              className="absolute -top-10 right-5 cursor-pointer rounded-full bg-blue-500 p-1 text-white opacity-90"
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
