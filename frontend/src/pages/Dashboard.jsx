import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import LeadTable from "../components/LeadTable";
import LeadDetailsModal from "../components/LeadDetailsModal";
import AddLeadModal from "../components/AddLeadModal";
import AssignLeadModal from "../components/AssignLeadModal";

function Dashboard() {
    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [status, setStatus] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [users, setUsers] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const fetchLeads = async () => {
        try {
            const res = await api.get(
                `/leads?page=${page}&search=${search}&status=${status}&assignedTo=${assignedTo}`
            );

            setLeads(res.data.data);
            setTotalPages(res.data.totalPages);
            setTotalLeads(res.data.totalLeads);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, search, status, assignedTo]);

    useEffect(() => {
        if (role === "admin") {
            fetchUsers();
        }
    }, [role]);

    const newLeads = leads.filter(
        (lead) => lead.status === "New"
    ).length;

    const qualified = leads.filter(
        (lead) => lead.status === "Qualified"
    ).length;

    const deleteLead = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lead?"
        );

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

    const handleAssign = (lead) => {
        setSelectedLead(lead);
        setShowAssignModal(true);
    };

    const viewLead = (lead) => {
        setSelectedLead(lead);
        setShowDetailsModal(true);
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />

            <main className="flex-1">
                <Navbar />

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Total Leads"
                            value={totalLeads}
                            color="text-blue-600"
                        />

                        <StatsCard
                            title="New Leads"
                            value={newLeads}
                            color="text-green-600"
                        />

                        <StatsCard
                            title="Qualified"
                            value={qualified}
                            color="text-purple-600"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
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

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="border rounded-lg px-4 py-2"
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal Sent">
                                Proposal Sent
                            </option>
                            <option value="Closed Won">Closed Won</option>
                            <option value="Closed Lost">Closed Lost</option>
                        </select>

                        {role === "admin" && (
                            <select
                                value={assignedTo}
                                onChange={(e) => {
                                    setAssignedTo(e.target.value);
                                    setPage(1);
                                }}
                                className="border rounded-lg px-4 py-2"
                            >
                                <option value="">All Members</option>

                                {users.map((member) => (
                                    <option
                                        key={member._id}
                                        value={member._id}
                                    >
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        )}
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
                            onAssign={handleAssign}
                            onView={viewLead}
                            role={role}
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

                {showAssignModal && (
                    <AssignLeadModal
                        lead={selectedLead}
                        onClose={() => {
                            setShowAssignModal(false);
                            setSelectedLead(null);
                        }}
                        onSuccess={() => {
                            fetchLeads();
                            setShowAssignModal(false);
                            setSelectedLead(null);
                        }}
                    />
                )}

                {showDetailsModal && (
                    <LeadDetailsModal
                        lead={selectedLead}
                        onClose={() => {
                            setShowDetailsModal(false);
                            setSelectedLead(null);
                        }}
                        onSuccess={fetchLeads}
                    />
                )}
            </main>
        </div>
    );
}

export default Dashboard;