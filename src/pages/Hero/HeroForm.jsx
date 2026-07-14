import "./HeroForm.css";

import { useEffect, useState } from "react";
import { logActivity } from "../../services/activityService";

import {
    FiSave,
    FiUpload,
    FiRefreshCw,
} from "react-icons/fi";

import {
    getHeroData,
    updateHeroData,
    replaceHeroImage,
} from "../../services/heroAdminService";

export default function HeroForm() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [imageFile, setImageFile] = useState(null);

    const [hero, setHero] = useState({

        greeting: "",

        firstName: "",

        lastName: "",

        description: "",

        imageUrl: "",

        primaryButtonText: "",

        primaryButtonLink: "",

        secondaryButtonText: "",

        resumeUrl: "",

        professions: [],

        socials: [],

        stats: [],

    });

    useEffect(() => {

        loadHero();

    }, []);

    const loadHero = async () => {

        try {

            setLoading(true);

            const data = await getHeroData();

            setHero(data);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load Hero data.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setHero((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const handleImageSelect = (e) => {

        if (!e.target.files.length) return;

        setImageFile(e.target.files[0]);

    };

    const handleSave = async () => {

    try {

        setSaving(true);

        let heroData = { ...hero };

        if (imageFile) {

            const result = await replaceHeroImage(imageFile);

            heroData.imageUrl = result.url;
            heroData.imagePath = result.path;

            setHero(heroData);
        }

        await updateHeroData(heroData);
        await logActivity({

    action: "Updated Hero",

    section: "Hero",

    description: "Hero section updated successfully.",

    type: "update",

});

        alert("Hero updated successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Update failed.");

    }

    finally {

        setSaving(false);

    }

};

    if (loading) {

        return (

            <div className="hero-loading">

                Loading Hero...

            </div>

        );

    }

    return (

    <div className="hero-form">

        <div className="hero-form-header">

            <div>

                <h2>

                    Hero Information

                </h2>

                <p>

                    Update your portfolio landing section.

                </p>

            </div>

            <div className="hero-actions">

                <button

                    type="button"

                    className="hero-refresh"

                    onClick={loadHero}

                >

                    <FiRefreshCw />

                    Refresh

                </button>

                <button

                    type="button"

                    className="hero-save"

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

        <div className="hero-profile">

            <div className="hero-avatar">

                {

                    hero.imageUrl

                        ? (

                            <img

                                src={hero.imageUrl}

                                alt="Hero"

                            />

                        )

                        : (

                            <div className="hero-avatar-placeholder">

                                No Image

                            </div>

                        )

                }

            </div>

            <div className="hero-upload">

                <label className="hero-upload-btn">

                    <FiUpload />

                    Upload New Image

                    <input

                        hidden

                        type="file"

                        accept="image/*"

                        onChange={handleImageSelect}

                    />

                </label>

                {

                    imageFile && (

                        <small>

                            {imageFile.name}

                        </small>

                    )

                }

            </div>

        </div>

        <div className="hero-grid">

            <div className="hero-field">

                <label>

                    Greeting

                </label>

                <input

                    name="greeting"

                    value={hero.greeting}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    First Name

                </label>

                <input

                    name="firstName"

                    value={hero.firstName}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    Last Name

                </label>

                <input

                    name="lastName"

                    value={hero.lastName}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field hero-full">

                <label>

                    Description

                </label>

                <textarea

                    rows="6"

                    name="description"

                    value={hero.description}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    Primary Button Text

                </label>

                <input

                    name="primaryButtonText"

                    value={hero.primaryButtonText}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    Primary Button Link

                </label>

                <input

                    name="primaryButtonLink"

                    value={hero.primaryButtonLink}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    Secondary Button

                </label>

                <input

                    name="secondaryButtonText"

                    value={hero.secondaryButtonText}

                    onChange={handleChange}

                />

            </div>

            <div className="hero-field">

                <label>

                    Resume URL

                </label>

                <input

                    name="resumeUrl"

                    value={hero.resumeUrl}

                    onChange={handleChange}

                />

            </div>
            

        </div>
        {/* ================= PROFESSIONS ================= */}

<div className="hero-section">

    <div className="hero-section-header">

        <h3>Professions</h3>

        <button
            type="button"
            className="hero-add-btn"
            onClick={() =>
                setHero({
                    ...hero,
                    professions: [
                        ...hero.professions,
                        "",
                    ],
                })
            }
        >

            + Add Profession

        </button>

    </div>

    {

        hero.professions.map((profession, index) => (

            <div
                className="array-row"
                key={index}
            >

                <input
                    value={profession}
                    onChange={(e) => {

                        const updated = [...hero.professions];

                        updated[index] = e.target.value;

                        setHero({
                            ...hero,
                            professions: updated,
                        });

                    }}
                />

                <button

                    type="button"

                    className="delete-btn"

                    onClick={() => {

    const ok = window.confirm(
        "Are you sure you want to delete this profession?"
    );

    if (!ok) return;

    const updated = hero.professions.filter(
        (_, i) => i !== index
    );

    setHero({
        ...hero,
        professions: updated,
    });

}}

                >

                    Delete

                </button>

            </div>

        ))

    }

</div>





{/* ================= SOCIAL LINKS ================= */}

<div className="hero-section">

    <div className="hero-section-header">

        <h3>

            Social Links

        </h3>

        <button

            type="button"

            className="hero-add-btn"

            onClick={() =>

                setHero({

                    ...hero,

                    socials: [

                        ...hero.socials,

                        {

                            icon: "",

                            label: "",

                            url: "",

                        },

                    ],

                })

            }

        >

            + Add Social

        </button>

    </div>

    {

        hero.socials.map((social, index) => (

            <div
                className="social-card"
                key={index}
            >

                <input

                    placeholder="Icon"

                    value={social.icon}

                    onChange={(e) => {

                        const updated = [...hero.socials];

                        updated[index].icon = e.target.value;

                        setHero({
                            ...hero,
                            socials: updated,
                        });

                    }}

                />

                <input

                    placeholder="Label"

                    value={social.label}

                    onChange={(e) => {

                        const updated = [...hero.socials];

                        updated[index].label = e.target.value;

                        setHero({
                            ...hero,
                            socials: updated,
                        });

                    }}

                />

                <input

                    placeholder="URL"

                    value={social.url}

                    onChange={(e) => {

                        const updated = [...hero.socials];

                        updated[index].url = e.target.value;

                        setHero({
                            ...hero,
                            socials: updated,
                        });

                    }}

                />

                <button
    type="button"
    className="delete-btn"
    onClick={() => {

        const ok = window.confirm(
            "Are you sure you want to delete this social link?"
        );

        if (!ok) return;

        const updated = hero.socials.filter(
            (_, i) => i !== index
        );

        setHero({
            ...hero,
            socials: updated,
        });

    }}
>
    Delete
</button>

            </div>

        ))

    }

</div>






{/* ================= STATS ================= */}

<div className="hero-section">

    <div className="hero-section-header">

        <h3>

            Hero Stats

        </h3>

        <button

            type="button"

            className="hero-add-btn"

            onClick={() =>

                setHero({

                    ...hero,

                    stats: [

                        ...hero.stats,

                        {

                            icon: "",

                            title: "",

                            value: "",

                            hover: "",

                        },

                    ],

                })

            }

        >

            + Add Stat

        </button>

    </div>

    {

        hero.stats.map((stat, index) => (

            <div
                className="stats-card"
                key={index}
            >

                <input

                    placeholder="Icon"

                    value={stat.icon}

                    onChange={(e) => {

                        const updated = [...hero.stats];

                        updated[index].icon = e.target.value;

                        setHero({
                            ...hero,
                            stats: updated,
                        });

                    }}

                />

                <input

                    placeholder="Title"

                    value={stat.title}

                    onChange={(e) => {

                        const updated = [...hero.stats];

                        updated[index].title = e.target.value;

                        setHero({
                            ...hero,
                            stats: updated,
                        });

                    }}

                />

                <input

                    placeholder="Value"

                    value={stat.value}

                    onChange={(e) => {

                        const updated = [...hero.stats];

                        updated[index].value = e.target.value;

                        setHero({
                            ...hero,
                            stats: updated,
                        });

                    }}

                />

                <input

                    placeholder="Hover"

                    value={stat.hover}

                    onChange={(e) => {

                        const updated = [...hero.stats];

                        updated[index].hover = e.target.value;

                        setHero({
                            ...hero,
                            stats: updated,
                        });

                    }}

                />

                <button

                    type="button"

                    className="delete-btn"

                    onClick={() => {

    const ok = window.confirm(
        "Are you sure you want to delete this stat?"
    );

    if (!ok) return;

    const updated = hero.stats.filter(
        (_, i) => i !== index
    );

    setHero({
        ...hero,
        stats: updated,
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