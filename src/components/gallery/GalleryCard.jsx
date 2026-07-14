import "./GalleryCard.css";

import {
    FiImage,
    FiStar,
} from "react-icons/fi";

import {
    getSupabaseImageUrl,
} from "../../supabase/supabase";

export default function GalleryCard({

    item,

}) {

    const imageUrl = item.image

        ? getSupabaseImageUrl(item.image)

        : "";

    return (

        <article

            className="gallery-preview-card"

        >

            {

                item.featured && (

                    <div className="gallery-featured">

                        <FiStar />

                        Featured

                    </div>

                )

            }

            {/*==================================================
            IMAGE
            ==================================================*/}

            <div className="gallery-preview-image">

                {

                    item.image ? (

                        <img

                            src={imageUrl}

                            alt={item.title}

                        />

                    ) : (

                        <div className="gallery-preview-placeholder">

                            <FiImage />

                        </div>

                    )

                }

            </div>
            {/*==================================================
            CONTENT
            ==================================================*/}

            <div className="gallery-preview-content">

                <span className="gallery-preview-category">

                    {item.category || "Uncategorized"}

                </span>

                <h3 className="gallery-preview-title">

                    {item.title || "Untitled Image"}

                </h3>

                <div className="gallery-preview-meta">

                    <span>

                        Display Order

                    </span>

                    <strong>

                        #{item.order}

                    </strong>

                </div>

                <div className="gallery-preview-status">

                    <span>

                        Status

                    </span>

                    <span

                        className={

                            item.featured

                                ? "gallery-status featured"

                                : "gallery-status normal"

                        }

                    >

                        {

                            item.featured

                                ? "Featured"

                                : "Normal"

                        }

                    </span>

                </div>

            </div>
            </article>

    );

}