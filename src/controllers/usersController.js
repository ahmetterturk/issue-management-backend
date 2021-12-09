const { userSignUp, userSignIn } = require('../user/userFunction');

const createUser = async (req, res) => {
  let newUserDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  // pass validation
  if (newUserDetails.password < 8) {
    console.log('Password to short!');
    res.json({ error: 'Password to short!' });
  }

  let signUpResult = await userSignUp(newUserDetails);

  if (signUpResult.error != null) {
    console.log('There was an error, please try again');
    res.json(signUpResult);
    return;
  }

  let signInResult = await userSignIn(newUserDetails);

  if (signInResult.error != null) {
    console.log('sign in failed, returning error ro requestor');
    res.json(signInResult);
    return;
  }

  res.json(signInResult);
};

const signInUser = async (req, res) => {
  // Process posted form/json data
  let existingUserDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  let signInResult = await userSignIn(existingUserDetails);

  if (signInResult.error != null) {
    console.log('Sign in failed, returning error ro requestor');
    res.json(signInResult);
    return;
  }

  res.json(signInResult);
};

module.exports = { createUser, signInUser };
