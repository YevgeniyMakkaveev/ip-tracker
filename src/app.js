import "leaflet/dist/leaflet.css";
import "@babel/polyfill";
import L from "leaflet";
import axios from "axios";

const ip = document.getElementById("ip");
const location = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const form = document.querySelector(".head__form");
const search = document.querySelector(".head__search");
const errorMsg = document.querySelector(".head__error");
import target from "./images/icon-location.svg";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeError();
  const value = search.value;
  if (validateIPaddress(value)) {
    getAddress(search.value);
    search.value = null;
  } else {
    throwError();
    search.value = null;
  }
});

async function getAddress(ip = "8.8.8.8") {
  const url = `https://geo.ipify.org/api/v1?apiKey=at_DXFKzBSzCbhkyZpDs164d6qCx0zTv&ipAddress=${ip}`;

  return await axios
    .get(url)
    .then((response) => {
      getToData(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

const validateIPaddress = (ipAdr) => {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipAdr
    )
  ) {
    return true;
  } else {
    return false;
  }
};
const throwError = () => {
  errorMsg.classList.add("visible");
};
const removeError = () => {
  errorMsg.classList.remove("visible");
};
const mapArea = document.getElementById("map");

const customIcon = L.icon({
  iconUrl: target,
  iconSize: [30, 40],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
  setView: true,
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
  }
).addTo(map);

const getToData = (data) => {
  ip.innerHTML = data.ip;
  location.innerHTML = data.location.region;
  timezone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;
  let lat = data.location.lat;
  let long = data.location.lng;
  changeView(lat, long);
};

const changeView = (lat = 51.505, long = -0.09) => {
  L.marker([lat, long], {
    icon: customIcon,
  }).addTo(map);
  map.setView([lat, long]);
};
getAddress("109.105.133.36");
