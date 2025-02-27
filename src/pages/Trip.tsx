import { useAppSelector } from "@/store/hooks";
import ChatRoom from "@components/Chat/ChatRoom";
import Footer from "@components/Footer";

const Trip = () => {
  const isChatRoomOpen = useAppSelector(
    (state) => state.chatroom.isChatRoomOpen,
  );

  const getPaddingLeftClass = () => {
    return isChatRoomOpen ? "pl-(--side-padding)" : "pl-0";
  };
  return (
    <div className="flex h-screen pt-(--header-height)">
      <ChatRoom />
      <div
        className={`font-do flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 ${getPaddingLeftClass()}`}
      >
        <div className="text-3xl">안녕</div>
        <Footer />
      </div>
    </div>
  );
};

export default Trip;
