const errorMessage = document.getElementById("error_message");
const getLat = document.getElementById("get_lat");
const getLong = document.getElementById("get_long");
const getLocationBtn = document.getElementById("get_location_btn");
const coordsList = document.getElementById("coords_list");

//array of coordinate
const points = [];
let polylineLayer = null;


// let pendingPoint = null;
// const confirmedPoints = [];

//plot the map
var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Click to select a point (but not confirm yet)
// map.on("click", function (e) {
// pendingPoint = e.latlng;
// alert(`Selected: ${pendingPoint.lat.toFixed(5)}, ${pendingPoint.lng.toFixed(5)}\nClick "Confirm Point" to save.`);
// });

// Confirm the clicked point
// document.getElementById("confirm_point").onclick = function () {
// if (!pendingPoint) {
//     alert("Click on the map first to select a point.");
//     return;
// }

// confirmedPoints.push([pendingPoint.lat, pendingPoint.lng]);

// L.marker(pendingPoint).addTo(map)
//     .bindPopup("Confirmed Point")
//     .openPopup();

// const li = document.createElement("li");
// li.textContent = `Lat: ${pendingPoint.lat.toFixed(5)}, Lng: ${pendingPoint.lng.toFixed(5)}`;
// coordsList.appendChild(li);

// L.polyline(confirmedPoints, { color: 'blue' }).addTo(map);


// pendingPoint = null;
// };
//getting coordinate
const getUserLocation = () => {
    if (!navigator.geolocation) {
        errorMessage.innerHTML = "no gelocation avaliable"
    }
    
    const success = (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
  
        // confirmedPoints.push([lat, lng]);
        points.push([lat, lng]);
        L.marker([lat, lng]).addTo(map).bindPopup("Current Location").openPopup();
        getLat.innerHTML = pos.coords.latitude;
        getLong.innerHTML = pos.coords.longitude;

        const li = document.createElement("li");
        li.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        document.getElementById("coords_list").appendChild(li);

        map.setView([lat, lng], 13);

        // Draw updated polyline
        if (polylineLayer) map.removeLayer(polylineLayer);
        polylineLayer = L.polyline(points, { color: 'blue' }).addTo(map);
    }
    const error = (err) => {
        if(err.code === 1){
            alert("please allow permission to access geolocation");
        }else {
            alert("position not avialiable");
        }
    }
    const options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
    }
    
    navigator.geolocation.watchPosition(success, error, options);
}

// Button click triggers geolocation
getLocationBtn.addEventListener("click", getUserLocation);
