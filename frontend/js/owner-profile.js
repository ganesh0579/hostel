/* =====================================================
   HOSTELVISION - OWNER PROFILE
===================================================== */


/* =====================================================
   DEFAULT PROFILE
===================================================== */

const defaultProfile = {

    name: "Ganesh",

    phone: "9876543210",

    email: "owner@hostelvision.com",

    address: "Hyderabad, Telangana, India"

};


/* =====================================================
   LOAD PROFILE
===================================================== */

let ownerProfile =
    JSON.parse(
        localStorage.getItem(
            "hostelvisionOwnerProfile"
        )
    ) || defaultProfile;


/* =====================================================
   LOAD NOTIFICATIONS
===================================================== */

let notificationSettings =
    JSON.parse(
        localStorage.getItem(
            "hostelvisionOwnerNotifications"
        )
    ) || {

        bookings: true,
        payments: true,
        complaints: true,
        system: false

    };


/* =====================================================
   SAVE PROFILE
===================================================== */

function saveProfile() {

    localStorage.setItem(
        "hostelvisionOwnerProfile",
        JSON.stringify(ownerProfile)
    );

}


/* =====================================================
   UPDATE UI
===================================================== */

function updateProfileUI() {

    document.getElementById(
        "ownerName"
    ).value =
        ownerProfile.name;


    document.getElementById(
        "ownerPhone"
    ).value =
        ownerProfile.phone;


    document.getElementById(
        "ownerEmail"
    ).value =
        ownerProfile.email;


    document.getElementById(
        "ownerAddress"
    ).value =
        ownerProfile.address;


    document.getElementById(
        "profileDisplayName"
    ).textContent =
        ownerProfile.name;


    document.getElementById(
        "profileDisplayEmail"
    ).textContent =
        ownerProfile.email;


    const firstLetter =
        ownerProfile.name
            .trim()
            .charAt(0)
            .toUpperCase();


    document.getElementById(
        "largeAvatar"
    ).textContent =
        firstLetter || "G";


    document.getElementById(
        "navAvatar"
    ).textContent =
        firstLetter || "G";


    document.getElementById(
        "navOwnerName"
    ).textContent =
        ownerProfile.name;

}


/* =====================================================
   PROFILE SUBMIT
===================================================== */

document
    .getElementById("profileForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "ownerName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "ownerPhone"
                ).value.trim();


            const email =
                document.getElementById(
                    "ownerEmail"
                ).value.trim();


            const address =
                document.getElementById(
                    "ownerAddress"
                ).value.trim();


            if (!name) {

                alert(
                    "Please enter your name."
                );

                return;

            }


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            ownerProfile = {

                name,

                phone,

                email,

                address

            };


            saveProfile();

            updateProfileUI();


            alert(
                "Profile updated successfully."
            );

        }
    );


/* =====================================================
   RESET PROFILE
===================================================== */

function resetProfile() {

    updateProfileUI();

}


/* =====================================================
   NOTIFICATION SETTINGS
===================================================== */

function loadNotificationSettings() {

    document.getElementById(
        "bookingNotifications"
    ).checked =
        notificationSettings.bookings;


    document.getElementById(
        "paymentNotifications"
    ).checked =
        notificationSettings.payments;


    document.getElementById(
        "complaintNotifications"
    ).checked =
        notificationSettings.complaints;


    document.getElementById(
        "systemNotifications"
    ).checked =
        notificationSettings.system;

}


/* =====================================================
   SAVE NOTIFICATIONS
===================================================== */

function saveNotificationSettings() {

    notificationSettings = {

        bookings:
            document.getElementById(
                "bookingNotifications"
            ).checked,

        payments:
            document.getElementById(
                "paymentNotifications"
            ).checked,

        complaints:
            document.getElementById(
                "complaintNotifications"
            ).checked,

        system:
            document.getElementById(
                "systemNotifications"
            ).checked

    };


    localStorage.setItem(
        "hostelvisionOwnerNotifications",
        JSON.stringify(
            notificationSettings
        )
    );


    alert(
        "Notification preferences saved."
    );

}


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (
        input.type === "password"
    ) {

        input.type = "text";

        button.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        input.type = "password";

        button.innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

}


/* =====================================================
   PASSWORD UPDATE
===================================================== */

document
    .getElementById("passwordForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const current =
                document.getElementById(
                    "currentPassword"
                ).value;


            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (!current) {

                alert(
                    "Please enter your current password."
                );

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


            if (newPassword === current) {

                alert(
                    "New password must be different from the current password."
                );

                return;

            }


            /*
                FRONTEND DEMO ONLY

                Real password change will be implemented
                later using Spring Boot + password hashing.
            */


            alert(
                "Password updated successfully.\n\n" +
                "Backend authentication will securely store the password."
            );


            document.getElementById(
                "passwordForm"
            ).reset();

        }
    );


/* =====================================================
   SCROLL TO SECURITY
===================================================== */

function scrollToSecurity() {

    document
        .getElementById(
            "securitySection"
        )
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {

    alert(
        "Notifications\n\n" +
        "• 3 new booking requests\n" +
        "• 1 payment pending\n" +
        "• UrbanNest verification completed"
    );

}


/* =====================================================
   HELP
===================================================== */

function showHelp(event) {

    event.preventDefault();


    alert(
        "HostelVision Owner Support\n\n" +
        "Support module will be connected to the backend later."
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutOwner(event) {

    event.preventDefault();


    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );


    window.location.href =
        "../owner-login.html";

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateProfileUI();

        loadNotificationSettings();

    }
);