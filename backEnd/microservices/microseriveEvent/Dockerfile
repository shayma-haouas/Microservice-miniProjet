# Étape 1 : Utilisation d'une image de base Node.js
FROM node:16

# Étape 2 : Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Étape 4 : Installer les dépendances de l'application
RUN npm install

# Étape 5 : Copier tout le reste du code dans le conteneur
COPY . .

# Étape 6 : Exposer le port que votre application écoute
EXPOSE 3000

# Étape 7 : Lancer l'application
CMD ["npm", "start"]
