import React, { useState } from "react";

const Profile = () => {
    // Example state hooks (adjust to your needs)
    const [profileName, setProfileName] = useState("Jhon Doe");
    const [username, setUsername] = useState("jhondoe");
    const [statusPicture, setStatusPicture] = useState("");
    const [aboutMe, setAboutMe] = useState(
        "Discuss anything you want about your profile here."
    );

    const handleChangePicture = () => {
        // Logic to change the profile picture
        alert("Change picture clicked!");
    };

    const handleDeletePicture = () => {
        // Logic to delete the profile picture
        alert("Delete picture clicked!");
    };

    return (
        <div className=" p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                User Profile
            </h2>
            {/* Profile Picture & Change Button */}
            <div className="flex items-center gap-4 mb-6">
                {/* Placeholder avatar */}
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                    {/* Replace with actual <img src="..." /> if you have an avatar */}
                    <svg
                        className="w-full h-full text-gray-400 dark:text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12c2.131 0 4-1.869 4-4s-1.869-4-4-4-4 1.869-4 4 1.869 4 4 4zM12 14c-2.668 0-8 1.338-8 4v2h16v-2c0-2.662-5.332-4-8-4z" />
                    </svg>
                </div>
                <button
                    onClick={handleChangePicture}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                >
                    Change picture
                </button>
                <button
                    onClick={handleDeletePicture}
                    className="text-red-500 hover:underline text-sm"
                >
                    Delete picture
                </button>
            </div>

            {/* Profile Name */}
            <div className="mb-4">
                <label
                    htmlFor="profileName"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Profile name
                </label>
                <input
                    id="profileName"
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Username */}
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {/* Example "availability" text */}
                <p className="mt-1 text-xs text-gray-400">
                    Available at: @{username}
                </p>
            </div>

            {/* Status Picture (Optional) */}
            <div className="mb-4">
                <label
                    htmlFor="statusPicture"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Status picture
                </label>
                <input
                    id="statusPicture"
                    type="text"
                    placeholder="Paste a status picture URL or short note"
                    value={statusPicture}
                    onChange={(e) => setStatusPicture(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* About Me */}
            <div className="mb-4">
                <label
                    htmlFor="aboutMe"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    About me
                </label>
                <textarea
                    id="aboutMe"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md h-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Delete Picture Link */}
            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated on 25/04/2024
                </p>
               
            </div>
        </div>
    );
};

export default Profile;
