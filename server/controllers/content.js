const User = require('../models/User');

const saveContent = async (req, res) => {
  const { userId } = req.user;
  const { courseId, contentTitle } = req.body;

  if (!courseId || !contentTitle) {
    return res.status(400).json({ message: 'Course ID and Content Title are required' });
  }

  try {
    // Cari user dan kursus spesifik yang sudah di-enroll
    const user = await User.findOne({ 
      _id: userId, 
      'enrolledCourses.courseId': courseId 
    });

    if (!user) {
      return res.status(404).json({ message: 'User is not enrolled in this course.' });
    }

    // Dapatkan indeks dari kursus yang di-enroll
    const courseIndex = user.enrolledCourses.findIndex(c => c.courseId === courseId);

    // Cek apakah konten sudah disimpan
    const contentIndex = user.enrolledCourses[courseIndex].savedContent.indexOf(contentTitle);

    if (contentIndex > -1) {
      // Jika sudah ada, hapus (unsave)
      user.enrolledCourses[courseIndex].savedContent.splice(contentIndex, 1);
      await user.save();
      return res.status(200).json({ message: 'Content removed from saved list', savedContent: user.enrolledCourses[courseIndex].savedContent });
    } else {
      // Jika belum ada, tambahkan (save)
      user.enrolledCourses[courseIndex].savedContent.push(contentTitle);
      await user.save();
      return res.status(200).json({ message: 'Content saved successfully', savedContent: user.enrolledCourses[courseIndex].savedContent });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { saveContent };