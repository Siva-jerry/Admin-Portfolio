import "./Testimonials.css";

import { useEffect, useState } from "react";

import TestimonialForm from "../../components/testimonials/TestimonialForm";
import TestimonialCard from "../../components/testimonials/TestimonialCard";

import {

    getTestimonials,

} from "../../services/testimonialAdminService";

export default function Testimonials() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [testimonials, setTestimonials] = useState([]);

    /*==================================================
    LOAD TESTIMONIALS
    ==================================================*/

    useEffect(() => {

        loadTestimonials();

    }, []);

    async function loadTestimonials() {

        try {

            setLoading(true);

            const data = await getTestimonials();

            setTestimonials(data);

        }

        catch (error) {

            console.error(

                "Load Testimonials Error:",

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

            <div className="testimonials-page-loading">

                Loading Testimonials...

            </div>

        );

    }

    /*==================================================
    PAGE
    ==================================================*/

    return (

        <div className="testimonials-page">

            <div className="testimonials-page-grid">

                <TestimonialForm

                    testimonials={testimonials}

                    setTestimonials={setTestimonials}

                    reloadTestimonials={loadTestimonials}

                />

                <div className="testimonials-preview-section">

                    {

                        testimonials.length === 0 ? (

                            <div className="testimonials-preview-empty">

                                No Testimonials Added

                            </div>

                        ) : (

                            testimonials.map((testimonial) => (

                                <TestimonialCard

                                    key={testimonial.id}

                                    testimonial={testimonial}

                                />

                            ))

                        )

                    }

                </div>

            </div>

        </div>

    );

}