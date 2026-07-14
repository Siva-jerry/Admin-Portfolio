import "./StorageCard.css";

import {

    FiDatabase,

    FiFolder,

    FiClock,

    FiCheckCircle,

} from "react-icons/fi";

import { useDashboard } from "../../context/DashboardContext";

function StorageCard() {

    const {

        loading,

        dashboard,

    } = useDashboard();

    if (loading) {

        return (

            <section className="storage-card">

                <h2>

                    Portfolio Storage

                </h2>

                <p>

                    Loading...

                </p>

            </section>

        );

    }

    const lastUpdated = dashboard.lastUpdated

        ? new Date(

              dashboard.lastUpdated

          ).toLocaleString()

        : "N/A";

    return (

        <section className="storage-card">

            <div className="storage-header">

                <h2>

                    Portfolio Storage

                </h2>

                <FiDatabase />

            </div>

            <div className="storage-list">

                <div className="storage-item">

                    <span>

                        Firestore Collections

                    </span>

                    <strong>

                        {dashboard.collections}

                    </strong>

                </div>

                <div className="storage-item">

                    <span>

                        Total Documents

                    </span>

                    <strong>

                        {dashboard.documents}

                    </strong>

                </div>

                <div className="storage-item">

                    <span>

                        Database Status

                    </span>

                    <strong className="storage-success">

                        <FiCheckCircle />

                        Connected

                    </strong>

                </div>

                <div className="storage-item">

                    <span>

                        Last Sync

                    </span>

                    <strong>

                        <FiClock />

                        {lastUpdated}

                    </strong>

                </div>

                <div className="storage-item">

                    <span>

                        Image Storage

                    </span>

                    <strong>

                        <FiFolder />

                        Supabase

                    </strong>

                </div>

            </div>

        </section>

    );

}

export default StorageCard;