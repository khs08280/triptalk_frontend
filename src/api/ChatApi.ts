import { User } from "@/types";
import api from "./api";
import axios from "axios";

export interface ChatRoomResponse {
  success: boolean;
  message: string;
  data: [ChatRoom];
}
export interface ChatRoom {
  chatRoomId: number;
  tripId: number;
  title: string;
  location: string;
}

export const getChatRooms = async (): Promise<ChatRoomResponse> => {
  // 반환 타입 명시
  const response = await api.get<ChatRoomResponse>("/chatRooms"); // 응답 데이터 타입 명시
  return response.data;
};

export interface Message {
  id: number;
  roomId: number;
  senderId: number;
  nickname: string;
  message: string;
  sentAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  nextPage: number | null;
}
export interface ChatRoomUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export const getChatRoomUsers = async (
  roomId: string | undefined,
): Promise<ChatRoomUsersResponse> => {
  try {
    const response = await api.get<ChatRoomUsersResponse>(
      `/chatRooms/${roomId}/users`,
    );
    return response.data;
  } catch (error) {
    console.error(error);

    let errorMessage = "An unexpected error occurred.";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || "Server error";
      } else if (error.request) {
        errorMessage = "Network error.  Please check your internet connection.";
      } else {
        errorMessage = "Request setup error.";
      }
    }

    return {
      success: false,
      message: errorMessage,
      data: [],
    };
  }
};
