const express = require("express");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
    try {
        bcrypt.hash(req.password, 5, async (error, hash) => {
            if (err) {
                res.status(400).json({ error: error.message })
            } else {
                const newUser = new UserModel({ ...req.body, password: hash });
                await newUser.save();
                res.status(200).json({ msg: "Successfully Registered!!" })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email } = req.body;
    try {
        const user = UserModel.find({ email });
        if (user) {
            bcrypt.compare(req.password, user.password, async (error, result) => {
                if (error) res.status(400).json({ error: error.message })
                if (result) {
                    jwt.sign({ userID: user._id, userName: user.name }, process.env.Secret_key, (err, token) => {

                        res.status(200).json({ msg: "Successfully Logged In", token, user })
                    })
                }

            })
        } else {
            res.status(200).json({ msg: "Wrong Credentials!!" })

        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = { userRouter };