
# University Dormitory Management System

## 📌 About the Project
Our project is a University Dormitory Management System, designed to efficiently manage student accommodations within university dormitories. It provides a structured way to handle room reservations, student information, dormitory capacity, complaints, and administrative tasks. The system ensures a seamless interaction between students and the university administration, improving housing allocation and response to student concerns.


## 🎯 Features
Student Registration & Management: Store student details, including name, date of birth, and university information.
Room Reservation System: Allow students to book rooms based on availability.
Dormitory & Room Management: Manage dormitory (foyer), blocks, and rooms (single, double, triple).
Complaint & Response Handling: Students can submit complaints, and administrators can provide responses.
University & Dormitory Integration: Each dormitory is linked to a university for structured housing management.

## 📌 class Diagram
![webDist (3)](https://github.com/user-attachments/assets/487bfdbf-ddaa-4a0e-aec9-d95c6f4af06d)


## 🧱 Technologies Used  

### 🔧 Backend (Microservice)  

- **Spring Boot** – Java-based framework for building RESTful APIs  
- **Spring Data JPA / Hibernate** – ORM for database operations  
- **MySQL**  
- **Enum class** for `RoomType` definition  
- **Lombok** – Simplify boilerplate code  
- **Docker** – For containerization 
- **Eureka (Netflix Service Discovery)** – For microservice registration 
- **Spring Cloud Gateway** – API Gateway integration 

### 🖥️ Frontend  

- **Angular** – Modern frontend framework for managing the room interface  
- **Angular Services** – Communicate with the Room microservice via HTTP  
- **Forms & Components** – For room creation, editing, and listing  
- **Material / Bootstrap** – UI styling and responsiveness  
