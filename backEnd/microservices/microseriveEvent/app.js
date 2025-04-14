const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // ✅ version PROMISE
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const Eureka = require('eureka-js-client').Eureka;


const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

(async () => {
  try {
    // ✅ Création asynchrone de la connexion
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eventsDB'
    });

    console.log('✅ Connecté à la base de données MySQL.');

    // ✅ Injecter la DB dans les routes
    app.use('/events', eventRoutes(db));

    // ✅ Lancer le serveur seulement après la connexion réussie
    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
  }
})();


const client = new Eureka({
  // L'URL de ton serveur Eureka
  eureka: {
    // L'URL de ton serveur Eureka
    host: 'localhost', // Change en fonction de ton serveur Eureka
    port: 8761,
    servicePath: '/eureka/apps',
  },
  instance: {
    // Le nom du service dans Eureka
    app: 'EVENT-MICROSERVICE', // Nom de ton microservice
    hostName: 'localhost', // Ou l'IP de ton serveur
    ipAddr: '127.0.0.1', // L'IP locale de ton service
    port: {
      '$': 3000, // Le port de ton serveur Express
      '@enabled': 'true'
    },
    vipAddress: 'event-service', // Nom de l'API
    secureVipAddress: 'event-service',
    statusPageUrl: 'http://localhost:3000/health', // Page de statut de ton service
    homePageUrl: 'http://localhost:3000',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      'name': 'MyOwn'
    }
  }
});

// Enregistrer le service auprès d'Eureka
client.start((error) => {
  if (error) {
    console.error('Erreur lors de l\'enregistrement avec Eureka:', error);
  } else {
    console.log('Service enregistré avec Eureka.');
  }
});


/*const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // ✅ Ajouté
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const port = 3000;

// ✅ Autoriser les requêtes CORS
app.use(cors({
  origin: 'http://localhost:4200', // autoriser uniquement Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

// ✅ Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eventsDB'
});

/*const db = mysql.createConnection({
  host: 'host.docker.internal',
  user: 'root',
  password: '',
  database: 'eventsDB'
});*/

/*db.connect(err => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err);
  } else {
    console.log('✅ Connecté à la base de données MySQL.');
  }
});

// ✅ Utilisation des routes
app.use('/events', eventRoutes(db));

// ✅ Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});
*/