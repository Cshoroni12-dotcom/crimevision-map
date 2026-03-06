var map = L.map('map').setView([37.5665, 126.9780], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);

// Example crime data
var crimes = [
{lat: 37.5665, lng: 126.9780, type: "Robbery"},
{lat: 37.5700, lng: 126.9820, type: "Assault"},
{lat: 37.5650, lng: 126.9900, type: "Theft"},
{lat: 37.5610, lng: 126.9750, type: "Burglary"},
{lat: 37.5685, lng: 126.9905, type: "Vandalism"}
];

// Add markers for each crime
crimes.forEach(function(crime) {
L.marker([crime.lat, crime.lng])
.addTo(map)
.bindPopup("Crime: " + crime.type);
});
