/* =====================================================
   HOSTELVISION - OWNER BOOKINGS
   SHARED BOOKING VERSION
===================================================== */


/* =====================================================
   ACTIVE TAB
===================================================== */

let activeStatus = "all";


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

    if (!date) {
        return "-";
    }


    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   STATUS NAME
===================================================== */

function getBookingStatusName(status) {

    const names = {

        pending: "Pending",

        confirmed: "Confirmed",

        completed: "Completed",

        cancelled: "Cancelled"

    };


    return names[status] || status;

}


/* =====================================================
   PAYMENT NAME
===================================================== */

function getPaymentName(payment) {

    const names = {

        paid: "Paid",

        pending: "Payment Pending",

        refunded: "Refunded"

    };


    return names[payment] || payment;

}


/* =====================================================
   GET FILTERED BOOKINGS
===================================================== */

function getFilteredBookings() {

    const bookings =
    window.ownerApiBookings || [];


    const search =
        document
            .getElementById("bookingSearch")
            .value
            .toLowerCase()
            .trim();


    const property =
        document
            .getElementById("propertyFilter")
            .value;


    const payment =
        document
            .getElementById("paymentFilter")
            .value;


    const sort =
        document
            .getElementById("sortBookings")
            .value;


    let result =
        bookings.filter(
            booking => {

                const matchesStatus =
                    activeStatus === "all"
                    ||
                    booking.status === activeStatus;


                const searchableText = `

                    ${booking.id}

                    ${booking.customer}

                    ${booking.email}

                    ${booking.phone}

                    ${booking.room}

                    ${booking.property}

                `.toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        search
                    );


                const matchesProperty =
                    property === "all"
                    ||
                    booking.property === property;


                const matchesPayment =
                    payment === "all"
                    ||
                    booking.payment === payment;


                return (

                    matchesStatus
                    &&
                    matchesSearch
                    &&
                    matchesProperty
                    &&
                    matchesPayment

                );

            }
        );


    /* SORT */

    if (sort === "newest") {

        result.sort(
            (a, b) =>
                new Date(b.created)
                -
                new Date(a.created)
        );

    }


    if (sort === "oldest") {

        result.sort(
            (a, b) =>
                new Date(a.created)
                -
                new Date(b.created)
        );

    }


    if (sort === "amount-high") {

        result.sort(
            (a, b) =>
                b.amount -
                a.amount
        );

    }


    if (sort === "amount-low") {

        result.sort(
            (a, b) =>
                a.amount -
                b.amount
        );

    }


    return result;

}


/* =====================================================
   RENDER
===================================================== */

function renderBookings() {

    const list =
        document.getElementById(
            "bookingsList"
        );


    const empty =
        document.getElementById(
            "bookingEmptyState"
        );


    const filtered =
        getFilteredBookings();


    list.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        empty.classList.add(
            "show"
        );

    } else {

        empty.classList.remove(
            "show"
        );


        filtered.forEach(
            booking => {

                list.appendChild(
                    createBookingCard(
                        booking
                    )
                );

            }
        );

    }


    document.getElementById(
        "bookingResultCount"
    ).textContent =

        `${filtered.length} booking${

            filtered.length !== 1
                ? "s"
                : ""

        }`;


    updateStatistics();

}


/* =====================================================
   CREATE CARD
===================================================== */

