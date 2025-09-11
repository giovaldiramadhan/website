const User = require('../models/User');
const Course = require('../models/Course');

// Mendaftarkan user ke sebuah kursus (Tidak ada perubahan di sini)
const enrollCourse = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.body;

  try {
    const user = await User.findById(userId);
    const course = await Course.findOne({ id: courseId });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const isEnrolled = user.enrolledCourses.some(c => c.courseId === courseId);
    if (isEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    user.enrolledCourses.push({ courseId: course.id, progress: 0 }); // Simpan ID custom
    await user.save();

    res.status(200).json({ message: 'Successfully enrolled', course });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// **PERBAIKAN UTAMA ADA DI FUNGSI DI BAWAH INI**
// Mendapatkan semua kursus yang sudah diikuti user
const getEnrolledCourses = async (req, res) => {
  const { userId } = req.user;
  try {
    // 1. Dapatkan data user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Ekstrak semua ID kursus yang telah di-enroll
    const enrolledCourseIds = user.enrolledCourses.map(c => c.courseId);

    // 3. Cari semua dokumen kursus yang cocok dengan ID tersebut
    const courseDetails = await Course.find({ id: { $in: enrolledCourseIds } });

    // 4. Gabungkan detail kursus dengan progres yang spesifik untuk user
    const enrolledCoursesWithProgress = courseDetails.map(course => {
      const enrollmentInfo = user.enrolledCourses.find(c => c.courseId === course.id);
      return {
        ...course.toObject(), // Ubah dokumen Mongoose menjadi objek biasa
        progress: enrollmentInfo ? enrollmentInfo.progress : 0
      };
    });

    res.status(200).json(enrolledCoursesWithProgress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { enrollCourse, getEnrolledCourses };