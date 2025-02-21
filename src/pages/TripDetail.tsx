import { searchNaver } from "@/api/SearchAPi";
import Chatting from "@components/Chat/Chatting";
import Footer from "@components/Footer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const TripDetail = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(() => {
    return searchNaver(searchText);
  }, []); // searchText가 변경될 때만 handleSearch 함수 재생성

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["searchList", searchText],
    queryFn: handleSearch,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 방지
    refetch(); // 검색 실행
  };
  return (
    <div className="flex h-screen pt-(--header-height)">
      <Chatting />
      <div className="font-do flex h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 pl-[448px]">
        <div className="flex flex-col items-center p-5">
          <form onSubmit={handleSubmit}>
            <div className="flex h-10 rounded-2xl bg-amber-300 px-4">
              <input
                className="w-3xl outline-0"
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="검색어를 입력하세요"
              />
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                type="submit"
                className="cursor-pointer"
              >
                <SearchRoundedIcon />
              </button>
            </div>
          </form>
          <div className="flex-colf flex">
            {data?.items.map((item) => <div>{item.title}</div>)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TripDetail;
