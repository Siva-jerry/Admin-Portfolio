import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiGrid,
    FiLayout,
    FiUser,
    FiLayers,
    FiFolder,
    FiBriefcase,
    FiAward,
    FiImage,
    FiStar,
    FiMessageSquare,
    FiMail,
    FiCompass,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import "./BottomNav.css";

const NAV_ITEMS = [
    { path: "/", label: "Dashboard", icon: FiGrid },
    { path: "/hero", label: "Hero", icon: FiLayout },
    { path: "/about", label: "About", icon: FiUser },
    { path: "/skills", label: "Skills", icon: FiLayers },
    { path: "/projects", label: "Projects", icon: FiFolder },
    { path: "/experience", label: "Experience", icon: FiBriefcase },
    { path: "/certificates", label: "Certificates", icon: FiAward },
    { path: "/gallery", label: "Gallery", icon: FiImage },
    { path: "/achievements", label: "Achievements", icon: FiStar },
    { path: "/testimonials", label: "Testimonials", icon: FiMessageSquare },
    { path: "/contact", label: "Contact", icon: FiMail },
    { path: "/footer", label: "Footer", icon: FiCompass },
];

export default function BottomNav() {
    const location = useLocation();
    const navRef = useRef(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    function checkScroll() {
        if (!navRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    // Auto-scroll active item into view
    useEffect(() => {
        if (!navRef.current) return;
        const activeEl = navRef.current.querySelector(".bottom-nav-item.active");
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
        checkScroll();
    }, [location.pathname]);

    function scroll(direction) {
        if (!navRef.current) return;
        navRef.current.scrollBy({
            left: direction === "left" ? -160 : 160,
            behavior: "smooth",
        });
        setTimeout(checkScroll, 200);
    }

    return (
        <aside className="bottom-nav-wrapper" aria-label="Bottom Navigation">
            <div className="bottom-nav-container">
                {canScrollLeft && (
                    <button
                        type="button"
                        className="bottom-nav-arrow left"
                        onClick={() => scroll("left")}
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft />
                    </button>
                )}

                <nav
                    className="bottom-nav-bar"
                    ref={navRef}
                    onScroll={checkScroll}
                >
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `bottom-nav-item ${isActive ? "active" : ""}`
                                }
                                onMouseEnter={() => setHoveredItem(item.path)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <span className="bottom-nav-icon">
                                    <Icon />
                                </span>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            className="bottom-nav-label"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Tooltip on hover if not active */}
                                {!isActive && hoveredItem === item.path && (
                                    <span className="bottom-nav-tooltip">
                                        {item.label}
                                    </span>
                                )}

                                {isActive && (
                                    <motion.div
                                        className="bottom-nav-active-glow"
                                        layoutId="activeDockGlow"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {canScrollRight && (
                    <button
                        type="button"
                        className="bottom-nav-arrow right"
                        onClick={() => scroll("right")}
                        aria-label="Scroll right"
                    >
                        <FiChevronRight />
                    </button>
                )}
            </div>
        </aside>
    );
}
