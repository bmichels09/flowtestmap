// Create the map object with center, zoom level and default layer.
var map = L.map('map').setView([44, -89], 8);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: api_key
}).addTo(map);

d3.csv("data/FlowTests.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        let test = data[i];
		let tooltip = "";
		if (test.Latitude !== undefined && test.Longitude !== undefined) {
			
			if (test.Address !== undefined) {
				tooltip = tooltip + test.Address + "<br>";
			}

			if (test.City !== undefined && test.State !== undefined) {
				tooltip = tooltip + `${test.City}, ${test.State}<br>`;
			}

			if (test.Date !== undefined) {
				tooltip = tooltip + `Date: ${test.Date}<br>`;
			}

			if (test.Source !== undefined) {
				tooltip = tooltip + `Source: ${test.Source}<br>`;
			}

			if (test.Static !== undefined) {
				tooltip = tooltip + `Static: ${test.Static}<br>`;
			}

			if (test.Residual !== undefined) {
				tooltip = tooltip + `Residual: ${test.Residual}<br>`;
			}

			if (test.Flow !== undefined) {
				tooltip = tooltip + `Flow: ${test.Flow}<br>`;
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