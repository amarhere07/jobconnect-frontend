// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import {
    Mail,
    Briefcase,
    Building2,
    User2,
    ShieldCheck,
    Edit3,
    ArrowRight,
} from "lucide-react";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 flex justify-center">
            <div className="max-w-4xl w-full">

                {/* Glass Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 animate__animated animate__fadeIn">

                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

                        {/* Avatar */}
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-xl flex items-center justify-center text-white text-5xl font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                {user?.name || "User"}
                            </h1>

                            <p className="mt-1 text-lg text-gray-600">
                                {user?.role === "EMPLOYER" ? "Employer" : "Candidate"}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <a
                                    href="/edit-profile"
                                    className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium shadow hover:bg-gray-700 transition flex items-center gap-2"
                                >
                                    <Edit3 size={18} /> Edit Profile
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-10 border-t border-gray-200"></div>

                    {/* Information Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        {/* Email */}
                        <CardItem
                            icon={<Mail className="text-blue-600" size={22} />}
                            label="Email Address"
                            value={user?.email}
                        />

                        {/* Role */}
                        <CardItem
                            icon={<ShieldCheck className="text-indigo-600" size={22} />}
                            label="Account Type"
                            value={user?.role === "EMPLOYER" ? "Employer" : "Candidate"}
                        />

                        {/* Employer Panel */}
                        {user?.role === "EMPLOYER" && (
                            <CardItem
                                icon={<Building2 className="text-purple-600" size={22} />}
                                label="Employer Dashboard"
                                value="You can post and manage jobs"
                            />
                        )}

                        {/* Candidate Panel */}
                        {user?.role === "CANDIDATE" && (
                            <CardItem
                                icon={<Briefcase className="text-green-600" size={22} />}
                                label="Job Applications"
                                value="Browse and apply for positions"
                            />
                        )}
                    </div>

                    {/* Divider */}
                    <div className="my-10 border-t border-gray-200"></div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {user?.role === "EMPLOYER" ? (
                            <a
                                href="/create-job"
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                Post a Job <ArrowRight size={18} />
                            </a>
                        ) : (
                            <a
                                href="/"
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                Browse Jobs <ArrowRight size={18} />
                            </a>
                        )}

                        <a
                            href="/settings"
                            className="px-6 py-3 bg-white/70 border border-gray-300 rounded-xl shadow hover:bg-gray-50 transition"
                        >
                            Account Settings
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-semibold text-gray-900 text-lg">{value}</p>
            </div>
        </div>
    );
}
