import errorHandler from "../utilities/errorHandler.js";

const adminAuth = (req, res, next) => {
    // Admin authentication logic

   try {
     const user = req.user
     if (!user || user.isAdmin !== true) {
         return next(errorHandler(403, "Access denied || Admins Only"))
     }
     next();
   } catch (error) {
        return next(error)
   }
};

export default adminAuth;