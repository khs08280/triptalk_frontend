import { SearchNaver } from "@/api/SearchAPi";
import React, { Suspense } from "react";

interface SearchDetailProps {
  item: SearchNaver;
}

const NaverMap = React.lazy(() => import("./NaverMap"));

const SearchDetail = ({ item }: SearchDetailProps) => {
  const title = item.title.replace(/<[^>]*>/g, "");

  return (
    <section className="w-6xl border-2 border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-2xl">장소 이름 : {title}</h2>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<div>Loading Map...</div>}>
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
