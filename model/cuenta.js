var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cuenta = thinky.createModel("Cuenta", {
    id: type.string(),
    external_id: type.string().default(r.uuid()),
    correo: type.string(),
    contrasenia: type.string(),
    createAt: type.date().default(r.now()),
    updateAt: type.date().default(r.now()),
    id_persona: type.string()
});
module.exports = Cuenta;
var Persona = require('./persona');
Cuenta.belongsTo(Persona,"persona", "id_persona", "id");