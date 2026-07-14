import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadGalleryImage,
    deleteGalleryImage,
} from "../supabase/supabase";

const COLLECTION = "gallery";

/*==================================================
GET GALLERY
==================================================*/

export async function getGalleryItems() {

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
CREATE GALLERY ITEM
==================================================*/

export async function createGalleryItem(item) {

    const galleryItem = {

        title: item.title || "",

        category: item.category || "",

        image: item.image || "",

        featured: item.featured || false,

        order: Number(item.order) || 1,

    };

    await addDoc(

        collection(db, COLLECTION),

        galleryItem

    );

}

/*==================================================
UPDATE GALLERY ITEM
==================================================*/

export async function updateGalleryItem(

    id,

    item

) {

    const document = doc(

        db,

        COLLECTION,

        id

    );

    await updateDoc(

        document,

        {

            title: item.title,

            category: item.category,

            image: item.image,

            featured: item.featured,

            order: Number(item.order),

        }

    );

}

/*==================================================
DELETE GALLERY ITEM
==================================================*/

export async function deleteGalleryItem(item) {

    if (item.image) {

        try {

            await deleteGalleryImage(

                item.image

            );

        }

        catch (error) {

            console.warn(

                "Gallery image delete failed:",

                error

            );

        }

    }

    await deleteDoc(

        doc(

            db,

            COLLECTION,

            item.id

        )

    );

}

/*==================================================
REPLACE GALLERY IMAGE
==================================================*/

export async function replaceGalleryImage(

    oldPath,

    file

) {

    if (

        oldPath

    ) {

        try {

            await deleteGalleryImage(

                oldPath

            );

        }

        catch (error) {

            console.warn(

                "Old gallery image not deleted.",

                error

            );

        }

    }

    return await uploadGalleryImage(

        file

    );

}