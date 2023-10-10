import express from "express";
import {
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateRole,
  updateUser,
} from "../controllers/user.controller";
import {
  deleteUserValidator,
  getUserValidator,
  updateRoleValidator,
  updateValidator,
} from "../validation/user.validator";

const router = express.Router();
router.get("/", getUsers);
router.get("/me", getMe);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router.patch("/role/:id", updateRoleValidator, updateRole);

export default router;
