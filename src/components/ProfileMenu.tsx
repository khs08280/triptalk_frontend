import { useAppSelector } from "@/store/hooks";
import { MenuProps } from "@/types";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

interface ProfileProps extends MenuProps {
  handleLogout: () => void;
}

const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  handleLogout,
}: ProfileProps) => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <div className="flex flex-col">
        <span className="p-4">닉네임 : {user?.nickname}</span>
        <Link to={"/mypage"}>
          <MenuItem>마이페이지</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </div>
    </Menu>
  );
};

export default ProfileMenu;
