import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    FiSearch,
    FiBell,
    FiUser,
    FiChevronDown,
    FiLogOut,
    FiKey,
    FiExternalLink,
    FiCheckCircle,
    FiSun,
    FiMoon,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { showConfirm } from "../../utils/alert";
import ChangePasswordModal from "../auth/ChangePasswordModal";
import "./Navbar.css";

const PAGE_TITLES = {
    "/": "Overview",
    "/hero": "Hero Section",
    "/about": "About Section",
    "/skills": "Skills Management",
    "/projects": "Projects CMS",
    "/experience": "Experience & Career",
    "/certificates": "Certificates",
    "/gallery": "Media Gallery",
    "/achievements": "Achievements",
    "/testimonials": "Client Testimonials",
    "/contact": "Contact & Socials",
    "/footer": "Footer & Credits",
};

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const location = useLocation();

    const [admin, setAdmin] = useState(null);
    const [time, setTime] = useState(new Date());
    const [dropdown, setDropdown] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const dropdownRef = useRef(null);

    /*==================================================
    LOAD ADMIN
    ==================================================*/
    useEffect(() => {
        async function loadAdmin() {
            if (!user) return;
            try {
                const snapshot = await getDoc(doc(db, "admins", user.uid));
                if (snapshot.exists()) {
                    setAdmin(snapshot.data());
                }
            } catch (err) {
                console.error("Load admin error:", err);
            }
        }
        loadAdmin();
    }, [user]);

    /*==================================================
    LIVE CLOCK
    ==================================================*/
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    /*==================================================
    CLOSE DROPDOWN ON OUTSIDE CLICK
    ==================================================*/
    useEffect(() => {
        function handleClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";

    const currentTime = time.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const currentDate = time.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <header className="admin-header-glass">
                {/* Brand & Breadcrumbs */}
                <div className="header-left">
                    <div className="header-brand-pill">
                        <span className="brand-gem">✦</span>
                        <span className="brand-title">Portfolio CMS</span>
                        <span className="brand-dot-live" title="Firebase & Supabase connected">
                            <span className="dot-pulse"></span>
                            Live
                        </span>
                    </div>

                    <div className="header-divider"></div>

                    <div className="header-crumb-badge">
                        <span className="crumb-page-name">{pageTitle}</span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="header-right">
                    {/* Dark / Light Mode Toggle Button */}
                    <button
                        type="button"
                        className="header-theme-toggle"
                        onClick={toggleTheme}
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        aria-label="Toggle theme mode"
                    >
                        {isDark ? <FiSun className="theme-toggle-icon sun" /> : <FiMoon className="theme-toggle-icon moon" />}
                    </button>

                    {/* Live Client Preview Button */}
                    <a
                        href="http://localhost:5173"
                        target="_blank"
                        rel="noreferrer"
                        className="header-preview-btn"
                        title="Open Client Portfolio Website"
                    >
                        <span>View Portfolio</span>
                        <FiExternalLink />
                    </a>

                    {/* Clock & Date Chip */}
                    <div className="header-time-chip">
                        <span className="time-val">{currentTime}</span>
                        <span className="date-val">{currentDate}</span>
                    </div>

                    {/* Admin Profile Dropdown */}
                    <div className="header-profile-menu" ref={dropdownRef}>
                        <button
                            type="button"
                            className="header-profile-trigger"
                            onClick={() => setDropdown(!dropdown)}
                            aria-expanded={dropdown}
                        >
                            <div className="profile-chip-avatar">
                                {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <div className="profile-chip-info">
                                <span className="profile-chip-name">{admin?.name || "Administrator"}</span>
                                <span className="profile-chip-role">{admin?.role || "Admin"}</span>
                            </div>
                            <FiChevronDown className={`chevron-icon ${dropdown ? "open" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {dropdown && (
                                <motion.div
                                    className="header-dropdown-card"
                                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    <div className="dropdown-user-header">
                                        <div className="dropdown-user-avatar">
                                            {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                                        </div>
                                        <div>
                                            <h4 className="dropdown-user-name">{admin?.name || "Administrator"}</h4>
                                            <p className="dropdown-user-email">{admin?.email || user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="dropdown-menu-list">
                                        <button
                                            type="button"
                                            className="dropdown-action-btn"
                                            onClick={toggleTheme}
                                        >
                                            {isDark ? <FiSun /> : <FiMoon />}
                                            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="dropdown-action-btn"
                                            onClick={() => {
                                                setDropdown(false);
                                                setShowPasswordModal(true);
                                            }}
                                        >
                                            <FiKey />
                                            <span>Change Password</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="dropdown-action-btn logout"
                                            onClick={async () => {
                                                setDropdown(false);
                                                const ok = await showConfirm(
                                                    "Logout?",
                                                    "Are you sure you want to sign out?",
                                                    "Sign Out"
                                                );
                                                if (ok) await logout();
                                            }}
                                        >
                                            <FiLogOut />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </>
    );
}