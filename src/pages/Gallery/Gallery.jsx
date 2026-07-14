import "./Gallery.css";

import { useEffect, useState } from "react";

import GalleryForm from "../../components/gallery/GalleryForm";
import GalleryCard from "../../components/gallery/GalleryCard";

import {
    getGalleryItems,
} from "../../services/galleryAdminService";

export default function Gallery() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [galleryItems, setGalleryItems] = useState([]);

    /*==================================================
    LOAD GALLERY
    ==================================================*/

    useEffect(() => {

        loadGallery();

    }, []);

    async function loadGallery() {

        try {

            setLoading(true);

            const data = await getGalleryItems();

            setGalleryItems(data);

        }

        catch (error) {

            console.error(

                "Load Gallery Error:",

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

            <div className="gallery-page-loading">

                Loading Gallery...

            </div>

        );

    }

    /*==================================================
    PAGE
    ==================================================*/

    return (

        <div className="gallery-page">

            <div className="gallery-page-grid">

                <GalleryForm

                    galleryItems={galleryItems}

                    setGalleryItems={setGalleryItems}

                    reloadGallery={loadGallery}

                />

                <div className="gallery-preview-section">

                    {

                        galleryItems.length === 0 ? (

                            <div className="gallery-preview-empty">

                                No Gallery Images Added

                            </div>

                        ) : (

                            galleryItems.map((item) => (

                                <GalleryCard

                                    key={item.id}

                                    item={item}

                                />

                            ))

                        )

                    }

                </div>

            </div>

        </div>

    );

}