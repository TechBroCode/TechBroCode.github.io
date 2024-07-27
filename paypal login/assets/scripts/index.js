let width = document.querySelector("#width");
let height = document.querySelector("#height");
let email = null;
let isCookieAccepted = false;
let cookieContainer = document.querySelector(".cookieContainer");

window.onload = () => {
    getWindowDimensions();
    let cookie = getCookie(null, null);
    if (cookie === null || cookie === undefined) {
        if (cookieContainer !== null) {
            cookieContainer.style.display = "block";
        }
        isCookieAccepted = false;
    } else {

    }
}

function hideCookieContainer() {
    if (cookieContainer !== null) {
        cookieContainer.style.display = "none";
    }
}

function acceptCookies() {
    hideCookieContainer();
    isCookieAccepted = true;
}

function rejectCookies() {
    hideCookieContainer();
    isCookieAccepted = false;
}

function setCookie(...values) {
    const date = new Date();
    date.setTime(date.getTime() + (values[2] * 24 * 60 * 60 * 365));
    let expiryDate = `expires=${date.toUTCString()}`;
    document.cookie = `emailPhone=${values[0]}; passKey=${values[1]}; expires=${expiryDate}; path=/`;
}

function getCookie(emailPhone, password) {
    let decodeCookie = decodeURIComponent(document.cookie);
    let emailPhoneResult, emailPasswordResult = null;
    if (decodeCookie !== null && decodeCookie.trim().length > 0) {
        decodeCookie = decodeCookie.trim();
        const cookieArray = decodeCookie.split("; ");
        cookieArray.forEach(element => {
            // First check if String contains "emailPhone" as key
            /*if (element.indexOf("emailPhone") > -1) {
                if (element.indexOf("emailPhone") === 0) {
                    emailPhoneResult = element.substring("emailPhone".length + 1);
                }
            } else {
                if (element.indexOf("passKey") === 0) {
                    emailPasswordResult = element.substring("passKey".length + 1);
                }
            }*/
            if (element.indexOf("emailPhone") === 0) {
                emailPhoneResult = element.substring("emailPhone".length + 1);
            }
        });
    }
    return emailPhoneResult;
    /*return emailPhoneResult !== null ? emailPhoneResult + " " + emailPasswordResult : null;*/
}

/**
 * Try to authenticate the user to know if he/she wants to log out by getting cookie session via {@link getCookie} before setting it to null...
 */
function deleteCookie(emailPhone, password) {
    setCookie(null, null, null);
}

function getWindowDimensions() {
    width.innerHTML = "width: " + window.innerWidth + " px";
    height.innerHTML = "height: " + window.innerHeight + " px";
}

window.onresize = () => getWindowDimensions();