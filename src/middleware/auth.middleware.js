import jwt from "jsonwebtoken"
import UserRepository from "../repository/user.repository.js";

const userRepository = new UserRepository()
export const verifyJwt = async (xl) => {
    try {
        let token = await xl.getCookie('token') || xl.req.headers.get("Authorization");
        
        if (!token) {
            console.log("no access token found, Unauthorize request");
            return xl.json({ message: "no access token found , Unauthorize request" },401);
        }

        // Remove "Bearer " from the token if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await userRepository.findById(decodedToken._id)

        if (!user) {
            console.log("No User found, Unauthorized request");
            xl.json({ message: "No User found, Unauthorized request" },401);
        }

        xl.set('user',user)
        xl.next();
    } catch (error) {
        console.error("Error verifying token:", error);
        xl.next();
    }
};