// menus.js
import { FaTachometerAlt, FaUserGraduate, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaMoneyBill, FaBell, FaUsersCog } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { MdAssignment } from "react-icons/md";
import { User } from "lucide-react";

export const getMenus = (user, role) => {
  if (!user) {
    return [
      { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
      { name: "Login", icon: <FaUserGraduate />, path: "/login" },
    ];
  }
  

  const baseMenu = role !=="admin"?[{ name: "Dashboard", icon:  <FaTachometerAlt />, path: "/" }]:[{ name: "Admin Dashboard", icon:  <FaTachometerAlt />, path: "/admin" }]
  const roleMenus = {
    student: [
      { name: "Profile", icon: <FaUserGraduate />, path: "/profile" },
      { name: "Courses", icon: <FaBook />, path: "/courses" },
      { name: "My Enrolled Course", icon: <SiCoursera />, path: "/my-enrolled" },
      { name: "Schedule", icon: <FaCalendarAlt />, path: "/studentChedule" },
      { name: "Faculty", icon: <FaChalkboardTeacher />, path: "/faculty" },
      { name: "Results", icon: <FaBook />, path: "/results" },
      { name: "Fees", icon: <FaMoneyBill />, path: "/fees" },
      { name: "Notices", icon: <FaBell />, path: "/notices" },
    ],
    teacher: [
      { name: "Profile", icon: <FaUserGraduate />, path: "/profile" },
      { name: "My Courses", icon: <FaBook />, path: "/my-courses" },
      { name: "Manage Students", icon: <FaUsersCog />, path: "/studentChedule" },
      { name: "Schedule", icon: <FaCalendarAlt />, path: "/schedule" },
      { name: "Assignments", icon: <MdAssignment />, path: "/assignments" },
      { name: "Results", icon: <FaBook />, path: "/results" },
      { name: "Notices", icon: <FaBell />, path: "/notices" },
    ],
    admin: [
      { name: "Manage Users", icon: <User />, path: "/alluser" },
      { name: "Manage Students", icon: <FaUserGraduate />, path: "/students" },
      { name: "Manage Faculty", icon: <FaChalkboardTeacher />, path: "/faculty" },
      { name: "Manage Courses", icon: <FaBook />, path: "/courses" },
      { name: "Schedule", icon: <FaCalendarAlt />, path: "/studentChedule" },
      { name: "Notices", icon: <FaBell />, path: "/admin-notices" },
      { name: "Payments", icon: <FaMoneyBill />, path: "/admin-payments" },
    ],
  };

  return [...baseMenu, ...(roleMenus[role] || [])];
};
