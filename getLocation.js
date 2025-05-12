const errorMessage = document.getElementById("error_message");
const getLat = document.getElementById("get_lat");
const getLong = document.getElementById("get_long");
if (!navigator.geolocation) {
    errorMessage.innerHTML = "no gelocation avaliable"
}

const success = (pos) => {
    getLat.innerHTML = pos.coords.latitude;
    getLong.innerHTML = pos.coords.longitude;
}
const error = () => {
    console.log(err);
}

navigator.geolocation.watchPosition(success, error);