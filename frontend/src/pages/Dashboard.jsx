import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import LeadTable from "../components/LeadTable";


import AddLeadModal from "../components/AddLeadModal";


function Dashboard() {

    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    const fetchLeads = async () => {
        try {

            const res = await api.get(
                                        `/leads?page=${page}&limit=5&search=${search}`
                                     );

            setLeads(res.data.data);
            setTotalPages(res.data.totalPages);
            setTotalLeads(res.data.totalLeads);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page,search]);

    const total = leads.length;

    const newLeads = leads.filter(
        lead => lead.status === "New"
    ).length;

    const qualified = leads.filter(
        lead => lead.status === "Qualified"
    ).length;



    const deleteLead = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this lead?");

        if (!confirmDelete) return;

        try {
            await api.delete(`/leads/${id}`);

            fetchLeads();
        } catch (error) {
            console.log(error);
            alert("Failed to delete lead");
        }
    };

    const editLead = (lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    console.log(leads);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
            title="Total Leads"
            value={totalLeads}
            color="text-blue-600"
            />

            <StatsCard
            title="New Leads"
            value={totalLeads}
            color="text-green-600"
            />

            <StatsCard
            title="Qualified"
            value={totalLeads}
            color="text-purple-600"
            />
            </div>

            <div className="flex justify-between items-center mb-4">

                <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border rounded-lg px-4 py-2 w-80"
                />

            </div>

            <div className="mt-8">
                <LeadTable
                    leads={leads}
                    onDelete={deleteLead}
                    onAdd={() => {
                        setSelectedLead(null);
                        setShowModal(true);
                    }}
                    onEdit={editLead}
                />
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-40"
                >
                    Previous
                </button>

                <span className="font-semibold">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>

        {showModal && (
            <AddLeadModal
                lead={selectedLead}
                onClose={() => {
                    setShowModal(false);
                    setSelectedLead(null);
                }}
                onSuccess={() => {
                    fetchLeads();
                    setShowModal(false);
                    setSelectedLead(null);
                }}
            />
        )}

      </main>

    </div>

  );
}

export default Dashboard;