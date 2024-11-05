import React, { useState } from "react";
import TestCases from "./TestCases";

const mockTestCases = [
  {
    input: "5 10",
    output: "15",
  },
  {
    input: "7 3",
    output: "10",
  },
  {
    input: "20 30",
    output: "50",
  },
];

function Workspace() {
  const [processing, setProcessing] = useState(false);

  // Mock handleCompile function
  const handleCompile = () => {
    setProcessing(true); // Set processing to true when compilation starts
    console.log("Compiling and executing code...");

    // Simulate a delay for compilation process
    setTimeout(() => {
      setProcessing(false); // Set processing to false after "compilation" finishes
      console.log("Compilation completed.");
    }, 2000);
  };

  return (
    <div className="workspace">
      <h2>Problem Workspace</h2>
      <TestCases
        handleCompile={handleCompile}
        testcases={mockTestCases}
        processing={processing}
      />
    </div>
  );
}

export default Workspace;
