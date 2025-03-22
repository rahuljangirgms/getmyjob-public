import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecruiterDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboardOverview")
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, );

  // ✅ Function to generate random colors for Pie Chart
  function getRandomColor() {
    const colors = ["#3366CC", "#0099CC", "#003366", "#33CC99", "#FF9900"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ✅ Extract jobPerformanceData dynamically from API response
  const jobPerformanceData = dashboardData
    ? Object.entries(dashboardData.jobPerformance).map(([key, value]) => ({
        name: key.replace(/([A-Z])/g, " $1").trim(),
        value,
        color: getRandomColor(),
      }))
    : [];

  return (
    <>
      <div>
        <div className="p-6 bg-gradient-to-br rounded-md from-blue-400 to-blue-500 text-white">
          {/* Top Navbar */}
          {/* <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-bold">DASHBOARD</h1>
            <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">
              JHON DOE
            </div>
          </div> */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["totalJobPostings", "applicationsReceived", "interviewsScheduled"].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-md text-gray-700 font-semibold">
                  {stat === "totalJobPostings"
                    ? "Total Job Postings"
                    : stat === "applicationsReceived"
                    ? "Applications Received"
                    : "Interviews Scheduled"}
                </h2>
                <p className="text-4xl text-blue-600 font-bold">
                  {loading ? <Skeleton width={50} height={30} /> : dashboardData?.quickStats[stat]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-gray-800 font-semibold">Recent Applications</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">See all</button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 p-2 text-left">Candidate</th>
                    <th className="border border-gray-200 p-2 text-left">Position</th>
                    <th className="border border-gray-200 p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [...Array(3)].map((_, index) => (
                        <tr key={index} className="border-t">
                          <td className="border border-gray-200 p-2"><Skeleton /></td>
                          <td className="border border-gray-200 p-2"><Skeleton /></td>
                          <td className="border border-gray-200 p-2"><Skeleton /></td>
                        </tr>
                      ))
                    : dashboardData.recentApplications.map((app) => (
                        <tr key={app.id} className="border-t">
                          <td className="border border-gray-200 p-2">{app.candidate}</td>
                          <td className="border border-gray-200 p-2">{app.position}</td>
                          <td className={`border border-gray-200 p-2 font-semibold ${
                              app.status === "Hired" ? "text-green-600" : "text-yellow-600"
                            }`}
                          >
                            {app.status}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Job Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg text-gray-800 font-semibold">Job Performance</h2>
            {loading ? (
              <Skeleton height={250} />
            ) : (
              <PieChart width={300} height={250}>
                <Pie data={jobPerformanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {jobPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-gray-800 font-semibold">Upcoming Interviews</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">See all</button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 p-2 text-left">Candidate</th>
                  <th className="border border-gray-200 p-2 text-left">Position</th>
                  <th className="border border-gray-200 p-2 text-left">Date</th>
                  <th className="border border-gray-200 p-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(2)].map((_, index) => (
                      <tr key={index} className="border-t">
                        <td className="border border-gray-200 p-2"><Skeleton /></td>
                        <td className="border border-gray-200 p-2"><Skeleton /></td>
                        <td className="border border-gray-200 p-2"><Skeleton /></td>
                        <td className="border border-gray-200 p-2"><Skeleton /></td>
                      </tr>
                    ))
                  : dashboardData.upcomingInterviews.map((interview) => (
                      <tr key={interview.id} className="border-t">
                        <td className="border border-gray-200 p-2">{interview.candidate}</td>
                        <td className="border border-gray-200 p-2">{interview.position}</td>
                        <td className="border border-gray-200 p-2">{interview.date}</td>
                        <td className="border border-gray-200 p-2">{interview.time}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;
