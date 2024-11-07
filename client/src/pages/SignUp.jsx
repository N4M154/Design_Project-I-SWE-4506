import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
 
  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Sign-up modal box */}
      <div className="relative z-10 p-8 bg-gradient-to-r from-black via-gray-900 to-gray-800 border border-yellow-500 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-3xl text-center font-semibold mb-7 text-yellow-400">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-yellow-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
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
          <button
            disabled={loading}
            className="bg-yellow-600 text-black p-3 rounded-lg uppercase hover:bg-yellow-500 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex items-center justify-center mt-5">
          <p className="text-yellow-100 font-semibold">Have an account?</p>
          <Link to="/sign-in">
            <span className="text-yellow-400 text-xl font-bold ml-1 hover:text-yellow-300">
              Sign In
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
