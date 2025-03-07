import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="flex h-screen justify-center bg-gray-200 pt-(--header-height)">
      <div className="mt-24 flex w-6xl flex-col items-center rounded-xl border-2 border-blue-400 bg-blue-200 p-10">
        <h2 className="mb-7 text-4xl">
          실시간으로 채팅하며 여행 계획을 세워 보세요
        </h2>
        <div className="flex items-center justify-center rounded-xl bg-blue-300 px-8 py-3">
          <Link to={"/login"}>
            <span className="text-2xl">여행 계획 만들기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
