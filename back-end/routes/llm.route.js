const express = require('express');
const { testFunction } = require('../controllers/llm.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const { loadDocsToLLM } = require('../services/document-retriever.service');
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage });

// Route to fetch user profile info
router.get('/test', verifyToken, testFunction);

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    loadDocsToLLM().then((result) => {
        res.json({ message: 'File uploaded successfully', filename: req.file.filename });        
    });
  });
module.exports = router;