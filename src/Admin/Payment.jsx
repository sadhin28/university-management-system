import { useEffect, useState } from "react";

export default function Payment() {

  const [payments,setPayment]=useState([]) 
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
      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        Student Payment Transactions
      </h1>
      {/* Total Paid */}
      <div className="mt-4 my-4 text-left text-white">
        <h2 className="font-semibold text-lg">
          Total Paid: {totalPaid} BDT
        </h2>
      </div>
      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className=" bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white">
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Method</th>
              
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              
              <tr className="hover:bg-blue-300 bg-gray-100" key={idx}>
                <td className="border px-4 py-2">{pay.id}</td>
                <td className="border px-4 py-2">{pay.date}</td>
                <td className="border px-4 py-2">{pay.amount} BDT</td>
                <td className="border px-4 py-2">{pay.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

