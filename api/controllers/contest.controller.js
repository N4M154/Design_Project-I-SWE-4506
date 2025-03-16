import Contest from "../models/contest.model.js";


export const updateContestProgress = async (req, res) => {
  try {
    const { userId, problemId, verdict, language } = req.body;

    console.log("[DEBUG] Received contest progress update:", req.body);

    // Find the contest document for the user
    let contest = await Contest.findOne({ user: userId });

    // If no contest record exists for the user, create a new one
    if (!contest) {
      console.log("[DEBUG] Contest record not found. Creating a new one.");
      contest = new Contest({ user: userId });
    }

    // Always add the problem to the solved or attempted arrays (no checks)
    if (verdict === "AC") {
      contest.problemsSolved.push({ problemId });
      contest.solvedCount += 1;
      contest.totalSolved += 1; // Increment the total solved problems count
      contest.languageStats[language].solved += 1; // Increment the solved count for the specific language
      console.log(`[DEBUG] Incrementing solved count for ${language}`);
    } else if (verdict === "WA" || verdict === "TLE") {
      contest.problemsAttempted.push({
        problemId,
        verdict,
      });
      contest.attemptedCount += 1;
      contest.totalAttempted += 1; // Increment the total attempted problems count
      contest.languageStats[language].attempted += 1; // Increment the attempted count for the specific language
      console.log(`[DEBUG] Incrementing attempted count for ${language}`);
    }

    // Save the updated contest document to the database
    await contest.save();
    console.log("[DEBUG] Contest progress updated and saved successfully.");

    // Respond with the updated contest progress
    res.status(200).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    console.error("[DEBUG] Error while updating contest progress:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


    

export const getContestProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const contest = await Contest.findOne({ user: userId });

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "No contest progress found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        solvedCount: contest.solvedCount,
        attemptedCount: contest.attemptedCount,
        totalSolved: contest.totalSolved,
        totalAttempted: contest.totalAttempted,
        languageStats: contest.languageStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
