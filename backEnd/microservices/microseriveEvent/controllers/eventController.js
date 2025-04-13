const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

// Liste de mots interdits (à adapter)
const badWords = ['mauvaismot1', 'mauvaismot2', 'exemple'];

/**
 * Fonction pour censurer les mots interdits dans un texte.
 * Chaque occurrence d'un mot interdit sera remplacée par des astérisques de même longueur.
 * @param {string} text Le texte à censurer
 * @param {string[]} badWords Tableau de mots interdits
 * @returns {string} Texte censuré
 */
function censorBadWords(text, badWords) {
  // Pour chaque mot interdit, remplacer toutes ses occurrences (insensibles à la casse) par des astérisques
  badWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    const replacement = '*'.repeat(word.length);
    text = text.replace(regex, replacement);
  });
  return text;
}

// Créer un événement
/*exports.createEvent = (req, res) => {
    let { titre, description, dateDebut, dateFin } = req.body;

    // Censurer les mots interdits dans la description
    description = censorBadWords(description, badWords);

    const query = 'INSERT INTO Event (titre, description, dateDebut, dateFin) VALUES (?, ?, ?, ?)';
    const params = [titre, description, dateDebut, dateFin];

    req.db.execute(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Événement créé avec succès', id: result.insertId });
    });
};*/

// Exemple Express (si jamais tu changes d'avis plus tard)
exports.createEvent = async (req, res, db) => {
    try {
      const { titre, description, dateDebut, dateFin, email } = req.body;
  
      if (!titre || !description || !dateDebut || !dateFin || !email) {
        return res.status(400).json({ message: 'Champs obligatoires manquants' });
      }
  
      // 🔍 Récupérer l'ID utilisateur à partir de l'email
      const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      const userId = rows[0].id;
  
      // 🧼 Censurer la description
      const cleanDescription = censorBadWords(description, badWords);
  
      // ✅ Insérer l'événement
      const [result] = await db.execute(
        'INSERT INTO event (titre, description, dateDebut, dateFin, user_id) VALUES (?, ?, ?, ?, ?)',
        [titre, cleanDescription, dateDebut, dateFin, userId]
      );
  
      res.status(201).json({ message: 'Événement créé avec succès', id: result.insertId });
  
    } catch (error) {
      console.error('Erreur dans createEvent :', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  
  

// Récupérer tous les événements
exports.getAllEvents = async (req, res) => {
    try {
        const [rows] = await req.db.execute('SELECT * FROM Event');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await req.db.execute('SELECT * FROM Event WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEventsByUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const [rows] = await req.db.execute(
            `SELECT * FROM Event 
             WHERE user_id = (SELECT id FROM Users WHERE email = ?)`,
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé pour cet email." });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Mettre à jour un événement
exports.updateEvent = (req, res) => {
    const { id } = req.params;
    let { titre, description, dateDebut, dateFin } = req.body;

    // Optionnel : censurer aussi lors de la mise à jour
    description = censorBadWords(description, badWords);

    const query = 'UPDATE Event SET titre = ?, description = ?, dateDebut = ?, dateFin = ? WHERE id = ?';
    const params = [titre, description, dateDebut, dateFin, id];
    req.db.execute(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json({ message: 'Événement mis à jour avec succès' });
    });
};

// Supprimer un événement
exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Event WHERE id = ?';
    req.db.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json({ message: 'Événement supprimé avec succès' });
    });
};

// Générer un QR Code contenant un lien vers un PDF de l'événement
exports.generateQRCode = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Event WHERE id = ?';
    req.db.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        const event = result[0];
        const pdfLink = `http://localhost:3000/events/generate-pdf/${event.id}`;
        QRCode.toDataURL(pdfLink, (err, qrCodeData) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur de génération du QR code' });
            }
            res.status(200).json({ message: 'QR Code généré avec succès', qrCodeData });
        });
    });
};

// Générer un PDF contenant les informations de l'événement
exports.generateEventPDF = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Event WHERE id = ?';
    req.db.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        const event = result[0];
        const doc = new PDFDocument();
        const filename = `${event.titre.replace(/\s+/g, '_')}.pdf`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/pdf');
        doc.fontSize(18).text('Détails de l\'Événement', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Titre: ${event.titre}`);
        doc.text(`Description: ${event.description}`);
        doc.text(`Date de début: ${event.dateDebut}`);
        doc.text(`Date de fin: ${event.dateFin}`);
        doc.pipe(res);
        doc.end();
    });
};
