import "./AboutForm.css";

import { useEffect, useState } from "react";
import { logActivity } from "../../services/activityService";

import {
    FiSave,
    FiRefreshCw,
} from "react-icons/fi";

import {
    updateAboutData,
} from "../../services/aboutAdminService";
import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function AboutForm({

    about,

    setAbout,

    onSaved,

}) {

    

    const [saving, setSaving] = useState(false);


   

    const handleChange = (e) => {

    const { name, value } = e.target;

    setAbout((prev) => ({

        ...prev,

        [name]: value,

    }));

};

    const handleSave = async () => {

    try {

    const ok = await showConfirm(

        "Save About Section?",

        "Do you want to save the changes?",

        "Save"

    );

    if (!ok) {

        return;

    }

    setSaving(true);

    showLoading(

        "Saving About..."

    );

    await updateAboutData(about);
    await logActivity({

    action: "Updated About",

    section: "About",

    description: "About section updated successfully.",

    type: "update",

});

        if (onSaved) {

            await onSaved();

        }

       closeLoading();

await showSuccess(

    "Saved!",

    "About section updated successfully."

);

    }

    catch (error) {

        console.error(error);

       closeLoading();

await showError(

    "Update Failed",

    "Unable to update About section."

);

    }

    finally {

    closeLoading();

    setSaving(false);

}

};

  
    return (

        <div className="about-form">

            <div className="about-form-header">

                <div>

                    <h2>About Information</h2>

                    <p>

                        Update your About section.

                    </p>

                </div>

                <div className="about-actions">

                    <button

                        type="button"

                        className="about-refresh"

                        onClick={onSaved}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="about-save"

                        onClick={handleSave}

                        disabled={saving}

                    >

                        <FiSave />

                        {

                            saving

                                ? "Saving..."

                                : "Save Changes"

                        }

                    </button>

                </div>

            </div>

            <div className="about-grid">

                <div className="about-field">

                    <label>Title</label>

                    <input

                        name="title"

                        value={about.title}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field">

                    <label>Subtitle</label>

                    <input

                        name="subtitle"

                        value={about.subtitle}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field about-full">

                    <label>Description</label>

                    <textarea

                        rows="5"

                        name="description"

                        value={about.description}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field">

                    <label>Education</label>

                    <input

                        name="education"

                        value={about.education}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field">

                    <label>Location</label>

                    <input

                        name="location"

                        value={about.location}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field">

                    <label>Status</label>

                    <input

                        name="status"

                        value={about.status}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field">

                    <label>Passion</label>

                    <input

                        name="passion"

                        value={about.passion}

                        onChange={handleChange}

                    />

                </div>

                <div className="about-field about-full">

                    <label>Quote</label>

                    <textarea

                        rows="3"

                        name="quote"

                        value={about.quote}

                        onChange={handleChange}

                    />

                </div>

            </div>
            {/* ================= ABOUT CARDS ================= */}

            <div className="about-section">

                <div className="about-section-header">

                    <h3>About Cards</h3>

                    <button
                        type="button"
                        className="about-add-btn"
                       onClick={async () => {

    const ok = await showConfirm(

        "Add About Card?",

        "A new About card will be created.",

        "Add Card"

    );

    if (!ok) return;

    setAbout(prev => ({

        ...prev,

        aboutCards: [

            ...prev.aboutCards,

            {

                icon: "",

                title: "",

                value: "",

            },

        ],

    }));

    await showSuccess(

        "Card Added",

        "New About card created."

    );

}}
                    >
                        + Add Card
                    </button>

                </div>

                {

                    about.aboutCards.map((card, index) => (

                        <div
                            className="about-card"
                            key={index}
                        >

                            <input
                                placeholder="Icon"
                                value={card.icon}
                                onChange={(e) => {

                                    const updated = [...about.aboutCards];

                                    updated[index].icon = e.target.value;

                                    setAbout({
                                        ...about,
                                        aboutCards: updated,
                                    });

                                }}
                            />

                            <input
                                placeholder="Title"
                                value={card.title}
                                onChange={(e) => {

                                    const updated = [...about.aboutCards];

                                    updated[index].title = e.target.value;

                                    setAbout({
                                        ...about,
                                        aboutCards: updated,
                                    });

                                }}
                            />

                            <input
                                placeholder="Value"
                                value={card.value}
                                onChange={(e) => {

                                    const updated = [...about.aboutCards];

                                    updated[index].value = e.target.value;

                                    setAbout({
                                        ...about,
                                        aboutCards: updated,
                                    });

                                }}
                            />

                            <button

                                type="button"

                                className="delete-btn"

                               onClick={async () => {

                                   const ok = await showDeleteConfirm(

    "Delete About Card?",

    "This card will be removed."

);

if (!ok) return;
                                    const updated =
                                        about.aboutCards.filter(
                                            (_, i) => i !== index
                                        );

                                    setAbout({
                                        ...about,
                                        aboutCards: updated,
                                    });

                                }}

                            >

                                Delete

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}