import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadResume,
    deleteFile,
} from "../supabase/supabase";

/*==================================================
DOCUMENT
==================================================*/

const heroRef = doc(
    db,
    "hero",
    "main"
);

/*==================================================
UPLOAD / REPLACE RESUME
==================================================*/

export async function replaceResume(
    file,
    oldResumePath = ""
) {

    try {

        if (!file) {

            throw new Error(
                "No resume selected."
            );

        }

        /*==========================================
        DELETE OLD RESUME
        ==========================================*/

        if (oldResumePath) {

            try {

                await deleteFile(
                    oldResumePath
                );

            }

            catch (error) {

                console.warn(
                    "Old resume delete failed:",
                    error
                );

            }

        }

        /*==========================================
        UPLOAD NEW RESUME
        ==========================================*/

        const result =
            await uploadResume(file);

        /*==========================================
        UPDATE FIRESTORE
        ==========================================*/

        await updateDoc(heroRef, {

            resumeUrl: result.url,

            resumePath: result.path,

            updatedAt:
                serverTimestamp(),

        });

        return result;

    }

    catch (error) {

        console.error(

            "Replace Resume Error:",

            error

        );

        throw error;

    }

}

/*==================================================
GET CURRENT RESUME
==================================================*/

export async function getResume() {

    try {

        const snapshot =
            await getDoc(heroRef);

        if (!snapshot.exists()) {

            throw new Error(
                "Hero document not found."
            );

        }

        const hero =
            snapshot.data();

        return {

            resumeUrl:
                hero.resumeUrl || "",

            resumePath:
                hero.resumePath || "",

        };

    }

    catch (error) {

        console.error(

            "Get Resume Error:",

            error

        );

        throw error;

    }

}

/*==================================================
DELETE RESUME
==================================================*/

export async function deleteResume() {

    try {

        const snapshot =
            await getDoc(heroRef);

        if (!snapshot.exists()) {

            return;

        }

        const hero =
            snapshot.data();

        if (hero.resumePath) {

            await deleteFile(
                hero.resumePath
            );

        }

        await updateDoc(heroRef, {

            resumeUrl: "",

            resumePath: "",

            updatedAt:
                serverTimestamp(),

        });

    }

    catch (error) {

        console.error(

            "Delete Resume Error:",

            error

        );

        throw error;

    }

}