import "./CertificatePreview.css";

import {

    FiAward,

    FiCalendar,

    FiExternalLink,

    FiStar,

} from "react-icons/fi";
import { getSupabaseImageUrl } from "../../supabase/supabase";

export default function CertificatePreview({

    certificates,

}) {

    if (

        !certificates ||

        certificates.length === 0

    ) {

        return (

            <div className="certificate-preview">

                <div className="certificate-preview-empty">

                    No Certificates Added

                </div>

            </div>

        );

    }

    return (

        <div className="certificate-preview">

            {/*==================================================
            HEADER
            ==================================================*/}

            <div className="certificate-preview-header">

                <div>

                    <span>

                        MY CERTIFICATES

                    </span>

                    <h2>

                        Certificate Preview

                    </h2>

                    <p>

                        Live preview of your portfolio certificates.

                    </p>

                </div>

            </div>

            {/*==================================================
            LIST
            ==================================================*/}

            <div className="certificate-preview-list">

                {

                   certificates.map((certificate) => {

    const imageUrl =
        certificate.image?.startsWith("http")
            ? certificate.image
            : getSupabaseImageUrl(certificate.image);

    return (

                        <div

                            key={certificate.id}

                            className="certificate-preview-card"

                        >
                            {

                                certificate.featured && (

                                    <div className="certificate-featured">

                                        <FiStar />

                                        Featured

                                    </div>

                                )

                            }

                            <div className="certificate-preview-image">

                                {

                                    certificate.image ? (

                                        <img

    src={imageUrl}

    alt={certificate.title}

/>

                                    ) : (

                                        <div className="certificate-image-placeholder">

                                            <FiAward />

                                        </div>

                                    )

                                }

                            </div>

                            <div className="certificate-preview-content">

                                <span className="certificate-organization">

                                    {certificate.organization}

                                </span>

                                <h3 className="certificate-title">

                                    {certificate.title}

                                </h3>

                                <div className="certificate-meta">

                                    <span>

                                        <FiCalendar />

                                        {certificate.issueDate}

                                    </span>

                                </div>

                                <div className="certificate-id">

                                    <strong>

                                        Credential ID:

                                    </strong>

                                    <span>

                                        {certificate.credentialId}

                                    </span>

                                </div>

                                {

                                    certificate.verifyLink && (

                                        <a

                                            href={certificate.verifyLink}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="certificate-link"

                                        >

                                            <FiExternalLink />

                                            Verify Certificate

                                        </a>

                                    )

                                }

                            </div>
                            </div>

                    );
})

                }
            

            </div>

        </div>

    );

}