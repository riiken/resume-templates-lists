const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const templateRoutes = require('./routes/templateRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Serve static files from the templates directory
app.use(express.static('templates'));

app.use('/api', templateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
