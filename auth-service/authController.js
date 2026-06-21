const User = require("./User");
const bcrypt = require("bcryptjs");
const axios = require("axios")

const generateToken = require("./generateToken");

const register = async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            role
        } = req.body;
        
        const existingUser =
            await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        try {
            await axios.post(`${process.env.USER_SERVICE}/api/users`, {
                authId: user._id,
                name: user.username,
                email: user.email,
                role: user.role
            });
        } catch (err) {
            console.error("Failed to create user profile:", err.message);
        }

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const login = async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user =
            await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token =
            generateToken(user);

        res.status(200).json({
            token,
            role: user.role
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const verify = async (req, res) => {

    res.status(200).json({
        valid: true,
        user: req.user
    });
};


module.exports = {
    register,
    login,
    verify
};
