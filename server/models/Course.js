const mongoose = require('mongoose');

    const CourseSchema = new mongoose.Schema({
      id: { type: String, required: true, unique: true },
      category: String,
      image: String,
      course_name: String,
      description: String,
      rating_count: Number,
      rating_star: Number,
      students: Number,
      creator: String,
      updated_date: String,
      lang: String,
      actual_price: Number,
      discounted_price: Number,
      what_you_will_learn: [String],
      content: [String]
    });

    module.exports = mongoose.model('Course', CourseSchema);