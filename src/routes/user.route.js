import Router from 'diesel-core'
import userService from '../services/user.service'

export const userRouter = new Router()

const user_service = new userService()

userRouter.post("/register",user_service.registerUser)
userRouter.post("/login",user_service.loginUser)