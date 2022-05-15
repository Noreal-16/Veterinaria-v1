var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var HistoriaClinica = thinky.createModel("HistoriaClinica", {
    id: type.string(),
    diagnostico: type.string(),
    fecha: type.date(),
    motivo: type.string(),
    receta: type.string(),
    createAt: type.date().default(r.now()),
    updateAt: type.date().default(r.now()),
    id_historial: type.string(),
    id_rol: type.string()
});
module.exports = HistoriaClinica;
var Historial = require('./historial');
HistoriaClinica.belongsTo(Historial,"historial", "id_historial", 'id');
var Persona = require("./persona");
HistoriaClinica.belongsTo(Persona, "persona", "id", "id_persona");