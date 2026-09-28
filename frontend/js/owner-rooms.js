/* =====================================================
   HOSTELVISION - OWNER ROOMS MANAGEMENT
===================================================== */


/* =====================================================
   DEFAULT ROOM DATA
===================================================== */

const defaultRooms = {

    urbannest: [

        {
            id: 1,
            number: "101",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        },

        {
            id: 2,
            number: "102",
            type: "double",
            capacity: 2,
            occupied: 1,
            rent: 6500,
            status: "partial"
        },

        {
            id: 3,
            number: "103",
            type: "triple",
            capacity: 3,
            occupied: 2,
            rent: 5800,
            status: "partial"
        },

        {
            id: 4,
            number: "104",
            type: "double",
            capacity: 2,
            occupied: 0,
            rent: 6500,
            status: "available"
        },

        {
            id: 5,
            number: "105",
            type: "single",
            capacity: 1,
            occupied: 1,
            rent: 8500,
            status: "full"
        },

        {
            id: 6,
            number: "106",
            type: "four",
            capacity: 4,
            occupied: 3,
            rent: 5000,
            status: "partial"
        },

        {
            id: 7,
            number: "107",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        },

        {
            id: 8,
            number: "108",
            type: "triple",
            capacity: 3,
            occupied: 0,
            rent: 5800,
            status: "available"
        },

        {
            id: 9,
            number: "109",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        },

        {
            id: 10,
            number: "110",
            type: "double",
            capacity: 2,
            occupied: 1,
            rent: 6500,
            status: "partial"
        },

        {
            id: 11,
            number: "111",
            type: "four",
            capacity: 4,
            occupied: 4,
            rent: 5000,
            status: "full"
        },

        {
            id: 12,
            number: "112",
            type: "double",
            capacity: 2,
            occupied: 0,
            rent: 6500,
            status: "available"
        },

        {
            id: 13,
            number: "113",
            type: "triple",
            capacity: 3,
            occupied: 2,
            rent: 5800,
            status: "partial"
        },

        {
            id: 14,
            number: "114",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        },

        {
            id: 15,
            number: "115",
            type: "double",
            capacity: 2,
            occupied: 0,
            rent: 6500,
            status: "available"
        },

        {
            id: 16,
            number: "116",
            type: "single",
            capacity: 1,
            occupied: 1,
            rent: 8500,
            status: "full"
        },

        {
            id: 17,
            number: "117",
            type: "double",
            capacity: 2,
            occupied: 1,
            rent: 6500,
            status: "partial"
        },

        {
            id: 18,
            number: "118",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        },

        {
            id: 19,
            number: "119",
            type: "triple",
            capacity: 3,
            occupied: 0,
            rent: 5800,
            status: "available"
        },

        {
            id: 20,
            number: "120",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 6500,
            status: "full"
        }

    ],


    studenthub: [

        {
            id: 21,
            number: "201",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 7000,
            status: "full"
        },

        {
            id: 22,
            number: "202",
            type: "double",
            capacity: 2,
            occupied: 1,
            rent: 7000,
            status: "partial"
        },

        {
            id: 23,
            number: "203",
            type: "triple",
            capacity: 3,
            occupied: 2,
            rent: 6200,
            status: "partial"
        },

        {
            id: 24,
            number: "204",
            type: "double",
            capacity: 2,
            occupied: 0,
            rent: 7000,
            status: "available"
        }

    ],


    greenstay: [

        {
            id: 31,
            number: "301",
            type: "double",
            capacity: 2,
            occupied: 2,
            rent: 5500,
            status: "full"
        },

        {
            id: 32,
            number: "302",
            type: "triple",
            capacity: 3,
            occupied: 1,
            rent: 5200,
            status: "partial"
        },

        {
            id: 33,
            number: "303",
            type: "double",
            capacity: 2,
            occupied: 0,
            rent: 5500,
            status: "available"
        }

    ]

};


/* =====================================================
   LOAD DATA
===================================================== */

let roomData =
    JSON.parse(localStorage.getItem("hostelvisionRooms"))
    || defaultRooms;


let currentProperty =
    document.getElementById("propertySelect")?.value
    || "urbannest";


/* =====================================================
   SAVE DATA
===================================================== */

function saveRooms() {

    localStorage.setItem(
        "hostelvisionRooms",
        JSON.stringify(roomData)
    );

}


/* =====================================================
   ROOM TYPE NAME
===================================================== */

