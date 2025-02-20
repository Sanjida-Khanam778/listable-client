import { Link } from "react-router";

import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import useDark from "../../hooks/useDark";
import { IconButton } from "@material-tailwind/react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { HiMoon } from "react-icons/hi";
import { FaSun } from "react-icons/fa";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dark = useDark();
  console.log(theme, dark);
  console.log(user);

  return (
  
    <nav className="block w-full px-4 py-2 mx-auto shadow-md rounded-md lg:px-8 lg:py-3">
      <div className="container flex items-center justify-between mx-auto text-slate-800">
      <a
  href="#"
  className={`mr-4 block cursor-pointer py-1.5 font-semibold ${
    theme === "dark" ? "text-white" : "text-black"
  }`}
>
  Listable
</a>
        <div className="flex gap-5">
          <div>
            <IconButton
              onClick={toggleTheme}
              variant="text"
              className=" rounded-full cursor-pointer"
            >
              {theme === "light" ? (
                <HiMoon className=" text-2xl" />
              ) : (
                <FaSun className=" text-2xl text-text-dark" />
              )}
            </IconButton>
          </div>
          {user && user?.email ? (
            <div className="relative group">
              <img src={user?.photoURL} referrerPolicy="no-referrer" className="h-10 w-10 rounded-full" />
              <div className="absolute z-10 w-32 -bottom-8 -right-10 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-300">
                {user.displayName}
              </div>
            </div>
          ) : (
            ""
          )}
          {user && user.email ? (
            <button
              className=" bg-primary-dark text-white cursor-pointer font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
              onClick={logOut}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className=" bg-primary-dark text-white font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className=" bg-primary-dark text-white font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
