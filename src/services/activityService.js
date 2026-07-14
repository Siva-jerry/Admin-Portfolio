import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*==================================================
COLLECTION
==================================================*/

const activityRef = collection(
    db,
    "activity"
);

/*==================================================
ADD ACTIVITY
==================================================*/

export async function logActivity({

    action,

    section,

    description,

    type = "update",

}){

    try{

        await addDoc(

            activityRef,

            {

                action,

                section,

                description,

                type,

                createdAt: serverTimestamp(),

            }

        );

    }

    catch(error){

        console.error(

            "Activity Error:",

            error

        );

    }

}

/*==================================================
GET RECENT ACTIVITIES
==================================================*/

export async function getRecentActivities(){

    try{

        const q = query(

            activityRef,

            orderBy(

                "createdAt",

                "desc"

            ),

            limit(10)

        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data(),

        }));

    }

    catch(error){

        console.error(

            "Activity Fetch Error:",

            error

        );

        return [];

    }

}