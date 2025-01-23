//----------------------------------------------------------------------------

import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { Code2, Copy, Download, Play, RefreshCw, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import SideButtons from "../components/SideButtons";

const languageExamples = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python3: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  typescript: `const greeting: string = "Hello, World!";
console.log(greeting);`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
};

export default function CodeEditor() {
  const [code, setCode] = useState(languageExamples.python3);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const [loading, setLoading] = useState(false);
  const [inputNeeded, setInputNeeded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);

  const languages = [
    { id: "c", name: "C", icon: "🎯" },
    { id: "cpp", name: "C++", icon: "⚡" },
    { id: "java", name: "Java", icon: "☕" },
    { id: "python3", name: "Python", icon: "🐍" },
    { id: "javascript", name: "JavaScript", icon: "💛" },
    { id: "typescript", name: "TypeScript", icon: "📘" },
    { id: "rust", name: "Rust", icon: "🦀" },
    { id: "go", name: "Go", icon: "🔵" },
  ];

  const inputKeywords = {
    c: ["scanf"],
    cpp: ["cin"],
    java: ["Scanner"],
    python3: ["input"],
    javascript: ["prompt"],
    typescript: ["prompt"],
    rust: ["stdin"],
    go: ["Scan"],
  };

  useEffect(() => {
    // Load saved code from localStorage
    const savedCode = localStorage.getItem(`code-${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(languageExamples[language]);
    }
  }, [language]);

  const handleEditorChange = (value) => {
    setCode(value);
    if (autoSave) {
      localStorage.setItem(`code-${language}`, value);
    }
    checkForInputFunctions();
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(languageExamples[newLanguage]);
    setOutput("");
  };

  const checkForInputFunctions = () => {
    const keywords = inputKeywords[language] || [];
    const needsInput = keywords.some((keyword) => code.includes(keyword));
    setInputNeeded(needsInput);
    return needsInput;
  };

  const compileCode = async () => {
    if (inputNeeded && !input) {
      alert("This code requires input. Please provide input data.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/execute", {
        script: code,
        language: language,
        input: input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error: Failed to execute code. Please try again.");
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const clearOutput = () => {
    setOutput("");
    setInput("");
  };

  const downloadCode = () => {
    const extensions = {
      c: ".c",
      cpp: ".cpp",
      java: ".java",
      python3: ".py",
      javascript: ".js",
      typescript: ".ts",
      rust: ".rs",
      go: ".go",
    };

    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code${extensions[language]}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Define themes
    monaco.editor.defineTheme("customDark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
        { token: "function", foreground: "DCDCAA" },
        { token: "variable", foreground: "9CDCFE" },
        { token: "number", foreground: "B5CEA8" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#2F3139",
        "editorLineNumber.foreground": "#858585",
      },
    });

    monaco.editor.defineTheme("customLight", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        { token: "string", foreground: "A31515" },
        { token: "function", foreground: "795E26" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#000000",
        "editor.lineHighlightBackground": "#F7F7F7",
        "editorLineNumber.foreground": "#237893",
      },
    });

    monaco.editor.setTheme(theme === "vs-dark" ? "customDark" : "customLight");
  };

  return (
    <div className="flex min-h-screen bg-[#1E1E1E] font-['Poppins'] overflow-hidden">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="min-h-screen flex flex-col ">
          {/* Header */}
          <div
            className={`${
              theme === "vs-dark"
                ? "bg-[#2D2D2D] border-[#404040]"
                : "bg-white border-gray-200"
            } p-4 border-b`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Code2 className="text-yellow-500" size={24} />
                <h1
                  className={`text-xl font-semibold ${
                    theme === "vs-dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Online Code Compiler
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    theme === "vs-dark"
                      ? "bg-[#3C3C3C] text-white border-[#505050]"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.icon} {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    setTheme(theme === "vs-dark" ? "vs" : "vs-dark")
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "vs-dark"
                      ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <RefreshCw size={20} />
                </button>
                <button
                  onClick={downloadCode}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "vs-dark"
                      ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="Download Code"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <MonacoEditor
                  height="100%"
                  defaultLanguage={language}
                  language={language}
                  theme={theme === "vs-dark" ? "customDark" : "customLight"}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    roundedSelection: false,
                    wordWrap: "on",
                    folding: true,
                    automaticLayout: true,
                    lineHeight: 21,
                    suggestOnTriggerCharacters: true,
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={copyCode}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "vs-dark"
                        ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Copy Code"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={compileCode}
                    disabled={loading}
                    className={`p-2 rounded-lg ${
                      loading
                        ? "bg-yellow-600 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-black transition-colors flex items-center space-x-2`}
                    title="Run Code"
                  >
                    <Play size={20} />
                    <span>{loading ? "Running..." : "Run"}</span>
                  </button>
                </div>
              </div>

              {/* Input/Output Section */}
              <div
                className={`h-1/3 ${
                  theme === "vs-dark"
                    ? "bg-[#2D2D2D] border-[#404040]"
                    : "bg-gray-50 border-gray-200"
                } border-t`}
              >
                <div className="flex h-full">
                  {/* Input Panel */}
                  {inputNeeded && (
                    <div
                      className={`w-1/2 ${
                        theme === "vs-dark"
                          ? "border-[#404040]"
                          : "border-gray-200"
                      } border-r p-4`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2
                          className={`font-medium ${
                            theme === "vs-dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Input
                        </h2>
                      </div>
                      <textarea
                        className={`w-full h-[calc(100%-2rem)] p-2 rounded border resize-none focus:outline-none focus:border-yellow-500 ${
                          theme === "vs-dark"
                            ? "bg-[#1E1E1E] text-white border-[#404040]"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter input for your program..."
                      />
                    </div>
                  )}

                  {/* Output Panel */}
                  <div className={`${inputNeeded ? "w-1/2" : "w-full"} p-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <h2
                        className={`font-medium ${
                          theme === "vs-dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Output
                      </h2>
                      <button
                        onClick={clearOutput}
                        className={`p-1 rounded ${
                          theme === "vs-dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-700"
                        } transition-colors`}
                        title="Clear Output"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div
                      className={`h-[calc(100%-2rem)] p-2 rounded border overflow-auto ${
                        theme === "vs-dark"
                          ? "bg-[#1E1E1E] text-white border-[#404040]"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {output || "Output................."}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