function getRoomTypeName(type) {

    const types = {

        single: "Single Sharing",
        double: "Double Sharing",
        triple: "Triple Sharing",
        four: "Four Sharing"

    };

    return types[type] || type;

}


/* =====================================================
   STATUS NAME
===================================================== */

function getStatusName(status) {

    const statuses = {

        available: "Available",
        partial: "Partially Occupied",
        full: "Fully Occupied",
        maintenance: "Maintenance"

    };

    return statuses[status] || status;

}


/* =====================================================
   RENDER ROOMS
===================================================== */

function renderRooms() {

    const grid =
        document.getElementById("roomsGrid");

    const empty =
        document.getElementById("roomEmptyState");

    const rooms =
        roomData[currentProperty] || [];


    const search =
        document.getElementById("roomSearch")
            .value
            .toLowerCase()
            .trim();


    const typeFilter =
        document.getElementById("roomTypeFilter").value;


    const statusFilter =
        document.getElementById("roomStatusFilter").value;


    const filteredRooms = rooms.filter(room => {

        const matchesSearch =
            room.number
                .toLowerCase()
                .includes(search);


        const matchesType =
            typeFilter === "all"
            || room.type === typeFilter;


        const matchesStatus =
            statusFilter === "all"
            || room.status === statusFilter;


        return (
            matchesSearch
            && matchesType
            && matchesStatus
        );

    });


    grid.innerHTML = "";


    if (filteredRooms.length === 0) {

        empty.classList.add("show");

    } else {

        empty.classList.remove("show");

        filteredRooms.forEach(room => {

            grid.appendChild(
                createRoomCard(room)
            );

        });

    }


    document.getElementById("roomCount").textContent =
        `${filteredRooms.length} room${filteredRooms.length !== 1 ? "s" : ""}`;


    updateStats();

}


/* =====================================================
   CREATE ROOM CARD
===================================================== */

function createRoomCard(room) {

    const card =
        document.createElement("div");

    card.className = "room-card";


    const available =
        Math.max(
            room.capacity - room.occupied,
            0
        );


    const percentage =
        room.capacity > 0
        ? Math.round(
            (room.occupied / room.capacity) * 100
        )
        : 0;


    card.innerHTML = `

        <div class="room-card-top">

            <div>

                <div class="room-number">
                    Room ${room.number}
                </div>

                <div class="room-type">
                    ${getRoomTypeName(room.type)}
                </div>

            </div>


            <span class="room-status ${room.status}">
                ${getStatusName(room.status)}
            </span>

        </div>


        <div class="room-card-body">

            <div class="occupancy-header">

                <span>Occupancy</span>

                <strong>
                    ${room.occupied}/${room.capacity}
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percentage}%">
                </div>

            </div>


            <div class="room-details">

                <div class="room-detail">

                    <span>Available Beds</span>

                    <strong>
                        ${available}
                    </strong>

                </div>


                <div class="room-detail">

                    <span>Monthly Rent</span>

                    <strong>
                        ₹${room.rent.toLocaleString("en-IN")}
                    </strong>

                </div>

            </div>

        </div>


        <div class="room-card-actions">

            <button onclick="editRoom(${room.id})">
                <i class="fa-solid fa-pen"></i>
                Edit
            </button>

            <button onclick="changeRoomStatus(${room.id})">
                <i class="fa-solid fa-arrows-rotate"></i>
                Status
            </button>

            <button onclick="deleteRoom(${room.id})">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>

        </div>

    `;


    return card;

}


/* =====================================================
   UPDATE STATS
===================================================== */

function updateStats() {

    const rooms =
        roomData[currentProperty] || [];


    let totalRooms = rooms.length;

    let occupiedBeds = 0;

    let totalBeds = 0;

    let maintenance = 0;


    rooms.forEach(room => {

        occupiedBeds += Number(room.occupied);

        totalBeds += Number(room.capacity);


        if (room.status === "maintenance") {

            maintenance++;

        }

    });


    const availableBeds =
        Math.max(
            totalBeds - occupiedBeds,
            0
        );


    document.getElementById("totalRooms")
        .textContent = totalRooms;


    document.getElementById("occupiedBeds")
        .textContent = occupiedBeds;


    document.getElementById("availableBeds")
        .textContent = availableBeds;


    document.getElementById("maintenanceRooms")
        .textContent = maintenance;

}


/* =====================================================
   PROPERTY CHANGE
===================================================== */

