// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Briefcase, UserCircle, LogOut, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, setUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.sub,
                    name: decoded.name || "",
                    role: decoded.role
                });
            } catch (err) {
                console.error("Invalid token");
            }
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/login";
    };

    const isActive = (path) =>
        location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">JobConnect</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`text-sm hover:text-blue-600 ${isActive("/")}`}>Home</Link>
                        <a href="/dashboard/employer" className="text-sm text-gray-700 hover:text-blue-600">Dashboard</a>
                        <a href="#jobs" className="text-sm text-gray-700 hover:text-blue-600">Jobs</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/employer-login" className="px-3 py-2 rounded-md bg-blue-100 text-blue-700 flex items-center gap-2">
                                    <Building2 size={16} /> Employer Login
                                </Link>
                                <Link to="/login" className="px-4 py-2 border rounded-md text-sm">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Register</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-gray-700 font-semibold">
                                    {user?.name || user?.email || "Profile"}
                                </span>

                                <Link to="/create-job" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                    Post a Job
                                </Link>

                                <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
                                    <UserCircle size={26} />
                                </Link>

                                <button onClick={handleLogout} className="px-4 py-2 border rounded-md flex items-center gap-2">
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        )}
                    </div>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4">
                            Home
                        </Link>
                        <a href="#jobs" className="block px-4">Jobs</a>
                        <a href="#companies" className="block px-4">Companies</a>

                        <div className="px-4 pt-2">
                            {isLoggedIn ? (
                                <>
                                    <div className="px-4 py-2 font-semibold text-gray-700">
                                        {user?.name || user?.email || "My Profile"}
                                    </div>

                                    <Link
                                        to="/create-job"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 bg-blue-600 text-white rounded mb-2"
                                    >
                                        Post a Job
                                    </Link>

                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 border rounded mb-2"
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 border rounded"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/employer-login"
                                        className="block px-4 py-2 bg-blue-100 rounded mb-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Employer Login
                                    </Link>

                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 border rounded mb-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="block px-4 py-2 bg-blue-600 text-white rounded"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
