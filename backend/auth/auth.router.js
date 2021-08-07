const { Router } = require("express");
const tryCatchWrapper = require("../helpers/try-catch-wrapper");
const {
  googleAuth,
  googleRedirect,
  logout,
  getUser,
  updateUserFeed,
} = require("./auth.controller");

const router = Router();

router.get("/google", tryCatchWrapper(googleAuth));
router.get("/google-redirect", tryCatchWrapper(googleRedirect));
router.post("/logout", tryCatchWrapper(logout));
router.post("/current", tryCatchWrapper(getUser));
router.post("/feed", tryCatchWrapper(updateUserFeed));

module.exports = router;
