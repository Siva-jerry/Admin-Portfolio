import "./SkillsPreview.css";

import { useEffect, useState } from "react";

import {

    getSkills,

} from "../../services/skillsAdminService";

export default function SkillsPreview() {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSkills();

    }, []);

    async function loadSkills() {

        try {

            setLoading(true);

            const data = await getSkills();

            setSkills(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="skills-preview-loading">

                Loading Preview...

            </div>

        );

    }

    return (

        <div className="skills-preview">

            {/*==============================
                HEADER
            ==============================*/}

            <div className="skills-preview-header">

                <span>

                    MY SKILLS

                </span>

                <h2>

                    Skills Preview

                </h2>

                <p>

                    Live preview of your portfolio skills.

                </p>

            </div>

            {/*==============================
                SKILLS
            ==============================*/}

            <div className="skills-preview-list">
                {

                    skills.map((skill) => (

                        <div

                            key={skill.id}

                            className="skill-preview-card"

                        >

                            <div className="skill-preview-top">

                                <div>

                                    <h3>

                                        {skill.name}

                                    </h3>

                                    <span>

                                        {skill.category}

                                    </span>

                                </div>

                                <strong>

                                    {skill.percentage}%

                                </strong>

                            </div>

                            <div className="skill-progress">

                                <div

                                    className="skill-progress-fill"

                                    style={{

                                        width: `${skill.percentage}%`,

                                        background: skill.color,

                                    }}

                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}