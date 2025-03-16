import MonacoEditor from "@monaco-editor/react";
import { Groq } from "groq-sdk";
import {
  CheckCircle,
  Clock,
  Code2,
  Copy,
  Download,
  Play,
  RefreshCw,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SideButtons from "../components/SideButtons";
import Certificate from "./certificate";
import { useSelector } from "react-redux";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  timeLimit: number;
  description: string;
  sampleInput?: string;
  sampleOutput?: string;
  testCases: Array<{
    input: string;
    output: string;
  }>;
}
// interface UserStats {
//   solved: number;
//   attempted: number;
//   totalSubmissions: number;
// }

interface LanguageStats {
  solved: number;
  attempted: number;
}

interface UserStats {
  solved: number;
  attempted: number;
  totalSubmissions: number;
  languageStats: {
    python: LanguageStats;
    javascript: LanguageStats;
    cpp: LanguageStats;
    java: LanguageStats;
  };
}
interface ContestProgress {
  solvedCount: number;
  attemptedCount: number;
  problemsSolved: { problemId: string; solvedAt: string }[];
  problemsAttempted: {
    problemId: string;
    verdict: string;
    attemptedAt: string;
  }[];
  languageStats: {
    python: { solved: number; attempted: number };
    javascript: { solved: number; attempted: number };
    cpp: { solved: number; attempted: number };
    java: { solved: number; attempted: number };
  };
}

interface Submission {
  problemId: string;
  status: "AC" | "WA" | "TLE";
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
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    sampleInput: "[2,7,11,15]\ntarget = 9",
    sampleOutput: "[0,1]",
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]",
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]",
      },
    ],
  },
  {
    id: "2",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Arrays"],
    timeLimit: 2000,
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    sampleInput: "[-2,1,-3,4,-1,2,1,-5,4]",
    sampleOutput: "6",
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
      {
        input: "[1]",
        output: "1",
      },
    ],
  },
  {
    id: "3",
    title: "N-Queens",
    difficulty: "Hard",
    tags: ["Backtracking", "Matrix"],
    timeLimit: 3000,
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
    sampleInput: "4",
    sampleOutput:
      "[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]",
    testCases: [
      {
        input: "4",
        output: "[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]",
      },
      {
        input: "1",
        output: "[['Q']]",
      },
    ],
  },
  {
    id: "4",
    title: "Reverse Integer",
    difficulty: "Easy",
    tags: ["Math"],
    timeLimit: 1000,
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    sampleInput: "123",
    sampleOutput: "321",
    testCases: [
      { input: "123", output: "321" },
      { input: "-123", output: "-321" },
      { input: "120", output: "21" },
      { input: "1534236469", output: "0" },
    ],
  },
  {
    id: "5",
    title: "Palindrome Number",
    difficulty: "Easy",
    tags: ["Math"],
    timeLimit: 1000,
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    sampleInput: "121",
    sampleOutput: "true",
    testCases: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" },
      { input: "10", output: "false" },
    ],
  },
  {
    id: "6",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    tags: ["String"],
    timeLimit: 1000,
    description:
      "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    sampleInput: '["flower","flow","flight"]',
    sampleOutput: '"fl"',
    testCases: [
      { input: '["flower","flow","flight"]', output: '"fl"' },
      { input: '["dog","racecar","car"]', output: '""' },
    ],
  },
  {
    id: "7",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    timeLimit: 1000,
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    sampleInput: '"()[]{}"',
    sampleOutput: "true",
    testCases: [
      { input: '"()[]{}"', output: "true" },
      { input: '"(]"', output: "false" },
      { input: '"([)]"', output: "false" },
    ],
  },
  {
    id: "8",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    tags: ["Array", "Two Pointers"],
    timeLimit: 1000,
    description:
      "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.",
    sampleInput: "[1,1,2]",
    sampleOutput: "2",
    testCases: [
      { input: "[1,1,2]", output: "2" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", output: "5" },
    ],
  },
  {
    id: "9",
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Dynamic Programming"],
    timeLimit: 1000,
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    sampleInput: "2",
    sampleOutput: "2",
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "4", output: "5" },
    ],
  },
  {
    id: "10",
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    timeLimit: 2000,
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    sampleInput: "[[1,3],[2,6],[8,10],[15,18]]",
    sampleOutput: "[[1,6],[8,10],[15,18]]",
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
      { input: "[[1,4],[4,5]]", output: "[[1,5]]" },
    ],
  },
  {
    id: "11",
    title: "Unique Paths",
    difficulty: "Medium",
    tags: ["Dynamic Programming"],
    timeLimit: 2000,
    description:
      "There is a robot on an m x n grid. The robot starts at the top-left corner and tries to move to the bottom-right corner. The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    sampleInput: "3\n7",
    sampleOutput: "28",
    testCases: [
      { input: "3\n7", output: "28" },
      { input: "3\n2", output: "3" },
    ],
  },
  {
    id: "12",
    title: "Symmetric Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search"],
    timeLimit: 1000,
    description:
      "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    sampleInput: "[1,2,2,3,4,4,3]",
    sampleOutput: "true",
    testCases: [
      { input: "[1,2,2,3,4,4,3]", output: "true" },
      { input: "[1,2,2,null,3,null,3]", output: "false" },
    ],
  },
  {
    id: "13",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search"],
    timeLimit: 1000,
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    sampleInput: "[1,null,2,3]",
    sampleOutput: "[1,3,2]",
    testCases: [
      { input: "[1,null,2,3]", output: "[1,3,2]" },
      { input: "[]", output: "[]" },
      { input: "[1]", output: "[1]" },
    ],
  },
  {
    id: "14",
    title: "Linked List Cycle",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers"],
    timeLimit: 1000,
    description:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    sampleInput: "[3,2,0,-4]\n1",
    sampleOutput: "true",
    testCases: [
      { input: "[3,2,0,-4]\n1", output: "true" },
      { input: "[1,2]\n0", output: "true" },
      { input: "[1]\n-1", output: "false" },
    ],
  },
  {
    id: "15",
    title: "Single Number",
    difficulty: "Easy",
    tags: ["Array", "Bit Manipulation"],
    timeLimit: 1000,
    description:
      "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    sampleInput: "[2,2,1]",
    sampleOutput: "1",
    testCases: [
      { input: "[2,2,1]", output: "1" },
      { input: "[4,1,2,1,2]", output: "4" },
    ],
  },
];

