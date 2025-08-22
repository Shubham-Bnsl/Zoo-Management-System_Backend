
import { User } from "../modals/user.modal.js";
import errorHandler from "../utilities/errorHandler.js";


function generateAccessTokenAndRefreshToken(user) {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
}

export const registerUser = async (req, res, next) => {

    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return next(errorHandler(400, "All fields are required"))
        }

        const user = await User.findOne({ email });

        if (user) {
            return next(errorHandler(400, "User already exists"));
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            isAdmin: false,
            refreshToken: null,
        });

        await newUser.save();


        const modifiedUser = await User.findOne({ email }).select('-password -refreshToken');

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: modifiedUser
        })


    } catch (error) {
        return next(errorHandler(500, error.message))
    }
}

export const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(errorHandler(400, "All fields are required"))
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(400, "User not found! please register first"))
        }

        const isMatch = await user.isPasswordMatched(password);

        if (!isMatch) {
            return next(errorHandler(400, "Invalid credentials"))
        }

        const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(user);

        const modifiedUser = await User.findOne({ email }).select('-password -refreshToken');
        
        modifiedUser.refreshToken = refreshToken;
        
        await modifiedUser.save();

                        const safeUser = await User.findOne({ email }).select('-password -refreshToken');



        return res
            .status(200)
            .cookie("accessToken", accessToken, { secure: true, httpOnly: true })
            .cookie("refreshToken", refreshToken, { secure: true, httpOnly: true })
            .json({
                message: "User logged in successfully",
                user: safeUser,
                success: true
            })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const logoutUser = async (req, res, next) => {
    try {

        const user  = req.user;
        if (!user) {
            return next(errorHandler(401, "Unauthorized request"));
        }

        user.refreshToken = null;
        await user.save();

        return res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                message: "User logged out successfully",
                success: true
            })

    } catch (error) {
        return next(errorHandler(500, error.message))

    }
}