/**
 * Funcion para calcular la edad 
 * @param {fecha} fecha 
 */
function calcularEdad(fecha) {
    //var fecha = document.getElementById("fecha");
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log("TIENES: " + edad + " ANIOS");
    return edad;
}
/**
 * Funcion para validar la cedula ecuatoriana
 * @param {cedula} cedula 
 */
function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}
/**
 * Funcion validaciones 
 */
function validacion() {
    $.validator.addMethod("soloLetras", function(value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Solo letras");
    $("#formulario").validate({
        rules: {

            apellido: {
                required: true,
                minlength: 3,
                maxlength: 50,
                soloLetras: true
            },
            nombre: {
                required: true,
                minlength: 3,
                maxlength: 50,
                soloLetras: true
            },
            fecha: {
                required: true
            },
            correo: {
                required: true,
                email: true
            },
            clave: {
                required: true
            }
        }

    });
}
/**
 * Validacion Inicio sesion
 */
function validacionInicio() {
    $("#formularioInicio").validate({
        rules: {
            correo: {
                required: true,
                email: true
            },
            clave: {
                required: true
            }
        }

    });
}
/**
 * validacion registro
 */
function validarServicios() {
    $("#registroServicio").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            valor: {
                required: true,
            }
        }

    });
}
/**
 * validacion registro mascota
 */
function validarMascota() {
    $("#registroMascota").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            edad: {
                required: true,
            },
            sexo: {
                required: true,
            },
            especie: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            raza: {
                required: true,
                minlength: 2,
                maxlength: 255,
            }
        }

    });
}
/**
 * validacion registro Historial
 */
function validarHistorial() {
    $("#registroHistorial").validate({
        rules: {
            enfermedad: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            estadoSalud: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            causa: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            tratamiento: {
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            descripcion: {
                required: true,
                minlength: 3,
                maxlength: 255,
            }
        }

    });
}