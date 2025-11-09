import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ✅ Check login status when Navbar loads
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/login"; // redirect after logout
    };

    return (
        <nav className="bg-blue-700 text-white fixed w-full z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    JobConnect
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-gray-200">
                        Home
                    </Link>

                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="hover:text-gray-200">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-gray-200">
                                Register
                            </Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            <Link
                                to="/create-job"
                                className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                Post a Job
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-200 border border-white px-3 py-1 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="bg-blue-600 md:hidden flex flex-col items-center py-4 space-y-3">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>

                    {!isLoggedIn && (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            <Link to="/post-job" onClick={() => setMenuOpen(false)}>
                                Post a Job
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
