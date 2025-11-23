// src/pages/PostJob.jsx
import React, { useState } from "react";
import { createJob } from "../api/jobs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
    const [job, setJob] = useState({ title: "", company: "", location: "", type: "", description: "", salary: "" });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const onChange = (e) => setJob(s => ({ ...s, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!job.title || !job.company || !job.description) return toast.error("Provide title, company and description");
        setLoading(true);
        try {
            await createJob(job);
            toast.success("Job posted");
            nav("/");
        } catch (err) {
            toast.error("Failed to post job");
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Post a Job</h2>
                <form onSubmit={submit} className="grid grid-cols-1 gap-3">
                    <input name="title" value={job.title} onChange={onChange} placeholder="Job Title" className="p-3 border rounded" />
                    <input name="company" value={job.company} onChange={onChange} placeholder="Company" className="p-3 border rounded" />
                    <input name="location" value={job.location} onChange={onChange} placeholder="Location" className="p-3 border rounded" />
                    <input name="type" value={job.type} onChange={onChange} placeholder="Type (Full-time/Remote)" className="p-3 border rounded" />
                    <textarea name="description" value={job.description} onChange={onChange} placeholder="Description" className="p-3 border rounded" />
                    <input name="salary" value={job.salary} onChange={onChange} placeholder="Salary" className="p-3 border rounded" />

                    <button disabled={loading} className="bg-blue-600 text-white p-3 rounded">{loading ? "Posting..." : "Post Job"}</button>
                </form>
            </div>
        </div>
    );
}
