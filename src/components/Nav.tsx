import api from "@/api/api";
import { logoutState } from "@/features/auth/authSlice";
import { clearCurrentChatRoom } from "@/features/auth/chatRoomSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import NotificationBox from "./NotificationBox";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); // Menu open 여부

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch(clearCurrentChatRoom());
      dispatch(logoutState());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 flex h-16 w-full items-center justify-between bg-amber-300 px-12">
      <Link to={"/"}>
        <span className="text-2xl font-bold">트립톡</span>
      </Link>
      <nav className="">
        <ul className="relative flex w-sm justify-between">
          {isLoggedIn && (
            <>
              <div onClick={handleClick}>
                <NotificationsIcon color="primary" className="cursor-pointer" />
              </div>
              <NotificationBox // NotificationBox 추가
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              />
            </>
          )}

          <li>{user?.nickname}</li>
          <li>
            {isLoggedIn ? (
              <div
                onClick={handleLogout}
                className="cursor-pointer text-lg transition-all hover:text-blue-400"
              >
                로그아웃
              </div>
            ) : (
              <Link to={"/login"}>
                <div className="cursor-pointer text-lg transition-all hover:text-blue-400">
                  로그인
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
