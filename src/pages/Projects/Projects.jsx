import "./Projects.css";

import ProjectsForm from "../../components/projects/ProjectsForm";
import ProjectsPreview from "../../components/projects/ProjectsPreview";

export default function Projects() {

    return (

        <div className="projects-page">

            <div className="projects-left">

                <ProjectsForm />

            </div>

            <div className="projects-right">

                <ProjectsPreview />

            </div>

        </div>

    );

}