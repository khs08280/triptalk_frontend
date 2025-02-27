import { getTripData } from "@/api/TripApi";
import { useAppSelector } from "@/store/hooks";
import {
  formatTime,
  formatTripDate,
  getDatesBetween,
} from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import DateTabs from "./Datetab";
import { useEffect, useState } from "react";
import { getSchedules, ScheduleTypes } from "@/api/ScheduleApi";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const Schedule = () => {
  const [date, setDate] = useState("");
  const [schedules, setSchedules] = useState<ScheduleTypes[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const tripId = useAppSelector(
    (state) => state.chatroom.currentChatRoom?.tripId,
  );

  const { data, isPending } = useQuery({
    queryKey: ["tripData", tripId],
    queryFn: () => getTripData(tripId),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    if (tripId == undefined) {
      return;
    }
    const fetch = async () => {
      const data = await getSchedules(tripId);
      setSchedules(data.data);
      console.log(data);
    };
    fetch();
  }, []);

  const startDate = data?.data.startDate
    ? formatTripDate(data.data.startDate)
    : null;
  const endDate = data?.data.endDate ? formatTripDate(data.data.endDate) : null;
  const dates: string[] =
    startDate && endDate ? getDatesBetween(startDate, endDate) : [];

  // 선택된 날짜에 따라 schedules 필터링
  const filteredSchedules = date
    ? schedules.filter(
        (schedule) => `${schedule.date[1]}.${schedule.date[2]}` === date,
      )
    : schedules;

  useEffect(() => {
    if (dates && dates.length > 0) {
      setDate(dates[0]);
    }
  }, []);

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
          <Timeline>
            {filteredSchedules.length === 0 ? (
              <div className="pt-5 text-center">
                해당 날짜에 일정이 없습니다.
              </div>
            ) : (
              <div className="pt-5">
                {filteredSchedules.map((schedule) => (
                  <TimelineItem className="" key={schedule.id}>
                    <TimelineOppositeContent color="text.secondary">
                      {formatTime(schedule.startTime)}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{schedule.name}</TimelineContent>
                  </TimelineItem>
                ))}
              </div>
            )}
          </Timeline>
        </div>
      )}
    </div>
  );
};

export default Schedule;
