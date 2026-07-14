import "./RecentActivity.css";

import {

    useEffect,

    useState,

} from "react";

import {

    motion,

    AnimatePresence,

} from "framer-motion";

import {

    FiEdit3,

    FiPlusCircle,

    FiTrash2,

    FiUploadCloud,

    FiClock,

    FiRefreshCw,

} from "react-icons/fi";

import {

    getRecentActivities,

} from "../../services/activityService";

export default function RecentActivity(){

    const [

        activities,

        setActivities,

    ] = useState([]);

    const [

        loading,

        setLoading,

    ] = useState(true);

    /*==================================================
    LOAD
    ==================================================*/

    useEffect(() => {

        loadActivities();

    }, []);

    async function loadActivities(){

        try{

            setLoading(true);

            const data =

                await getRecentActivities();

            setActivities(data);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    /*==================================================
    ICON
    ==================================================*/

    function getIcon(type){

        switch(type){

            case "create":

                return <FiPlusCircle/>;

            case "delete":

                return <FiTrash2/>;

            case "upload":

                return <FiUploadCloud/>;

            case "update":

                return <FiEdit3/>;

            default:

                return <FiEdit3/>;

        }

    }
    /*==================================================
    TIME AGO
    ==================================================*/

    function getTimeAgo(timestamp){

        if(!timestamp?.toDate){

            return "Just now";

        }

        const now = new Date();

        const activityDate = timestamp.toDate();

        const seconds = Math.floor(

            (now - activityDate) / 1000

        );

        if(seconds < 60){

            return "Just now";

        }

        const minutes = Math.floor(seconds / 60);

        if(minutes < 60){

            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

        }

        const hours = Math.floor(minutes / 60);

        if(hours < 24){

            return `${hours} hour${hours > 1 ? "s" : ""} ago`;

        }

        const days = Math.floor(hours / 24);

        if(days === 1){

            return "Yesterday";

        }

        if(days < 7){

            return `${days} days ago`;

        }

        return activityDate.toLocaleDateString(

            "en-IN",

            {

                day:"numeric",

                month:"short",

                year:"numeric",

            }

        );

    }

    /*==================================================
    ICON COLOR
    ==================================================*/

    function getIconClass(type){

        switch(type){

            case "create":

                return "activity-create";

            case "update":

                return "activity-update";

            case "delete":

                return "activity-delete";

            case "upload":

                return "activity-upload";

            default:

                return "activity-update";

        }

    }

    /*==================================================
    UI
    ==================================================*/

    return(

        <motion.section

            className="recent-activity"

            initial={{

                opacity:0,

                y:20,

            }}

            animate={{

                opacity:1,

                y:0,

            }}

        >

            <div className="recent-header">

                <div>

                    <h2>

                        Recent Activity

                    </h2>

                    <p>

                        Track everything happening across your portfolio CMS.

                    </p>

                </div>

                <button

                    className="recent-refresh"

                    onClick={loadActivities}

                >

                    <FiRefreshCw />

                    Refresh

                </button>

            </div>
            {

                loading ? (

                    <div className="recent-loading">

                        <FiClock />

                        <h3>

                            Loading Activities...

                        </h3>

                        <p>

                            Fetching the latest portfolio updates.

                        </p>

                    </div>

                ) : activities.length === 0 ? (

                    <div className="recent-empty">

                        <FiClock />

                        <h3>

                            No Activity Yet

                        </h3>

                        <p>

                            Your recent create, update, upload and delete
                            activities will appear here automatically.

                        </p>

                    </div>

                ) : (

                    <div className="recent-list">

                        <AnimatePresence>

                            {

                                activities.map(

                                    (

                                        activity,

                                        index

                                    ) => (

                                        <motion.div

                                            key={activity.id}

                                            className="recent-item"

                                            initial={{

                                                opacity:0,

                                                y:20,

                                            }}

                                            animate={{

                                                opacity:1,

                                                y:0,

                                            }}

                                            exit={{

                                                opacity:0,

                                                y:-20,

                                            }}

                                            transition={{

                                                delay:index * .08,

                                            }}

                                        >

                                            <div

                                                className={`recent-icon ${getIconClass(

                                                    activity.type

                                                )}`}

                                            >

                                                {

                                                    getIcon(

                                                        activity.type

                                                    )

                                                }

                                            </div>

                                            <div className="recent-content">

                                                <div className="recent-top">

                                                    <h4>

                                                        {

                                                            activity.action

                                                        }

                                                    </h4>

                                                    <span className="recent-time">

                                                        {

                                                            getTimeAgo(

                                                                activity.createdAt

                                                            )

                                                        }

                                                    </span>

                                                </div>

                                                <p>

                                                    {

                                                        activity.description

                                                    }

                                                </p>

                                                <div className="recent-section">

                                                    📂

                                                    <span>

                                                        {

                                                            activity.section

                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                        </motion.div>

                                    )

                                )

                            }

                        </AnimatePresence>

                    </div>

                )

            }
            </motion.section>

    );

}