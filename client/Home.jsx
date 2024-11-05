import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import TableData from "./TableData";

export default function Home() {
  const [problems, setProblems] = useState([]);

  const [hoveredCourse, setHoveredCourse] = useState(null);

  const courses = ["C", "C++", "Java", "Python"]; // Example courses
  const courseDescriptions = {
    C: "Learn the essentials of C, the foundation for modern programming.",
    "C++": "Dive into C++, a language designed for complex system and application development.",
    Java: "Explore Java, one of the most popular languages for backend development.",
    Python: "Master Python, a versatile language for web, data science, and more.",
  };

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get("http://localhost:3000/problemsTable");
        console.log(response.data); // Check if the response structure matches expectations
        setProblems(response.data.data); // Adjust based on response structure
        toast.success("Data loaded successfully");
      } catch (error) {
        console.error("Error fetching problems:", error);
        toast.error("Failed to load data");
      }
    }

    fetchProblems();
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/home") {
      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "2q4GTxw4DnGGcyJB1GxGi",
          domain: "www.chatbase.co"
        };
      `;
      document.body.appendChild(scriptConfig);

      const scriptEmbed = document.createElement("script");
      scriptEmbed.src = "https://www.chatbase.co/embed.min.js";
      scriptEmbed.setAttribute("chatbotId", "2q4GTxw4DnGGcyJB1GxGi");
      scriptEmbed.setAttribute("domain", "www.chatbase.co");
      scriptEmbed.defer = true;
      document.body.appendChild(scriptEmbed);

      return () => {
        document.body.removeChild(scriptConfig);
        document.body.removeChild(scriptEmbed);
      };
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-600 h-screen flex flex-col justify-center items-center text-white relative">
      <div className="text-center">
        <div className="mb-6">
          <img
            src="https://media.tenor.com/ZWiW8qKBiKUAAAAM/sei-la.gif"
            alt="DoodleDuck animation"
            className="h-48 w-48 mx-auto rounded-full shadow-lg"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 mb-4">
          Welcome to DoodleDuck
        </h1>
        <p className="text-2xl md:text-2xl mb-6 text-yellow-50">
          Quack the Code, Crack the Future!
        </p>

        <div className="flex justify-center items-center overflow-x-auto space-x-4 p-4 mb-6">
          {courses.map((course, index) => (
            <Link
              key={index}
              to={`/courses/${course.toLowerCase()}`}
              className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg shadow-md font-semibold transition duration-300"
              onMouseEnter={() => setHoveredCourse(course)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              {course}
            </Link>
          ))}
        </div>

        <button
          className="bg-gradient-to-r from-yellow-200 to-purple-500 hover:from-yellow-300 hover:to-purple-600 text-black font-bold py-2 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-500 ease-in-out mb-6"
          onClick={() => alert("Start Learning!")}
        >
          Start Learning
        </button>

        <TableData problems={problems} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>

      <div
        className={`fixed mt-20 top-0 left-0 w-full bg-black text-white text-center py-2 transform ${hoveredCourse ? "h-80 opacity-100" : "h-0 opacity-0"} transition-all duration-500 ease-in-out rounded-b-full border-yellow-600 border-b-4`}
        style={{
          maxWidth: "300px",
          overflow: "hidden",
          transition: "height 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
      >
        {hoveredCourse && (
          <p className="text-lg font-semibold p-4">
            {courseDescriptions[hoveredCourse]}
          </p>
        )}
      </div>
    </div>
  );
}