function createBookingCard(
    booking
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "booking-card";


    const initial =
        (
            booking.customer ||
            "C"
        )
        .charAt(0)
        .toUpperCase();


    let actions = `

        <button
            class="view-btn"
            onclick="viewBooking('${booking.id}')">

            <i class="fa-solid fa-eye"></i>

            View

        </button>

    `;


    if (
        booking.status === "pending"
    ) {

        actions += `

            <button
                class="accept-btn"
                onclick="acceptBooking('${booking.id}')">

                <i class="fa-solid fa-check"></i>

                Accept

            </button>


            <button
                class="reject-btn"
                onclick="rejectBooking('${booking.id}')">

                <i class="fa-solid fa-xmark"></i>

                Reject

            </button>

        `;

    }


    if (
        booking.status === "confirmed"
    ) {

        actions += `

            <button
                class="cancel-booking-btn"
                onclick="cancelBooking('${booking.id}')">

                <i class="fa-solid fa-ban"></i>

                Cancel

            </button>

        `;

    }


    card.innerHTML = `

        <div class="booking-card-top">

            <div class="booking-main-info">

                <div class="customer-avatar">

                    ${initial}

                </div>


                <div class="customer-info">

                    <h3>
                        ${booking.customer}
                    </h3>

                    <p>

                        ${booking.email}

                        &nbsp; • &nbsp;

                        ${booking.phone}

                    </p>

                </div>

            </div>


            <span
                class="booking-status ${booking.status}">

                ${getBookingStatusName(
                    booking.status
                )}

            </span>

        </div>


        <div class="booking-card-body">

            <div class="booking-info-grid">

                <div class="booking-info-item">

                    <span>
                        Booking ID
                    </span>

                    <strong>
                        ${booking.id}
                    </strong>

                </div>


                <div class="booking-info-item">

                    <span>
                        Property
                    </span>

                    <strong>

                        <i class="fa-solid fa-building"></i>

                        ${booking.property}

                    </strong>

                </div>


                <div class="booking-info-item">

                    <span>
                        Room
                    </span>

                    <strong>

                        Room ${booking.room}

                        ·

                        ${booking.roomType}

                    </strong>

                </div>


                <div class="booking-info-item">

                    <span>
                        Stay Period
                    </span>

                    <strong>

                        ${formatDate(
                            booking.checkIn
                        )}

                        -

                        ${formatDate(
                            booking.checkOut
                        )}

                    </strong>

                </div>

            </div>


            <div style="
                margin-top:12px;
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">

                <span
                    class="payment-badge ${booking.payment}">

                    <i class="fa-solid fa-circle-check"></i>

                    ${getPaymentName(
                        booking.payment
                    )}

                </span>


                <strong style="
                    color:#172033;
                    font-size:16px;
                ">

                    ₹${Number(
                        booking.amount
                    ).toLocaleString(
                        "en-IN"
                    )}

                </strong>

            </div>

        </div>


        <div class="booking-card-footer">

            <span class="booking-created">

                Requested

                ${formatDate(
                    booking.created
                )}

            </span>


            <div class="booking-actions">

                ${actions}

            </div>

        </div>

    `;


    return card;

}


/* =====================================================
   STATISTICS
===================================================== */

function updateStatistics() {

    const bookings =
        getBookings();


    const total =
        bookings.length;


    const pending =
        bookings.filter(
            b =>
                b.status === "pending"
        ).length;


    const confirmed =
        bookings.filter(
            b =>
                b.status === "confirmed"
        ).length;


    const completed =
        bookings.filter(
            b =>
                b.status === "completed"
        ).length;


    const cancelled =
        bookings.filter(
            b =>
                b.status === "cancelled"
        ).length;


    const revenue =
        bookings
            .filter(
                b =>
                    b.payment === "paid"
                    &&
                    b.status !== "cancelled"
            )
            .reduce(
                (
                    total,
                    booking
                ) =>
                    total +
                    Number(
                        booking.amount
                    ),
                0
            );


    document.getElementById(
        "totalBookings"
    ).textContent =
        total;


    document.getElementById(
        "pendingBookings"
    ).textContent =
        pending;


    document.getElementById(
        "confirmedBookings"
    ).textContent =
        confirmed;


    document.getElementById(
        "bookingRevenue"
    ).textContent =
        `₹${revenue.toLocaleString(
            "en-IN"
        )}`;


    document.getElementById(
        "allCount"
    ).textContent =
        total;


    document.getElementById(
        "pendingTabCount"
    ).textContent =
        pending;


    document.getElementById(
        "confirmedTabCount"
    ).textContent =
        confirmed;


    document.getElementById(
        "completedTabCount"
    ).textContent =
        completed;


    document.getElementById(
        "cancelledTabCount"
    ).textContent =
        cancelled;

}


/* =====================================================
   TABS
===================================================== */

document
    .querySelectorAll(
        ".booking-tab"
    )
    .forEach(
        tab => {

            tab.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(
                            ".booking-tab"
                        )
                        .forEach(
                            item =>
                                item.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    this.classList.add(
                        "active"
                    );


                    activeStatus =
                        this.dataset.status;


                    renderBookings();

                }
            );

        }
    );


/* =====================================================
   FILTER EVENTS
===================================================== */

document
    .getElementById(
        "bookingSearch"
    )
    .addEventListener(
        "input",
        renderBookings
    );


document
    .getElementById(
        "propertyFilter"
    )
    .addEventListener(
        "change",
        renderBookings
    );


document
    .getElementById(
        "paymentFilter"
    )
    .addEventListener(
        "change",
        renderBookings
    );


