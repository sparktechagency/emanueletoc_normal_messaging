import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../../Redux/profileApis";

const Navbar = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();

  console.log(profileData);

  return (
    <div className="flex justify-between items-center   py-3 mx-4 rounded-md">
      <div></div>
      <div className="flex items-center gap-4">
        <Link
          to="/profile"
          className="flex items-center gap-2  border-[#6C63FF] border-2 p-2 rounded-md"
        >
          <FaUserCircle className="text-3xl text-gray-600 font-poppins" />
          <div className="text-left">
            <p className="text-sm font-semibold"> {profileData?.name}</p>
            <p className="text-xs text-gray-500">{profileData?.email}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
