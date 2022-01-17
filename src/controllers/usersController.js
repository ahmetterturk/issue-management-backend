const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// allUsers function fetch all users from DB,
const allUsers = async (req, res) => {
  try {
    // Getting all user with find method
    const allUsers = await User.find({});
    // if there is no users return 404 error
    if (!allUsers) {
      res.status(404).json({ msg: 'There are no users!' });
    }
    // if users exist return 200 status code and all users
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get single users
const singleUser = async (req, res) => {
  // destructure id the request params
  const { id } = req.params;
  try {
    // declare singleUser var and assign it to user with findById method and pass the id to find the specific user
    const singleUser = await User.findById(id);
    // check if there is no user with current id, return 404 error message
    if (!singleUser) {
      res.status(404).json({ msg: `No user with id: ${id}` });
    }
    // if there is return 200 status and the the specific user
    res.status(200).json({ singleUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// login user
const signIn = async (req, res) => {
  // destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // declare existingUser var and assing find user by email
    const existingUser = await User.findOne({ email });
    // if user does not exist we return 404 error message
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    // check if the password from request body is match the password in DB
    const correctPassword = await existingUser.comparePassword(password);
    // if it does not, return 400 error message for invalid credentials
    if (!correctPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // create a token with existingUser details which use the createJWT method that we cteated in our userModel with mogoose method middleware
    const token = existingUser.createJWT();

    // create userDetails object and add some properties to retrun as a response to the signin request
    const userDetails = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      image: existingUser.imageUrl,
    };
    // response with 200 status code and return userDetails and token in json format
    res.status(200).json({ userDetails, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// create user
const signUp = async (req, res) => {
  // destructure email, password, firstName, lastName and isAdmin from request body
  const { email, password, firstName, lastName, isAdmin } = req.body;

  try {
    // declare exsiting user to see if the request email exist in DB
    const existingUser = await User.findOne({ email });
    // if it does return 400 status code with error message the user alreasy exist
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // create user by passing values which come from the requst
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin,
      imageUrl: null,
    });

    // create a token with user details which use the createJWT method that we cteated in our userModel with mongoose methods middleware
    const token = user.createJWT();
    // create an object for userDetails
    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.imageUrl,
    };
    // return response with status 201 for creating and pass userDetails and token as a json fromat for the response
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
    // destructure id from request param
    const { id } = req.params;
    // destructure email, password, firstName, lastName, isAdmin and imageUrl from request body
    const { email, firstName, lastName, password, isAdmin, imageUrl } =
      req.body;
    // declare hashedPass and and pass the password from request body to hash the pass with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // declare updatingUser objest and values which come from the requst
    const updatingUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      password: hashedPassword,
      isAdmin,
    };
    // check if id is not exist return 404 error for not found
    if (!id) {
      return res.status(404).json({ error: `No user with id: ${id}` });
    }
    // update user by findByIdAndUpdate and pass the id and updatingUser object as an argument and optional cb to overwrite the exisiting value of the user, to make a new values and run all the validation from our model
    const updatedUser = await User.findByIdAndUpdate(id, updatingUser, {
      overwrite: true,
      new: true,
      runValidators: true,
    });
    // create a token with updatedUser details which use the createJWT method that we cteated in our userModel with mongoose methods meddleware
    const token = updatedUser.createJWT();
    // create an object for userDetails
    const userDetails = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      image: updatedUser.imageUrl,
    };
    // response with 200 status code and return userDetails and token as response
    res.status(200).json({ userDetails, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    // destructure id from request param
    const { id } = req.params;
    // check if id is not exist return 404 error for not found
    if (!id) {
      return res.status(404).json({ error: `No user with id: ${id}` });
    }
    // declare var and assign the User.findByIdAndDelete(id) to have a details of the deleted user
    const deletedUser = await User.findByIdAndDelete(id);
    // response with 200 and msg in json format for user has been deleted
    res.status(200).json({ msg: 'User has been deleted!', deletedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// import all users controllers
module.exports = {
  signIn,
  signUp,
  updateUser,
  deleteUser,
  allUsers,
  singleUser,
};
