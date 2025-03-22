import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Bar } from "react-chartjs-2";
import StatusBadge from './../../components/statusbadge';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SupportManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");

  // Sample Ticket Data
  const tickets = [
    {
      id: 201,
      user: "Rahul Sharma",
      issue: "Unable to update profile",
      description:
        "I cannot update my profile information on the portal. It shows an error every time I try to save my changes.",
      priority: "Medium",
      status: "Open",
      category: "Profile Update",
      createdAt: "Mar 10, 2024 09:15 AM",
      updatedAt: "Mar 10, 2024 09:15 AM",
      assignedTo: "Support Agent Ravi",
      contact: "rahul.sharma@example.com",
      attachments: ["https://example.com/screenshot1.png"],
    },
    {
      id: 202,
      user: "Priya Singh",
      issue: "Job application submission error",
      description:
        "When submitting my job application, I receive an error message. I have tried multiple browsers but the issue persists.",
      priority: "High",
      status: "In Progress",
      category: "Application Error",
      createdAt: "Mar 09, 2024 11:30 AM",
      updatedAt: "Mar 09, 2024 12:00 PM",
      assignedTo: "Support Agent Anjali",
      contact: "priya.singh@example.com",
      attachments: ["https://example.com/screenshot2.png"],
    },
    {
      id: 203,
      user: "Amit Kumar",
      issue: "Payment issue for premium subscription",
      description:
        "I was charged twice for my premium subscription plan. Please review my transaction history and process a refund.",
      priority: "High",
      status: "Open",
      category: "Payment",
      createdAt: "Mar 08, 2024 02:45 PM",
      updatedAt: "Mar 08, 2024 02:45 PM",
      assignedTo: "Support Agent Manoj",
      contact: "amit.kumar@example.com",
      attachments: ["https://example.com/screenshot3.png"],
    },
    
    {
      id: 204,
      user: "Sonal Patel",
      issue: "Resume upload failure",
      description:
        "My resume doesn't upload properly and I receive a file format error, despite following the guidelines.",
      priority: "Medium",
      status: "Resolved",
      category: "Resume Upload",
      createdAt: "Mar 07, 2024 10:00 AM",
      updatedAt: "Mar 07, 2024 11:00 AM",
      assignedTo: "Support Agent Neha",
      contact: "sonal.patel@example.com",
      attachments: [],
    },
    {
      id: 205,
      user: "Vikram Reddy",
      issue: "Job alert notifications not working",
      description:
        "I am not receiving any job alerts despite setting my preferences in the portal. It appears to be a bug.",
      priority: "Low",
      status: "Open",
      category: "Notification",
      createdAt: "Mar 06, 2024 03:30 PM",
      updatedAt: "Mar 06, 2024 03:30 PM",
      assignedTo: "Support Agent Kiran",
      contact: "vikram.reddy@example.com",
      attachments: [],
    },
        {
      id: 206,
      user: "Pravin Patil",
      issue: "Payment issue for premium subscription",
      description:
        "I was charged twice for my premium subscription plan. Please review my transaction history and process a refund.",
      priority: "High",
      status: "Open",
      category: "Payment",
      createdAt: "Mar 08, 2024 02:45 PM",
      updatedAt: "Mar 08, 2024 02:45 PM",
      assignedTo: "Support Agent Manoj",
      contact: "amit.kumar@example.com",
      attachments: ["https://example.com/screenshot3.png"],
    },
  ];


  // Filter tickets based on status
  const filteredTickets = tickets.filter(ticket => selectedStatus === "all" || ticket.status === selectedStatus);

  // Summary counts for cards
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === "Open").length;
  const inProgressTickets = tickets.filter(t => t.status === "In Progress").length;
  const resolvedTickets = tickets.filter(t => t.status === "Resolved").length;
  const chartData = {
    labels: ["Open", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Tickets",
        data: [openTickets, inProgressTickets, resolvedTickets],
        backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow height adjustments
    plugins: {
      legend: {
        display: false, // Remove legend labels
      },
      title: {
        display: true,
        text: "Ticket Status Distribution",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Remove x-axis labels
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: true, // Show y-axis labels (numbers)
        },
        grid: {
          display: true,
        },
      },
    },
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="p-6  mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Support Ticket Management</h1>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-gray-900  rounded-2xl border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalTickets}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900  rounded-2xl border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Open Tickets</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{openTickets}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900  rounded-2xl border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{inProgressTickets}</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900  rounded-2xl border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{resolvedTickets}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Graph for Ticket Category */}
          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-6 border dark:border-gray-700" style={{ height: "300px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="col-span-1 md:col-span-9 bg-white dark:bg-gray-900 rounded-2xl p-6 border dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Ticket List</h2>
              <select
                className="px-3 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-3">ID</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Issue</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3 w-40">Status</th>
                    <th className="p-3">Assigned To</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <td className="p-3">{ticket.id}</td>
                      <td className="p-3">{ticket.user}</td>
                      <td className="p-3">{ticket.issue}</td>
                      <td className="p-3">{ticket.category}</td>
                      <td className="p-3">


                        <StatusBadge status={ticket.priority} />
                      </td>
                      <td className="p-3">

                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="p-3">{ticket.assignedTo}</td>
                      <td className="p-3">{ticket.createdAt}</td>
                <td className="p-3 relative">
  <button
    id={`dropdownMenuIconHorizontalButton-${ticket.id}`}
    data-dropdown-toggle={`dropdownDotsHorizontal-${ticket.id}`}
    type="button"
    className="inline-flex z-50 items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 3"
    >
      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  </button>

  <div
    id={`dropdownDotsHorizontal-${ticket.id}`}
    className="absolute right-0 mt-2 z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby={`dropdownMenuIconHorizontalButton-${ticket.id}`}
    >
      <li>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          View
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Mark as In Process
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Close
        </a>
      </li>
    </ul>
  </div>
</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>


      </div>

      {/* Flowbite Popup Modal for Ticket Details */}
      {selectedTicket && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
  {/* Backdrop */}
  <div
    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
    onClick={() => setSelectedTicket(null)}
  ></div>

  {/* Modal Container with fixed max height and flex layout */}
 <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
  {/* Backdrop */}
  <div
    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
    onClick={() => setSelectedTicket(null)}
  ></div>

  {/* Modal Container with fixed max height, increased width and flex layout */}
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all sm:max-w-6xl sm:w-full max-h-[80vh] flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Ticket Details
      </h2>
      <button
        onClick={() => setSelectedTicket(null)}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Scrollable Content */}
    <div className="px-6 py-4 space-y-6 overflow-y-auto flex-1">
      {/* Basic Info Cards in 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* User */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.user}</p>
        </div>
        {/* Issue */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Issue</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.issue}</p>
        </div>
        {/* Priority */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</p>
            <StatusBadge status={selectedTicket.priority} />
          </div>
        </div>
        {/* Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
            <StatusBadge status={selectedTicket.status} />
          </div>
        </div>
        {/* Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.category}</p>
        </div>
        {/* Assigned To */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned To</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.assignedTo}</p>
        </div>
        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contact</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.contact}</p>
        </div>
        {/* Date */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedTicket.createdAt}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Description</p>
        <p className="text-base text-gray-800 dark:text-gray-200">{selectedTicket.description}</p>
      </div>

      {/* Attachments */}
      {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Attachments</p>
          <div className="flex flex-wrap gap-4">
            {selectedTicket.attachments.map((url, index) => (
              <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border dark:border-gray-600"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Admin Response Section */}
      <div>
        <textarea
          placeholder="Write a response..."
          value={adminResponse}
          onChange={(e) => setAdminResponse(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800"
        />
      </div>
    </div>

    {/* Footer with Compact Buttons */}
    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
      <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm">
        Send
      </button>
      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">
        In Progress
      </button>
      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">
        Close
      </button>
    </div>
  </div>
</div>

</div>



      )}
    </div>
  );
};

export default SupportManagement;





