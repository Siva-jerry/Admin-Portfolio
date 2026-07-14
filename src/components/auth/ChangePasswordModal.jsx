import "./ChangePasswordModal.css";

import {

    useState,

} from "react";

import {

    FiX,

    FiLock,

    FiEye,

    FiEyeOff,

    FiKey,

} from "react-icons/fi";

import {

    EmailAuthProvider,

    reauthenticateWithCredential,

    updatePassword,

} from "firebase/auth";

import {

    auth,

} from "../../firebase/firebase";

import {

    showLoading,

    closeLoading,

    showSuccess,

    showError,

} from "../../utils/alert";

export default function ChangePasswordModal({

    open,

    onClose,

}) {

    const [showCurrentPassword,

        setShowCurrentPassword] =

        useState(false);

    const [showNewPassword,

        setShowNewPassword] =

        useState(false);

    const [showConfirmPassword,

        setShowConfirmPassword] =

        useState(false);

    const [formData,

        setFormData] =

        useState({

            currentPassword: "",

            newPassword: "",

            confirmPassword: "",

        });

    /*==================================================
    INPUT CHANGE
    ==================================================*/

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    }

    if (!open) return null;
    return (

        <div className="change-password-overlay">

            <div className="change-password-modal">

                {/*==============================================
                HEADER
                ==============================================*/}

                <div className="change-password-header">

                    <div className="change-password-title">

                        <div className="change-password-icon">

                            <FiKey />

                        </div>

                        <div>

                            <h2>

                                Change Password

                            </h2>

                            <p>

                                Keep your account secure by updating your password.

                            </p>

                        </div>

                    </div>

                    <button

                        type="button"

                        className="change-password-close"

                        onClick={onClose}

                    >

                        <FiX />

                    </button>

                </div>

                {/*==============================================
                FORM
                ==============================================*/}

                <form className="change-password-form">

                    {/*==============================================
                    CURRENT PASSWORD
                    ==============================================*/}

                    <div className="change-password-group">

                        <label>

                            Current Password

                        </label>

                        <div className="change-password-input">

                            <FiLock />

                            <input

                                type={

                                    showCurrentPassword

                                        ? "text"

                                        : "password"

                                }

                                name="currentPassword"

                                value={formData.currentPassword}

                                onChange={handleChange}

                                placeholder="Enter current password"

                            />

                            <button

                                type="button"

                                onClick={()=>

                                    setShowCurrentPassword(

                                        !showCurrentPassword

                                    )

                                }

                            >

                                {

                                    showCurrentPassword

                                        ? <FiEyeOff />

                                        : <FiEye />

                                }

                            </button>

                        </div>

                    </div>

                    {/*==============================================
                    NEW PASSWORD
                    ==============================================*/}

                    <div className="change-password-group">

                        <label>

                            New Password

                        </label>

                        <div className="change-password-input">

                            <FiLock />

                            <input

                                type={

                                    showNewPassword

                                        ? "text"

                                        : "password"

                                }

                                name="newPassword"

                                value={formData.newPassword}

                                onChange={handleChange}

                                placeholder="Enter new password"

                            />

                            <button

                                type="button"

                                onClick={()=>

                                    setShowNewPassword(

                                        !showNewPassword

                                    )

                                }

                            >

                                {

                                    showNewPassword

                                        ? <FiEyeOff />

                                        : <FiEye />

                                }

                            </button>

                        </div>

                    </div>

                    {/*==============================================
                    CONFIRM PASSWORD
                    ==============================================*/}

                    <div className="change-password-group">

                        <label>

                            Confirm Password

                        </label>

                        <div className="change-password-input">

                            <FiLock />

                            <input

                                type={

                                    showConfirmPassword

                                        ? "text"

                                        : "password"

                                }

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                placeholder="Confirm new password"

                            />

                            <button

                                type="button"

                                onClick={()=>

                                    setShowConfirmPassword(

                                        !showConfirmPassword

                                    )

                                }

                            >

                                {

                                    showConfirmPassword

                                        ? <FiEyeOff />

                                        : <FiEye />

                                }

                            </button>

                        </div>

                    </div>
                    {/*==============================================
                    ACTIONS
                    ==============================================*/}

                    <div className="change-password-actions">

                        <button

                            type="button"

                            className="change-password-cancel"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            type="button"

                            className="change-password-save"

                            onClick={async () => {

                                try {

                                    if (

                                        !formData.currentPassword ||

                                        !formData.newPassword ||

                                        !formData.confirmPassword

                                    ) {

                                        return showError(

                                            "Missing Fields",

                                            "Please fill all password fields."

                                        );

                                    }

                                    if (

                                        formData.newPassword.length < 6

                                    ) {

                                        return showError(

                                            "Weak Password",

                                            "New password must contain at least 6 characters."

                                        );

                                    }

                                    if (

                                        formData.newPassword !==

                                        formData.confirmPassword

                                    ) {

                                        return showError(

                                            "Passwords Don't Match",

                                            "Confirm password must match the new password."

                                        );

                                    }

                                    showLoading(

                                        "Updating Password...",

                                        "Please wait..."

                                    );

                                    const user = auth.currentUser;

                                    const credential =

                                        EmailAuthProvider.credential(

                                            user.email,

                                            formData.currentPassword

                                        );

                                    await reauthenticateWithCredential(

                                        user,

                                        credential

                                    );

                                    await updatePassword(

                                        user,

                                        formData.newPassword

                                    );

                                    closeLoading();

                                    await showSuccess(

                                        "Password Updated 🎉",

                                        "Your password has been changed successfully."

                                    );

                                    setFormData({

                                        currentPassword: "",

                                        newPassword: "",

                                        confirmPassword: "",

                                    });

                                    onClose();

                                }

                                catch (error) {

                                    console.error(error);

                                    closeLoading();

                                    await showError(

                                        "Update Failed",

                                        "Current password is incorrect or the update failed."

                                    );

                                }

                            }}

                        >

                            Update Password

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}