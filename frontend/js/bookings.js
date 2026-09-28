/* =====================================================
   HOSTELVISION - CUSTOMER BOOKINGS
===================================================== */

const currentCustomer = {

    id: "demo-customer",

    name: "Rahul Kumar",

    email: "rahul@gmail.com"

};


let activeCustomerStatus = "all";


/* =====================================================
   FORMAT DATE
===================================================== */

function formatCustomerDate(date) {

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

function customerStatusName(status) {

    const names = {

        pending: "Pending",

        confirmed: "Confirmed",

        completed: "Completed",

        cancelled: "Cancelled"

    };


    return names[status] || status;

}


/* =====================================================
   GET CUSTOMER BOOKINGS
===================================================== */

function getMyBookings() {

    return getBookings().filter(
        booking =>
            booking.customerId ===
            currentCustomer.id
    );

}


/* =====================================================
   RENDER
===================================================== */

function renderCustomerBookings() {

    const container =
        document.getElementById(
            "bookingsContainer"
        );


    if (!container) {

        console.warn(
            "bookingsContainer not found"
        );

        return;

    }


    let bookings =
        getMyBookings();


    if (
        activeCustomerStatus !== "all"
    ) {

        bookings =
            bookings.filter(
                booking =>
                    booking.status ===
                    activeCustomerStatus
            );

    }


    container.innerHTML = "";


    if (
        bookings.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-calendar-xmark"></i>

                </div>

                <h3>
                    No bookings found
                </h3>

                <p>
                    Your hostel booking requests will appear here.
                </p>

            </div>

        `;

        return;

    }


    bookings.forEach(
        booking => {

            container.innerHTML += `

                <div class="customer-booking-card">

                    <div class="customer-booking-top">

                        <div>

                            <h3>
                                ${booking.property}
                            </h3>

                            <p>
                                ${booking.location}
                            </p>

                        </div>


                        <span
                            class="customer-booking-status ${booking.status}">

                            ${customerStatusName(
                                booking.status
                            )}

                        </span>

                    </div>


                    <div class="customer-booking-info">

                        <div>

                            <span>
                                Booking ID
                            </span>

                            <strong>
                                ${booking.id}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Room
                            </span>

                            <strong>
                                ${booking.room}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Check-in
                            </span>

                            <strong>
                                ${formatCustomerDate(
                                    booking.checkIn
                                )}
                            </strong>

                        </div>


                        <div>

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

                    </div>


                    <div class="customer-booking-bottom">

                        <span>

                            Requested
                            ${formatCustomerDate(
                                booking.created
                            )}

                        </span>


                        ${
                            booking.status === "pending"

                            ?

                            `

                            <button
                                onclick="cancelCustomerBooking('${booking.id}')">

                                Cancel Request

                            </button>

                            `

                            :

                            ""

                        }

                    </div>

                </div>

            `;

        }
    );

}


/* =====================================================
   CANCEL CUSTOMER BOOKING
===================================================== */

function cancelCustomerBooking(id) {

    const booking =
        findBooking(id);


    if (!booking) {

        return;

    }


    const confirmed =
        confirm(
            `Cancel booking ${id}?`
        );


    if (!confirmed) {

        return;

    }


    updateBooking(
        id,
        {
            status: "cancelled"
        }
    );


    renderCustomerBookings();


    alert(
        "Booking request cancelled."
    );

}


/* =====================================================
   TAB SUPPORT
===================================================== */

document
    .querySelectorAll(
        "[data-status]"
    )
    .forEach(
        tab => {

            tab.addEventListener(
                "click",
                function() {

                    activeCustomerStatus =
                        this.dataset.status;


                    document
                        .querySelectorAll(
                            "[data-status]"
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


                    renderCustomerBookings();

                }
            );

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCustomerBookings();

    }
);