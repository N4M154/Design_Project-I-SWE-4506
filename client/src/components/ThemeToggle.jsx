// import React, { useEffect, useState } from "react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     // Check for saved user preference, if any, on component mount
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle("dark", savedTheme === "dark");
//     } else {
//       // If no preference, use system preference
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       setTheme(prefersDark ? "dark" : "light");
//       document.documentElement.classList.toggle("dark", prefersDark);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <div
//       onClick={toggleTheme}
//       className="w-14 h-8 flex items-center border-solid border-2 border-black bg-white dark:bg-violet-950 rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-lg shadow-black dark:shadow-lg dark:shadow-violet-700"
//     >
//       {/* Sun/Moon Icon */}
//       <div
//         className={`w-6 h-6 flex items-center justify-center text-white rounded-full shadow-md transform transition-transform duration-300 ${
//           theme === "dark"
//             ? "translate-x-6 bg-violet-800"
//             : "translate-x-0 bg-black"
//         }`}
//       >
//         {theme === "light" ? (
//           <span className="text-sm">⚪</span>
//         ) : (
//           <span className="text-sm">🌙</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThemeToggle;

import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import { BsMoonStarsFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved user preference, if any, on component mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // If no preference, use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 bg-tranparent dark:bg-transparent text-black dark:text-white rounded-full transition-colors duration-300"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <span role="img" aria-label="Sun">
          <FaSun className="text-2xl text-yellow-400 transition-transform duration-300 transform hover:scale-110" />
        </span>
      ) : (
        <span role="img" aria-label="Moon">
          <BsMoonStarsFill className="text-2xl text-teal-300 transition-transform duration-300 transform hover:scale-110" />
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
