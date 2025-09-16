// Notices.jsx
import React, { useEffect, useState, useContext } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../Provider/Authprovider";
import { Link } from "react-router-dom";

export default function Notices() {
  const { user, role, setUnseenCount } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");

  const API = `${import.meta.env.VITE_API}/notice`;

  // Fetch notices
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}?userId=${user.uid}`);
      const data = await res.json();
      const updated = data.map(n => ({
        ...n,
        seen: n.seenBy?.includes(user.uid)
      }));
      setNotices(updated);
      setUnseenCount(updated.filter(n => !n.seen).length);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  // Mark notice seen
  const handleNoticeClick = async (id) => {
    await fetch(`${API}/${id}/seen`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid })
    });
    fetchNotices();
  };

  // Create notice
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, message, audience,
          postedBy: { id: user.uid, name: user.displayName, role }
        })
      });
      if (res) {
        Swal.fire("Success", "Notice created!", "success");
        setTitle(""); setMessage(""); setAudience("all");
        fetchNotices();
      }
    } catch (err) { Swal.fire("Error", "Something went wrong!", "error"); }
  };

  // Delete notice
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This notice will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      Swal.fire("Deleted!", "Notice deleted.", "success");
      fetchNotices();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">📢 University Notice Board</h2>

      {(role === "admin" || role === "teacher") && (
        <form onSubmit={handleCreate} className="bg-gray-100/20 hover:shadow-2xl shadow-lg rounded-2xl p-6 mb-6 border">
          <h3 className="text-xl font-semibold mb-4">Create Notice</h3>
          <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required className=" mb-3 w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"/>
          <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} required className=" mb-3 w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"/>
          <select value={audience} onChange={e=>setAudience(e.target.value)} className="w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799] mb-4">
            <option value="all">For All</option>
            <option value="students">For Students</option>
            <option value="teachers">For Teachers</option>
          </select>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Publish</button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {notices.length === 0 && <p>No notices available</p>}
          {notices.map(n => (
            
           
             <div key={n._id} onClick={()=>handleNoticeClick(n._id)}
                 className={`bg-gray-100/20 hover:shadow-2xl p-4 rounded-2xl shadow-md cursor-pointer ${!n.seen?"border-l-4 border-red-500 bg-white":"bg-gray-100"}`}>
              <h4 className="font-bold ">{n.title}</h4>
              <p className="">{n.message}</p>
              <small className="block ">By {n.postedBy.name} ({n.postedBy.role})</small>
              <small className="block  text-sm">{new Date(n.createdAt).toLocaleString("eng",{dateStyle:"medium",timeStyle:"short"})}</small>
             <div className="flex items-center justify-between">
                 {(role==="admin" || (role==="teacher" && n.postedBy.id===user.uid)) && (
                <button onClick={()=>handleDelete(n._id)} className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Delete</button>
              )}
              <Link key={n._id} to={`/ViewNotice/${n._id}`} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">View Notice</Link>
             </div>
            </div>
           
            
          ))}
        </div>
      )}
    </div>
  );
}
