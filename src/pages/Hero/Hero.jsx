import "./Hero.css";

import { useEffect, useState } from "react";

import HeroForm from "./HeroForm";
import HeroPreview from "./HeroPreview";

import { getHeroData } from "../../services/heroAdminService";

function Hero() {

    const [hero, setHero] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadHero();

    }, []);

    async function loadHero() {

        try {

            setLoading(true);

            const data = await getHeroData();

            setHero(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    function updatePreview(field, value) {

        setHero((previous) => ({

            ...previous,

            [field]: value,

        }));

    }

    if (loading) {

        return (

            <section className="hero-page">

                <div className="hero-loading">

                    Loading Hero...

                </div>

            </section>

        );

    }

    return (

        <section className="hero-page">

            <div className="hero-page-header">

                <div>

                    <h1>

                        Hero Section

                    </h1>

                    <p>

                        Manage your portfolio homepage.

                    </p>

                </div>

            </div>

            <div className="hero-grid">

                <HeroForm

                    hero={hero}

                    setHero={setHero}

                    updatePreview={updatePreview}

                />

                <HeroPreview

                    hero={hero}

                />

            </div>

        </section>

    );

}

export default Hero;