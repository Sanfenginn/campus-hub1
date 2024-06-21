const express = require("express");
const usersRouter = express.Router();
const {
  addUser,
  deleteUserById,
  updateUserById,
  getAllUsers,
  getUserById,
} = require("../controllers/usersController");

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", addUser);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);

module.exports = usersRouter;
