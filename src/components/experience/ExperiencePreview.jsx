import "./ExperiencePreview.css";

import {
    FiMapPin,
    FiCalendar,
    FiBriefcase,
    FiStar,
} from "react-icons/fi";

export default function ExperiencePreview({

    experience,

}) {

    if (

        !experience ||

        experience.length === 0

    ) {

        return (

            <div className="experience-preview">

                <div className="experience-preview-empty">

                    No Experience Added

                </div>

            </div>

        );

    }

    return (

        <div className="experience-preview">

            <div className="experience-preview-header">

                <span>

                    MY EXPERIENCE

                </span>

                <h2>

                    Experience Preview

                </h2>

                <p>

                    Live preview of your portfolio experience.

                </p>

            </div>

            <div className="experience-preview-list">

                {

                    experience.map((item) => (

                        <div

                            key={item.id}

                            className="experience-preview-card"

                        >
                            {

                                item.featured && (

                                    <div className="experience-featured">

                                        <FiStar />

                                        Featured

                                    </div>

                                )

                            }

                            <div className="experience-company-logo">

                                {

                                    item.image ? (

                                        <img

                                            src={item.image}

                                            alt={item.company}

                                        />

                                    ) : (

                                        <div className="experience-logo-placeholder">

                                            Logo

                                        </div>

                                    )

                                }

                            </div>

                            <div className="experience-preview-content">

                                <span className="experience-company">

                                    {item.company}

                                </span>

                                <h3>

                                    {item.role}

                                </h3>

                                <div className="experience-meta">

                                    <span>

                                        <FiCalendar />

                                        {item.startDate}

                                        {" - "}

                                        {item.endDate}

                                    </span>

                                    <span>

                                        <FiMapPin />

                                        {item.location}

                                    </span>

                                    <span>

                                        <FiBriefcase />

                                        {item.employmentType}

                                    </span>

                                </div>

                                <p>

                                    {item.description}

                                </p>

                                <div className="experience-tech-list">

                                    {

                                        item.technologies?.map(

                                            (tech) => (

                                                <span

                                                    key={tech}

                                                    className="experience-tech"

                                                >

                                                    {tech}

                                                </span>

                                            )

                                        )

                                    }

                                </div>

                            </div>
                            </div>

                    ))

                }

            </div>

        </div>

    );

}
                            