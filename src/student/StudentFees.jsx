import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";

export default function StudentFees() {
  const {user}=useContext(AuthContext)
  const [payments,setPayment]=useState([])
  const [student,setStudent]=useState([])
  const data =(student.find((data)=>data.email === user.email ))
  console.log(data)
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API}/payments/${user.uid}`)
    .then(res=>res.json())
    .then(data=>{
        setPayment(data)
    })
    fetch(`${import.meta.env.VITE_API}/student`)
    .then(res=>res.json())
    .then(data=>{
        setStudent(data)
    })
  },[])
  
  // Calculate total paid
  const totalPaid = payments
    .filter((p) => p.status !== "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Student Payment Transactions
      </h1>

      {/* Student Info */}
      <div className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
        <p>
          <span className="font-semibold">Student Name:</span> {data?.name}
        </p>
        <p>
          <span className="font-semibold">Student Uid:</span> {data?.studentId}
        </p>
        <p>
          <span className="font-semibold">Department:</span> {data?.program}
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
              
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{pay.id}</td>
                <td className="border px-4 py-2">{pay.date}</td>
                <td className="border px-4 py-2">{pay.amount} BDT</td>
                <td className="border px-4 py-2">{pay.method}</td>
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
