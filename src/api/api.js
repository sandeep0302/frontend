import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

export const fetchTransactions = (month, page, perPage, search) =>
  axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, page, perPage, search },
  });

export const fetchStatistics = (month) =>
  axios.get(`${API_BASE_URL}/statistics`, { params: { month } });

export const fetchBarChart = (month) =>
  axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });

export const fetchPieChart = (month) =>
  axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });
