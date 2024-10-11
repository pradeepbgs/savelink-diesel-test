import { signinSchema } from "../schemas/signInSchema";
import { signupValidation } from "../schemas/signUpSchema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from "../repository/user.repository";
class userService{
    constructor(){
        this.userRepository = new UserRepository();
    }

registerUser = async (ctx) => {
        try {
            const body = await ctx.body()
            const parseResult = signupValidation.safeParse(body)
    
            if (!parseResult.success) {
                return ctx.json({
                    success: false,
                    message:"parse failed"
                },400)
            }
    
            const {username,email,password} = parseResult.data ;
    
            const existingUsername = await this.userRepository.findByUsername(username)
    
            if (existingUsername) {
                return ctx.json({
                    success: false,
                    message:"username already exist"
                },400)
            }
    
            const existingEmail = await this.userRepository.findByEmail(email)
    
            if (existingEmail) {
                return ctx.json({
                    success:false,
                    message:"user already exists with email"
                },400)
            }
    
            const hashedPass = await bcrypt.hash(password,10);

            const newUser = { username, email, password: hashedPass };
            await this.userRepository.saveUser(newUser)
    
            return ctx.json({
                success:true,
                message:'user registered successfully'},
                200)
    
        } catch (error) {
            console.log('error while signingup',error);
            return ctx.json({
                success:false,
                message:`Error while signing up , ${error}`
            },400)
        }
    }

loginUser = async (ctx) => {
    try {
        const body = await ctx.body()
        if (!body) {
            return ctx.json({
                success: false,
                message: "Request body is empty"
            },  400 );
        }
        
        const parsedResult = signinSchema.parse(body);

        const user = await this.userRepository.findByIdentifier(parsedResult)

        if (!user){
            return ctx.json({
                success:false,
                message:"couldn't find  user"
            },400)
        }

        const isPasswordValid = await bcrypt.compare(String(parsedResult.password),String(user.password))

        if (!isPasswordValid) {
            return ctx.json({
                message:"Invalid password"
            },401)
        }

        const tokendata = {
            _id: user._id,
            username: user.username,
            email: user.email
         }

         const token = await jwt
         .sign(tokendata,process.env.JWT_TOKEN_SECRET??'',{expiresIn:"10d"})

        ctx.cookie('token',token,{
            httpOnly:true,
            sameSite:'none',
            path:'/',
            secure:true,
            maxAge: 60 * 60 * 24 * 10,
        })

        return ctx.json({
            success: true ,
            data: user,
            token:token,
            message:"logged in success",
        },200)

    } catch (error) {
        console.log('error while signing',error);
        return ctx.json({
            success:false,
            message:`Error while signing , ${error}`
        },400)
    }

    }
}

export default userService