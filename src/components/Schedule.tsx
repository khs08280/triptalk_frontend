import { getTripData } from "@/api/TripApi";
import { useAppSelector } from "@/store/hooks";
import { formatTripDate, getDatesBetween } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import DateTabs from "./Datetab";
import { useState } from "react";

const Schedule = () => {
  const [date, setDate] = useState("");
  const tripId = useAppSelector(
    (state) => state.chatroom.currentChatRoom?.tripId,
  );

  const { data, isPending } = useQuery({
    queryKey: ["tripData", tripId],
    queryFn: () => getTripData(tripId),
  });

  const startDate = formatTripDate(data?.data.startDate);
  const endDate = formatTripDate(data?.data.endDate);
  const dates: string[] = getDatesBetween(startDate, endDate);
  return (
    <div className="fixed top-[--header-height] left-(--side-padding) flex h-screen w-sm flex-col bg-red-200">
      <header className="flex h-16 w-full items-center justify-center bg-gray-200 p-4">
        <span className="text-xl">여행 계획</span>
      </header>
      {isPending ? (
        <span>로딩 중...</span>
      ) : (
        <div className="">
          <section className="flex flex-col p-4">
            <span>여행 제목: {data?.data.title}</span>
            <span>
              여행 기간: {startDate} ~ {endDate}
            </span>
            <span>여행 장소: {data?.data.location}</span>
            <span>여행 계획자: {data?.data.creatorNickname}</span>
            <span>
              공개/비공개 :{" "}
              {data?.data.visibility == "PRIVATE" ? "비공개" : "공개"}
            </span>
          </section>
          <div>
            <DateTabs date={date} setDate={setDate} dates={dates} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
