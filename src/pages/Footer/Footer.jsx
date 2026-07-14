import "./Footer.css";

import FooterForm from "../../components/footer/FooterForm";

export default function Footer() {

    return (

        <div className="footer-page">

            <div className="footer-page-header">

                <div>

                    <span className="footer-page-tag">

                        FOOTER CMS

                    </span>

                    <h1>

                        Footer Management

                    </h1>

                    <p>

                        Manage your footer content, social media links, technologies, resume link and copyright information from one place.

                    </p>

                </div>

            </div>

            <div className="footer-page-content">

                <FooterForm />

            </div>

        </div>

    );

}