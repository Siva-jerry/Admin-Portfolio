import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({

    children,

}) {

    const {

        user,

        loading,

    } = useAuth();

    /*==================================================
    LOADING
    ==================================================*/

    if (loading) {

        return (

            <div

                style={{

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    minHeight: "100vh",

                    fontSize: "22px",

                    fontWeight: "700",

                    color: "#64748B",

                }}

            >

                Checking Authentication...

            </div>

        );

    }

    /*==================================================
    NOT LOGGED IN
    ==================================================*/

    if (!user) {

        return (

            <Navigate

                to="/login"

                replace

            />

        );

    }

    /*==================================================
    AUTHENTICATED
    ==================================================*/

    return children;

}