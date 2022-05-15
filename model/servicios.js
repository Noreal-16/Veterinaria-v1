var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Servicio = thinky.createModel("Servicio", {
    estado: type.boolean(),
    id: type.string(),
    nombre: type.string(),
    valor: type.string(),
    descripcion: type.string()
});

module.exports = Servicio;