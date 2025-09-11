// Perhatikan: Tidak ada lagi 'import' di sini

const courses = [
    {
        id: "xMHCZl",
        category: "python",
        image: "python_5", // Diubah menjadi string
        course_name: "Learn Python: The Complete Python Programming Course",
        description: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
        rating_count: 3059,
        rating_star: 4.4,
        students: 18430,
        creator: "Avinash Jain, The Codex",
        updated_date: "9/2015",
        lang: "english",
        actual_price: 84.99,
        discounted_price: 9.99,
        what_you_will_learn: [
            "Create their own Python Programs",
            "Become an experienced Python Programmer",
            "Parse the Web and Create their own Games"
        ],
        content: [
            "Up and Running With Python",
            "The Basics(Data Types)",
            "Conditions and Loops",
            "Functions!",
            "Classes! (Object Oriented Programming)",
            "File Input/Output",
            "Using Python Modules"
        ]
    },
    {
        id: "dtfo9e",
        category: "python",
        image: "python_4", // Diubah menjadi string
        course_name: "Learning Python for Data Analysis and Visualization",
        description: "Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!",
        rating_count: 3059,
        rating_star: 4.3,
        students: 184053,
        creator: "Jose Portilla",
        updated_date: "9/2019",
        lang: "english",
        actual_price: 84.99,
        discounted_price: 9.99,
        what_you_will_learn: [
            "Have an intermediate skill level of Python programming.",
            "Use the numpy library to create and manipulate arrays.",
            "Learn how to work with various data formats within python, including: JSON,HTML, and MS Excel Worksheets.",
            "Have a portfolio of various data analysis projects."
        ],
        content: [
            "Intro to Course and Python",
            "Learning Numpy",
            "Data Visualization",
            "Example Projects",
            "Machine Learning",
            "SQL and Python",
            "Web Scraping with Python"
        ]
    },
    // ... (Semua objek kursus lainnya mengikuti pola yang sama) ...
    // Pastikan Anda menyalin semua objek kursus dari file asli Anda,
    // dan hanya mengubah nilai properti 'image' menjadi string seperti contoh di atas.
    // Contoh untuk data terakhir:
    {
        id: "NrZ_qd",
        category: "marketing",
        image: "marketing_2", // Diubah menjadi string
        course_name: "How to Market Yourself as a Coach or Consultant",
        description: "Learn a Proven, Step-by-Step Process You Can Use to Package, Brand, Market, & Sell Your Coaching or Consulting Services",
        rating_count: 963,
        rating_star: 3.8,
        students: 11848,
        creator: "Debbie LaChusa",
        updated_date: "4/2022",
        lang: "english",
        actual_price: 40.99,
        discounted_price: 10.99,
        what_you_will_learn: [
            "Identify who your Ideal Clients are so you know exactly who to market and sell to",
            "Learn how to create a Signature Program so you can stop selling your time or creating spec proposals",
            "Learn how to write Compelling Marketing Copy you can use to attract your ideal clients",
            "Learn how to create a Financially Viable Business and understand exactly what it will take to reach your financial goals",
            "Learn how to easily create your own Wordpress Coaching or Consulting Website"
        ],
        content: [
            "Building Your Business & Marketing Foundation",
            "Packaging Your Services",
            "Branding Yourself & Your Business",
            "Marketing Message Development",
            "Getting clients: Objectives & strategies",
            "Markting Yourself Online: Website Development",
            "Marketing Implementation: Create a 90-Day Marketing Plan",
        ]
    }
];

// Menggunakan module.exports agar bisa di-require di server.js
module.exports = {
    default: courses
};