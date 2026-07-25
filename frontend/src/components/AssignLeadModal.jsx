import { useEffect, useState } from "react";
import api from "../services/api";

function AssignLeadModal({ lead, onClose, onSuccess }) {
    const [users, setUsers] = useState([]);
    const [assignedTo, setAssignedTo] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const assignLead = async () => {
        try {
            await api.put(`/leads/${lead._id}/assign`, {
                assignedTo,
            });

            onSuccess();
        } catch (err) {
            console.log(err);
            alert("Failed to update lead assignment");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[400px]">
                <h2 className="text-2xl font-bold mb-4">
                    Assign Lead
                </h2>

                <p className="mb-4">
                    <strong>{lead.name}</strong>
                </p>

                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="">Unassigned</option>

                    {users.map((user) => (
                        <option
                            key={user._id}
                            value={user._id}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={assignLead}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AssignLeadModal;