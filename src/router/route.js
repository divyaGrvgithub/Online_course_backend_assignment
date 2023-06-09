const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');
const enrollmentController = require('../controllers/enrollmentController');
const { authenticateUser, authorizeUser } = require('../middleware/authMiddleware');

// User Routes
router.post('/register',authenticateUser, userController.registerUser);
router.post('/login',authenticateUser, userController.loginUser);
router.put('/update', userController.updateUserProfile);

// Course Routes
router.get('/courses',authenticateUser, authorizeUser, courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses',authenticateUser, courseController.createCourse);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

// Enrollment Routes
router.post('/enroll/:courseId',authenticateUser, enrollmentController.enrollCourse);
router.put('/progress/:enrollmentId', enrollmentController.updateProgress);

router.all("/*", async function (req, res) {
    return res.status(400).send({ status: false, message: "Page not found" });
});
  
module.exports = router