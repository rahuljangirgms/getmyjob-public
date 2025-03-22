import React, { useState } from "react";

const Settings = () => {
    const [email, setEmail] = useState("example@mail.com");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("9876543210");
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState("UTC");
    const [notifyEmail, setNotifyEmail] = useState(true);
    const [notifySMS, setNotifySMS] = useState(false);

    const handleSave = () => {
        // Logic to save changes
        alert("Changes saved!");
    };

    return (
        <div className="p-6 mx-auto bg-white dark:bg-gray-800 ">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Account Settings
            </h2>

            {/* Email */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    New Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
                <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Language */}
            <div className="mb-4">
                <label
                    htmlFor="language"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Language
                </label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </select>
            </div>

            {/* Time Zone */}
            <div className="mb-4">
                <label
                    htmlFor="timezone"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Time Zone
                </label>
                <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="block w-full px-3 py-2 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="UTC">UTC</option>
                    <option value="IST">IST</option>
                    <option value="CST">CST</option>
                    <option value="EST">EST</option>
                </select>
            </div>

            {/* Notifications */}
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notifications
                </h3>
                <div className="flex items-center mb-2">
                    <input
                        id="notifyEmail"
                        type="checkbox"
                        checked={notifyEmail}
                        onChange={() => setNotifyEmail(!notifyEmail)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="notifyEmail"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                        Email Notifications
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="notifySMS"
                        type="checkbox"
                        checked={notifySMS}
                        onChange={() => setNotifySMS(!notifySMS)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="notifySMS"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                        SMS Notifications
                    </label>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
