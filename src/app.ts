import diesel from 'diesel-core'
import { connectDB } from './db/dbconnect'
import { userRouter } from './routes/user.route'
import { linkRouter } from './routes/link.route'

const app = new diesel()

app.get("/",()=>{
    return new Response("welcome to the server")
})

app.register("/api/v1/user",userRouter)
app.register("/api/v1/link",linkRouter)

connectDB().then(()=>{
    app.listen(3000)
})