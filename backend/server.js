import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connedtCloudinry from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRout.js'

// App config ------------------------------------------------
const app = express()
const port = process.env.PORT || 4000
connectDB()
connedtCloudinry()

// Middelware ------------------------------------------------
app.use(express.json())
app.use(cors())

//API end point ----------------------------------------------
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

// Start to expres server ------------------------------------
app.listen(port, () => console.log('Server start on port : ' + port));
