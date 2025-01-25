// import React from "react";
// import duckImage from "../images/aboutimg.jpg";

// export default function About() {
//   return (
    
//     <div className="relative flex flex-col items-center min-h-screen bg-black text-white">
//       {/* Duck Image in Top Left */}
//       <img
//         src={duckImage}
//         alt="Playful Duck"
//         className="absolute bottom-0 left-0 h-70 w-32"
//       />

//       <div className="max-w-screen-lg mx-auto px-4 py-10">
//         <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 mb-10 text-center">
//           ABOUT DoodleDuck
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
//           {/* Motivation Section */}
//           <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
//             <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
//               Motivation behind the Project
//             </h2>
//             <p className="text-yellow-50 text-lg">
//               DoodleDuck was born from our journey through Design Project Lab I,
//               where we recognized the need for a cohesive learning platform for
//               aspiring programmers.
//               <br />
//               <br />
//               We’ve combined our passion for coding with a commitment to making
//               programming accessible and enjoyable. With organized resources,
//               interactive quizzes, and more, DoodleDuck is here to streamline
//               your learning path. Join us as we transform coding education, one
//               quack at a time!
//             </p>
//           </div>
//           {/* Features Section */}
//           <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
//             <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
//               Platform Features
//             </h2>
//             <p className="text-yellow-50 text-lg mb-4">
//               Discover the key features that make DoodleDuck unique:
//             </p>
//             <ul className="list-disc pl-5 text-yellow-50 text-lg space-y-2">
//               <li>Interactive Coding Environment</li>
//               <li>Progress Tracking and Achievement Unlocks</li>
//               <li>Peer Collaboration and Community Support</li>
//               <li>Real-Time Feedback on Exercises</li>
//               <li>Customizable Learning Paths</li>
//             </ul>
//           </div>
//           {/* About Us Section */}
//           <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
//             <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
//               Meet the Team
//             </h2>
//             <p className="text-yellow-50 text-lg mb-4">
//               We’re a team of dedicated software engineering students from the
//               Islamic University of Technology, currently in our 5th semester.
//             </p>
//             <ul className="text-yellow-50 text-lg space-y-2">
//               <li>Faiza Maliat (210042163)</li>
//               <li>Nusrat Siddique (210042131)</li>
//               <li>Namisa Najah Raisa (210042112)</li>
//               <li>Ishmaam Iftekhar Khan (210042125)</li>
//             </ul>
//           </div>
//           {/* Future Plans Section */}
//           <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
//             <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
//               Future Plans
//             </h2>
//             <p className="text-yellow-50 text-lg">
//               Looking ahead, DoodleDuck plans to expand with more languages,
//               sophisticated coding challenges, and a mobile app for learning on
//               the go.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//--------------------------------------



import { default as React, useState } from "react";
import SideButtons from "../components/SideButtons";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-yellow-50 to-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="relative flex flex-col items-center">
          {/* Background and Header */}
          <div className="w-full bg-yellow-100 p-10 shadow-md text-center">
            <h1 className="text-6xl font-extrabold text-yellow-600 mb-4">
              About DoodleDuck
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Welcome to DoodleDuck! We are passionate about making programming
              accessible and enjoyable for everyone. Dive into our journey, our
              vision, and what makes us unique.
            </p>
          </div>

          {/* Duck Image
          <img
            src={duckImage}
            alt="Playful Duck"
            className="w-48 h-48 mt-6 rounded-full border-4 border-yellow-500 shadow-lg"
          /> */}

          {/* Sections */}
          <div className="w-full max-w-screen-lg mx-auto mt-12 space-y-12 px-6">
            {/* Motivation Section */}
            <div className="bg-white rounded-lg shadow-md p-8 flex items-center gap-8">
              <div className="w-1/3">
                <div className="h-40 w-40 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600 text-4xl font-bold shadow">
                  Why?
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-yellow-600 mb-4">
                  Our Motivation
                </h2>
                <p className="text-gray-700 text-lg">
                  DoodleDuck was born from our journey through Design Project Lab I,
                  where we recognized the need for a cohesive learning platform for
                  aspiring programmers. We’re here to make coding fun, engaging, and
                  accessible.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-yellow-50 rounded-lg shadow-md p-8 flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-yellow-600 text-center mb-4">
                Platform Features
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">💻</span>
                  </div>
                  <p className="mt-4 text-gray-700 font-medium">Interactive Coding</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">📈</span>
                  </div>
                  <p className="mt-4 text-gray-700 font-medium">Progress Tracking</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">🤝</span>
                  </div>
                  <p className="mt-4 text-gray-700 font-medium">Peer Collaboration</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">⏱️</span>
                  </div>
                  <p className="mt-4 text-gray-700 font-medium">Real-Time Feedback</p>
                </div>
              </div>
            </div>

            {/* Meet the Team Section
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">
                Meet the Team
              </h2>
              <ul className="text-lg text-gray-700 space-y-2">
                <li>Faiza Maliat (210042163)</li>
                <li>Nusrat Siddique (210042131)</li>
                <li>Namisa Najah Raisa (210042112)</li>
                <li>Ishmaam Iftekhar Khan (210042125)</li>
              </ul>
            </div> */}

            {/* Future Plans Section */}
            <div className="bg-yellow-100 rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">
                Our Future Vision
              </h2>
              <p className="text-gray-700 text-lg text-center">
                We aim to expand with more languages, sophisticated coding
                challenges, and a mobile app for learning on the go. Our mission is
                to make coding education universal and enjoyable for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
