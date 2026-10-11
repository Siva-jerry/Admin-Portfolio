import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import Dashboard from "./components/dashboard/Dashboard";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Experience from "./pages/Experience/Experience";
import Certificates from "./pages/Certificates/Certificates";
import Gallery from "./pages/Gallery/Gallery";
import Achievements from "./pages/Achievements/Achievements";
import Testimonials from "./pages/Testimonials/Testimonials";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer/Footer";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>
            {/* LOGIN PAGE */}
            <Route path="/login" element={<Login />} />

            {/* PROTECTED ADMIN ROUTES */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <div className="admin-app-root">
                            {/* Ambient Decorative Lighting (Light Theme) */}
                            <div className="ambient-canvas-mesh">
                                <div className="ambient-mesh-orb orb-1" />
                                <div className="ambient-mesh-orb orb-2" />
                            </div>

                            {/* Top Command Header */}
                            <Navbar />

                            {/* Main Content Area */}
                            <main className="admin-main-viewport">
                                <div className="admin-page-container">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/hero" element={<Hero />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/skills" element={<Skills />} />
                                        <Route path="/projects" element={<Projects />} />
                                        <Route path="/experience" element={<Experience />} />
                                        <Route path="/certificates" element={<Certificates />} />
                                        <Route path="/gallery" element={<Gallery />} />
                                        <Route path="/achievements" element={<Achievements />} />
                                        <Route path="/testimonials" element={<Testimonials />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/footer" element={<Footer />} />
                                    </Routes>
                                </div>
                            </main>

                            {/* Modern Floating Bottom-Center Navigation Dock */}
                            <BottomNav />
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;