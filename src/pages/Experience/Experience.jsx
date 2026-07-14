import "./Experience.css";

import { useEffect, useState } from "react";

import ExperienceForm from "../../components/experience/ExperienceForm";
import ExperiencePreview from "../../components/experience/ExperiencePreview";

import {

    getExperience,

} from "../../services/experienceAdminService";

export default function Experience() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [experience, setExperience] = useState([]);

    /*==================================================
    LOAD EXPERIENCE
    ==================================================*/

    useEffect(() => {

        loadExperience();

    }, []);

    async function loadExperience() {

        try {

            setLoading(true);

            const data = await getExperience();

            setExperience(data);

        }

        catch (error) {

            console.error(

                "Load Experience Error:",

                error

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div className="experience-page-loading">

                Loading Experience...

            </div>

        );

    }

    /*==================================================
    PAGE
    ==================================================*/

    return (

        <div className="experience-page">

            <div className="experience-page-grid">

                <ExperienceForm />

                <ExperiencePreview

                    experience={experience}

                />

            </div>

        </div>

    );

}