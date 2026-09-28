function searchHostels() {

    const location =
        document.getElementById("heroLocation").value.trim();

    const propertyType =
        document.getElementById("propertyType").value;

    if (location === "") {

        alert("Please enter a location.");

        return;
    }

    console.log("Location:", location);
    console.log("Property:", propertyType);

    // Temporary navigation.
    // Later this will call our Spring Boot API.

    window.location.href =
        `pages/search.html?location=${encodeURIComponent(location)}&type=${encodeURIComponent(propertyType)}`;
}


/* =========================
   POPULAR SEARCH
========================= */

document
    .querySelectorAll(".popular-searches button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const location =
                button.textContent.trim();

            document.getElementById("heroLocation")
                .value = location;

            searchHostels();

        });

    });


/* =========================
   HEART BUTTON
========================= */

document
    .querySelectorAll(".heart")
    .forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent === "♡") {

                button.textContent = "♥";

            } else {

                button.textContent = "♡";

            }

        });

    });


/* =========================
   TOP SEARCH
========================= */

document
    .getElementById("searchInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            const value = this.value.trim();

            if (value !== "") {

                window.location.href =
                    `pages/search.html?location=${encodeURIComponent(value)}`;

            }

        }

    });