import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
