const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // ✅ version PROMISE
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

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
      host: 'host.docker.internal',
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