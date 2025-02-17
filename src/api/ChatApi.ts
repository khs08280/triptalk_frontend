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

interface MessagesResponse {
  messages: Message[];
  nextPage: number | null;
}

interface GetMessagesParams {
  pageParam?: number;
  queryKey: string[];
}

// API 호출 함수: pageParam을 사용해 페이지별 데이터를 가져옴
export const getMessages = async ({
  pageParam,
  queryKey,
}: GetMessagesParams): Promise<MessagesResponse> => {
  // queryKey 배열의 두 번째 요소가 roomId입니다.
  const roomId = queryKey[1];
  const response = await api.get<MessagesResponse>("/chatMessages", {
    params: {
      roomId,
      page: pageParam,
    },
  });
  return response.data;
};