function changeProperty() {

    currentProperty =
        document.getElementById("propertySelect").value;


    clearRoomFilters(false);

    renderRooms();

}


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById("roomSearch")
    .addEventListener(
        "input",
        renderRooms
    );


/* =====================================================
   FILTERS
===================================================== */

document
    .getElementById("roomTypeFilter")
    .addEventListener(
        "change",
        renderRooms
    );


document
    .getElementById("roomStatusFilter")
    .addEventListener(
        "change",
        renderRooms
    );


/* =====================================================
   CLEAR FILTERS
===================================================== */

function clearRoomFilters(shouldRender = true) {

    document.getElementById("roomSearch").value = "";

    document.getElementById("roomTypeFilter").value = "all";

    document.getElementById("roomStatusFilter").value = "all";


    if (shouldRender) {

        renderRooms();

    }

}


/* =====================================================
   ADD ROOM MODAL
===================================================== */

function openAddRoomModal() {

    document.getElementById("modalTitle")
        .textContent = "Add Room";


    document.querySelector(
        "#roomModal .modal-header p"
    ).textContent =
        "Add room information for this property.";


    document.getElementById("roomForm").reset();


    document.getElementById("editRoomId").value = "";


    document.getElementById("roomOccupied").value = 0;


    document.getElementById("roomStatus").value =
        "available";


    document.getElementById("roomModal")
        .classList.add("show");

}


/* =====================================================
   CLOSE ROOM MODAL
===================================================== */

function closeRoomModal() {

    document.getElementById("roomModal")
        .classList.remove("show");

}


/* =====================================================
   ADD / EDIT SUBMIT
===================================================== */

document
    .getElementById("roomForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const roomId =
                document.getElementById("editRoomId").value;


            const number =
                document.getElementById("roomNumber")
                    .value.trim();


            const type =
                document.getElementById("roomType")
                    .value;


            const capacity =
                Number(
                    document.getElementById("roomCapacity")
                        .value
                );


            const occupied =
                Number(
                    document.getElementById("roomOccupied")
                        .value
                );


            const rent =
                Number(
                    document.getElementById("roomRent")
                        .value
                );


            let status =
                document.getElementById("roomStatus")
                    .value;


            if (occupied > capacity) {

                alert(
                    "Occupied beds cannot be greater than room capacity."
                );

                return;

            }


            if (status !== "maintenance") {

                if (occupied === 0) {

                    status = "available";

                } else if (occupied >= capacity) {

                    status = "full";

                } else {

                    status = "partial";

                }

            }


            const rooms =
                roomData[currentProperty];


            /* EDIT */

            if (roomId) {

                const room =
                    rooms.find(
                        r => r.id === Number(roomId)
                    );


                if (room) {

                    room.number = number;
                    room.type = type;
                    room.capacity = capacity;
                    room.occupied = occupied;
                    room.rent = rent;
                    room.status = status;

                }


                alert("Room updated successfully.");

            }


            /* ADD */

            else {

                const duplicate =
                    rooms.some(
                        r =>
                            r.number.toLowerCase()
                            === number.toLowerCase()
                    );


                if (duplicate) {

                    alert(
                        "A room with this number already exists."
                    );

                    return;

                }


                rooms.push({

                    id: Date.now(),

                    number,

                    type,

                    capacity,

                    occupied,

                    rent,

                    status

                });


                alert("Room added successfully.");

            }


            saveRooms();

            closeRoomModal();

            renderRooms();

        }
    );


/* =====================================================
   EDIT ROOM
===================================================== */

function editRoom(id) {

    const rooms =
        roomData[currentProperty];


    const room =
        rooms.find(
            r => r.id === id
        );


    if (!room) return;


    document.getElementById("modalTitle")
        .textContent = "Edit Room";


    document.querySelector(
        "#roomModal .modal-header p"
    ).textContent =
        `Update information for Room ${room.number}.`;


    document.getElementById("editRoomId").value =
        room.id;


    document.getElementById("roomNumber").value =
        room.number;


    document.getElementById("roomType").value =
        room.type;


    document.getElementById("roomCapacity").value =
        room.capacity;


    document.getElementById("roomOccupied").value =
        room.occupied;


    document.getElementById("roomRent").value =
        room.rent;


    document.getElementById("roomStatus").value =
        room.status;


    document.getElementById("roomModal")
        .classList.add("show");

}


/* =====================================================
   CHANGE STATUS
===================================================== */

