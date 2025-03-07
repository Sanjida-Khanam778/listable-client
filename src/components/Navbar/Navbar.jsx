import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import useDark from "../../hooks/useDark";
import { IconButton } from "@material-tailwind/react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { FiMoon } from "react-icons/fi";
import { PiSunBold } from "react-icons/pi";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dark = useDark();
  console.log(theme, dark);
  console.log(user);

  return (
    <nav className= {`block w-full px-4 py-1 mx-auto lg:px-8  ${theme==='dark'?'bg-background-dark shadow-2xl':'bg-background-light shadow-sm'}`}>
      <div className="flex items-center justify-between mx-auto text-slate-800">
        <div className="flex gap-1 md:gap-3 items-center">
        <img className="h-7 md:h-10" src="https://i.imgur.com/MAjiXOD.png" alt="" />
        <a
          href="#"
          className={`mr-2 md:mr-4 hidden md:block cormorant text-2xl md:text-4xl cursor-pointer tracking-wide py-1.5 font-semibold ${
            theme === "dark" ? "text-primary-dark" : "text-black"
          }`}
        >
          Listable
        </a>
        </div>
        <div className="flex gap-1 md:gap-4">
          <div>
            <IconButton
              onClick={toggleTheme}
              variant="text"
              className=" rounded-full cursor-pointer"
            >
              {theme === "light" ? (
                <FiMoon className=" text-2xl" />
              ) : (
                <PiSunBold className=" text-2xl text-text-dark" />
              )}
            </IconButton>
          </div>
          {user && user?.email ? (
            <div className="relative group">
              <img
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full"
              />
              <div className="absolute z-10 w-32 -bottom-8 -right-10 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-300">
                {user.displayName}
              </div>
            </div>
          ) : (
            ""
          )}
          {user && user.email ? (
            <button
              className=" bg-primary-dark text-white cursor-pointer font-bold py-2 px-5 rounded-sm hover:bg-primary transition duration-300"
              onClick={logOut}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className=" bg-primary-dark text-white font-bold py-2 px-5 rounded-sm hover:bg-primary transition duration-300"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className=" bg-primary-dark text-white font-bold py-2 px-5 rounded-sm hover:bg-primary transition duration-300"
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