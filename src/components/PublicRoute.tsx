import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

const PublicRoute: React.FC<Props> = ({ component: Component }) => {
  const { isLoggedIn, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <div>로딩중</div>; // or null
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Component />;
};

export default PublicRoute;
