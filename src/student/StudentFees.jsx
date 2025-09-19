
export default function StudentFees() {
  // Dummy payment transactions
  const payments = [
    {
      id: "TXN001",
      date: "2025-01-10",
      amount: 5000,
      method: "bKash",
      status: "Completed",
    },
    {
      id: "TXN002",
      date: "2025-02-15",
      amount: 3000,
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "TXN003",
      date: "2025-03-05",
      amount: 2000,
      method: "Cash",
      status: "Pending",
    },
  ];

  // Calculate total paid
  const totalPaid = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Student Payment Transactions
      </h1>

      {/* Student Info */}
      <div className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
        <p>
          <span className="font-semibold">Student Name:</span> Shadin Ahmed
        </p>
        <p>
          <span className="font-semibold">Student ID:</span> 2025001
        </p>
        <p>
          <span className="font-semibold">Department:</span> Computer Science
        </p>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Method</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{pay.id}</td>
                <td className="border px-4 py-2">{pay.date}</td>
                <td className="border px-4 py-2">{pay.amount} BDT</td>
                <td className="border px-4 py-2">{pay.method}</td>
                <td
                  className={`border px-4 py-2 font-medium ${
                    pay.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {pay.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Paid */}
      <div className="mt-4 text-center">
        <h2 className="font-semibold text-lg">
          Total Paid: {totalPaid} BDT
        </h2>
      </div>
    </div>
  );
}
