const errorMessage = document.getElementById("error_message");
const getLat = document.getElementById("get_lat");
if (navigator.geolocation) {
    errorMessage.innerHTML = "no gelocation avaliable"
}

const success = (pos) => {
    getLat.innerHTML = pos;
}

navigator.geolocation.getCurrentPosition(success, error, option);