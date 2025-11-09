import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        role: "CANDIDATE",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="userName" placeholder="Username" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
