import Chat from "@components/Chat/Chat";
import Footer from "@components/Footer";

const TripDetail = () => {
  return (
    <div className="flex h-screen pt-(--header-height)">
      <Chat />
      <div className="w-<> font-do flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 pl-[448px]">
        <div className="text-3xl">안녕</div>
        <Footer />
      </div>
    </div>
  );
};

export default TripDetail;
