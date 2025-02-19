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
  message: string;
  sentAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  nextPage: number | null;
}

interface GetMessagesParams {
  pageParam?: number;
  queryKey: (string | undefined)[];
}

export const getMessages = async ({
  pageParam = 0, // ✅ 기본값 설정
  queryKey,
}: GetMessagesParams): Promise<MessagesResponse> => {
  const [, roomId] = queryKey;
  // ✅ pageParam을 사용하여 요청
  const response = await api.get<MessagesResponse>(`/chatMessages/${roomId}`, {
    params: {
      page: pageParam,
    },
  });
  return response.data;
};
