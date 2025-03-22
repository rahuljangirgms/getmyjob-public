import { useEffect, useState } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaPaperclip,
  FaBriefcase,
  FaLaptop,
  FaNewspaper,
  FaCertificate,
  FaTrophy,
  FaBook,
} from "react-icons/fa";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import MobileNavigationBar from "./../../components/JobSeekerComponents/MobileNavigationBar";
import ConfirmationModal from './../../components/JobSeekerComponents/ReusableComponents/ConfirmationModal';

function CompleteProfileFormSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "personalInfo");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  const sidebarItems = [
    { id: "personalInfo", label: "Personal Information", icon: <FaUser size={20} />, route: "/jobseeker/complete-profile-form/personal-info" },
    { id: "contact", label: "Contact Details", icon: <FaPhoneAlt size={20} />, route: "/jobseeker/complete-profile-form/contact-info" },
    { id: "education", label: "Educational Details", icon: <FaGraduationCap size={20} />, route: "/jobseeker/complete-profile-form/education" },
    { id: "attachments", label: "Attachments/Documents", icon: <FaPaperclip size={20} />, route: "/jobseeker/complete-profile-form/attachments" },
    { id: "professional", label: "Professional Experience", icon: <FaBriefcase size={20} />, route: "/jobseeker/complete-profile-form/professional" },
    { id: "internship", label: "Internship", icon: <FaLaptop size={20} />, route: "/jobseeker/complete-profile-form/internship" },
    { id: "projects", label: "Projects", icon: <FaNewspaper size={20} />, route: "/jobseeker/complete-profile-form/projects" },
    { id: "publications", label: "Publications / Research Papers", icon: <FaBook size={20} />, route: "/jobseeker/complete-profile-form/publications" },
    { id: "trainings", label: "Trainings / Workshops", icon: <FaCertificate size={20} />, route: "/jobseeker/complete-profile-form/trainings" },
    { id: "certifications", label: "Certification / Assessments", icon: <FaTrophy size={20} />, route: "/jobseeker/complete-profile-form/certifications" },
    { id: "otherdetails", label: "Other Details", icon: <FaInfoCircle size={20} />, route: "/jobseeker/complete-profile-form/other-details" },
  ];

  // ✅ Save active tab to localStorage
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // ✅ Reset active tab when user navigates away
  useEffect(() => {
    const isProfileFormRoute = location.pathname.startsWith("/jobseeker/complete-profile-form");
    if (!isProfileFormRoute) {
      localStorage.removeItem("activeTab");
      setActiveTab("personalInfo");
    }
  }, [location.pathname]);

  // ✅ Warn before browser close or reload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFormDirty]);

  const handleTabClick = (id, route) => {
    if (isFormDirty) {
      setIsModalOpen(true);
      setPendingRoute({ id, route });
    } else {
      setActiveTab(id);
      navigate(route);
    }
  };

  const confirmNavigation = () => {
    if (pendingRoute) {
      setActiveTab(pendingRoute.id);
      navigate(pendingRoute.route);
      setIsModalOpen(false);
      setIsFormDirty(false);
      setPendingRoute(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      {/* Mobile Tabs */}
      <MobileNavigationBar sidebarItems={sidebarItems} isFormDirty={isFormDirty} setIsFormDirty={setIsFormDirty} />

      <div className="flex flex-row w-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/6 bg-white border-r border-gray-200 h-screen sticky top-0">
          <nav className="flex flex-col py-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id, item.route)}
                className={`flex items-center justify-start gap-3 px-4 py-6 text-sm transition-colors rounded-e-lg 
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-br from-blue-700 to-blue-500 text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto p-4 mt-10 md:mt-8">
          <Outlet context={{ setIsFormDirty }} />
        </div>
      </div>

      {/* Unsaved Changes Modal */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmNavigation}
          title="Leave this page"
          message="There might be unsaved changes. Are you sure you want to leave this page?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default CompleteProfileFormSection;
