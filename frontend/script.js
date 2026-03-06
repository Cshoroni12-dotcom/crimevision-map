// Initialize the map
const map = L.map('map').setView([37.5665, 126.9780], 13);

// Add base tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Placeholder for real crime data
// Structure example: {lat: 37.566, lng: 126.978, type: "violent"}
let crimes = []; // currently empty, ready for real data

// Create heatmap layer
let heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

// Function to render crimes
function renderCrimes() {
  // Remove old markers
  if (window.markers) window.markers.forEach(m => map.removeLayer(m));
  window.markers = [];

  // Add new markers
  crimes.forEach(crime => {
    let color = crime.type === "violent" ? "#7FDBFF" : "#7CFC00"; // light blue or light green
    const marker = L.circleMarker([crime.lat, crime.lng], {
      radius: 10,
      fillColor: color,
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    marker.bindPopup(`Type: ${crime.type}`);
    window.markers.push(marker);
  });

  // Update heatmap
  const heatPoints = crimes.map(c => [c.lat, c.lng, 0.6]);
  heatLayer.setLatLngs(heatPoints);

  // Update crime rate bar (percentage based on number of crimes)
  const rateBar = document.getElementById("crime-rate-bar");
  const percent = Math.min(100, crimes.length * 10); // just an example scale
  rateBar.style.width = percent + "%";
}

// Initial render
renderCrimes();

// Refresh button logic
document.getElementById("refresh-btn").addEventListener("click", () => {
  console.log("Refresh clicked. Fetch new data here.");
  // Example: fetch new data from API
  // crimes = fetchCrimeData();
  renderCrimes();
});
