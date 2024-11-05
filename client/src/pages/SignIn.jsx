import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

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
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Sign-in modal box */}
      <div className="relative z-10 p-8 bg-gradient-to-r from-black via-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => navigate("/")} // navigate back to the landing page or close the modal
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Welcome back
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="name@email.com"
            id="email"
            className="bg-yellow-200 border border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-yellow-200 border border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={handleChange}
          />
          <div className="flex justify-between items-center text-sm text-yellow-600">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            disabled={loading}
            className="bg-yellow-600 text-black p-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-70"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="text-center text-gray-500 text-sm">or</div>
          <OAuth />
        </form>
        <div className="mt-6 text-center text-gray-700">
          <p>
            New to DoodleDuck?{" "}
            <Link
              to="/sign-up"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {error.message || "Something went wrong!"}
          </p>
        )}
      </div>
    </div>
  );
}
