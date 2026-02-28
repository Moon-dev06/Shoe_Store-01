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