import "./Login.css";

import {

    useEffect,

    useState,

} from "react";

import {

    useNavigate,

} from "react-router-dom";

import {

    FiMail,

    FiLock,

    FiEye,

    FiEyeOff,

    FiArrowRight,

} from "react-icons/fi";

import {

    motion,

} from "framer-motion";

import {

    useAuth,

} from "../../context/AuthContext";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

} from "../../utils/alert";

export default function Login() {

    const navigate = useNavigate();

    const {

        login,

        user,

    } = useAuth();

    /*==================================================
    STATE
    ==================================================*/

    const [showPassword, setShowPassword] =

        useState(false);

    const [formData, setFormData] =

        useState({

            email: "",

            password: "",

        });

    /*==================================================
    ALREADY LOGGED IN
    ==================================================*/

    useEffect(() => {

        if (user) {

            navigate(

                "/",

                {

                    replace: true,

                }

            );

        }

    }, [

        user,

        navigate,

    ]);

    /*==================================================
    INPUT CHANGE
    ==================================================*/

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    }

    /*==================================================
    LOGIN
    ==================================================*/

    async function handleLogin(event) {

        event.preventDefault();

        try {

            showLoading(

                "Logging In...",

                "Please wait..."

            );

            await login(

                formData.email,

                formData.password

            );

            closeLoading();

            await showSuccess(

                "Welcome Back! 🎉",

                "Redirecting to Dashboard..."

            );

            navigate(

                "/",

                {

                    replace: true,

                }

            );

        }

        catch (error) {

            console.error(error);

            closeLoading();

            await showError(

                "Login Failed",

                "Invalid email or password."

            );

        }

    }
    return (

        <div className="login-page">

            {/*==================================================
            ANIMATED BACKGROUND
            ==================================================*/}

            <div className="login-background">

                <span className="blob blob-1"></span>

                <span className="blob blob-2"></span>

                <span className="blob blob-3"></span>

                <span className="blob blob-4"></span>

                <span className="blob blob-5"></span>

                <span className="blob blob-6"></span>

            </div>

            {/*==================================================
            LOGIN CARD
            ==================================================*/}

            <motion.div

                className="login-card"

                initial={{

                    opacity:0,

                    scale:.85,

                    y:60,

                }}

                animate={{

                    opacity:1,

                    scale:1,

                    y:0,

                }}

                transition={{

                    duration:.8,

                    ease:"easeOut",

                }}

            >

                {/*==================================================
                HEADER
                ==================================================*/}

                <div className="login-header">

                    <motion.div

                        className="login-logo"

                        animate={{

                            rotate:[

                                0,

                                8,

                                -8,

                                0,

                            ],

                        }}

                        transition={{

                            repeat:Infinity,

                            duration:5,

                        }}

                    >

                        🚀

                    </motion.div>

                    <h1>

                        Welcome Back

                    </h1>

                    <p>

                        Login to your Portfolio CMS Dashboard

                    </p>

                </div>

                {/*==================================================
                FORM
                ==================================================*/}

                <form

                    className="login-form"

                    onSubmit={handleLogin}

                >

                    {/*==================================================
                    EMAIL
                    ==================================================*/}

                    <div className="login-input-group">

                        <label>

                            Email Address

                        </label>

                        <div className="login-input">

                            <FiMail />

                            <input

                                type="email"

                                name="email"

                                placeholder="Enter your email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>
                    {/*==================================================
                    PASSWORD
                    ==================================================*/}

                    <div className="login-input-group">

                        <label>

                            Password

                        </label>

                        <div className="login-input">

                            <FiLock />

                            <input

                                type={

                                    showPassword

                                        ? "text"

                                        : "password"

                                }

                                name="password"

                                placeholder="Enter your password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                            />

                            <button

                                type="button"

                                className="password-toggle"

                                onClick={()=>

                                    setShowPassword(

                                        !showPassword

                                    )

                                }

                            >

                                {

                                    showPassword

                                        ? <FiEyeOff />

                                        : <FiEye />

                                }

                            </button>

                        </div>

                    </div>

                    {/*==================================================
                    LOGIN BUTTON
                    ==================================================*/}

                    <motion.button

                        type="submit"

                        className="login-btn"

                        whileHover={{

                            scale:1.04,

                        }}

                        whileTap={{

                            scale:.97,

                        }}

                    >

                        <span>

                            Login to Dashboard

                        </span>

                        <FiArrowRight />

                    </motion.button>

                </form>

                {/*==================================================
                FOOTER
                ==================================================*/}

                <div className="login-footer">

                    <p>

                        🔐 Secure Authentication powered by

                        <strong>

                            {" "}Firebase Authentication

                        </strong>

                    </p>

                </div>

            </motion.div>

        </div>

    );

}