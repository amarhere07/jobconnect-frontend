// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob, applyJob, toggleSaveJob } from "../api/jobs";
import toast from "react-hot-toast";

export default function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await getJob(id);
                setJob(res.data);
            } catch (err) {
                toast.error("Failed to load job");
            } finally { setLoading(false); }
        })();
    }, [id]);

    const handleApply = async () => {
        setApplying(true);
        try {
            await applyJob(id, {}); // pass resume or payload if needed
            toast.success("Applied successfully");
        } catch {
            toast.error("Apply failed");
        } finally { setApplying(false); }
    };

    const handleSave = async () => {
        try {
            await toggleSaveJob(id);
            toast.success("Toggled saved state");
        } catch {
            toast.error("Failed to save");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!job) return <div className="p-8">Job not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded mt-8">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company} • {job.location}</p>

            <div className="mt-4">
                <h3 className="font-semibold">Job Description</h3>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            <div className="mt-6 flex gap-3">
                <button onClick={handleApply} disabled={applying} className="bg-blue-600 text-white px-4 py-2 rounded">{applying ? "Applying..." : "Apply Now"}</button>
                <button onClick={handleSave} className="px-4 py-2 border rounded">Save Job</button>
            </div>
        </div>
    );
}
