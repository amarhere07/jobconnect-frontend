// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import { MapPin, Briefcase, Clock, ArrowRight, Search, Building2, Filter, ChevronDown } from "lucide-react";
import { getAllJobs } from "../api/jobs";
import debounce from "lodash.debounce";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


export default function Home() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState(""); // e.g. Full-time, Remote...
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 9;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await getAllJobs();
            let list = res.data || [];

            // If Employer, show ONLY his posted jobs
            if (user?.role === "EMPLOYER") {
                list = list.filter(job => job.postedByEmail === user.email);
            }

            setJobs(list);
            setFilteredJobs(list);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };


    // debounced search (client-side)
    // useMemo ensures debounce persists across renders
    const debouncedSearch = useMemo(
        () =>
            debounce((val) => {
                setSearchTerm(val);
            }, 350),
        []
    );

    function onSearchChange(e) {
        debouncedSearch(e.target.value);
    }

    useEffect(() => {
        const s = searchTerm.trim().toLowerCase();
        let filtered = jobs;

        if (s) {
            filtered = filtered.filter((job) =>
                (job.title || "").toLowerCase().includes(s) ||
                (job.company || "").toLowerCase().includes(s) ||
                (job.location || "").toLowerCase().includes(s) ||
                (job.skills || "").toLowerCase().includes(s)
            );
        }

        if (typeFilter) {
            filtered = filtered.filter((j) => (j.type || "").toLowerCase() === typeFilter.toLowerCase());
        }

        setFilteredJobs(filtered);
        setPage(1);
    }, [searchTerm, typeFilter, jobs]);

    // pagination:
    const total = filteredJobs.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const paginated = filteredJobs.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* HERO */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 shadow-xl relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Find Your Dream Job Anywhere</h1>
                    <p className="max-w-2xl opacity-95 mb-6">Search thousands of verified jobs. Save jobs and apply quickly.</p>

                    <div className="flex gap-3 flex-col md:flex-row items-center">
                        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 flex-1">
                            <Search className="w-5 h-5 opacity-90" />
                            <input onChange={onSearchChange} placeholder="Search job title, company, skill, city..." className="bg-transparent w-full outline-none text-white placeholder-white/70" />
                            <button className="px-4 py-2 bg-white text-blue-700 rounded">Search</button>
                        </div>

                        <div className="flex gap-2 items-center">
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded px-3 py-2 bg-white/20 text-white">
                                <option value="">All types</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Remote</option>
                                <option>Internship</option>
                                <option>Contract</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Available Positions</h2>
                        <p className="text-gray-500">{total} jobs found</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full" />
                    </div>
                ) : total === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No jobs found. Try adjusting filters or search terms.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginated.map((job) => <JobCard job={job} key={job.id} />)}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
                            <span>Page {page} / {totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
