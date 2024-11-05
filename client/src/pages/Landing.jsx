// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-yellow-400">DoodleDuck</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://miro.medium.com/v2/resize:fit:3840/format:webp/1*_AfAoCDpBaGgJd5V-JZtfw.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to DoodleDuck
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Learn, Grow, and Achieve your goals with ease.
          </p>
          <div className="space-x-4">
            <Link to="/sign-up">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </Link>
            <Link to="/sign-in">
              <button className="bg-transparent border border-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          Why Choose DoodleDuck?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              High-Quality Content
            </h3>
            <p className="text-gray-300">
              Gain access to top-quality courses created by industry experts.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Flexible Learning
            </h3>
            <p className="text-gray-300">
              Learn at your own pace with courses available anytime, anywhere.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Community Support
            </h3>
            <p className="text-gray-300">
              Join a community of learners and connect with like-minded individuals.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          Popular Courses
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              C Essentials
            </h3>
            <p className="text-gray-300">Essential for Problem Solving</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Python for Data Science
            </h3>
            <p className="text-gray-300">
              Dive into data science with Python and explore real-world datasets.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              C++ Fundamentals
            </h3>
            <p className="text-gray-300">
              Learn the principles of user-centered design and create stunning applications.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center">
        <p className="text-gray-400">
          All rights reserved © 2024. Visit our{" "}
          <a
            href="https://github.com/yourgithubusername"
            className="text-yellow-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>.
        </p>
      </footer>
    </div>
  );
}