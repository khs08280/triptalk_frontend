// ChatRoomLi.tsx
import { ChatRoom } from "@/api/ChatApi";
import { useNavigate } from "react-router-dom";
import { setCurrentChatRoom } from "@/features/auth/chatRoomSlice";
import { useAppDispatch } from "@/store/hooks";

const ChatRoomLi = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setCurrentChatRoom(chatRoom));
    navigate(`/trip/${chatRoom.chatRoomId}`, {
      state: { title: chatRoom.title, location: chatRoom.location },
    });
  };

  return (
    <li
      key={chatRoom.chatRoomId}
      className="flex w-full cursor-pointer justify-between border-b-2 border-gray-300 bg-blue-200 p-4 py-8 transition-all hover:bg-blue-300"
      onClick={handleClick}
    >
      <span>{chatRoom.title}</span>
      <span>{chatRoom.location}</span>
    </li>
  );
};

export default ChatRoomLi;
