import "leaflet/dist/leaflet.css";
import "@babel/polyfill";
import L from "leaflet";
import axios from "axios";

async function getAddress(ip = "8.8.8.8") {
  const url = `https://geo.ipify.org/api/v1?apiKey=at_RGFJlbsE0JO6WacpYnQZDCsk3gMNy&ipAddress=${ip}`;

  return await axios.get(url).then((response) => {
    console.log(response.data);
  });
}

getAddress("109.105.133.36");
const mapArea = document.getElementById("map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamF2azA5MiIsImEiOiJja3J4cWNqczIwYmFrMnBvOTN0aTd6Y3IzIn0.3tsP0CrJeWIYfAo2_nAkdw",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(map);
