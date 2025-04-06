// require('dotenv').config();
// const express = require('express');
// const authRoutes = require('./routes/authRoutes');
// const eventRoutes = require('./routes/eventRoutes');

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Virtual Event Management Platform API!');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
