var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Mascota = thinky.createModel("Mascota", {
    estado: type.boolean(),
    nro_historia: type.string(),
    nombre: type.string(),
    edad: type.number(),
    sexo: type.string(),
    especie: type.string(),
    raza: type.string(),
    id_persona: type.string(),
    id_historial: type.string(),
    external_id: type.string().default(r.uuid())
});
module.exports = Mascota;
var Persona = require('./persona');
Mascota.belongsTo(Persona, "persona", 'id_persona', 'id');
var Historial = require('./historial');
Mascota.hasMany(Historial, "historial", "id", "id_mascota");