/* =========================================
   OWNER AUTHENTICATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupPasswordStrength();

    setupOwnerRegistration();

});


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "Hide";

    } else {

        input.type = "password";

        button.textContent = "Show";

    }

}


/* =========================================
   PASSWORD STRENGTH
========================================= */

function setupPasswordStrength() {

    const password =
        document.getElementById("ownerPassword");

    password.addEventListener("input", function () {

        const value = password.value;

        const bars = [
            document.getElementById("strength1"),
            document.getElementById("strength2"),
            document.getElementById("strength3"),
            document.getElementById("strength4")
        ];

        const text =
            document.getElementById("strengthText");


        let score = 0;


        if (value.length >= 8) {
            score++;
        }

        if (/[A-Z]/.test(value)) {
            score++;
        }

        if (/[0-9]/.test(value)) {
            score++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
            score++;
        }


        bars.forEach(bar => {

            bar.style.background = "#e3e6ea";

        });


        if (score === 0) {

            text.textContent =
                "Password strength";

        }

        else if (score === 1) {

            bars[0].style.background = "#e63946";

            text.textContent =
                "Weak password";

        }

        else if (score === 2) {

            bars[0].style.background = "#e67e22";
            bars[1].style.background = "#e67e22";

            text.textContent =
                "Fair password";

        }

        else if (score === 3) {

            bars[0].style.background = "#d4a017";
            bars[1].style.background = "#d4a017";
            bars[2].style.background = "#d4a017";

            text.textContent =
                "Good password";

        }

        else {

            bars.forEach(bar => {

                bar.style.background = "#2ca25f";

            });

            text.textContent =
                "Strong password";

        }

    });

}


/* =========================================
   OWNER REGISTRATION
========================================= */

function setupOwnerRegistration() {

    const form =
        document.getElementById("ownerRegisterForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("ownerName")
                .value.trim();

        const phone =
            document.getElementById("ownerPhone")
                .value.trim();

        const email =
            document.getElementById("ownerEmail")
                .value.trim();

        const password =
            document.getElementById("ownerPassword")
                .value;

        const confirmPassword =
            document.getElementById("ownerConfirmPassword")
                .value;

        const businessName =
            document.getElementById("businessName")
                .value.trim();

        const propertyType =
            document.getElementById("propertyType")
                .value;

        const city =
            document.getElementById("ownerCity")
                .value;

        const address =
            document.getElementById("propertyAddress")
                .value.trim();

        const terms =
            document.getElementById("ownerTerms")
                .checked;


        /* BASIC VALIDATION */

        if (
            !name ||
            !phone ||
            !email ||
            !password ||
            !confirmPassword ||
            !businessName ||
            !propertyType ||
            !city ||
            !address
        ) {

            showMessage(
                "Please fill all required fields.",
                "error"
            );

            return;

        }


        /* PHONE */

        const phonePattern =
            /^[0-9+\-\s]{10,15}$/;

        if (!phonePattern.test(phone)) {

            showMessage(
                "Please enter a valid phone number.",
                "error"
            );

            return;

        }


        /* PASSWORD */

        if (password.length < 8) {

            showMessage(
                "Password must contain at least 8 characters.",
                "error"
            );

            return;

        }


        /* CONFIRM PASSWORD */

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;

        }


        /* TERMS */

        if (!terms) {

            showMessage(
                "Please accept the Terms & Conditions.",
                "error"
            );

            return;

        }


        /* SUCCESS */

        const button =
            form.querySelector(".register-btn");

        button.disabled = true;

        button.textContent =
            "Creating Account...";


        setTimeout(function () {

            showMessage(
                "Owner account created successfully! Redirecting to login...",
                "success"
            );


            button.textContent =
                "Account Created";


            /*
             * Temporary frontend redirect.
             *
             * Real implementation later:
             *
             * POST /api/auth/owner/register
             *
             * Spring Boot
             *      ↓
             * MySQL
             */

            setTimeout(function () {

                window.location.href =
                    "owner-login.html";

            }, 1500);


        }, 700);

    });

}


/* =========================================
   MESSAGE
========================================= */

function showMessage(message, type) {

    const box =
        document.getElementById("registerMessage");

    box.textContent = message;

    box.className =
        "register-message " + type;

}