function changeRoomStatus(id) {

    const rooms =
        roomData[currentProperty];


    const room =
        rooms.find(
            r => r.id === id
        );


    if (!room) return;


    const choice =
        prompt(
            `Change status for Room ${room.number}.\n\n` +
            `1 - Available\n` +
            `2 - Partially Occupied\n` +
            `3 - Fully Occupied\n` +
            `4 - Maintenance\n\n` +
            `Enter 1, 2, 3 or 4:`
        );


    const statusMap = {

        "1": "available",
        "2": "partial",
        "3": "full",
        "4": "maintenance"

    };


    if (!statusMap[choice]) {

        return;

    }


    room.status =
        statusMap[choice];


    if (room.status === "available") {

        room.occupied = 0;

    }


    if (room.status === "full") {

        room.occupied = room.capacity;

    }


    saveRooms();

    renderRooms();


    alert(
        `Room ${room.number} status updated.`
    );

}


/* =====================================================
   DELETE ROOM
===================================================== */

function deleteRoom(id) {

    const rooms =
        roomData[currentProperty];


    const roomIndex =
        rooms.findIndex(
            r => r.id === id
        );


    if (roomIndex === -1) return;


    const room =
        rooms[roomIndex];


    const confirmed =
        confirm(
            `Delete Room ${room.number}?\n\n` +
            `This action cannot be undone.`
        );


    if (!confirmed) return;


    rooms.splice(
        roomIndex,
        1
    );


    saveRooms();

    renderRooms();


    alert(
        `Room ${room.number} deleted.`
    );

}


/* =====================================================
   BULK ROOM MODAL
===================================================== */

function openBulkRoomModal() {

    document.getElementById("bulkRoomForm")
        .reset();


    document.getElementById("bulkRoomModal")
        .classList.add("show");

}


function closeBulkRoomModal() {

    document.getElementById("bulkRoomModal")
        .classList.remove("show");

}


/* =====================================================
   BULK CREATE
===================================================== */

document
    .getElementById("bulkRoomForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const start =
                Number(
                    document.getElementById("bulkStartRoom")
                        .value
                );


            const quantity =
                Number(
                    document.getElementById("bulkQuantity")
                        .value
                );


            const type =
                document.getElementById("bulkRoomType")
                    .value;


            const capacity =
                Number(
                    document.getElementById("bulkCapacity")
                        .value
                );


            const rent =
                Number(
                    document.getElementById("bulkRent")
                        .value
                );


            if (
                !start
                || !quantity
                || quantity < 1
            ) {

                alert(
                    "Please enter valid room details."
                );

                return;

            }


            const rooms =
                roomData[currentProperty];


            let created = 0;


            for (
                let i = 0;
                i < quantity;
                i++
            ) {

                const roomNumber =
                    String(start + i);


                const exists =
                    rooms.some(
                        r =>
                            r.number === roomNumber
                    );


                if (exists) {

                    continue;

                }


                rooms.push({

                    id: Date.now() + i,

                    number: roomNumber,

                    type,

                    capacity,

                    occupied: 0,

                    rent,

                    status: "available"

                });


                created++;

            }


            saveRooms();

            closeBulkRoomModal();

            renderRooms();


            alert(
                `${created} room(s) created successfully.`
            );

        }
    );


/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {

    alert(
        "Notifications\n\n" +
        "• 3 new booking requests\n" +
        "• Room 102 has 1 available bed\n" +
        "• UrbanNest verification completed"
    );

}


/* =====================================================
   HELP
===================================================== */

function showHelp(event) {

    event.preventDefault();

    alert(
        "HostelVision Owner Support\n\n" +
        "For now, this is a demo support section."
    );

}


/* =====================================================
   COMING SOON
===================================================== */

function comingSoon(event) {

    event.preventDefault();

    alert(
        "This section will be connected to the backend in the next development stages."
    );

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


    if (!confirmed) return;


    localStorage.removeItem(
        "hostelvisionOwnerLoggedIn"
    );


    window.location.href =
        "../owner-login.html";

}


/* =====================================================
   MODAL OUTSIDE CLICK
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const roomModal =
            document.getElementById("roomModal");

        const bulkModal =
            document.getElementById("bulkRoomModal");


        if (
            event.target === roomModal
        ) {

            closeRoomModal();

        }


        if (
            event.target === bulkModal
        ) {

            closeBulkRoomModal();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderRooms();

    }
);