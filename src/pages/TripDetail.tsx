import { searchNaver, SearchNaverResponse } from "@/api/SearchAPi";
import Chatting from "@components/Chat/Chatting";
import Footer from "@components/Footer";
import SearchLi from "@components/SearchLi";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";

const TripDetail = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] =
    useState<SearchNaverResponse | null>(null);

  const handleSearch = useCallback(async (searchText: string) => {
    try {
      const response = await searchNaver(searchText);
      setSearchResults(response);
      return response;
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      throw error;
    }
  }, []);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["searchList", searchText],
    queryFn: async () => {
      const data = await handleSearch(searchText);
      return data;
    },
    enabled: false, // 자동 쿼리 실행 비활성화
    staleTime: 1000 * 60 * 5,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchText.trim() !== "") {
      refetch(); // refetch만 호출
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex pt-(--header-height)">
      <Chatting />
      <div className="font-do flex min-h-screen grow-1 flex-col justify-between place-self-end bg-blue-400 pt-16 pl-[384px]">
        <div className="flex flex-col items-center p-5">
          <div className="mb-10 flex h-10 rounded-2xl bg-amber-300 px-4">
            <input
              className="w-3xl outline-0"
              type="text"
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="검색어를 입력하세요"
            />
            <button
              onClick={handleSearchClick}
              disabled={isLoading}
              type="button"
              className="cursor-pointer"
            >
              <SearchRoundedIcon />
            </button>
          </div>
          <div className="flex w-full flex-col items-center">
            {searchResults?.items ? (
              searchResults.items.map((item, index) => (
                <SearchLi key={index} item={item} />
              ))
            ) : (
              <div>
                {isLoading
                  ? "로딩 중..."
                  : isError
                    ? "검색 중 오류 발생"
                    : "검색어를 입력하세요."}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TripDetail;
