import "./FooterForm.css";

import { useEffect, useState } from "react";

import {
    FiSave,
    FiRefreshCw,
} from "react-icons/fi";

import {

    getFooter,

    updateFooter,

} from "../../services/footerAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

} from "../../utils/alert";

export default function FooterForm() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [footer, setFooter] = useState({

        tagline: "",

        copyright: "",

        github: "",

        linkedin: "",

        instagram: "",

        resume: "",

        technologies: "",

    });

    /*==================================================
    LOAD FOOTER
    ==================================================*/

    useEffect(() => {

        loadFooter();

    }, []);

    async function loadFooter() {

        try {

            setLoading(true);

            const data = await getFooter();

            setFooter({

                ...data,

                technologies:

                    (data.technologies || [])

                        .join(", "),

            });

        }

        catch (error) {

            console.error(

                "Load Footer Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*==================================================
    INPUT CHANGE
    ==================================================*/

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setFooter((previous) => ({

            ...previous,

            [name]: value,

        }));

    }
    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div className="footer-form-loading">

                Loading Footer Information...

            </div>

        );

    }

    /*==================================================
    UI
    ==================================================*/

    return (

        <div className="footer-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="footer-form-header">

                <div>

                    <h2>

                        Footer Management

                    </h2>

                    <p>

                        Update your footer content, social links and technologies.

                    </p>

                </div>

                <button

                    type="button"

                    className="footer-refresh"

                    onClick={loadFooter}

                >

                    <FiRefreshCw />

                    Refresh

                </button>

            </div>

            {/*==================================================
            FORM
            ==================================================*/}

            <div className="footer-grid">

                <div className="footer-field footer-full">

                    <label>

                        Tagline

                    </label>

                    <input

                        type="text"

                        name="tagline"

                        value={footer.tagline}

                        onChange={handleChange}

                        placeholder="Let's build something amazing together."

                    />

                </div>

                <div className="footer-field footer-full">

                    <label>

                        Copyright

                    </label>

                    <input

                        type="text"

                        name="copyright"

                        value={footer.copyright}

                        onChange={handleChange}

                        placeholder="© 2026 Your Name. All rights reserved."

                    />

                </div>

                <div className="footer-field">

                    <label>

                        GitHub

                    </label>

                    <input

                        type="text"

                        name="github"

                        value={footer.github}

                        onChange={handleChange}

                        placeholder="https://github.com/username"

                    />

                </div>

                <div className="footer-field">

                    <label>

                        LinkedIn

                    </label>

                    <input

                        type="text"

                        name="linkedin"

                        value={footer.linkedin}

                        onChange={handleChange}

                        placeholder="https://linkedin.com/in/username"

                    />

                </div>
                <div className="footer-field">

                    <label>

                        Instagram

                    </label>

                    <input

                        type="text"

                        name="instagram"

                        value={footer.instagram}

                        onChange={handleChange}

                        placeholder="https://instagram.com/username"

                    />

                </div>

                <div className="footer-field">

                    <label>

                        Resume URL

                    </label>

                    <input

                        type="text"

                        name="resume"

                        value={footer.resume}

                        onChange={handleChange}

                        placeholder="https://..."

                    />

                </div>

                <div className="footer-field footer-full">

                    <label>

                        Technologies

                    </label>

                    <input

                        type="text"

                        name="technologies"

                        value={footer.technologies}

                        onChange={handleChange}

                        placeholder="React, Firebase, Supabase, JavaScript"

                    />

                    <small>

                        Separate each technology with a comma.

                    </small>

                </div>

            </div>

            {/*==================================================
            ACTIONS
            ==================================================*/}

            <div className="footer-actions">

                <button

                    type="button"

                    className="footer-save"

                    onClick={async () => {

                        try {

                            showLoading(

                                "Saving Footer...",

                                "Please wait while updating your footer."

                            );

                            await updateFooter({

                                ...footer,

                                technologies:

                                    footer.technologies

                                        .split(",")

                                        .map(

                                            (item) =>

                                                item.trim()

                                        )

                                        .filter(Boolean),

                            });

                            closeLoading();

                            await showSuccess(

                                "Updated!",

                                "Footer updated successfully."

                            );

                            loadFooter();

                        }

                        catch (error) {

                            console.error(error);

                            closeLoading();

                            await showError(

                                "Update Failed",

                                "Unable to update footer."

                            );

                        }

                    }}

                >

                    <FiSave />

                    Save Changes

                </button>

            </div>

        </div>

    );

}