import "./CertificateForm.css";

import { useEffect, useState } from "react";

import {
    FiPlus,
    FiRefreshCw,
    FiUpload,
} from "react-icons/fi";
import { logActivity } from "../../services/activityService";

import {

    getCertificates,

    createCertificate,

    updateCertificate,

    deleteCertificate,

    replaceCertificateImage,

} from "../../services/certificateAdminService";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

    showConfirm,

    showDeleteConfirm,

} from "../../utils/alert";
export default function CertificateForm({

    certificates,

    setCertificates,

    reloadCertificates,

}) {

   const [loading, setLoading] = useState(false);

const [imageFiles, setImageFiles] = useState({});

    
/*==================================================
ADD NEW CERTIFICATE
==================================================*/

function handleAddCertificate() {

    setCertificates((prev) => [

        ...prev,

        {

            id: "new-" + Date.now(),

            title: "",

            organization: "",

            issueDate: "",

            credentialId: "",

            verifyLink: "",

            image: "",

            imagePath: "",

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

    certificateId,

    file

) {

    if (!file) return;

    setImageFiles((prev) => ({

        ...prev,

        [certificateId]: file,

    }));

}
/*==================================================
LOADING SCREEN
==================================================*/


return (

    <div className="certificates-form">

        {/*==================================================
        HEADER
        ==================================================*/}

        <div className="certificates-form-header">

            <div>

                <h2>

                    Certificates Management

                </h2>

                <p>

                    Create, edit and manage your professional certificates.

                </p>

            </div>

            <div className="certificates-actions">

                <button

                    type="button"

                    className="certificates-refresh"

                    onClick={reloadCertificates}

                >

                    <FiRefreshCw />

                    Refresh

                </button>

                <button

                    type="button"

                    className="certificates-add"

                    onClick={async () => {

                        const ok = await showConfirm(

                            "Add New Certificate?",

                            "A blank certificate will be created.",

                            "Add Certificate"

                        );

                        if (!ok) return;

                        handleAddCertificate();

                    }}

                >

                    <FiPlus />

                    Add Certificate

                </button>

            </div>

        </div>

        {/*==================================================
        CERTIFICATE LIST
        ==================================================*/}

        <div className="certificates-list">

            {

                certificates.map((certificate, index) => (

                    <div

                        key={certificate.id}

                        className="certificate-card"

                    >

                        {/*==================================================
                        IMAGE
                        ==================================================*/}

                        <div className="certificate-image-section">

                            <div className="certificate-image-preview">

                                {

                                    certificate.image ? (

                                        <img

                                            src={certificate.image}

                                            alt={certificate.title}

                                        />

                                    ) : (

                                        <div className="certificate-image-placeholder">

                                            No Image

                                        </div>

                                    )

                                }

                            </div>

                            <label className="certificate-upload-btn">

                                <FiUpload />

                                Upload Image

                                <input

                                    hidden

                                    type="file"

                                    accept="image/*"

                                    onChange={(e) =>

                                        handleImageSelect(

                                            certificate.id,

                                            e.target.files[0]

                                        )

                                    }

                                />

                            </label>

                            {

                                imageFiles[certificate.id] && (

                                    <small>

                                        {

                                            imageFiles[certificate.id]

                                                .name

                                        }

                                    </small>

                                )

                            }

                        </div>

                        {/*==================================================
                        DETAILS
                        ==================================================*/}

                        <div className="certificate-grid">

                            <div className="certificate-field">

                                <label>

                                    Certificate Title

                                </label>

                                <input

                                    value={certificate.title}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].title =

                                            e.target.value;

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field">

                                <label>

                                    Organization

                                </label>

                                <input

                                    value={certificate.organization}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].organization =

                                            e.target.value;

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field">

                                <label>

                                    Issue Date

                                </label>

                                <input

                                    value={certificate.issueDate}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].issueDate =

                                            e.target.value;

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field">

                                <label>

                                    Credential ID

                                </label>

                                <input

                                    value={certificate.credentialId}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].credentialId =

                                            e.target.value;

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field certificate-full">

                                <label>

                                    Verify Link

                                </label>

                                <input

                                    value={certificate.verifyLink}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].verifyLink =

                                            e.target.value;

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field">

                                <label>

                                    Display Order

                                </label>

                                <input

                                    type="number"

                                    value={certificate.order}

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].order =

                                            Number(e.target.value);

                                        setCertificates(updated);

                                    }}

                                />

                            </div>

                            <div className="certificate-field">

                                <label>

                                    Featured

                                </label>

                                <select

                                    value={

                                        certificate.featured

                                            ? "true"

                                            : "false"

                                    }

                                    onChange={(e) => {

                                        const updated = [...certificates];

                                        updated[index].featured =

                                            e.target.value === "true";

                                        setCertificates(updated);

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

                        <div className="certificate-buttons">

                            <button

                                type="button"

                                className="certificate-save"

                                onClick={async () => {

                                    try {

                                        showLoading(

                                            certificate.isNew

                                                ? "Creating Certificate..."

                                                : "Updating Certificate...",

                                            "Please wait while we save your certificate."

                                        );

                                        const updatedCertificate = {

                                            ...certificate,

                                        };

                                        /*--------------------------------
                                        IMAGE
                                        --------------------------------*/

                                        if (

                                            imageFiles[certificate.id]

                                        ) {

                                            const result =

                                                await replaceCertificateImage(

                                                    certificate.imagePath,

                                                    imageFiles[certificate.id]

                                                );

                                            updatedCertificate.image = result.path;

                                        }

                                        /*--------------------------------
                                        SAVE
                                        --------------------------------*/

                                        if (

                                            certificate.isNew

                                        ) {

                                            await createCertificate(

                                                updatedCertificate

                                            );

                                        }

                                        else {

                                            await updateCertificate(

                                                certificate.id,

                                                updatedCertificate

                                            );
                                            await logActivity({

    action: "Updated Certificate",

    section: "Certificates",

    description: certificate.title,

    type: "update",

});

                                        }

                                        closeLoading();

                                        await showSuccess(

                                            "Saved!",

                                            "Certificate saved successfully."

                                        );

                                        reloadCertificates();

                                    }

                                    catch (error) {

                                        console.error(error);

                                        closeLoading();

                                        await showError(

                                            "Save Failed",

                                            "Unable to save certificate."

                                        );

                                    }

                                }}

                            >

                                Save Certificate

                            </button>

                            <button

                                type="button"

                                className="certificate-delete"

                                onClick={async () => {

                                    if (

                                        certificate.isNew

                                    ) {

                                        setCertificates(

                                            certificates.filter(

                                                (_,

                                                    i) =>

                                                    i !== index

                                            )

                                        );

                                        return;

                                    }

                                    const ok =

                                        await showDeleteConfirm(

                                            "Delete Certificate?",

                                            "This action cannot be undone."

                                        );

                                    if (!ok) return;

                                    try {

                                        showLoading(

                                            "Deleting Certificate...",

                                            "Please wait..."

                                        );

                                        await deleteCertificate(

                                            certificate

                                        );

                                        closeLoading();

                                        await showSuccess(

                                            "Deleted!",

                                            "Certificate removed successfully."

                                        );

                                        reloadCertificates();

                                    }

                                    catch (error) {

                                        console.error(error);

                                        closeLoading();

                                        await showError(

                                            "Delete Failed",

                                            "Unable to delete certificate."

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