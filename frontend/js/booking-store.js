/* =====================================================
   HOSTELVISION - SHARED BOOKING STORE
===================================================== */

const BOOKING_STORAGE_KEY = "hostelvisionBookings";


/* =====================================================
   DEFAULT BOOKINGS
===================================================== */

const defaultSharedBookings = [

    {
        id: "HV1001",
        customerId: "demo-customer",
        customer: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "9876543210",

        property: "UrbanNest Premium Hostel",
        location: "Madhapur, Hyderabad",

        room: "102",
        roomType: "Double Sharing",

        checkIn: "2026-10-01",
        checkOut: "2027-03-31",

        amount: 6500,

        payment: "paid",

        status: "pending",

        created: "2026-09-28T10:30:00"

    }

];


/* =====================================================
   GET BOOKINGS
===================================================== */

function getBookings() {

    const stored =
        localStorage.getItem(
            BOOKING_STORAGE_KEY
        );


    if (!stored) {

        localStorage.setItem(
            BOOKING_STORAGE_KEY,
            JSON.stringify(
                defaultSharedBookings
            )
        );


        return [
            ...defaultSharedBookings
        ];

    }


    try {

        return JSON.parse(stored);

    } catch (error) {

        console.error(
            "Booking storage error:",
            error
        );


        return [];

    }

}


/* =====================================================
   SAVE BOOKINGS
===================================================== */

function saveBookings(bookings) {

    localStorage.setItem(
        BOOKING_STORAGE_KEY,
        JSON.stringify(bookings)
    );

}


/* =====================================================
   CREATE BOOKING ID
===================================================== */

function generateBookingId() {

    const bookings =
        getBookings();


    let number =
        1001 + bookings.length;


    let id =
        `HV${number}`;


    while (
        bookings.some(
            booking =>
                booking.id === id
        )
    ) {

        number++;

        id =
            `HV${number}`;

    }


    return id;

}


/* =====================================================
   CREATE BOOKING
===================================================== */

function createBooking(data) {

    const bookings =
        getBookings();


    const booking = {

        id:
            data.id ||
            generateBookingId(),

        customerId:
            data.customerId ||
            "guest-customer",

        customer:
            data.customer ||
            "Customer",

        email:
            data.email ||
            "",

        phone:
            data.phone ||
            "",

        property:
            data.property ||
            "Unknown Property",

        location:
            data.location ||
            "",

        room:
            data.room ||
            "Not Assigned",

        roomType:
            data.roomType ||
            "Double Sharing",

        checkIn:
            data.checkIn ||
            "",

        checkOut:
            data.checkOut ||
            "",

        amount:
            Number(data.amount) || 0,

        payment:
            data.payment ||
            "pending",

        status:
            "pending",

        created:
            new Date().toISOString()

    };


    bookings.unshift(
        booking
    );


    saveBookings(
        bookings
    );


    return booking;

}


/* =====================================================
   FIND BOOKING
===================================================== */

function findBooking(id) {

    return getBookings().find(
        booking =>
            booking.id === id
    );

}


/* =====================================================
   UPDATE BOOKING
===================================================== */

function updateBooking(
    id,
    updates
) {

    const bookings =
        getBookings();


    const booking =
        bookings.find(
            item =>
                item.id === id
        );


    if (!booking) {

        return null;

    }


    Object.assign(
        booking,
        updates
    );


    saveBookings(
        bookings
    );


    return booking;

}


/* =====================================================
   DELETE BOOKING
===================================================== */

function deleteBooking(id) {

    const bookings =
        getBookings();


    const updated =
        bookings.filter(
            booking =>
                booking.id !== id
        );


    saveBookings(
        updated
    );

}


/* =====================================================
   CUSTOMER BOOKINGS
===================================================== */

function getCustomerBookings(
    customerId
) {

    return getBookings().filter(
        booking =>
            booking.customerId === customerId
    );

}