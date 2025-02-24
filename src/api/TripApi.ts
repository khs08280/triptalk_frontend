import api from "./api";

export interface TripFormValues {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  visibility: Visibility;
}

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface TripResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    visibility: Visibility;
    creatorNickname: string;
    createdAt: string;
    updatedAt: string;
  };
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
export interface DeleteTripResponse {
  success: boolean;
  message: string;
  data: null;
}

export const deleteTrip = async (tripId: number | undefined) => {
  const response = await api.delete<DeleteTripResponse>(`/trips/${tripId}`);
  return response.data;
};
