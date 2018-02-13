{
	//Indican el estado de la peticion ['Sin inicializar','Cargando','Cargada','Interactuando','Completada']
	let estados = ['READY_STATE_UNINITIALIZED','READY_STATE_LOADING','READY_STATE_LOADED','READY_STATE_INTERACTIVE','READY_STATE_COMPLETE'];

	$().ready(function()
	{
		//Accedemos al DOM una vez cargada la página y creamos las variables
		$("#enviar").on("click",cargarRequest);

		//Indicamos la ruta o el nombre de la página en este caso
		//Recoger el nombre html, permite que no sea necesario el uso de un servidor web
		let pathArray = window.location.pathname.split("/");
		$("#recurso").val(window.location.href);
		//$("#recurso").val(window.location);
	});

	let cargarRequest = function()
	{
		//Reinicializamos los estados por cada petición que se hace.
		$("#estados").html("");
		$("#contenidos").html("");

		$.ajax({
				url: $("#recurso").val(),

				success: function( data ) 
				{
					$("#contenidos").html(data.transformaCaracteresEspeciales());

				},

				beforeSend: function(xhr)
				{
					$("#estados").append("Código: " + xhr.readyState + " <br/>Estado: " + estados[xhr.readyState]+"<br/><br/>");
				},

				complete: function(xhr)
				{
					$("#estados").append("Código: " + xhr.readyState + " <br/>Estado: " + estados[xhr.readyState]+"<br/>");
					$("#codigo").html(xhr.status + " " + xhr.statusText);
				}

			});
}
	String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
                      replace(/%0A/g, '<br/>').
                      replace(/%3C/g, '&lt;').
                      replace(/%3E/g, '&gt;'));
	}

}
