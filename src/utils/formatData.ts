export default function formatDate(dateString: string) {
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
