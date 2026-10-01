import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";


export class AuthController {

    static createAdmin = async (req: Request, res: Response) => {
        try {
            const { setupKey, name, email, password } = req.body;

            if (setupKey !== process.env.ADMIN_SETUP_KEY) {
                res.status(403).json({message: 'No tienes permiso para crear un admin'});
                return;
            };

            const userExists = await User.findOne({ email });

            if (userExists) {
                res.status(409).json({message: 'Ya existe un usuario registrado con ese email'});
                return;
            };

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                name,
                email,
                password: hashedPassword,
                role: 'admin'
            });

            res.status(201).json({message: 'Admin creado correctamente'});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                res.status(401).json({message: 'Credenciales inválidas'});
                return;
            };

            const passwordCorrecto = await bcrypt.compare(password, user.password);

            if (!passwordCorrecto) {
                res.status(401).json({message: 'Credenciales inválidas'});
                return;
            };

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '8h' }
            );

            res.status(200).json({message: 'Login exitoso', token});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

};
