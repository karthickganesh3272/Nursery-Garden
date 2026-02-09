const express = require('express');
const bcrypt = require('bcryptjs'); // or use bcrypt
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library'); 
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client('102090055112-9g695smm9tjht6vumecvt36dreja5vsk.apps.googleusercontent.com'); 
// Register route
router.post('/register', async (req, res) => {
  const { name, mobile, email, location, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, mobile, email, location, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '102090055112-9g695smm9tjht6vumecvt36dreja5vsk.apps.googleusercontent.com', // Replace with your actual Google client ID
    });

    const { email, name } = ticket.getPayload(); // Extract user details from token

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({ email, name, password: '' });
      await user.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed', error: error.message });
  }
});

module.exports = router;