// import { CheckCircle2, Clock, Code, XCircle } from "lucide-react";
// import React, { useState } from "react";
// import SideButtons from "../components/SideButtons";

// interface Problem {
//   id: number;
//   title: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   description: string;
//   sampleInput: string;
//   sampleOutput: string;
//   timeLimit: string;
//   memoryLimit: string;
// }

// interface Submission {
//   problemId: number;
//   status: "AC" | "WA" | "TLE" | null;
//   timestamp: Date;
// }

// const problems: Problem[] = [
//   {
//     id: 1,
//     title: "Two Sum",
//     difficulty: "Easy",
//     description:
//       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//     sampleInput: "nums = [2,7,11,15], target = 9",
//     sampleOutput: "[0,1]",
//     timeLimit: "1s",
//     memoryLimit: "256MB",
//   },
//   {
//     id: 2,
//     title: "Reverse String",
//     difficulty: "Easy",
//     description:
//       "Write a function that reverses a string. The input string is given as an array of characters s.",
//     sampleInput: "s = ['h','e','l','l','o']",
//     sampleOutput: "['o','l','l','e','h']",
//     timeLimit: "1s",
//     memoryLimit: "256MB",
//   },
//   // Add more problems here...
// ];

// function Problems() {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
//   const [code, setCode] = useState("");
//   const [submissions, setSubmissions] = useState<Submission[]>([]);

//   const handleSubmit = (problemId: number) => {
//     // Simulate submission result
//     const results = ["AC", "WA", "TLE"];
//     const randomResult = results[Math.floor(Math.random() * results.length)] as
//       | "AC"
//       | "WA"
//       | "TLE";

//     const newSubmission: Submission = {
//       problemId,
//       status: randomResult,
//       timestamp: new Date(),
//     };

//     setSubmissions([newSubmission, ...submissions]);
//   };

//   const getStatusIcon = (status: "AC" | "WA" | "TLE" | null) => {
//     switch (status) {
//       case "AC":
//         return <CheckCircle2 className="text-green-500" />;
//       case "WA":
//         return <XCircle className="text-red-500" />;
//       case "TLE":
//         return <Clock className="text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   const getStats = () => {
//     const solved = new Set(
//       submissions.filter((s) => s.status === "AC").map((s) => s.problemId)
//     ).size;
//     const attempted = new Set(submissions.map((s) => s.problemId)).size;
//     return { solved, attempted };
//   };

