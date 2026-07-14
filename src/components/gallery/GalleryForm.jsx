import "./GalleryForm.css";

import { useEffect, useState } from "react";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {

    getGalleryItems,

    createGalleryItem,

    updateGalleryItem,

    deleteGalleryItem,

    replaceGalleryImage,

} from "../../services/galleryAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";

export default function GalleryForm() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [galleryItems, setGalleryItems] = useState([]);

    const [imageFiles, setImageFiles] = useState({});

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

            console.error(error);

            await showError(

                "Load Failed",

                "Unable to load gallery items."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*==================================================
    ADD GALLERY ITEM
    ==================================================*/

    function handleAddGallery() {

        setGalleryItems((prev) => [

            ...prev,

            {

                id: "new-" + Date.now(),

                title: "",

                category: "",

                image: "",

                featured: false,

                order: prev.length + 1,

                isNew: true,

            },

        ]);

    }

    /*==================================================
    IMAGE SELECT
    ==================================================*/

    function handleImageSelect(

        itemId,

        file

    ) {

        if (!file) return;

        setImageFiles((prev) => ({

            ...prev,

            [itemId]: file,

        }));

    }

    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div className="gallery-loading">

                Loading Gallery...

            </div>

        );

    }

    return (

        <div className="gallery-form">
            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="gallery-form-header">

                <div>

                    <h2>

                        Gallery Management

                    </h2>

                    <p>

                        Upload, edit and manage your portfolio gallery images.

                    </p>

                </div>

                <div className="gallery-actions">

                    <button

                        type="button"

                        className="gallery-refresh"

                        onClick={loadGallery}

                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                    <button

                        type="button"

                        className="gallery-add"

                        onClick={async () => {

                            const ok = await showConfirm(

                                "Add New Gallery Image?",

                                "A blank gallery card will be created.",

                                "Add Image"

                            );

                            if (!ok) return;

                            handleAddGallery();

                        }}

                    >

                        <FiPlus />

                        Add Image

                    </button>

                </div>

            </div>

            {/*==================================================
            GALLERY LIST
            ==================================================*/}

            <div className="gallery-list">

                {

                    galleryItems.map((item, index) => (

                        <div

                            key={item.id}

                            className="gallery-card"

                        >

                            {/*==================================================
                            IMAGE
                            ==================================================*/}

                            <div className="gallery-image-section">

                                <div className="gallery-image-preview">

                                    {

                                        item.image ? (

                                            <img

                                                src={item.image}

                                                alt={item.title}

                                            />

                                        ) : (

                                            <div className="gallery-image-placeholder">

                                                No Image

                                            </div>

                                        )

                                    }

                                </div>

                                <label className="gallery-upload-btn">

                                    <FiUpload />

                                    Upload Image

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={(e) =>

                                            handleImageSelect(

                                                item.id,

                                                e.target.files[0]

                                            )

                                        }

                                    />

                                </label>

                                {

                                    imageFiles[item.id] && (

                                        <small>

                                            {

                                                imageFiles[item.id].name

                                            }

                                        </small>

                                    )

                                }

                            </div>

                            {/*==================================================
                            DETAILS
                            ==================================================*/}

                            <div className="gallery-grid">
                                <div className="gallery-field">

                                    <label>

                                        Image Title

                                    </label>

                                    <input

                                        value={item.title}

                                        onChange={(e) => {

                                            const updated = [...galleryItems];

                                            updated[index].title =

                                                e.target.value;

                                            setGalleryItems(updated);

                                        }}

                                    />

                                </div>

                                <div className="gallery-field">

                                    <label>

                                        Category

                                    </label>

                                    <input

                                        placeholder="UI Design / Web / Mobile..."

                                        value={item.category}

                                        onChange={(e) => {

                                            const updated = [...galleryItems];

                                            updated[index].category =

                                                e.target.value;

                                            setGalleryItems(updated);

                                        }}

                                    />

                                </div>

                                <div className="gallery-field">

                                    <label>

                                        Display Order

                                    </label>

                                    <input

                                        type="number"

                                        value={item.order}

                                        onChange={(e) => {

                                            const updated = [...galleryItems];

                                            updated[index].order =

                                                Number(e.target.value);

                                            setGalleryItems(updated);

                                        }}

                                    />

                                </div>

                                <div className="gallery-field">

                                    <label>

                                        Featured

                                    </label>

                                    <select

                                        value={

                                            item.featured

                                                ? "true"

                                                : "false"

                                        }

                                        onChange={(e) => {

                                            const updated = [...galleryItems];

                                            updated[index].featured =

                                                e.target.value === "true";

                                            setGalleryItems(updated);

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

                            <div className="gallery-buttons">
                                <button

                                    type="button"

                                    className="gallery-save"

                                    onClick={async () => {

                                        try {

                                            showLoading(

                                                item.isNew

                                                    ? "Creating Gallery Image..."

                                                    : "Updating Gallery Image...",

                                                "Please wait while we save your gallery image."

                                            );

                                            const updatedItem = {

                                                ...item,

                                            };

                                            /*--------------------------------
                                            IMAGE
                                            --------------------------------*/

                                            if (

                                                imageFiles[item.id]

                                            ) {

                                                const result =

                                                    await replaceGalleryImage(

                                                        item.image,

                                                        imageFiles[item.id]

                                                    );

                                                updatedItem.image =

                                                    result.path;

                                            }

                                            /*--------------------------------
                                            SAVE
                                            --------------------------------*/

                                            if (

                                                item.isNew

                                            ) {

                                                await createGalleryItem(

                                                    updatedItem

                                                );

                                            }

                                            else {

                                                await updateGalleryItem(

                                                    item.id,

                                                    updatedItem

                                                );
                                                await logActivity({

    action: "Deleted Image",

    section: "Gallery",

    description: image.title,

    type: "delete",

});

                                            }

                                            closeLoading();

                                            await showSuccess(

                                                "Saved!",

                                                "Gallery image saved successfully."

                                            );

                                            loadGallery();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Save Failed",

                                                "Unable to save gallery image."

                                            );

                                        }

                                    }}

                                >

                                    Save Image

                                </button>

                                <button

                                    type="button"

                                    className="gallery-delete"

                                    onClick={async () => {

                                        if (

                                            item.isNew

                                        ) {

                                            setGalleryItems(

                                                galleryItems.filter(

                                                    (_,

                                                        i) =>

                                                        i !== index

                                                )

                                            );

                                            return;

                                        }

                                        const ok =

                                            await showDeleteConfirm(

                                                "Delete Gallery Image?",

                                                "This action cannot be undone."

                                            );

                                        if (!ok) return;

                                        try {

                                            showLoading(

                                                "Deleting Gallery Image...",

                                                "Please wait..."

                                            );

                                            await deleteGalleryItem(

                                                item

                                            );

                                            closeLoading();

                                            await showSuccess(

                                                "Deleted!",

                                                "Gallery image removed successfully."

                                            );

                                            loadGallery();

                                        }

                                        catch (error) {

                                            console.error(error);

                                            closeLoading();

                                            await showError(

                                                "Delete Failed",

                                                "Unable to delete gallery image."

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