import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PublicRoute from "@components/PublicRoute";
import TripCreate from "./pages/TripCreate";
import MyHome from "./pages/MyHome";
import TripDetail from "./pages/TripDetail";

const Router = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  const backgroundLocation =
    state?.backgroundLocation ||
    (location.pathname === "/tripCreate"
      ? ({ pathname: "/trip" } as Location)
      : location);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trip" element={<TripDetail />}>
          <Route path="create" element={<TripCreate />} />
        </Route>
        <Route path="/myHome" element={<MyHome />} />
      </Routes>
    </>
  );
};
export default Router;
