import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class UserRepository {
    constructor(){}

    async findById(userId: number) {
        return await prisma.user.findUnique({
            where: { id: userId },  // Ensure userId is an integer
            select: {
                id: true,
                username: true,
                email: true,
                admin: true
            }
        });
    }
    

    async findByUsername(username:string){
        return await prisma.user.findUnique({
            where:{username}
        })
    }

    async findByEmail(email:string){
        return await prisma.user.findUnique({
            where:{email}
        })
    }

    async findByIdentifier(parsedResult:{identifier:string}){
       return await prisma.user.findFirst({
        where: {
            OR: [
                {email: parsedResult.identifier},
                {username:parsedResult.identifier}
            ]
        }
       })
    }

    async saveUser(userData:{ username: string; email: string; password: string; admin?: boolean }){
        return await prisma.user.create({
            data:userData
        })
    }
}

export default UserRepository