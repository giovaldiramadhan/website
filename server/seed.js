require('dotenv').config();
const connectDB = require('./db/connect');
const Course = require('./models/Course');
const coursesData = require('./data.js').default;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Hapus data lama
        await Course.deleteMany();
        console.log('Old data deleted.');

        // Masukkan data baru
        await Course.create(coursesData);
        console.log('New data successfully seeded!');

        process.exit(0); // Keluar dari skrip jika berhasil
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1); // Keluar dengan kode error
    }
}

start();