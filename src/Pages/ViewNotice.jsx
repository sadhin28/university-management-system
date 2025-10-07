import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import jsPDF from "jspdf";
import { AuthContext } from "../Provider/Authprovider";

export default function ViewNotice() {
  const { user, role } = useContext(AuthContext);
  const { id } = useParams();

  const [notice, setNotice] = useState(null);
  const [translatedNotice, setTranslatedNotice] = useState(null);
  const [currentLang, setCurrentLang] = useState("en"); // en বা bn
  const [loading, setLoading] = useState(false); // translation loading

  const API = `${import.meta.env.VITE_API}/notice`;

  // Notice fetch করা
  const fetchNotice = async () => {
    try {
      const res = await fetch(`${API}?userId=${user.uid}`);
      const data = await res.json();
      const single = data.find((n) => n._id === id);

      setNotice(single);
      setTranslatedNotice({
        title: single.title,
        message: single.message,
        postedByName: single.postedBy.name,
      });
      setCurrentLang("en");
    } catch (error) {
      console.error("Notice fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  // টেক্সটকে chunk এ ভাগ করা
  const splitTextIntoChunks = (text, chunkSize = 500) => {
    const chunks = [];
    let start = 0;
    while (start < text.length) {
      chunks.push(text.slice(start, start + chunkSize));
      start += chunkSize;
    }
    return chunks;
  };

  // লম্বা টেক্সট অনুবাদ করা
  const translateLongText = async (text, source, target) => {
    const chunks = splitTextIntoChunks(text);
    const translatedChunks = [];

    for (const chunk of chunks) {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          chunk
        )}&langpair=${source}|${target}`
      );
      const data = await res.json();
      translatedChunks.push(data.responseData.translatedText);
    }

    return translatedChunks.join("");
  };

  // Toggle translation
  const toggleTranslation = async () => {
    if (!translatedNotice || loading) return;
    setLoading(true);

    const source = currentLang;
    const target = currentLang === "en" ? "bn" : "en";

    try {
      const [title, message, postedByName] = await Promise.all([
        translateLongText(translatedNotice.title, source, target),
        translateLongText(translatedNotice.message, source, target),
        translateLongText(translatedNotice.postedByName, source, target),
      ]);

      setTranslatedNotice({ title, message, postedByName });
      setCurrentLang(target);
    } catch (err) {
      console.error("Translation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // PDF download
  const downloadPDF = () => {
    if (!notice || !translatedNotice) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(translatedNotice.title, 10, 20);

    doc.setFontSize(12);
    doc.text(
      `By: ${translatedNotice.postedByName} (${notice.postedBy.role})`,
      10,
      30
    );
    doc.text(`Date: ${new Date(notice.createdAt).toLocaleString()}`, 10, 40);

    const lines = doc.splitTextToSize(translatedNotice.message, 180);
    doc.text(lines, 10, 50);

    doc.save(`${translatedNotice.title}.pdf`);
  };

  if (!notice || !translatedNotice)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mx-6 max-w-7xl mt-4 mb-4 mx-auto min-h-screen p-6 bg-gray-100/20 shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{translatedNotice.title}</h2>
      <p className="mb-4">{translatedNotice.message}</p>
      <small className="block mb-2">
        By: {translatedNotice.postedByName} ({notice.postedBy.role})
      </small>
      <small className="block mb-4 text-gray-600">
        {new Date(notice.createdAt).toLocaleString("en", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </small>

      <div className="flex gap-4 mb-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 hover:shadow-lg hover:bg-purple-700 text-white px-5 py-2 rounded transition-all"
        >
          Download PDF
        </button>

        <button
          onClick={toggleTranslation}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-5 py-2 rounded transition-all`}
        >
          {loading ? "Translating..." : "Bangla Language"}
        </button>
      </div>

      {role === "student" ? (
        <Link to="/notices" className="text-blue-600 hover:underline">
          ← Back to Notices
        </Link>
      ) : (
        <Link to="/admin-notices" className="text-purple-800 hover:underline">
          ← Back to Notices
        </Link>
      )}
    </div>
  );
}
