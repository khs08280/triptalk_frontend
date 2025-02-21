import api from "./api";

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
