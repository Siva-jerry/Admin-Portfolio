import "./Achievements.css";

import { useEffect, useState } from "react";

import AchievementForm from "../../components/achievements/AchievementForm";
import AchievementCard from "../../components/achievements/AchievementCard";

import {
    getAchievements,
} from "../../services/achievementAdminService";

export default function Achievements() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [achievements, setAchievements] = useState([]);

    /*==================================================
    LOAD ACHIEVEMENTS
    ==================================================*/

    useEffect(() => {

        loadAchievements();

    }, []);

    async function loadAchievements() {

        try {

            setLoading(true);

            const data = await getAchievements();

            setAchievements(data);

        }

        catch (error) {

            console.error(

                "Load Achievements Error:",

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

            <div className="achievements-page-loading">

                Loading Achievements...

            </div>

        );

    }

    /*==================================================
    PAGE
    ==================================================*/

    return (

        <div className="achievements-page">

            <div className="achievements-page-grid">

                <AchievementForm

                    achievements={achievements}

                    setAchievements={setAchievements}

                    reloadAchievements={loadAchievements}

                />

                <div className="achievements-preview-section">

                    {

                        achievements.length === 0 ? (

                            <div className="achievements-preview-empty">

                                No Achievements Added

                            </div>

                        ) : (

                            achievements.map((achievement) => (

                                <AchievementCard

                                    key={achievement.id}

                                    achievement={achievement}

                                />

                            ))

                        )

                    }

                </div>

            </div>

        </div>

    );

}