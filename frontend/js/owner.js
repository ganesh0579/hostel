/* =========================================
   OWNER DASHBOARD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    checkOwnerLogin();

});


/* =========================================
   LOGIN CHECK
========================================= */

function checkOwnerLogin() {

    /*
     * Temporary frontend login check.
     *
     * We are allowing direct access during development
     * if localStorage has not been configured yet.
     *
     * Real authorization will be implemented
     * using Spring Boot + JWT later.
     */

    const loggedIn =
        localStorage.getItem(
            "hostelvisionOwnerLoggedIn"
        );

    /*
     * For now we don't redirect.
     *
     * This keeps the page easy to test
     * during frontend development.
     */

}


/* =========================================
   NOTIFICATIONS
========================================= */

function showOwnerNotifications() {

    alert(
        "Owner Notifications\n\n" +
        "• New booking request from Rahul Kumar.\n" +
        "• New booking request from Ananya Sharma.\n" +
        "• New complaint reported at UrbanNest Premium Hostel."
    );

}


/* =========================================
   COMING SOON
========================================= */

function showComingSoon(event) {

    if (event) {
        event.preventDefault();
    }

    alert(
        "Owner Complaints module will be implemented next."
    );

}


/* =========================================
   LOGOUT
========================================= */

function ownerLogout(event) {

    if (event) {
        event.preventDefault();
    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );


    window.location.href =
        "../owner-login.html";

}