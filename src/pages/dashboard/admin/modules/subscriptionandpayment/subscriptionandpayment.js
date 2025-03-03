import { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaMoneyBillWave, FaChartLine, FaUserCheck, FaClock, FaCreditCard, FaTrophy, FaEllipsisV, FaSearch } from "react-icons/fa";
import { Search, MoreVertical, Edit, Trash } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";


import {Dropdown,Button, Modal } from "flowbite-react";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




const SubscriptionPayment = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  const insights = [
  {
    id: 1,
    title: "Total Earnings",
    value: "$242.65K",
    subtext: "From the running month",
    icon: <FaMoneyBillWave />,
    bgColor: "bg-purple-200",
    darkBg: "dark:bg-purple-800"
  },
  {
    id: 2,
    title: "Average Revenue",
    value: "$17.35K",
    subtext: "Daily average revenue this month",
    icon: <FaChartLine />,
    bgColor: "bg-blue-200",
    darkBg: "dark:bg-blue-800"
  },
  {
    id: 3,
    title: "Active Subscriptions",
    value: "1,450 Users",
    subtext: "Total currently subscribed users",
    icon: <FaUserCheck />,
    bgColor: "bg-green-200",
    darkBg: "dark:bg-green-800"
  },
  {
    id: 4,
    title: "Expiring This Month",
    value: "124 Users",
    subtext: "Subscriptions expiring in the next 30 days",
    icon: <FaClock />,
    bgColor: "bg-yellow-200",
    darkBg: "dark:bg-yellow-800"
  },
  {
    id: 5,
    title: "Pending Payments",
    value: "$8,200",
    subtext: "Unpaid invoices and pending dues",
    icon: <FaCreditCard />,
    bgColor: "bg-red-200",
    darkBg: "dark:bg-red-800"
  },
 
];

const [timePeriod, setTimePeriod] = useState("year");

  // Sample Data for Subscription Growth
  const yearlyData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Subscribers",
        data: [500, 1200, 1800, 2400, 3200],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Subscribers",
        data: [120, 150, 200, 250, 300, 350],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: { ticks: { color: "gray" } },
      y: { ticks: { color: "gray" } },
    },
  };
  // Modal State
  const [openModal, setOpenModal] = useState(false);



  // table 

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  // Sample Subscription Data
  const subscriptions = [
    { id: 1, user: "John Doe", plan: "Premium", price: "$49.99", status: "Active", renewal: "March 25, 2024" },
    { id: 2, user: "Jane Smith", plan: "Basic", price: "$19.99", status: "Expired", renewal: "February 10, 2024" },
    { id: 3, user: "Michael Lee", plan: "Standard", price: "$29.99", status: "Active", renewal: "April 15, 2024" },
    { id: 4, user: "Emma Watson", plan: "Enterprise", price: "$99.99", status: "Pending", renewal: "March 30, 2024" },
    { id: 5, user: "Raj Patel", plan: "Basic", price: "$19.99", status: "Active", renewal: "May 10, 2024" },
  ];

  // Filtered Data
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      (searchTerm === "" || sub.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || sub.status === statusFilter) &&
      (planFilter === "All" || sub.plan === planFilter)
  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

<div className="pt-24 p-6">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  ">
      {insights.map(({ id, title, value, subtext, icon, bgColor, darkBg }) => (
        <div
          key={id}
          className={`p-6   ${bgColor} ${darkBg} text-gray-900 dark:text-gray-100 transition-all  flex flex-col gap-2`}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            <div className="text-xl rounded-xl bg-gray-100 dark:bg-gray-900  shadow-xl p-3">{icon}</div>
            {title}
          </div>
          <p className="text-3xl font-bold mt-2 text-center">{value}</p>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-1">{subtext}</p>
        </div>
      ))}
    </div>




     {/* Revenue Growth */}

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
      {/* 📊 Graph Section (8-column) */}
      <div className="lg:col-span-8 ">
      
      <div className="md:col-span-2  bg-white dark:bg-gray-800 p-6  relative ">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Subscription Overview</h3>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-200 focus:border-blue-200 block p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-700 dark:focus:border-indigo-700"
        >
          <option value="year">Yearly Trend</option>
          <option value="month">Monthly Trend</option>
        </select>
      </div>

      {/* Chart Container */}
      <div className="h-[300px] bg-white dark:bg-gray-800 p-4  border-2 dark:border-gray-700 border-gray-200">
        <Line data={timePeriod === "year" ? yearlyData : monthlyData} options={options} />
      </div>
    </div>


      </div>

      {/* 📋 Add Plan Section (4-column) */}
      <div className="lg:col-span-4 bg-white dark:bg-gray-900 p-6   flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Add New Plan
        </h2>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg transition-all"
        >
          Add Plan
        </Button>
      </div>

      {/* Modal for Adding Plan */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Subscription Plan</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Plan Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
                placeholder="Enter Plan Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
                placeholder="Enter Price"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Features
              </label>
              <textarea
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200"
                placeholder="Enter Plan Features"
              />
            </div>

            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all">
              Save Plan
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>


    {/* tabe  */}

  <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Manage Subscriptions</h2>

      {/* 🔹 Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search Input */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Search User</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select
            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
        </div>

        {/* Plan Filter */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Subscription Plan</label>
          <select
            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option>All</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
            <option>Enterprise</option>
          </select>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-700">
          {/* Table Header */}
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Renewal Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sub.user}</td>
                  <td className="px-4 py-2">{sub.plan}</td>
                  <td className="px-4 py-2">{sub.price}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      sub.status === "Active"
                        ? "text-green-600 dark:text-green-400"
                        : sub.status === "Expired"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="px-4 py-2">{sub.renewal}</td>
                  <td className="px-4 py-2 text-center">
                    {/* 🔹 Actions */}
                    <div className="flex justify-center gap-3">
                      <Button size="xs" color="blue" className="px-2 flex items-center gap-1">
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button size="xs" color="red" className="px-2 flex items-center gap-1">
                        <Trash size={14} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-600 dark:text-gray-300">
                  No matching subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
   
</div>
   
      
    </div>
  );
};

export default SubscriptionPayment;




