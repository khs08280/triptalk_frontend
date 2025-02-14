import Chat from "@components/Chat/Chat";
import Footer from "@components/Footer";

const LoggedInHome = () => {
  return (
    <div className="flex h-screen">
      <Chat />
      <div className="w-<> flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-(--header-height) pl-[448px]">
        <div className="text-3xl">dfdf</div>
        <Footer />
      </div>
    </div>
  );
};

export default LoggedInHome;
