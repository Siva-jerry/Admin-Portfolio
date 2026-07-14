import "./AboutPreview.css";

export default function AboutPreview({ about }) {

    if (!about) {

        return null;

    }

    return (

        <div className="about-preview">

            {/*========================
            HEADER
            ========================*/}

            <div className="about-preview-header">

                <span className="about-preview-badge">

                    Live Preview

                </span>

                <h2>

                    About Section

                </h2>

                <p>

                    This preview updates instantly while editing.

                </p>

            </div>

            {/*========================
            ABOUT CONTENT
            ========================*/}

            <div className="about-preview-content">

                <span className="about-preview-subtitle">

                    {

                        about.subtitle ||

                        "About Me"

                    }

                </span>

                <h1 className="about-preview-title">

                    {

                        about.title ||

                        "Your Name"

                    }

                </h1>

                <p className="about-preview-description">

                    {

                        about.description ||

                        "Your About description will appear here."

                    }

                </p>

            </div>

            {/*========================
            QUICK INFO
            ========================*/}

            <div className="about-preview-info">

                <div className="about-info-card">

                    <small>

                        Education

                    </small>

                    <h4>

                        {

                            about.education ||

                            "-"

                        }

                    </h4>

                </div>

                <div className="about-info-card">

                    <small>

                        Location

                    </small>

                    <h4>

                        {

                            about.location ||

                            "-"

                        }

                    </h4>

                </div>

                <div className="about-info-card">

                    <small>

                        Status

                    </small>

                    <h4>

                        {

                            about.status ||

                            "-"

                        }

                    </h4>

                </div>

                <div className="about-info-card">

                    <small>

                        Passion

                    </small>

                    <h4>

                        {

                            about.passion ||

                            "-"

                        }

                    </h4>

                </div>

            </div>
            {/*========================
            ABOUT CARDS
            ========================*/}

            <div className="about-preview-cards">

                {

                    about.aboutCards?.map((card, index) => (

                        <div

                            key={index}

                            className="about-preview-card"

                        >

                            <div className="about-card-icon">

                                {

                                    card.icon ||

                                    "⭐"

                                }

                            </div>

                            <h3>

                                {

                                    card.value ||

                                    "0"

                                }

                            </h3>

                            <p>

                                {

                                    card.title ||

                                    "Title"

                                }

                            </p>

                        </div>

                    ))

                }

            </div>

            {/*========================
            QUOTE
            ========================*/}

            <div className="about-preview-quote">

                <span>

                    Inspiration

                </span>

                <blockquote>

                    "

                    {

                        about.quote ||

                        "Your favourite quote will appear here."

                    }

                    "

                </blockquote>

            </div>

        </div>

    );

}