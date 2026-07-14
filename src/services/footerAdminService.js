import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*==================================================
DOCUMENT
==================================================*/

const DOCUMENT = doc(
    db,
    "footer",
    "Footer"
);

/*==================================================
GET FOOTER
==================================================*/

export async function getFooter() {

    const snapshot = await getDoc(DOCUMENT);

    if (!snapshot.exists()) {

        return {

            tagline: "",

            copyright: "",

            github: "",

            linkedin: "",

            instagram: "",

            resume: "",

            technologies: [],

        };

    }

    const data = snapshot.data();

    return {

        ...data,

        technologies:

            data.technologies || [],

    };

}

/*==================================================
UPDATE FOOTER
==================================================*/

export async function updateFooter(footer) {

    await setDoc(

        DOCUMENT,

        {

            tagline:

                footer.tagline || "",

            copyright:

                footer.copyright || "",

            github:

                footer.github || "",

            linkedin:

                footer.linkedin || "",

            instagram:

                footer.instagram || "",

            resume:

                footer.resume || "",

            technologies:

                footer.technologies || [],

        },

        {

            merge: true,

        }

    );

}