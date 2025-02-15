// TripLayout.tsx
import TripDetail from "@/pages/TripDetail";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const TripLayout: React.FC = () => {
  return (
    <div className="relative">
      {/* 배경에 TripDetail 페이지 */}
      <Nav />
      <TripDetail />
      {/* 자식 라우트(모달)가 있으면 Outlet으로 렌더링 */}
      <Outlet />
    </div>
  );
};

export default TripLayout;
