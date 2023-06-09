const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

const enrollCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Check if the user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the course exists
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ error: 'User is already enrolled in this course' });
        }

        // Create a new enrollment
        const newEnrollment = new Enrollment({
            user: userId,
            course: courseId,
        });

        // Save the enrollment to the database
        await newEnrollment.save();

        return res.status(200).json({ message: 'Course enrollment successful' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while enrolling in the course' });
    }
};

const updateProgress = async (req, res) => {
    try {
        const { enrollmentId, lessonId } = req.body;

        // Check if the enrollment exists
        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        // Update the progress by adding the completed lesson
        enrollment.progress.push(lessonId);

        // Check if all lessons are completed
        const course = await Course.findById(enrollment.course);
        if (enrollment.progress.length === course.lessons.length) {
            enrollment.completionStatus = true;
        }

        // Save the updated enrollment
        await enrollment.save();

        return res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the progress' });
    }
};

module.exports = { enrollCourse, updateProgress };  
