import { supabase } from "../supabase/supabase";

/*==========================================
UPLOAD FILE
==========================================*/

export async function uploadFile(

    folder,

    file

){

    try{

        if(!file){

            throw new Error(

                "No file selected."

            );

        }

        const extension=

            file.name.split(".").pop();

        const fileName=

            `${Date.now()}.${extension}`;

        const filePath=

            `portfolio/${folder}/${fileName}`;

        const {

            error

        }=await supabase.storage

        .from("portfolio-cms")

        .upload(

            filePath,

            file,

            {

                upsert:true,

            }

        );

        if(error){

            throw error;

        }

        const {

            data

        }=supabase.storage

        .from("portfolio-cms")

        .getPublicUrl(

            filePath

        );

        return{

            path:filePath,

            publicUrl:data.publicUrl,

        };

    }

    catch(error){

        console.error(

            "Upload Error:",

            error

        );

        throw error;

    }

}

/*==========================================
DELETE FILE
==========================================*/

export async function deleteFile(

    filePath

){

    try{

        if(!filePath){

            return;

        }

        const{

            error

        }=await supabase.storage

        .from("portfolio-cms")

        .remove([

            filePath

        ]);

        if(error){

            throw error;

        }

    }

    catch(error){

        console.error(

            "Delete Error:",

            error

        );

        throw error;

    }

}