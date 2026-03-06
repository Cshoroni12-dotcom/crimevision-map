window.onload = function() {
  // Initialize map
  const map = L.map('map').setView([37.5665, 126.9780], 14);

  // Base tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  // Dummy crime points
  let crimes = [
    {lat: 37.5665, lng: 126.9780, type: "violent"},
    {lat: 37.5680, lng: 126.9820, type: "property"},
    {lat: 37.5650, lng: 126.9760, type: "violent"},
    {lat: 37.5675, lng: 126.9805, type: "property"},
  ];

  // Heatmap layer
  let heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

  // Render crimes
  function renderCrimes() {
    if (window.markers) window.markers.forEach(m => map.removeLayer(m));
    window.markers = [];

    // Add heatmap points
    const heatPoints = crimes.map(c => [c.lat, c.lng, 0.6]);
    heatLayer.setLatLngs(heatPoints);

    // Add markers
    crimes.forEach(crime => {
      let color = crime.type === "violent" ? "#7FDBFF" : "#7CFC00"; // light blue or green
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

    // Update crime bar
    document.getElementById("crime-rate-bar").style.width = Math.min(100, crimes.length * 20) + "%";
  }

  // Initial render
  renderCrimes();

  // Refresh button placeholder
  document.getElementById("refresh-btn").addEventListener("click", () => {
    console.log("Refresh clicked - add data fetching logic here");
    renderCrimes();
  });
};
