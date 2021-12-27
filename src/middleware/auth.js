const jwt = require('jsonwebtoken');

let secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      let decodedData = jwt.verify(token, secret);
      req.userId = decodedData && decodedData.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorised' });
  }
};

module.exports = auth;
