const mongoose = require('mongoose');
// importing jsonwebtoken to create jwt
const jwt = require('jsonwebtoken');
// importing bcrypt to hash password before save
const bcrypt = require('bcryptjs');
// created user schema with mongoose schema and add the user properties
const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// mongoose presave to hash password before creating the user
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Add an instance method to documents constructed from Models compiled from this schema, which can be call in the user controller to create a token
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      name: this.name,
      id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );
};
// Add an instance method to documents constructed from Models compiled from this schema, which can can be called to compare password by passing password from request as an arguments
userSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
