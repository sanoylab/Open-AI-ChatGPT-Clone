const express = require('express');
const { generateImage } = require('../controllers/openaiController');
const { generateText } = require('../controllers/openaiTextController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/generatetext', generateText)

module.exports = router;
