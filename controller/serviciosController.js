'use strict';

var servicio = require('../model/servicios');
class serviciosController {

    visRegistroServ(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        res.render('index', {
            title: 'Registro Servicio',
            sesion: true,
            cliente: req.session.cliente,
            fragmento: 'fragmento/registrServicio',
            msg: msgListado
        })
    }
    visListadoServicio(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        servicio.filter({ estado: true }).then(function(data) {
            res.render('index', {
                title: 'lista Servicios',
                sesion: true,
                cliente: req.session.cliente,
                fragmento: 'fragmento/listaServicio',
                lista: data,
                msg: msgListado
            })
        }).error(function(error) {
            console.log(error)
        });
    }
    guardarServicio(req, res) {
            var dataServ = {
                estado: true,
                nombre: req.body.nombre,
                valor: req.body.valor,
                descripcion: req.body.descripcion
            }
            var servicios = new servicio(dataServ);
            servicios.saveAll().then(function(servSave) {
                req.flash('info', 'Se Guardo el Servicio Correctamente');
                res.redirect('/lista_Servicio');
            }).error(function(error) {
                req.flash('error', 'No se pudo guardar el servicio');
                res.redirect('/lista_Servicio');
            })
        }
        /**
         * Carga los datos para realizar la actualizacion
         * @param {*} req 
         * @param {*} res 
         */
    cargarDatosServicio(req, res) {
            var external = req.query.external;
            servicio.filter({ id: external, estado: true }).then(function(cargaServicio) {
                var servicioS = cargaServicio[0];
                res.json(servicioS);
            }).error(function(error) {

            })
        }
        /**
         * Actualiza los datos del servicio 
         * @param {*} req 
         * @param {*} res 
         */
    actualizarServicip(req, res) {
            servicio.filter({ id: req.body.externalServicio, estado: true }).then(function(actualizaSer) {
                if (actualizaSer.length > 0) {
                    var serv = actualizaSer[0];
                    serv.nombre = req.body.nombreServicio;
                    serv.valor = req.body.valorServicio;
                    serv.valor = req.body.descripcionServicio
                    serv.save().then(function(guardarServi) {
                        req.flash('info', 'Se Guardo el Servicio Correctamente');
                        res.redirect('/lista_Servicio');
                    }).error(function(error) {
                        req.flash('error', 'No se pudo guardar el servicio');
                        res.redirect('/lista_Servicio');
                    })

                }
            })
        }
        /**
         * Carga los datos a la pantalla del cliente
         * @param {*} req 
         * @param {*} res 
         */
    cargaServicioCliente(req, res) {
            servicio.filter({ estado: true }).then(function(cargaDatos) {
                res.json(cargaDatos);
            }).error(function(error) {
                req.flash('error', 'Error al consultar los servicios');
                res.redirect('/inicio');
            });
        }
        /**
         * 
         */
    eliminarServicio(req, res) {
        var external = req.query.externalDelete;
        servicio.filter({ id: external, estado: true }).then(elimina => {
            if (elimina.length > 0) {
                var servicioElimina = elimina[0];
                servicioElimina.estado = false;
                servicioElimina.save().then(eliminado => {
                    req.flash('info', 'El servicio se elimino correctamente');
                    res.redirect('/lista_Servicio');
                }).error(error => {
                    req.flash('error', 'No se puedo eliminar el Servicio');
                    res.redirect('/lista_Servicio');
                })

            }
        });
    }
}
module.exports = serviciosController;