import Router from 'diesel-core'
import UserController from '../controller/user.controller'

export const userRouter = new Router()
const userController = new UserController()

userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)