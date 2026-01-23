// src/pages/Enrollments.jsx
const enrollments = [
  {
    _id: "68bae050fd96ff015d5c3c77",
    courseId: "68b88306dd5a3af695c26486",
    courseName: "Web Development",
    credit: 3,
    fee: 300,
    enrolledAt: "2025-09-05T13:06:24.708Z",
  },
];

export default function Studentenrollmentpage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📘 My Enrollments</h2>
      {enrollments.map((e) => (
        <div
          key={e._id}
          className="p-4 bg-white shadow rounded-lg border mb-3"
        >
          <h3 className="text-lg font-semibold">{e.courseName}</h3>
          <p>Course ID: {e.courseId}</p>
          <p>Credits: {e.credit}</p>
          <p>Fee: ${e.fee}</p>
          <p>Enrolled At: {new Date(e.enrolledAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
