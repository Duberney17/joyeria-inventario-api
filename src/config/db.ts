import { connect } from "mongoose";

export const conectDB =  async () =>{
    try {
        const conection = await connect(process.env.DATABASE_URL);
        const {port} = conection.connection;
        console.log('Se conecto correctamente a la Base de Datos', port );
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

