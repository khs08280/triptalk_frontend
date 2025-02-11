import Chat from "@components/Chat/Chat";
import Footer from "@components/Footer";

const LoggedInHome = () => {
  return (
    <div className="h-screen flex">
      <Chat />
      <div className="flex grow-1 flex-col place-self-end bg-blue-400 w-<> h-screen pl-[448px] pt-16 justify-between">
        <div className="text-3xl">dfdf</div>
        <Footer />
      </div>
    </div>
  );
};

export default LoggedInHome;
