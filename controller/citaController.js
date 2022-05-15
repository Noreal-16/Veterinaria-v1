'use strict';
var persona = require('../model/persona');
var cita = require('../model/citaMedica');
var mascota = require('../model/mascota');
var servicio = require('../model/servicios');
class citaController {
    visualizarVeterinario(req, res) {
            var msgListado = { error: req.flash('error'), info: req.flash('info') }
            persona.getJoin({ cita: true }).filter({ estado: true }).then(function(datosCita) {
                cita.filter({ estado: true }).then(cita => {
                    res.render('index', {
                        title: "Cita Medica",
                        sesion: true,
                        cliente: req.session.cliente,
                        fragmento: 'fragmento/citaMedicaVet',
                        msg: msgListado
                    });
                }).error(error => {})
            })
        }
        /**
         * Metodos para visualizar el fomulario de citas medicas
         * @param {object} req 
         * @param {object} res 
         */
    VisualizarCliente(req, res) {
            var msgListado = { error: req.flash('error'), info: req.flash('info') }
            var external = req.session.cliente.external;
            persona.filter({ external_id: external }).then(person => {
                var dataPersona = person[0];
                var idPersona = dataPersona.id;
                mascota.filter({ id_persona: idPersona, estado: true }).then(masco => {
                    cita.then(cite => {
                        var registro = true;
                        if (person.length > 0) {
                            registro = true;
                            if (masco.length > 0) {
                                registro = true;
                            } else {
                                registro = false;
                            }
                            res.render('index', {
                                title: 'Registro Cita Medica',
                                sesion: true,
                                cliente: req.session.cliente,
                                fragmento: 'fragmento/citaMedica',
                                persona: dataPersona,
                                cita: cite,
                                registro: registro,
                                mascota: masco,
                                msg: msgListado
                            });

                        } else {
                            req.flash('info', 'No se pudo encontrar lo solicitado!');
                            res.redirect('/');
                        }

                    }).error(error => {
                        req.flash('error', 'Error al visualizar los datos');
                        res.redirect('/');
                    })
                }).error(error => {
                    req.flash('error', 'No existe mascota registrada');
                    res.redirect('/');
                })
            }).error(error => {
                req.flash('error', 'La persona no existe ');
                res.redirect('/');
            });
        }
        /**
         * Metodo para guardar una cita 
         * @param {*} req 
         * @param {*} res 
         */
    guardarCita(req, res) {
        var valor = req.body.valor;
        if (valor === 'true') {
            valor = true;
        } else if (valor === 'false') {
            valor = false;
        }
        var external = req.session.cliente.external;
        persona.filter({ external_id: external }).then(data => {
            if (data.length > 0) {
                var persona = data[0];
                var idPersona = persona.id;
                var datosPersona = persona.nombre + ' ' + persona.apellido;
                servicio.filter({ external_id: external }).then({});
                var datosCita = {
                    estado: valor,
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    id_mascota: req.body.mascota,
                    id_servicio: req.body.servicio,
                    id_persona: idPersona,

                };
                var Cita = new cita(datosCita);
                Cita.saveAll().then(datos => {
                    req.flash('info', 'Se ha agendado una nueva cita');
                    res.redirect('/CitaMe   dica');
                }).error(error => {
                    req.flash('error', 'Ha ocurrido un error al guardar la Cita');
                    res.redirect('/CitaMedica');
                })
            }
        }).error(error => {
            req.flash('error', 'ocurrio un error por favor comuniquese con los desarrolladores');
            res.redirect('/');
        });
    }

}
module.exports = citaController;