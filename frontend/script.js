// Initialize map
var map = L.map('map').setView([37.5665, 126.9780], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Load crime data
fetch('crimes.json')
.then(response => response.json())
.then(data => {

    // Add markers
    data.forEach(crime => {
        L.marker([crime.lat, crime.lng])
         .addTo(map)
         .bindPopup("Crime: " + crime.type);
    });

    // Update total crimes in panel
    document.getElementById('total-crimes').innerText = data.length;

    // Create heatmap points
    var heatPoints = data.map(c => [c.lat, c.lng, 0.5]); // 0.5 = intensity
    var heat = L.heatLayer(heatPoints, {radius: 25, blur: 20, maxZoom: 17}).addTo(map);
})
.catch(err => console.error("Failed to load crime data:", err));
