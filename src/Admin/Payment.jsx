import { useEffect, useState } from "react";

export default function Payment() {

  const [payments,setPayment]=useState([])
  console.log(payments)
 
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API}/payments`)
    .then(res=>res.json())
    .then(data=>{
        setPayment(data)
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

