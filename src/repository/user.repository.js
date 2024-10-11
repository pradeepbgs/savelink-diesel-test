import { userModel } from "../models/user.model";

class UserRepository {
    // constructor(){}

    async findById(userId) {
        return await userModel.findById(userId).select("-password");
    }

    async findByUsername(username){
        return await userModel.findOne({ username });
    }

    async findByEmail(email){
        return await userModel.findOne({email})
    }

    async findByIdentifier(parsedResult){
       return await userModel.findOne({
            $or:[
                {email:parsedResult.identifier},
                {username:parsedResult.identifier}
            ]
        })
    }

    async saveUser(userData){
        const user = new userModel(userData)
       return await userModel.save(user)
    }
}

export default UserRepository