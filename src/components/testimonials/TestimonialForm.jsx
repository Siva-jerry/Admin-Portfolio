import "./TestimonialForm.css";

import { useState } from "react";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {
    getSupabaseImageUrl,
} from "../../supabase/supabase";

import {

    createTestimonial,

    updateTestimonial,

    deleteTestimonial,

    replaceTestimonialImage,

} from "../../services/testimonialAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function TestimonialForm({

    testimonials,

    setTestimonials,

    reloadTestimonials,

}) {

    const [imageFiles, setImageFiles] = useState({});

    const [loading, setLoading] = useState(false);
    /*==================================================
    ADD NEW TESTIMONIAL
    ==================================================*/

    function handleAddTestimonial() {

        setTestimonials((prev) => [

            ...prev,

            {

                id: "new-" + Date.now(),

                name: "",

                role: "",

                company: "",

                message: "",

                rating: 5,

                featured: false,

                order: prev.length + 1,

                image: "",

                isNew: true,

            },

        ]);

    }

    /*==================================================
    IMAGE SELECT
    ==================================================*/

    function handleImageSelect(

        testimonialId,

        file

    ) {

        if (!file) return;

        setImageFiles((prev) => ({

            ...prev,

            [testimonialId]: file,

        }));

    }

    return (

        <div className="testimonial-form">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="testimonial-form-header">

                <div>

                    <h2>

                        Testimonials Management

                    </h2>

                    <p>

                        Create, edit and manage client testimonials.

                    </p>

                </div>

                <div className="testimonial-actions">

                    <button

                        type="button"

                        className="testimonial-refresh"

                        onClick={reloadTestimonials}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="testimonial-add"

                        onClick={async () => {

                            const ok = await showConfirm(

                                "Add Testimonial?",

                                "A new testimonial will be created.",

                                "Add"

                            );

                            if (!ok) return;

                            handleAddTestimonial();

                        }}

                    >

                        <FiPlus />

                        Add Testimonial

                    </button>

                </div>

            </div>

            {/*==================================================
            LIST
            ==================================================*/}

            <div className="testimonial-list">

                {

                    testimonials.map((testimonial, index) => (

                        <div

                            key={testimonial.id}

                            className="testimonial-card"

                        >
                            {/*==================================================
                            IMAGE
                            ==================================================*/}

                            <div className="testimonial-image-section">

                                <div className="testimonial-image-preview">

                                    {

                                        testimonial.image ? (

                                           <img
    src={getSupabaseImageUrl(testimonial.image)}
    alt={testimonial.name}
/>

                                        ) : (

                                            <div className="testimonial-image-placeholder">

                                                No Image

                                            </div>

                                        )

                                    }

                                </div>

                                <label className="testimonial-upload-btn">

                                    <FiUpload />

                                    Upload Image

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={(e) =>

                                            handleImageSelect(

                                                testimonial.id,

                                                e.target.files[0]

                                            )

                                        }

                                    />

                                </label>

                                {

                                    imageFiles[testimonial.id] && (

                                        <small>

                                            {

                                                imageFiles[testimonial.id]

                                                    .name

                                            }

                                        </small>

                                    )

                                }

                            </div>

                            {/*==================================================
                            DETAILS
                            ==================================================*/}

                            <div className="testimonial-grid">

                                <div className="testimonial-field">

                                    <label>

                                        Client Name

                                    </label>

                                    <input

                                        value={testimonial.name}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].name =

                                                e.target.value;

                                            setTestimonials(updated);

                                        }}

                                    />

                                </div>

                                <div className="testimonial-field">

                                    <label>

                                        Role

                                    </label>

                                    <input

                                        value={testimonial.role}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].role =

                                                e.target.value;

                                            setTestimonials(updated);

                                        }}

                                    />

                                </div>

                                <div className="testimonial-field">

                                    <label>

                                        Company

                                    </label>

                                    <input

                                        value={testimonial.company}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].company =

                                                e.target.value;

                                            setTestimonials(updated);

                                        }}

                                    />

                                </div>

                                <div className="testimonial-field">

                                    <label>

                                        Rating

                                    </label>

                                    <select

                                        value={testimonial.rating}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].rating =

                                                Number(e.target.value);

                                            setTestimonials(updated);

                                        }}

                                    >

                                        <option value={5}>★★★★★ (5)</option>

                                        <option value={4}>★★★★☆ (4)</option>

                                        <option value={3}>★★★☆☆ (3)</option>

                                        <option value={2}>★★☆☆☆ (2)</option>

                                        <option value={1}>★☆☆☆☆ (1)</option>

                                    </select>

                                </div>

                                <div className="testimonial-field testimonial-full">

                                    <label>

                                        Testimonial Message

                                    </label>

                                    <textarea

                                        rows={5}

                                        value={testimonial.message}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].message =

                                                e.target.value;

                                            setTestimonials(updated);

                                        }}

                                    />

                                </div>

                                <div className="testimonial-field">

                                    <label>

                                        Display Order

                                    </label>

                                    <input

                                        type="number"

                                        value={testimonial.order}

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].order =

                                                Number(e.target.value);

                                            setTestimonials(updated);

                                        }}

                                    />

                                </div>

                                <div className="testimonial-field">

                                    <label>

                                        Featured

                                    </label>

                                    <select

                                        value={

                                            testimonial.featured

                                                ? "true"

                                                : "false"

                                        }

                                        onChange={(e) => {

                                            const updated = [...testimonials];

                                            updated[index].featured =

                                                e.target.value === "true";

                                            setTestimonials(updated);

                                        }}

                                    >

                                        <option value="true">

                                            Yes

                                        </option>

                                        <option value="false">

                                            No

                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/*==================================================
                            ACTION BUTTONS
                            ==================================================*/}

                            <div className="testimonial-buttons">
                                <button

                                    type="button"

                                    className="testimonial-save"

                                    onClick={async () => {

                                        try {

                                            showLoading(

                                                testimonial.isNew

                                                    ? "Creating Testimonial..."

                                                    : "Updating Testimonial...",

                                                "Please wait while we save your testimonial."

                                            );

                                            const updatedTestimonial = {

                                                ...testimonial,

                                            };

                                            /*--------------------------------
                                            IMAGE
                                            --------------------------------*/

                                            if (

                                                imageFiles[testimonial.id]

                                            ) {

                                                const result =

                                                    await replaceTestimonialImage(

                                                        testimonial.image,

                                                        imageFiles[testimonial.id]

                                                    );

                                                updatedTestimonial.image =

                                                    result.path;

                                            }

                                            /*--------------------------------
                                            SAVE
                                            --------------------------------*/

                                            if (

                                                testimonial.isNew

                                            ) {

                                                await createTestimonial(

                                                    updatedTestimonial

                                                );

                                            }

                                            else {

                                                await updateTestimonial(

                                                    testimonial.id,

                                                    updatedTestimonial

                                                );
                                                await logActivity({

    action: "Deleted Testimonial",

    section: "Testimonials",

    description: testimonial.name,

    type: "delete",

});

                                            }

                                            closeLoading();

                                            await showSuccess(

                                                "Saved!",

                                                "Testimonial saved successfully."

                                            );

                                            reloadTestimonials();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Save Failed",

                                                "Unable to save testimonial."

                                            );

                                        }

                                    }}

                                >

                                    Save Testimonial

                                </button>

                                <button

                                    type="button"

                                    className="testimonial-delete"

                                    onClick={async () => {

                                        if (

                                            testimonial.isNew

                                        ) {

                                            setTestimonials(

                                                testimonials.filter(

                                                    (_,

                                                        i) =>

                                                        i !== index

                                                )

                                            );

                                            return;

                                        }

                                        const ok =

                                            await showDeleteConfirm(

                                                "Delete Testimonial?",

                                                "This action cannot be undone."

                                            );

                                        if (!ok) return;

                                        try {

                                            showLoading(

                                                "Deleting Testimonial...",

                                                "Please wait..."

                                            );

                                            await deleteTestimonial(

                                                testimonial

                                            );

                                            closeLoading();

                                            await showSuccess(

                                                "Deleted!",

                                                "Testimonial removed successfully."

                                            );

                                            reloadTestimonials();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Delete Failed",

                                                "Unable to delete testimonial."

                                            );

                                        }

                                    }}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}