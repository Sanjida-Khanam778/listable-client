import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import useTheme from "../../hooks/useTheme";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Signup = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const { createUser, signInWithGoogle, loading, setLoading } = useAuth();

  const handleSubmit = async (event) => {
    setLoginLoading(true);
    event.preventDefault();
    setError("");
    const form = event.target;
    // const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Length must be at least 6 characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one digit");
      return;
    }

    try {
      const result = await createUser(email, password);
      const data = await axiosPublic.post(`/users`, {
        name: result?.user?.displayName,
        id: result?.user?.uid,
        email: result?.user?.email,
      });
      console.log(data)
      navigate("/");
      setLoginLoading(false);
      toast.success("Signup Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      toast.success("Signup Successful");
      const data = await axiosPublic.post(`/users`, {
        name: result?.user?.displayName,
        id: result?.user?.uid,
        email: result?.user?.email,
      });
      navigate('/')
      console.log(data)
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm">Welcome to Listable</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className={`w-full px-3 py-2 input input-bordered rounded-md border-2 focus:outline-[#A35C7A] ${
                  theme === "dark"
                    ? "text-white placeholder-gray-400 border-gray-600"
                    : "text-black placeholder-gray-500 border-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
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
                placeholder="*******"
                className={`w-full px-3 py-2 input input-bordered rounded-md border-2 focus:outline-[#A35C7A] ${
                  theme === "dark"
                    ? "text-white placeholder-gray-400 border-gray-600"
                    : "text-black placeholder-gray-500 border-gray-300"
                }`}
              />
            </div>
          </>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-primary-dark w-full rounded-md py-3 text-white font-bold"
          >
            {loading || loginLoading ? (
              <CgSpinnerAlt className="animate-spin m-auto" />
            ) : (
              "Register"
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-[#A35C7A] font-bold text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
