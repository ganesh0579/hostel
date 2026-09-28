/* =========================================
   ADD HOSTEL
========================================= */

let selectedPhotos = [];


document.addEventListener("DOMContentLoaded", function () {

    setupDescriptionCounter();

    setupPhotoUpload();

    setupHostelForm();

});


/* =========================================
   DESCRIPTION COUNTER
========================================= */

function setupDescriptionCounter() {

    const textarea =
        document.getElementById("description");

    const counter =
        document.querySelector(".character-count");


    textarea.addEventListener("input", function () {

        counter.textContent =
            `${textarea.value.length} / 1000`;

    });

}


/* =========================================
   PHOTO UPLOAD
========================================= */

function setupPhotoUpload() {

    const input =
        document.getElementById("photoInput");


    input.addEventListener("change", function () {

        const files =
            Array.from(input.files);


        if (selectedPhotos.length + files.length > 8) {

            showFormMessage(
                "You can upload a maximum of 8 photos.",
                "error"
            );

            return;

        }


        files.forEach(file => {

            if (!file.type.startsWith("image/")) {
                return;
            }


            if (file.size > 5 * 1024 * 1024) {

                showFormMessage(
                    `${file.name} is larger than 5MB.`,
                    "error"
                );

                return;

            }


            selectedPhotos.push(file);

        });


        renderPhotoPreview();

        input.value = "";

    });

}


/* =========================================
   PHOTO PREVIEW
========================================= */

function renderPhotoPreview() {

    const preview =
        document.getElementById("photoPreview");

    preview.innerHTML = "";


    selectedPhotos.forEach((file, index) => {

        const reader =
            new FileReader();


        reader.onload = function (event) {

            const item =
                document.createElement("div");

            item.className =
                "photo-item";


            item.innerHTML = `

                <img
                    src="${event.target.result}"
                    alt="Property photo">

                <button
                    type="button"
                    class="remove-photo"
                    onclick="removePhoto(${index})">

                    ×

                </button>

            `;


            preview.appendChild(item);

        };


        reader.readAsDataURL(file);

    });

}


/* =========================================
   REMOVE PHOTO
========================================= */

function removePhoto(index) {

    selectedPhotos.splice(index, 1);

    renderPhotoPreview();

}


/* =========================================
   FORM SUBMIT
========================================= */

function setupHostelForm() {

    const form =
        document.getElementById("addHostelForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        if (!validateHostelForm()) {
            return;
        }


        const hostel =
            collectHostelData();


        console.log(
            "Hostel data:",
            hostel
        );


        showFormMessage(
            "Hostel published successfully! Your property is now under verification.",
            "success"
        );


        /*
         * Temporary frontend implementation.
         *
         * Later:
         *
         * POST /api/owner/hostels
         *
         * Spring Boot
         *       ↓
         * MySQL
         *
         * Photos will use multipart/form-data.
         */


        setTimeout(function () {

            window.location.href =
                "hostels.html";

        }, 1800);

    });

}


/* =========================================
   VALIDATION
========================================= */

function validateHostelForm() {

    const requiredFields = [

        "hostelName",
        "propertyType",
        "genderType",
        "contactPhone",
        "contactEmail",
        "description",
        "city",
        "locality",
        "address",
        "pincode"

    ];


    for (const id of requiredFields) {

        const field =
            document.getElementById(id);


        if (!field.value.trim()) {

            field.focus();


            showFormMessage(
                "Please fill all required fields.",
                "error"
            );


            return false;

        }

    }


    const pincode =
        document.getElementById("pincode").value.trim();


    if (!/^\d{6}$/.test(pincode)) {

        document
            .getElementById("pincode")
            .focus();


        showFormMessage(
            "Please enter a valid 6-digit PIN code.",
            "error"
        );


        return false;

    }


    const phone =
        document.getElementById("contactPhone")
            .value.trim();


    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {

        document
            .getElementById("contactPhone")
            .focus();


        showFormMessage(
            "Please enter a valid phone number.",
            "error"
        );


        return false;

    }


    return true;

}


/* =========================================
   COLLECT DATA
========================================= */

