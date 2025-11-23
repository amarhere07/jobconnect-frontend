import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployerJobs } from "../api/jobs";
import {
    Briefcase,
    Users,
    PlusCircle,
    Edit2,
    Trash,
    Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function EmployerDashboard() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === "EMPLOYER") loadJobs();
    }, [user]);

    const loadJobs = async () => {
        try {
            const res = await getEmployerJobs();
            setJobs(res.data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (id) => {
        toast.error("Deleting disabled for demo."); // add real logic
    };

    const stats = {
        total: jobs.length,
        open: jobs.filter((j) => j.status === "OPEN").length,
        closed: jobs.filter((j) => j.status === "CLOSED").length,
        applications: jobs.reduce((sum, j) => sum + (j.applications || 0), 0),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Employer Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Welcome back, {user?.name || user?.email}
                        </p>
                    </div>

                    <Link
                        to="/create-job"
                        className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <PlusCircle size={20} /> Post New Job
                    </Link>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        icon={<Briefcase className="text-blue-600" size={26} />}
                        label="Total Jobs"
                        value={stats.total}
                    />
                    <StatCard
                        icon={<Briefcase className="text-green-600" size={26} />}
                        label="Open Jobs"
                        value={stats.open}
                    />
                    <StatCard
                        icon={<Briefcase className="text-red-500" size={26} />}
                        label="Closed Jobs"
                        value={stats.closed}
                    />
                    <StatCard
                        icon={<Users className="text-purple-600" size={26} />}
                        label="Applicants"
                        value={stats.applications}
                    />
                </div>

                {/* JOBS TABLE */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Job Posts</h2>

                    {loading ? (
                        <div className="py-14 flex justify-center">
                            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <p className="text-center py-10 text-gray-600">No job posts found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Applicants</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{job.title}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${job.status === "OPEN"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="p-3">{job.applications || 0}</td>
                                            <td className="p-3 flex gap-3">
                                                <Link
                                                    to={`/jobs/${job.id}`}
                                                    className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                <Link
                                                    to={`/edit-job/${job.id}`}
                                                    className="p-2 bg-yellow-50 rounded-lg hover:bg-yellow-100"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => deleteJob(job.id)}
                                                    className="p-2 bg-red-50 rounded-lg hover:bg-red-100"
                                                >
                                                    <Trash size={18} className="text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}
