import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../api/api.js";

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStatistics(selectedMonth);
      setStats(response.data);
    };

    fetchData();
  }, [selectedMonth]);

  if (!stats) return <div>Loading statistics...</div>;

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h4 className="font-medium">Total Sale Amount</h4>
          <p>${stats.totalSaleAmount}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h4 className="font-medium">Total Sold Items</h4>
          <p>{stats.totalSoldItems}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h4 className="font-medium">Total Not Sold Items</h4>
          <p>{stats.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
