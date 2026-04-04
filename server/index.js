import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb.js';
import authRouter from './routes/auth.route.js';
import notesRouter from "./routes/genrate.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
dotenv.config();

const app = express();
app.use(cors(
    {origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    }
));
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT ||  5000;
app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/notes", notesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDb();
});