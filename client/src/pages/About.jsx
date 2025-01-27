

//--------------------------------------

import { default as React, useState } from "react";
import SideButtons from "../components/SideButtons";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-yellow-50 to-white font-['Poppins'] dark:from-[#18181b] dark:to-[#3b3a22]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="relative flex flex-col items-center">
          {/* Background and Header */}
          <div className="w-full bg-yellow-100 dark:bg-yellow-400/20 rounded-3xl p-10 shadow-md dark:shadow-yellow-400/20 text-center">
            <h1 className="text-6xl font-extrabold text-yellow-600 dark:text-yellow-100 mb-4">
              About DoodleDuck
            </h1>
            <p className="text-xl text-gray-700 dark:text-yellow-50 max-w-3xl mx-auto">
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
            <div className="bg-white dark:bg-transparent dark:border dark:border-yellow-200 rounded-lg shadow-md p-8 flex items-center gap-8">
              <div className="w-1/3">
                <div className="h-40 w-40 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600 text-4xl font-bold shadow">
                  Why?
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                  Our Motivation
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  DoodleDuck was born from our journey through Design Project
                  Lab I, where we recognized the need for a cohesive learning
                  platform for aspiring programmers. We’re here to make coding
                  fun, engaging, and accessible.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-yellow-50 dark:bg-yellow-400/20 rounded-lg shadow-md p-8 flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-yellow-600 dark:text-white text-center mb-4">
                Platform Features
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">💻</span>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                    Interactive Coding
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">📈</span>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                    Progress Tracking
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">🤝</span>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                    Peer Collaboration
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow">
                    <span className="text-yellow-600 text-2xl">⏱️</span>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                    Real-Time Feedback
                  </p>
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
            <div className="bg-yellow-100 dark:bg-yellow-100/40 rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-100 text-center mb-6">
                Our Future Vision
              </h2>
              <p className="text-gray-700 dark:text-black text-lg text-center">
                We aim to expand with more languages, sophisticated coding
                challenges, and a mobile app for learning on the go. Our mission
                is to make coding education universal and enjoyable for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
