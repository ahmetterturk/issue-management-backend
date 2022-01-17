// importing cloudinary
const cloudinary = require('cloudinary').v2;
// importing file system from node to mange our data
const fs = require('fs');

// creating uploadProfileImage contorller
const uploadProfileImage = async (req, res) => {
  // declaring result var and assign cloudinary uploader.upload mehtod to pass the request files image
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      // set use file name to true to use the current file name
      use_filename: true,
      // in cloud we name the folder for uploading images lock-secutriy and we point the folder to the cloud folder
      folder: 'lock-security',
    }
  );

  // with fs.unlinkSync removing the temp file from root directory
  fs.unlinkSync(req.files.image.tempFilePath);
  // response with 200 status and image object in a json format and retrun the src with a value of result.secure_url to the user
  res.status(200).json({ image: { src: result.secure_url } });
};
// import the uploadProfileImage controller
module.exports = {
  uploadProfileImage,
};
