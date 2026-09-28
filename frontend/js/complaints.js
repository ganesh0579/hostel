/* =========================================
   COMPLAINTS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupComplaintTabs();

    setupComplaintForm();

    updateComplaintStats();

});


/* =========================================
   TABS
========================================= */

function setupComplaintTabs() {

    const tabs = document.querySelectorAll(".complaint-tab");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            const status = this.dataset.status;

            filterComplaints(status);

        });

    });

}


function filterComplaints(status) {

    const cards = document.querySelectorAll(".complaint-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const cardStatus = card.dataset.status;

        if (status === "all" || cardStatus === status) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    const emptyState =
        document.getElementById("emptyComplaints");

    if (visibleCount === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* =========================================
   UPDATE STATS
========================================= */

function updateComplaintStats() {

    const cards =
        document.querySelectorAll(".complaint-card");

    let open = 0;
    let progress = 0;
    let resolved = 0;

    cards.forEach(card => {

        const status = card.dataset.status;

        if (status === "open") {
            open++;
        }

        if (status === "progress") {
            progress++;
        }

        if (status === "resolved") {
            resolved++;
        }

    });


    document.getElementById("totalComplaints").textContent =
        cards.length;

    document.getElementById("openComplaints").textContent =
        open;

    document.getElementById("progressComplaints").textContent =
        progress;

    document.getElementById("resolvedComplaints").textContent =
        resolved;

}


/* =========================================
   OPEN COMPLAINT MODAL
========================================= */

function openComplaintModal() {

    const modal =
        document.getElementById("complaintModal");

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE COMPLAINT MODAL
========================================= */

function closeComplaintModal() {

    const modal =
        document.getElementById("complaintModal");

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================
   FORM SUBMIT
========================================= */

function setupComplaintForm() {

    const form =
        document.getElementById("complaintForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const category =
            document.getElementById("complaintCategory").value;

        const hostel =
            document.getElementById("complaintHostel").value;

        const subject =
            document.getElementById("complaintSubject").value.trim();

        const description =
            document.getElementById("complaintDescription").value.trim();

        const priority =
            document.querySelector(
                'input[name="priority"]:checked'
            );


        if (
            !category ||
            !hostel ||
            !subject ||
            !description ||
            !priority
        ) {

            alert("Please fill all required fields.");

            return;

        }


        const complaintId =
            "CMP-" +
            Math.floor(1000 + Math.random() * 9000);


        alert(
            "Complaint submitted successfully!\n\n" +
            "Complaint ID: " + complaintId
        );


        form.reset();

        closeComplaintModal();


        /*
         * Temporary frontend behavior.
         *
         * Later this will become:
         *
         * POST /api/complaints
         *
         * and the complaint will be stored
         * in MySQL through Spring Boot.
         */

    });

}


/* =========================================
   VIEW COMPLAINT
========================================= */

function viewComplaint(id) {

    const cards =
        document.querySelectorAll(".complaint-card");

    let selectedCard = null;

    cards.forEach(card => {

        if (card.dataset.id === id) {

            selectedCard = card;

        }

    });


    if (!selectedCard) {
        return;
    }


    const subject =
        selectedCard.querySelector("h3").textContent.trim();

    const hostel =
        selectedCard.querySelector(
            ".complaint-title-area p"
        ).textContent.trim();

    const statusElement =
        selectedCard.querySelector(".status-badge");

    const status =
        statusElement.textContent.trim();

    const description =
        selectedCard.querySelector(
            ".complaint-description p"
        ).textContent.trim();

    const meta =
        selectedCard.querySelectorAll(
            ".complaint-meta span"
        );

    const date =
        meta.length > 0
            ? meta[0].textContent.replace("📅", "").trim()
            : "";

    const priority =
        meta.length > 1
            ? meta[1].textContent.replace("⚡", "").trim()
            : "";


    document.getElementById("detailId").textContent =
        id;

    document.getElementById("detailSubject").textContent =
        subject;

    document.getElementById("detailHostel").textContent =
        hostel;

    document.getElementById("detailDate").textContent =
        date;

    document.getElementById("detailPriority").textContent =
        priority;

    document.getElementById("detailDescription").textContent =
        description;


    const detailStatus =
        document.getElementById("detailStatus");

    detailStatus.textContent = status;


    detailStatus.className = "status-badge";


    if (selectedCard.dataset.status === "open") {

        detailStatus.classList.add("status-open");

    } else if (selectedCard.dataset.status === "progress") {

        detailStatus.classList.add("status-progress");

    } else {

        detailStatus.classList.add("status-resolved");

    }


    const category =
        getCategoryFromSubject(subject);

    document.getElementById("detailCategory").textContent =
        category;


    document
        .getElementById("detailsModal")
        .classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CATEGORY
========================================= */

function getCategoryFromSubject(subject) {

    const text = subject.toLowerCase();

    if (text.includes("water")) {
        return "Water Supply";
    }

    if (text.includes("wifi") || text.includes("wi-fi")) {
        return "Wi-Fi / Internet";
    }

    if (text.includes("clean")) {
        return "Cleaning";
    }

    if (text.includes("light") ||
        text.includes("electric")) {
        return "Electricity";
    }

    if (text.includes("food")) {
        return "Food";
    }

    return "Maintenance";

}


/* =========================================
   CLOSE DETAILS
========================================= */

function closeDetailsModal() {

    document
        .getElementById("detailsModal")
        .classList.remove("show");

    document.body.style.overflow = "";

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
   LOGOUT
========================================= */

function logout(event) {

    event.preventDefault();

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        window.location.href =
            "../login.html";

    }

}


/* =========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener("click", function (event) {

    const complaintModal =
        document.getElementById("complaintModal");

    const detailsModal =
        document.getElementById("detailsModal");


    if (event.target === complaintModal) {

        closeComplaintModal();

    }


    if (event.target === detailsModal) {

        closeDetailsModal();

    }

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeComplaintModal();

        closeDetailsModal();

    }

});