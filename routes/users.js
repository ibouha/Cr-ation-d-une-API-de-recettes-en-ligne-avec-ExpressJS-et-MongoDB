const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cheackUser = require("../middlewares/user/userMiddleware");
const cheakLogin = require("../middlewares/user/loginMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
* @desc Register New User
* @route /api/auth/register
* @method POST
  @access public
*
*/

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *             example:
 *               email: user@example.com
 *               password: password123
 *               username: JohnDoe
 *               isAdmin: false
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: { "_id": "60f3b8f58570635cd768ea80", "email": "user@example.com", "username": "JohnDoe", "isAdmin": false }
 *               message: User created successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Email or Password is invalid"
 */
router.post("/register", cheackUser, async (req, res) => {
  const { email, password, username, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      email,
      password: hashPassword,
      username,
      isAdmin,
    });
    res.status(201).json({
      success: true,
      data: createUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with existing user credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: { "_id": "60f3b8f58570635cd768ea80", "email": "user@example.com", "username": "JohnDoe", "isAdmin": false }
 *               token: "jwt_token_here"
 *               message: Login successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Email or Password is invalid"
 */

router.post("/login", cheakLogin, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email or Password is invalid" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Email or Password is invalid" });
    }

    // Your secret key to sign the token
    const secretKey = process.env.SECRET_KEY;

    // Payload data to be included in the token
    const payload = {
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    // Options for the token (optional)
    const options = {
      expiresIn: "1h", // Token expiration time
    };

    // Create the JWT token
    const token = jwt.sign(payload, secretKey, options);

    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