//   const stats = getStats();

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
//       <SideButtons />
//       <div
//         id="main-content"
//         className="flex-1 transition-all duration-300"
//         style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//       >
//         {/* Stats Section */}
//         <div className="mb-8 p-6 ml-10 mr-10 bg-yellow-50 dark:bg-transparent dark:border dark:border-yellow-200 rounded-lg shadow-lg dark:shadow-yellow-200/20">
//           <h2 className="text-2xl font-bold mb-4 dark:text-yellow-50">
//             Your Progress
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-4 bg-white dark:bg-yellow-200/20 rounded-lg">
//               <p className="text-gray-600 dark:text-gray-300">
//                 Problems Solved
//               </p>
//               <p className="text-3xl font-bold text-green-600">
//                 {stats.solved}
//               </p>
//             </div>
//             <div className="p-4 bg-white dark:bg-yellow-200/20 rounded-lg">
//               <p className="text-gray-600 dark:text-gray-300">
//                 Problems Attempted
//               </p>
//               <p className="text-3xl font-bold text-blue-600">
//                 {stats.attempted}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Problems List */}
//         <div className="bg-white dark:bg-black ml-10 mr-10 rounded-lg shadow-lg dark:shadow-yellow-200/20">
//           <div className="p-6">
//             <h2 className="text-2xl font-bold dark:text-white mb-6">
//               Programming Problems
//             </h2>
//             <div className="space-y-4">
//               {problems.map((problem) => (
//                 <div
//                   key={problem.id}
//                   className="border rounded-lg p-4 hover:bg-yellow-50 dark:hover:bg-yellow-200/20 transition-colors cursor-pointer"
//                   onClick={() => setSelectedProblem(problem)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold dark:text-yellow-50 flex items-center gap-2">
//                         <Code size={20} />
//                         {problem.title}
//                       </h3>
//                       <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
//                         <span>Time: {problem.timeLimit}</span>
//                         <span>Memory: {problem.memoryLimit}</span>
//                         <span
//                           className={`
//                             ${
//                               problem.difficulty === "Easy"
//                                 ? "text-green-600 dark:text-green-400"
//                                 : ""
//                             }
//                             ${
//                               problem.difficulty === "Medium"
//                                 ? "text-yellow-600"
//                                 : ""
//                             }
//                             ${
//                               problem.difficulty === "Hard"
//                                 ? "text-red-600"
//                                 : ""
//                             }
//                           `}
//                         >
//                           {problem.difficulty}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {getStatusIcon(
//                         submissions.find((s) => s.problemId === problem.id)
//                           ?.status || null
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Selected Problem View */}
//         {selectedProblem && (
//           <div className="mt-8 ml-10 mr-10 bg-white dark:bg-transparent dark:border dark:border-yellow-200 rounded-lg shadow-lg dark:shadow-yellow-200/20 p-6">
//             <h2 className="text-2xl font-bold mb-4 dark:text-white">
//               {selectedProblem.title}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold dark:text-yellow-50">
//                   Description
//                 </h3>
//                 <p className="mt-2 dark:text-white">
//                   {selectedProblem.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-semibold dark:text-white">Sample Input</h3>
//                 <pre className="mt-2 bg-gray-100 dark:bg-black dark:text-white p-3 rounded">
//                   {selectedProblem.sampleInput}
//                 </pre>
//               </div>
//               <div>
//                 <h3 className="font-semibold dark:text-white">Sample Output</h3>
//                 <pre className="mt-2 bg-gray-100 dark:bg-black dark:text-white p-3 rounded">
//                   {selectedProblem.sampleOutput}
//                 </pre>
//               </div>
//               <div>
//                 <h3 className="font-semibold dark:text-white">Your Solution</h3>
//                 <textarea
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   className="w-full h-64 mt-2 p-3 font-mono text-sm border rounded dark:bg-gray-700/30 dark:text-white"
//                   placeholder="Write your code here..."
//                 />
//               </div>
//               <button
//                 onClick={() => handleSubmit(selectedProblem.id)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               >
//                 Submit Solution
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Submissions History */}
//         {submissions.length > 0 && (
//           <div className="mt-8 ml-10 mr-10  bg-white dark:bg-yellow-200/20 rounded-lg shadow-lg dark:shadow-black p-6">
//             <h2 className="text-2xl font-bold mb-4 dark:text-white">
//               Recent Submissions
//             </h2>
//             <div className="space-y-2">
//               {submissions.map((submission, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 p-2 border-b"
//                 >
//                   {getStatusIcon(submission.status)}
//                   <span className="dark:text-white">
//                     Problem {submission.problemId}
//                   </span>
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {submission.timestamp.toLocaleTimeString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Problems;

//--------------------------------------------------------------------------


import { CheckCircle, Clock, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SideButtons from "../components/SideButtons";

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  timeLimit: number;
  description: string;
  sampleInput?: string;
  sampleOutput?: string;
}

interface UserStats {
  solved: number;
  attempted: number;
  totalSubmissions: number;
}

interface Submission {
  problemId: string;
  status: 'AC' | 'WA' | 'TLE';
  timestamp: Date;
  language: string;
  code: string;
}


const initialProblems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Table"],
    timeLimit: 1000,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    sampleInput: "[2,7,11,15]\ntarget = 9",
    sampleOutput: "[0,1]"
  },
  {
    id: "2",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Arrays"],
    timeLimit: 2000,
    description: "Find the contiguous subarray with the largest sum.",
    sampleInput: "[-2,1,-3,4,-1,2,1,-5,4]",
    sampleOutput: "6"
  },
  {
    id: "3",
    title: "N-Queens",
    difficulty: "Hard",
    tags: ["Backtracking", "Matrix"],
    timeLimit: 3000,
    description: "Place N queens on an NxN chessboard such that no two queens threaten each other.",
    sampleInput: "n = 4",
    sampleOutput: "[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]"
  }
];

