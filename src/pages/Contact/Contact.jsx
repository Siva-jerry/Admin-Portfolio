import "./Contact.css";

import ContactForm from "../../components/contact/ContactForm";

export default function Contact() {

    return (

        <div className="contact-page">

            <div className="contact-page-header">

                <div>

                    <span className="contact-page-tag">

                        CONTACT CMS

                    </span>

                    <h1>

                        Contact Management

                    </h1>

                    <p>

                        Manage your portfolio contact information, social media links, website, and resume URL from one place.

                    </p>

                </div>

            </div>

            <div className="contact-page-content">

                <ContactForm />

            </div>

        </div>

    );

}