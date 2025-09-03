export default function EnrollCard({ enroll,onDelete,viewcourse }) {
  if (!enroll) {
    return (
      <div className="p-4 text-center text-gray-500 border rounded-xl">
        No enrollment data available.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto shadow-lg rounded-2xl px-10 py-4 bg-gray-100/20 border">
      <section className="flex flex-col gap-3">
        {/* Student Info */}
        <div>
          <h2 className="text-xl font-semibold">{enroll.studentName}</h2>
          <p className="text-sm text-gray-600">{enroll.studentEmail}</p>
          <p className="text-sm text-gray-500">Student ID: {enroll.studentId}</p>
        </div>

        {/* Course Info */}
        <div className="bg-gray-100 p-2 rounded-md">
          <p className="text-sm font-medium">Course ID: {enroll.courseId}</p>
        </div>

        {/* Enrollment Date */}
        <p className="text-xs text-gray-500">
          Enrolled At:{" "}
          {new Date(enroll.enrolledAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between text-xs space-x-2">
          <button onClick={()=>onDelete(enroll._id)} className=" border-2 font-bold hover:bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] hover:text-white  px-2 py-2 rounded-lg text-center items-center gap-2  text-xs">
             Cancel Enroll 
          </button>
          <button onClick={()=>viewcourse(enroll.courseId)} className=" border-2  hover:bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] hover:text-white  px-2 py-2 rounded-lg text-center items-center gap-2 font-bold text-xs">
             View Course 
          </button>
        </div>
      </section>
    </div>
  );
}
