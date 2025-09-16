import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import jsPDF from "jspdf";
import { AuthContext } from "../Provider/Authprovider";

export default function ViewNotice() {
  const { user,role } = useContext(AuthContext);
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const API = `${import.meta.env.VITE_API}/notice`;

  const fetchNotice = async () => {
    const res = await fetch(`${API}?userId=${user.uid}`);
    const data = await res.json();
    const single = data.find(n => n._id === id);
    setNotice(single);
  };

  useEffect(() => { fetchNotice(); }, []);

  const downloadPDF = () => {
    if (!notice) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(notice.title, 10, 20);
    doc.setFontSize(12);
    doc.text(`By: ${notice.postedBy.name} (${notice.postedBy.role})`, 10, 30);
    doc.text(`Date: ${new Date(notice.createdAt).toLocaleString()}`, 10, 40);
    
    // Split text into multiple lines if too long
    const lines = doc.splitTextToSize(notice.message, 180);
    doc.text(lines, 10, 50);
    
    doc.save(`${notice.title}.pdf`);
  };

  if (!notice) return <p>Loading...</p>;

  return (
    <div className="mx-6 max-w-8xl mt-2 mb-2 mx-auto min-h-screen p-6 bg-gray-100/20 shadow rounded-lg">
      <h2 className="text-2xl font-bold  mb-4">{notice.title}</h2>
      <p className=" mb-4">{notice.message}</p>
      <small className="block mb-2">By {notice.postedBy.name} ({notice.postedBy.role})</small>
      <small className="block  mb-4">{new Date(notice.createdAt).toLocaleString("eng",{dateStyle:"medium",timeStyle:"short"})}</small>
      
      <button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4">
        Download PDF
      </button>
      <br />
     {role === 'student'?<Link to="/notices" className="text-blue-600 hover:underline">← Back to Notices</Link>: <Link to="/admin-notices" className="text-blue-600 hover:underline">← Back to Notices</Link>}
    </div>
  );
}

