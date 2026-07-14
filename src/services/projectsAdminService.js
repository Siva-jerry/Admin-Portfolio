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
    uploadProjectImage,
    deleteProjectImage,
} from "../supabase/supabase";

/*==================================================
COLLECTION
==================================================*/

const projectsRef = collection(
    db,
    "projects"
);
/*==================================================
GET ALL PROJECTS
==================================================*/

export async function getProjects() {

    try {

        const q = query(
            projectsRef,
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
            "Get Projects Error:",
            error
        );

        throw error;

    }

}
/*==================================================
CREATE PROJECT
==================================================*/

export async function createProject(projectData) {

    try {

        const docRef = await addDoc(projectsRef, {

            title: projectData.title,

            description: projectData.description,

            category: projectData.category,

            image: projectData.image || "",

            imagePath: projectData.imagePath || "",

            github: projectData.github,

            live: projectData.live,

            featured: projectData.featured,

            order: Number(projectData.order),

            technologies: projectData.technologies || [],

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),

        });

        return docRef.id;

    }

    catch (error) {

        console.error(
            "Create Project Error:",
            error
        );

        throw error;

    }

}

/*==================================================
UPDATE PROJECT
==================================================*/

export async function updateProject(
    id,
    projectData
) {

    try {

        const projectRef = doc(
            db,
            "projects",
            id
        );

        await updateDoc(projectRef, {

            title: projectData.title,

            description: projectData.description,

            category: projectData.category,

            image: projectData.image,

            imagePath: projectData.imagePath,

            github: projectData.github,

            live: projectData.live,

            featured: projectData.featured,

            order: Number(projectData.order),

            technologies: projectData.technologies,

            updatedAt: serverTimestamp(),

        });

        return true;

    }

    catch (error) {

        console.error(
            "Update Project Error:",
            error
        );

        throw error;

    }

}
/*==================================================
DELETE PROJECT
==================================================*/

/*==================================================
DELETE PROJECT
==================================================*/

export async function deleteProject(project) {

    try {

        if (!project) {

            throw new Error(
                "Project data not found."
            );

        }

        /*------------------------------------------
        DELETE IMAGE FROM SUPABASE
        ------------------------------------------*/

        if (project.imagePath) {

            try {

                await deleteProjectImage(
                    project.imagePath
                );

            }

            catch (error) {

                console.warn(
                    "Project image delete failed:",
                    error
                );

            }

        }

        /*------------------------------------------
        DELETE FIRESTORE DOCUMENT
        ------------------------------------------*/

        const projectRef = doc(

            db,

            "projects",

            project.id

        );

        await deleteDoc(projectRef);

        return true;

    }

    catch (error) {

        console.error(

            "Delete Project Error:",

            error

        );

        throw error;

    }

}
/*==================================================
REPLACE PROJECT IMAGE
==================================================*/

export async function replaceProjectImage(

    oldImagePath,

    file

) {

    try {

        if (!file) {

            throw new Error(
                "No image selected."
            );

        }

        /* Delete old image */

        if (oldImagePath) {

            try {

                await deleteProjectImage(
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

        /* Upload new image */

        const result = await uploadProjectImage(
            file
        );

        return result;

    }

    catch (error) {

        console.error(
            "Replace Project Image Error:",
            error
        );

        throw error;

    }

}