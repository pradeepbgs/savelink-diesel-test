import UserService from "../services/user.service";

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    register = async(ctx) => {
        try {
            return await this.userService.registerUser(ctx);
        } catch (error) {
            return ctx.status(400).json({ success: false, message: "Error while signing up user" });
        }
    }

    login = async (ctx) => {
        try {
            return await this.userService.loginUser(ctx);
        } catch (error) {
            return ctx.status(400).json({ success: false, message: "Error while signing in user" });
        }
    }
}

export default UserController;
