const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ดึงค่าจาก ENV (สำคัญมากสำหรับการทำ Config ใน K8s)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/shoes_db';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('DB Connection Error:', err));

app.get('/api/health', (req, res) => res.send('Backend is Healthy!'));

app.listen(5000, () => console.log('Server running on port 5000'));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//เชื่อมต่อ MongoDB
mongoose.connect('URL_CONNECTION_STRING_ของคุณ')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//สร้าง Schema (โครงสร้างข้อมูลผู้ใช้)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

//API สำหรับ Register (สมัครสมาชิก)
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password }); // ในงานจริงควร hash password ก่อน
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
});

//API สำหรับ Login (เข้าสู่ระบบ)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ email: user.email, status: 'success' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

const mongoose = require('mongoose');
require('dotenv').config();

// เชื่อมต่อ MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas (Shoe-Store)'))
    .catch(err => console.error('❌ Database Connection Error:', err));