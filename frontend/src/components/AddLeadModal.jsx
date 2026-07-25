import { useEffect, useState } from "react";
import api from "../services/api";

function AddLeadModal({ onClose, onSuccess, lead = null }) {
  const [formData, setFormData] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    company: lead?.company || "",
    phone: lead?.phone || "",
    status: lead?.status || "New",
    assignedTo: lead?.assignedTo?._id || lead?.assignedTo || "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createLead = async (e) => {
    e.preventDefault();

    try {
      if (lead) {
        await api.put(`/leads/${lead._id}`, formData);

        if (formData.assignedTo) {
            await api.put(`/leads/${lead._id}/assign`, {
            assignedTo: formData.assignedTo,
        });
        }
      } else {
        await api.post("/leads", formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to save lead");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-[450px] p-6">
        <h2 className="text-2xl font-bold mb-5">
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>

        <form onSubmit={createLead} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="company"
            value={formData.company}
            placeholder="Company"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Assign User</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {lead ? "Update Lead" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;