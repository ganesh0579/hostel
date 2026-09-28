/* =========================================
   OWNER HOSTELS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupSearch();

    setupFilters();

});


/* =========================================
   SEARCH
========================================= */

function setupSearch() {

    const search =
        document.getElementById("hostelSearch");


    search.addEventListener("input", filterHostels);

}


/* =========================================
   FILTERS
========================================= */

function setupFilters() {

    document
        .getElementById("statusFilter")
        .addEventListener(
            "change",
            filterHostels
        );


    document
        .getElementById("typeFilter")
        .addEventListener(
            "change",
            filterHostels
        );

}


/* =========================================
   FILTER HOSTELS
========================================= */

function filterHostels() {

    const search =
        document
            .getElementById("hostelSearch")
            .value
            .toLowerCase()
            .trim();


    const status =
        document
            .getElementById("statusFilter")
            .value;


    const type =
        document
            .getElementById("typeFilter")
            .value;


    const cards =
        document.querySelectorAll(
            ".owner-hostel-card"
        );


    let visibleCount = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();


        const location =
            card.dataset.location.toLowerCase();


        const cardStatus =
            card.dataset.status;


        const cardType =
            card.dataset.type;


        const matchesSearch =
            !search ||
            name.includes(search) ||
            location.includes(search);


        const matchesStatus =
            status === "all" ||
            cardStatus === status;


        const matchesType =
            type === "all" ||
            cardType === type;


        const visible =
            matchesSearch &&
            matchesStatus &&
            matchesType;


        card.style.display =
            visible ? "grid" : "none";


        if (visible) {
            visibleCount++;
        }

    });


    const empty =
        document.getElementById("emptyState");


    empty.classList.toggle(
        "show",
        visibleCount === 0
    );

}


/* =========================================
   CLEAR FILTERS
========================================= */

function clearFilters() {

    document.getElementById(
        "hostelSearch"
    ).value = "";


    document.getElementById(
        "statusFilter"
    ).value = "all";


    document.getElementById(
        "typeFilter"
    ).value = "all";


    filterHostels();

}


/* =========================================
   VIEW HOSTEL
========================================= */

function viewHostel(name) {

    alert(
        `Opening property:\n\n${name}\n\n` +
        "The owner property details page will be connected here."
    );

}


/* =========================================
   EDIT HOSTEL
========================================= */

function editHostel(name) {

    const confirmed =
        confirm(
            `Edit "${name}"?\n\n` +
            "The property editor will be connected to the Add Hostel form."
        );


    if (confirmed) {

        window.location.href =
            "add-hostel.html";

    }

}


/* =========================================
   TOGGLE MENU
========================================= */

function toggleMenu(button) {

    const menu =
        button.nextElementSibling;


    document
        .querySelectorAll(".action-menu")
        .forEach(item => {

            if (item !== menu) {

                item.classList.remove("show");

            }

        });


    menu.classList.toggle("show");

}


/* =========================================
   CLOSE MENUS
========================================= */

document.addEventListener("click", function (event) {

    if (
        !event.target.closest(".more-button") &&
        !event.target.closest(".action-menu")
    ) {

        document
            .querySelectorAll(".action-menu")
            .forEach(menu => {

                menu.classList.remove("show");

            });

    }

});


/* =========================================
   DEACTIVATE / ACTIVATE
========================================= */

function toggleProperty(button, name) {

    const card =
        button.closest(".owner-hostel-card");


    const currentlyActive =
        card.dataset.status === "active";


    const action =
        currentlyActive
            ? "deactivate"
            : "activate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} "${name}"?`
        );


    if (!confirmed) {
        return;
    }


    if (currentlyActive) {

        card.dataset.status = "inactive";


        const badge =
            card.querySelector(".status-badge");


        badge.textContent =
            "Inactive";


        badge.className =
            "status-badge inactive";


        button.textContent =
            "Activate Property";


        updateActiveCount();


    } else {

        card.dataset.status = "active";


        const badge =
            card.querySelector(".status-badge");


        badge.textContent =
            "Active";


        badge.className =
            "status-badge active";


        button.textContent =
            "Deactivate Property";


        updateActiveCount();

    }

}


/* =========================================
   ACTIVE COUNT
========================================= */

function updateActiveCount() {

    const cards =
        document.querySelectorAll(
            ".owner-hostel-card"
        );


    let active = 0;


    cards.forEach(card => {

        if (
            card.dataset.status === "active"
        ) {

            active++;

        }

    });


    document.getElementById(
        "activeProperties"
    ).textContent = active;

}


/* =========================================
   DUPLICATE
========================================= */

function duplicateHostel(name) {

    const confirmed =
        confirm(
            `Create a copy of "${name}"?`
        );


    if (!confirmed) {
        return;
    }


    alert(
        "Property duplicated as a draft.\n\n" +
        "The backend will create the actual duplicate later."
    );

}


/* =========================================
   VERIFICATION
========================================= */

function checkVerification() {

    alert(
        "Verification Status\n\n" +
        "Your property has been submitted for verification.\n\n" +
        "Admin verification will be connected later."
    );

}


/* =========================================
   OWNER NOTIFICATIONS
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
        "This Owner module will be implemented next."
    );

}


/* =========================================
   LOGOUT
========================================= */

function ownerLogout(event) {

    if (event) {
        event.preventDefault();
    }


    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );


    window.location.href =
        "../owner-login.html";

}