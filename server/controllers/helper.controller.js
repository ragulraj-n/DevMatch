const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const cloudinary = require("../config/cloudinary");
const ApiResponse = require("../utils/ApiResponse");

const uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(404, "IMAGE_NOT_FOUND", "Image not found");
  }

  if (!file.mimetype.startsWith("image")) {
    throw new ApiError(400, "INVALID_FILE_TYPE", "Only image files allowed");
  }
  const user = req.user;
  const userId = user._id;

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "DevMatch/profile-image",
        public_id: `user_${userId}`,
        overwrite: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) {
          return reject(
            new ApiError(500, "INTERNAL_SERVER_ERROR", "Cloudinary upload failed")
          );
        }
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });

  user.profileImage = {
    imageUrl: result.secure_url,
    publicId: result.public_id,
  }

  await user.save();

  return res.status(200).json(new ApiResponse(200,"Image uploaded successfully",{
    imageUrl: result.secure_url,
  }));
});

module.exports = uploadImage;