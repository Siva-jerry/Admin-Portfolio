import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadHeroImage,
    deleteHeroImage,
} from "../supabase/supabase";

/*==================================================
DOCUMENT
==================================================*/

const heroRef = doc(db, "hero", "main");

/*==================================================
GET HERO DATA
==================================================*/

export async function getHeroData() {

    try {

        const snapshot = await getDoc(heroRef);

        if (!snapshot.exists()) {

            throw new Error("Hero document not found.");

        }

        return snapshot.data();

    }

    catch (error) {

        console.error("Get Hero Error:", error);

        throw error;

    }

}

/*==================================================
UPDATE HERO DATA
==================================================*/

export async function updateHeroData(heroData) {

    try {

        await updateDoc(heroRef, {

            greeting: heroData.greeting,

            firstName: heroData.firstName,

            lastName: heroData.lastName,

            description: heroData.description,

            professions: heroData.professions,

            primaryButtonText: heroData.primaryButtonText,

            primaryButtonLink: heroData.primaryButtonLink,

            secondaryButtonText: heroData.secondaryButtonText,

            resumeUrl: heroData.resumeUrl,

            socials: heroData.socials,

            stats: heroData.stats,

            imageUrl: heroData.imageUrl,

            imagePath: heroData.imagePath || "",

            updatedAt: serverTimestamp(),

        });

        return true;

    }

    catch (error) {

        console.error("Update Hero Error:", error);

        throw error;

    }

}

/*==================================================
UPLOAD HERO IMAGE
==================================================*/

export async function uploadHeroProfileImage(file) {

    try {

        if (!file) {

            throw new Error("No image selected.");

        }

        const result = await uploadHeroImage(file);

        await updateDoc(heroRef, {

            imageUrl: result.url,

            imagePath: result.path,

            updatedAt: serverTimestamp(),

        });

        return result;

    }

    catch (error) {

        console.error("Upload Hero Image Error:", error);

        throw error;

    }

}

/*==================================================
REPLACE HERO IMAGE
==================================================*/

export async function replaceHeroImage(file) {

    try {

        if (!file) {

            throw new Error("No image selected.");

        }

        const snapshot = await getDoc(heroRef);

        if (!snapshot.exists()) {

            throw new Error("Hero document not found.");

        }

        const hero = snapshot.data();

        if (hero.imagePath) {

            try {

                await deleteHeroImage(hero.imagePath);

            }

            catch (error) {

                console.warn("Old Hero image delete failed:", error);

            }

        }

        const result = await uploadHeroImage(file);

        await updateDoc(heroRef, {

            imageUrl: result.url,

            imagePath: result.path,

            updatedAt: serverTimestamp(),

        });

        return result;

    }

    catch (error) {

        console.error("Replace Hero Image Error:", error);

        throw error;

    }

}