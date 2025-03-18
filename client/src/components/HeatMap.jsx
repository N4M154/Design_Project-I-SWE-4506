// import React, { useEffect, useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";
// import { Tooltip as ReactTooltip } from "react-tooltip"; // Correct import
// import "react-tooltip/dist/react-tooltip.css";

// const HeatMap = ({ runData, currentDate }) => {
//   const [heatmapData, setHeatmapData] = useState([]);

//   useEffect(() => {
//     // Transform runData into the format needed for react-calendar-heatmap
//     const activityData = runData.reduce((acc, run, index) => {
//       // Convert dd-mm-yyyy to yyyy-mm-dd format
//       const [dd, mm, yyyy] = run.date.split("-");
//       const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

//       const existingEntry = acc.find((entry) => entry.date === isoDate);
//       if (existingEntry) {
//         existingEntry.count++;
//       } else {
//         acc.push({ date: isoDate, count: 1, runs: [] });
//       }
//       // Save the run's index as the run number
//       const runNumber = index + 1;
//       const entry = acc.find((entry) => entry.date === isoDate);
//       entry.runs.push(runNumber);
//       return acc;
//     }, []);

//     setHeatmapData(activityData);
//   }, [runData]);

//   // Custom color scale based on activity count
//   const getClassForValue = (value) => {
//     if (!value) return "color-empty";
//     if (value.count >= 5) return "color-scale-4";
//     if (value.count >= 3) return "color-scale-3";
//     if (value.count >= 1) return "color-scale-1";
//     return "color-empty";
//   };

//   // Get current year from currentDate
//   const currentYear = new Date(
//     currentDate.split("-").reverse().join("-")
//   ).getFullYear();

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <style>{`
//         .react-calendar-heatmap .color-empty { fill: #ebedf0; }
//         .react-calendar-heatmap .color-scale-1 { fill: #9be9a8; }
//         .react-calendar-heatmap .color-scale-3 { fill: #40c463; }
//         .react-calendar-heatmap .color-scale-4 { fill: #30a14e; }
//         .react-calendar-heatmap .color-scale-5 { fill: #216e39; }
//       `}</style>

//       <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//         Activity Heatmap
//       </h2>

//       <CalendarHeatmap
//         startDate={new Date(`${currentYear}-01-01`)}
//         endDate={new Date(`${currentYear}-12-31`)}
//         values={heatmapData}
//         classForValue={getClassForValue}
//         tooltipDataAttrs={(value) => ({
//           "data-tip": value.date
//             ? `${value.date}: ${value.count} ${
//                 value.count === 1 ? "run" : "runs"
//               } (${value.runs.join(", ")})`
//             : "No activity",
//         })}
//         showWeekdayLabels={true}
//         gutterSize={2}
//       />
//       {/* Adding ReactTooltip component */}
//       <ReactTooltip />
//     </div>
//   );
// };

// export default HeatMap;

import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip"; // Correct import
import "react-tooltip/dist/react-tooltip.css"; // Ensure tooltip styles are loaded

const HeatMap = ({ runData, currentDate }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Transform runData into the format needed for react-calendar-heatmap
    const activityData = runData.reduce((acc, run, index) => {
      // Convert dd-mm-yyyy to yyyy-mm-dd format
      const [dd, mm, yyyy] = run.date.split("-");
      const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

      const existingEntry = acc.find((entry) => entry.date === isoDate);
      if (existingEntry) {
        existingEntry.count++;
      } else {
        acc.push({ date: isoDate, count: 1, runs: [] });
      }
      // Save the run's index as the run number
      const runNumber = index + 1;
      const entry = acc.find((entry) => entry.date === isoDate);
      entry.runs.push(runNumber);
      return acc;
    }, []);

    setHeatmapData(activityData);
  }, [runData]);

  // Custom color scale based on activity count
  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 5) return "color-scale-4";
    if (value.count >= 3) return "color-scale-3";
    if (value.count >= 1) return "color-scale-1";
    return "color-empty";
  };

  // Get current year from currentDate
  const currentYear = new Date(
    currentDate.split("-").reverse().join("-")
  ).getFullYear();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <style>{`
  .react-calendar-heatmap .color-empty { fill: #ebedf0; }  /* Light cyan */
  .react-calendar-heatmap .color-scale-1 { fill: #80deea; }  /* Light blue */
  .react-calendar-heatmap .color-scale-3 { fill: #00bcd4; }  /* Medium blue */
  .react-calendar-heatmap .color-scale-4 { fill: #0097a7; }  /* Darker blue */
  .react-calendar-heatmap .color-scale-5 { fill: #006064; }  /* Very dark blue */
`}</style>

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Activity Heatmap
      </h2>

      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)}
        values={heatmapData}
        classForValue={getClassForValue}
        showWeekdayLabels={true}
        gutterSize={2}
        onClick={(value) => {
          // Optionally handle square clicks
        }}
        // Use this to apply tooltip directly to squares
        tooltipDataAttrs={(value) => ({
          "data-tip": value.date
            ? `${value.date}: ${value.count} ${
                value.count === 1 ? "run" : "runs"
              } (${value.runs.join(", ")})`
            : "No activity",
        })}
      />

      {/* ReactTooltip component to handle tooltips */}
      <ReactTooltip />
    </div>
  );
};

export default HeatMap;
