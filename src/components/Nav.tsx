import api from "@/api/api";
import { logoutState } from "@/features/auth/authSlice";
import { clearCurrentChatRoom } from "@/features/auth/chatRoomSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import NotificationBox from "./NotificationBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "./ProfileMenu";
import { Badge } from "@mui/material";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const profileOpen = Boolean(profileAnchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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
    <header className="fixed top-0 flex h-16 w-full items-center justify-between bg-blue-200 px-12">
      <Link to={"/"}>
        <span className="text-2xl font-bold">트립톡</span>
      </Link>
      <nav className="">
        <ul className="relative flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <div onClick={handleClick}>
                <Badge
                  badgeContent={
                    notificationCount > 0 ? notificationCount : null
                  }
                  color="primary"
                >
                  <NotificationsIcon
                    fontSize="large"
                    color="primary"
                    className="cursor-pointer"
                  />
                </Badge>
              </div>
              <NotificationBox
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                setNotificationCount={setNotificationCount}
              />
            </>
          )}
          {isLoggedIn ? (
            <>
              <div onClick={handleProfileClick}>
                <AccountCircleIcon
                  fontSize="large"
                  className="cursor-pointer"
                />
              </div>
              <ProfileMenu
                anchorEl={profileAnchorEl}
                open={profileOpen}
                onClose={handleProfileClose}
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <Link to={"/login"}>
              <div className="cursor-pointer text-lg transition-all hover:text-blue-400">
                로그인
              </div>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
