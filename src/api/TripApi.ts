import { Trip, Visibility } from "@/types";
import api from "./api";

export interface TripFormValues {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  visibility: Visibility;
}

export interface TripResponse {
  success: boolean;
  message: string;
  data: Trip;
}

export interface DeleteTripResponse {
  success: boolean;
  message: string;
  data: null;
}

export const createTrip = async (
  data: TripFormValues,
): Promise<TripResponse> => {
  const response = await api.post("/trips", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Signup failed");
  }
  return response.data;
};

export const getTripData = async (tripId: number | undefined) => {
  const response = await api.get<TripResponse>(`/trips/${tripId}`);
  console.log(response.data);
  return response.data;
};

export const deleteTrip = async (tripId: number | undefined) => {
  const response = await api.delete<DeleteTripResponse>(`/trips/${tripId}`);
  return response.data;
};
