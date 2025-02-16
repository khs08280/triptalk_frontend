// TripLayout.tsx
import Trip from "@/pages/Trip";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const TripLayout: React.FC = () => {
  return (
    <div className="relative">
      <Nav />
      <Trip />
      <Outlet />
    </div>
  );
};

export default TripLayout;
