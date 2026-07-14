import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadTestimonialImage,
    deleteTestimonialImage,
} from "../supabase/supabase";

const COLLECTION = "testimonials";

/*==================================================
GET TESTIMONIALS
==================================================*/

export async function getTestimonials() {

    const snapshot = await getDocs(

        query(

            collection(db, COLLECTION),

            orderBy("order", "asc")

        )

    );

    return snapshot.docs.map((docItem) => ({

        id: docItem.id,

        ...docItem.data(),

    }));

}

/*==================================================
CREATE TESTIMONIAL
==================================================*/

export async function createTestimonial(testimonial) {

    const data = { ...testimonial };

    delete data.id;

    await addDoc(

        collection(db, COLLECTION),

        data

    );

}

/*==================================================
UPDATE TESTIMONIAL
==================================================*/

export async function updateTestimonial(

    id,

    testimonial

) {

    const data = { ...testimonial };

    delete data.id;

    await updateDoc(

        doc(db, COLLECTION, id),

        data

    );

}

/*==================================================
DELETE TESTIMONIAL
==================================================*/

export async function deleteTestimonial(

    testimonial

) {

    await deleteDoc(

        doc(

            db,

            COLLECTION,

            testimonial.id

        )

    );

    if (testimonial.image) {

        await deleteTestimonialImage(

            testimonial.image

        );

    }

}

/*==================================================
REPLACE TESTIMONIAL IMAGE
==================================================*/

export async function replaceTestimonialImage(

    oldPath,

    file

) {

    if (oldPath) {

        try {

            await deleteTestimonialImage(

                oldPath

            );

        }

        catch (error) {

            console.warn(

                "Old testimonial image not deleted.",

                error

            );

        }

    }

    return await uploadTestimonialImage(

        file

    );

}