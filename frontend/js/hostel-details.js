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


function openModal(room = "Double Sharing") {

    document.getElementById(
        "selectedRoom"
    ).value = room;

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

                    openModal(room);

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
    function (event) {

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


        if (
            name === "" ||
            phone === ""
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        /*
         * TEMPORARY FRONTEND BEHAVIOUR
         *
         * Later:
         *
         * Form
         *   ↓
         * JavaScript
         *   ↓
         * POST /api/booking-requests
         *   ↓
         * Spring Boot
         *   ↓
         * MySQL
         *
         */


        alert(
            `Request sent successfully!\n\n` +
            `Name: ${name}\n` +
            `Room: ${room}\n\n` +
            `The hostel owner will contact you.`
        );


        requestForm.reset();

        closeRequestModal();

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