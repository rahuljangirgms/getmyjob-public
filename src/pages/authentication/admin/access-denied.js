import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-4">
                <div
                    className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 011 1v4a1 1 0 01-2 0V7a1 1 0 011-1zm0 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <div>
                        <span className="font-medium">Access Denied!</span> You do not have access to this route. Please contact the administration.
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Go Dashboard
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AccessDenied;
