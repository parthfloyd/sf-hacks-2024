const express = require('express');
const { testFunction, inquiryFunction } = require('../controllers/llm.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const { loadDocsToLLM } = require('../services/document-retriever.service');
const multer = require("multer");

// Multer Configuration
const mainStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/main/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const emailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/email-template/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const timelineStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/timeline/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
  
const uploadMain = multer({storage: mainStorage });
const uploadEmail = multer({storage: emailStorage });
const uploadTimeline = multer({storage: timelineStorage });


// Route to fetch user profile info
router.get('/test', testFunction);

router.get('/inquiry', inquiryFunction);

router.post('/upload', uploadMain.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  
});

router.post('/uploadEmail', uploadEmail.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  
});

router.post('/uploadTimeline', uploadTimeline.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });        
});
module.exports = router;