import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/jobs/all")
            .then(res => setJobs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Available Jobs</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="p-4 border rounded-xl shadow-md bg-white">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-gray-600">{job.company} — {job.location}</p>
                        <p className="text-sm text-gray-500 mt-2">{job.type}</p>
                        <p className="mt-3 text-gray-700">{job.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
