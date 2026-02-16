import User from "../models/usersModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  getOne,
  updateOne,
  deleteOne,
  createOne,
  getAll,
} from "./handlerFactory.js";

const data = "This route is not defined yet";

const fliterObj = (obj = {}, ...allowedFields) => {
  const allowedData = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) allowedData[el] = obj[el];
  });
  return allowedData;
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body && (req.body.password || req.body.passwordConfirm)) {
    return next(
      new AppError(
        "You can not use this route to update password please use /updateMyPassword",
        400,
      ),
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
  res.status(500).json({
    success: false,
    message: "this route is not defined please use /signup instead",
  });
});

export const deleteUser = deleteOne(User);
export const getUser = getOne(User);
export const getAllUsers = getAll(User);

// Do NOT update passwords and role with this!
export const updateUser = updateOne(User);
