var express = require('express');
var router = express.Router();
var persona = require('../model/persona');
var mascota = require('../model/mascota');
var registroP = require('../controller/cuentaController');
var regitPersona = new registroP();
var utilidades = require('../controller/rolesController');
var personaControl = require('../controller/personaController');
var personaC = new personaControl();
var servicioC = require('../controller/serviciosController');
var servicios = new servicioC();
var historialC = require('../controller/historialController');
var historial = new historialC();
var mascotaC = require('../controller/mascotasController');
var mascotas = new mascotaC();
var citasC = require('../controller/citaController');
var cita = new citasC();
var veterinarioC = require('../controller/veterinarioMascotaControlle');
var viewVeterinario = new veterinarioC();

/**
 * Milware 
 * para revisar quien necesita inicio de sesion y quien no
 */

var auth = function(req, res, next) {
        if (!utilidades.validLogin(req)) {
            req.flash('error', 'Ups, necesita iniciar sesion ');
            res.redirect('/inicio');
        } else {
            next();
        }
    }
    /**
     * GET home page. 
     */
router.get('/', function(req, res, next) {
    utilidades.crearRoles();
    if (!utilidades.validLogin(req)) {
        res.render('index', {
            title: 'Valentina Veterinaria',
            sesion: false,
        });
    } else {
        res.render('index', {
            title: "Inicio sesion ",
            sesion: true,
            cliente: req.session.cliente,
            fragmento: 'fragmento/frmPrincipal'
        });
    }
});
/**
 * Rutas Necesarias para REGISTRO DE USUARIOS Y LOGIN
 */
router.get('/registro', regitPersona.visualizarRegistro);
router.get('/inicio', regitPersona.visualizarSesion);
router.post('/registro', personaC.guardar);
router.post('/inicio', regitPersona.inicioSesion);
router.get('/cerrar_Sesion', auth, regitPersona.cerrarSesion);
/**
 * Rutas Necesarias para SERVICIO
 */
router.get('/lista_Servicio', auth, servicios.visListadoServicio);
router.get('/registro_servicio', auth, servicios.visRegistroServ);
router.post('/registro_servicio', auth, servicios.guardarServicio);
router.get('/cargarDatos', auth, servicios.cargarDatosServicio);
router.post('/actualizaServicio', auth, servicios.actualizarServicip);
router.get('/cargaServiciosCliente', servicios.cargaServicioCliente);
router.post('/eliminaServicio', auth, servicios.eliminarServicio);
/**
 * Rutas Necesarias para HISTORIAL
 */
router.get('/historial', auth, historial.listaHistorialMascotas);
router.get('/historialMascota/:external_idM/:external_idP', auth, historial.listaHistorial);
router.post('/historial', auth, historial.guardaHistorial);
router.get('/cargaDatosHistorial', auth, historial.cargarDatos);
router.post('/actualizaHistorial', auth, historial.ModificarHistorial);
router.post('/eliminarHistorial', auth, historial.eliminarHistorial);
/**
 * Rutas Necesarias para MASCOTAS
 */
router.get('/mascotas', auth, mascotas.visualizarLista);
router.post('/registroMascotas', auth, mascotas.guardarMascota);
router.get('/cargarDatosMascota', auth, mascotas.cargarDatosMascota);
router.post('/actualizaMascota', auth, mascotas.modificaDatosMascotas);
/**
 * Rutas Necesarias para CITAS MEDICAS
 */
router.get('/CitaMedica', auth, cita.VisualizarCliente);
router.post('/guardaCita', auth, cita.guardarCita);
/**
 * Rutas Necesarias para CLIENTE/MASCOTA VETERINARIO
 */
router.get('/listadosCliente', auth, viewVeterinario.listarCliente);
module.exports = router;