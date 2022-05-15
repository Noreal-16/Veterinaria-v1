'use strict';
var mascota = require('../model/mascota');
var persona = require('../model/persona');

class mascotasController {
    visualizarLista(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        mascota.getJoin({ persona: true }).filter({ id_persona: req.session.cliente.id, estado: true }).then(function(lista) {
            res.render('index', {
                title: 'Mascosta',
                sesion: true,
                cliente: req.session.cliente,
                fragmento: 'fragmento/mascotas',
                lista: lista,
                msg: msgListado
            });
        }).error(function(error) {
            req.flash('error', 'por favor comuniquese con los desarrolladores');
            res.redirect('/');
        })
    }
    guardarMascota(req, res) {
        var idPersona = req.session.cliente.id;
        mascota.then(function(saveMascot) {
            var nroHistoria = saveMascot.length;
            var regis = ("NH-" + nroHistoria);
            var data = {
                estado: true,
                nro_historia: regis,
                nombre: req.body.nombre,
                edad: req.body.edad,
                sexo: req.body.sexo,
                especie: req.body.especie,
                raza: req.body.raza,
                id_persona: idPersona
            }
            var mascotaDatos = new mascota(data);
            mascotaDatos.save().then(function(guadado) {
                req.flash('info', 'Mascota registrada exitosamente');
                res.redirect('/mascotas');
            }).error(function(error) {
                req.flash('error', 'No se pudo resgistrar la mascota');
                res.redirect('/mascotas');
            })
        })
    }
    cargarDatosMascota(req, res) {
        var external = req.query.external;
        mascota.filter({ external_id: external, estado: true }).then(function(carga) {
            var mascotas = carga[0];
            res.json(mascotas);
        }).error(function(error) {

        });
    }
    modificaDatosMascotas(req, res) {
        mascota.filter({ external_id: req.body.externalMascota, estado: true }).then(function(modificaMAscota) {
            if (modificaMAscota.length > 0) {
                var mascotaM = modificaMAscota[0];
                mascotaM.nombre = req.body.nombreActualizas;
                mascotaM.edad = req.body.edadActualizar;
                mascotaM.sexo = req.body.sexoActualizar;
                mascotaM.especie = req.body.especieActualizar;
                mascotaM.raza = req.body.razaActualizar;

                mascotaM.saveAll().then(function(mascotaSave) {
                    req.flash('info', 'Los datos de la Mascota se actualizaron exitosamente');
                    res.redirect('/mascotas');
                }).error(function(error) {
                    req.flash('error', 'No se pudo resgistrar la mascota');
                    res.redirect('/mascotas');
                });

            }
        }).error(function(error) {

        });
    }

}
module.exports = mascotasController;