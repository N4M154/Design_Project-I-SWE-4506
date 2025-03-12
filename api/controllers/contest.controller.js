import Contest from "../models/contest.model.js";

// export const updateContestProgress = async (req, res) => {
//   try {
//     const { userId, problemId, verdict } = req.body;

//     let contest = await Contest.findOne({ user: userId });

//     // Create new contest record if it doesn't exist
//     if (!contest) {
//       contest = new Contest({ user: userId });
//     }

//     if (verdict === "AC") {
//       // Check if problem is already solved
//       const alreadySolved = contest.problemsSolved.some(
//         (p) => p.problemId === problemId
//       );
//       if (!alreadySolved) {
//         contest.problemsSolved.push({ problemId });
//         contest.solvedCount += 1;
//       }
//     } else {
//       // Add to attempted problems if WA or TLE
//       contest.problemsAttempted.push({
//         problemId,
//         verdict,
//       });
//       contest.attemptedCount += 1;
//     }

//     await contest.save();

//     res.status(200).json({
//       success: true,
//       data: contest,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateContestProgress = async (req, res) => {
  try {
    const { userId, problemId, verdict } = req.body;

    let contest = await Contest.findOne({ user: userId });

    // Create new contest record if it doesn't exist
    if (!contest) {
      contest = new Contest({ user: userId });
    }

    if (verdict === "AC") {
      // Check if problem is already solved
      const alreadySolved = contest.problemsSolved.some(
        (p) => p.problemId === problemId
      );
      if (!alreadySolved) {
        contest.problemsSolved.push({ problemId });
        contest.solvedCount += 1;
      }
    } else {
      // Add to attempted problems if WA or TLE
      const alreadyAttempted = contest.problemsAttempted.some(
        (p) => p.problemId === problemId
      );
      if (!alreadyAttempted) {
        contest.problemsAttempted.push({
          problemId,
          verdict,
        });
        contest.attemptedCount += 1;
      }
    }

    await contest.save();

    res.status(200).json({
      success: true,
      data: contest,
    });
  } catch (error) {
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
      data: contest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