document
    .getElementById(
        "sortBookings"
    )
    .addEventListener(
        "change",
        renderBookings
    );


/* =====================================================
   CLEAR
===================================================== */

function clearBookingFilters() {

    document.getElementById(
        "bookingSearch"
    ).value = "";


    document.getElementById(
        "propertyFilter"
    ).value = "all";


    document.getElementById(
        "paymentFilter"
    ).value = "all";


    document.getElementById(
        "sortBookings"
    ).value = "newest";


    activeStatus = "all";


    document
        .querySelectorAll(
            ".booking-tab"
        )
        .forEach(
            tab =>
                tab.classList.remove(
                    "active"
                )
        );


    document
        .querySelector(
            '.booking-tab[data-status="all"]'
        )
        .classList.add(
            "active"
        );


    renderBookings();

}


/* =====================================================
   VIEW
===================================================== */

function viewBooking(id) {

    const booking =
        (window.ownerApiBookings || [])
            .find(
                booking => String(booking.id) === String(id)
            );

    if (!booking) {

        return;

    }


    document.getElementById(
        "modalBookingId"
    ).textContent =
        `Booking #${booking.id}`;


    const content =
        document.getElementById(
            "bookingDetailsContent"
        );


    content.innerHTML = `

        <div class="details-status-row">

            <strong>
                ${booking.customer}
            </strong>

            <span
                class="booking-status ${booking.status}">

                ${getBookingStatusName(
                    booking.status
                )}

            </span>

        </div>


        <div class="details-section">

            <h3>
                Customer Information
            </h3>


            <div class="details-grid">

                <div class="detail-box">

                    <span>
                        Full Name
                    </span>

                    <strong>
                        ${booking.customer}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Phone
                    </span>

                    <strong>
                        ${booking.phone || "-"}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Email
                    </span>

                    <strong>
                        ${booking.email || "-"}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Booking ID
                    </span>

                    <strong>
                        ${booking.id}
                    </strong>

                </div>

            </div>

        </div>


        <div class="details-section">

            <h3>
                Property & Room
            </h3>


            <div class="details-grid">

                <div class="detail-box">

                    <span>
                        Property
                    </span>

                    <strong>
                        ${booking.property}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Location
                    </span>

                    <strong>
                        ${booking.location || "-"}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Room
                    </span>

                    <strong>
                        Room ${booking.room}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Room Type
                    </span>

                    <strong>
                        ${booking.roomType}
                    </strong>

                </div>

            </div>

        </div>


        <div class="details-section">

            <h3>
                Stay & Payment
            </h3>


            <div class="details-grid">

                <div class="detail-box">

                    <span>
                        Check-in
                    </span>

                    <strong>
                        ${formatDate(
                            booking.checkIn
                        )}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Check-out
                    </span>

                    <strong>
                        ${formatDate(
                            booking.checkOut
                        )}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Monthly Rent
                    </span>

                    <strong>
                        ₹${Number(
                            booking.amount
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <div class="detail-box">

                    <span>
                        Payment
                    </span>

                    <strong>
                        ${getPaymentName(
                            booking.payment
                        )}
                    </strong>

                </div>

            </div>

        </div>


        ${
            booking.status === "pending"

            ?

            `

            <div class="details-actions">

                <button
                    class="reject-btn"
                    onclick="rejectBooking('${booking.id}')">

                    Reject

                </button>


                <button
                    class="accept-btn"
                    onclick="acceptBooking('${booking.id}')">

                    Accept Booking

                </button>

            </div>

            `

            :

            ""

        }

    `;


    document
        .getElementById(
            "bookingDetailsModal"
        )
        .classList.add(
            "show"
        );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeBookingDetails() {

    document
        .getElementById(
            "bookingDetailsModal"
        )
        .classList.remove(
            "show"
        );

}


/* =====================================================
   ACCEPT BOOKING
===================================================== */

async function acceptBooking(id) {

    const booking =
        (window.ownerApiBookings || [])
            .find(
                booking => String(booking.id) === String(id)
            );

    if (!booking) {
        return;
    }

    const confirmed =
        confirm(
            `Accept booking ${booking.id} for ${booking.customer}?`
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/bookings/${id}/confirm`,
            {
                method: "PUT"
            }
        );

        alert(
            `Booking ${id} is now confirmed.`
        );

        const bookings =
            await apiRequest("/bookings/owner");

        window.ownerApiBookings =
            bookings.map(booking => ({

                id: booking.id,

                customer:
                    booking.customerName,

                email: "",

                phone: "",

                property:
                    booking.hostelName,

                location: "",

                room:
                    booking.roomNumber,

                roomType:
                    booking.roomType,

                checkIn:
                    booking.checkInDate,

                checkOut:
                    booking.checkOutDate,

                amount:
                    booking.monthlyRent,

                payment:
                    "pending",

                status:
                    booking.status.toLowerCase(),

                created:
                    new Date().toISOString()

            }));

        closeBookingDetails();
        renderBookings();

    } catch (error) {

        console.error(
            "Accept booking error:",
            error
        );

        alert(
            "Unable to confirm booking: " +
            error.message
        );

    }

}

/* =====================================================
   REJECT BOOKING
===================================================== */

async function rejectBooking(id) {

    const booking =
        (window.ownerApiBookings || [])
            .find(
                booking => String(booking.id) === String(id)
            );

    if (!booking) {
        return;
    }

    const confirmed =
        confirm(
            `Reject booking ${booking.id}?`
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/bookings/${id}/cancel`,
            {
                method: "PUT"
            }
        );

        alert(
            `Booking ${id} has been rejected.`
        );

        const bookings =
            await apiRequest("/bookings/owner");

        window.ownerApiBookings =
            bookings.map(booking => ({

                id: booking.id,

                customer:
                    booking.customerName,

                email: "",

                phone: "",

                property:
                    booking.hostelName,

                location: "",

                room:
                    booking.roomNumber,

                roomType:
                    booking.roomType,

                checkIn:
                    booking.checkInDate,

                checkOut:
                    booking.checkOutDate,

                amount:
                    booking.monthlyRent,

                payment:
                    "pending",

                status:
                    booking.status.toLowerCase(),

                created:
                    new Date().toISOString()

            }));

        closeBookingDetails();
        renderBookings();

    } catch (error) {

        console.error(
            "Reject booking error:",
            error
        );

        alert(
            "Unable to reject booking: " +
            error.message
        );

    }

}


