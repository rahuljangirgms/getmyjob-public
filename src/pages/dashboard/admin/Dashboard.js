import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

import {
  Users,
  Briefcase,
  Building,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUpRight

} from "lucide-react"; // Import icons




import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import JobManagement from './../recruiter/Jobmanagement/JobManagement';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);




export default function Dashboard() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "50.2K",
      description: "Registered users on the platform",
      bgLight: "bg-purple-200",
      bgDark: "dark:bg-purple-700",
      textDark: "dark:text-purple-100",
      icon: <Users className="w-6 h-6 text-purple-500 dark:text-purple-700" />,
    },
    {
      title: "Total Job Seekers",
      value: "32.5K",
      description: "Active job-seeking candidates",
      bgLight: "bg-green-200",
      bgDark: "dark:bg-green-700",
      textDark: "dark:text-green-100",
      icon: <Building className="w-6 h-6 text-green-500 dark:text-green-700" />,
    },
    {
      title: "Total Recruiters",
      value: "12.3K",
      description: "Verified company recruiters",


      bgLight: "bg-blue-200",
      bgDark: "dark:bg-blue-700",
      textDark: "dark:text-blue-100",
      icon: <Briefcase className="w-6 h-6 text-blue-500 dark:text-blue-700" />,
    },
    {
      title: "Jobs Filled",
      value: "8.7K",
      description: "Successfully closed job positions",
      bgLight: "bg-yellow-200",
      bgDark: "dark:bg-yellow-700",
      textDark: "dark:text-yellow-100",
      icon: (
        <CheckCircle className="w-6 h-6 text-yellow-500 dark:text-yellow-700" />
      ),
    },
  ];


  const swiperRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const recruiters = [
    { name: "Mahid Ahmed", role: "Senior Recruiter", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png" },
    { name: "Daniel Karl", role: "HR Lead", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png" },
    { name: "Elena Michel", role: "Talent Acquisition", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png" },
    { name: "Salina Mitso", role: "Recruitment Specialist", image: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" },
    { name: "John Doe", role: "Recruiter", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png" },
    { name: "Jane Smith", role: "HR Specialist", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png" }
  ];

  const jobSeekers = [
    { name: "Ava Johnson", role: "Software Engineer", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png" },
    { name: "Noah Brown", role: "Data Analyst", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png" },
    { name: "Sophia Wilson", role: "Graphic Designer", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png" },
    { name: "Liam Garcia", role: "Marketing Specialist", image: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" },
    { name: "Ava Johnson", role: "Software Engineer", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png" },
    { name: "Noah Brown", role: "Data Analyst", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png" },
    { name: "Sophia Wilson", role: "Graphic Designer", image: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png" },
    { name: "Liam Garcia", role: "Marketing Specialist", image: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" },
  ];
  const alerts = [
    { user: "Mike Wilson", date: "23 May", message: "Failed to login on Salesforce", severity: "Low", color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300" },
    { user: "James Arthur", date: "18 May", message: "XSS attempt to infrastructure", severity: "High", color: "bg-purple-500 text-white" },
    { user: "Anna Carlson", date: "14 May", message: "Database overload", severity: "Medium", color: "bg-orange-500 text-white" },
    { user: "Jane Watson", date: "3 May", message: "MongoDB limit reached", severity: "Low", color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300" },
    { user: "Lucas Brown", date: "1 May", message: "Unauthorized access detected", severity: "High", color: "bg-red-500 text-white" },
    { user: "Olivia Davis", date: "28 Apr", message: "Server downtime reported", severity: "Medium", color: "bg-yellow-500 text-white" },
  ];
  const nextSlide = () => {
    setScrollIndex((prevIndex) => (prevIndex + 1) % recruiters.length);
  };

  const prevSlide = () => {
    setScrollIndex((prevIndex) => (prevIndex - 1 + recruiters.length) % recruiters.length);
  };

  const nextSlide1 = () => {
    setScrollIndex((prevIndex) => (prevIndex + 1) % (alerts.length - 3));
  };

  const prevSlide1 = () => {
    setScrollIndex((prevIndex) => (prevIndex === 0 ? alerts.length - 4 : prevIndex - 1));
  };





  const [timePeriod, setTimePeriod] = useState("year");

  const recruiterDataSets = {
    year: [100, 200, 180, 250, 300, 350, 400, 450, 420, 480, 500, 550],
    month: [10, 20, 18, 25, 30, 35, 40, 45, 42, 48, 50, 55],
  };

  const jobSeekerDataSets = {
    year: [150, 180, 220, 300, 320, 400, 420, 500, 550, 600, 620, 650],
    month: [15, 25, 30, 35, 40, 50, 55, 60, 70, 75, 80, 85],
  };

  const registrationData = {
    labels: timePeriod === "year" ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Recruiter Registrations",
        data: timePeriod === "year" ? recruiterDataSets.year : recruiterDataSets.month,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(67, 56, 202, 1)",
        pointRadius: 5,
      },
      {
        label: "Job Seeker Registrations",
        data: timePeriod === "year" ? jobSeekerDataSets.year : jobSeekerDataSets.month,
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(99, 102, 241, 0.1"
        },
      },
      x: {
        grid: {
          color: "rgba(99, 102, 241, 0.1"
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#6b7280",
        },
      },
    },
  };

  const supportchartoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };



  const supportdata = {
    labels: ["Pending Approvals", "Flagged Complaints", "Subscription Issues", "Recruiter Verifications", "User Reports"],
    datasets: [
      {
        label: "Number of Cases",
        data: [50, 30, 20, 40, 25],
        backgroundColor: "#3B82F6", // Tailwind blue-500
        borderRadius: 6,
      },
    ],
  };




  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative top-[74px] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section (8 parts) */}
          <div className="md:col-span-2   ">




            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 ">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`relative p-3 rounded-2xl  ${stat.bgLight} ${stat.bgDark} transition-colors`}
                >
                  {/* Icon in top-right */}
                  <div className="absolute bottom-4 right-4 rounded-3xl bg-gray-100 dark:bg-gray-900  shadow-sm p-3">{stat.icon}</div>

                  {/* Text Content */}

                  <div className="h-full flex flex-col justify-between ">

                    <p className="text-gray-600 dark:text-gray-300">{stat.description}</p>
                    <div>

                      <h2 className="text-gray-700 dark:text-white font-semibold text-lg">
                        {stat.title}
                      </h2>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                    </div>


                  </div>
                </div>
              ))}
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



              {/* Recruiter & Job Seeker Registrations Chart */}
              <div className=" md:col-span-2 mt-6 bg-white dark:bg-gray-800 p-6 rounded-3xl  relative">
                <div className="w-full flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Registrations Overview</h3>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-200 focus:border-blue-200 block p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-700 dark:focus:border-indigo-700 "
                  >
                    <option value="year">Yearly Trend</option>
                    <option value="month">Monthly Trend</option>
                  </select>
                </div>

                <div className="h-[262px] bg-white dark:bg-gray-800 p-4 rounded-3xl border-2 dark:border-gray-700 border-gray-200 ">
                  <Line data={registrationData} options={options} />
                </div>
              </div>


              {/* Recruiter & Job Seeker Registrations Chart */}
              <div className=" md:col-span-1 mt-6  p-4 rounded-3xl border-gray-300  border-dashed border-2 dark:border-gray-700 relative">

                <div className="flex h-full flex-col justify-between ">
                 
                    <h3 className="text-lg font-semibold ">Support Management</h3>
                   
                  <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-3xl ">
                   

                     <div className="flex justify-between items-center ">
                    <h3 className="text-md font-semibold">Requests by Category</h3>
                    <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                    <div className="h-48">
                      <Bar data={supportdata} options={supportchartoptions} />
                    </div>
                  </div>
                </div>


              </div>



            </div>
            {/* alerts  */}
            <div>

              <div className="relative max-w-full mx-auto bg-white dark:bg-gray-900 p-6 mt-6 rounded-3xl ">
                {/* Header with Custom Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notifications Alerts</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Swiper Carousel */}
                {/* Swiper Carousel */}
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={4}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="overflow-hidden"
                >
                  {alerts.map((alert, index) => (
                    <SwiperSlide key={index}>
                      <div className="p-3 h-full flex flex-col justify-between bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
                        {/* Header */}
                        <div className="mb-2">
                          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-200">{alert.user}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{alert.date}</p>
                        </div>

                        {/* Message */}
                        <p className="mb-2 text-gray-700 dark:text-gray-300 flex-grow">{alert.message}</p>

                        {/* Severity Badge */}
                        <span className={`px-3 py-1 text-sm w-20 font-medium rounded-full ${alert.color}`}>{alert.severity}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>


          </div>



          {/* Right Section (4 parts) */}
          <div className="md:col-span-1 ">




            {/* Recently Added Recruiters */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">Recently Added Recruiters</h3>
                <div className="w-full sm:w-auto flex justify-end gap-2 mb-2">

                  <button onClick={prevSlide} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    <ChevronLeft className="w-5 h-5 " />
                  </button>

                  <button onClick={nextSlide} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4 overflow-hidden ">
                {recruiters.slice(scrollIndex, scrollIndex + 3).map((recruiter, index) => (
                  <div key={index} className="flex flex-wrap gap-6  justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-3xl transition-transform duration-500">

                    <div className="flex flex-wrap items-center gap-4">
                      <img src={recruiter.image} alt={recruiter.name} className="w-12 h-12 rounded-full  bg-gray-200 dark:bg-gray-600 p-1" />
                      <div>
                        <h4 className="text-md font-semibold">{recruiter.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{recruiter.role}</p>
                      </div>
                    </div>

                    <button type="button" class=" lg:w-auto md:w-full flex justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-1.5 text-center mr-2">View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Added Job Seekers */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">Recently Added Job Seekers</h3>
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[280px] sidebarscroller custom-scrollbar hover:overflow-y-auto">
                {jobSeekers.map((jobSeeker, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:cursor-pointer">
                    <div className="flex items-center gap-4">
                      <img src={jobSeeker.image} alt={jobSeeker.name} className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 p-1" />
                      <div>
                        <h4 className="text-md font-semibold">{jobSeeker.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{jobSeeker.role}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-3" />
                  </div>
                ))}
              </div>
            </div>
            {/* Custom scrollbar styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          border-radius: 7px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar {
          opacity: 1;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: none;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 7px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Dark mode scrollbar */
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: none;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #666;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>


          </div>


        </div>

      </main>











    </div>
  );
}





