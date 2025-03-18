import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const customStyles = `
  .color-dark-green { fill: #388E3C; }
  .color-medium-green { fill: #81C784; }
  .color-light-green { fill: #A5D6A7; }
  .color-empty { fill: #D3D3D3; }
`;

const HeatMap2 = () => {
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const user = JSON.parse(localStorage.getItem("persist:root"));
  const currentUser = user ? JSON.parse(user.user).currentUser : null;
  const userId = currentUser ? currentUser._id : null;

  console.log("User ID from Local Storage:", userId);

  const fetchContestProgress = async () => {
    try {
      const response = await fetch(`/api/contest/progress/${userId}`);
      const data = await response.json();

      console.log("Contest Progress Data:", data);

      if (
        data.success &&
        data.data &&
        Array.isArray(data.data.problemsSolved)
      ) {
        const problemsSolved = data.data.problemsSolved;

        console.log("Problems Solved Array:", problemsSolved);

        const formattedData = problemsSolved
          .map((entry) => {
            const date = entry.solvedAt;
            if (date) {
              const dateOnly = new Date(date).toISOString().split("T")[0];
              return {
                date: dateOnly,
                count: 1,
              };
            }
            return null;
          })
          .filter(Boolean);

        console.log("Formatted Data:", formattedData);

        const aggregatedData = formattedData.reduce((acc, current) => {
          const { date, count } = current;
          if (acc[date]) {
            acc[date].count += count;
          } else {
            acc[date] = { date, count };
          }
          return acc;
        }, {});

        console.log("Aggregated Data:", aggregatedData);

        const finalData = Object.values(aggregatedData);

        console.log("Final Data for Heatmap:", finalData);

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
      fetchContestProgress();
    } else {
      console.log("No userId found, skipping data fetch.");
    }
  }, [userId]);

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
        tooltipDataAttrs={(value) => {
          if (!value || !value.date)
            return { "data-tooltip-id": "heatmap-tooltip" };

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} ${
              value.count === 1 ? "problem" : "problems"
            } solved`,
          };
        }}
      />
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
};

export default HeatMap2;
