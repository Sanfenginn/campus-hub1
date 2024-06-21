const express = require("express");
const usersRouter = express.Router();
const {
  addUser,
  deleteUserById,
  updateUserById,
  getAllUsers,
  getUserById,
} = require("../controllers/usersController");
const {
  validateUser,
  checkId,
} = require("../middlewares/validationMiddleware");

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", checkId, getUserById);
usersRouter.post("/", validateUser, addUser);
usersRouter.put("/:id", checkId, validateUser, updateUserById);
usersRouter.delete("/:id", checkId, deleteUserById);

module.exports = usersRouter;
