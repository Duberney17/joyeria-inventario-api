import { Router } from "express";
import { JewelController } from "../controllers/jewelController";
import { body, param } from "express-validator";
import { captureErrors } from "../middleware/captureErrors";
import { verificarToken } from "../middleware/verificarToken";



const router = Router();


router.get('/', JewelController.getAllJewels);

router.post('/',
    verificarToken,
    body('name').
        notEmpty().withMessage('El nombre es obligatorio'),
    body('description').
        notEmpty().withMessage('la descripción es obligatoria'),
    body('category').
        notEmpty().withMessage('la categoría es obligatoria'),
    body('material').
        notEmpty().withMessage('el material es obligatorio'),
    body('weight').
        notEmpty().withMessage('el peso es obligatorio').
        isFloat({ gt: 0 }).withMessage('el peso debe ser un número mayor a 0'),
    body('price').
        notEmpty().withMessage('el precio es obligatorio').
        isFloat({ gt: 0 }).withMessage('el precio debe ser un número mayor a 0'),
    body('stock').
        optional().
        isInt({ min: 0 }).withMessage('el stock debe ser un número entero mayor o igual a 0'),
    body('sku').
        notEmpty().withMessage('el código/referencia (SKU) es obligatorio'),
    body('photos').
        optional().
        isArray().withMessage('las fotos deben ser un arreglo de URLs'),
    body('status').
        optional().
        isIn(['disponible', 'apartado', 'vendido']).withMessage('el estado no es válido')
    ,
    captureErrors,
    JewelController.createJewel
);

router.get('/:id',
    param('id').
        isMongoId().withMessage('El ID no es valido'),
        captureErrors,
    JewelController.getByIdJewel
);

router.put('/:id',
    verificarToken,
    param('id').
        isMongoId().withMessage('El ID no es valido'),
    body('name').
        notEmpty().withMessage('El nombre es obligatorio'),
    body('description').
        notEmpty().withMessage('la descripción es obligatoria'),
    body('category').
        notEmpty().withMessage('la categoría es obligatoria'),
    body('material').
        notEmpty().withMessage('el material es obligatorio'),
    body('weight').
        notEmpty().withMessage('el peso es obligatorio').
        isFloat({ gt: 0 }).withMessage('el peso debe ser un número mayor a 0'),
    body('price').
        notEmpty().withMessage('el precio es obligatorio').
        isFloat({ gt: 0 }).withMessage('el precio debe ser un número mayor a 0'),
    body('stock').
        optional().
        isInt({ min: 0 }).withMessage('el stock debe ser un número entero mayor o igual a 0'),
    body('sku').
        notEmpty().withMessage('el código/referencia (SKU) es obligatorio'),
    body('photos').
        optional().
        isArray().withMessage('las fotos deben ser un arreglo de URLs'),
    body('status').
        optional().
        isIn(['disponible', 'apartado', 'vendido']).withMessage('el estado no es válido')
    ,
        captureErrors,
    JewelController.updateById
);

router.delete('/:id',
    verificarToken,
    param('id').
        isMongoId().withMessage('El ID no es valido'),
        captureErrors,
    JewelController.deleteByidJewel
);

export default router;
