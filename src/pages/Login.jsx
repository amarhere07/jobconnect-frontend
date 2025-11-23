// src/pages/Login.jsx
import React, { useState } from "react";
import { login, employerLogin } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";


export default function Login() {
    const { setUser } = useAuth();

    const [form, setForm] = useState({ email: "", password: "", role: "CANDIDATE" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fn = form.role === "EMPLOYER" ? login : login;
            const res = await fn({ email: form.email, password: form.password, role: form.role });

            localStorage.setItem("token", res.data.token);

            console.log("Decoded token:", res);
            const decoded = jwtDecode(res.data.token);
            setUser({ email: decoded.sub, role: decoded.role });

            toast.success("Logged in");

            if (decoded.role === "EMPLOYER") navigate("/dashboard/employer");
            else navigate("/dashboard/candidate");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow">
                <h2 className="text-xl font-bold text-center mb-4">Sign in</h2>

                <form onSubmit={submit} className="space-y-4">
                    <select name="role" value={form.role} onChange={handleChange} className="w-full p-3 border rounded">
                        <option value="CANDIDATE">Candidate</option>
                        <option value="EMPLOYER">Employer</option>
                    </select>

                    <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded" required />
                    <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-3 border rounded" required />
                    <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded">{loading ? "Signing in..." : "Sign In"}</button>
                </form>

                <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
            </div>
        </div>
    );
}
