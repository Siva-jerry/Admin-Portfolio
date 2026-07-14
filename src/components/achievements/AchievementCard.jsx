import "./AchievementCard.css";

import {

    FiAward,

    FiStar,

} from "react-icons/fi";

import {

    getSupabaseImageUrl,

} from "../../supabase/supabase";

export default function AchievementCard({

    achievement,

}) {

    const imageUrl = achievement.image

        ? getSupabaseImageUrl(

            achievement.image

        )

        : "";

    return (

        <article

            className="achievement-preview-card"

        >

            {

                achievement.featured && (

                    <div className="achievement-featured">

                        <FiStar />

                        Featured

                    </div>

                )

            }

            {/*==================================================
            IMAGE
            ==================================================*/}

            <div className="achievement-preview-image">

                {

                    achievement.image ? (

                        <img

                            src={imageUrl}

                            alt={achievement.title}

                        />

                    ) : (

                        <div className="achievement-preview-placeholder">

                            <FiAward />

                        </div>

                    )

                }

            </div>
            {/*==================================================
            CONTENT
            ==================================================*/}

            <div className="achievement-preview-content">

                <span className="achievement-preview-organization">

                    {achievement.organization || "Organization"}

                </span>

                <h3 className="achievement-preview-title">

                    {achievement.title || "Achievement Title"}

                </h3>

                <p className="achievement-preview-description">

                    {

                        achievement.description ||

                        "Achievement description will appear here."

                    }

                </p>

                <div className="achievement-preview-meta">

                    <div className="achievement-meta-row">

                        <span>

                            Badge

                        </span>

                        <strong>

                            {achievement.badge || "-"}

                        </strong>

                    </div>

                    <div className="achievement-meta-row">

                        <span>

                            Date

                        </span>

                        <strong>

                            {achievement.date || "-"}

                        </strong>

                    </div>

                    <div className="achievement-meta-row">

                        <span>

                            Order

                        </span>

                        <strong>

                            #{achievement.order}

                        </strong>

                    </div>

                </div>

                <div className="achievement-preview-status">

                    <span>

                        Status

                    </span>

                    <span

                        className={

                            achievement.featured

                                ? "achievement-status featured"

                                : "achievement-status normal"

                        }

                    >

                        {

                            achievement.featured

                                ? "Featured"

                                : "Normal"

                        }

                    </span>

                </div>

            </div>
            </article>

    );

}