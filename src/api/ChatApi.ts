import api from "./api";

export interface ChatRoomResponse {
  success: boolean;
  message: string;
  data: [
    {
      chatRoomId: number;
      tripId: number;
      title: string;
    },
  ];
}

export const getChatRooms = async (): Promise<ChatRoomResponse> => {
  // 반환 타입 명시
  const response = await api.get<ChatRoomResponse>("/chatRooms"); // 응답 데이터 타입 명시
  return response.data;
};
