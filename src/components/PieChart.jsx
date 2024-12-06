import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { fetchPieChart } from "../api/api.js";

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPieChart(selectedMonth);
        const labels = response.data.map((category) => category._id); // Category names
        const data = response.data.map((category) => category.count); // Number of items in each category

        setChartData({
          labels,
          datasets: [
            {
              label: "Items per Category",
              data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  if (!chartData) return <div>Loading Pie Chart...</div>;

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Pie Chart (Categories)</h3>
      <Pie
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

export default PieChart;
