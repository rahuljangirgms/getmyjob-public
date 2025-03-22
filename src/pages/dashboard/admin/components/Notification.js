import React from "react";
import { FiBell } from "react-icons/fi";

// Helper to return the overlay SVG icon based on notification type
const getOverlayIcon = (type) => {
  switch (type) {
    case "message":
      return (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
          <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
        </svg>
      );
    case "follow":
      return (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
        </svg>
      );
    case "love":
      return (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
        </svg>
      );
    case "comment":
      return (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
        </svg>
      );
    case "video":
      return (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 14"
        >
          <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
        </svg>
      );
    default:
      return null;
  }
};

// Helper to return overlay background class based on type
const getOverlayBackgroundClass = (type) => {
  switch (type) {
    case "message":
      return "bg-primary-700 dark:border-gray-700";
    case "follow":
      return "bg-gray-900 dark:border-gray-700";
    case "love":
      return "bg-red-600 dark:border-gray-700";
    case "comment":
      return "bg-green-400 dark:border-gray-700";
    case "video":
      return "bg-purple-500 dark:border-gray-700";
    default:
      return "";
  }
};

const Notification = ({ showPulseNotification, notificationsData }) => {
  // Dynamic notifications data; if none provided via props, use this default array
  const notifications =
notificationsData ||
[
  {
    id: 1,
    type: "message",
    avatar:
      "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png",
    title:
      'New message from <span class="font-semibold text-gray-900 dark:text-white">Rajesh Kumar</span>: "Hey, are you ready for the meeting?"',
    time: "a few moments ago",
    link: "#",
  },
  {
    id: 2,
    type: "follow",
    avatar:
      "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png",
    title:
      '<span class="font-semibold text-gray-900 dark:text-white">Sneha Mehta</span> and <span class="font-medium text-gray-900 dark:text-white">3 others</span> started following you.',
    time: "10 minutes ago",
    link: "#",
  },
  {
    id: 3,
    type: "love",
    avatar:
      "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png",
    title:
      '<span class="font-semibold text-gray-900 dark:text-white">Vikram Singh</span> and <span class="font-medium text-gray-900 dark:text-white">50 others</span> love your update. See it and view more updates.',
    time: "44 minutes ago",
    link: "#",
  },
  {
    id: 4,
    type: "comment",
    avatar:
      "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png",
    title:
      '<span class="font-semibold text-gray-900 dark:text-white">Pooja Reddy</span> mentioned you in a comment: <span class="font-medium text-primary-700 dark:text-primary-500">@arun.verma</span> what do you say?',
    time: "1 hour ago",
    link: "#",
  },
  {
    id: 5,
    type: "video",
    avatar:
      "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png",
    title:
      '<span class="font-semibold text-gray-900 dark:text-white">Manish Gupta</span> posted a new video: "How to build scalable web apps using React".',
    time: "3 hours ago",
    link: "#",
  },
];


  return (
    <>
      {/* Notification Drawer Button */}
      <button
        className="relative p-2 bg-gray-50 hover:bg-gray-100 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700"
        type="button"
        data-dropdown-toggle="notification-dropdown"
      >
        <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />

        {/* Notification Badge with Pulse Effect */}
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5">
          {showPulseNotification && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          )}
          <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-medium border-2 border-white dark:border-gray-900">
            5
          </span>
        </span>
      </button>

      <div
        className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
        id="notification-dropdown"
      >
        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div>
          {notifications.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div className="flex-shrink-0 relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.avatar}
                  alt="User Avatar"
                />
                <div
                  className={`flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white ${getOverlayBackgroundClass(
                    item.type
                  )}`}
                >
                  {getOverlayIcon(item.type)}
                </div>
              </div>
              <div className="pl-3 w-full">
                <div
                  className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  // Using dangerouslySetInnerHTML to preserve the HTML in title (if any)
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                  {item.time}
                </div>
              </div>
            </a>
          ))}
        </div>
        <a
          href="#"
          className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div className="inline-flex items-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            View all
          </div>
        </a>
      </div>
    </>
  );
};

export default Notification;
