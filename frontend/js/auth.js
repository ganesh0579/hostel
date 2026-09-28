/* =========================================================
   HOSTELVISION AUTHENTICATION
========================================================= */


/* =========================================================
   CURRENT ROLE
========================================================= */

let selectedRole = "customer";


/* =========================================================
   ROLE BUTTONS
========================================================= */

const roleButtons =
    document.querySelectorAll(".role-btn");


roleButtons.forEach(button => {

    button.addEventListener("click", function () {

        roleButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        selectedRole =
            this.dataset.role;

    });

});


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

document
    .querySelectorAll(".password-toggle")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        this.dataset.target
                    );

                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    this.textContent = "🙈";

                } else {

                    input.type = "password";

                    this.textContent = "👁";

                }

            }
        );

    });


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

const password =
    document.getElementById(
        "registerPassword"
    );

const strength =
    document.getElementById(
        "passwordStrength"
    );


if (password && strength) {

    password.addEventListener(
        "input",
        function () {

            const value =
                this.value;

            let score = 0;


            if (value.length >= 8)
                score++;

            if (/[A-Z]/.test(value))
                score++;

            if (/[a-z]/.test(value))
                score++;

            if (/[0-9]/.test(value))
                score++;

            if (/[^A-Za-z0-9]/.test(value))
                score++;


            if (value.length === 0) {

                strength.style.background =
                    "#eee";

            } else if (score <= 2) {

                strength.style.background =
                    "#e63946";

            } else if (score <= 4) {

                strength.style.background =
                    "#f0a500";

            } else {

                strength.style.background =
                    "#16834b";

            }

        }
    );

}


/* =========================================================
   REGISTER
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "registerPhone"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const terms =
                document.getElementById(
                    "terms"
                ).checked;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            /* NAME */

            if (name.length < 3) {

                showMessage(
                    message,
                    "Please enter your full name.",
                    "error"
                );

                return;

            }


            /* EMAIL */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* PHONE */

            if (
                !/^[6-9]\d{9}$/.test(phone)
            ) {

                showMessage(
                    message,
                    "Please enter a valid 10-digit Indian mobile number.",
                    "error"
                );

                return;

            }


            /* PASSWORD */

            if (password.length < 8) {

                showMessage(
                    message,
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;

            }


            /* CONFIRM */

            if (
                password !== confirmPassword
            ) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            /* TERMS */

            if (!terms) {

                showMessage(
                    message,
                    "Please accept the Terms of Service.",
                    "error"
                );

                return;

            }


            /*
             * TEMPORARY FRONTEND ONLY
             *
             * Real implementation later:
             *
             * POST /api/auth/register
             *
             * Spring Boot
             *       ↓
             * Password hashing
             *       ↓
             * MySQL
             */

            showMessage(
                message,
                `Account details validated successfully as ${selectedRole}. Redirecting to login...`,
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "login.html";

                },
                1500
            );

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const login =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (login === "") {

                showMessage(
                    message,
                    "Please enter your email or phone number.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    message,
                    "Please enter a valid password.",
                    "error"
                );

                return;

            }


            /*
             * TEMPORARY FRONTEND ONLY
             *
             * Later:
             *
             * POST /api/auth/login
             *
             * Backend verifies:
             *
             * email/phone
             * password
             * role
             *
             * Then returns:
             *
             * JWT / session
             */


            showMessage(
                message,
                `Login validated as ${selectedRole}. Backend authentication will be connected next.`,
                "success"
            );

        }
    );

}


/* =========================================================
   MESSAGE FUNCTION
========================================================= */

function showMessage(
    element,
    message,
    type
) {

    element.textContent =
        message;

    element.className =
        `form-message ${type}`;

}