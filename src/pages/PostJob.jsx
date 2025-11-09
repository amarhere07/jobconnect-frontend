import React, { useState } from "react";
import axios from "axios";

export default function PostJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        salary: "",
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:8081/api/jobs/add", job, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Job posted successfully!");
            setJob({ title: "", company: "", location: "", type: "", description: "", salary: "" });
        } catch (err) {
            alert("Failed to post job");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Post a Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" placeholder="Job Title" onChange={handleChange} value={job.title} className="w-full border px-4 py-2 rounded" required />
                    <input name="company" placeholder="Company" onChange={handleChange} value={job.company} className="w-full border px-4 py-2 rounded" required />
                    <input name="location" placeholder="Location" onChange={handleChange} value={job.location} className="w-full border px-4 py-2 rounded" required />
                    <input name="type" placeholder="Type (Full-time / Remote)" onChange={handleChange} value={job.type} className="w-full border px-4 py-2 rounded" required />
                    <textarea name="description" placeholder="Job Description" onChange={handleChange} value={job.description} className="w-full border px-4 py-2 rounded" required />
                    <input name="salary" placeholder="Salary" onChange={handleChange} value={job.salary} className="w-full border px-4 py-2 rounded" required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Post Job</button>
                </form>
            </div>
        </div>
    );
}
