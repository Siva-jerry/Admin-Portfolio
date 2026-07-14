import "./ContactForm.css";

import { useEffect, useState } from "react";

import {
    FiSave,
    FiRefreshCw,
} from "react-icons/fi";

import {

    getContact,

    updateContact,

} from "../../services/contactAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

} from "../../utils/alert";

export default function ContactForm() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [contact, setContact] = useState({

        email: "",

        phone: "",

        location: "",

        website: "",

        github: "",

        linkedin: "",

        instagram: "",

        resume: "",

    });

    /*==================================================
    LOAD CONTACT
    ==================================================*/

    useEffect(() => {

        loadContact();

    }, []);

    async function loadContact() {

        try {

            setLoading(true);

            const data = await getContact();

            setContact(data);

        }

        catch (error) {

            console.error(

                "Load Contact Error:",

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

    function handleChange(e) {

        const {

            name,

            value,

        } = e.target;

        setContact((prev) => ({

            ...prev,

            [name]: value,

        }));

    }
    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div className="contact-form-loading">

                Loading Contact Information...

            </div>

        );

    }

    /*==================================================
    UI
    ==================================================*/

    return (

        <div className="contact-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="contact-form-header">

                <div>

                    <h2>

                        Contact Information

                    </h2>

                    <p>

                        Update your contact details shown on your portfolio.

                    </p>

                </div>

                <button

                    type="button"

                    className="contact-refresh"

                    onClick={loadContact}

                >

                    <FiRefreshCw />

                    Refresh

                </button>

            </div>

            {/*==================================================
            FORM
            ==================================================*/}

            <div className="contact-grid">

                <div className="contact-field">

                    <label>

                        Email Address

                    </label>

                    <input

                        type="email"

                        name="email"

                        value={contact.email}

                        onChange={handleChange}

                        placeholder="your@email.com"

                    />

                </div>

                <div className="contact-field">

                    <label>

                        Phone Number

                    </label>

                    <input

                        type="text"

                        name="phone"

                        value={contact.phone}

                        onChange={handleChange}

                        placeholder="+91 XXXXX XXXXX"

                    />

                </div>

                <div className="contact-field">

                    <label>

                        Location

                    </label>

                    <input

                        type="text"

                        name="location"

                        value={contact.location}

                        onChange={handleChange}

                        placeholder="India"

                    />

                </div>

                <div className="contact-field">

                    <label>

                        Website

                    </label>

                    <input

                        type="text"

                        name="website"

                        value={contact.website}

                        onChange={handleChange}

                        placeholder="https://yourportfolio.com"

                    />

                </div>
                <div className="contact-field">

                    <label>

                        GitHub

                    </label>

                    <input

                        type="text"

                        name="github"

                        value={contact.github}

                        onChange={handleChange}

                        placeholder="https://github.com/username"

                    />

                </div>

                <div className="contact-field">

                    <label>

                        LinkedIn

                    </label>

                    <input

                        type="text"

                        name="linkedin"

                        value={contact.linkedin}

                        onChange={handleChange}

                        placeholder="https://linkedin.com/in/username"

                    />

                </div>

                <div className="contact-field">

                    <label>

                        Instagram

                    </label>

                    <input

                        type="text"

                        name="instagram"

                        value={contact.instagram}

                        onChange={handleChange}

                        placeholder="https://instagram.com/username"

                    />

                </div>

                <div className="contact-field contact-full">

                    <label>

                        Resume URL

                    </label>

                    <input

                        type="text"

                        name="resume"

                        value={contact.resume}

                        onChange={handleChange}

                        placeholder="https://..."

                    />

                </div>

            </div>

            {/*==================================================
            SAVE BUTTON
            ==================================================*/}

            <div className="contact-actions">

                <button

                    type="button"

                    className="contact-save"

                    onClick={async () => {

                        try {

                            showLoading(

                                "Saving Contact...",

                                "Please wait while updating your contact information."

                            );

                            await updateContact(contact);

                            closeLoading();

                            await showSuccess(

                                "Updated!",

                                "Contact information updated successfully."

                            );

                            loadContact();

                        }

                        catch (error) {

                            console.error(error);

                            closeLoading();

                            await showError(

                                "Update Failed",

                                "Unable to update contact information."

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