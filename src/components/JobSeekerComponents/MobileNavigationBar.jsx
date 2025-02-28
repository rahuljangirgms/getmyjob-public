import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmationModal from './ReusableComponents/ConfirmationModal';

const MobileNavigationBar = ({ sidebarItems, isFormDirty, setIsFormDirty }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("mobileActiveTab") || sidebarItems[0]?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null); // Store intended navigation

  // ✅ Update active tab based on URL (on page load & navigation)
  useEffect(() => {
    const activeItem = sidebarItems.find((item) => location.pathname.includes(item.route));
    if (activeItem) {
      setActiveTab(activeItem.id);
      localStorage.setItem("mobileActiveTab", activeItem.id); // Persist active tab
    }
  }, [location.pathname, sidebarItems]);

  const handleTabClick = (id, route) => {
    if (isFormDirty) {
      setIsModalOpen(true);
      setPendingRoute({ id, route });
    } else {
      navigateToRoute(id, route);
    }
  };

  const navigateToRoute = (id, route) => {
    setActiveTab(id);
    navigate(route);
    setIsModalOpen(false);
    setIsFormDirty(false); // Reset form dirty state after navigation
    setPendingRoute(null);
  };

  // ✅ Find index of the current active tab
  const currentIndex = sidebarItems.findIndex((item) => item.id === activeTab);

  // ✅ Go to previous tab
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevTab = sidebarItems[currentIndex - 1];
      handleTabClick(prevTab.id, prevTab.route);
    }
  };

  // ✅ Go to next tab
  const goToNext = () => {
    if (currentIndex < sidebarItems.length - 1) {
      const nextTab = sidebarItems[currentIndex + 1];
      handleTabClick(nextTab.id, nextTab.route);
    }
  };

  return (
    <>
      {/* ✅ Mobile Navigation Bar */}
      <div className="block md:mt-4 lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-300 shadow-md p-3 flex items-center justify-between">        {/* Back Button */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`px-3 py-2 text-lg ${
            currentIndex === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <IoIosArrowBack />
        </button>

        {/* Display active form name */}
        <span className="font-semibold text-base text-gray-600 p-2 rounded-md">
          {sidebarItems[currentIndex]?.label || ""}
        </span>

        {/* Forward Button */}
        <button
          onClick={goToNext}
          disabled={currentIndex === sidebarItems.length - 1}
          className={`px-3 py-2 text-lg ${
            currentIndex === sidebarItems.length - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* ✅ Use Reusable Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigateToRoute(pendingRoute?.id, pendingRoute?.route)}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave?"
        confirmText="Yes, leave"
        cancelText="No, cancel"
      />
    </>
  );
};

export default MobileNavigationBar;
