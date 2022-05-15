'use strict';

var mascota = require('../model/mascota');
var persona = require('../model/persona');
var rol = require('../model/rol');

class veterinarioMascotaControlle {

    listarCliente(req, res) {
        var msgListado = { error: req.flash('error'), info: req.flash('info') }
        var external = req.session.cliente.external;
        rol.filter({ nombre: false }).then(resultRol => {
            var dataR = resultRol[0];
            persona.filter({ id_rol: dataR.id, estado: true }).then(datos => {
                var dataPerson = datos[0];
                var idPersoma = dataPerson.id;
                console.log('****************************************', 'Persona');
                console.log(datos);
                console.log('****************************************', 'Persona');
                console.log(idPersoma);
                console.log('****************************************', 'Persona');
                mascota.filter({ id_persona: idPersoma, estado: true }).then(resultado => {
                    res.render('index', {
                        title: 'Lista Cliente',
                        sesion: true,
                        cliente: req.session.cliente,
                        fragmento: 'fragmento/listadoCliente',
                        listaP: datos,
                        listaM: resultado,
                        mgs: msgListado
                    })
                })
            }).error(error => {

            });
        });
    }

}

module.exports = veterinarioMascotaControlle;