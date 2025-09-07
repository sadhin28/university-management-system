import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import Swal from "sweetalert2";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [paymentPaid, setPaymentPaid] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("Free Payment"); // default method
  const studentEmail = user.email;
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEnroll = await fetch(
          `${import.meta.env.VITE_API}/course/my-enrolled?studentEmail=${studentEmail}`
        );
        const enrollData = await resEnroll.json();
        setEnrollments(enrollData);

        const resCourses = await fetch(`${import.meta.env.VITE_API}/courses`);
        const courseData = await resCourses.json();
        setCourses(courseData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // merge enrollment with course info
  const mergedData = enrollments.map((enroll) => {
    const course = courses.find((c) => c._id === enroll.courseId) || {};
    return {
      ...enroll,
      courseName: enroll.name || "Unknown",
      instructorName: enroll.instructor || "Unknown",
      credit: course.credit || 3,
    };
  });

  const totalCredits = mergedData.reduce((sum, c) => sum + c.credit, 0);
  const totalFee = totalCredits * 1500;

  // delete enrollment
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to Drop This Course?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API}/course/my-enrolled/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setEnrollments((prev) => prev.filter((e) => e._id !== id));
              Swal.fire({
                title: "Course Dropped",
                text: "Enrollment has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // handle payment (Free or bKash)
  const handlePayment = () => {
    if (!mergedData.length) return alert("No courses to pay for.");

    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      amount: totalFee,
      method: selectedMethod,
      transactionId:
        selectedMethod === "bKash"
          ? "BKASH" + Math.floor(Math.random() * 1000000)
          : "FREE" + Date.now(),
    };

    setTransactions([...transactions, newTransaction]);
    setPaymentPaid(true);

    Swal.fire({
      title: "Payment Successful!",
      text: `Paid via ${selectedMethod}`,
      icon: "success",
    });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100/20 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎓 My Enrolled Courses
      </h1>

      {/* Summary + Payment */}
      <div className="max-w-8xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p>Total Credits: {totalCredits}</p>
          <p>Semester Fee: {totalFee} Tk</p>
          <p
            className={`font-semibold ${
              paymentPaid ? "text-green-600" : "text-red-600"
            }`}
          >
            Payment Due: {paymentPaid ? 0 : totalFee} Tk
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {!paymentPaid && (
            <>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="Free Payment">Free Payment</option>
                <option value="bKash">bKash</option>
              </select>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pay Now
              </button>
            </>
          )}
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div ref={printRef} className="shadow-lg hober-shadow-2xl max-w-8xl mx-auto overflow-x-auto ">
        {mergedData.length === 0 ? (
          <p className="text-center text-gray-600">No courses enrolled yet.</p>
        ) : (
          <table className="w-full border-collapse  shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100/30 shadow-2xl">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border text-left">Course Name</th>
                <th className="p-3 border text-left">Instructor</th>
                <th className="p-3 border">Credit</th>
                <th className="p-3 border">Fee</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mergedData?.map((c, i) => (
                <tr key={c._id} className="hover:bg-gray-500/20">
                  <td className="p-3 border text-center">{i + 1}</td>
                  <td className="p-3 border">{c.courseName}</td>
                  <td className="p-3 border">{c.instructorName}</td>
                  <td className="p-3 border text-center">{c.credit}</td>
                  <td className="p-3 border text-center">{c.credit * 1500} Tk</td>
                  <td className="p-3 border flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        (window.location.href = `/viewCourse/${c.courseId}`)
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100/30 font-semibold shadow-2xl">
              <tr>
                <td colSpan="3" className="p-3 border text-right">
                  Total
                </td>
                <td className="p-3 border text-center">{totalCredits}</td>
                <td className="p-3 border text-center">{totalFee} Tk</td>
                <td className="p-3 border text-red-600 text-center">
                  Due: {paymentPaid ? 0 : totalFee} Tk
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Payment Receipt */}
      {paymentPaid && (
        <div className="max-w-md mx-auto mt-6 p-6 bg-green-100 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">🧾 Payment Receipt</h3>
          <p>
            <strong>Date:</strong> {new Date().toLocaleString()}
          </p>
          <p>
            <strong>Paid Amount:</strong> {totalFee} Tk
          </p>
          <p>
            <strong>Payment Method:</strong> {selectedMethod}
          </p>
          {selectedMethod === "bKash" && (
            <p>
              <strong>Transaction ID:</strong>{" "}
              {transactions[transactions.length - 1]?.transactionId}
            </p>
          )}
          <p className="text-green-700 font-semibold mt-2">
            Payment Successful ✅
          </p>
        </div>
      )}

      {/* Transaction History */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">💰 Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Method</th>
                  <th className="p-3 border">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">{i + 1}</td>
                    <td className="p-3 border">{t.date}</td>
                    <td className="p-3 border text-center">{t.amount} Tk</td>
                    <td className="p-3 border text-center">{t.method}</td>
                    <td className="p-3 border text-center">{t.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
