const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  enrolledCourses: [
    {
      courseId: {
        type: String,
        ref: 'Course',
        required: true,
      },
      progress: {
        type: Number,
        default: 0,
      },
      enrolledAt: {
        type: Date,
        default: Date.now,
      },
      // TAMBAHAN BARU: Array untuk menyimpan materi yang disimpan
      savedContent: {
        type: [String], // Menyimpan daftar judul materi sebagai string
        default: [],
      },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);