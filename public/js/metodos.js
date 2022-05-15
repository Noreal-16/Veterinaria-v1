/**
 * @description funcion para validar cedula ecuatoriana
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
 * @description trae fecha actual cambiando de formato
 */
function fechaActual() {
    var d = new Date();
    var mes = (d.getMonth() + 1);
    var dia = d.getDate();
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    $("#fecha").val(fecha);
    return fecha;
}
/**
 * @description funcion para selecionar fecha en el select
 */
function fechaE(fecha) {
    var d = new Date(fecha);
    var mes = (d.getMonth() + 1);
    var dia = (d.getDate() + 1);
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    // console.log("escogida: "+fecha);
    return fecha;
}
/**
 * @description funcion pra dar formato al input date
 */
function rellenarCeros(texto, nro_cero) {
    texto = texto + "";
    if (texto.length < nro_cero) {
        var aux = "";
        for (var i = texto.length; i < nro_cero; i++) {
            aux += "0";
        }
        return aux + texto;
    } else {
        return texto;
    }
}
/**
 * @description sirve para controlar los dias de atencion
 */
function selectColor() {
    var dia = diaSemana();
    if (dia !== "fin") {
        $("#inf").hide();
        $("#horario").show();
        $("#bcita").show();
    } else {
        $("#inf").show();
        $("#horario").hide();
        $("#bcita").hide();
    }

}
/**
 * @description funcion que permite retoranar el dia segun la fecha
 */
function diaSemana() {
    var fa = $("#fecha").val();
    var f = new Date(fa);
    var dia = f.getDate();
    var mes = f.getMonth() + 1;
    var anio = f.getFullYear();
    return verificar_diaSemana(dia, mes, anio);

}
/**
 * @description funcion que permite verificar los dias de la semana del sistema
 */
function verificar_diaSemana(dia, mes, anio) {
    // var dias = [ "lun", "mar", "mie", "jue", "vie", "sab", "dom"];
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "fin", "fin"];
    var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
    var d = dias[dt.getUTCDay()];
    // console.log(d);
    return d;
}
/**
 * @description funcion que inhabilita fechas pasadaas
 */
function fechasPasadas() {
    document.getElementById("fecha").setAttribute("min", fechaActual());
    var fechaEntrada = fechaE($("#fecha").val());
    var fechaLimite = fechaActual();
    console.log("entrada " + fechaEntrada);
    console.log("limite " + fechaLimite);
    console.log("FE:" + new Date(fechaEntrada).getTime());
    console.log("FL:" + new Date(fechaLimite).getTime());
    if ((new Date(fechaEntrada).getTime() < new Date(fechaLimite).getTime())) {
        console.log("FEcha Entrada incorrecta");
        $("#fechaError").show();
    }
    console.log("FechaEntrada correcta")
    $("#fechaError").hide();
}
/**
 * @description funcio que permite obtener la hora del sistema
 */
function obtenerHora() {
    var d = new Date();
    var hora = d.getHours();
    console.log("hora: " + hora);
    if (hora < 17) {
        return true;
        console.log("verdadero");
        $("#alerta").hide();
    } else {
        return false;
        $("#alerta").show();
        console.log("falso");
    }
}
/**
 * @description funcion que permite cojer la cita dependiendo de la hora
 */
function fechaSiguiente(fecha) {
    var d = new Date(fecha);
    var mes = (d.getMonth() + 1);
    var dia = (d.getDate() + 2);
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    $("#fecha").val(fecha);
    return fecha;
}
/**
 * @description funcion que permite validar la clave de la cuenta actual en caso de configuracion
 */
function validarclave(clave) {
    var claveActual = $("#claveU").val();
    console.log(claveActual)
    if (clave === claveActual) {
        return true;
    }
    return false;
}

/**
 * @description funcion que permite encontrar un elemento dentro de un array
 */
function contieneValor(array, valor) {
    for (var i = 0; i < array.length; i++) {
        if (valor == array[i]) {
            //  console.log('Si existe');
            //return valor;
            console.log("valor:" + valor);
            console.log("HORARIO Y DIV IGUALES")
            return valor;
            break;
        }
    }
}
/**
 * @description funcion que permite guardar datos de un selec en un array
 */
function recorrerSelect(sel) {
    var array = [sel.length];
    for (var i = 0; i < sel.length; i++) {
        var opt = sel[i];
        array[i] = opt.value;
    }
    return array;
}