const Problems: React.FC = () => {
  const [problems] = useState<Problem[]>(initialProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [isExpanded, setIsExpanded] = useState(true);
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<UserStats>({
    solved: 0,
    attempted: 0,
    totalSubmissions: 0
  });

  useEffect(() => {
    // Update stats whenever submissions change
    const uniqueAttempted = new Set(submissions.map(s => s.problemId));
    const solved = new Set(submissions.filter(s => s.status === 'AC').map(s => s.problemId));
    
    setStats({
      solved: solved.size,
      attempted: uniqueAttempted.size,
      totalSubmissions: submissions.length
    });
  }, [submissions]);

  const evaluateCode = async () => {
    if (!selectedProblem || !code.trim()) return;

    const GROQ_API_KEY = "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";
    
    try {
      const response = await fetch('https://api.groq.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{
            role: "system",
            content: "You are a code evaluator. Evaluate the following code solution and respond with exactly one word: 'AC' for correct solution, 'WA' for wrong answer, or 'TLE' for time limit exceeded."
          }, {
            role: "user",
            content: `Problem: ${selectedProblem.description}\nCode:\n${code}`
          }],
          model: "mixtral-8x7b-32768",
          temperature: 0.1
        })
      });

      const result = await response.json();
      const status = result.choices[0].message.content.trim() as 'AC' | 'WA' | 'TLE';

      const newSubmission: Submission = {
        problemId: selectedProblem.id,
        status,
        timestamp: new Date(),
        language,
        code
      };

      setSubmissions(prev => [...prev, newSubmission]);
    } catch (error) {
      console.error('Error evaluating code:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.solved}</div>
              <div className="text-gray-600">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.attempted}</div>
              <div className="text-gray-600">Problems Attempted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.totalSubmissions}</div>
              <div className="text-gray-600">Total Submissions</div>
            </div>
          </div>
        </div>

        {selectedProblem ? (
          <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
            <button
              onClick={() => setSelectedProblem(null)}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              ← Back to Problems
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedProblem.title}</h2>
            <div className="flex gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-sm ${
                selectedProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                selectedProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedProblem.difficulty}
              </span>
              {selectedProblem.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
              <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                <Clock size={14} />
                {selectedProblem.timeLimit}ms
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedProblem.description}</p>
              {selectedProblem.sampleInput && (
                <div className="mt-4">
                  <h4 className="font-semibold">Sample Input:</h4>
                  <pre className="bg-gray-100 p-2 rounded mt-1">{selectedProblem.sampleInput}</pre>
                </div>
              )}
              {selectedProblem.sampleOutput && (
                <div className="mt-2">
                  <h4 className="font-semibold">Sample Output:</h4>
                  <pre className="bg-gray-100 p-2 rounded mt-1">{selectedProblem.sampleOutput}</pre>
                </div>
              )}
            </div>
            <div className="mb-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mb-2 p-2 rounded border"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 font-mono p-4 bg-gray-50 rounded border"
                placeholder="Write your code here..."
              />
            </div>
            <button
              onClick={evaluateCode}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Solution
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {problems.map(problem => (
              <div
                key={problem.id}
                className="bg-yellow-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <div className="flex gap-2">
                    {submissions.some(s => s.problemId === problem.id && s.status === 'AC') && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                    {submissions.some(s => s.problemId === problem.id && s.status === 'WA') && (
                      <XCircle className="text-red-500" size={20} />
                    )}
                    {submissions.some(s => s.problemId === problem.id && s.status === 'TLE') && (
                      <Clock className="text-yellow-500" size={20} />
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                  {problem.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Problems;