/* =====================================================
   CANCEL
===================================================== */

async function cancelBooking(id) {

    const booking =
        (window.ownerApiBookings || [])
            .find(
                booking => String(booking.id) === String(id)
            );

    if (!booking) {
        return;
    }

    const confirmed =
        confirm(
            `Cancel booking ${booking.id}?`
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/bookings/${id}/cancel`,
            {
                method: "PUT"
            }
        );

        alert(
            `Booking ${id} has been cancelled.`
        );

        const bookings =
            await apiRequest("/bookings/owner");

        window.ownerApiBookings =
            bookings.map(booking => ({

                id: booking.id,

                customer:
                    booking.customerName,

                email: "",

                phone: "",

                property:
                    booking.hostelName,

                location: "",

                room:
                    booking.roomNumber,

                roomType:
                    booking.roomType,

                checkIn:
                    booking.checkInDate,

                checkOut:
                    booking.checkOutDate,

                amount:
                    booking.monthlyRent,

                payment:
                    "pending",

                status:
                    booking.status.toLowerCase(),

                created:
                    new Date().toISOString()

            }));

        renderBookings();

    } catch (error) {

        console.error(
            "Cancel booking error:",
            error
        );

        alert(
            "Unable to cancel booking: " +
            error.message
        );

    }

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


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );


    window.location.href =
        "../owner-login.html";

}


/* =====================================================
   OUTSIDE CLICK
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "bookingDetailsModal"
            );


        if (
            event.target === modal
        ) {

            closeBookingDetails();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        try {

            const bookings =
                await apiRequest("/bookings/owner");

            window.ownerApiBookings =
                bookings.map(booking => ({

                    id: booking.id,

                    customer:
                        booking.customerName,

                    email: "",

                    phone: "",

                    property:
                        booking.hostelName,

                    location: "",

                    room:
                        booking.roomNumber,

                    roomType:
                        booking.roomType,

                    checkIn:
                        booking.checkInDate,

                    checkOut:
                        booking.checkOutDate,

                    amount:
                        booking.monthlyRent,

                    payment:
                        "pending",

                    status:
                        booking.status.toLowerCase(),

                    created:
                        new Date().toISOString()

                }));

            renderBookings();

        } catch (error) {

            console.error(
                "Owner bookings error:",
                error
            );

            alert(
                "Unable to load bookings: " +
                error.message
            );

        }

    }
);