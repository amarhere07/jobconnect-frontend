// src/pages/CandidateDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobs";
import { Bookmark, MapPin, Briefcase, Clock, Search } from "lucide-react";
import JobCard from "../components/JobCard";

export default function CandidateDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const res = await getAllJobs();
            setJobs(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
                <p className="text-gray-600">Find your next opportunity</p>

                {/* Search Bar */}
                <div className="mt-4 flex items-center bg-white rounded-xl shadow-sm border px-4 py-2 w-full max-w-lg">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for jobs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ml-2 flex-1 outline-none text-gray-700"
                    />
                </div>
            </div>

            {/* Job List */}
            <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-xl shadow-sm border animate-pulse h-40"
                        ></div>
                    ))
                ) : filteredJobs.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-600">
                        No jobs found
                    </p>
                ) : (
                    filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
}

