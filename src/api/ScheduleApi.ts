import api from "./api";

export interface ScheduleTypes {
  id: number;
  tripId: number;
  date: string;
  name: string;
  placeResponseDto?: any;
  startTime: number[];
  endTime: number[];
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  data: ScheduleTypes[];
}

export interface ScheduleForm {
  tripId: number;
  date: string | null;
  name: string;
  startTime: string | null;
  endTime: string | null;
  memo: string;
}

export const createSchedule = async (data: ScheduleForm) => {
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

export const getSchedules = async (tripId: number) => {
  const response = await api.get<ScheduleResponse>(`/schedules/all/${tripId}`);
  return response.data;
};
