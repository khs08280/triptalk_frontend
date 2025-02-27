import { SearchNaver } from "@/api/SearchAPi";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Suspense, useState } from "react";
import SearchDetail from "./SearchDetail";
import { Box } from "@mui/material";
import ScheduleCreateModal from "./ScheduleCreateModal";
interface SearchProps {
  key: number;
  item: SearchNaver;
}

const SearchLi = ({ item, key }: SearchProps) => {
  const title = item.title.replace(/<[^>]*>/g, "");
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <Box className="flex flex-col items-center">
      <div className="flex w-6xl items-center justify-between border-2 border-blue-200 bg-amber-200 p-4 transition-colors hover:bg-amber-300">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="mr-5 text-2xl">{title}</span>
            <span className="opacity-50">{item.category}</span>
          </div>
          <span>{item.roadAddress}</span>
        </div>
        <div className="flex">
          <ScheduleCreateModal selectName={item.title} />
          <KeyboardArrowDownRoundedIcon
            className="cursor-pointer"
            onClick={toggleMap}
          />
        </div>
      </div>
      {isMapVisible && (
        <div className="flex items-center justify-center">
          <Suspense fallback={<div>Loading map...</div>}>
            <SearchDetail item={item} key={key} />
          </Suspense>
        </div>
      )}
    </Box>
  );
};

export default SearchLi;
