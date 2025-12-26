// src/components/JobCard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { applyJobHandle } from "../api/jobs";

export default function JobCard({ job }) {
    const { user } = useAuth();
    const [applying, setApplying] = useState(false)

    if (!job) return null;

    const isEmployer = user?.role === "EMPLOYER";
    const isCandidate = user?.role === "CANDIDATE";

    const handleApplyMain = async () => {
        setApplying(true);
        console.log(job.id)
        try {
            await applyJobHandle(job.id);
            toast.success("Applied successfully");
        } catch {
            toast.error("Apply failed");
        } finally { setApplying(false); }
    };

    return (
        <div className="job-card border rounded p-4 shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600 mt-1">{job.company}</p>

            <div className="mt-2 text-sm text-gray-500">
                <p>Location: {job.location || "Not mentioned"}</p>
                <p>Salary: {job.salary || "N/A"}</p>
                <p>Type: {job.type || "Not specified"}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <Link
                    to={`/jobs/${job.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                >
                    View Details
                </Link>

                {/* Candidate sees Apply button */}
                {isCandidate && (
                    <button onClick={handleApplyMain} disabled={applying} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                        {applying ? "Applying..." : "Apply Now"}
                    </button>
                )}

                {/* Employer sees Manage button */}
                {isEmployer && (
                    <Link
                        to={`/employer/jobs/${job.id}/edit`}
                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                        Manage
                    </Link>
                )}
            </div>
        </div>
    );
}
