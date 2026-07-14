import "./Certificates.css";

import { useEffect, useState } from "react";

import CertificateForm from "../../components/certificates/CertificateForm";
import CertificatePreview from "../../components/certificates/CertificatePreview";

import {
    getCertificates,
} from "../../services/certificateAdminService";

export default function Certificates() {

    /*==================================================
    STATE
    ==================================================*/

    const [loading, setLoading] = useState(true);

    const [certificates, setCertificates] = useState([]);

    /*==================================================
    LOAD CERTIFICATES
    ==================================================*/

    useEffect(() => {

        loadCertificates();

    }, []);

    async function loadCertificates() {

        try {

            setLoading(true);

            const data = await getCertificates();

            console.log(
                "Certificates:",
                data
            );

            setCertificates(data);

        }

        catch (error) {

            console.error(
                "Load Certificates Error:",
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

            <div className="certificates-page-loading">

                Loading Certificates...

            </div>

        );

    }

    /*==================================================
    PAGE
    ==================================================*/

    return (

        <div className="certificates-page">

            <div className="certificates-page-grid">

                <CertificateForm

                    certificates={certificates}

                    setCertificates={setCertificates}

                    reloadCertificates={loadCertificates}

                />

                <CertificatePreview

                    certificates={certificates}

                />

            </div>

        </div>

    );

}