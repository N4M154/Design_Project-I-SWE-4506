import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const customStyles = `
  .color-dark-green { fill: #388E3C; }
  .color-medium-green { fill: #81C784; }
  .color-light-green { fill: #A5D6A7; }
  .color-empty { fill: #D3D3D3; }
`;

const HeatMap2 = () => {
  const [data, setData] = useState([]); // State to hold the formatted heatmap data
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // State to store current year

  // Fetching userId from localStorage
  const user = JSON.parse(localStorage.getItem("persist:root"));
  const currentUser = user ? JSON.parse(user.user).currentUser : null;
  const userId = currentUser ? currentUser._id : null;

  console.log("User ID from Local Storage:", userId); // Debugging - log userId

  // Function to fetch contest progress data from the backend
  const fetchContestProgress = async () => {
    try {
      const response = await fetch(`/api/contest/progress/${userId}`);
      const data = await response.json();

      console.log("Contest Progress Data:", data); // Debugging - log the fetched contest progress data

      if (
        data.success &&
        data.data &&
        Array.isArray(data.data.problemsSolved)
      ) {
        const problemsSolved = data.data.problemsSolved;

        console.log("Problems Solved Array:", problemsSolved); // Debugging - log problemsSolved array

        // Map each problem to its solvedAt date
        const formattedData = problemsSolved
          .map((entry) => {
            const date = entry.solvedAt; // Use 'solvedAt' as the date of solving
            if (date) {
              // Extract only the date (year-month-day)
              const dateOnly = new Date(date).toISOString().split("T")[0]; // Format: YYYY-MM-DD
              return {
                date: dateOnly, // The date when the problem was solved
                count: 1, // Each entry represents one solved problem
              };
            }
            return null;
          })
          .filter(Boolean); // Removes null values

        console.log("Formatted Data:", formattedData); // Debugging - log the formatted data

        // Aggregate data by date and count how many problems were solved on each date
        const aggregatedData = formattedData.reduce((acc, current) => {
          const { date, count } = current;
          if (acc[date]) {
            acc[date].count += count;
          } else {
            acc[date] = { date, count };
          }
          return acc;
        }, {});

        console.log("Aggregated Data:", aggregatedData); // Debugging - log the aggregated data

        // Convert the aggregated data back to an array
        const finalData = Object.values(aggregatedData);

        console.log("Final Data for Heatmap:", finalData); // Debugging - log final data

        // Set the formatted data to state for rendering
        setData(finalData);
      } else {
        console.error("Error: problemsSolved is missing or empty.");
      }
    } catch (error) {
      console.error("Failed to fetch contest progress:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchContestProgress(); // Fetch data when the component mounts
    } else {
      console.log("No userId found, skipping data fetch.");
    }
  }, [userId]);

  // Define color thresholds for the heatmap
  // const getColorForCount = (count) => {
  //   if (count >= 8) return "#388E3C"; // Dark green for high activity (solved >= 8)
  //   if (count >= 5) return "#81C784"; // Medium green for moderate activity (solved >= 5)
  //   if (count > 0) return "#A5D6A7"; // Light green for low activity (solved > 0)
  //   return "#D3D3D3"; // Gray for no activity
  // };
  const getColorClass = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 8) return "color-dark-green";
    if (value.count >= 5) return "color-medium-green";
    if (value.count > 0) return "color-light-green";
    return "color-empty";
  };
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <style>{customStyles}</style>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Contribution Heatmap
      </h2>
      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)}
        values={data}
        gutterSize={4}
        showWeekdayLabels={true}
        classForValue={getColorClass}
        tooltipDataAttrs={(value) => ({
          "data-tip": value.date
            ? `${value.date}: ${value.count} problems solved`
            : "No activity",
        })}
      />
    </div>
  );
};

export default HeatMap2;
