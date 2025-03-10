import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa6";
import avtar from './../../assets/images/userImages/avtar2.jpg'
import { MdOutlinePassword } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from './../../store/slices/jobSeeker/authentication/jobSeekerAuthSlice'
import dummyUserLogo from './../../assets/images/dummyuser.png'

function ProfileDropdown() {

  const profileData = useSelector(state => state.profileForms.personalInformation);

  const user = JSON.parse(localStorage.getItem("user")); 

  // console.log("USER: ",user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // ✅ Dispatch logout action
    navigate("/jobseeker/login"); // ✅ Redirect to login page  
};


    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-full bg-white p-1 md:px-3 md:py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
           {profileData.profilePicture ? <img
              src={profileData.profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />:<img
            src={dummyUserLogo}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />}
            {/* Hide Name & Job Title on Mobile */}
            <div className="hidden lg:flex flex-col text-sm items-start">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{profileData.specialization}</p>
            </div>
            <FaAngleDown className="hidden lg:block size-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem onClick={()=> navigate('/jobseeker/profile')}>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm text-gray-700 font-semibold hover:bg-gray-100"   
              
              >
                <LuUser className="size-4 text-gray-700" />
                Profile
              </button>
            </MenuItem>
          </div>
          <div className="py-1">
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm text-gray-700 font-semibold hover:bg-gray-100">
                <MdOutlinePassword className="size-4 text-gray-700" />
                Change Password
              </button>
            </MenuItem>
          </div>
          <div className="py-1">
            <MenuItem onClick={handleLogout}>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-sm text-gray-700 font-semibold hover:bg-gray-100">
                <LuLogOut className="size-4 text-gray-700" />
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    )
}

export default ProfileDropdown