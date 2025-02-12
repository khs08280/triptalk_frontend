import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";

const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <header className="fixed top-0 flex h-16 w-full items-center justify-between bg-amber-300 px-12">
      <Link to={"/"}>
        <span className="text-2xl text-white">트립톡</span>
      </Link>
      <nav className="">
        <ul className="flex w-sm justify-between">
          <li className="text-white">a</li>
          <li>b</li>
          <li>
            {isLoggedIn ? (
              <div className="text-lg transition-all hover:text-blue-400">
                로그아웃
              </div>
            ) : (
              <Link to={"/login"}>
                <div className="text-lg transition-all hover:text-blue-400">
                  로그인
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
