
// In Workspace.jsx or a test file

import React from "react";
import ProblemDescription from "./ProblemDescription";

const mockDetails = {
  order: 1,
  title: "Two Sum Problem",
  difficult: "Easy",
  description: "Find two numbers that add up to a target sum.",
  examples: [
    {
      input: "[2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "The sum of nums[0] and nums[1] is 9.",
    },
  ],
  constraints: ["1 <= nums.length <= 10^5", "Each input has exactly one solution."],
};

function Workspace() {
  return (
    <div>
      <ProblemDescription details={mockDetails} />
    </div>
  );
}

export default Workspace;
