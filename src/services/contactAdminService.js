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
    "contact",
    "Contact Me"
);

/*==================================================
GET CONTACT
==================================================*/

export async function getContact() {

    const snapshot = await getDoc(DOCUMENT);

    if (!snapshot.exists()) {

        return {

            email: "",

            phone: "",

            location: "",

            website: "",

            github: "",

            linkedin: "",

            instagram: "",

            resume: "",

        };

    }

    return snapshot.data();

}

/*==================================================
UPDATE CONTACT
==================================================*/

export async function updateContact(contact) {

    await setDoc(

        DOCUMENT,

        {

            email: contact.email || "",

            phone: contact.phone || "",

            location: contact.location || "",

            website: contact.website || "",

            github: contact.github || "",

            linkedin: contact.linkedin || "",

            instagram: contact.instagram || "",

            resume: contact.resume || "",

        },

        {

            merge: true,

        }

    );

}