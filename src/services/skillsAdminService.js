import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*==================================================
COLLECTION
==================================================*/

const skillsRef = collection(db, "skills");

/*==================================================
GET ALL SKILLS
==================================================*/

export async function getSkills() {

    try {

        const snapshot = await getDocs(skillsRef);

        const skills = [];

        snapshot.forEach((document) => {

            skills.push({

                id: document.id,

                ...document.data(),

            });

        });

        skills.sort((a, b) => a.order - b.order);

        return skills;

    }

    catch (error) {

        console.error("Get Skills Error:", error);

        throw error;

    }

}

/*==================================================
ADD SKILL
==================================================*/

export async function addSkill(skill) {

    try {

        await addDoc(skillsRef, {

            name: skill.name,

            category: skill.category,

            percentage: Number(skill.percentage),

            color: skill.color,

            icon: skill.icon,

            order: Number(skill.order),

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),

        });

    }

    catch (error) {

        console.error("Add Skill Error:", error);

        throw error;

    }

}

/*==================================================
UPDATE SKILL
==================================================*/

export async function updateSkill(id, skill) {

    try {

        const skillRef = doc(db, "skills", id);

        await updateDoc(skillRef, {

            name: skill.name,

            category: skill.category,

            percentage: Number(skill.percentage),

            color: skill.color,

            icon: skill.icon,

            order: Number(skill.order),

            updatedAt: serverTimestamp(),

        });

    }

    catch (error) {

        console.error("Update Skill Error:", error);

        throw error;

    }

}

/*==================================================
DELETE SKILL
==================================================*/

export async function deleteSkill(id) {

    try {

        await deleteDoc(doc(db, "skills", id));

    }

    catch (error) {

        console.error("Delete Skill Error:", error);

        throw error;

    }

}