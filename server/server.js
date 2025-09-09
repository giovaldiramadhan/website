require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Make sure axios is installed: npm install axios

const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const contentRouter = require('./routes/content'); // <-- Impor router baru
const authMiddleware = require('./middleware/auth');
const Course = require('./models/Course');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', authMiddleware, userRouter);
app.use('/api/content', authMiddleware, contentRouter); // <-- Tambahkan rute ini

app.get('/', (req, res) => {
  res.send('<h1>Elice Learning Platform API</h1><p>Selamat datang di Backend API.</p>');
});

// Endpoint for Unsplash Image Proxy
app.get('/api/image-proxy', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await axios.get(unsplashUrl);
    
    if (response.data.results && response.data.results.length > 0) {
      res.status(200).json({ imageUrl: response.data.results[0].urls.regular });
    } else {
      res.status(404).json({ message: 'No image found for this query' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image from Unsplash', error: error.message });
  }
});


// Other course routes...
app.get('/api/courses', async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const skip = (page - 1) * limit;
  
      const courses = await Course.find({}).skip(skip).limit(limit);
      const totalCourses = await Course.countDocuments({});
      const totalPages = Math.ceil(totalCourses / limit);
  
      res.status(200).json({ courses, totalPages, currentPage: page, totalCourses });
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil data kursus', error: error.message });
    }
});
  
app.get('/api/courses/:id', async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const course = await Course.findOne({ id: courseId });
        if (!course) {
            return res.status(404).json({ message: `Tidak ada kursus dengan id: ${courseId}` });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data kursus', error: error.message });
    }
});
  
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Course.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data kategori', error: error.message });
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Query parameter "q" is required' });
        }
        const courses = await Course.find({
            $or: [
                { course_name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error searching courses', error: error.message });
    }
});

// Start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Berhasil terhubung ke Database MongoDB...');
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Koneksi ke database gagal:', error);
  }
};

start();