import { models } from "../models/index.js";
/**
 * Controlador para manejar las operaciones de autenticación.
 * @module controllers/auth.controller.js
 * @requires models
 */

const login = (req, res) => {
    const { Matricula } = models;
    const matriculas = Matricula.findAll();

    if (!matriculas) {
        return res.status(404).json({ message: "No se encontraron matrículas" });
    }
    
    res.json(matriculas);
}

export default {
    login
};