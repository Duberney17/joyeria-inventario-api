import express, { json } from "express";
import router from "./routers/jewelRoutes";
import authRouter from "./routers/authRoutes";

const app = express();


app.use(json());
//routes

app.use('/api/jewels', router)
app.use('/api/auth', authRouter)

export default app;