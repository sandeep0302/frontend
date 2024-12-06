import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChart } from "../api/api.js";

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBarChart(selectedMonth);
        const labels = response.data.map((range) => range._id); // Price ranges (e.g., 0-100, 101-200)
        const data = response.data.map((range) => range.count); // Count of items in each range

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Items",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  if (!chartData) return <div>Loading Bar Chart...</div>;

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Bar Chart (Price Ranges)</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
