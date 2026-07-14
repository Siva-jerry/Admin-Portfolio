import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadExperienceImage,
    deleteExperienceImage,
} from "../supabase/supabase";

/*==================================================
COLLECTION
==================================================*/

const experienceRef = collection(
    db,
    "experience"
);

/*==================================================
GET ALL EXPERIENCE
==================================================*/

export async function getExperience() {

    try {

        const q = query(
            experienceRef,
            orderBy("order", "asc")
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data(),

        }));

    }

    catch (error) {

        console.error(
            "Get Experience Error:",
            error
        );

        throw error;

    }

}

/*==================================================
CREATE EXPERIENCE
==================================================*/

export async function createExperience(experienceData) {

    try {

        const docRef = await addDoc(
            experienceRef,
            {

                company: experienceData.company,

                role: experienceData.role,

                description: experienceData.description,

                image: experienceData.image || "",

                imagePath: experienceData.imagePath || "",

                location: experienceData.location,

                employmentType: experienceData.employmentType,

                startDate: experienceData.startDate,

                endDate: experienceData.endDate,

                featured: experienceData.featured,

                order: Number(experienceData.order),

                technologies:
                    experienceData.technologies || [],

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp(),

            }
        );

        return docRef.id;

    }

    catch (error) {

        console.error(
            "Create Experience Error:",
            error
        );

        throw error;

    }

}

/*==================================================
UPDATE EXPERIENCE
==================================================*/

export async function updateExperience(
    id,
    experienceData
) {

    try {

        const experienceDoc = doc(
            db,
            "experience",
            id
        );

        await updateDoc(
            experienceDoc,
            {

                company: experienceData.company,

                role: experienceData.role,

                description: experienceData.description,

                image: experienceData.image,

                imagePath: experienceData.imagePath,

                location: experienceData.location,

                employmentType:
                    experienceData.employmentType,

                startDate: experienceData.startDate,

                endDate: experienceData.endDate,

                featured: experienceData.featured,

                order: Number(
                    experienceData.order
                ),

                technologies:
                    experienceData.technologies,

                updatedAt: serverTimestamp(),

            }
        );

        return true;

    }

    catch (error) {

        console.error(
            "Update Experience Error:",
            error
        );

        throw error;

    }

}

/*==================================================
DELETE EXPERIENCE
==================================================*/

export async function deleteExperience(
    experience
) {

    try {

        if (!experience) {

            throw new Error(
                "Experience not found."
            );

        }

        if (experience.imagePath) {

            try {

                await deleteExperienceImage(
                    experience.imagePath
                );

            }

            catch (error) {

                console.warn(
                    "Image delete failed:",
                    error
                );

            }

        }

        const experienceDoc = doc(
            db,
            "experience",
            experience.id
        );

        await deleteDoc(
            experienceDoc
        );

        return true;

    }

    catch (error) {

        console.error(
            "Delete Experience Error:",
            error
        );

        throw error;

    }

}

/*==================================================
REPLACE EXPERIENCE IMAGE
==================================================*/

export async function replaceExperienceImage(
    oldImagePath,
    file
) {

    try {

        if (!file) {

            throw new Error(
                "No image selected."
            );

        }

        if (oldImagePath) {

            try {

                await deleteExperienceImage(
                    oldImagePath
                );

            }

            catch (error) {

                console.warn(
                    "Old image delete failed:",
                    error
                );

            }

        }

        const result =
            await uploadExperienceImage(
                file
            );

        return result;

    }

    catch (error) {

        console.error(
            "Replace Experience Image Error:",
            error
        );

        throw error;

    }

}