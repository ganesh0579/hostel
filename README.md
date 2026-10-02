# HostelVision – Hostel and PG Management System

## About the Project
HostelVision is a full-stack web application developed to make the process of finding and managing hostels and PGs easier. Students and other users can use the website to search for hostels based on their location and requirements, view hostel details, check room availability, and make bookings.
The main idea behind this project is to bring hostel-related information into one platform. Instead of depending on different sources or visiting hostels directly to collect information, users can check the available details through the website.
The system has different functionalities for customers, hostel owners, and administrators. Customers can search and book rooms, hostel owners can add and manage their hostel information, and administrators can manage users, hostels, bookings, and complaints.

## Problem Statement
Finding a suitable hostel or PG is sometimes difficult for students because information such as rent, location, facilities, room availability, and contact details may not be available in one place. Hostel owners also have to manage customer details and bookings manually in many cases.
HostelVision is developed to provide a simple digital solution for these problems. It allows users to find hostel information online and provides hostel owners with a way to manage their properties and bookings.

## Main Features
The customer side of the application allows users to register and log in, search for hostels, view hostel details, check room availability, and make bookings. Users can also view their previous bookings and submit complaints when they face any issue.
Hostel owners have a separate section where they can add their hostel details, update information, manage rooms, check availability, and view customer bookings. This helps owners maintain their hostel information through the application instead of handling everything manually.
The administrator manages the overall system. The admin can view and manage users, hostel details, bookings, and complaints. This provides basic control over the activities taking place on the platform.

## Technologies Used
The frontend of the project is developed using HTML, CSS, and JavaScript. HTML is used to create the structure of the web pages, CSS is used for the design and layout, and JavaScript is used to add interaction and connect the frontend with the backend.
The backend is developed using Java and Spring Boot. Spring Boot is used to create the REST APIs and handle the application logic. Spring Data JPA and Hibernate are used to communicate with the database.
MySQL is used as the database for storing information such as users, hostels, rooms, bookings, and complaints.
Git and GitHub are used for source code management and maintaining different versions of the project.

## How the Application Works
When a user opens HostelVision, they can search for available hostels and view their details. After registering and logging in, the user can select a suitable hostel and check the available rooms. If a room is available, the user can make a booking.
The booking information is sent from the frontend to the Spring Boot backend through REST APIs. The backend processes the request and stores the required information in the MySQL database.
Hostel owners can log in to their account and check their hostel information and bookings. They can also update room availability when required. The admin can access the management section and monitor the users, hostels, bookings, and complaints.

## Database
MySQL is used to store the data required by the application. Some of the main data stored in the database includes user information, hostel details, room information, booking details, and complaints.
The main entities in the project are:
* User
* Hostel
* Room
* Booking
* Complaint
These entities are connected with each other according to the requirements of the application. For example, a hostel can have multiple rooms, and a user can have multiple bookings.

## Backend
The Spring Boot backend follows a basic layered structure. Controllers handle requests from the frontend, services contain the application logic, repositories communicate with the database, and entities represent the database tables.
For example, when a user searches for hostels, the frontend sends a request to the backend. The controller receives the request, the service processes it, and the repository retrieves the required information from MySQL. The result is then returned to the frontend and displayed to the user.

## Project Structure
```
HostelVision
│
├── frontend
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── customer
│   ├── owner
│   ├── admin
│   ├── css
│   └── js
│
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       └── resources
│   ├── pom.xml
│   └── mvnw.cmd
│
├── database
│   └── schema.sql
│
└── README.md
```

## Running the Project
First, create a MySQL database named `hostelvision`.
```sql
CREATE DATABASE hostelvision;
```
Then configure the MySQL username, password, and database details in the Spring Boot `application.properties` file.
After that, open the backend folder and run:
```bash
.\mvnw.cmd spring-boot:run
```
The Spring Boot application runs on port `8080` by default.
The frontend can be opened using a browser or through VS Code Live Server. Once both the frontend and backend are running, the frontend can communicate with the backend through the REST APIs.

## Future Improvements
There are several features that can be added to the project in the future. These include online payment, hostel reviews and ratings, Google Maps integration, email notifications, OTP-based login, JWT authentication, image upload for hostels, and deployment using cloud services.
The project can also be improved by adding Docker, CI/CD, and other deployment technologies.

## Conclusion
HostelVision is a full-stack project that provides a simple way to manage hostel and PG-related activities. The project helped in understanding how a frontend, backend, and database work together in a real-world application.
Through this project, practical knowledge of HTML, CSS, JavaScript, Java, Spring Boot, REST APIs, MySQL, Git, and GitHub can be applied to build a complete web application.
