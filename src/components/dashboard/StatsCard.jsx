import "./StatsCard.css";

import {
    FiArrowUpRight,
} from "react-icons/fi";

function StatsCard({

    title,

    value,

    icon,

    color = "#6366F1",

}) {

    return (

        <div
            className="stats-card"
            style={{

                "--card-color": color,

            }}
        >

            <div className="stats-card-top">

                <div className="stats-card-icon">

                    {icon}

                </div>

                <div className="stats-card-arrow">

                    <FiArrowUpRight />

                </div>

            </div>

            <div className="stats-card-body">

                <h2>

                    {value}

                </h2>

                <p>

                    {title}

                </p>

            </div>

            <div className="stats-card-glow"></div>

        </div>

    );

}

export default StatsCard;