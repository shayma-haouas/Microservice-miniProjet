# University Dormitory Management System

📌 Microservice Réservation

Le microservice Réservation gère le processus de réservation des chambres pour les étudiants dans les foyers universitaires. Chaque réservation est liée à un étudiant (Etudiant) et contient des informations telles que l’année universitaire, la validation de la réservation et un identifiant unique (idReservation). Une réservation est également indirectement liée à une chambre (Chambre), qui fait partie d’un bloc (Bloc) rattaché à un foyer (Foyer) appartenant à une université (Université). Ce microservice permet d’ajouter, modifier et supprimer des réservations. Les entités connectées assurent la cohérence du système, où un étudiant peut effectuer plusieurs réservations, et chaque réservation peut cibler une chambre spécifique selon le type défini dans l’énumération TypeChambre (SIMPLE, DOUBLE, TRIPLE). Ce découplage en microservices permet de mieux gérer les responsabilités et de garantir l’évolutivité du système.
