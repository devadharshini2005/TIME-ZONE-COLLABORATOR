require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    mobile: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    }
});

const User = mongoose.model('User', userSchema);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
    },
});

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Email Storage API!');
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password, mobile } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, mobile });
        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(400).send('Error signing up: ' + error.message);
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

// Meeting Schema
const meetingSchema = new mongoose.Schema({
    teamMembers: [
        {
            name: { type: String, required: true },
            timeZone: { type: String, required: true },
            selectedTime: { type: String, required: true },
            selectedDate: { type: String, required: true },
        },
    ],
    commonTime: { type: String, required: true },
    userEmail: { type: String, required: true }, // Field for user email
}, {
    timestamps: true
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// Save meeting data for logged-in user
app.post('/save-meeting', async (req, res) => {
    const { teamMembers, commonTime } = req.body;
    const userEmail = req.headers['user-email'];

    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
        return res.status(400).send('Invalid or missing team members data.');
    }

    if (!commonTime) {
        return res.status(400).send('Common time is required.');
    }

    try {
        const newMeeting = new Meeting({ teamMembers, commonTime, userEmail });
        await newMeeting.save();
        res.status(201).send('Meeting saved successfully!');
    } catch (error) {
        console.error('Error saving meeting:', error);
        res.status(500).send('Error saving meeting.');
    }
});

// Get all saved meetings for logged-in user
app.get('/get-meetings', async (req, res) => {
    const userEmail = req.headers['user-email'];

    try {
        const meetings = await Meeting.find({ userEmail });
        res.status(200).json({ meetings });
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).send('Error fetching meetings.');
    }
});

// Socket.io for real-time notifications
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('newNotification', 'You have a new meeting scheduled.');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
