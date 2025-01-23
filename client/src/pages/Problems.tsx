import { CheckCircle2, Clock, Code, XCircle } from "lucide-react";
import React, { useState } from "react";
import SideButtons from "../components/SideButtons";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  sampleInput: string;
  sampleOutput: string;
  timeLimit: string;
  memoryLimit: string;
}

interface Submission {
  problemId: number;
  status: "AC" | "WA" | "TLE" | null;
  timestamp: Date;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
    sampleInput: "s = ['h','e','l','l','o']",
    sampleOutput: "['o','l','l','e','h']",
    timeLimit: "1s",
    memoryLimit: "256MB",
  },
  // Add more problems here...
];

function Problems() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const handleSubmit = (problemId: number) => {
    // Simulate submission result
    const results = ["AC", "WA", "TLE"];
    const randomResult = results[Math.floor(Math.random() * results.length)] as
      | "AC"
      | "WA"
      | "TLE";

    const newSubmission: Submission = {
      problemId,
      status: randomResult,
      timestamp: new Date(),
    };

    setSubmissions([newSubmission, ...submissions]);
  };

  const getStatusIcon = (status: "AC" | "WA" | "TLE" | null) => {
    switch (status) {
      case "AC":
        return <CheckCircle2 className="text-green-500" />;
      case "WA":
        return <XCircle className="text-red-500" />;
      case "TLE":
        return <Clock className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStats = () => {
    const solved = new Set(
      submissions.filter((s) => s.status === "AC").map((s) => s.problemId)
    ).size;
    const attempted = new Set(submissions.map((s) => s.problemId)).size;
    return { solved, attempted };
  };

  const stats = getStats();

  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Stats Section */}
        <div className="mb-8 p-6 bg-yellow-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-600">Problems Solved</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.solved}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-600">Problems Attempted</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.attempted}
              </p>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Programming Problems</h2>
            <div className="space-y-4">
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  className="border rounded-lg p-4 hover:bg-yellow-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedProblem(problem)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Code size={20} />
                        {problem.title}
                      </h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Time: {problem.timeLimit}</span>
                        <span>Memory: {problem.memoryLimit}</span>
                        <span
                          className={`
                            ${
                              problem.difficulty === "Easy"
                                ? "text-green-600"
                                : ""
                            }
                            ${
                              problem.difficulty === "Medium"
                                ? "text-yellow-600"
                                : ""
                            }
                            ${
                              problem.difficulty === "Hard"
                                ? "text-red-600"
                                : ""
                            }
                          `}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(
                        submissions.find((s) => s.problemId === problem.id)
                          ?.status || null
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Problem View */}
        {selectedProblem && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedProblem.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="mt-2">{selectedProblem.description}</p>
              </div>
              <div>
                <h3 className="font-semibold">Sample Input</h3>
                <pre className="mt-2 bg-gray-100 p-3 rounded">
                  {selectedProblem.sampleInput}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold">Sample Output</h3>
                <pre className="mt-2 bg-gray-100 p-3 rounded">
                  {selectedProblem.sampleOutput}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold">Your Solution</h3>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 mt-2 p-3 font-mono text-sm border rounded"
                  placeholder="Write your code here..."
                />
              </div>
              <button
                onClick={() => handleSubmit(selectedProblem.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Submit Solution
              </button>
            </div>
          </div>
        )}

        {/* Submissions History */}
        {submissions.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Submissions</h2>
            <div className="space-y-2">
              {submissions.map((submission, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 border-b"
                >
                  {getStatusIcon(submission.status)}
                  <span>Problem {submission.problemId}</span>
                  <span className="text-gray-600">
                    {submission.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Problems;
