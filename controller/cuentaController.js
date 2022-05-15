'use strict';

var cuenta = require('../model/cuenta');
var utilidades = require('../controller/rolesController');

class cuentaController {

    visualizarRegistro(req, res) {
        if (!utilidades.validLogin(req)) {
            var msgListado = {
                error: req.flash('error'),
                info: req.flash('info')
            }
            res.render('index', {
                title: "Registrate",
                sesion: true,
                fragmento: 'fragmento/frmRegistro',
                msg: msgListado
            })

        } else {
            res.redirect('/');
        }
    }
    visualizarSesion(req, res) {
        if (!utilidades.validLogin(req)) {
            var msgListado = {
                error: req.flash('error'),
                info: req.flash('info')
            }
            res.render('index', {
                title: "Inicio",
                sesion: true,
                fragmento: 'fragmento/frmInicioSesion',
                msg: msgListado
            });
        } else {
            res.redirect('/');
        }
    }
    inicioSesion(req, res) {
        //para hacer con relaciones utilizar getJoin
        cuenta.getJoin({ persona: { rol: true } }).filter({ correo: req.body.correo }).run().then(function(cuent) {
            if (cuent.length > 0) {
                var validaClave = cuent[0];
                if (validaClave.contrasenia === req.body.clave) {
                    req.session.cliente = {
                        id: validaClave.persona.id,
                        external: validaClave.persona.external_id,
                        //rol: validaClave.persona.rol,
                        nombreRol: validaClave.persona.rol.nombre,
                        nombre: validaClave.persona.apellidos + " " + validaClave.persona.nombre,
                    }
                    res.redirect('/');
                    //res.send(req.session.cliente);
                } else {
                    req.flash('error', 'Sus credenciales no son validas');
                    res.redirect('/inicio');
                }
            } else {
                req.flash('error', 'Sus credenciales no son validas');
                res.redirect('/inicio');
            }
        }).error(function(error) {
            req.flash('error', 'Hubo un problema, comunicarse con el servicio del sistema');
            res.redirect('/');
        })
    }
    cerrarSesion(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = cuentaController;