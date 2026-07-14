import {

    createContext,

    useContext,

    useEffect,

    useState,

} from "react";

import {

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged,

} from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    /*==================================================
    AUTH STATE
    ==================================================*/

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(

            auth,

            (currentUser) => {

                setUser(currentUser);

                setLoading(false);

            }

        );

        return unsubscribe;

    }, []);

    /*==================================================
    LOGIN
    ==================================================*/

    async function login(

        email,

        password

    ) {

        return signInWithEmailAndPassword(

            auth,

            email,

            password

        );

    }

    /*==================================================
    LOGOUT
    ==================================================*/

    async function logout() {

        return signOut(auth);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

            }}

        >

            {

                !loading &&

                children

            }

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}