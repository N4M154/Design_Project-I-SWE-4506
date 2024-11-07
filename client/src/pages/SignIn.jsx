import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Sign-in modal box */}
      <div className="relative z-10 p-8 bg-gradient-to-r from-black via-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-3xl text-center font-semibold mb-7 text-yellow-400">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-yellow-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-yellow-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
          <div className="flex justify-between items-center text-sm text-yellow-600 mt-2">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            disabled={loading}
            className="bg-yellow-600 text-black p-3 rounded-lg uppercase hover:bg-yellow-500 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex items-center justify-center mt-5">
          <p className="text-yellow-100 font-semibold">New to DoodleDuck?</p>
          <Link to="/sign-up">
            <span className="text-yellow-400 text-xl font-bold ml-1 hover:text-yellow-300">
              Sign Up
            </span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
