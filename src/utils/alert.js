import Swal from "sweetalert2";

/*==================================================
LOADING
==================================================*/

export function showLoading(title, text = "Please wait...") {

    Swal.fire({

        title,

        text,

        allowOutsideClick: false,

        allowEscapeKey: false,

        didOpen: () => {

            Swal.showLoading();

        },

    });

}

/*==================================================
CLOSE
==================================================*/

export function closeLoading() {

    Swal.close();

}

/*==================================================
SUCCESS
==================================================*/

export async function showSuccess(

    title,

    text

) {

    await Swal.fire({

        icon: "success",

        title,

        text,

        confirmButtonColor: "#4F46E5",

    });

}

/*==================================================
ERROR
==================================================*/

export async function showError(

    title,

    text

) {

    await Swal.fire({

        icon: "error",

        title,

        text,

        confirmButtonColor: "#DC2626",

    });

}

/*==================================================
WARNING
==================================================*/

export async function showWarning(

    title,

    text

) {

    await Swal.fire({

        icon: "warning",

        title,

        text,

        confirmButtonColor: "#F59E0B",

    });

}

/*==================================================
CONFIRM
==================================================*/

export async function showConfirm(

    title,

    text,

    confirmText = "Yes"

) {

    const result = await Swal.fire({

        title,

        text,

        icon: "question",

        showCancelButton: true,

        confirmButtonText: confirmText,

        cancelButtonText: "Cancel",

        confirmButtonColor: "#4F46E5",

        cancelButtonColor: "#6B7280",

    });

    return result.isConfirmed;

}

/*==================================================
DELETE CONFIRM
==================================================*/

export async function showDeleteConfirm(

    title = "Delete Item?",

    text = "This action cannot be undone."

) {

    const result = await Swal.fire({

        title,

        text,

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Delete",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#DC2626",

        cancelButtonColor: "#6B7280",

    });

    return result.isConfirmed;

}

/*==================================================
TOAST
==================================================*/

export function showToast(

    icon,

    title

) {

    Swal.fire({

        toast: true,

        position: "top-end",

        icon,

        title,

        showConfirmButton: false,

        timer: 2500,

        timerProgressBar: true,

    });

}