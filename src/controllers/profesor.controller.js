import { models } from "../models/index.js";
/**
 * Controlador para manejar las operaciones de autenticación.
 * @module controllers/profesor.controller.js
 * @requires models
 */

const matriculas = (req, res) => {
    const { Matricula } = models;
    const matriculas = Matricula.findAll();

    if (!matriculas) {
        return res.status(404).json({ message: "No se encontraron matrículas" });
    }
    
    res.json(matriculas);
}

const OtrasMatriculas = (req, res) => {
    const { Matricula } = models;
    const matriculas = Matricula.findAll();

    if (!matriculas) {
        return res.status(404).json({ message: "No se encontraron matrículas" });
    }
    
    res.json(matriculas);
}

export default {
    matriculas,
    OtrasMatriculas
};