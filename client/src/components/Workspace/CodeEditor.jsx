import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState(""); 
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("c"); // Default to C language
  const [loading, setLoading] = useState(false);
  const [inputNeeded, setInputNeeded] = useState(false); 

  
  useEffect(() => {
    if (window.location.pathname === "/compiler") {
      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "2q4GTxw4DnGGcyJB1GxGi",
          domain: "www.chatbase.co"
        };
      `;
      document.body.appendChild(scriptConfig);

      const scriptEmbed = document.createElement("script");
      scriptEmbed.src = "https://www.chatbase.co/embed.min.js";
      scriptEmbed.setAttribute("chatbotId", "2q4GTxw4DnGGcyJB1GxGi");
      scriptEmbed.setAttribute("domain", "www.chatbase.co");
      scriptEmbed.defer = true;
      document.body.appendChild(scriptEmbed);

      return () => {
        document.body.removeChild(scriptConfig);
        document.body.removeChild(scriptEmbed);
      };
    }
  }, []);


  const inputKeywords = {
    c: ["scanf"],
    cpp: ["cin"],
    java: ["Scanner"],
    python3: ["input"],
  
  };


  const handleEditorChange = (value) => {
    setCode(value);
  };

  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  
  const checkForInputFunctions = () => {
    const keywords = inputKeywords[language] || [];
    return keywords.some((keyword) => code.includes(keyword));
  };

  
  const compileCode = async () => {
    const requiresInput = checkForInputFunctions(); 
    setInputNeeded(requiresInput); 

    if (requiresInput && !input) {
      alert("This code requires input. Please enter input data.");
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
      setOutput("Error in executing the code.");
    }
    setLoading(false);

    setInput("");
    setInputNeeded(false);
  };

 
  const handleEditorDidMount = (editor, monaco) => {
  
    monaco.editor.defineTheme("vscodeTheme", {
      base: "vs-dark", 
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" }, // Green comments
        { token: "keyword", foreground: "569CD6" }, // Blue keywords
        { token: "string", foreground: "CE9178" }, // Orange strings
        { token: "function", foreground: "DCDCAA" }, // Light yellow function names
        { token: "variable", foreground: "9CDCFE" }, // Light blue variables
        { token: "number", foreground: "B5CEA8" }, // Light green numbers
        { token: "operator", foreground: "D4D4D4" }, // Light grey operators
      ],
      colors: {
        "editor.background": "#1E1E1E", // Dark grey background (VS Code default)
        "editor.foreground": "#D4D4D4", // Light grey default text color
        "editorCursor.foreground": "#AEAFAD", // Light grey cursor color
        "editor.lineHighlightBackground": "#5c5a3b", // Blue line highlight background
        "editorLineNumber.foreground": "#858585", // Light grey line numbers
        "editor.selectionBackground": "#264F78", // Blue selection background
        "editorIndentGuide.background": "#404040", // Light grey indent guide
        "editorWhitespace.foreground": "#404040", // Light grey whitespace characters
      },
    });

    
    monaco.editor.setTheme("vscodeTheme");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 p-4">
      <h1 className="text-2xl font-bold mb-4">Code Compiler</h1>

      <select
        value={language}
        onChange={handleLanguageChange}
        className="mb-4 p-2 border rounded bg-yellow-200"
      >
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="python3">Python</option>
        
      </select>

      {/* Code Editor */}
      <MonacoEditor
        height="50vh"
        width="200vh"
        defaultLanguage={language}
        theme="vscodeTheme" 
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount} 
      />
      {inputNeeded && (
        <textarea
          className="mt-4 p-2 w-1/2 bg-zinc-800 text-white"
          rows="5"
          placeholder="Enter input for your program"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
      )}
      <button
        onClick={compileCode}
        className="mt-4 p-2 bg-yellow-500 text-black rounded"
      >
        {loading ? "Compiling..." : "Compile & Execute"}
      </button>

      
      <div className="mt-4 p-4 bg-yellow-200 border border-gray-300 rounded w-1/2">
        <h2 className="text-xl font-semibold mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}