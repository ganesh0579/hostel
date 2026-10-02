/* =========================================
   OWNER DASHBOARD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadOwnerDashboard();

});


/* =========================================
   LOAD OWNER DASHBOARD
========================================= */

async function loadOwnerDashboard() {

    try {

        const user = await apiRequest("/users/profile");

        if (user.role !== "OWNER") {
            alert("Access denied.");
            window.location.href = "../owner-login.html";
            return;
        }

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        console.log("Owner profile loaded:", user);
        const hostels = await apiRequest(
    "/hostels/owner/" + user.id
);

document.getElementById("totalHostels").textContent =
    hostels.length;
let totalRooms = 0;

for (const hostel of hostels) {

    const rooms = await apiRequest(
        "/rooms/hostel/" + hostel.id
    );

    totalRooms += rooms.length;
}

document.getElementById("totalRooms").textContent =
    totalRooms;
const bookings = await apiRequest(
    "/bookings/owner"
);

const pendingBookings =
    bookings.filter(
        booking => booking.status === "PENDING"
    );

document.getElementById("bookingRequests").textContent =
    pendingBookings.length;
    const recentContainer =
    document.getElementById("recentBookingRequests");

const recentBookings =
    pendingBookings.slice(0, 3);

recentContainer.innerHTML = "";

recentBookings.forEach(booking => {

    const initials =
        booking.customerName
            ? booking.customerName
                .split(" ")
                .map(name => name[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "CU";

    const item = document.createElement("div");

    item.className = "booking-request";

    item.innerHTML = `
        <div class="customer-avatar">
            ${initials}
        </div>

        <div class="booking-customer">

            <strong>
                ${booking.customerName}
            </strong>

            <span>
                ${booking.hostelName}
            </span>

            <small>
                ${booking.roomType} · ${booking.checkInDate}
            </small>

        </div>

        <span class="request-status pending">
            Pending
        </span>
    `;

    recentContainer.appendChild(item);

});
    } 
    
    catch (error) {

        console.error(
            "Owner dashboard error:",
            error
        );

        alert(
    "Owner dashboard error: " +
    error.message
);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href =
            "../owner-login.html";
    }

}


/* =========================================
   NOTIFICATIONS
========================================= */

function showOwnerNotifications() {

    alert(
        "Owner Notifications\n\n" +
        "Notifications module will be connected to the backend."
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
        "This module will be connected to the backend next."
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

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );

    window.location.href =
        "../owner-login.html";

}