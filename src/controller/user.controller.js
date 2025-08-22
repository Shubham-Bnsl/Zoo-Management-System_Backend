import { User } from "../modals/user.modal.js";


function generateAccessTokenAndRefreshToken(user){
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
}

export const registerUser = async(req,res)=>{

     try {
           const {email,name,password} = req.body;
   
           if(!email || !name || !password){
               return res.status(400).json({
                   message:"All fields are required"
               })
           }
   
           const user = await User.findOne({email});
           
           if(user){
               return res.status(400).json({
                   message:"User already exists"
               })
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
               message:"User registered successfully",
               success:true,
               user: modifiedUser
           })
     } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        })
     }
}

export const loginUser = async(req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(400).json({
                message:"User not found! please register first"
            })
        }
    
        const isMatch = await user.isPasswordMatched(password);
    
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
    
        const {accessToken,refreshToken} = generateAccessTokenAndRefreshToken(user);
    
        const modifiedUser = await User.findOne({ email }).select('-password -refreshToken');
    
        modifiedUser.refreshToken = refreshToken;
        
        await modifiedUser.save();
    
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, {secure:true, httpOnly: true })
        .cookie("refreshToken", refreshToken, {secure:true,httpOnly: true })
        .json({
            message:"User logged in successfully",
            success:true,
            user: modifiedUser
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        })
    }
}