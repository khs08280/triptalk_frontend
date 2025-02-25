import api from "@/api/api";
import { NotificationResponse, Notification, MenuProps } from "@/types"; // 타입 import 경로 확인
import { Menu, Button } from "@mui/material"; // 필요한 컴포넌트 import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationBox: React.FC<MenuProps> = ({ anchorEl, open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInvitations = async () => {
      try {
        const response = await api.get<NotificationResponse>(`/invitations`);
        if (response.data.success) {
          setNotifications(response.data.data);
        }
      } catch (error: any) {
        console.error("초대 불러오기 중 오류 발생:", error);
      }
    };
    if (open) {
      getInvitations();
    }
  }, [open]);

  const handleAccept = async (notificationId: number) => {
    try {
      const response = await api.patch(`/invitations/${notificationId}/accept`);
      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId,
          ),
        );
        onClose();
        navigate(0);
        alert("초대를 수락했습니다.");
      }
    } catch (err: any) {
      console.error("초대 수락 중 오류 발생", err);
    }
  };

  const handleReject = async (notificationId: number) => {
    try {
      const response = await api.patch(`/invitations/${notificationId}/reject`);
      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId,
          ),
        );
        onClose();
        alert("초대를 거절했습니다.");
      }
    } catch (err: any) {
      console.error("초대 거절 중 오류 발생", err);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div className="flex items-center px-4" key={notification.id}>
            <span className="mr-4">
              {notification.inviterNickname}님의 초대
            </span>
            <div className="flex">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleAccept(notification.id)}
              >
                수락
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleReject(notification.id)}
              >
                거절
              </Button>
            </div>
          </div>
        ))
      ) : (
        <span className="p-4 py-10">알림 없음</span>
      )}
    </Menu>
  );
};

export default NotificationBox;
