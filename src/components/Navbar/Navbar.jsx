import { Link, NavLink } from "react-router-dom";
// import "./Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { logOut, user } = useAuth();

  console.log(user);

  return (
    // <div className="flex justify-between w-11/12 mx-auto py-6 border-b">
    //   <div className="navbar-start">

    //     <a className="text-blue-700 text-lg md:text-2xl lg:text-3xl font-bold font-logo tracking-wider">
    //       Listable
    //     </a>
    //   </div>
    //   <div className="navbar-center flex">
    //     <ul className="space-x-8 flex px-1">{links}</ul>
    //   </div>
    //   <div className="flex gap-5">
    //     {user && user?.email ? (
    //       <div className="relative group">
    //         <img src={user?.photoURL} className="h-10 w-10 rounded-full" />
    //         <div className="absolute z-10 w-32 -bottom-8 -right-10 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-300">
    //           {user.displayName}
    //         </div>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //     {user && user.email ? (
    //       <button
    //         className=" bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
    //         onClick={logOut}
    //       >
    //         Logout
    //       </button>
    //     ) : (
    //       <Link
    //         className=" bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
    //         to={"/login"}
    //       >
    //         Login
    //       </Link>
    //     )}
    //   </div>

    // </div>
    <nav className="block w-full px-4 py-2 mx-auto bg-white shadow-md rounded-md lg:px-8 lg:py-3">
      <div className="container flex items-center justify-between mx-auto text-slate-800">
        <a
          href="#"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
        >
          Listable
        </a>

        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-slate-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>

              <a href="#" className="flex items-center">
                Pages
              </a>
            </li>
            {/* <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-slate-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <a href="#" className="flex items-center">
                Account
              </a>
            </li> */}
            {/* <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-slate-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>

              <a href="#" className="flex items-center">
                Login
              </a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-slate-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>

              <a href="#" className="flex items-center">
                Docs
              </a>
            </li> */}
          </ul>
        </div>
        <div className="flex gap-5">
          {user && user?.email ? (
            <div className="relative group">
              <img src={user?.photoURL} className="h-10 w-10 rounded-full" />
              <div className="absolute z-10 w-32 -bottom-8 -right-10 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-300">
                {user.displayName}
              </div>
            </div>
          ) : (
            ""
          )}
          {user && user.email ? (
            <button
              className=" bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
              onClick={logOut}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className=" bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className=" bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary transition duration-300"
                to={"/login"}
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
