import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

const PublicRoute: React.FC<Props> = ({ component: Component }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Component />;
};

export default PublicRoute;
