import { ChatRoomResponse, getChatRooms } from "@/api/ChatApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ChatRoomLi from "./ChatRoomLi";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleChatRoomOpen } from "@/features/auth/chatRoomSlice";

const ChatRoom = () => {
  const isChatRoomOpen = useAppSelector(
    (state) => state.chatroom.isChatRoomOpen,
  );
  const dispatch = useAppDispatch();
  const {
    data: chatRooms,
    isLoading,
    isError,
    error,
  } = useQuery<ChatRoomResponse, Error>({
    queryKey: ["chatList"],
    queryFn: getChatRooms,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const ChatRoomToggleClick = () => {
    dispatch(toggleChatRoomOpen());
  };

  return (
    <div className="flex h-screen pt-[--header-height]">
      {isChatRoomOpen && (
        <div className="fixed top-16 h-screen w-sm bg-green-500 p-4">
          <div className="mb-5 text-2xl">채팅방 목록</div>
          <div className="flex justify-center">
            <Link
              to="/create"
              className="flex w-full items-center rounded border-2 border-blue-600 bg-white px-4 py-2 hover:bg-blue-200"
            >
              <ControlPointRoundedIcon className="mr-2" />
              여행계획과 채팅방 생성하기
            </Link>
          </div>

          {chatRooms && chatRooms.data.length > 0 ? (
            <ul>
              {chatRooms.data.map((room) => (
                <ChatRoomLi key={room.chatRoomId} chatRoom={room} />
              ))}
            </ul>
          ) : (
            <div>채팅방이 없습니다.</div>
          )}
          <div
            onClick={ChatRoomToggleClick}
            className="absolute top-0 -right-10 cursor-pointer bg-white p-2"
          >
            <ChatRoundedIcon />
          </div>
        </div>
      )}
      {!isChatRoomOpen && (
        <div
          onClick={ChatRoomToggleClick}
          className="fixed top-16 left-0 cursor-pointer bg-white p-2"
        >
          <ChatRoundedIcon />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
