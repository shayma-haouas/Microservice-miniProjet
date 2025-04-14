🏫 University Dormitory Management System
📌 About the Project
The University Dormitory Management System is a microservices-based application designed to streamline and automate the management of student accommodations within university dormitories. It facilitates efficient room reservation, dormitory capacity tracking, student information handling, and a structured complaint-response mechanism.

The system enhances communication between students and administration, optimizes housing allocation, and improves overall dormitory operations.

🎯 Core Features
👨‍🎓 Student Registration & Management
Manage student profiles including personal details, academic information, and linked university.

🛏️ Room Reservation System
Students can reserve available rooms based on type and availability (Single/Double/Triple).

🏢 Dormitory & Room Management
Admins can create and manage dormitories, blocks, and room configurations.

📬 Complaint Handling System
Students submit complaints; administrators respond through a structured interface.

🏛️ University & Dormitory Integration
Each dormitory is linked to a specific university, allowing for scalable and structured management.

🛠️ Technologies & Architecture
🔧 Backend (Microservices)
Spring Boot for service development

Eureka for Service Discovery

API Gateway for routing and centralized access

Config Server for centralized configuration management

Kafka/RabbitMQ (Pluggable) for async communication

Keycloak + Spring Security for authentication and authorization

🖥️ Frontend
Angular for building the user interface

Integration with microservices via RESTful APIs

🧱 Microservices Breakdown
University Service

Student Service

Dormitory Service

Room Service

Reservation Service

Complaint Service

🧪 Database
Combination of SQL/NoSQL depending on service need

🐳 DevOps & Containerization
Docker for containerizing services

Kubernetes for orchestration (optional/future)
---  
