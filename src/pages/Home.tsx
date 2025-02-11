import LoggedInHome from "./LoggedInHome";
import LoggedOutHome from "./LoggedOutHome";

const Home = () => {
  const isAuthenticated = false;
  return <div>{isAuthenticated ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default Home;
