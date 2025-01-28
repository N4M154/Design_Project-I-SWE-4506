// import Run from "../models/run.model.js";

// // Save or update run details
// export const saveRun = async (req, res) => {
//   const { userId, language } = req.body;

//   if (!userId || !language) {
//     return res.status(400).json({ error: "User ID and language are required" });
//   }

//   try {
//     // Find the user's run record
//     let run = await Run.findOne({ userId });

//     if (!run) {
//       // Create a new run record if it doesn't exist
//       run = new Run({
//         userId,
//         noOfRuns: 1, // First run
//         lastRunDate: new Date(),
//         runs: [{ language, noOfRuns: 1 }],
//       });
//     } else {
//       // Increment the total number of runs
//       run.noOfRuns += 1;
//       run.lastRunDate = new Date();

//       // Check if the language already exists
//       const languageRun = run.runs.find((r) => r.language === language);

//       if (languageRun) {
//         // Increment the number of runs for the language
//         languageRun.noOfRuns += 1;
//       } else {
//         // Add a new language entry if it doesn't exist
//         run.runs.push({ language, noOfRuns: 1 });
//       }
//     }

//     await run.save();
//     res.status(201).json({ message: "Run details saved successfully", run });
//   } catch (err) {
//     console.error("Error saving run details:", err);
//     res.status(500).json({ error: "Failed to save run details" });
//   }
// };

// // Get runs for a user
// export const getRuns = async (req, res) => {
//   const { userId } = req.query;

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     const runs = await Run.findOne({ userId });

//     if (!runs) {
//       return res
//         .status(404)
//         .json({ error: "No run details found for the user" });
//     }

//     res.status(200).json(runs);
//   } catch (err) {
//     console.error("Error fetching run details:", err);
//     res.status(500).json({ error: "Failed to fetch run details" });
//   }
// };

import Run from "../models/run.model.js";

export const saveRun = async (req, res) => {
  const { userId, language } = req.body;

  if (!userId || !language) {
    return res.status(400).json({ error: "User ID and language are required" });
  }

  try {
    // Format the date in dd-mm-yyyy format
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}-${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}`;

    // Create a new run entry
    const newRun = new Run({
      userId,
      date: formattedDate,
      language,
    });

    await newRun.save();
    res.status(201).json({ message: "Run logged successfully", run: newRun });
  } catch (err) {
    console.error("Error logging run:", err);
    res.status(500).json({ error: "Failed to log run" });
  }
};

// Get runs for a user
export const getRuns = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const runs = await Run.find({ userId });

    if (!runs) {
      return res
        .status(404)
        .json({ error: "No run details found for the user" });
    }

    res.status(200).json(runs);
  } catch (err) {
    console.error("Error fetching run details:", err);
    res.status(500).json({ error: "Failed to fetch run details" });
  }
};
