import "./HeroPreview.css";

function HeroPreview({ hero }) {

    if (!hero) {

        return null;

    }

    return (

        <div className="hero-preview">

            {/*========================
            HEADER
            ========================*/}

            <div className="hero-preview-header">

                <span className="preview-badge">

                    Live Preview

                </span>

                <h2>

                    Portfolio Hero

                </h2>

                <p>

                    Changes appear instantly while editing.

                </p>

            </div>

            {/*========================
            HERO IMAGE
            ========================*/}

            <div className="preview-image-wrapper">

                {

                    hero.imageUrl ? (

                        <img

                            src={hero.imageUrl}

                            alt="Hero"

                            className="preview-image"

                        />

                    ) : (

                        <div className="preview-image-placeholder">

                            No Image

                        </div>

                    )

                }

            </div>

            {/*========================
            HERO CONTENT
            ========================*/}

            <div className="preview-content">

                <span className="preview-greeting">

                    {

                        hero.greeting ||

                        "Hello I'm"

                    }

                </span>

                <h1 className="preview-name">

                    <span>

                        {

                            hero.firstName ||

                            "Your"

                        }

                    </span>

                    {" "}

                    <span className="preview-lastname">

                        {

                            hero.lastName ||

                            "Name"

                        }

                    </span>

                </h1>

                <p className="preview-description">

                    {

                        hero.description ||

                        "Your portfolio description will appear here."

                    }

                </p>

            </div>
            {/*========================
PROFESSIONS
=========================*/}

<div className="preview-professions">

    {

        hero.professions?.map((profession, index) => (

            <span

                key={index}

                className="preview-chip"

            >

                {profession}

            </span>

        ))

    }

</div>

{/*========================
BUTTONS
=========================*/}

<div className="preview-buttons">

    <button className="preview-primary-btn">

        {

            hero.primaryButtonText ||

            "Hire Me"

        }

    </button>

    <button className="preview-secondary-btn">

        {

            hero.secondaryButtonText ||

            "Download Resume"

        }

    </button>

</div>

{/*========================
SOCIAL LINKS
=========================*/}

<div className="preview-socials">

    {

        hero.socials?.map((social, index) => (

            <div

                key={index}

                className="preview-social"

            >

                <span>

                    {social.icon}

                </span>

                <small>

                    {social.label}

                </small>

            </div>

        ))

    }

</div>

{/*========================
STATS
=========================*/}

<div className="preview-stats">

    {

        hero.stats?.map((stat, index) => (

            <div

                key={index}

                className="preview-stat-card"

            >

                <h3>

                    {stat.value}

                </h3>

                <span>

                    {stat.title}

                </span>

            </div>

        ))

    }

</div>

        </div>

    );

}

export default HeroPreview;