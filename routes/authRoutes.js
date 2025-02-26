const router = require("express").Router();
const authController = require("../controllers/authController");
const validateUser = require("../middlewares/validateUser");

router.post('/register', validateUser, authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authController.logout)

module.exports = router;
