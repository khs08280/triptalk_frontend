const LoggedOutHome = () => {
  return (
    <div className="pt-16 h-screen bg-gray-200 flex justify-center ">
      <div className="flex flex-col items-center w-6xl bg-amber-300 p-10 border-2 border-blue-600 rounded-xl mt-24">
        <h2 className="text-4xl mb-7">
          실시간으로 채팅하며 여행 계획을 세워 보세요
        </h2>
        <div className="flex justify-center items-center bg-blue-300 px-8 py-3 rounded-xl">
          <span className="text-2xl">여행 계획 만들기</span>
        </div>
      </div>
    </div>
  );
};

export default LoggedOutHome;
