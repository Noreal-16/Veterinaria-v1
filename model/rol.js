var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("Rol", {
    id: type.string(),
    nombre: type.string()
});
module.exports= Rol;
var Persona = require('./cuenta');
Rol.hasMany(Persona,"persona", "id", "id_rol");