function collectHostelData() {

    const facilities =
        Array.from(
            document.querySelectorAll(
                'input[name="facility"]:checked'
            )
        ).map(input => input.value);


    const rooms = [];


    document
        .querySelectorAll(".room-row")
        .forEach(row => {

            const type =
                row.querySelector(".room-type").value;

            const total =
                Number(
                    row.querySelector(".room-total").value
                );

            const available =
                Number(
                    row.querySelector(".room-available").value
                );

            const rent =
                Number(
                    row.querySelector(".room-rent").value
                );


            if (total > 0 || rent > 0) {

                rooms.push({

                    type: type,

                    totalRooms: total,

                    availableRooms: available,

                    monthlyRent: rent

                });

            }

        });


    return {

        name:
            document.getElementById("hostelName").value.trim(),

        propertyType:
            document.getElementById("propertyType").value,

        gender:
            document.getElementById("genderType").value,

        phone:
            document.getElementById("contactPhone").value.trim(),

        email:
            document.getElementById("contactEmail").value.trim(),

        description:
            document.getElementById("description").value.trim(),

        location: {

            city:
                document.getElementById("city").value,

            locality:
                document.getElementById("locality").value.trim(),

            address:
                document.getElementById("address").value.trim(),

            pincode:
                document.getElementById("pincode").value.trim(),

            landmark:
                document.getElementById("landmark").value.trim(),

            mapLink:
                document.getElementById("mapLink").value.trim()

        },

        facilities: facilities,

        rooms: rooms,

        rules: {

            visitorPolicy:
                document.getElementById("visitorPolicy").value,

            curfew:
                document.getElementById("curfew").value,

            smoking:
                document.getElementById("smoking").value,

            pets:
                document.getElementById("pets").value,

            additional:
                document.getElementById("rules").value.trim()

        },

        photoCount:
            selectedPhotos.length

    };

}


/* =========================================
   SAVE DRAFT
========================================= */

function saveDraft() {

    const data =
        collectHostelData();


    localStorage.setItem(
        "hostelvisionHostelDraft",
        JSON.stringify(data)
    );


    showFormMessage(
        "Hostel draft saved successfully.",
        "success"
    );

}


/* =========================================
   PREVIEW
========================================= */

function previewHostel() {

    const name =
        document.getElementById("hostelName").value.trim()
        || "Hostel Name";


    const type =
        document.getElementById("propertyType").value
        || "Hostel";


    const city =
        document.getElementById("city").value;


    const locality =
        document.getElementById("locality").value.trim();


    const description =
        document.getElementById("description").value.trim()
        || "No description added yet.";


    document.getElementById("previewName")
        .textContent = name;


    document.getElementById("previewTitle")
        .textContent = name;


    document.getElementById("previewType")
        .textContent = type;


    document.getElementById("previewLocation")
        .textContent =
        `📍 ${locality || "Location"}, ${city || "City"}`;


    document.getElementById("previewDescription")
        .textContent = description;


    const facilities =
        Array.from(
            document.querySelectorAll(
                'input[name="facility"]:checked'
            )
        ).map(input => input.value);


    const facilityContainer =
        document.getElementById("previewFacilities");


    facilityContainer.innerHTML = "";


    if (facilities.length === 0) {

        facilityContainer.innerHTML =
            "<span>No facilities selected</span>";

    }

    else {

        facilities.forEach(facility => {

            const span =
                document.createElement("span");

            span.textContent =
                facility;

            facilityContainer.appendChild(span);

        });

    }


    const previewPhoto =
        document.getElementById("previewPhoto");


    previewPhoto.innerHTML = "🏠";


    if (selectedPhotos.length > 0) {

        const reader =
            new FileReader();


        reader.onload = function (event) {

            previewPhoto.innerHTML = `

                <img
                    src="${event.target.result}"
                    alt="Hostel">

            `;

        };


        reader.readAsDataURL(selectedPhotos[0]);

    }


    document
        .getElementById("previewModal")
        .classList.add("show");


    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE PREVIEW
========================================= */

function closePreview() {

    document
        .getElementById("previewModal")
        .classList.remove("show");


    document.body.style.overflow = "";

}


/* =========================================
   MESSAGE
========================================= */

function showFormMessage(message, type) {

    const box =
        document.getElementById("formMessage");


    box.textContent =
        message;


    box.className =
        "form-message " + type;


    box.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

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


/* =========================================
   CLOSE MODAL
========================================= */

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("previewModal");


    if (event.target === modal) {

        closePreview();

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closePreview();

    }

});