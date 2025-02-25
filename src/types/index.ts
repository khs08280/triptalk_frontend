export interface InvitationRequestDto {
  // 요청 DTO
  inviteeNickname: string;
}

export interface Notification {
  id: number;
  tripId: number;
  inviterId: number;
  inviterNickname: string;
  invitedId: number;
  invitedNickname: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface NotificationResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
}

export interface MenuProps {
  anchorEl: null | HTMLElement; // prop 타입 정의
  open: boolean;
  onClose: () => void;
}
