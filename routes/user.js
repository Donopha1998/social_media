const express = require('express')
const {createUser, login,updateUser, getAllUsers} = require('../controllers/user_controller')
const protect = require('../middleware/auth')
const router = express.Router()

router.route('/create').post(createUser)
router.route('/login').post(login)
router.route('/update').put(protect,updateUser)
router.route("/all").get(protect, getAllUsers);

module.exports = router