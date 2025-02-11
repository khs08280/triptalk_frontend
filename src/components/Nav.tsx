import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="bg-amber-300 w-full h-16 px-12 flex justify-between items-center fixed  top-0">
      <Link to={"/"}>
        <span className="text-white text-2xl">트립톡</span>
      </Link>
      <nav className="">
        <ul className="flex w-sm  justify-between">
          <li className="text-white">a</li>
          <li>b</li>
          <li>
            <Link to={"/login"}>
              <div className="text-lg hover:text-blue-400 transition-all">
                로그인
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
