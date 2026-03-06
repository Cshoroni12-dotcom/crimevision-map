// Wait until the page fully loads
window.onload = function() {

  // Initialize map
  const map = L.map('map').setView([37.5665, 126.9780], 13);

  // Add base tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  // Empty crime data for now
  let crimes = []; // fill with real data later

  // Heatmap layer
  let heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

  // Render crimes
  function renderCrimes() {
    if (window.markers) window.markers.forEach(m => map.removeLayer(m));
    window.markers = [];

    crimes.forEach(crime => {
      let color = crime.type === "violent" ? "#7FDBFF" : "#7CFC00"; // blue/green
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

    // Update crime rate bar
    document.getElementById("crime-rate-bar").style.width = Math.min(100, crimes.length * 10) + "%";
  }

  // Initial render
  renderCrimes();

  // Refresh button placeholder
  document.getElementById("refresh-btn").addEventListener("click", () => {
    console.log("Refresh clicked - add data fetch logic");
    renderCrimes();
  });

}
