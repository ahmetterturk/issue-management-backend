const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProfileImage = async (req, res) => {
  // uploading the image to the cloud, read the coludinary docs
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'lock-security',
    }
  );

  // with fs.unlinkSync removing the temp file from root directory
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(200).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProfileImage,
};
