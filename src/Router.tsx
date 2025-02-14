import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PublicRoute from "@components/PublicRoute";
import TripCreate from "./pages/TripCreate";
import MyHome from "./pages/MyHome";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/login" element={<PublicRoute component={Login} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tripCreate" element={<TripCreate />} />
      <Route path="/myHome" element={<MyHome />} />
    </Routes>
  );
};
export default Router;
