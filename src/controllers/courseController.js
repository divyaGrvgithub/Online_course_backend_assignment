const Course = require('../models/course');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while retrieving the courses' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while retrieving the course' });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, description, instructor, duration, price, lessons } = req.body;
        const newCourse = new Course({
            title,
            description,
            instructor,
            duration,
            price,
            lessons,
        });

        await newCourse.save();
        return res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the course' });
    }
};

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description, instructor, duration, price, lessons } = req.body;

        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                description,
                instructor,
                duration,
                price,
                lessons,
            },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        return res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the course' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the course' });
    }
}; 

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };

