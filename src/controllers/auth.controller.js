/**
 * Controlador para manejar las operaciones de autenticación.
 * @module controllers/auth.controller.js
 * @requires models
 */

import { models } from "../models/index.js";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";

import bcrypt from "bcryptjs";

const login = async (req, res) => {
    try{

        const {USUARIO, CODIGO, CONTRASEÑA, RECUERDAME} = req.body;
        
        if (USUARIO == "ESTUDIANTE") {
            const user = await models.Usuario.findOne({
                where: { CODIGOU:CODIGO },
                include: [
                    {
                        model: models.TipoUsuario,
                        where: {NOMBRE: USUARIO}
                    }
                ]
            });
            // return res.json( await bcrypt.hash(user.CONTRASEÑA, 10));


            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            const passwordIsValid = await bcrypt.compare(CONTRASEÑA, user.CONTRASEÑA);

            if (!passwordIsValid) {
                return res.status(401).json({ accessToken: null, message: "Contraseña incorrecta"});
            }

            const token = jwt.sign({ id: user.ID_USUARIO }, authConfig.secret, {
                expiresIn: 86400,
            });

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: RECUERDAME ? (1000 * 60 * 60 * 1) : (1000 * 60 * 60 * 24 * 7),
            });            

            return res.status(200).json({
                ID: user.CODIGOU,
                // NOMBRES: alumno.NOMBRES,
                // APELLIDOS: alumno.APELLIDOS,
                // DNI: alumno.DNI,
                // CARRERA: alumno.CARRERA,
                // FECHA_NAC: alumno.FECHA_NAC,
                // SEXO: alumno.SEXO,
                // DIRECCION: alumno.DIRECCION,
                // TELEFONO: alumno.TELEFONO,
                // CORREO: alumno.CORREO,
                // USUARIO: USUARIO,
                // accessToken: token,
            });            

        }
        else if (USUARIO == "PROFESOR") {
            const user = await models.Usuario.findOne({
                where: { CODIGOU:CODIGO },
                include: [
                    {
                        model: models.TipoUsuario,
                        where: {NOMBRE: USUARIO}
                    }
                ]
            });
            // return res.json(await bcrypt.hash(user.CONTRASEÑA,10));


            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado"});
            }

            const passwordIsValid = await bcrypt.compare(CONTRASEÑA, user.CONTRASEÑA);

            if (!passwordIsValid) {
                return res.status(401).json({ accessToken: null, message: "Contraseña incorrecta"});
            }

            const token = jwt.sign({ id: user.ID_USUARIO }, authConfig.secret, {
                expiresIn: 86400,
            });

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: RECUERDAME ? (1000 * 60 * 60 * 1) : (1000 * 60 * 60 * 24 * 7),
            });
            return res.status(200).json({
                ID: user.CODIGOU,
                // NOMBRES: profesor.NOMBRES,
                // APELLIDOS: profesor.APELLIDOS,
                // DNI: profesor.DNI,
                // ESPECIALIDAD: profesor.ESPECIALIDAD,
                // CORREO: profesor.CORREO,
                // USUARIO: USUARIO,
                // accessToken: token,
            });
        }
        
        res.status(403).json({mensaje: "No se especificó un tipo de usuario"});        
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }

}

export default {
    login
};