import { useEffect, useState } from "react";

import "./About.css";

import AboutForm from "../../components/about/AboutForm";
import AboutPreview from "../../components/about/AboutPreview";

import { getAboutData } from "../../services/aboutAdminService";

export default function About() {

    const [about, setAbout] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadAbout = async () => {

        try {

            setLoading(true);

            const data = await getAboutData();

            setAbout(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadAbout();

    }, []);

    if (loading) {

        return (

            <div className="about-page-loading">

                Loading About...

            </div>

        );

    }

    return (

        <div className="about-page">

            <div className="about-page-left">

                <AboutForm
                    about={about}
                    setAbout={setAbout}
                    onSaved={loadAbout}
                />

            </div>

            <div className="about-page-right">

                <AboutPreview
                    about={about}
                />

            </div>

        </div>

    );

}