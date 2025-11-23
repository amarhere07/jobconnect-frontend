// src/pages/Register.jsx
import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const [form, setForm] = useState({ userName: "", email: "", password: "", role: "CANDIDATE" });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const onChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) return toast.error("Missing fields");
        setLoading(true);
        try {
            await register(form);
            toast.success("Registered, please login");
            nav("/login");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed");
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
            <div className="bg-white rounded-lg p-7 w-full max-w-md shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

                <form onSubmit={submit} className="space-y-3">
                    <input name="userName" placeholder="Username" value={form.userName} onChange={onChange} className="w-full p-3 border rounded" required />
                    <input name="email" placeholder="Email" value={form.email} onChange={onChange} type="email" className="w-full p-3 border rounded" required />
                    <input name="password" placeholder="Password" value={form.password} onChange={onChange} type="password" className="w-full p-3 border rounded" required />
                    <select name="role" value={form.role} onChange={onChange} className="w-full p-3 border rounded">
                        <option value="CANDIDATE">Candidate</option>
                        <option value="EMPLOYER">Employer</option>
                    </select>

                    <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded mt-2">{loading ? "Creating..." : "Register"}</button>
                </form>

                <p className="text-center mt-3">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
            </div>
        </div>
    );
}
