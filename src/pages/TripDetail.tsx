import Chat from "@components/Chat/Chat";
import Footer from "@components/Footer";
import { Link } from "react-router-dom";

const TripDetail = () => {
  return (
    <div className="flex h-screen pt-(--header-height)">
      <Chat />
      <div className="w-<> flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 pl-[448px]">
        <Link
          to="/tripCreate"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          여행 생성하기
        </Link>
        <div className="text-3xl">dfdf</div>
        <Footer />
      </div>
    </div>
  );
};

export default TripDetail;
