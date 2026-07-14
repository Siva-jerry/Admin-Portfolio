import {

    collection,

    getDocs,

} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*=========================================
COLLECTIONS
=========================================*/

const COLLECTIONS = [

    "hero",

    "about",

    "skills",

    "projects",

    "experience",

    "certificates",

    "gallery",

    "achievements",

    "testimonials",

    "contact",

    "footer",

];

/*=========================================
LOAD DASHBOARD STATS
=========================================*/

export async function getDashboardStats() {

    try{

        const stats = {};

        let totalDocuments = 0;

        for(const name of COLLECTIONS){

            const snapshot = await getDocs(

                collection(

                    db,

                    name

                )

            );

            stats[name] = snapshot.size;

            totalDocuments += snapshot.size;

        }

        return{

            collections:COLLECTIONS.length,

            documents:totalDocuments,

            stats,

            lastUpdated:new Date().toISOString(),

        };

    }

    catch(error){

        console.error(

            "Dashboard Error :",

            error

        );

        throw error;

    }

}