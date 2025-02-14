import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="flex h-screen justify-center bg-gray-200 pt-16">
      <div className="mt-24 flex w-6xl flex-col items-center rounded-xl border-2 border-blue-600 bg-amber-300 p-10">
        <h2 className="mb-7 text-4xl">
          실시간으로 채팅하며 여행 계획을 세워 보세요
        </h2>
        <div className="flex items-center justify-center rounded-xl bg-blue-300 px-8 py-3">
          <Link to={"/tripCreate"}>
            <span className="text-2xl">여행 계획 만들기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
