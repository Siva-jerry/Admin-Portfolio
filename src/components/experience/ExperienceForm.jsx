import "./ExperienceForm.css";

import { useEffect, useState } from "react";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {

    getExperience,

    createExperience,

    updateExperience,

    deleteExperience,

    replaceExperienceImage,

} from "../../services/experienceAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function ExperienceForm() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [experience, setExperience] = useState([]);

    const [imageFiles, setImageFiles] = useState({});

    /*==================================================
    LOAD
    ==================================================*/

    useEffect(() => {

        loadExperience();

    }, []);

    /*==================================================
    LOAD EXPERIENCE
    ==================================================*/

    async function loadExperience() {

        try {

            setLoading(true);

            const data = await getExperience();

            setExperience(data);

        }

        catch (error) {

            console.error(error);

            await showError(

                "Load Failed",

                "Unable to load experience."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*==================================================
    ADD EXPERIENCE
    ==================================================*/

    async function handleAddExperience() {

        const ok = await showConfirm(

            "Add Experience?",

            "A blank experience card will be created.",

            "Add"

        );

        if (!ok) return;

        setExperience((prev) => [

            ...prev,

            {

                id:

                    "new-" +

                    Date.now(),

                company: "",

                role: "",

                description: "",

                location: "",

                employmentType: "",

                startDate: "",

                endDate: "",

                image: "",

                imagePath: "",

                featured: false,

                order:

                    prev.length + 1,

                technologies: [],

                isNew: true,

            },

        ]);

        await showSuccess(

            "Experience Added",

            "You can now fill in the details."

        );

    }

    /*==================================================
    IMAGE SELECT
    ==================================================*/

    function handleImageSelect(

        experienceId,

        file

    ) {

        if (!file) return;

        setImageFiles((prev) => ({

            ...prev,

            [experienceId]: file,

        }));

    }

    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div className="experience-loading">

                Loading Experience...

            </div>

        );

    }

    return (

        <div className="experience-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="experience-form-header">

                <div>

                    <h2>

                        Experience Management

                    </h2>

                    <p>

                        Manage your work experience and internships.

                    </p>

                </div>

                <div className="experience-actions">

                    <button

                        type="button"

                        className="experience-refresh"

                        onClick={loadExperience}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="experience-add"

                        onClick={handleAddExperience}

                    >

                        <FiPlus />

                        Add Experience

                    </button>

                </div>

            </div>

            {/*==================================================
            EXPERIENCE LIST
            ==================================================*/}

            <div className="experience-list">

                {

                    experience.map((item, index) => (

                        <div

                            key={item.id}

                            className="experience-card"
                        >
                            {/*==================================================
                            IMAGE
                            ==================================================*/}

                            <div className="experience-image-section">

                                <div className="experience-image-preview">

                                    {

                                        item.image ? (

                                            <img

                                                src={item.image}

                                                alt={item.company}

                                            />

                                        ) : (

                                            <div className="experience-image-placeholder">

                                                No Logo

                                            </div>

                                        )

                                    }

                                </div>

                                <label className="experience-upload-btn">

                                    <FiUpload />

                                    Upload Company Logo

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={(e) =>

                                            handleImageSelect(

                                                item.id,

                                                e.target.files[0]

                                            )

                                        }

                                    />

                                </label>

                                {

                                    imageFiles[item.id] && (

                                        <small>

                                            {

                                                imageFiles[item.id].name

                                            }

                                        </small>

                                    )

                                }

                            </div>

                            {/*==================================================
                            DETAILS
                            ==================================================*/}

                            <div className="experience-grid">

                                <div className="experience-field">

                                    <label>

                                        Company

                                    </label>

                                    <input

                                        value={item.company}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].company =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Role

                                    </label>

                                    <input

                                        value={item.role}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].role =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field experience-full">

                                    <label>

                                        Description

                                    </label>

                                    <textarea

                                        rows="5"

                                        value={item.description}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].description =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Location

                                    </label>

                                    <input

                                        value={item.location}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].location =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Employment Type

                                    </label>

                                    <input

                                        placeholder="Internship / Full Time"

                                        value={item.employmentType}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].employmentType =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Start Date

                                    </label>

                                    <input

                                        value={item.startDate}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].startDate =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        End Date

                                    </label>

                                    <input

                                        value={item.endDate}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].endDate =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Display Order

                                    </label>

                                    <input

                                        type="number"

                                        value={item.order}

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].order =

                                                e.target.value;

                                            setExperience(updated);

                                        }}

                                    />

                                </div>

                                <div className="experience-field">

                                    <label>

                                        Featured

                                    </label>

                                    <select

                                        value={

                                            item.featured

                                                ? "true"

                                                : "false"

                                        }

                                        onChange={(e) => {

                                            const updated = [...experience];

                                            updated[index].featured =

                                                e.target.value === "true";

                                            setExperience(updated);

                                        }}

                                    >

                                        <option value="true">

                                            Yes

                                        </option>

                                        <option value="false">

                                            No

                                        </option>

                                    </select>

                                </div>

                            </div>
                            {/*==================================================
                            TECHNOLOGIES
                            ==================================================*/}

                            <div className="experience-section">

                                <div className="experience-section-header">

                                    <h3>

                                        Technologies

                                    </h3>

                                    <button

                                        type="button"

                                        className="experience-add-btn"

                                        onClick={() => {

                                            const updated = [...experience];

                                            updated[index].technologies = [

                                                ...(updated[index].technologies || []),

                                                "",

                                            ];

                                            setExperience(updated);

                                        }}

                                    >

                                        + Add Technology

                                    </button>

                                </div>

                                {

                                    (item.technologies || []).map(

                                        (technology, techIndex) => (

                                            <div

                                                key={techIndex}

                                                className="technology-row"

                                            >

                                                <input

                                                    placeholder="Technology"

                                                    value={technology}

                                                    onChange={(e) => {

                                                        const updated = [...experience];

                                                        updated[index].technologies[techIndex] =

                                                            e.target.value;

                                                        setExperience(updated);

                                                    }}

                                                />

                                                <button

                                                    type="button"

                                                    className="delete-btn"

                                                    onClick={async () => {

                                                        const ok = await showDeleteConfirm(

                                                            "Delete Technology?",

                                                            "This technology will be removed."

                                                        );

                                                        if (!ok) return;

                                                        const updated = [...experience];

                                                        updated[index].technologies =

                                                            updated[index].technologies.filter(

                                                                (_, i) =>

                                                                    i !== techIndex

                                                            );

                                                        setExperience(updated);

                                                    }}

                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                            {/*==================================================
                            ACTION BUTTONS
                            ==================================================*/}

                            <div className="experience-buttons">

                                <button

                                    type="button"

                                    className="experience-save"

                                    onClick={async () => {

                                        const ok = await showConfirm(

                                            item.isNew

                                                ? "Create Experience?"

                                                : "Save Changes?",

                                            "Do you want to continue?",

                                            item.isNew

                                                ? "Create"

                                                : "Save"

                                        );

                                        if (!ok) return;

                                        try {

                                            showLoading(

                                                item.isNew

                                                    ? "Creating Experience..."

                                                    : "Updating Experience..."

                                            );

                                            const updatedExperience = {

                                                ...item,

                                            };

                                            if (

                                                imageFiles[item.id]

                                            ) {

                                                const result =

                                                    await replaceExperienceImage(

                                                        item.imagePath,

                                                        imageFiles[item.id]

                                                    );

                                                updatedExperience.image =

                                                    result.url;

                                                updatedExperience.imagePath =

                                                    result.path;

                                            }

                                            if (

                                                item.isNew

                                            ) {

                                                await createExperience(

                                                    updatedExperience

                                                );

                                            }

                                            else {

                                                await updateExperience(

                                                    item.id,

                                                    updatedExperience

                                                );
                                                await logActivity({

    action: "Updated Experience",

    section: "Experience",

    description: experience.company,

    type: "update",

});

                                            }

                                            closeLoading();

                                            await loadExperience();

                                            await showSuccess(

                                                "Saved!",

                                                "Experience saved successfully."

                                            );

                                        }

                                        catch (error) {

                                            closeLoading();

                                            console.error(error);

                                            await showError(

                                                "Save Failed",

                                                "Unable to save experience."

                                            );

                                        }

                                    }}

                                >

                                    Save Experience

                                </button>

                                <button

                                    type="button"

                                    className="experience-delete"

                                    onClick={async () => {

                                        if (item.isNew) {

                                            setExperience(

                                                experience.filter(

                                                    (

                                                        _,

                                                        i

                                                    ) =>

                                                        i !== index

                                                )

                                            );

                                            return;

                                        }

                                        const ok = await showDeleteConfirm(

                                            "Delete Experience?",

                                            "This action cannot be undone."

                                        );

                                        if (!ok) return;

                                        try {

                                            showLoading(

                                                "Deleting Experience..."

                                            );

                                            await deleteExperience(

                                                item

                                            );

                                            closeLoading();

                                            await loadExperience();

                                            await showSuccess(

                                                "Deleted!",

                                                "Experience deleted successfully."

                                            );

                                        }

                                        catch (error) {

                                            closeLoading();

                                            console.error(error);

                                            await showError(

                                                "Delete Failed",

                                                "Unable to delete experience."

                                            );

                                        }

                                    }}

                                >

                                    Delete Experience

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}