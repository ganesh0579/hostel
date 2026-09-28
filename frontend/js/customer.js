/* =========================================================
   CUSTOMER DASHBOARD
========================================================= */


/* =========================================================
   NOTIFICATIONS
========================================================= */

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );

const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );

const closeNotifications =
    document.getElementById(
        "closeNotifications"
    );


notificationBtn.addEventListener(
    "click",
    function () {

        notificationPanel.classList.toggle(
            "show"
        );

    }
);


closeNotifications.addEventListener(
    "click",
    function () {

        notificationPanel.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


logoutBtn.addEventListener(
    "click",
    function () {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            /*
             * Later:
             *
             * Clear JWT/session
             * Clear authentication state
             * Redirect to login
             */

            window.location.href =
                "../login.html";

        }

    }
);


/* =========================================================
   CLOSE NOTIFICATION WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);