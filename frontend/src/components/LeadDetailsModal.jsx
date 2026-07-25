import { useEffect, useState } from "react";
import api from "../services/api";

function LeadDetailsModal({ lead, onClose }) {
  const [leadData, setLeadData] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const fetchLead = async () => {
    try {
      const res = await api.get(`/leads/${lead._id}`);
      setLeadData(res.data.data);
      setStatus(res.data.data.status);
    } catch (error) {
      console.log(error);
      alert("Failed to load lead");
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;

    try {
      await api.post(`/leads/${lead._id}/notes`, {
        text: note,
      });

      setNote("");

      fetchLead();
    } catch (error) {
      console.log(error);
      alert("Failed to add note");
    }
  };

  const updateStatus = async () => {
      try {

          await api.patch(`/leads/${lead._id}/status`, {
              status
          });

          fetchLead();

      } catch (err) {

          alert("Failed to update status");

      }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  if (!leadData) {
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-2 mb-8">

          <p><b>Name:</b> {leadData.name}</p>
          <p><b>Email:</b> {leadData.email}</p>
          <p><b>Company:</b> {leadData.company}</p>
          <p><b>Phone:</b> {leadData.phone}</p>
          <div className="flex items-center gap-4">

              <b>Status:</b>

              <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2"
              >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Proposal Sent</option>
                  <option>Closed Won</option>
                  <option>Closed Lost</option>
              </select>

              <button
                  onClick={updateStatus}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                  Save
              </button>

          </div>

        </div>

        <hr className="my-6"/>

        <h3 className="text-xl font-semibold mb-3">
          Notes
        </h3>

        <textarea
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          rows={3}
          placeholder="Write a note..."
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={addNote}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Note
        </button>

        <div className="mt-6 space-y-3">

          {leadData.notes?.length === 0 && (
            <p className="text-gray-500">
              No notes yet
            </p>
          )}

          {leadData.notes?.map((n) => (
            <div
              key={n._id}
              className="border rounded-lg p-3"
            >
              <p>{n.text}</p>

              <p className="text-xs text-gray-500 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

        <hr className="my-6"/>

        <h3 className="text-xl font-semibold mb-3">
          Activity Timeline
        </h3>

        <div className="space-y-3">

          {leadData.activity?.map((a) => (
            <div
              key={a._id}
              className="border-l-4 border-blue-500 pl-4"
            >
              <p>{a.action}</p>

              <p className="text-xs text-gray-500">
                {new Date(a.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default LeadDetailsModal;