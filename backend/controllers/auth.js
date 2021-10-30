const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const Users = require("../models/Users");

exports.registerAdmin = (req, res) => {
    const { username, email, password } = req.body;

    if (username && password && email) {
        // check if user exists
        Users.findOne({ email }, (err, userData) => {
            userData &&
                res
                    .status(400)
                    .json({ success: false, message: "User Already exists." });
        });

        // hash passwod
        const hashPass = crypto.AES
            .encrypt(password, process.env.SECRET_KEY)
            .toString();

        // create user
        const user = new Users({
            username,
            email,
            password: hashPass,
            isAdmin: true
        });
        user.save((err, user) => {
            err &&
                res.status(400).json({ success: false, message: err.message });

            // create token
            const token = jwt.sign(
                { _id: user._id, username, email, isAdmin: user.isAdmin, avatar: user.avatar },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const { password, ...info } = user._doc;

            res.status(201).json({ ...info, token });
        });
    } else {
        res
            .status(400)
            .json({ success: false, message: "Please fill all fields." });
    }
};

exports.loginAdmin = (req, res) => {
    const { email, password: userPaass } = req.body;

    if (email && userPaass) {
        Users.findOne({ email }, (err, user) => {
            err &&
                res
                    .status(400)
                    .json({ success: false, message: "User does not exists." });

            if (user && user.isAdmin) {
                // Decrypt
                var bytes = crypto.AES.decrypt(
                    user.password,
                    process.env.SECRET_KEY
                );
                var orignialPassword = bytes.toString(crypto.enc.Utf8);

                orignialPassword !== userPaass &&
                    res
                        .status(400)
                        .json({
                            success: false,
                            message: "Email or Password is wrong."
                        });

                const { password, ...info } = user._doc;
                // create token
                const token = jwt.sign(
                    {
                        user: info
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );


                res.status(200).json({ user: info, token });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "Email or Password is wrong."
                    });
            }
        });
    } else {
        res
            .status(400)
            .json({ success: false, message: "Please fill all fields." });
    }
};
