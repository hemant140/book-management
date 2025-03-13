import jwt from 'jsonwebtoken';

const generateToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRECT_KEY, { expiresIn: "30d" });
}

export default generateToken;