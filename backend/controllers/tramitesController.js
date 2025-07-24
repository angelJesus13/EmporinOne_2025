import Tramite from '../models/tramite.js';

export const getAllTramites = async (req, res) => {
    try{
        const tramites = await Tramite.find()
        res.json(tramites)
    }catch(error){
        res.status(500).json({mesage:'Error al obtener trámites'})
    }
}

export const getTramiteById = async (req, res)=>{
    try {
        const tramite = await Tramite.findById(req.params.id)
        if(!tramite)
            return res.status(404).json({message:'Trámite no encontrado'})
        res.json(tramite)
    } catch (error) {
        res.status(500).json({message:'Error al obtener el trámite'})
    }
}

export const createTramite = async (req,res)=>{
    try {
        
        const {nombreTramite, requisitos, categoria} = req.body
        const newTramite = new Tramite({
            nombreTramite, requisitos, categoria
        })
        await newTramite.save()
        res.status(201).json(newTramite)
    } catch (error) {
        res.status(400).json({message:'Error al crear el trámite'})
    }
}
