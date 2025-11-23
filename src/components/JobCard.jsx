// src/components/JobCard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function JobCard({ job }) {
    const { user } = useAuth();

    if (!job) return null;

    const isEmployer = user?.role === "EMPLOYER";
    const isCandidate = user?.role === "CANDIDATE";

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
                    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                        Apply
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
