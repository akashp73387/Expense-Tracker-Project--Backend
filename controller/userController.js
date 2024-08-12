const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");

const userController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ message: "User account not found, please register your account" });
        if(user && await user.matchPassword(password)){
            const token = await generateToken(res, user._id);
            res.status(200).json({ message: "User authenticated successfully", data: user, token });
        }else{
            res.status(401).json({message: "Invalid credentials"})
        }
    },
    register: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if(user) return res.json({ message: "User accout already exists, please login" });
            const response = await User.create(req.body);
            const token = await generateToken(res, response._id);
            res.status(201).json({ message: "User account created successfully", data: response, token });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
}

module.exports = userController;