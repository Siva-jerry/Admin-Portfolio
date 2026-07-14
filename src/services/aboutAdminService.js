import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*==================================================
DOCUMENT
==================================================*/

const aboutRef = doc(db, "about", "main");

/*==================================================
GET ABOUT DATA
==================================================*/

export async function getAboutData() {

    try {

        const snapshot = await getDoc(aboutRef);

        if (!snapshot.exists()) {
            throw new Error("About document not found.");
        }

        return snapshot.data();

    }

    catch (error) {

        console.error("Get About Error:", error);

        throw error;

    }

}

/*==================================================
UPDATE ABOUT DATA
==================================================*/

export async function updateAboutData(aboutData) {

    try {

        await updateDoc(aboutRef, {

            title: aboutData.title,

            subtitle: aboutData.subtitle,

            description: aboutData.description,

            education: aboutData.education,

            location: aboutData.location,

            status: aboutData.status,

            passion: aboutData.passion,

            quote: aboutData.quote,

            aboutCards: aboutData.aboutCards,

            updatedAt: serverTimestamp(),

        });

        return true;

    }

    catch (error) {

        console.error("Update About Error:", error);

        throw error;

    }

}