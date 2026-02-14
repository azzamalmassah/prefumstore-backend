import User from "../models/usersModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
const data = "This route is not defined yet";

const fliterObj = (obj = {}, ...allowedFields) => {
  const allowedData = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) allowedData[el] = obj[el];
  });
  return allowedData;
};
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    length: users.length,
    data: {
      users,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body && (req.body.password || req.body.passwordConfirm)) {
    return next(
      new AppError(
        "You can not use this route to update password please use /updateMyPassword",
        400
      )
    );
  }
  const filteredBody = fliterObj(req.body, "name", "email");
  console.log("Filtered body:", filteredBody);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  await User.findByIdAndUpdate(user._id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
export const createUser = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      data,
    },
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      data,
    },
  });
});

export const updateUser = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      data,
    },
  });
});

export const getUser = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      data,
    },
  });
});
