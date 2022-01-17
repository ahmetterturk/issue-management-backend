// importing jasonwebtoken
const jwt = require('jsonwebtoken');

// assign jwt secret to the secret
let secret = process.env.JWT_SECRET;

// creating authentication middleware
const auth = async (req, res, next) => {
  try {
    // getting token from request headers authorization, because it returns a long string we need to split the string by space where there is space between "Bearer" and "token" and get the secend item from the array which is the actual token
    const token = req.headers.authorization.split(' ')[1];

    // if token is exist
    if (token) {
      // we can decode by jwt verify method and pass token and secret as an argument to decode the data
      let decodedData = jwt.verify(token, secret);
      // assign the decodedData.id to the request userId
      req.userId = decodedData && decodedData.id;
      // if all above is successful we acn call next
      next();
    }
    // if users token and userId is not authenticate, return unauthorised
  } catch (error) {
    res.status(401).json({ error: 'Unauthorised' });
  }
};

module.exports = auth;
