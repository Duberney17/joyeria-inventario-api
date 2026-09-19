import express, { json } from "express";
import router from "./routers/jewelRoutes";

const app = express();


app.use(json());
//routes

app.use('/api/jewels', router)

export default app;