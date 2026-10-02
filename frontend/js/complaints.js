/* =========================================
   COMPLAINTS PAGE
========================================= */

let complaints = [];


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        setupComplaintTabs();

        setupComplaintForm();

        await loadComplaints();

    }
);


/* =========================================
   LOAD COMPLAINTS FROM BACKEND
========================================= */

async function loadComplaints() {

    try {

        complaints =
            await apiRequest("/complaints/my");

        console.log(
            "Customer complaints:",
            complaints
        );

        renderComplaints();

    } catch (error) {

        console.error(
            "Failed to load complaints:",
            error
        );

        alert(
            "Unable to load complaints."
        );

    }

}


/* =========================================
   RENDER COMPLAINTS
========================================= */

function renderComplaints() {

   const container =
    document.getElementById(
        "complaintsList"
    );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    complaints.forEach(
        complaint => {

            const status =
                normalizeStatus(
                    complaint.status
                );


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "complaint-card";

            card.dataset.id =
                complaint.id;

            card.dataset.status =
                status;


            card.innerHTML = `

                <div class="complaint-title-area">

                    <div>

                        <h3>
                            ${escapeHtml(
                                complaint.subject
                            )}
                        </h3>

                        <p>
                            Hostel #${complaint.hostelId}
                        </p>

                    </div>

                    <span class="status-badge ${getStatusClass(status)}">

                        ${getStatusText(status)}

                    </span>

                </div>


                <div class="complaint-description">

                    <p>
                        ${escapeHtml(
                            complaint.description
                        )}
                    </p>

                </div>


                <div class="complaint-meta">

                    <span>
                        📅 ${formatDate(
                            complaint.createdAt
                        )}
                    </span>

                    <span>
                        ⚡ ${getCategoryFromSubject(
                            complaint.subject
                        )}
                    </span>

                </div>


                <button
                    class="view-complaint-btn"
                    onclick="viewComplaint('${complaint.id}')">

                    View Complaint

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );


    updateComplaintStats();

    filterComplaints("all");

}


/* =========================================
   TABS
========================================= */

function setupComplaintTabs() {

    const tabs =
        document.querySelectorAll(
            ".complaint-tab"
        );


    tabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                function () {

                    tabs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    const status =
                        this.dataset.status;


                    filterComplaints(
                        status
                    );

                }
            );

        }
    );

}


/* =========================================
   FILTER
========================================= */

function filterComplaints(status) {

    const cards =
        document.querySelectorAll(
            ".complaint-card"
        );


    let visibleCount = 0;


    cards.forEach(
        card => {

            const cardStatus =
                card.dataset.status;


            if (
                status === "all" ||
                cardStatus === status
            ) {

                card.style.display =
                    "block";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    const emptyState =
        document.getElementById(
            "emptyComplaints"
        );


    if (emptyState) {

        emptyState.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


/* =========================================
   UPDATE STATS
========================================= */

function updateComplaintStats() {

    const total =
        complaints.length;


    const open =
        complaints.filter(
            complaint =>
                normalizeStatus(
                    complaint.status
                ) === "open"
        ).length;


    const progress =
        complaints.filter(
            complaint =>
                normalizeStatus(
                    complaint.status
                ) === "progress"
        ).length;


    const resolved =
        complaints.filter(
            complaint =>
                normalizeStatus(
                    complaint.status
                ) === "resolved"
        ).length;


    const totalElement =
        document.getElementById(
            "totalComplaints"
        );

    const openElement =
        document.getElementById(
            "openComplaints"
        );

    const progressElement =
        document.getElementById(
            "progressComplaints"
        );

    const resolvedElement =
        document.getElementById(
            "resolvedComplaints"
        );


    if (totalElement) {
        totalElement.textContent =
            total;
    }

    if (openElement) {
        openElement.textContent =
            open;
    }

    if (progressElement) {
        progressElement.textContent =
            progress;
    }

    if (resolvedElement) {
        resolvedElement.textContent =
            resolved;
    }

}


/* =========================================
   OPEN COMPLAINT MODAL
========================================= */

function openComplaintModal() {

    document
        .getElementById(
            "complaintModal"
        )
        .classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE COMPLAINT MODAL
========================================= */

function closeComplaintModal() {

    document
        .getElementById(
            "complaintModal"
        )
        .classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =========================================
   FORM SUBMIT
========================================= */

function setupComplaintForm() {

    const form =
        document.getElementById(
            "complaintForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const category =
                document.getElementById(
                    "complaintCategory"
                ).value;

            const hostel =
                document.getElementById(
                    "complaintHostel"
                ).value;

            const subject =
                document.getElementById(
                    "complaintSubject"
                ).value.trim();

            const description =
                document.getElementById(
                    "complaintDescription"
                ).value.trim();


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

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            try {

                await apiRequest(
                    "/complaints",
                    {
                        method: "POST",

                        body: JSON.stringify({

                            hostelId:
                                Number(hostel),

                            subject:
                                subject,

                            description:
                                description

                        })

                    }
                );


                alert(
                    "Complaint submitted successfully!"
                );


                form.reset();

                closeComplaintModal();


                await loadComplaints();


            } catch (error) {

                console.error(
                    "Complaint submission failed:",
                    error
                );

                alert(
                    error.message
                );

            }

        }
    );

}


/* =========================================
   VIEW COMPLAINT
========================================= */

function viewComplaint(id) {

    const complaint =
        complaints.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!complaint) {
        return;
    }


    document.getElementById(
        "detailId"
    ).textContent =
        complaint.id;


    document.getElementById(
        "detailSubject"
    ).textContent =
        complaint.subject;


    document.getElementById(
        "detailHostel"
    ).textContent =
        "Hostel #" +
        complaint.hostelId;


    document.getElementById(
        "detailDate"
    ).textContent =
        formatDate(
            complaint.createdAt
        );


    document.getElementById(
        "detailPriority"
    ).textContent =
        getCategoryFromSubject(
            complaint.subject
        );


    document.getElementById(
        "detailDescription"
    ).textContent =
        complaint.description;


    const detailStatus =
        document.getElementById(
            "detailStatus"
        );


    const status =
        normalizeStatus(
            complaint.status
        );


    detailStatus.textContent =
        getStatusText(status);


    detailStatus.className =
        "status-badge " +
        getStatusClass(status);


    document.getElementById(
        "detailCategory"
    ).textContent =
        getCategoryFromSubject(
            complaint.subject
        );


    document
        .getElementById(
            "detailsModal"
        )
        .classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   STATUS HELPERS
========================================= */

function normalizeStatus(status) {

    if (!status) {
        return "open";
    }


    const value =
        status.toLowerCase();


    if (
        value === "in_progress" ||
        value === "in-progress" ||
        value === "progress"
    ) {

        return "progress";

    }


    if (value === "resolved") {

        return "resolved";

    }


    return "open";

}


function getStatusText(status) {

    const map = {

        open:
            "Open",

        progress:
            "In Progress",

        resolved:
            "Resolved"

    };


    return map[status] ||
        status;

}


function getStatusClass(status) {

    const map = {

        open:
            "status-open",

        progress:
            "status-progress",

        resolved:
            "status-resolved"

    };


    return map[status] ||
        "";

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date) {

    if (!date) {
        return "-";
    }


    return new Date(date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}


/* =========================================
   CATEGORY
========================================= */

function getCategoryFromSubject(subject) {

    const text =
        subject.toLowerCase();


    if (text.includes("water")) {
        return "Water Supply";
    }


    if (
        text.includes("wifi") ||
        text.includes("wi-fi")
    ) {

        return "Wi-Fi / Internet";

    }


    if (text.includes("clean")) {
        return "Cleaning";
    }


    if (
        text.includes("light") ||
        text.includes("electric")
    ) {

        return "Electricity";

    }


    if (text.includes("food")) {
        return "Food";
    }


    return "Maintenance";

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   CLOSE DETAILS
========================================= */

function closeDetailsModal() {

    document
        .getElementById(
            "detailsModal"
        )
        .classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =========================================
   NOTIFICATIONS
========================================= */

function showNotifications() {

    alert(
        "Notifications will be connected to the backend later."
    );

}


/* =========================================
   LOGOUT
========================================= */

function logout(event) {

    if (event) {
        event.preventDefault();
    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "../login.html";

    }

}


/* =========================================
   CLOSE MODALS
========================================= */

window.addEventListener(
    "click",
    function (event) {

        const complaintModal =
            document.getElementById(
                "complaintModal"
            );

        const detailsModal =
            document.getElementById(
                "detailsModal"
            );


        if (
            event.target ===
            complaintModal
        ) {

            closeComplaintModal();

        }


        if (
            event.target ===
            detailsModal
        ) {

            closeDetailsModal();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeComplaintModal();

            closeDetailsModal();

        }

    }
);