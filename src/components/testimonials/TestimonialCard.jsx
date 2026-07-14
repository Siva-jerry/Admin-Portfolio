import "./TestimonialCard.css";

import {

    FiMessageSquare,

    FiStar,

} from "react-icons/fi";

import {

    getSupabaseImageUrl,

} from "../../supabase/supabase";

export default function TestimonialCard({

    testimonial,

}) {

    const imageUrl = testimonial.image

        ? getSupabaseImageUrl(

            testimonial.image

        )

        : "";

    return (

        <article

            className="testimonial-preview-card"

        >

            {

                testimonial.featured && (

                    <div className="testimonial-featured">

                        <FiStar />

                        Featured

                    </div>

                )

            }

            {/*==================================================
            IMAGE
            ==================================================*/}

            <div className="testimonial-preview-image">

                {

                    testimonial.image ? (

                        <img

                            src={imageUrl}

                            alt={testimonial.name}

                        />

                    ) : (

                        <div className="testimonial-preview-placeholder">

                            <FiMessageSquare />

                        </div>

                    )

                }

            </div>
            {/*==================================================
            CONTENT
            ==================================================*/}

            <div className="testimonial-preview-content">

                <span className="testimonial-preview-company">

                    {testimonial.company || "Company"}

                </span>

                <h3 className="testimonial-preview-name">

                    {testimonial.name || "Client Name"}

                </h3>

                <p className="testimonial-preview-role">

                    {testimonial.role || "Role"}

                </p>

                <p className="testimonial-preview-message">

                    {

                        testimonial.message ||

                        "Client testimonial message will appear here."

                    }

                </p>

                {/*==================================================
                RATING
                ==================================================*/}

                <div className="testimonial-preview-rating">

                    {

                        Array.from(

                            { length: 5 },

                            (_, index) => (

                                <FiStar

                                    key={index}

                                    className={

                                        index < testimonial.rating

                                            ? "testimonial-star active"

                                            : "testimonial-star"

                                    }

                                />

                            )

                        )

                    }

                </div>

                {/*==================================================
                META
                ==================================================*/}

                <div className="testimonial-preview-meta">

                    <div className="testimonial-meta-row">

                        <span>

                            Order

                        </span>

                        <strong>

                            #{testimonial.order}

                        </strong>

                    </div>

                    <div className="testimonial-meta-row">

                        <span>

                            Status

                        </span>

                        <strong>

                            {

                                testimonial.featured

                                    ? "Featured"

                                    : "Normal"

                            }

                        </strong>

                    </div>

                </div>

            </div>
            </article>

    );

}