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
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}
export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface Trip {
  id: number;
  title: string;
  startDate: string[];
  endDate: string[];
  location: string;
  visibility: Visibility;
  creatorNickname: string;
  createdAt: string;
  updatedAt: string;
}
