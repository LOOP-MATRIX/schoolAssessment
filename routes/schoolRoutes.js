const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/addschool', schoolController.addSchool);

router.get('/listSchools', schoolController.listSchools);

module.exports = router;
