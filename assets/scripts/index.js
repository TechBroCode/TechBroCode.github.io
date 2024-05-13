let width = document.querySelector("#width");
let height = document.querySelector("#height");
let cookieAccepted = false;
let cookieArray = null, name = null, value = null;

let cookies = {
    readCookie: () => {
        let allCookies = document.cookie;
        document.write("All Cookies : " + allCookies);
        cookieArray = allCookies.split(';');

        for (let c = 0; c < cookieArray.length; c++) {
            name = cookieArray[c].split('=')[0];
            value = cookieArray[1].split('=')[1];
            document.write("Key is : " + name + " and value is : " + value);
        }
        return name;
    },
    writeCookie: () => {

    }
}

window.onload = () => {
    getWindowDimensions();
    if (cookies.readCookie() !== null || cookies.readCookie() !== undefined) {
//     Cookie is present then set cookieAccepted to true
        cookieAccepted = true;
    } else {

    }
}

function getWindowDimensions() {
    width.innerHTML = "width: " + window.innerWidth + " px";
    height.innerHTML = "height: " + window.innerHeight + " px";
}

window.onresize = () => getWindowDimensions();