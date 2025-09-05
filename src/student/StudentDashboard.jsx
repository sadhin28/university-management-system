// src/pages/Dashboard.jsx
import { Link, Outlet } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-5 space-y-6">
        <h1 className="text-2xl font-bold">Student Panel</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="profile" className="hover:bg-blue-500 p-2 rounded">👤 Profile</Link>
          <Link to="enrollments" className="hover:bg-blue-500 p-2 rounded">📘 Enrollments</Link>
          <Link to="credits" className="hover:bg-blue-500 p-2 rounded">🎓 Credits</Link>
          <Link to="payments" className="hover:bg-blue-500 p-2 rounded">💳 Payments</Link>
          <Link to="notifications" className="hover:bg-blue-500 p-2 rounded">🔔 Notifications</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
