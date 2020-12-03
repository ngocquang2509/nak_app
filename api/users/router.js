const router = require("express").Router();
const {createUser, getUserById, getUsers, updateUser, deleteUser, login} = require("./controller");
//const { checkToken } = require("../../auth/token_validation");

router.get("/list", getUsers);
router.post("/register", createUser);
router.get("/:id", getUserById);
router.post("/login", login);
router.patch("/update", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;