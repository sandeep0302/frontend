import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("3"); // Default to March

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Transactions Dashboard</h1>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Month:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <Statistics selectedMonth={selectedMonth} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart selectedMonth={selectedMonth} />
          <PieChart selectedMonth={selectedMonth} />
        </div>
        <TransactionsTable selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default App;
