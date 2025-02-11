import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default Router;
