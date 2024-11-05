import React from "react";
import duckImage from "../images/aboutimg.jpg";

export default function About() {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white">
      {/* Duck Image in Top Left */}
      <img
        src={duckImage}
        alt="Playful Duck"
        className="absolute bottom-0 left-0 h-70 w-32"
      />

      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 mb-10 text-center">
          ABOUT DoodleDuck
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
          {/* Motivation Section */}
          <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
              Motivation behind the Project
            </h2>
            <p className="text-yellow-50 text-lg">
              DoodleDuck was born from our journey through Design Project Lab I,
              where we recognized the need for a cohesive learning platform for
              aspiring programmers.
              <br />
              <br />
              We’ve combined our passion for coding with a commitment to making
              programming accessible and enjoyable. With organized resources,
              interactive quizzes, and more, DoodleDuck is here to streamline
              your learning path. Join us as we transform coding education, one
              quack at a time!
            </p>
          </div>
          {/* About Us Section */}
          <div className="bg-black border border-yellow-500 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
              Meet the Team
            </h2>
            <p className="text-yellow-50 text-lg mb-4">
              We’re a team of dedicated software engineering students from the
              Islamic University of Technology, currently in our 5th semester.
            </p>
            <ul className="text-yellow-50 text-lg space-y-2">
              <li>Faiza Maliat (210042163)</li>
              <li>Nusrat Siddique (210042131)</li>
              <li>Namisa Najah Raisa (210042112)</li>
              <li>Ishmaam Iftekhar Khan (210042125)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
