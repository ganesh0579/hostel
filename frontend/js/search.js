
const hostelCards =
    Array.from(
        document.querySelectorAll(".search-hostel-card")
    );

const resultCount =
    document.getElementById("resultCount");

const resultLocation =
    document.getElementById("resultLocation");

const locationSearch =
    document.getElementById("locationSearch");

const propertyType =
    document.getElementById("propertyType");

const sortSelect =
    document.getElementById("sortSelect");

const hostelResults =
    document.getElementById("hostelResults");

const noResults =
    document.getElementById("noResults");

const activeFilters =
    document.getElementById("activeFilters");


/* =========================================================
   PRICE SLIDERS
========================================================= */

const minPrice =
    document.getElementById("minPrice");

const maxPrice =
    document.getElementById("maxPrice");

const minPriceValue =
    document.getElementById("minPriceValue");

const maxPriceValue =
    document.getElementById("maxPriceValue");


function updatePriceDisplay() {

    minPriceValue.textContent =
        Number(minPrice.value).toLocaleString("en-IN");

    maxPriceValue.textContent =
        Number(maxPrice.value).toLocaleString("en-IN");

}


minPrice.addEventListener(
    "input",
    updatePriceDisplay
);

maxPrice.addEventListener(
    "input",
    updatePriceDisplay
);


/* =========================================================
   GET SELECTED CHECKBOXES
========================================================= */

function getSelectedValues(selector) {

    return Array.from(
        document.querySelectorAll(
            `${selector}:checked`
        )
    ).map(
        checkbox => checkbox.value
    );

}


/* =========================================================
   FILTER HOSTELS
========================================================= */

function filterHostels() {

    const selectedTypes =
        getSelectedValues(".type-filter");

    const selectedRooms =
        getSelectedValues(".room-filter");

    const selectedFacilities =
        getSelectedValues(".facility-filter");

    const selectedRating =
        document.querySelector(
            'input[name="rating"]:checked'
        );

    const minimumRating =
        selectedRating
            ? Number(selectedRating.value)
            : 0;

    const minimumPrice =
        Number(minPrice.value);

    const maximumPrice =
        Number(maxPrice.value);


    let visibleCount = 0;


    hostelCards.forEach(card => {

        const cardType =
            card.dataset.type;

        const cardPrice =
            Number(card.dataset.price);

        const cardRating =
            Number(card.dataset.rating);

        const cardRoom =
            card.dataset.room;

        const cardFacilities =
            card.dataset.facilities
                .split(",");


        /* ---------------------------------------------
           TYPE
        --------------------------------------------- */

        const typeMatch =
            selectedTypes.length === 0 ||
            selectedTypes.includes(cardType);


        /* ---------------------------------------------
           ROOM
        --------------------------------------------- */

        const roomMatch =
            selectedRooms.length === 0 ||
            selectedRooms.includes(cardRoom);


        /* ---------------------------------------------
           FACILITIES
        --------------------------------------------- */

        const facilitiesMatch =
            selectedFacilities.length === 0 ||
            selectedFacilities.every(
                facility =>
                    cardFacilities.includes(facility)
            );


        /* ---------------------------------------------
           PRICE
        --------------------------------------------- */

        const priceMatch =
            cardPrice >= minimumPrice &&
            cardPrice <= maximumPrice;


        /* ---------------------------------------------
           RATING
        --------------------------------------------- */

        const ratingMatch =
            cardRating >= minimumRating;


        /* ---------------------------------------------
           PROPERTY TYPE DROPDOWN
        --------------------------------------------- */

        const dropdownType =
            propertyType.value;


        const dropdownMatch =
            dropdownType === "all" ||
            dropdownType === cardType;


        /* ---------------------------------------------
           FINAL RESULT
        --------------------------------------------- */

        const visible =
            typeMatch &&
            roomMatch &&
            facilitiesMatch &&
            priceMatch &&
            ratingMatch &&
            dropdownMatch;


        if (visible) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    /* ---------------------------------------------
       RESULT COUNT
    --------------------------------------------- */

    resultCount.textContent =
        `${visibleCount} properties found`;


    /* ---------------------------------------------
       NO RESULTS
    --------------------------------------------- */

    if (visibleCount === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }


    updateActiveFilters();

}


/* =========================================================
   PROPERTY TYPE
========================================================= */

propertyType.addEventListener(
    "change",
    filterHostels
);


/* =========================================================
   CHECKBOX FILTERS
========================================================= */

document
    .querySelectorAll(
        ".type-filter, .room-filter, .facility-filter"
    )
    .forEach(
        checkbox => {

            checkbox.addEventListener(
                "change",
                filterHostels
            );

        }
    );


/* =========================================================
   RATING FILTER
========================================================= */

document
    .querySelectorAll(
        'input[name="rating"]'
    )
    .forEach(
        radio => {

            radio.addEventListener(
                "change",
                filterHostels
            );

        }
    );


/* =========================================================
   SEARCH BUTTON
========================================================= */

document
    .getElementById("mainSearchBtn")
    .addEventListener(
        "click",
        performSearch
    );


function performSearch() {

    const location =
        locationSearch.value.trim();


    if (location === "") {

        alert(
            "Please enter a location."
        );

        return;

    }


    resultLocation.textContent =
        location;


    /*

       Later:

       location
          ↓
       JavaScript
          ↓
       Spring Boot API
          ↓
       MySQL
          ↓
       Real hostels

    */


    filterHostels();

}


/* =========================================================
   LOCATION SEARCH - ENTER
========================================================= */

locationSearch.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);


/* =========================================================
   SORTING
========================================================= */

sortSelect.addEventListener(
    "change",
    sortHostels
);


function sortHostels() {

    const sortValue =
        sortSelect.value;


    const cards =
        Array.from(
            document.querySelectorAll(
                ".search-hostel-card"
            )
        );


    cards.sort(
        (a, b) => {

            const priceA =
                Number(a.dataset.price);

            const priceB =
                Number(b.dataset.price);

            const ratingA =
                Number(a.dataset.rating);

            const ratingB =
                Number(b.dataset.rating);


            if (
                sortValue === "price-low"
            ) {

                return priceA - priceB;

            }


            if (
                sortValue === "price-high"
            ) {

                return priceB - priceA;

            }


            if (
                sortValue === "rating"
            ) {

                return ratingB - ratingA;

            }


            return 0;

        }
    );


    cards.forEach(
        card => hostelResults.appendChild(card)
    );

}


/* =========================================================
   FAVORITE BUTTON
========================================================= */

document
    .querySelectorAll(".favorite-btn")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    this.classList.toggle(
                        "active"
                    );


                    if (
                        this.classList.contains(
                            "active"
                        )
                    ) {

                        this.textContent = "♥";

                    } else {

                        this.textContent = "♡";

                    }

                }
            );

        }
    );


