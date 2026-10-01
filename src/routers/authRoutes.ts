import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { captureErrors } from "../middleware/captureErrors";


const router = Router();

router.post('/create-admin',
    body('setupKey').
        notEmpty().withMessage('La clave de configuración (setupKey) es obligatoria'),
    body('name').
        notEmpty().withMessage('El nombre es obligatorio'),
    body('email').
        isEmail().withMessage('El email no es válido'),
    body('password').
        isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ,
    captureErrors,
    AuthController.createAdmin
);

router.post('/login',
    body('email').
        isEmail().withMessage('El email no es válido'),
    body('password').
        notEmpty().withMessage('La contraseña es obligatoria')
    ,
    captureErrors,
    AuthController.login
);

export default router;
