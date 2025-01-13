import express from "express"
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares

app.use(express.json())
app.use(cors())

//Api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(rer,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log("Server started on port :"+ port)
})