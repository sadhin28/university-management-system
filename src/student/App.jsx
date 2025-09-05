// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../Pages/Profile";
import StudentDashboard from "./StudentDashboard";
import Studentenrollmentpage from "./Studentenrollmentpage";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<StudentDashboard/>}>
          <Route path="/studentpanel/profile" element={<Profile/>} />
          <Route path="/studentpanel/enrollments" element={<Studentenrollmentpage/>} />
        </Route>
      </Routes>
    </Router>
  );
}
