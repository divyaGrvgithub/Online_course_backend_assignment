const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User authentication successful
    return res.status(200).json({ message: 'User authentication successful' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's name and email
    user.name = name;
    user.email = email;

    // Save the updated user profile
    await user.save();

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the user profile' });
  }
};

module.exports={registerUser, loginUser, updateUserProfile};
