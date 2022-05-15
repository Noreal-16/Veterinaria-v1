'use strict';
var mascota = require('../model/mascota');
var historial = require('../model/historial');
var rol = require('../model/rol');

class historialController {

    listaHistorialMascotas(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        rol.filter({ nombre: 'cliente' }).then(function(listaRol) {
            var Rol = listaRol[0];
            mascota.getJoin({ persona: true }).filter({ estado: true }).then(function(lista) {
                res.render('index', {
                    title: 'Historial',
                    sesion: true,
                    cliente: req.session.cliente,
                    fragmento: 'fragmento/listaHistorial',
                    lista: lista,
                    msg: msgListado
                })
            }).error(function(error) {

            })
        });
    }

    listaHistorial(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        var mascotas = req.params.external_idM;
        var externalPersona = req.params.external_idP;
        mascota.getJoin({ historial: true }).filter({ external_id: mascotas, estado: true }).then(vMascota => {
            var lista = vMascota[0];
            var idMascota = lista.id;
            historial.filter({ id_mascota: idMascota, estado: true }).then(hist => {
                res.render('index', {
                    title: 'Historial Mascota',
                    sesion: true,
                    cliente: req.session.cliente,
                    fragmento: 'fragmento/listaHistorialM',
                    listado: hist,
                    external_persona: externalPersona,
                    lista: vMascota,
                    msg: msgListado
                })
            });
        });
    }

    guardaHistorial(req, res) {
        var external = req.body.external_idMas;
        mascota.filter({ external_id: external, estado: true }).then(datos => {
            if (datos.length > 0) {
                var datosMascota = datos[0];
                var idMascota = datosMascota.id;
                var datosMas = {
                    estado: true,
                    id_mascota: idMascota,
                    enfermedad: req.body.enfermedad,
                    descripcion: req.body.descripcion,
                    causa: req.body.causa,
                    estadoSalud: req.body.estadoSalud,
                    tratamiento: req.body.tratamiento,
                }
                var historialS = new historial(datosMas);
                historialS.save().then(saveHis => {
                    req.flash('info', 'Se Guardo correctamente el Historial de la Mascota');
                    res.redirect('/historial');
                }).error(error => {
                    req.flash('error', 'Error al guardar el Historial');
                    res.redirect('/historial');
                });
            }
        }).error(error => {
            req.flash('error', 'Ha ocurrido un error inesperado, por favor comunicarse con el Desarrollador');
            res.redirect('/historial');
        });
    }
    cargarDatos(req, res) {
        var external = req.query.external;
        historial.filter({ external_id: external, estado: true }).then(datos => {
            var datossHistorial = datos[0];
            res.json(datossHistorial);
        })
    }
    ModificarHistorial(req, res) {
        var external = req.body.external_idHist;
        historial.filter({ external_id: external, estado: true }).then(hist => {
            if (hist.length > 0) {
                var historialC = hist[0];
                historialC.enfermedad = req.body.enfermedadHistorial;
                historialC.descripcion = req.body.descripcionHistorial;
                historialC.causa = req.body.causaHistorial;
                historialC.estadoSalud = req.body.estadoSaludHistorial;
                historialC.tratamiento = req.body.tratamientoHistorial;
                historial.save().then(datos => {}).error(error => {
                    req.flash('info', 'Se Actualizo correctamente el Historial de la Mascota');
                    res.redirect('/historial');
                })
            } else {
                req.flash('error', 'No existe registro');
                res.redirect('/historial');
            }
        }).error(error => {
            req.flash('error', 'Ha ocurrido un error inesperado, por favor comunicarse con el Desarrollador');
            res.redirect('/historial');
        })

    }
    eliminarHistorial(req, res) {
        var external = req.body.externalDelete;
        historial.filter({ external_id: external, estado: true }).then(eliminarHistorial => {
            if (eliminarHistorial.length > 0) {
                var historialDel = eliminarHistorial[0];
                historialDel.estado = false;
                historialDel.save().then(eliminado => {
                    req.flash('info', 'El Historial se Elimino Correctamente');
                    res.redirect('/historial');
                }).error(error => {
                    req.flash('error', 'Error al eliminar Historial');
                    res.redirect('/historial');
                });
            }
        })
    }

}
module.exports = historialController;