var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Persona = thinky.createModel("Persona", {
    estado: type.boolean(),
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    nombre: type.string(),
    apellidos: type.string(),
    fecha_nac: type.date(),
    edad: type.number(),
    createAt: type.date().default(r.now()),
    id_rol: type.string()

});

module.exports = Persona;
var Cuenta = require('./cuenta');
Persona.hasOne(Cuenta, "cuenta", "id", "id_persona");
var Rol = require('./rol');
Persona.belongsTo(Rol, "rol", "id_rol", "id");
var Mascota = require('./mascota');
Persona.hasMany(Mascota, "mascota", "id", "id_persona")
var Cita = require('./citaMedica');
Persona.hasMany(Cita, "cita", "id", "id_persona");