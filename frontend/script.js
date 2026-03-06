// Initialize map
const map = L.map('map').setView([37.5665, 126.9780], 13);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Placeholder for real crime data
// Use this structure when adding real data:
// {lat: 37.56, lng: 126.98, type: "violent"}
let crimes = []; // currently empty

// Heatmap layer
let heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

// Function to render crimes
function renderCrimes() {
  // Clear all existing markers
  if (window.markers) {
    window.markers.forEach(marker => map.removeLayer(marker));
  }
  window.markers = [];

  // Filter checkboxes
  const showViolent = document.getElementById("violent-checkbox").checked;
  const showProperty = document.getElementById("property-checkbox").checked;
  const showOther = document.getElementById("other-checkbox").checked;

  // Filtered crimes
  const filteredCrimes = crimes.filter(crime => {
    return (crime.type === "violent" && showViolent) ||
           (crime.type === "property" && showProperty) ||
           (crime.type === "other" && showOther);
  });

  // Update heatmap
  const heatPoints = filteredCrimes.map(c => [c.lat, c.lng, 0.6]);
  heatLayer.setLatLngs(heatPoints);

  // Add markers
  filteredCrimes.forEach(crime => {
    let color = crime.type === "violent" ? "#7FDBFF" :
                crime.type === "property" ? "#7CFC00" : "#00FFFF";

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

  // Update crime rate bar (example: percentage of visible crimes)
  const rateBar = document.getElementById("crime-rate-bar");
  const percent = filteredCrimes.length > 0 ? Math.min(100, filteredCrimes.length * 10) : 0;
  rateBar.style.width = percent + "%";
}

// Initial render
renderCrimes();

// Event listeners for filters
document.getElementById("violent-checkbox").addEventListener("change", renderCrimes);
document.getElementById("property-checkbox").addEventListener("change", renderCrimes);
document.getElementById("other-checkbox").addEventListener("change", renderCrimes);

// Refresh button placeholder
document.getElementById("refresh-btn").addEventListener("click", () => {
  console.log("Refresh data clicked. Add API fetch logic here.");
  // Example: fetch new crime data from API
  // crimes = fetchCrimeData();
  renderCrimes();
});
