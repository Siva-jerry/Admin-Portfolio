import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadAchievementImage,
    deleteAchievementImage,
} from "../supabase/supabase";

const COLLECTION = collection(
    db,
    "achievements"
);

/*==================================================
GET ACHIEVEMENTS
==================================================*/

export async function getAchievements() {

    const q = query(
        COLLECTION,
        orderBy("order", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => ({

        id: item.id,

        ...item.data(),

    }));

}

/*==================================================
CREATE ACHIEVEMENT
==================================================*/

export async function createAchievement(

    achievement

) {

    const {

        id,

        isNew,

        ...data

    } = achievement;

    await addDoc(

        COLLECTION,

        data

    );

}

/*==================================================
UPDATE ACHIEVEMENT
==================================================*/

export async function updateAchievement(

    id,

    achievement

) {

    const document = doc(

        db,

        "achievements",

        id

    );

    const {

        id: removeId,

        isNew,

        ...data

    } = achievement;

    await updateDoc(

        document,

        data

    );

}

/*==================================================
DELETE ACHIEVEMENT
==================================================*/

export async function deleteAchievement(

    achievement

) {

    const document = doc(

        db,

        "achievements",

        achievement.id

    );

    await deleteDoc(

        document

    );

    if (

        achievement.image

    ) {

        await deleteAchievementImage(

            achievement.image

        );

    }

}

/*==================================================
REPLACE ACHIEVEMENT IMAGE
==================================================*/

export async function replaceAchievementImage(

    oldPath,

    file

) {

    if (

        oldPath

    ) {

        try {

            await deleteAchievementImage(

                oldPath

            );

        }

        catch (error) {

            console.warn(

                "Old achievement image not deleted.",

                error

            );

        }

    }

    return await uploadAchievementImage(

        file

    );

}