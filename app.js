function initMap() {
        var stgo_coords = {lat: -33.4488897, lng: -70.6692655};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: stgo_coords
        });
        var marker = new google.maps.Marker({
          position: stgo_coords,
          map: map
    });
 }

$(document).ready(function() {

	//De ésta manera estoy yendo a buscar los elementos al DOM sólo una vez, los almaceno en éstas variables y cuando las quiero utilizar las llamo desde declarandolas dentro de la función)

	var resumen = $('#resumen');
	var sensacion = $('#sensacion');
	var probabilidad = $('#probabilidad');
	var humedad = $('#humedad');
	var imagen = $('.img-responsive');
	var remover = $('#escondido');
	//Descomponiendo en muchas variables por si necesitamos hacer varias modifiaciones para poder concatenar para pdoer seleccionar la ubicación que queramos (éste paso vino después de la declaración abajo)
	var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
	var key = '00b403a54def5fb4fcc00e858b8351c5';
	var coords = {
		scl:'-33.4375545,-70.65048960000001',
		cma: '-33.5209155, -70.76313349999998',
		cpu: '-33.4421135, -70.7640644',
		cpa: '-33.6186082, -70.59060569999997'
	}

	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto']
	var image = {
		'partly-cloudy-day': 'images/cloud.png',
		'clear-day':'images/sun.png',
		'partly-cloudy-night':'images/cloud.png'
	}

	$('#select').on('change', function(){
		$.ajax({
			//El / es porque key no termina en / (las comas se usan cupando abajo viene un nuevo método)
			url: url + key + '/' + coords[$(this).val()]+'?'+queryParams[0]+'&'+queryParams[1] +'&'+ queryParams[2], //Concatenación de las query params de la appi de clima (las ordenamos en variables para que ni fueran tan largas, se separan con un & y la primera comienza con ?)
			method:'GET'
		}).then(function(data){ //Lo que se va a ejecutar luego va a ser el método .then con una función que tendra un argumento data, que corresponderá al objeto que nos va a enviar la api devuelta. 
			console.log(data);
			resumen.text(parseInt(data.currently.temperature) +'° '+ data.currently.summary);
			sensacion.text(data.currently.apparentTemperature + '° ');
			probabilidad.text(data.currently.precipProbability *100 +'%');
			humedad.text(data.currently.humidity *100 +'%');
			imagen.attr('src', image[data.currently.icon]);
			remover.removeAttr('hidden');

		});
	});


	var new_coords = {
		scl: { lat: -33.4488897, lng: -70.6692655 },
		cma: { lat: -33.5209155, lng: -70.76313349999998 },
		cpu: { lat: -33.4421135, lng: -70.7640644 },
		cpa: { lat: -33.6186082, lng: -70.59060569999997}
 	};
 		


		$('#select').on('change', function(){

	        var map = new google.maps.Map(document.getElementById('map'), {
	        	position: (new_coords[$(this).val()]),
	          	zoom: 10,

	        });

	        var marker = new google.maps.Marker({
	            position: (new_coords[$(this).val()]),
	            map: map
	        });

	        map.setCenter(marker.getPosition());
	});

});	