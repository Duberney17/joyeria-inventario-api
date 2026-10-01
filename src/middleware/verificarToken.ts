import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: {
        id: string,
        role: string
    }
}

export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({message: 'No autorizado, falta el token'});
        return;
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as { id: string, role: string };
        next();
    } catch (error) {
        res.status(401).json({message: 'Token inválido o expirado'});
    }
};
