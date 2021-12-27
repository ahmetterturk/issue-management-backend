const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

let secret = process.env.JWT_SECRET;
// login user
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const correctPassword = await existingUser.comparePassword(password);

    if (!correctPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = existingUser.createJWT();

    const userDetails = {
      name: existingUser.name,
      email: existingUser.email,
      image: existingUser.imageUrl,
    };

    res.status(200).json({ userDetails, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// create user
const signUp = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin, imageUrl } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password: password,
      name: `${firstName} ${lastName}`,
      isAdmin,
      imageUrl: null,
    });

    const token = user.createJWT();

    const userDetails = {
      name: user.name,
      email: user.email,
      image: user.imageUrl,
    };

    res.status(201).json({
      userDetails,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};

// Update user with Patch request
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, isAdmin, imageUrl } = req.body;
    const updatingUser = {
      email: email,
      name: `${firstName} ${lastName}`,
      imageUrl: imageUrl,
      isAdmin,
    };

    if (!id) {
      return res.status(404).json({ error: `No user with id: ${id}` });
    }
    const updatedUser = await User.findByIdAndUpdate(id, updatingUser);
    const token = updatedUser.createJWT();
    res.status(200).json({ updatedUser, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { signIn, signUp, updateUser };
