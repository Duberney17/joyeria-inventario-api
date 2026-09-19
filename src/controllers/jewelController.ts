import { Request, Response } from "express";
import Jewel from "../models/jewelSchema";


export class JewelController {

    static createJewel = async (req: Request, res: Response) =>{
        try {
            const jewel = await Jewel.create(req.body);
            res.status(201).json({message: `se creo la joya correctamente`});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

    static getAllJewels =async (req: Request, res: Response) =>{
        try {
            const jewels = await Jewel.find();
            res.status(200).json(jewels);
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

    static getByIdJewel = async (req: Request, res: Response) =>{
        const { id } = req.params;
        try {
            const jewel = await Jewel.findById(id);

            if(!jewel){
                res.status(404).json({message: 'No existe una joya con el id:', id});
                return;
            };

            res.status(200).json({jewel});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

    static updateById = async (req: Request, res: Response) =>{
        const { id } = req.params;
        try {

            const jewel = await Jewel.findById(id);

            if(!jewel){
                res.status(404).json({message: 'No existe una joya con el id y no se pudo actualizar'});
                return;
            };

            const updateJewel = await Jewel.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: 'Joya Actualizada', updateJewel});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };

    static deleteByidJewel = async (req: Request, res: Response) =>{
        const { id } = req.params;
        try {

            const jewel = await Jewel.findByIdAndDelete(id);

            if(!jewel){
                res.status(404).json({message: 'No existe una joya con el id y no se pudo Eliminar'});
                return;
            };

            res.status(200).json({message: 'Joya Eliminada'});
        } catch (error) {
            res.status(500).json({message: error});
        }
    };


};
