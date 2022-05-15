'use strict';
var rol = require('../model/rol');
var persona = require('../model/persona');
var cuenta = require('../model/cuenta');
class personaController {
    guardar(req, res) {
        rol.filter({ nombre: "cliente" }).run().then(function(roles) {
            if (roles.length > 0) {
                cuenta.filter({ correo: req.body.correo }).run().then(function(cuentaB) {
                    if (cuentaB.length <= 0) {
                        var role = roles[0];
                        var dataP = {
                            //req.bdy.nombre se obtiene del name del formulario
                            nombre: req.body.nombre,
                            apellidos: req.body.apellido,
                            fecha_nac: req.body.fecha,
                            edad: req.body.edad,
                            id_rol: role.id
                        }
                        var personaP = new persona(dataP);
                        var dataC = {
                            correo: req.body.correo,
                            contrasenia: req.body.clave,
                        }
                        var cuentaP = new cuenta(dataC);
                        personaP.cuenta = cuentaP;
                        personaP.saveAll({ cuenta: true }).then(function(personaSave) {
                            req.flash('info', 'Se ha guardado correctamente');
                            res.redirect('/inicio');
                        }).error(function(error) {
                            req.flash('error', 'No se pudo  guardar su registro');
                            res.redirect('/');
                        });

                    } else {
                        req.flash('error', 'Tu correo ya esta registrado');
                        res.redirect('/registro');
                    }
                }).error(function(error) {
                    req.flash('error', 'Hubo un problema comunicate con tu servicio del sistema');
                    res.redirect('/registro');
                });

            } else {
                req.flash('error', 'No existen roles registrados');
                res.redirect('/');
            }
        }).error(function(error) {
            req.flash('error', 'Hubo un problema comunicate con tu servicio del sistema');
            res.redirect('/registro');
        })
    }
}
module.exports = personaController;