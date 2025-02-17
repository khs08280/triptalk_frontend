import { ChatRoom } from "@/api/ChatApi";
import { Link } from "react-router-dom";

const ChatRoomLi = (chatRoom: ChatRoom) => {
  return (
    <Link to={`/trip/${chatRoom.chatRoomId}`}>
      <li
        key={chatRoom.chatRoomId}
        className="flex w-full justify-between border-b-2 border-gray-300 bg-amber-200 p-2 py-4 transition-all hover:bg-amber-300"
      >
        <span>{chatRoom.title}</span>
        <span>{chatRoom.location}</span>
      </li>
    </Link>
  );
};

export default ChatRoomLi;
