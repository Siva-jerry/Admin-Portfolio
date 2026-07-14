import "./ProjectsPreview.css";

import { useEffect, useState } from "react";

import {

    FiGithub,

    FiExternalLink,

    FiStar,

} from "react-icons/fi";

import {

    getProjects,

} from "../../services/projectsAdminService";

export default function ProjectsPreview() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProjects();

    }, []);

    async function loadProjects() {

        try {

            setLoading(true);

            const data = await getProjects();

            setProjects(data);

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

            <div className="projects-preview-loading">

                Loading Preview...

            </div>

        );

    }

    return (

        <div className="projects-preview">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="projects-preview-header">

                <span>

                    MY PROJECTS

                </span>

                <h2>

                    Projects Preview

                </h2>

                <p>

                    Live preview of your portfolio projects.

                </p>

            </div>

            {/*==================================================
            PROJECT LIST
            ==================================================*/}

            <div className="projects-preview-list">
                {

                    projects.map((project) => (

                        <div

                            key={project.id}

                            className="project-preview-card"

                        >

                            {/*==============================
                            IMAGE
                            ==============================*/}

                            <div className="project-preview-image">

                                {

                                    project.image ? (

                                        <img

                                            src={project.image}

                                            alt={project.title}

                                        />

                                    ) : (

                                        <div className="project-preview-placeholder">

                                            No Image

                                        </div>

                                    )

                                }

                                {

                                    project.featured && (

                                        <span className="featured-badge">

                                            <FiStar />

                                            Featured

                                        </span>

                                    )

                                }

                            </div>

                            {/*==============================
                            CONTENT
                            ==============================*/}

                            <div className="project-preview-content">

                                <span className="project-category">

                                    {project.category}

                                </span>

                                <h3>

                                    {project.title}

                                </h3>

                                <p>

                                    {project.description}

                                </p>

                            </div>

                            {/*==============================
                            TECHNOLOGIES
                            ==============================*/}

                            <div className="project-technologies">

                                {

                                    (project.technologies || []).map(

                                        (tech, index) => (

                                            <span

                                                key={index}

                                                className="tech-chip"

                                            >

                                                {tech}

                                            </span>

                                        )

                                    )

                                }

                            </div>

                            {/*==============================
                            BUTTONS
                            ==============================*/}

                            <div className="project-preview-actions">

                                {

                                    project.github && (

                                        <a

                                            href={project.github}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="github-btn"

                                        >

                                            <FiGithub />

                                            GitHub

                                        </a>

                                    )

                                }

                                {

                                    project.live && (

                                        <a

                                            href={project.live}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="live-btn"

                                        >

                                            <FiExternalLink />

                                            Live Demo

                                        </a>

                                    )

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}