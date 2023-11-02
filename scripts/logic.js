// Create the map object with center, zoom level and default layer.
var map = L.map('map').setView([44, -89], 8);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	accessToken: api_key,
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);

d3.csv("data/FlowTests.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        let test = data[i];
		let tooltip = "";
		if (test.Latitude !== "" && test.Longitude !== "") {
			
			if (test.Address !== "") {
				tooltip = tooltip + `<b>${test.Address}</b><br>`;
			}

			if (test.City !== "" && test.State !== "") {
				tooltip = tooltip + `<b>${test.City}, ${test.State}</b><br><br>`;
			}

			if (test.Date !== "") {
				tooltip = tooltip + `<b>Date:</b> ${test.Date}<br>`;
			}

			if (test.Source !== "") {
				tooltip = tooltip + `<b>Source:</b> ${test.Source}<br><br>`;
			}

			if (test.Static !== "") {
				tooltip = tooltip + `<b>Static:</b> ${test.Static} psi<br>`;
			}

			if (test.Residual !== "") {
				tooltip = tooltip + `<b>Residual:</b> ${test.Residual} psi<br>`;
			}

			if (test.Flow !== "") {
				tooltip = tooltip + `<b>Flow:</b> ${test.Flow} gpm<br>`;
			}

			tooltip = tooltip.trimEnd();

			L.marker(L.latLng(Number(test.Latitude), Number(test.Longitude))).addTo(map)
				.bindPopup(tooltip);
		}
		
		else {
			continue;
		}
    }
});