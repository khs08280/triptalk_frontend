import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Nav from "@components/Nav";
import { AppDispatch, RootState } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { checkSession, endLoading } from "./features/auth/authSlice";
import { publicRoutes } from "./allowedPage";

function App() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { loading, isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const currentPath = location.pathname;

  useEffect(() => {
    // (1) 만약 currentPath가 "공용 페이지" 중 하나면, checkSession()을 호출하지 않음
    if (publicRoutes.includes(currentPath)) {
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
