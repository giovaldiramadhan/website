const express = require('express');
const router = express.Router();
const { enrollCourse, getEnrolledCourses } = require('../controllers/user');

router.post('/enroll', enrollCourse);
router.get('/courses', getEnrolledCourses);

module.exports = router;