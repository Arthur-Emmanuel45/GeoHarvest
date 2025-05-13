const errorMessage = document.getElementById("error_message");
const getLat = document.getElementById("get_lat");
const getLong = document.getElementById("get_long");
const getLocationBtn = document.getElementById("get_location_btn");
const coordsList = document.getElementById("coords_list");

//array of coordinate
const points = [];
let polylineLayer = null;


//plot the map
var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const getUserLocation = () => {
    if (!navigator.geolocation) {
        errorMessage.innerHTML = "no gelocation avaliable"
    }
    
    const success = (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
  
        points.push([lat, lng]);
        L.marker([lat, lng]).addTo(map).bindPopup("Current Location").openPopup();
        getLat.innerHTML = pos.coords.latitude;
        getLong.innerHTML = pos.coords.longitude;


        // Show coordinates in list
        const li = document.createElement("li");
        li.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        document.getElementById("coords_list").appendChild(li);

        map.setView([lat, lng], 13);

        // Remove old polyline if it exists
        if (polylineLayer) {
            map.removeLayer(polylineLayer);
        }
        
        // Draw updated polyline
        polylineLayer = L.polyline(points, {
            color: 'blue',
            weight: 4
        }).addTo(map);
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
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Button click triggers geolocation
getLocationBtn.addEventListener("click", getUserLocation);
