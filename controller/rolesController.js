'use strict';

function crearRoles() {
    var rol = require('../model/rol');
    rol.run().then(function(roles) {
        if (roles.length <= 0) {
            rol.save([
                { nombre: 'administrador' },
                { nombre: 'cliente' }
            ])
        }
    }).error(function(error) {
        console.log(error);
    });
}

function validLogin(req) {
    return (req.session !== undefined && req.session.cliente !== undefined);

}
module.exports = { crearRoles, validLogin };