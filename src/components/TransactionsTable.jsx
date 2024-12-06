import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../api/api.js";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTransactions(selectedMonth, page, 10, search);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    };

    fetchData();
  }, [selectedMonth, page, search]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Transactions</h3>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Date of Sale</th>
            <th className="border border-gray-300 p-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td className="border border-gray-300 p-2">{t.title}</td>
              <td className="border border-gray-300 p-2">{t.description}</td>
              <td className="border border-gray-300 p-2">{t.price}</td>
              <td className="border border-gray-300 p-2">
                {new Date(t.dateOfSale).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">{t.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
