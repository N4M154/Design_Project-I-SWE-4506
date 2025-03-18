import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const HeatMap = ({ runData, currentDate }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const activityData = runData.reduce((acc, run, index) => {
      const [dd, mm, yyyy] = run.date.split("-");
      const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

      const existingEntry = acc.find((entry) => entry.date === isoDate);
      if (existingEntry) {
        existingEntry.count++;
        existingEntry.runs.push(index + 1);
      } else {
        acc.push({ date: isoDate, count: 1, runs: [index + 1] });
      }
      return acc;
    }, []);

    setHeatmapData(activityData);
  }, [runData]);

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 5) return "color-scale-4";
    if (value.count >= 3) return "color-scale-3";
    if (value.count >= 1) return "color-scale-1";
    return "color-empty";
  };

  const currentYear = new Date(
    currentDate.split("-").reverse().join("-")
  ).getFullYear();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #ebedf0; }
        .react-calendar-heatmap .color-scale-1 { fill: #80deea; }
        .react-calendar-heatmap .color-scale-3 { fill: #00bcd4; }
        .react-calendar-heatmap .color-scale-4 { fill: #0097a7; }
        .react-calendar-heatmap .color-scale-5 { fill: #006064; }
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
        tooltipDataAttrs={(value) => {
          if (!value || !value.date)
            return { "data-tooltip-id": "heatmap-tooltip" };

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} ${
              value.count === 1 ? "run" : "runs"
            }`,
          };
        }}
      />

      <Tooltip id="heatmap-tooltip" />
    </div>
  );
};

export default HeatMap;
