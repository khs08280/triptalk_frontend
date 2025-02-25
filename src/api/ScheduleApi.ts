import api from "./api";

interface CreateScheduleProps {
  tripId: number;
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  memo: string;
}

export const createSchedule = async (data: CreateScheduleProps) => {
  const response = await api.post("/schedules", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data;
};
