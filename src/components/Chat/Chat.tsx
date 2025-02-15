import { ChatRoomResponse, getChatRooms } from "@/api/ChatApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Chat = () => {
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
    return <div>Loading...</div>; // 로딩 처리
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // 에러 처리
  }
  console.log(chatRooms);

  return (
    <div className="fixed top-16 h-screen w-md bg-amber-600 p-4">
      <div className="text-xl">채팅</div>
      <div className="flex justify-center">
        <Link
          to="create"
          className="flex w-full items-center rounded border-2 border-blue-600 bg-white px-4 py-2 hover:bg-blue-200"
        >
          <span className="material-symbols-outlined mr-4">add_circle</span>
          여행계획과 채팅방 생성하기
        </Link>
      </div>

      {chatRooms && chatRooms.data.length > 0 ? (
        <ul>
          {chatRooms.data.map((room) => (
            <li key={room.chatRoomId}>
              <Link to={`/trip/${room.tripId}`}>{room.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>채팅방이 없습니다.</div>
      )}
    </div>
  );
};

export default Chat;
