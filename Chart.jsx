import React from "react";
import { createRoot } from "react-dom/client";
import ReactApexChart from "react-apexcharts";


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

    
    this.state = {
      series: generateData(6, 30, { min: 0, max: 10 }),
      options: {
        chart: {
          height: 300,
          width: 300, 
          type: 'heatmap',
          foreColor: '#ffffff',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            borderWidth: 1,
            borderColor: '#000000', 
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 3,
                  color: '#FFFFF0',
                  name: 'Low',
                },
                {
                  from: 4,
                  to: 6,
                  color: '#FAD5A5',
                  name: 'Medium',
                },
                {
                  from: 7,
                  to: 10,
                  color: '#FFBF00',
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
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: true,
            offsetX: -10, 
            style: {
              colors: '#ffffff',  
              fontSize: '12px',
            },
            formatter: (val, index) => {
             
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
          borderColor: '#000000', 
        },
        title: {
          text: '6-Month Activity Heatmap',
          align: 'center',
          style: {
            color: '#ffffff', 
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
