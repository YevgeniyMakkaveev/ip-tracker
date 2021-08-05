import "leaflet/dist/leaflet.css";
import "@babel/polyfill";
import L from "leaflet";
import axios from "axios";

const ip = document.getElementById("ip");
const location = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

async function getAddress(ip = "8.8.8.8") {
  const url = `https://geo.ipify.org/api/v1?apiKey=at_DXFKzBSzCbhkyZpDs164d6qCx0zTv&ipAddress=${ip}`;

  return await axios.get(url).then((response) => {
    getToData(response.data);
  });
}

const getToData = (data) => {
  console.log(data);
  ip.innerHTML = data.ip;
  location.innerHTML = data.location.region;
  timezone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;
  const lat = data.location.lat;
  const long = data.location.lng;
  makeMap(lat, long);
};

const makeMap = (lat, long) => {
  const mapArea = document.getElementById("map");
  const map = L.map(mapArea, {
    center: [lat, long],
    zoom: 13,
    zoomControl: false,
  });
  //center: [51.505, -0.09]

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
};
getAddress("109.105.133.36");
