import generateToken from "../config/generate-token.js";
import { createUser, findUserByUsername } from "../services/user.service.js";
import bcryptjs from 'bcryptjs';


export const signup = async (req, res) => {
    const { username, password, email, name } = req.body;
    try {
        const users = await findUserByUsername(username)

        if (users) {
            res.status(400).json({ Status: false, Message: "user is already exist with this username!" });
        }

        const encryptedPassword = bcryptjs.hashSync(password, 10);

        const response = await createUser({ username, password: encryptedPassword, email, name })

        if (!response) {
            res.status(400).json({ Status: false, Message: "something went wrong creating user" });
        }

        res.status(201).json({ Status: true, Message: "Signup Completed !" })

    } catch (error) {
        console.error("Someting went wrong in signup", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }

}

export const login = async (req, res) => {

    const { username, password } = req.body;

    console.log(req.body)

    try {
        const existing = await findUserByUsername(username);

        console.log(existing, "existing")

        if (!existing) {
            res.status(401).json({
                status: false,
                message: "Invalid username !"
            })
        }

        const validatePassword = bcryptjs.compareSync(password, existing.password);

        if (!validatePassword) {
            res.status(401).json({
                status: false,
                message: "Wrong Password!"
            })
        }

        const tokenData = {
            userId: existing._id,
            email: existing.email,
            username: existing.username,
        }

        const token = generateToken(tokenData);

        res.status(200)
            .json({
                status: true,
                message: "Login Successful",
                token: token
            });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Internal server error" });
    }

}