import "./QuickAction.css";

import { useNavigate } from "react-router-dom";

import {
    FiLayout,
    FiFolder,
    FiImage,
    FiAward,
    FiStar,
    FiMessageSquare,
} from "react-icons/fi";

function QuickAction() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Edit Hero",
            description: "Update portfolio introduction",
            icon: <FiLayout />,
            route: "/hero",
            color: "#4F46E5",
        },

        {
            title: "Projects",
            description: "Manage portfolio projects",
            icon: <FiFolder />,
            route: "/projects",
            color: "#2563EB",
        },

        {
            title: "Gallery",
            description: "Upload gallery images",
            icon: <FiImage />,
            route: "/gallery",
            color: "#10B981",
        },

        {
            title: "Certificates",
            description: "Manage certificates",
            icon: <FiAward />,
            route: "/certificates",
            color: "#F59E0B",
        },

        {
            title: "Achievements",
            description: "Update achievements",
            icon: <FiStar />,
            route: "/achievements",
            color: "#EC4899",
        },

        {
            title: "Testimonials",
            description: "Manage testimonials",
            icon: <FiMessageSquare />,
            route: "/testimonials",
            color: "#8B5CF6",
        },

    ];

    return (

        <section className="quick-action">

            <div className="quick-action-header">

                <h2>

                    Quick Actions

                </h2>

                <p>

                    Quickly navigate to the most frequently updated portfolio sections.

                </p>

            </div>

            <div className="quick-action-grid">

                {

                    actions.map((action) => (

                        <button

                            key={action.title}

                            className="quick-action-card"

                            style={{

                                "--quick-color": action.color,

                            }}

                            onClick={() => navigate(action.route)}

                        >

                            <div className="quick-action-icon">

                                {action.icon}

                            </div>

                            <div className="quick-action-content">

                                <h3>

                                    {action.title}

                                </h3>

                                <p>

                                    {action.description}

                                </p>

                            </div>

                        </button>

                    ))

                }

            </div>

        </section>

    );

}

export default QuickAction;