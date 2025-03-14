import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemsSolved: [
      {
        problemId: {
          type: String,
          required: true,
        },
        solvedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    problemsAttempted: [
      {
        problemId: {
          type: String,
          required: true,
        },
        verdict: {
          type: String,
          enum: ["WA", "TLE"],
          required: true,
        },
        attemptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    solvedCount: {
      type: Number,
      default: 0,
    },
    attemptedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Contest = mongoose.model("Contest", contestSchema);

export default Contest;
