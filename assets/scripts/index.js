let width = document.querySelector("#width");
let height = document.querySelector("#height");
window.onload = () => getWindowDimensions();

function getWindowDimensions() {
    width.innerHTML = "width: " + window.innerWidth + " px";
    height.innerHTML = "height: " + window.innerHeight + " px";
}

window.onresize = () => getWindowDimensions();