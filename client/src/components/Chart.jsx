import React from "react";
import { createRoot } from "react-dom/client";
import ReactApexChart from "react-apexcharts";

// Generate data function for 6 months with 30 days each
function generateData(months, daysPerMonth, { min, max }) {
  return Array.from({ length: months }, (_, monthIndex) => ({
    name: `Month ${monthIndex + 1}`,
    data: Array.from({ length: daysPerMonth }, (_, dayIndex) => ({
      x: `Day ${dayIndex + 1}`,
      y: Math.floor(Math.random() * (max - min + 1)) + min,
    })),
  }));
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    // Generating data for 6 months with 30 days each
    this.state = {
      series: generateData(6, 30, { min: 0, max: 10 }),
      options: {
        chart: {
          height: 400,
          width: 600, // Adjusted for a compact display
          type: 'heatmap',
          foreColor: '#ffffff', // Set text color to white
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            borderWidth: 1, // Add black border
            borderColor: '#000000', // Set border color to black
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 3,
                  color: '#d1eaff',
                  name: 'Low',
                },
                {
                  from: 4,
                  to: 6,
                  color: '#69b3e7',
                  name: 'Medium',
                },
                {
                  from: 7,
                  to: 10,
                  color: '#00429d',
                  name: 'High',
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'category',
          labels: {
            show: false, // Hide day labels on the x-axis
          },
        },
        yaxis: {
          labels: {
            show: true,
            offsetX: -10, // Add some distance between the month labels and the chart
            style: {
              colors: '#ffffff', // Set y-axis label color to white
              fontSize: '12px', // Adjust font size for readability
            },
            formatter: (val, index) => {
              // Label each of the 6 rows with the respective month
              const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
              return monthLabels[index];
            },
          },
        },
        grid: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          borderColor: '#000000', // Set grid border color to black
        },
        title: {
          text: '6-Month Activity Heatmap',
          align: 'center',
          style: {
            color: '#ffffff', // Set title color to white
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={400} width={600} />
        </div>
      </div>
    );
  }
}

// Render the Chart component
const domContainer = document.querySelector('#app');
if (domContainer) {
  const root = createRoot(domContainer);
  root.render(<Chart />);
}

export default Chart;