import api from "@/api/api";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { InvitationRequestDto } from "@/types";
import { Box, Modal, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface User {
  id: number;
  username: string;
  nickname: string;
  email?: string;
}

interface UserResponseDto {
  success: boolean;
  message: string;
  data: User[];
}

const InvitationModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const currentChatRoom = useAppSelector(
    (state: RootState) => state.chatroom.currentChatRoom,
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNickname("");
    setUsers([]);
    setError(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSearch = async () => {
    if (!nickname) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get<UserResponseDto>("/users", {
        params: { nickname },
      });

      if (response.data.success) {
        setUsers(response.data.data);
        console.log(response.data);

        if (response.data.data.length === 0) {
          setError("검색 결과가 없습니다.");
        }
      } else {
        setError(response.data.message || "유저 검색 실패");
      }
    } catch (err: any) {
      console.error("유저 검색 중 오류 발생:", err);
      const errorMessage =
        err.response?.data?.message || "유저 검색 중 오류가 발생했습니다.";
      setError(errorMessage);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [nickname]);

  const handleInvitation = async (inviteeNickname: string) => {
    const tripId = currentChatRoom?.tripId;
    const requestData: InvitationRequestDto = { inviteeNickname };

    try {
      const response = await api.post(
        `/invitations/send/${tripId}`,
        requestData,
      );

      if (response.data.success) {
        alert(response.data.message);
        handleClose();
      } else {
        setError(response.data.message || "초대 전송 실패");
      }
    } catch (error: any) {
      console.error("초대 전송 중 오류 발생:", error);
      const errorMessage =
        error.response?.data?.message || "초대 전송 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

  return (
    <div className="cursor-pointer px-4 py-2 hover:bg-gray-100">
      <div onClick={handleOpen}>초대하기</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[40%] left-[40%] flex h-auto w-sm flex-col border-2 border-blue-200 bg-white p-10 py-5 shadow">
          <div className="mb-5 flex items-center justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h3">
              초대하기
            </Typography>
            <CloseRoundedIcon
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>
          <TextField
            id="outlined-basic"
            label="초대할 유저 닉네임 입력"
            variant="outlined"
            value={nickname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {loading && <Typography>검색 중...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {users.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <ul className="flex flex-col space-y-2">
                {users.map((user) => (
                  <li key={user.id}>
                    {user.nickname}
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={() => handleInvitation(user.nickname)}
                    >
                      초대
                    </Button>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default InvitationModal;
