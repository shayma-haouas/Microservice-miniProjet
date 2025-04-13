// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

module.exports = (db) => {
  // Passer la connexion à la base de données via la requête
  router.use((req, res, next) => {
    req.db = db;
    next();
  });

  router.post('/post', (req, res) => eventController.createEvent(req, res, db));
  router.get('/get', eventController.getAllEvents);
  router.get('/getbyid:id', eventController.getEventById);
  router.put('/update/:id', eventController.updateEvent);
  router.delete('/delete:id', eventController.deleteEvent);
  router.get('/generate-qrcode/:id', eventController.generateQRCode);

  router.get('/getbyemail/:email', eventController.getEventsByUserEmail);

  // Route pour générer le PDF
  router.get('/generate-pdf/:id', eventController.generateEventPDF);
  return router;
};
