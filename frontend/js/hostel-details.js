/* =========================================================
   HOSTEL DETAILS
========================================================= */


/* =========================================================
   SAVE BUTTON
========================================================= */

const saveButton =
    document.getElementById("saveButton");

saveButton.addEventListener(
    "click",
    function () {

        this.classList.toggle("active");

        if (this.classList.contains("active")) {

            this.innerHTML = "♥ Saved";

        } else {

            this.innerHTML = "♡ Save";

        }

    }
);


/* =========================================================
   SHARE
========================================================= */

const shareButton =
    document.getElementById("shareButton");

shareButton.addEventListener(
    "click",
    async function () {

        const shareData = {

            title:
                "UrbanNest Premium Hostel - HostelVision",

            text:
                "Check out this hostel on HostelVision.",

            url:
                window.location.href

        };


        if (
            navigator.share
        ) {

            try {

                await navigator.share(
                    shareData
                );

            } catch (error) {

                console.log(
                    "Share cancelled"
                );

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert(
                    "Hostel link copied!"
                );

            } catch {

                alert(
                    "Copy this page URL to share it."
                );

            }

        }

    }
);


/* =========================================================
   MODAL
========================================================= */

const modal =
    document.getElementById("requestModal");

const closeModal =
    document.getElementById("closeModal");

const bookButton =
    document.getElementById("bookButton");


function openModal(
    room = "Double Sharing",
    roomId = "2"
) {

    document.getElementById(
        "selectedRoom"
    ).value = room;

    document.getElementById(
        "selectedRoom"
    ).dataset.roomId = roomId;

    modal.classList.add("show");

}


function closeRequestModal() {

    modal.classList.remove("show");

}


bookButton.addEventListener(
    "click",
    function () {

        openModal();

    }
);


closeModal.addEventListener(
    "click",
    closeRequestModal
);


/* Click outside modal */

modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            closeRequestModal();

        }

    }
);


/* =========================================================
   ROOM REQUEST BUTTONS
========================================================= */


document
    .querySelectorAll(".request-btn")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const room =
                        this.dataset.room;

                    const roomId =
                        this.dataset.roomId;

                    openModal(
                        room,
                        roomId
                    );

                }
            );

        }
    );


/* =========================================================
   REQUEST FORM
========================================================= */

const requestForm =
    document.getElementById("requestForm");

requestForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const name =
            document.getElementById(
                "studentName"
            ).value.trim();

        const phone =
            document.getElementById(
                "studentPhone"
            ).value.trim();

        const room =
            document.getElementById(
                "selectedRoom"
            ).value;

        const roomId =
            document.getElementById(
                "selectedRoom"
            ).dataset.roomId;

        if (
            name === "" ||
            phone === ""
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;
        }

        if (!roomId) {

            alert(
                "Please select a room."
            );

            return;
        }

        try {

            const today =
                new Date();

            const checkInDate =
                today.toISOString()
                    .split("T")[0];

            const checkOut =
                new Date(today);

            checkOut.setMonth(
                checkOut.getMonth() + 6
            );

            const checkOutDate =
                checkOut.toISOString()
                    .split("T")[0];

            await apiRequest(
                "/bookings",
                {
                    method: "POST",

                    body: JSON.stringify({

                        roomId:
                            Number(roomId),

                        bedsBooked: 1,

                        checkInDate:
                            checkInDate,

                        checkOutDate:
                            checkOutDate

                    })
                }
            );

            alert(
                "Booking request sent successfully!"
            );

            requestForm.reset();

            closeRequestModal();

        } catch (error) {

            alert(
                error.message
            );

        }

    }
);

/* =========================================================
   CONTACT OWNER
========================================================= */

document
    .getElementById("contactOwner")
    .addEventListener(
        "click",
        function () {

            alert(
                "Owner contact will be available after login."
            );

        }
    );


/* =========================================================
   GET DIRECTIONS
========================================================= */

const directionButton =
    document.querySelector(
        ".map-placeholder button"
    );

directionButton.addEventListener(
    "click",
    function () {

        const location =
            "Madhapur, Hyderabad, Telangana";

        const mapsUrl =
            "https://www.google.com/maps/search/?api=1&query="
            + encodeURIComponent(location);

        window.open(
            mapsUrl,
            "_blank"
        );

    }
);