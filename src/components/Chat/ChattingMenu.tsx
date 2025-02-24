import InvitationModal from "@components/InvitationModal";
import { ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { deleteTrip, DeleteTripResponse } from "@/api/TripApi";
import { AxiosError } from "axios";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

interface ChattingMenuProps {
  users: User[];
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const ChattingMenu: React.FC<ChattingMenuProps> = ({
  users,
  anchorEl,
  open,
  onClose,
}) => {
  const current = useAppSelector((state) => state.chatroom.currentChatRoom);
  const tripId = current?.tripId;
  const navigate = useNavigate();

  const { mutate: deleteTripMutation, isPending: isDeleting } = useMutation({
    mutationFn: (tripId: number | undefined) => deleteTrip(tripId),
    onSuccess: (data: DeleteTripResponse) => {
      alert(data.message);
      onClose();
      navigate("/");
    },
    onError: (error: AxiosError<DeleteTripResponse>) => {
      console.error("Error deleting trip:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to delete trip.");
      } else if (error.request) {
        alert("Network error.  Please check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    },
  });

  const handleDeleteClick = () => {
    console.log(current, tripId);
    const boole = confirm("여행을 삭제하시겠습니까?");
    if (boole) {
      if (tripId === undefined) {
        alert("오류가 발생했습니다.");
        onClose();
        return;
      }
      if (typeof tripId === "string") {
        deleteTripMutation(parseInt(tripId));
      } else {
        deleteTripMutation(tripId);
      }
    }

    onClose();
  };

  return (
    <>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={onClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <ul className="flex flex-col p-4 py-2">
            <h4 className="text-md font-semibold">참가한 유저들 목록</h4>
            <div className="pl-5">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <ListItemText key={user.id} primary={user.nickname} />
                ))
              ) : (
                <ListItemText primary="채팅방에 유저가 없습니다." />
              )}
            </div>
          </ul>
          <InvitationModal />
          <MenuItem onClick={handleDeleteClick} disabled={isDeleting}>
            {isDeleting ? "삭제 중..." : "여행 계획 및 채팅방 삭제"}
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default ChattingMenu;
