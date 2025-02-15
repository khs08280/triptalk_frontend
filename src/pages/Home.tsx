import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

function Home() {
  const isLoggendIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggendIn) {
    return <Navigate to="/intro" replace />;
  } else {
    return <Navigate to="/trip" replace />;
  }
}

export default Home;
