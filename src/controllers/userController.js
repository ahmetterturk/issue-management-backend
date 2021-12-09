const { userSignUp } = require('../user/userFunction');

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
  res.json(signUpResult);
};

module.exports = { createUser };
