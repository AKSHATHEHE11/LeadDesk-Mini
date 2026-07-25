import {
    Eye,
    Pencil,
    Trash2,
    UserPlus
} from "lucide-react";

function LeadTable({
    leads,
    onDelete,
    onAdd,
    onEdit,
    onAssign,
    role,
    onView
}) {

    const badge = (status) => {

        switch (status) {

            case "New":
                return "bg-blue-100 text-blue-700";

            case "Contacted":
                return "bg-yellow-100 text-yellow-700";

            case "Qualified":
                return "bg-green-100 text-green-700";

            case "Lost":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";
        }

    };

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="flex justify-between items-center px-6 py-5 border-b">

                <div>

                    <h2 className="text-xl font-bold">

                        Leads

                    </h2>

                    <p className="text-sm text-slate-500">

                        Manage your customer pipeline

                    </p>

                </div>

                {role === "admin" && (

                    <button
                        onClick={onAdd}
                        className="bg-slate-900 hover:bg-black text-white rounded-xl px-5 py-3"
                    >

                        + Add Lead

                    </button>

                )}

            </div>

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="p-4 text-left text-slate-500 font-medium">Name</th>

                        <th className="p-4 text-left text-slate-500 font-medium">Email</th>

                        <th className="p-4 text-left text-slate-500 font-medium">Company</th>

                        <th className="p-4 text-left text-slate-500 font-medium">Status</th>

                        <th className="p-4 text-left text-slate-500 font-medium">Assigned</th>

                        <th className="p-4 text-center text-slate-500 font-medium">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {leads.map((lead) => (

                        <tr
                            key={lead._id}
                            className="border-t hover:bg-slate-50 transition"
                        >

                            <td className="p-4 font-medium text-slate-900">

                                {lead.name}

                            </td>

                            <td className="p-4 text-slate-600">

                                {lead.email}

                            </td>

                            <td className="p-4">

                                {lead.company}

                            </td>

                            <td className="p-4">

                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(lead.status)}`}>

                                    {lead.status}

                                </span>

                            </td>

                            <td className="p-4">

                                {lead.assignedTo?.name || "Unassigned"}

                            </td>

                            <td className="p-4">

                                {role === "admin" && (

                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => onView(lead)}
                                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                                        >
                                            <Eye
                                                size={16}
                                                className="text-slate-700"
                                            />
                                        </button>
                                        
                                        <button
                                            onClick={() => onEdit(lead)}
                                            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200"
                                        >

                                            <Pencil
                                                size={16}
                                                className="text-yellow-700"
                                            />

                                        </button>

                                        <button
                                            onClick={() => onAssign(lead)}
                                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                                        >

                                            <UserPlus
                                                size={16}
                                                className="text-blue-700"
                                            />

                                        </button>

                                        <button
                                            onClick={() => onDelete(lead._id)}
                                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                                        >

                                            <Trash2
                                                size={16}
                                                className="text-red-700"
                                            />

                                        </button>

                                    </div>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default LeadTable;