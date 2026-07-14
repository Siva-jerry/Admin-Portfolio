import "./Navbar.css";

import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    FiSearch,

    FiBell,

    FiUser,

    FiChevronDown,

    FiLogOut,

    FiKey,

} from "react-icons/fi";

import {

    motion,

    AnimatePresence,

} from "framer-motion";

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

import {

    showConfirm,

} from "../../utils/alert";

import ChangePasswordModal

    from "../auth/ChangePasswordModal";

export default function Navbar() {

    const {

        user,

        logout,

    } = useAuth();

    const [admin,

        setAdmin] =

        useState(null);

    const [time,

        setTime] =

        useState(new Date());

    const [dropdown,

        setDropdown] =

        useState(false);

    const [showPasswordModal,

        setShowPasswordModal] =

        useState(false);

    const dropdownRef =

        useRef(null);

    /*==================================================
    LOAD ADMIN
    ==================================================*/

    useEffect(() => {

        async function loadAdmin() {

            if (!user) return;

            const snapshot =

                await getDoc(

                    doc(

                        db,

                        "admins",

                        user.uid

                    )

                );

            if (

                snapshot.exists()

            ) {

                setAdmin(

                    snapshot.data()

                );

            }

        }

        loadAdmin();

    }, [

        user,

    ]);

    /*==================================================
    LIVE CLOCK
    ==================================================*/

    useEffect(() => {

        const timer =

            setInterval(

                () =>

                    setTime(

                        new Date()

                    ),

                1000

            );

        return () =>

            clearInterval(

                timer

            );

    }, []);

    /*==================================================
    CLOSE DROPDOWN
    ==================================================*/

    useEffect(() => {

        function handleClick(event) {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(

                    event.target

                )

            ) {

                setDropdown(false);

            }

        }

        window.addEventListener(

            "click",

            handleClick

        );

        return () =>

            window.removeEventListener(

                "click",

                handleClick

            );

    }, []);
    /*==================================================
    GREETING
    ==================================================*/

    const hour = time.getHours();

    let greeting = "Good Evening";

    let emoji = "🌆";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

        emoji = "🌅";

    }

    else if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

        emoji = "☀️";

    }

    else if (hour >= 17 && hour < 21) {

        greeting = "Good Evening";

        emoji = "🌇";

    }

    else {

        greeting = "Good Night";

        emoji = "🌙";

    }

    const currentDate =

        time.toLocaleDateString(

            "en-IN",

            {

                weekday: "long",

                day: "numeric",

                month: "long",

                year: "numeric",

            }

        );

    const currentTime =

        time.toLocaleTimeString(

            "en-IN",

            {

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

            }

        );

    /*==================================================
    UI
    ==================================================*/

    return (

        <>

            <header className="admin-navbar">

                {/*==========================================
                LEFT
                ==========================================*/}

                <motion.div

                    className="navbar-left"

                    initial={{

                        opacity:0,

                        x:-30,

                    }}

                    animate={{

                        opacity:1,

                        x:0,

                    }}

                >

                    <h2>

                        {emoji} {greeting},

                        {" "}

                        {

                            admin?.name ||

                            "Admin"

                        }

                        👋

                    </h2>

                    <p>

                        {currentDate}

                        {" • "}

                        {currentTime}

                    </p>

                </motion.div>

                {/*==========================================
                RIGHT
                ==========================================*/}

                <motion.div

                    className="navbar-right"

                    initial={{

                        opacity:0,

                        x:30,

                    }}

                    animate={{

                        opacity:1,

                        x:0,

                    }}

                >

                    {/*==========================================
                    SEARCH
                    ==========================================*/}

                    <div className="navbar-search">

                        <FiSearch />

                        <input

                            type="text"

                            placeholder="Search modules..."

                        />

                    </div>

                    {/*==========================================
                    NOTIFICATION
                    ==========================================*/}

                    <button

                        className="navbar-icon"

                        type="button"

                    >

                        <motion.div

                            animate={{

                                rotate:[

                                    0,

                                    12,

                                    -12,

                                    0,

                                ],

                            }}

                            transition={{

                                repeat:Infinity,

                                duration:3,

                            }}

                        >

                            <FiBell />

                        </motion.div>

                    </button>
                    {/*==========================================
                    PROFILE
                    ==========================================*/}

                    <div

                        className="navbar-profile"

                        ref={dropdownRef}

                    >

                        <button

                            type="button"

                            className="profile-button"

                            onClick={() =>

                                setDropdown(

                                    !dropdown

                                )

                            }

                        >

                            <div className="profile-avatar">

    {

        admin?.name

            ? admin.name.charAt(0).toUpperCase()

            : "A"

    }

</div>

                            <div className="profile-details">

                                <h4>

                                    {

                                        admin?.name ||

                                        "Admin"

                                    }

                                </h4>

                                <span>

                                    {

                                        admin?.role ||

                                        "Administrator"

                                    }

                                </span>

                            </div>

                            <FiChevronDown

                                className={

                                    dropdown

                                        ? "rotate"

                                        : ""

                                }

                            />

                        </button>

                        <AnimatePresence>

                            {

                                dropdown && (

                                    <motion.div

                                        className="profile-dropdown"

                                        initial={{

                                            opacity:0,

                                            y:15,

                                            scale:.95,

                                        }}

                                        animate={{

                                            opacity:1,

                                            y:0,

                                            scale:1,

                                        }}

                                        exit={{

                                            opacity:0,

                                            y:15,

                                            scale:.95,

                                        }}

                                        transition={{

                                            duration:.25,

                                        }}

                                    >

                                        <div className="dropdown-user">

                                           <div className="dropdown-avatar">

    {

        admin?.name

            ? admin.name.charAt(0).toUpperCase()

            : "A"

    }

</div>

                                            <div>

                                                <h4>

                                                    {

                                                        admin?.name ||

                                                        "Admin"

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

                                        <button

                                            type="button"

                                            onClick={() => {

                                                setDropdown(false);

                                                setShowPasswordModal(true);

                                            }}

                                        >

                                            <FiKey />

                                            Change Password

                                        </button>

                                        <button

                                            type="button"

                                            className="logout-btn"

                                            onClick={async () => {

                                                const ok =

                                                    await showConfirm(

                                                        "Logout?",

                                                        "Are you sure you want to logout?",

                                                        "Logout"

                                                    );

                                                if (!ok) return;

                                                await logout();

                                            }}

                                        >

                                            <FiLogOut />

                                            Logout

                                        </button>

                                    </motion.div>

                                )

                            }

                        </AnimatePresence>

                    </div>

                </motion.div>

            </header>
            {/*==========================================
            CHANGE PASSWORD MODAL
            ==========================================*/}

            <ChangePasswordModal

                open={showPasswordModal}

                onClose={() =>

                    setShowPasswordModal(false)

                }

            />

        </>

    );

}