const languageExamples = {
  python: `def solution():
    # Write your code here
    pass

# Read input
input_data = input()
print(solution())`,
  javascript: `function solution() {
    // Write your code here
}

// Read input
const input = readline();
console.log(solution());`,
  cpp: `#include <iostream>
using namespace std;

void solution() {
    // Write your code here
}

int main() {
    // Read input
    string input;
    getline(cin, input);
    solution();
    return 0;
}`,
  java: `import java.util.*;

public class Main {
    public static void solution() {
        // Write your code here
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        solution();
    }
}`,
};

const Problems: React.FC = () => {
  const [problems] = useState<Problem[]>(initialProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  // const [stats, setStats] = useState<UserStats>({
  //   solved: 0,
  //   attempted: 0,
  //   totalSubmissions: 0,
  // });
  const [stats, setStats] = useState<UserStats>({
    solved: 0,
    attempted: 0,
    totalSubmissions: 0,
    languageStats: {
      python: { solved: 0, attempted: 0 },
      javascript: { solved: 0, attempted: 0 },
      cpp: { solved: 0, attempted: 0 },
      java: { solved: 0, attempted: 0 },
    },
  });

  const [loading, setLoading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  //const { currentUser } = useSelector((state) => state.user);
  //const [userName, setUserName] = useState(currentUser?.userName || "");

  // useEffect(() => {
  //   if (currentUser) {
  //     setUserName(currentUser.username); // Update username if currentUser is available
  //     fetchContestProgress();
  //   }
  // }, [currentUser]);

  const user = JSON.parse(localStorage.getItem("persist:root"));
  const currentUser = user ? JSON.parse(user.user).currentUser : null;
  const userId = currentUser ? currentUser._id : null;
  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) {
        console.error("userId is not defined!");
        return;
      }

      console.log("[DEBUG] Fetching stats for userId:", userId);

      try {
        const response = await fetch(`/api/contest/progress/${userId}`);
        console.log("[DEBUG] API Response:", response);

        const data = await response.json();
        console.log("[DEBUG] Response data:", data);

        if (data.success) {
          console.log("[DEBUG] Contest progress fetched successfully.");
          setStats({
            solved: data.data.solvedCount,
            attempted: data.data.attemptedCount,
            totalSubmissions: data.data.solvedCount + data.data.attemptedCount,
            languageStats: data.data.languageStats,
          });
        } else {
          console.log("[DEBUG] Error fetching contest progress:", data.message);
        }
      } catch (error) {
        console.error("[DEBUG] Error fetching stats:", error);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId]);

  console.log("[DEBUG] Current stats:", stats);

  const fetchContestProgress = async () => {
    try {
      const response = await fetch(`/api/contest/progress/${currentUser._id}`);
      const data = await response.json();

      if (data.success) {
        const progress: ContestProgress = data.data;

        // Update stats state based on the fetched data
        setStats({
          solved: progress.solvedCount,
          attempted: progress.attemptedCount,
          totalSubmissions:
            progress.problemsSolved.length + progress.problemsAttempted.length,
          languageStats: {
            python: {
              solved: progress.languageStats.python.solved,
              attempted: progress.languageStats.python.attempted,
            },
            javascript: {
              solved: progress.languageStats.javascript.solved,
              attempted: progress.languageStats.javascript.attempted,
            },
            cpp: {
              solved: progress.languageStats.cpp.solved,
              attempted: progress.languageStats.cpp.attempted,
            },
            java: {
              solved: progress.languageStats.java.solved,
              attempted: progress.languageStats.java.attempted,
            },
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch contest progress:", error);
    }
  };

  useEffect(() => {
    if (selectedProblem) {
      setCode(languageExamples[language]);
    }
  }, [selectedProblem, language]);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // const evaluateCode = async () => {
  //   if (!selectedProblem || !code.trim() || !currentUser) return;

  //   setLoading(true);
  //   try {
  //     let allTestsPassed = true;
  //     let testOutput = "";

  //     for (const testCase of selectedProblem.testCases) {
  //       const response = await groq.chat.completions.create({
  //         messages: [
  //           {
  //             role: "system",
  //             content: `You are a code evaluator. Given the following code and test case, determine if the output matches the expected output exactly. Respond with exactly one word: 'AC' for correct answer, 'WA' for wrong answer, or 'TLE' if the code would exceed the time limit of ${selectedProblem.timeLimit}ms.`,
  //           },
  //           {
  //             role: "user",
  //             content: `Problem: ${selectedProblem.description}\nCode:\n${code}\nTest Input:\n${testCase.input}\nExpected Output:\n${testCase.output}`,
  //           },
  //         ],
  //         model: "mixtral-8x7b-32768",
  //         temperature: 0.1,
  //       });

  //       const result =
  //         (response.choices[0].message.content?.trim() as
  //           | "AC"
  //           | "WA"
  //           | "TLE") ?? "WA";

  //       if (result !== "AC") {
  //         allTestsPassed = false;
  //       }
  //       testOutput += `Test case: ${testCase.input}\nExpected: ${testCase.output}\nResult: ${result}\n\n`;

  //       // Update contest progress
  //       try {
  //         const verdict = allTestsPassed ? "AC" : result;
  //         await fetch("/api/contest/progress", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             userId: currentUser._id,
  //             problemId: selectedProblem.id,
  //             verdict,
  //           }),
  //         });
  //       } catch (error) {
  //         console.error("Failed to update contest progress:", error);
  //       }
  //     }

  //     setOutput(testOutput);

  //     const newSubmission: Submission = {
  //       problemId: selectedProblem.id,
  //       status: allTestsPassed ? "AC" : "WA",
  //       timestamp: new Date(),
  //       language,
  //       code,
  //     };

  //     setSubmissions((prev) => [...prev, newSubmission]);
  //   } catch (error) {
  //     setOutput("Error: Failed to evaluate code. Please try again.");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const evaluateCode = async () => {
    let result;
    if (!selectedProblem || !code.trim() || !currentUser) return;

    setLoading(true);
    try {
      let allTestsPassed = true;
      let testOutput = "";

      console.log("[DEBUG] Starting code evaluation...");

      // Evaluate each test case and generate the final verdict
      for (const testCase of selectedProblem.testCases) {
        console.log(`[DEBUG] Evaluating test case: ${testCase.input}`);

        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are a code evaluator. Given the following code and test case, determine if the output matches the expected output exactly. Respond with exactly one word: 'AC' for correct answer, 'WA' for wrong answer, or 'TLE' if the code would exceed the time limit of ${selectedProblem.timeLimit}ms. Please ensure the response is one of these exact verdicts and no other text.`,
            },
            {
              role: "user",
              content: `Problem: ${selectedProblem.description}\nCode:\n${code}\nTest Input:\n${testCase.input}\nExpected Output:\n${testCase.output}`,
            },
          ],
          model: "mixtral-8x7b-32768",
          temperature: 0.1,
        });

        const verdict = response.choices[0].message.content?.trim();
        console.log(`[DEBUG] Verdict for test case: ${verdict}`);

        if (verdict === "AC") {
          testOutput += `Test case: ${testCase.input}\nExpected: ${testCase.output}\nResult: AC\n\n`;
        } else if (verdict === "WA") {
          allTestsPassed = false;
          testOutput += `Test case: ${testCase.input}\nExpected: ${testCase.output}\nResult: WA\n\n`;
        } else if (verdict === "TLE") {
          allTestsPassed = false;
          testOutput += `Test case: ${testCase.input}\nExpected: ${testCase.output}\nResult: TLE\n\n`;
        } else {
          // If the result is not one of AC, WA, TLE, consider it an error
          throw new Error("Unexpected verdict received from Groq: " + verdict);
        }

        // We only store the final verdict for the problem
        result = verdict;
      }

      // After the final verdict, update contest progress
      console.log("[DEBUG] Updating contest progress...");
      try {
        const response = await fetch("/api/contest/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser._id,
            problemId: selectedProblem.id,
            verdict: result, // Ensure the correct verdict is sent here
            language: language, // Include the language used for submission
          }),
        });

        const responseData = await response.json();
        console.log(
          "[DEBUG] Contest progress updated successfully:",
          responseData
        );
      } catch (error) {
        console.error("[DEBUG] Failed to update contest progress:", error);
      }

      setOutput(testOutput);

      const newSubmission: Submission = {
        problemId: selectedProblem.id,
        status: allTestsPassed ? "AC" : result,
        timestamp: new Date(),
        language,
        code,
      };

      setSubmissions((prev) => [...prev, newSubmission]);
    } catch (error) {
      setOutput("Error: Failed to evaluate code. Please try again.");
      console.error("[DEBUG] Error in code evaluation:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extensions = {
      python: ".py",
      javascript: ".js",
      cpp: ".cpp",
      java: ".java",
    };

    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution${extensions[language]}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatsSection = () => {
    const [stats, setStats] = useState<UserStats>({
      solved: 0,
      attempted: 0,
      totalSubmissions: 0,
      languageStats: {
        python: { solved: 0, attempted: 0 },
        javascript: { solved: 0, attempted: 0 },
        cpp: { solved: 0, attempted: 0 },
        java: { solved: 0, attempted: 0 },
      },
    });

    return (
      <div className="flex min-h-screen bg-yellow-50 dark:bg-[#18181b] font-['Poppins']">
        <SideButtons />
        <div
          id="main-content"
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: isExpanded ? "260px" : "80px" }}
        >
          <div className="container mx-auto px-4 py-8">
            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Your Statistics
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Problems Solved */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {stats.solved}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Problems Solved
                  </div>
                </div>

                {/* Problems Attempted */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {stats.attempted}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Problems Attempted
                  </div>
                </div>

                {/* Total Submissions */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {stats.totalSubmissions}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Total Submissions
                  </div>
                </div>
              </div>

              {/* Language Stats Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Language Statistics
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {/* Python Stats */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      Python
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Solved: {stats.languageStats.python.solved}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Attempted: {stats.languageStats.python.attempted}
                    </div>
                  </div>

                  {/* JavaScript Stats */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      JavaScript
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Solved: {stats.languageStats.javascript.solved}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Attempted: {stats.languageStats.javascript.attempted}
                    </div>
                  </div>

                  {/* C++ Stats */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">
                      C++
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Solved: {stats.languageStats.cpp.solved}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Attempted: {stats.languageStats.cpp.attempted}
                    </div>
                  </div>

                  {/* Java Stats */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">
                      Java
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Solved: {stats.languageStats.java.solved}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Attempted: {stats.languageStats.java.attempted}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showCertificate && (
              <Certificate
                userName={userName}
                score={5}
                onClose={() => setShowCertificate(false)}
              />
            )}

            {selectedProblem ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Problem Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="mb-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    ← Back to Problems
                  </button>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {selectedProblem.title}
                  </h2>
                  <div className="flex gap-2 mb-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        selectedProblem.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : selectedProblem.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedProblem.difficulty}
                    </span>
                    {selectedProblem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      <Clock size={14} />
                      {selectedProblem.timeLimit}ms
                    </span>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedProblem.description}
                    </p>
                    {selectedProblem.sampleInput && (
                      <div className="mt-4">
                        <h4 className="font-semibold">Sample Input:</h4>
                        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
                          {selectedProblem.sampleInput}
                        </pre>
                      </div>
                    )}
                    {selectedProblem.sampleOutput && (
                      <div className="mt-2">
                        <h4 className="font-semibold">Sample Output:</h4>
                        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
                          {selectedProblem.sampleOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Code2 className="text-yellow-500" size={24} />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-1 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setTheme(theme === "vs-dark" ? "vs" : "vs-dark")
                        }
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <RefreshCw size={20} />
                      </button>
                      <button
                        onClick={copyCode}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Copy size={20} />
                      </button>
                      <button
                        onClick={downloadCode}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="h-[400px]">
                    <MonacoEditor
                      height="100%"
                      language={language}
                      theme={theme}
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="p-4 border-t dark:border-gray-700">
                    <button
                      onClick={evaluateCode}
                      disabled={loading}
                      className={`w-full py-2 px-4 rounded ${
                        loading
                          ? "bg-yellow-600 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } text-white font-medium flex items-center justify-center gap-2`}
                    >
                      <Play size={20} />
                      {loading ? "Running..." : "Submit Solution"}
                    </button>
                  </div>
                  {output && (
                    <div className="p-4 border-t dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          Output
                        </h3>
                        <button
                          onClick={() => setOutput("")}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto max-h-40">
                        {output}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {problem.title}
                      </h3>
                      <div className="flex gap-2">
                        {submissions.some(
                          (s) => s.problemId === problem.id && s.status === "AC"
                        ) && (
                          <CheckCircle className="text-green-500" size={20} />
                        )}
                        {submissions.some(
                          (s) => s.problemId === problem.id && s.status === "WA"
                        ) && <XCircle className="text-red-500" size={20} />}
                        {submissions.some(
                          (s) =>
                            s.problemId === problem.id && s.status === "TLE"
                        ) && <Clock className="text-yellow-500" size={20} />}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          problem.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Button to show certificate */}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowCertificate(true)} // Show certificate when clicked
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show Certificate
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export default Problems;
