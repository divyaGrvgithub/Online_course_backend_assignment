const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  completionStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
