import { SearchNaver } from "@/api/SearchAPi";
import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

interface SearchDetailProps {
  item: SearchNaver;
}

const NaverMap = React.lazy(() => import("./NaverMap"));

const SearchDetail = ({ item }: SearchDetailProps) => {
  const title = item.title.replace(/<[^>]*>/g, "");

  return (
    <section className="w-6xl border-2 border-gray-200 bg-white p-5">
      <div className="mb-2 flex flex-col space-y-2 text-2xl">
        <span className="">장소 이름 : {title}</span>
        <span>도로명 주소: {item.roadAddress}</span>
        <span className="text-xl">카테고리: {item.category}</span>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<CircularProgress />}>
          <NaverMap
            mapx={item.mapx}
            mapy={item.mapy}
            title={title}
            address={item.address}
            category={item.category}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default SearchDetail;
