import "./Sidebar.css";

import {

    useEffect,

    useState,

} from "react";

import {

    NavLink,

} from "react-router-dom";

import {

    motion,

} from "framer-motion";

import {

    FiGrid,

    FiUser,

    FiLayers,

    FiFolder,

    FiBriefcase,

    FiAward,

    FiImage,

    FiStar,

    FiMessageSquare,

    FiMail,

    FiLayout,

} from "react-icons/fi";

import {

    doc,

    getDoc,

} from "firebase/firestore";

import {

    db,

} from "../../firebase/firebase";

import {

    useAuth,

} from "../../context/AuthContext";

const menus = [

    {

        title:"Dashboard",

        icon:<FiGrid />,

        path:"/",

    },

    {

        title:"Hero",

        icon:<FiLayout />,

        path:"/hero",

    },

    {

        title:"About",

        icon:<FiUser />,

        path:"/about",

    },

    {

        title:"Skills",

        icon:<FiLayers />,

        path:"/skills",

    },

    {

        title:"Projects",

        icon:<FiFolder />,

        path:"/projects",

    },

    {

        title:"Experience",

        icon:<FiBriefcase />,

        path:"/experience",

    },

    {

        title:"Certificates",

        icon:<FiAward />,

        path:"/certificates",

    },

    {

        title:"Gallery",

        icon:<FiImage />,

        path:"/gallery",

    },

    {

        title:"Achievements",

        icon:<FiStar />,

        path:"/achievements",

    },

    {

        title:"Testimonials",

        icon:<FiMessageSquare />,

        path:"/testimonials",

    },

    {

        title:"Contact",

        icon:<FiMail />,

        path:"/contact",

    },

    {

        title:"Footer",

        icon:<FiLayout />,

        path:"/footer",

    },

];

export default function Sidebar(){

    const {

        user,

    } = useAuth();

    const [admin,

        setAdmin] =

        useState(null);

    /*==================================================
    LOAD ADMIN
    ==================================================*/

    useEffect(() => {

        async function loadAdmin(){

            if(!user) return;

            const snapshot =

                await getDoc(

                    doc(

                        db,

                        "admins",

                        user.uid

                    )

                );

            if(snapshot.exists()){

                setAdmin(

                    snapshot.data()

                );

            }

        }

        loadAdmin();

    },[user]);
    return(

        <aside className="sidebar">

            {/*==========================================
            LOGO
            ==========================================*/}

            <motion.div

                className="sidebar-logo"

                initial={{

                    opacity:0,

                    y:-20,

                }}

                animate={{

                    opacity:1,

                    y:0,

                }}

                transition={{

                    duration:.5,

                }}

            >

                <div className="logo-circle">

                    {

                        admin?.name

                            ? admin.name

                                .charAt(0)

                                .toUpperCase()

                            : "A"

                    }

                </div>

                <div className="logo-content">

                    <h2>

                        Portfolio CMS

                    </h2>

                    <span>

                        Premium Admin

                    </span>

                </div>

            </motion.div>

            {/*==========================================
            MENU
            ==========================================*/}

            <nav className="sidebar-menu">

                {

                    menus.map(

                        (

                            menu,

                            index

                        ) => (

                            <motion.div

                                key={menu.title}

                                initial={{

                                    opacity:0,

                                    x:-25,

                                }}

                                animate={{

                                    opacity:1,

                                    x:0,

                                }}

                                transition={{

                                    delay:

                                        index * .05,

                                }}

                            >

                                <NavLink

                                    to={menu.path}

                                    className={({

                                        isActive,

                                    }) =>

                                        isActive

                                            ? "sidebar-link active"

                                            : "sidebar-link"

                                    }

                                >

                                    <span className="sidebar-icon">

                                        {

                                            menu.icon

                                        }

                                    </span>

                                    <span>

                                        {

                                            menu.title

                                        }

                                    </span>

                                </NavLink>

                            </motion.div>

                        )

                    )

                }

            </nav>
            {/*==========================================
            FOOTER
            ==========================================*/}

            <motion.div

                className="sidebar-footer"

                initial={{

                    opacity:0,

                    y:20,

                }}

                animate={{

                    opacity:1,

                    y:0,

                }}

                transition={{

                    delay:.7,

                }}

            >

                <div className="sidebar-admin-card">

                    <div className="sidebar-admin-avatar">

                        {

                            admin?.name

                                ? admin.name

                                    .charAt(0)

                                    .toUpperCase()

                                : "A"

                        }

                    </div>

                    <div className="sidebar-admin-info">

                        <h4>

                            {

                                admin?.name ||

                                "Administrator"

                            }

                        </h4>

                        <p>

                            {

                                admin?.email ||

                                user?.email

                            }

                        </p>

                    </div>

                </div>

                <div className="sidebar-status">

                    <span className="status-dot"></span>

                    <span>

                        Online

                    </span>

                </div>

                <div className="sidebar-version">

                    <span>

                        🚀 Portfolio CMS

                    </span>

                    <small>

                        Version 1.0.0

                    </small>

                </div>

            </motion.div>

        </aside>

    );

}