import { configDotenv } from "dotenv";
import app from "./server";
import { conectDB } from "./config/db";

configDotenv();

const port = process.env.PORT || 2000;

const startServer = () =>{
    conectDB();
    app.listen(port, () =>{
        console.log(`corriendo en el puerto ${port}`);
    })
};


startServer();