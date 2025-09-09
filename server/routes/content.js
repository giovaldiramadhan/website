const express = require('express');
const router = express.Router();
const { saveContent } = require('../controllers/content');

// Endpoint ini akan menangani save dan unsave
router.post('/toggle-save', saveContent);

module.exports = router;