var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Historial = thinky.createModel("Historial", {
    estado: type.boolean(),
    id_mascota: type.string(),
    enfermedad: type.string(),
    descripcion: type.string(),
    causa: type.string(),
    estadoSalud: type.string(),
    tratamiento: type.string(),
    external_id: type.string().default(r.uuid()),
});
module.exports = Historial;
var Mascota = require('./mascota');
Historial.belongsTo(Mascota, "mascota", "id_mascota", "id");
var HistoriaClinica = require('./historiaClinica');
Historial.hasMany(HistoriaClinica, "historiaClinica", "id", "id_historial");