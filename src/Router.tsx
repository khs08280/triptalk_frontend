import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PublicRoute from "@components/PublicRoute";
import TripCreate from "./pages/TripCreate";
import MyPage from "./pages/MyHome";
import TripLayout from "@components/TripLayout";
import TripDetail from "./pages/TripDetail";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route path="/signup" element={<PublicRoute component={SignUp} />} />
        <Route path="/trip" element={<TripLayout />}>
          <Route path="create" element={<TripCreate />} />
        </Route>
        <Route path="/trip/:roomId" element={<TripDetail />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </>
  );
};
export default Router;
