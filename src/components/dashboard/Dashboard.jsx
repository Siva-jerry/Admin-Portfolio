import "./Dashboard.css";

import StatsCard from "./StatsCard";
import QuickAction from "./QuickAction";
import StorageCard from "./StorageCard";
//import RecentActivity from "./RecentActivity";

function Dashboard() {

    return (

        <section className="dashboard">

            <div className="dashboard-top">

                <div>

                    <h1>

                        Dashboard

                    </h1>

                    <p>

                        Welcome back. Here's your portfolio overview.

                    </p>

                </div>

            </div>

            <div className="dashboard-stats">

                <StatsCard />

            </div>

            <div className="dashboard-grid">

                <QuickAction />

                <StorageCard />

            </div>

           {/* <RecentActivity />*/}

        </section>

    );

}

export default Dashboard;