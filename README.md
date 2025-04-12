# 🛏️ Room Microservice – University Dormitory Management System

## 📦 Overview  
This microservice is part of the **University Dormitory Management System** and is responsible for managing all **room-related functionalities**.  
It includes room creation, updates, deletion, retrieval, and categorization by room type (`SINGLE`, `DOUBLE`, `TRIPLE`).  
It ensures proper mapping of rooms to dormitory blocks and integrates smoothly with other system components.

---

## 🧩 Responsibilities  

- Manage individual **Room** entities.  
- Support room types through an `enum`: `SINGLE`, `DOUBLE`, and `TRIPLE`.  
- Provide endpoints to **create**, **update**, **delete**, and **retrieve** room details.  
- Ensure proper mapping of rooms to **dormitory blocks**  
- Support filtering rooms by type .

---

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
