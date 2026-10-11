import { useNavigate } from "react-router-dom";
import {
    FiFolder,
    FiLayers,
    FiBriefcase,
    FiAward,
    FiImage,
    FiStar,
    FiMessageSquare,
    FiDatabase,
    FiExternalLink,
    FiArrowRight,
    FiCheckCircle,
} from "react-icons/fi";
import { useDashboard } from "../../context/DashboardContext";
import StatsCard from "./StatsCard";
import QuickAction from "./QuickAction";
import StorageCard from "./StorageCard";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const { loading, dashboard } = useDashboard();

    const stats = dashboard?.stats || {};

    const statCardsData = [
        {
            title: "Total Documents",
            value: dashboard?.documents || 0,
            icon: <FiDatabase />,
            color: "#4F46E5",
        },
        {
            title: "Projects",
            value: stats.projects || 0,
            icon: <FiFolder />,
            color: "#2563EB",
            route: "/projects",
        },
        {
            title: "Skills",
            value: stats.skills || 0,
            icon: <FiLayers />,
            color: "#059669",
            route: "/skills",
        },
        {
            title: "Experience",
            value: stats.experience || 0,
            icon: <FiBriefcase />,
            color: "#D97706",
            route: "/experience",
        },
        {
            title: "Certificates",
            value: stats.certificates || 0,
            icon: <FiAward />,
            color: "#7C3AED",
            route: "/certificates",
        },
        {
            title: "Gallery Photos",
            value: stats.gallery || 0,
            icon: <FiImage />,
            color: "#0D9488",
            route: "/gallery",
        },
        {
            title: "Achievements",
            value: stats.achievements || 0,
            icon: <FiStar />,
            color: "#E11D48",
            route: "/achievements",
        },
        {
            title: "Testimonials",
            value: stats.testimonials || 0,
            icon: <FiMessageSquare />,
            color: "#9333EA",
            route: "/testimonials",
        },
    ];

    return (
        <section className="dashboard-view">
            {/* Hero Welcome Banner */}
            <div className="dashboard-welcome-banner">
                <div className="welcome-banner-content">
                    <span className="welcome-badge">
                        <FiCheckCircle className="badge-icon" />
                        CMS Online & Synced
                    </span>
                    <h1 className="welcome-title">
                        Portfolio Control Center
                    </h1>
                    <p className="welcome-subtitle">
                        Seamlessly manage your hero section, projects, experience, skills, and assets from one unified dashboard.
                    </p>

                    <div className="welcome-actions">
                        <button
                            type="button"
                            className="welcome-btn-primary"
                            onClick={() => navigate("/hero")}
                        >
                            <span>Edit Hero Section</span>
                            <FiArrowRight />
                        </button>
                        <a
                            href="http://localhost:5173"
                            target="_blank"
                            rel="noreferrer"
                            className="welcome-btn-ghost"
                        >
                            <span>Preview Live Site</span>
                            <FiExternalLink />
                        </a>
                    </div>
                </div>

                <div className="welcome-banner-graphic">
                    <div className="floating-metric-card metric-1">
                        <span className="metric-label">Firebase</span>
                        <span className="metric-status">Connected</span>
                    </div>
                    <div className="floating-metric-card metric-2">
                        <span className="metric-label">Supabase</span>
                        <span className="metric-status">Storage Ready</span>
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="dashboard-section-title-wrap">
                <h2>Content Metrics</h2>
                <p>Live inventory of items published on your portfolio</p>
            </div>

            <div className="dashboard-stats-grid">
                {statCardsData.map((stat) => (
                    <div
                        key={stat.title}
                        onClick={() => stat.route && navigate(stat.route)}
                        style={{ cursor: stat.route ? "pointer" : "default" }}
                    >
                        <StatsCard
                            title={stat.title}
                            value={loading ? "-" : stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    </div>
                ))}
            </div>

            {/* Quick Actions & Storage Overview */}
            <div className="dashboard-split-grid">
                <QuickAction />
                <StorageCard />
            </div>
        </section>
    );
}

export default Dashboard;