import ChatRoom from "@components/Chat/ChatRoom";
import Footer from "@components/Footer";

const Trip = () => {
  return (
    <div className="flex h-screen pt-(--header-height)">
      <ChatRoom />
      <div className="font-do flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 pl-[448px]">
        <div className="text-3xl">안녕</div>
        <Footer />
      </div>
    </div>
  );
};

export default Trip;
