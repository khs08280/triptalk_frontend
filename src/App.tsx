import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Nav from "@components/Nav";
import { AppDispatch, RootState, store } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import {
  checkLogin,
  checkSession,
  endLoading,
} from "./features/auth/authSlice";
import { publicRoutes } from "./allowedPage";

function App() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { loading, isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const currentPath = location.pathname;

  useEffect(() => {
    if (publicRoutes.includes(currentPath)) {
      dispatch(checkLogin());
      dispatch(endLoading());
      return;
    }
    dispatch(checkSession());
  }, [currentPath, dispatch]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Router />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
