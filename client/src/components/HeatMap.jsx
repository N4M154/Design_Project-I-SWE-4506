import React, { useEffect, useState } from "react";

const HeatMap = ({ runData, currentDate }) => {
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    // Prepare data for 12 months
    const currentDateObj = new Date(currentDate.split("-").reverse().join("-"));
    const year = currentDateObj.getFullYear();

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      year,
    }));

    const generateHeatmapData = (month, year) => {
      const daysInMonth = new Date(year, month, 0).getDate();
      const dayCounts = {};

      runData.forEach((run) => {
        const [dd, mm, yyyy] = run.date.split("-").map(Number);
        if (mm === month && yyyy === year) {
          dayCounts[dd] = (dayCounts[dd] || 0) + 1;
        }
      });

      return Array.from({ length: 35 }, (_, i) => dayCounts[i + 1] || 0);
    };

    const heatmap = months.reduce((acc, { month, year }) => {
      acc[`${month}-${year}`] = generateHeatmapData(month, year);
      return acc;
    }, {});

    setHeatmapData(heatmap);
  }, [runData, currentDate]);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-12 gap-1">
        {Object.entries(heatmapData).map(([key, monthData], index) => (
          <div key={key} className="text-center">
            <h2 className="text-xs font-semibold text-yellow-700">
              {new Date(
                key.split("-")[1],
                key.split("-")[0] - 1
              ).toLocaleString("default", { month: "short" })}
            </h2>
            <div className="grid grid-cols-7 gap-0.5">
              {monthData.map((count, i) => (
                <div
                  key={`day-${index}-${i}`}
                  className={`w-3 h-3 border flex items-center justify-center`}
                  style={{
                    backgroundColor: count
                      ? `rgba(75,192,192,${Math.min(count / 10, 1)})`
                      : "#f4f4f4",
                    borderColor: count ? "#4bc0c0" : "#dcdcdc",
                  }}
                  title={count ? `Day ${i + 1}: ${count} run(s)` : ""}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;
