function LeadTable({ leads ,onDelete, onAdd, onEdit}) {
  const getStatusColor = (status) => {
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
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="p-5 border-b flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Leads
        </h2>

        <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
            + Add Lead
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Name</th>

            <th className="text-left p-4">Email</th>

            <th className="text-left p-4">Company</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr
              key={lead._id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">{lead.name}</td>

              <td className="p-4">{lead.email}</td>

              <td className="p-4">{lead.company}</td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>

              </td>

              <td className="p-4 space-x-2">

                <button
                    onClick={() => onEdit(lead)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(lead._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeadTable;