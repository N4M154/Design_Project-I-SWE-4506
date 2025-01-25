import React, { useState } from 'react';
import SideButtons from "../components/SideButtons";



interface LanguageStats {
  language: string;
  solved: number;
  attempted: number;
}

const languageData: LanguageStats[] = [
  { language: "Python", solved: 10, attempted: 15 },
  { language: "JavaScript", solved: 8, attempted: 12 },
  { language: "C++", solved: 5, attempted: 7 },
  { language: "Java", solved: 3, attempted: 5 },
  { language: "Go", solved: 2, attempted: 4 },
];

function Progress() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
          {/* Progress Header */}
          <div className="mb-8 p-6 bg-yellow-50 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold mb-4">Your Progress</h2>
            <p className="text-gray-600">Track your problem-solving progress across multiple programming languages.</p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Total Problems Solved</h3>
              <p className="text-4xl font-bold text-green-600">28</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Total Problems Attempted</h3>
              <p className="text-4xl font-bold text-blue-600">43</p>
            </div>
          </div>

          {/* Language-wise Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Language-wise Progress</h2>
            <div className="space-y-4">
              {languageData.map((data) => (
                <div
                  key={data.language}
                  className="p-4 border rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{data.language}</h3>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Solved</p>
                        <p className="text-green-600 font-bold text-xl">{data.solved}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Attempted</p>
                        <p className="text-blue-600 font-bold text-xl">{data.attempted}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Problem Solving Streak</h3>
                <p className="text-gray-600 mt-2">You solved problems 7 days in a row!</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Language Master</h3>
                <p className="text-gray-600 mt-2">Mastered problem-solving in Python.</p>
              </div>
              {/* Add more achievements as needed */}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              <li className="p-4 bg-yellow-50 rounded-lg shadow-md">
                Solved "Two Sum" in Python - <span className="text-green-600">Accepted</span>
              </li>
              <li className="p-4 bg-yellow-50 rounded-lg shadow-md">
                Attempted "Reverse String" in JavaScript - <span className="text-red-600">Wrong Answer</span>
              </li>
              <li className="p-4 bg-yellow-50 rounded-lg shadow-md">
                Solved "Binary Search" in C++ - <span className="text-green-600">Accepted</span>
              </li>
              {/* Add more activity as needed */}
            </ul>
          </div>
        </div>
      </div>
    
  );
}

export default Progress;
