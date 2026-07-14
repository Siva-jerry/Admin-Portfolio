import "./Skills.css";

import SkillsForm from "../../components/skills/SkillsForm";
import SkillsPreview from "../../components/skills/SkillsPreview";

export default function Skills() {

    return (

        <div className="skills-page">

            <div className="skills-page-left">

                <SkillsForm />

            </div>

            <div className="skills-page-right">

                <SkillsPreview />

            </div>

        </div>

    );

}