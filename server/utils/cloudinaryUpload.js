const cloudinary = require('cloudinary');

// A simple function to upload to Cloudinary
const uploadFile = async (file) => {
  // The Upload scalar return a a promise
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  // Initiate Cloudinary with your credentials
  cloudinary.v2.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinaryApiKey,
    api_secret: process.env.cloudinaryApiSecret,
    secure: true,
  });

  // Return the Cloudinary object when it's all good
  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.v2.uploader.upload_stream(function (err, fileUploaded) {
      // In case something hit the fan
      if (err) {
        reject(err);
      }

      // All good :smile:
      resolve(fileUploaded);
    });

    fileStream.pipe(cloudStream);
  });
};

module.exports = {
  uploadFile,
};
