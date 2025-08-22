import jwt from "jsonwebtoken";
import { User } from "../modals/user.modal.js";
import errorHandler from "../utilities/errorHandler.js";

const authentication = async(req,res,next)=>{
try {
    
        const {accessToken} = req.cookies;
    
        if(!accessToken){
            return next(errorHandler(401,"Unauthorized"))
        }
    
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        
        const {_id} = decoded;
        

            const user = await User.findById(_id);
            if(!user){
                return next(errorHandler(404,"Invalid Access Token"));
            }
    
            req.user = user;
            next();
} catch (error) {
    return next(errorHandler(500,error.message));
}

    }

    export default authentication;