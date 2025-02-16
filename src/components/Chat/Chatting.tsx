import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
const messages = [
  { id: 1, senderId: "user1", text: "안녕하세요!", timestamp: "10:00 AM" },
  {
    id: 2,
    senderId: "user2",
    text: "반갑습니다. 긴 메시지 테스트.....................................................................................",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    senderId: "user1",
    text: "오늘 날씨가 좋네요.",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    senderId: "user2",
    text: "반갑습니다",
    timestamp: "10:01 AM",
  },
  { id: 5, senderId: "user1", text: "안녕하세요!", timestamp: "10:00 AM" },
  {
    id: 6,
    senderId: "user2",
    text: "반갑습니다. 긴 메시지 테스트.....................................................................................",
    timestamp: "10:01 AM",
  },
  {
    id: 7,
    senderId: "user1",
    text: "오늘 날씨가 좋네요.",
    timestamp: "10:05 AM",
  },
  {
    id: 8,
    senderId: "user2",
    text: "반갑습니다",
    timestamp: "10:01 AM",
  },
  {
    id: 9,
    senderId: "user1",
    text: "오늘 날씨가 좋네요.",
    timestamp: "10:05 AM",
  },
  {
    id: 10,
    senderId: "user2",
    text: "반갑습니다",
    timestamp: "10:01 AM",
  },
];

const myUserId = "user1";
const Chatting = () => {
  return (
    <div className="fixed top-16 flex h-screen w-md flex-col bg-amber-600">
      <header className="flex justify-between bg-blue-300 p-4">
        <Link to="/trip">
          <ArrowBackIcon />
        </Link>
        <div className="text-xl">채팅 제목</div>
        <MenuRoundedIcon />
      </header>
      <main className="flex-grow p-4 pr-2">
        <div className="mb-2 flex h-[39rem] flex-col space-y-4 overflow-y-auto p-4">
          <div className="p-4">
            {messages.map((message) => {
              const isMyMessage = message.senderId === myUserId;
              return (
                <div
                  key={message.id}
                  className={`relative mb-4 w-3/4 rounded-xl p-3 ${
                    isMyMessage
                      ? "ml-auto bg-blue-300 before:absolute before:top-[10px] before:right-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-blue-300 before:border-r-transparent before:border-l-transparent"
                      : "mr-auto bg-gray-200 before:absolute before:top-[10px] before:left-[-10px] before:rotate-[0deg] before:rounded-sm before:border-[12px] before:border-transparent before:border-t-gray-200 before:border-r-transparent before:border-l-transparent"
                  }`}
                >
                  <div className="message-content break-words whitespace-pre-wrap text-gray-800">
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <textarea className="h-30 w-full bg-white p-4"></textarea>
      </main>
    </div>
  );
};

export default Chatting;
