import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

const BUCKET = "portfolio-cms";

/*==================================================
UPLOAD IMAGE (Generic)
==================================================*/

export async function uploadImage(
    file,
    folder = "portfolio"
) {

    if (!file) {
        throw new Error("No image selected.");
    }

    const extension = file.name.split(".").pop();

    const filename =
        `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${extension}`;

    const filePath = `${folder}/${filename}`;

    const { data:uploadData, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
    });

console.log("Uploading Path:", filePath);
console.log("Upload Data:", uploadData);
console.log("Upload Error:", error);

if (error) {
    console.error(error);
    throw error;
}

    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

    return {
        url: data.publicUrl,
        path: filePath,
    };

}

/*==================================================
DELETE IMAGE
==================================================*/

export async function deleteImage(path) {

    if (!path) return;

    const { error } = await supabase.storage
        .from(BUCKET)
        .remove([path]);

    if (error) {
        console.error(error);
    }

}

/*==================================================
HERO IMAGE
==================================================*/

export async function uploadHeroImage(file) {

    return uploadImage(
        file,
        "portfolio/hero/"
    );

}

export async function deleteHeroImage(path) {

    return deleteImage(path);

}

/*==================================================
UPLOAD RESUME
==================================================*/

export async function uploadResume(file) {

    if (!file) {

        throw new Error("No file selected.");

    }

    const filename =
        `${Date.now()}-${file.name}`;

    const filePath =
        `resume/${filename}`;

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
            upsert: true,
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

    return {
        url: data.publicUrl,
        path: filePath,
    };

}

/*==================================================
DELETE FILE
==================================================*/

export async function deleteFile(path) {

    if (!path) return;

    await supabase.storage
        .from(BUCKET)
        .remove([path]);

}
/*==================================================
PROJECT IMAGE
==================================================*/

export async function uploadProjectImage(file) {

    return uploadImage(
        file,
        "projects"
    );

}

export async function deleteProjectImage(path) {

    return deleteImage(path);

}
/*==================================================
EXPERIENCE IMAGE
==================================================*/

export async function uploadExperienceImage(file) {

    return uploadImage(
        file,
        "experience"
    );

}

/*==================================================
DELETE EXPERIENCE IMAGE
==================================================*/

export async function deleteExperienceImage(path) {

    if (!path) return;

    const { error } =
        await supabase.storage
            .from(BUCKET)
            .remove([path]);

    if (error) {

        console.error(
            "Delete Experience Image Error:",
            error
        );

        throw error;

    }

}
/*==================================================
CERTIFICATE IMAGE
==================================================*/

export async function uploadCertificateImage(file) {

    return uploadImage(
        file,
        "certificates"
    );

}

/*==================================================
DELETE CERTIFICATE IMAGE
==================================================*/

export async function deleteCertificateImage(path) {

    return deleteImage(path);

}
/*==================================================
GET SUPABASE IMAGE URL
==================================================*/

export function getSupabaseImageUrl(path) {

    if (!path) return "";

    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;

}
/*==================================================
GALLERY IMAGE
==================================================*/

export async function uploadGalleryImage(file) {

    return uploadImage(
        file,
        "gallery"
    );

}

/*==================================================
DELETE GALLERY IMAGE
==================================================*/

export async function deleteGalleryImage(path) {

    return deleteImage(path);

}
/*==================================================
ACHIEVEMENT IMAGE
==================================================*/

export async function uploadAchievementImage(file) {

    return uploadImage(
        file,
        "achievements"
    );

}

/*==================================================
DELETE ACHIEVEMENT IMAGE
==================================================*/

export async function deleteAchievementImage(path) {

    return deleteImage(path);

}
/*==================================================
TESTIMONIAL IMAGE
==================================================*/

export async function uploadTestimonialImage(file) {

    return uploadImage(
        file,
        "testimonials"
    );

}

export async function deleteTestimonialImage(path) {

    return deleteImage(path);

}