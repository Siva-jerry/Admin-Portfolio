import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
    uploadCertificateImage,
    deleteCertificateImage,
} from "../supabase/supabase";

const DOCUMENT = doc(
    db,
    "certificates",
    "course"
);

/*==================================================
GET CERTIFICATES
==================================================*/

export async function getCertificates() {

    const snapshot = await getDoc(DOCUMENT);

    if (!snapshot.exists()) {

        return [];

    }

    const data = snapshot.data();

    return data.items || [];

}

/*==================================================
CREATE CERTIFICATE
==================================================*/

export async function createCertificate(certificate) {

    const snapshot = await getDoc(DOCUMENT);

    const data = snapshot.exists()
        ? snapshot.data()
        : {};

    const items = data.items || [];

    const newCertificate = {

    ...certificate,

    id: Date.now().toString(),

};

delete newCertificate.isNew;

items.push(newCertificate);

   await setDoc(
    DOCUMENT,
    {
        items,
    },
    {
        merge: true,
    }
);

}

/*==================================================
UPDATE CERTIFICATE
==================================================*/

export async function updateCertificate(

    id,

    updatedCertificate

) {

    const snapshot = await getDoc(DOCUMENT);

    if (!snapshot.exists()) return;

    const data = snapshot.data();

    const items = (data.items || []).map(

        (item) =>

            item.id === id
    ? (() => {

        const updated = {

            ...updatedCertificate,

            id,

        };

        delete updated.isNew;

        return updated;

    })()

                : item

    );

    await updateDoc(

        DOCUMENT,

        {

            items,

        }

    );

}

/*==================================================
DELETE CERTIFICATE
==================================================*/

export async function deleteCertificate(

    certificate

) {

    const snapshot = await getDoc(DOCUMENT);

    if (!snapshot.exists()) return;

    const data = snapshot.data();

    const items = (data.items || []).filter(

        (item) =>

            item.id !== certificate.id

    );

    await updateDoc(

        DOCUMENT,

        {

            items,

        }

    );

    if (

        certificate.image

    ) {

        await deleteCertificateImage(

            certificate.image

        );

    }

}

/*==================================================
REPLACE CERTIFICATE IMAGE
==================================================*/

export async function replaceCertificateImage(

    oldPath,

    file

) {

    if (

        oldPath

    ) {

        try {

            await deleteCertificateImage(

                oldPath

            );

        }

        catch (error) {

            console.warn(

                "Old certificate image not deleted.",

                error

            );

        }

    }

    return await uploadCertificateImage(

        file

    );

}