import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const courses = ["C", "C++", "C#", "Python"];
  useEffect(() => {
    if (location.pathname === "/home") {
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
  }, [location.pathname]);
  return (
    <div className="bg-gradient-to-br from-black via-gray-700 to-yellow-600 h-screen flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <div className="mb-6">
          <img
            src="https://media.tenor.com/ZWiW8qKBiKUAAAAM/sei-la.gif" // Replace with your GIF URL
            alt="DoodleDuck animation"
            className="h-48 w-48 mx-auto rounded-full shadow-lg"
          />
        </div>

        {/* Title and Description */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 mb-4">
          Welcome to DoodleDuck
        </h1>
        <p className="text-2xl md:text-2xl mb-6 text-yellow-50">
          Quack the Code, Crack the Future!
        </p>
        <div className="flex overflow-x-auto space-x-4 p-4">
          {courses.map((course, index) => (
            <Link
              key={index}
              to={`/courses/${course.toLowerCase()}`}
              className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg shadow-md font-semibold transition duration-300"
            >
              {course}
            </Link>
          ))}
        </div>
        {/* Cool Call-to-Action Button */}
        <button
          className="bg-gradient-to-r from-yellow-200 to-purple-500 hover:from-yellow-300 hover:to-purple-600 text-black font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-500 ease-in-out"
          onClick={() => alert("Start Learning!")}
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
