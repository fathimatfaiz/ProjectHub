import express from 'express';
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js';
import { StudentRouter } from './Routes/StudentRoute.js';


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    method: ['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRouter)
app.use('/student', StudentRouter)
app.use(express.static('Public'))


app.listen(3000, () => {
    console.log("Server is running")
})