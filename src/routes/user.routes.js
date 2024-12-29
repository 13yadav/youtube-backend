import { Router } from "express";
import {
  changePassword,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/me").post(verifyJWT, getUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/update-avatar").post(upload.single("avatar"), updateAvatar);
router.route("/update-cover").post(upload.single("coverImage"), updateCoverImage);

export default router;
