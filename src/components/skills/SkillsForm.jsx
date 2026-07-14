import "./SkillsForm.css";

import { useEffect, useState } from "react";
import { logActivity } from "../../services/activityService";

import {
    FiRefreshCw,
    FiPlus,
} from "react-icons/fi";

import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
} from "../../services/skillsAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function SkillsForm() {

    const [loading, setLoading] = useState(true);

    const [skills, setSkills] = useState([]);

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

            await showError(

    "Oops...",

    "Failed to load skills."

);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="skills-loading">

                Loading Skills...

            </div>

        );

    }
    const handleAddSkill = () => {

        setSkills((prev) => [

            ...prev,

            {

                id: "new-" + Date.now(),

                name: "",

                category: "",

                percentage: 80,

                color: "#6366F1",

                icon: "",

                order: prev.length + 1,

                isNew: true,

            },

        ]);

    };

    return (

        <div className="skills-form">

            {/* =========================================
                HEADER
            ========================================== */}

            <div className="skills-form-header">

                <div>

                    <h2>

                        Skills Management

                    </h2>

                    <p>

                        Manage your portfolio skills.

                    </p>

                </div>

                <div className="skills-actions">

                    <button

                        type="button"

                        className="skills-refresh"

                        onClick={loadSkills}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="skills-add"

                       onClick={async () => {

    const ok = await showConfirm(

        "Add New Skill?",

        "A blank skill form will be created.",

        "Add Skill"

    );

    if (!ok) return;

    handleAddSkill();

    await showSuccess(

        "Skill Added",

        "You can now enter the skill details."

    );

}}

                    >

                        <FiPlus />

                        Add Skill

                    </button>

                </div>

            </div>

            {/* =========================================
                SKILLS LIST
            ========================================== */}

            <div className="skills-list">
                {skills.map((skill, index) => (

    <div
        key={skill.id}
        className="skill-card"
    >

        <div className="skill-grid">

            <div className="skill-field">

                <label>Name</label>

                <input

                    value={skill.name}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].name = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

            <div className="skill-field">

                <label>Category</label>

                <input

                    value={skill.category}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].category = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

            <div className="skill-field">

                <label>Percentage</label>

                <input

                    type="number"

                    min="0"

                    max="100"

                    value={skill.percentage}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].percentage = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

            <div className="skill-field">

                <label>Color</label>

                <input

                    value={skill.color}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].color = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

            <div className="skill-field">

                <label>Icon</label>

                <input

                    value={skill.icon}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].icon = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

            <div className="skill-field">

                <label>Order</label>

                <input

                    type="number"

                    value={skill.order}

                    onChange={(e) => {

                        const updated = [...skills];

                        updated[index].order = e.target.value;

                        setSkills(updated);

                    }}

                />

            </div>

        </div>

        <div className="skill-buttons">

            <button

                className="skill-save"

                onClick={async () => {

                    try {
                        showLoading(

    skill.isNew

        ? "Creating Skill..."

        : "Updating Skill..."

);

                        if (skill.isNew) {

                            await addSkill(skill);

                        }

                        else {

                            await updateSkill(
                                skill.id,
                                skill
                            );
                            await logActivity({

    action: "Updated Skills",

    section: "Skills",

    description: "Skills updated successfully.",

    type: "update",

});

                        }

                        closeLoading();

await loadSkills();

await showSuccess(

    "Saved!",

    "Skill saved successfully."

);

                    }

                    catch (error) {

                        console.error(error);

                       closeLoading();

await showError(

    "Save Failed",

    "Unable to save skill."

);

                    }

                }}

            >

                💾 Save

            </button>

            <button

                className="skill-delete"

                onClick={async () => {

                    if (skill.isNew) {

                        setSkills(

                            skills.filter(

                                (_, i) => i !== index

                            )

                        );

                        return;

                    }

                    const ok = await showDeleteConfirm(

    "Delete Skill?",

    "This action cannot be undone."

);

if (!ok) return;

                    try {
                        showLoading(

    "Deleting Skill..."

);

                       await deleteSkill(skill.id);

closeLoading();

await loadSkills();

await showSuccess(

    "Deleted!",

    "Skill removed successfully."

);
                    }

                    catch (error) {

                        console.error(error);

                        closeLoading();

await showError(

    "Delete Failed",

    "Unable to delete skill."

);

                    }

                }}

            >

                🗑 Delete

            </button>

        </div>

    </div>
    

))}
</div>
</div>

    );

}
