import User from "../models/user.model.js"

export const createUser = async (payload) => {

    console.log(payload)

    try {

        const response = await User.create(payload)

        return response ? response : null

    } catch (error) {
        console.error("Something went wrong creating user", error.message)
        throw new Error("Internal server error");
    }
}

export const findUserByUsername = async (username) => {

    try {

        const response = await User.findOne({ username })

        return response ? response : null

    } catch (error) {
        console.error("Something went wrong find user", error.message)
        throw new Error("Internal server error");
    }
}

export const findById = async (userId) => {

    try {

        const response = await User.findById({ _id: userId })

        return response ? response : null

    } catch (error) {
        console.error("Something went wrong finding user", error.message)
        throw new Error("Internal server error");
    }
}


