/* =========================================
   PROFILE PAGE
========================================= */

let originalValues = {};


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    saveOriginalValues();

    setupProfileForm();

    setupPasswordForm();

});


/* =========================================
   SAVE ORIGINAL VALUES
========================================= */

function saveOriginalValues() {

    originalValues = {

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        dob:
            document.getElementById("dob").value,

        gender:
            document.getElementById("gender").value,

        city:
            document.getElementById("city").value

    };

}


/* =========================================
   ENABLE EDITING
========================================= */

function enableEditing() {

    const fields = document.querySelectorAll(
        "#profileForm input, #profileForm select"
    );

    fields.forEach(field => {

        field.disabled = false;

    });


    document
        .getElementById("profileFormActions")
        .classList.add("show");

}


/* =========================================
   CANCEL EDITING
========================================= */

function cancelEditing() {

    document.getElementById("fullName").value =
        originalValues.fullName;

    document.getElementById("email").value =
        originalValues.email;

    document.getElementById("phone").value =
        originalValues.phone;

    document.getElementById("dob").value =
        originalValues.dob;

    document.getElementById("gender").value =
        originalValues.gender;

    document.getElementById("city").value =
        originalValues.city;


    disableEditing();

}


/* =========================================
   DISABLE EDITING
========================================= */

function disableEditing() {

    const fields = document.querySelectorAll(
        "#profileForm input, #profileForm select"
    );

    fields.forEach(field => {

        field.disabled = true;

    });


    document
        .getElementById("profileFormActions")
        .classList.remove("show");

}


/* =========================================
   PROFILE FORM
========================================= */

function setupProfileForm() {

    const form =
        document.getElementById("profileForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


        if (!name || !email || !phone) {

            alert("Please fill all required fields.");

            return;

        }


        originalValues.fullName = name;
        originalValues.email = email;
        originalValues.phone = phone;

        originalValues.dob =
            document.getElementById("dob").value;

        originalValues.gender =
            document.getElementById("gender").value;

        originalValues.city =
            document.getElementById("city").value;


        document.getElementById("profileName").textContent =
            name;


        alert("Profile updated successfully!");


        disableEditing();

    });

}


/* =========================================
   PROFILE PHOTO
========================================= */

function changePhoto() {

    const input =
        document.getElementById("photoInput");

    input.click();


    input.onchange = function () {

        const file = input.files[0];

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert("Please select an image.");

            return;

        }


        const reader = new FileReader();


        reader.onload = function (event) {

            const avatar =
                document.getElementById("profileAvatar");

            avatar.style.backgroundImage =
                `url(${event.target.result})`;

            avatar.style.backgroundSize = "cover";

            avatar.style.backgroundPosition = "center";

            avatar.textContent = "";

        };


        reader.readAsDataURL(file);

    };

}


/* =========================================
   PASSWORD MODAL
========================================= */

function openPasswordModal() {

    document
        .getElementById("passwordModal")
        .classList.add("show");

    document.body.style.overflow = "hidden";

}


function closePasswordModal() {

    document
        .getElementById("passwordModal")
        .classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================
   PASSWORD FORM
========================================= */

function setupPasswordForm() {

    const form =
        document.getElementById("passwordForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const currentPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (!currentPassword ||
            !newPassword ||
            !confirmPassword) {

            alert("Please fill all password fields.");

            return;

        }


        if (newPassword.length < 8) {

            alert(
                "New password must contain at least 8 characters."
            );

            return;

        }


        if (newPassword !== confirmPassword) {

            alert(
                "New password and confirm password do not match."
            );

            return;

        }


        alert("Password updated successfully!");


        form.reset();

        closePasswordModal();

    });

}


/* =========================================
   DELETE ACCOUNT
========================================= */

function deleteAccount() {

    const confirmation =
        confirm(
            "Are you sure you want to delete your account?\n\n" +
            "This action cannot be undone."
        );


    if (!confirmation) {
        return;
    }


    const secondConfirmation =
        confirm(
            "Please confirm again that you want to delete your account."
        );


    if (secondConfirmation) {

        alert(
            "Account deletion is currently disabled in this demo."
        );

    }

}


/* =========================================
   LOGOUT
========================================= */

function logout(event) {

    if (event) {
        event.preventDefault();
    }


    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmation) {

        window.location.href =
            "../login.html";

    }

}


/* =========================================
   NOTIFICATIONS
========================================= */

function showNotifications() {

    alert(
        "Notifications\n\n" +
        "• Your Wi-Fi complaint is being reviewed.\n" +
        "• Your booking has been confirmed.\n" +
        "• New hostel recommendation available."
    );

}


/* =========================================
   CLOSE MODAL ON OUTSIDE CLICK
========================================= */

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("passwordModal");


    if (event.target === modal) {

        closePasswordModal();

    }

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closePasswordModal();

    }

});