mapboxgl.accessToken = mapToken;
const geometryCoordinates = JSON.parse(coordinates);
if (geometryCoordinates.length == 0) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [72.8777, 19.076], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9, // starting zoom
  });

  const marker = new mapboxgl.Marker({ color: "#fe424d" })
    .setLngLat([72.8777, 19.076]) //Listing.geometry.coordinates
    .addTo(map);
}
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: 'mapbox://styles/mapbox/streets-v12',
  center: geometryCoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 11, // starting zoom
});

const el = document.createElement("div");
el.className = "marker";

const marker = new mapboxgl.Marker(el)
  .setLngLat(geometryCoordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(`<h5>${JSON.parse(Location)}</h5><p>Extact Location Will Be Provided After The Booking!</p>`))
  .addTo(map);
