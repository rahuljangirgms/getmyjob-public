import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../../store/slices/admin/searchSlice"; // ✅ Ensure correct import
import { Search } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value)); // ✅ Dispatch action correctly
  };

  return (
  
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Jobseekers</label>
                            <div className="relative">
                                <input
        type="text"
        placeholder="Search Jobseekers..."
        onChange={handleSearchChange}
        className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600"
      />
                                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </div>
                        </div>
   
  );
};

export default SearchBar;
