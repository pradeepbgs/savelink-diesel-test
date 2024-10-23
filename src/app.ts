import Diesel from '../../diesel/src/main'
import { userRouter } from './routes/user.route'
import { linkRouter } from './routes/link.route'
import { verifyJwt } from './middleware/auth.middleware'
import { connectDB } from './db/dbconnect'

const app = new Diesel()

app.filter()
   .routeMatcher("/","/api/v1/user/login",'/api/v1/user/register')
   .permitAll()
   .require(verifyJwt)

app.get("/",()=>{
    return new Response("welcome to the server")
})

app.register("/api/v1/user",userRouter)
app.register("/api/v1/link",linkRouter)

connectDB().then(()=>{
    app.listen(3000)
})

// app.listen(3000)