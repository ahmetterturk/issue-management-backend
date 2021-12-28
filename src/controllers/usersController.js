const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Get all users
const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      res.status(404).json({ msg: 'There are no users!' });
    }
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get single users
const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    if (!singleUser) {
      res.status(404).json({ msg: `No user with id: ${id}` });
    }
    res.status(200).json({ singleUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

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
    const { email, firstName, lastName, password, isAdmin, imageUrl } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatingUser = {
      email: email,
      name: `${firstName} ${lastName}`,
      imageUrl: imageUrl,
      password: hashedPassword,
      isAdmin,
    };

    if (!id) {
      return res.status(404).json({ error: `No user with id: ${id}` });
    }
    const updatedUser = await User.findByIdAndUpdate(id, updatingUser, {
      overwrite: true,
      new: true,
      runValidators: true,
    });
    const token = updatedUser.createJWT();
    const userDetails = {
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.imageUrl,
    };
    res.status(200).json({ userDetails, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: `No user with id: ${id}` });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ msg: 'User has been deleted!', deletedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  signIn,
  signUp,
  updateUser,
  deleteUser,
  allUsers,
  singleUser,
};
