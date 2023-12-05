const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(cors());
// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple schema for user accounts (adjust as needed)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Example route to create a new user
app.post('/createUser', async (req, res) => {
    try {
      const { username, email } = req.body;
  
      // Validate input (adjust as needed)
      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
  
      const newUser = new User({
        username,
        email,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  });
  

// Example route to view all users
app.get('/viewUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
