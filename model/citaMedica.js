var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var CitaMedica = thinky.createModel('CitaMedica', {
    estado: type.boolean(),
    id: type.string(),
    tipo: type.string(),
    fecha: type.string(),
    hora: type.string(),
    id_mascota: type.string(),
    id_servicio: type.string(),
    id_persona: type.string()
});
module.exports = CitaMedica;
var Persona = require('../model/persona');
CitaMedica.belongsTo(Persona, "persona", "id", "id_persona");