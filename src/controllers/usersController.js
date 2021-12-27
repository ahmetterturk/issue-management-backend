const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

let secret = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      secret,
      {
        expiresIn: '1h',
      }
    );

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

const signUp = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin, imageUrl } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      isAdmin,
      imageUrl: null,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, isAdmin: result.isAdmin },
      secret,
      {
        expiresIn: '1h',
      }
    );

    const userDetails = {
      name: result.name,
      email: result.email,
      image: result.imageUrl,
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

module.exports = { signIn, signUp };
