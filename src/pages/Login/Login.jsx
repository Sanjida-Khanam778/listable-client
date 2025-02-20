import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const { signIn, setUser, signInWithGoogle, loading, setLoading, user, theme } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    setLoginLoading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn(email, password);
      setUser(res?.user);
      navigate("/");
      setLoginLoading(false);
      toast.success("Login Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm">Welcome back to Listable</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className={`w-full px-3 py-2 input input-bordered rounded-md border-2 focus:outline-[#A35C7A] ${
                  theme === "dark"
                    ? "text-white placeholder-gray-400 border-gray-600"
                    : "text-black placeholder-gray-500 border-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className={`w-full px-3 py-2 input input-bordered rounded-md border-2 focus:outline-[#A35C7A] ${
                  theme === "dark"
                    ? "text-white placeholder-gray-400 border-gray-600"
                    : "text-black placeholder-gray-500 border-gray-300"
                }`}
              />
            </div>
          </>
          <button
            type="submit"
            className="bg-primary-dark w-full rounded-md py-3 text-white font-bold"
          >
            {loading || loginLoading ? (
              <CgSpinnerAlt className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border-[#A35C7A] border my-3 p-2 rounded-lg cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-[#A35C7A] font-bold text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
