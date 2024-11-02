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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center">
        <div className="p-8 max-w-md w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border border-slate-900 rounded-lg shadow-md">
          {" "}
          <h1 className="text-3xl text-center font-semibold mb-7 text-sky-500">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-sky-600 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>
          <div className="flex items-center justify-center mt-5">
            <p className="text-slate-300 font-semibold">
              Don't have an account?
            </p>
            <Link to="/sign-up">
              <span className="text-green-500 font-bold text-lg ml-1 hover:text-sky-500">
                Sign Up
              </span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:3840/format:webp/1*_AfAoCDpBaGgJd5V-JZtfw.jpeg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="text-white text-center p-8 bg-transparent rounded-lg">
          <h2 className="text-2xl italic font-bold mb-4 text-teal-100">
            <span className="text-white inline-block animate-pulse">
              DoodleDuck
            </span>
            <br />
          </h2>
          <p className="text-lg italic text-white">
            {Array.from("- Team7").map((char, index) =>
              char === " " ? (
                <span key={index}>&nbsp;</span>
              ) : (
                <span
                  key={index}
                  className="inline-block animate-pulse"
                  style={{
                    animationDelay: `${
                      "One never notices what has been done; one can only see what remains to be done."
                        .length *
                        100 +
                      index * 100
                    }ms`,
                  }}
                >
                  {char}
                </span>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
