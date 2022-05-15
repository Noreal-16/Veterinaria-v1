var URL = 'http://localhost:9000'
    /**
     * Llena datos de servicios
     * @param {external} external 
     */
function llenarDatosServicio(external) {
    var url = URL + "/cargarDatos";
    //console.log(external);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            $("#externalServicio").val(data.id);
            $("#nombreServicio").val(data.nombre);
            $("#valorServicio").val(data.valor);
            $("#descripcionServicio").val(data.descripcion);
        }
    });
};

function llenaDatosCombo() {
    var url = URL + "/cargaServiciosCliente";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            var option = '';
            $.each(data, function(index, item) {
                option += '<option value= ' + item.nombre + '>' + item.nombre + '</oprion>';
            });
            $('#servicios').html(option);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert('error al cargar los servicios');
        }
    });
}

function llenaDatosMascota(external) {
    var url = URL + "/cargarDatosMascota";
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function(data, textStatus, jqXHR) {
            $('#externalMascota').val(data.external_id);
            $('#nombreActualizas').val(data.nombre);
            $('#edadActualizar').val(data.edad);
            $('#sexoActualizar').val(data.sexo);
            $('#especieActualizar').val(data.especie);
            $('#razaActualizar').val(data.raza);
        }
    });
}

function llenaDatosHistorial(external) {
    var url = URL + '/cargaDatosHistorial';
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function(data, textStatus, jqXHR) {
            $('#external_idHist').val(data.external_id);
            $('#enfermedadHistorial').val(data.enfermedad);
            $('#descripcionHistorial').val(data.descripcion);
            $('#causaHistorial').val(data.causa);
            $('#estadoSaludHistorial').val(data.estadoSalud);
            $('#tratamientoHistorial').val(data.tratamiento);
        }
    });
}