/* =========================================================
   ACTIVE FILTER DISPLAY
========================================================= */

function updateActiveFilters() {

    activeFilters.innerHTML = "";


    const selectedTypes =
        getSelectedValues(".type-filter");

    const selectedRooms =
        getSelectedValues(".room-filter");

    const selectedFacilities =
        getSelectedValues(".facility-filter");


    selectedTypes.forEach(
        value =>
            createFilterTag(
                value
            )
    );


    selectedRooms.forEach(
        value =>
            createFilterTag(
                value
            )
    );


    selectedFacilities.forEach(
        value =>
            createFilterTag(
                value
            )
    );


    const selectedRating =
        document.querySelector(
            'input[name="rating"]:checked'
        );


    if (selectedRating) {

        createFilterTag(
            `${selectedRating.value}+ Rating`
        );

    }


    if (
        Number(minPrice.value) > 0
    ) {

        createFilterTag(
            `₹${Number(minPrice.value)
                .toLocaleString("en-IN")}+`
        );

    }


    if (
        Number(maxPrice.value) < 20000
    ) {

        createFilterTag(
            `Under ₹${Number(maxPrice.value)
                .toLocaleString("en-IN")}`
        );

    }

}


/* =========================================================
   CREATE FILTER TAG
========================================================= */

function createFilterTag(text) {

    const tag =
        document.createElement("span");

    tag.className =
        "filter-tag";

    tag.innerHTML = `
        ${text}
        <button type="button">×</button>
    `;


    tag
        .querySelector("button")
        .addEventListener(
            "click",
            () => {

                removeFilter(text);

            }
        );


    activeFilters.appendChild(tag);

}


/* =========================================================
   REMOVE FILTER
========================================================= */

function removeFilter(text) {

    document
        .querySelectorAll(
            ".type-filter, .room-filter, .facility-filter"
        )
        .forEach(
            checkbox => {

                if (
                    checkbox.value === text
                ) {

                    checkbox.checked =
                        false;

                }

            }
        );


    document
        .querySelectorAll(
            'input[name="rating"]'
        )
        .forEach(
            radio => {

                if (
                    `${radio.value}+ Rating`
                    === text
                ) {

                    radio.checked =
                        false;

                }

            }
        );


    filterHostels();

}


/* =========================================================
   CLEAR ALL FILTERS
========================================================= */

document
    .getElementById("clearFilters")
    .addEventListener(
        "click",
        clearAllFilters
    );


document
    .getElementById("resetSearch")
    .addEventListener(
        "click",
        clearAllFilters
    );


function clearAllFilters() {

    /* Checkbox */

    document
        .querySelectorAll(
            ".type-filter, .room-filter, .facility-filter"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    false;

            }
        );


    /* Rating */

    document
        .querySelectorAll(
            'input[name="rating"]'
        )
        .forEach(
            radio => {

                radio.checked =
                    false;

            }
        );


    /* Price */

    minPrice.value = 0;

    maxPrice.value = 20000;


    /* Property */

    propertyType.value = "all";


    /* Display */

    updatePriceDisplay();

    filterHostels();

}


/* =========================================================
   INITIALIZE
========================================================= */

updatePriceDisplay();

filterHostels();