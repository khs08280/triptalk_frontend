import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

export function formatChatDate(dateString: string | undefined) {
  if (dateString == undefined) {
    console.log("날짜 변환 데이터가 올바르지 않습니다.");
    return;
  }
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 0부터 시작하므로 1을 더함
  const day = date.getDate();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const monthName = monthNames[month - 1];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];

  const formattedDate = `${monthName} ${day}일 ${hours}:${minutes} (${dayName})`;
  return formattedDate;
}

export function formatTripDate(dateArray: string[] | undefined): string {
  if (!dateArray || dateArray.length < 3) {
    return "날짜 없음";
  }

  // 숫자만 포함하는지 확인.  문자열 배열 각 요소 검사
  if (!dateArray.every((part) => /^\d+$/.test(part))) {
    return "잘못된 날짜 형식";
  }

  // 연도, 월, 일 추출 (배열 인덱스 사용)
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  // 월과 일이 유효한 범위를 가지는지 확인.  문자열이므로 parseInt()로 숫자 변환
  const numMonth = parseInt(month, 10);
  const numDay = parseInt(day, 10);
  if (numMonth < 1 || numMonth > 12 || numDay < 1 || numDay > 31) {
    return "잘못된 날짜";
  }

  // padStart를 사용하여 월과 일이 한 자리 수인 경우 앞에 0을 붙입니다.
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  // parse 함수를 사용하여 Date 객체로 변환
  const parsedDate = parse(
    `${year}${paddedMonth}${paddedDay}`,
    "yyyyMMdd",
    new Date(),
  );

  // isValid 함수를 사용하여 날짜가 유효한지 검사. parse()는 invalid date를 반환할 수 있음
  if (isNaN(parsedDate.getTime())) {
    return "잘못된 날짜"; // getTime()이 NaN이면 유효하지 않은 날짜
  }

  // format 함수를 사용하여 원하는 형식으로 변환
  return format(parsedDate, "yyyy-MM-dd", { locale: ko });
}

export function getDatesBetween(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check for invalid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return []; // Return empty array for invalid input
  }
  //Ensure start date is before end date
  if (start > end) {
    return [];
  }

  const dates: string[] = [];
  const currentDate = new Date(start); // Create a *copy* to avoid modifying the original start date

  while (currentDate <= end) {
    // Format the date as "M.DD" (e.g., "2.20", "12.05")
    const formattedDate = `${currentDate.getMonth() + 1}.${String(currentDate.getDate()).padStart(2, "0")}`;
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1); // Increment to the next day
  }

  return dates;
}
export function formatTime(timeArray: number[]) {
  if (!Array.isArray(timeArray) || timeArray.length !== 2) {
    return "Invalid input"; // 입력값이 배열이 아니거나, 길이가 2가 아니면 에러 처리
  }

  let hour = timeArray[0];
  const minute = timeArray[1];

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return "Invalid time"; // 유효하지 않은 시간/분 범위
  }

  const period = hour < 12 ? "오전" : "오후"; // 오전/오후 판별
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12시간제로 변환 (0시는 12시로)
  const formattedMinute = minute.toString().padStart(2, "0"); // 분을 두 자리 문자열로 (0~9분 앞에 0 붙임)

  return `${period} ${formattedHour}시 ${formattedMinute}분`;
}
