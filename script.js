const map = L.map('map').setView([22.5, 78.9], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Load CSV
Papa.parse("internet_quality_map_data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(row => {

      const score = parseFloat(row.predicted_quality);

      let color = 'red';
      if (score >= 30) color = 'green';
      else if (score >= 15) color = 'orange';

      const marker = L.circleMarker(
        [row.lat, row.lon],
        {
          radius: 6,
          color: color,
          fillOpacity: 0.7
        }
      );

      marker.bindPopup(`
        <b>Predicted Quality:</b> ${score.toFixed(2)}<br>
        Download: ${row.avg_d_mbps} Mbps<br>
        Upload: ${row.avg_u_mbps} Mbps<br>
        Latency: ${row.avg_lat_ms} ms
      `);

      marker.addTo(map);
    });
  }
});