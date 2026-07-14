import "./AchievementForm.css";

import { useState } from "react";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {

    createAchievement,

    updateAchievement,

    deleteAchievement,

    replaceAchievementImage,

} from "../../services/achievementAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function AchievementForm({

    achievements,

    setAchievements,

    reloadAchievements,

}) {

    /*==================================================
    STATE
    ==================================================*/

    const [imageFiles, setImageFiles] = useState({});

    /*==================================================
    ADD NEW ACHIEVEMENT
    ==================================================*/

    function handleAddAchievement() {

        setAchievements((prev) => [

            ...prev,

            {

                id: "new-" + Date.now(),

                title: "",

                organization: "",

                description: "",

                badge: "",

                date: "",

                image: "",

                featured: false,

                order: prev.length + 1,

                isNew: true,

            },

        ]);

    }

    /*==================================================
    IMAGE SELECT
    ==================================================*/

    function handleImageSelect(

        achievementId,

        file

    ) {

        if (!file) return;

        setImageFiles((prev) => ({

            ...prev,

            [achievementId]: file,

        }));

    }

    return (

        <div className="achievement-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="achievement-form-header">

                <div>

                    <h2>

                        Achievements Management

                    </h2>

                    <p>

                        Create, edit and manage your achievements.

                    </p>

                </div>

                <div className="achievement-actions">

                    <button

                        type="button"

                        className="achievement-refresh"

                        onClick={reloadAchievements}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="achievement-add"

                        onClick={async () => {

                            const ok = await showConfirm(

                                "Add Achievement?",

                                "A new achievement will be created.",

                                "Add"

                            );

                            if (!ok) return;

                            handleAddAchievement();

                        }}

                    >

                        <FiPlus />

                        Add Achievement

                    </button>

                </div>

            </div>

            {/*==================================================
            LIST
            ==================================================*/}

            <div className="achievement-list">

                {

                    achievements.map((achievement, index) => (

                        <div

                            key={achievement.id}

                            className="achievement-card"

                        >
                            {/*==================================================
                            IMAGE
                            ==================================================*/}

                            <div className="achievement-image-section">

                                <div className="achievement-image-preview">

                                    {

                                        achievement.image ? (

                                            <img
                                                src={achievement.image}
                                                alt={achievement.title}
                                            />

                                        ) : (

                                            <div className="achievement-image-placeholder">

                                                No Image

                                            </div>

                                        )

                                    }

                                </div>

                                <label className="achievement-upload-btn">

                                    <FiUpload />

                                    Upload Image

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={(e) =>

                                            handleImageSelect(

                                                achievement.id,

                                                e.target.files[0]

                                            )

                                        }

                                    />

                                </label>

                                {

                                    imageFiles[achievement.id] && (

                                        <small>

                                            {

                                                imageFiles[achievement.id]

                                                    .name

                                            }

                                        </small>

                                    )

                                }

                            </div>

                            {/*==================================================
                            DETAILS
                            ==================================================*/}

                            <div className="achievement-grid">

                                <div className="achievement-field">

                                    <label>

                                        Title

                                    </label>

                                    <input

                                        value={achievement.title}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].title = e.target.value;

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field">

                                    <label>

                                        Organization

                                    </label>

                                    <input

                                        value={achievement.organization}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].organization = e.target.value;

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field achievement-full">

                                    <label>

                                        Description

                                    </label>

                                    <textarea

                                        rows={4}

                                        value={achievement.description}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].description = e.target.value;

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field">

                                    <label>

                                        Badge

                                    </label>

                                    <input

                                        value={achievement.badge}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].badge = e.target.value;

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field">

                                    <label>

                                        Date

                                    </label>

                                    <input

                                        value={achievement.date}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].date = e.target.value;

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field">

                                    <label>

                                        Display Order

                                    </label>

                                    <input

                                        type="number"

                                        value={achievement.order}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].order = Number(e.target.value);

                                            setAchievements(updated);

                                        }}

                                    />

                                </div>

                                <div className="achievement-field">

                                    <label>

                                        Featured

                                    </label>

                                    <select

                                        value={achievement.featured ? "true" : "false"}

                                        onChange={(e) => {

                                            const updated = [...achievements];

                                            updated[index].featured =

                                                e.target.value === "true";

                                            setAchievements(updated);

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
                            ACTIONS
                            ==================================================*/}

                            <div className="achievement-buttons">
                                <button

                                    type="button"

                                    className="achievement-save"

                                    onClick={async () => {

                                        try {

                                            showLoading(

                                                achievement.isNew

                                                    ? "Creating Achievement..."

                                                    : "Updating Achievement...",

                                                "Please wait while we save your achievement."

                                            );

                                            const updatedAchievement = {

                                                ...achievement,

                                            };

                                            /*--------------------------------
                                            IMAGE
                                            --------------------------------*/

                                            if (

                                                imageFiles[achievement.id]

                                            ) {

                                                const result =

                                                    await replaceAchievementImage(

                                                        achievement.image,

                                                        imageFiles[achievement.id]

                                                    );

                                                updatedAchievement.image =

                                                    result.path;

                                            }

                                            /*--------------------------------
                                            SAVE
                                            --------------------------------*/

                                            if (

                                                achievement.isNew

                                            ) {

                                                await createAchievement(

                                                    updatedAchievement

                                                );

                                            }

                                            else {

                                                await updateAchievement(

                                                    achievement.id,

                                                    updatedAchievement

                                                );
                                                await logActivity({

    action: "Deleted Achievement",

    section: "Achievements",

    description: achievement.title,

    type: "delete",

});

                                            }

                                            closeLoading();

                                            await showSuccess(

                                                "Saved!",

                                                "Achievement saved successfully."

                                            );

                                            reloadAchievements();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Save Failed",

                                                "Unable to save achievement."

                                            );

                                        }

                                    }}

                                >

                                    Save Achievement

                                </button>

                                <button

                                    type="button"

                                    className="achievement-delete"

                                    onClick={async () => {

                                        if (

                                            achievement.isNew

                                        ) {

                                            setAchievements(

                                                achievements.filter(

                                                    (_,

                                                        i) =>

                                                        i !== index

                                                )

                                            );

                                            return;

                                        }

                                        const ok =

                                            await showDeleteConfirm(

                                                "Delete Achievement?",

                                                "This action cannot be undone."

                                            );

                                        if (!ok) return;

                                        try {

                                            showLoading(

                                                "Deleting Achievement...",

                                                "Please wait..."

                                            );

                                            await deleteAchievement(

                                                achievement

                                            );

                                            closeLoading();

                                            await showSuccess(

                                                "Deleted!",

                                                "Achievement removed successfully."

                                            );

                                            reloadAchievements();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Delete Failed",

                                                "Unable to delete achievement."

                                            );

                                        }

                                    }}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}