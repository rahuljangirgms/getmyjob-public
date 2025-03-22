import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import Navbar from "../../components/Navbar";

const ReportsAnalytics = () => {
  const [timeframe, setTimeframe] = useState("monthly");

  // Sample Data for Analytics
  const userEngagementData = [
    { month: "Jan", Active: 1200, Inactive: 300 },
    { month: "Feb", Active: 1500, Inactive: 250 },
    { month: "Mar", Active: 1700, Inactive: 200 },
    { month: "Apr", Active: 2000, Inactive: 180 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 8500 },
    { month: "Apr", revenue: 9500 },
  ];

  return (

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                {/* Navbar */}
                <Navbar />
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Reports & Analytics</h1>

      {/* User Engagement Chart */}
      <div className="mt-6 shadow-md rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">User Engagement Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userEngagementData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Active" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="Inactive" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Growth */}
      <div className="mt-6 shadow-md rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Revenue Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="revenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subscription & Churn Analysis */}
      <div className="mt-6 shadow-md rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Subscription & Churn Analysis</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">New Subscriptions</th>
                <th className="p-3 text-left">Churn Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Jan</td>
                <td className="p-3">300</td>
                <td className="p-3 text-red-500">5%</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Feb</td>
                <td className="p-3">350</td>
                <td className="p-3 text-red-500">4.5%</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Mar</td>
                <td className="p-3">420</td>
                <td className="p-3 text-green-500">3.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fraud Detection Alerts */}
      <div className="mt-6 shadow-md rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Fraud Detection Alerts</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left">Issue</th>
                <th className="p-3 text-left">Detected On</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Fake Job Postings</td>
                <td className="p-3">Mar 10, 2024</td>
                <td className="p-3 text-yellow-500">Under Review</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Spam Accounts</td>
                <td className="p-3">Mar 15, 2024</td>
                <td className="p-3 text-red-500">Action Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Download */}
      <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
        Download Full Report
      </button>
    </div>
    </div>
  );
};

export default ReportsAnalytics;
