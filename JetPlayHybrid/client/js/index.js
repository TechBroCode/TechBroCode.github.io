let hasInternetConnection = null;
const socket = io();
const bottomContainer = document.querySelector("#bottom-container");
const bottomContainerItems = document.querySelectorAll(".bottom-container-item");
const mainContent = document.querySelector("#main-content");
let materialIcons = document.querySelectorAll(".material-symbols");
let searchBarContainer = document.querySelector("#search-bar-container");
let searchBarIconHolders = document.querySelectorAll(".search-bar-icon-holders");
let selectedBottomNavIndex = 0;
let messagePort;

socket.on('connect', () => {
    console.log('Connected to server');
});

if (socket.listeners("connect").length === 0) {
    socket.on("connect", async () => {
        console.log("client socket is connected");
    });

    socket.on("disconnect", async () => {
        console.log("client socket is disconnected");
    });
}

if (socket.listeners("networkResponse").length === 0) {
    socket.on("networkResponse", async data => {
        hasInternetConnection = data.value;
        if (hasInternetConnection === true) {
            /*TODO: Check if all images are loaded completely and ready to display...*/
            const images = document.querySelectorAll("img");
            images.forEach((image, imageIndex) => {
                if (image.style.display === "none") {
                    const imageDisplay = image.dataset.display;
                    const imageResource = image.getAttribute("src");
                    image.setAttribute("src", imageResource);
                    image.setAttribute("srcset", imageResource);
                    image.src = imageResource;
                    image.srcset = imageResource;
                    if (image.naturalWidth >= 0 && image.naturalHeight >= 0) {
                        image.style.display = imageDisplay;
                    }
                }
            });
        }
    });
}

if (socket.listeners("android-toast").length === 0) {
    socket.on("android-toast", async data => {
        AndroidInterface.showToastMessage(data.message, data.duration);
    });
}

function clearHoverBackground(e, element, background) {
    const clearBackground = setInterval(() => {
        preventDefaultStopPropagation(e);
        element.style.background = background;
        clearInterval(clearBackground);
    }, 50);
}

window.onBackPressed = () => {
    AndroidInterface.showToastMessage("On back pressed clicked", 1);
    const canNavigateBack = AndroidInterface.canWebNavigateBack();
    if (canNavigateBack === true) {
        // Load ads from Android app and go back
    } else {
        AndroidInterface.goBack();
    }
}

function preventDefaultStopPropagation(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    /*e.preventDefault();*/
}

function onTouchAction(e, elementValue) {
    preventDefaultStopPropagation(e);
    elementValue.style.background = "var(--hover-background-color)";
}

function adjustMarginsForAds() {
    // We'll adjust either the top or bottom margins after showing ads
}


function clearHoverEffect(e, elementValue) {
    if (e === undefined) return;
    if (e === null) return;
    if (elementValue === undefined) return;
    if (elementValue === null) return;
    preventDefaultStopPropagation(e);
    if (elementValue.classList.contains("hover")) {
        elementValue.classList.remove("hover");
    }
}

function addHoverEffect(e, elementValue) {
    if (e === undefined) return;
    if (e === null) return;
    if (elementValue === undefined) return;
    if (elementValue === null) return;
    preventDefaultStopPropagation(e);
    if (!elementValue.classList.contains("hover")) {
        console.log("e", e);
        console.log("elValue", elementValue);
        elementValue.classList.add("hover");
    }
}

window.onHostNetChange = (isOnline) => {
    console.log(isOnline);
    hasInternetConnection = isOnline !== undefined && isOnline !== null && isOnline.toString().trim().toLowerCase() === "true";
    if (hasInternetConnection) {
        AndroidInterface.showToastMessage("Internet connection available", 1);
    } else {
        AndroidInterface.showToastMessage("No internet connection", 1);
    }
}


window.onPostResume = () => {

}

window.onPause = () => {
}

window.onResume = () => {

}

window.onStop = () => {

}

window.onStart = () => {

}

window.onWindowFocusChanged = () => {

}

window.addEventListener("message", (event) => {
    if (event.data === "Connect" && event.ports.length > 0) {
        messagePort = event.ports[0];

        // Listen for function calls from Android
        messagePort.onmessage = function (msgEvent) {
            try {
                let data = msgEvent.data.split(":");
                let functionName = data[0];
                let params = data.slice(1); // Get parameters

                console.log(`Executing: ${functionName} with params:`, params);

                // Call the JavaScript function dynamically with arguments
                if (typeof window[functionName] === "function") {
                    window[functionName](...params);
                }
            } catch (error) {
                console.error("Error processing message:", error);
            }
        };

        // ✅ Notify Android that WebMessagePort is ready
        messagePort.postMessage("Ready");
    }
});

/*window.addEventListener("message", (event) => {
    if (event.data === "Connect" && event.ports.length > 0) {
        messagePort = event.ports[0];

        // Listen for function calls from Android
        messagePort.onmessage = function (msgEvent) {
            try {
                let data = JSON.parse(msgEvent.data);
                let functionName = data.function;
                let params = data.params;

                console.log(`Executing: ${functionName} with params:`, params);
                // Call the JavaScript function dynamically with arguments
                if (typeof window[functionName] === "function") {
                    window[functionName](...params);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        }
    }
});*/

// Example usage
document.addEventListener("DOMContentLoaded", () => {
    if (selectedBottomNavIndex === 0) {
        showHomeNavigation();
    }
    // Change MainContent height
    const btmNavHeight = bottomContainer.getBoundingClientRect().height;
    mainContent.style.height = `calc(100vh - ${btmNavHeight}px)`;
    mainContent.style.bottom = `${btmNavHeight}px`;

    function loadMaterialIcons() {
        materialIcons = document.querySelectorAll(".material-symbols");
        if (materialIcons.length > 0) {
            materialIcons.forEach((materialIcon, index) => {
                // Check if the Material Icons font is applied
                const matIconDataSet = materialIcon.dataset;
                const interval = setInterval(() => {
                    if (materialIcon.style.color === "transparent" && materialIcon.getBoundingClientRect().width.toString() === matIconDataSet.size) {
                        clearInterval(interval);
                        materialIcon.style.color = matIconDataSet.color;
                        console.log("Home => size: ", materialIcons[0].getBoundingClientRect().width.toString() + "px");
                    }
                }, 100);
            });
        }
    }

    function showHomeNavigation() {
        mainContent.insertAdjacentHTML("beforeend", `
            <div id="search-bar-container">
                <input class="normal-poppins-style" style="width: calc(100% - 69px); display: inline-flex; height: auto; text-align: start; align-self: center; font-weight: 400; color: var(--textColor); background: none; outline: none; border: none;"  value="" placeholder="Search or paste url">
                <div class="search-bar-icon-holders" style="display: inline-flex; justify-content: center; align-self: center; align-items: center; border-radius: 50%; padding: 8px;">
                    <span class="material-symbols material-symbols-outlined" data-color="var(--textColor)" data-size="24" style="font-size: 24px; font-weight: 100; color: transparent;">search</span>
                </div>
                <div class="search-bar-icon-holders" style="display: inline-flex; justify-content: center; align-self: center; align-items: center; border-radius: 50%; padding: 8px; margin-left: 5px;">
                    <span class="material-symbols material-symbols-outlined" data-color="var(--textColor)" data-size="24" style="font-size: 24px; font-weight: 100; color: transparent; opacity: 0.5;">public</span>
                </div>
            </div>
            <div id="home-fragment-item-holder" style="position: absolute; display: none;">
                <div class="home-fragment-item"
                     style="height: auto; flex-direction: column; margin-top: 5px;">
                     <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <svg height="30px" id="Layer_1"
                             style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                             viewBox="0 0 461.001 461.001"
                             width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                                    c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                                    C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                                    c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                                      style="fill:#F61C0D;"/>
                            </g>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                YOUTUBE</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download & stream YouTube related videos, music, movies, thumbnails & subtitles in different
                                resolutions.
                            </p>
                        </div>
                    </div>
                     <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <svg height="30px" id="instagram"
                             style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                             viewBox="0 0 102 102" width="30px"
                             xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient cx="6.601" cy="99.766" gradientUnits="userSpaceOnUse" id="a" r="129.502">
                                    <stop offset=".09" stop-color="#fa8f21"></stop>
                                    <stop offset=".78" stop-color="#d82d7e"></stop>
                                </radialGradient>
                                <radialGradient cx="70.652" cy="96.49" gradientUnits="userSpaceOnUse" id="b" r="113.963">
                                    <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"></stop>
                                    <stop offset="1" stop-color="#8c3aaa"></stop>
                                </radialGradient>
                            </defs>
                            <path d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                                  fill="url(#a)"></path>
                            <path d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                                  fill="url(#b)"></path>
                            <path d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                                  fill="#fff"
                                  transform="translate(-422.637 -426.196)"></path>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                INSTAGRAM</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                You can download & stream Instagram related videos, music, thumbnails & reels into your mobile
                                device.
                            </p>
                        </div>
                    </div>
                    <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <svg clip-rule="evenodd" height="30px"
                             style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                             viewBox="0 0 48 48"
                             width="30px"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z"
                                  fill="#212121"
                                  fill-rule="evenodd"/>
                            <path clip-rule="evenodd"
                                  d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z"
                                  fill="#ec407a"
                                  fill-rule="evenodd"/>
                            <path clip-rule="evenodd"
                                  d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z"
                                  fill="#fff"
                                  fill-rule="evenodd"/>
                            <path clip-rule="evenodd"
                                  d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z"
                                  fill="#81d4fa"
                                  fill-rule="evenodd"/>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                TIKTOK</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download, stream & convert TikTok videos into music, thumbnails & subtitles into your mobile device.
                            </p>
                        </div>
                    </div>
                    <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <svg height="30px" viewBox="0 0 48 48" width="30px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" fill="#039be5"/>
                            <path d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                                  fill="#fff"/>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                FACEBOOK</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download & stream Facebook related videos, music, movies, thumbnails & shorts here.
                            </p>
                        </div>
                    </div>
                    <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" width="30px" height="30px" viewBox="0 0 256 256" xml:space="preserve" >
                            <defs>
                            </defs>
                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45.454 68.712 c -4.304 0 -8.347 -1.1 -11.865 -3.031 L 20 70 l 4.431 -13.068 c -2.235 -3.67 -3.522 -7.974 -3.522 -12.576 C 20.908 30.904 31.898 20 45.454 20 C 59.013 20 70 30.904 70 44.356 S 59.012 68.712 45.454 68.712 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,255,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                <path d="M 45.454 23.879 c -11.38 0 -20.637 9.186 -20.637 20.477 c 0 4.481 1.461 8.63 3.931 12.006 l -2.578 7.605 l 7.931 -2.521 c 3.258 2.139 7.162 3.387 11.354 3.387 c 11.378 0 20.637 -9.185 20.637 -20.476 C 66.092 33.066 56.834 23.879 45.454 23.879 z M 57.499 52.805 c -0.503 1.393 -2.96 2.738 -4.062 2.837 c -1.103 0.1 -1.103 0.897 -7.221 -1.492 c -6.117 -2.391 -9.977 -8.615 -10.278 -9.013 c -0.302 -0.398 -2.457 -3.236 -2.457 -6.174 c 0 -2.937 1.554 -4.382 2.105 -4.979 c 0.552 -0.597 1.204 -0.747 1.605 -0.747 s 0.803 0.05 1.153 0.05 c 0.352 0 0.852 -0.199 1.353 0.996 c 0.501 1.196 1.706 4.133 1.856 4.432 c 0.151 0.299 0.252 0.648 0.05 1.046 c -0.199 0.399 -0.299 0.647 -0.601 0.996 c -0.301 0.348 -0.632 0.778 -0.903 1.046 c -0.301 0.297 -0.614 0.62 -0.264 1.217 c 0.351 0.598 1.559 2.552 3.347 4.134 c 2.298 2.033 4.237 2.664 4.838 2.963 c 0.602 0.299 0.953 0.249 1.304 -0.151 c 0.352 -0.398 1.505 -1.742 1.906 -2.34 c 0.401 -0.597 0.803 -0.497 1.354 -0.298 c 0.55 0.198 3.509 1.643 4.111 1.942 c 0.601 0.298 1.002 0.448 1.153 0.697 C 57.999 50.214 57.999 51.409 57.499 52.805 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,255,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                            </g>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                WHATSAPP</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download, stream & check Whatsapp profile pictures, statuses like videos, images & audios.
                            </p>
                        </div>
                    </div>
                    <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg width="30px" height="30px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid">
                            <g>
                                <path d="M128,0 C57.307,0 0,57.307 0,128 L0,128 C0,198.693 57.307,256 128,256 L128,256 C198.693,256 256,198.693 256,128 L256,128 C256,57.307 198.693,0 128,0 L128,0 Z" fill="#40B3E0">
                                
                                </path>
                                <path d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308" fill="#FFFFFF">
                                
                                </path>
                                <path d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475" fill="#D2E5F1">
                                
                                </path>
                                <path d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,187.1414 100.4025,188.3794 98.6175,187.6034 L102.6135,152.2624" fill="#B5CFE4">
                                
                                </path>
                            </g>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                TELEGRAM</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download, stream & check Telegram profile pictures, statuses like videos, images & audios.
                            </p>
                        </div>
                    </div>
                    <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                </div>
                <div class="home-fragment-item" style="height: auto; flex-direction: column; padding-bottom: 10px;">
                    <div class="main-container"
                         style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px">
                            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/>
                        </svg>
                        <div class="main-container"
                             style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                            <p class="normal-poppins-style"
                               style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                TWITTER</p>
                            <p class="normal-poppins-style"
                               style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                Download & stream X ~ related videos, music & pictures from Twitter links and urls.
                            </p>
                        </div>
                    </div>
                    <!--<hr style="width: 100%; height: 1px; background: var(&#45;&#45;textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">-->
                </div>
            </div>
        `);
        // Add top margins to searchBar container...
        loadMaterialIcons();
        const homeFragItemContainer = document.querySelector("#home-fragment-item-holder");
        const homeFragItems = document.querySelectorAll(".home-fragment-item");

        function checkAppAvailabilityAccessibility(packageName, index) {
            if (packageName === null) return;
            if (packageName === undefined) return;
            if (packageName.toString().trim().length === 0) return;
            packageName = packageName.toString().trim();
            const isAppInstalled = AndroidInterface.isAppInstalledEnabled(packageName);
            if (isAppInstalled !== null && isAppInstalled !== undefined) {
                const appInstalledValue = isAppInstalled.toString().trim().toLowerCase();
                if (appInstalledValue.includes("Application is installed".toLowerCase())) {
                    // App is installed, let's check if it's enabled
                    if (isAppInstalled.includes("enabled")) {
                        // App is installed and enabled
                        //AndroidInterface.openPage("http://192.168.43.180:3000/html/social-media.html", 1);
                        AndroidInterface.showToastMessage("Application is installed and enabled", 1);
                        switch (index) {
                            case 4 : {
                                // Clear local storage
                                window.localStorage.removeItem("selectedPlatform");
                                const selectedPlatform = {
                                    appId: "com.whatsapp",
                                    appName: "Whatsapp chat"
                                };
                                window.localStorage.setItem("selectedPlatform", JSON.stringify(selectedPlatform));
                                // We clicked on Whatsapp...
                                AndroidInterface.openPage("http://192.168.43.180:3000/html/social-media.html", 1);
                                break;
                            }
                        }
                    } else {
                        // App is disabled. Let's redirect the user to enable it.
                        AndroidInterface.loadAds(null, 1);
                        AndroidInterface.showToastMessage("Application is installed but disabled", 1);
                        AndroidInterface.enableInstalledApplication(packageName);
                    }
                } else {
                    // App isn't installed...
                    AndroidInterface.showToastMessage("Application isn't installed on this device", 1);
                    // Let's show ads
                    AndroidInterface.loadAds(null, 1);
                }
            }
        }

        homeFragItems.forEach((homeFragItem, homeFragItemIndex) => {
            homeFragItem.onclick = (e) => {
                preventDefaultStopPropagation(e);
                switch (homeFragItemIndex) {
                    case 0 : {
                        /*const isInstalled = AndroidInterface.isAppInstalledEnabled("com.jetelex.play");
                        AndroidInterface.showToastMessage(isInstalled, 1);
                        console.log(isInstalled);
                        AndroidInterface.openPage("http://192.168.43.180:3000/html/ytdl.html", 1);*/
                        AndroidInterface.showToastMessage("This feature is still in development mode", 1);
                        //window.open("../html/ytdl.html", "_blank");
                        break;
                    }
                    case 1 : {
                        checkAppAvailabilityAccessibility("com.instagram.android", 1);
                        break;
                    }
                    case 2 : {
                        checkAppAvailabilityAccessibility("com.zhiliaoapp.musically", 2);
                        break;
                    }
                    case 3 : {
                        checkAppAvailabilityAccessibility("com.facebook.katana", 3);
                        break;
                    }
                    case 4 : {
                        // Lets checked if Whatsapp is installed on the device
                        checkAppAvailabilityAccessibility("com.whatsapp", 4);
                        break;
                    }
                    case 5 : {
                        checkAppAvailabilityAccessibility("org.telegram.messenger", 5);
                        break;
                    }
                    case 6 : {
                        checkAppAvailabilityAccessibility("com.twitter.android", 6);
                        break;
                    }

                }
            };
            homeFragItem.ontouchstart = (e) => {
                //onTouchAction(e, homeFragItem);
                addHoverEffect(e, homeFragItem);
            };
            homeFragItem.ontouchend = (e) => {
                //clearHoverBackground(e, homeFragItem, "none");
                clearHoverEffect(e, homeFragItem);
            }
            homeFragItem.ontouchmove = (e) => {
                //clearHoverBackground(e, homeFragItem, "none");
                clearHoverEffect(e, homeFragItem);
            };
            homeFragItem.ontouchcancel = (e) => {
                //clearHoverBackground(e, homeFragItem, "none");
                clearHoverEffect(e, homeFragItem);
            };
        });
        searchBarContainer = document.querySelector("#search-bar-container");
        const interval = setInterval(() => {
            if (Number(statusBarHeight) >= 0) {
                clearInterval(interval);
                //searchBarContainer.style.top = `${statusBarHeight}px`;
                searchBarContainer.style.display = "flex";
                homeFragItemContainer.style.top = searchBarContainer.getBoundingClientRect().height + searchBarContainer.getBoundingClientRect().top + "px";
                homeFragItemContainer.style.display = "flex";
                // Style homeFragmentItem...
                searchBarIconHolders = document.querySelectorAll(".search-bar-icon-holders");
                searchBarIconHolders.forEach((searchBarIconHolder, searchBarIconHolderIndex) => {
                    // For desktops or laptops
                    searchBarIconHolder.onmousedown = (e) => {
                        //onTouchAction(e, searchBarIconHolder);
                        //searchBarIconHolder.style.background = "var(--hover-background-color)";
                        addHoverEffect(e, searchBarIconHolder);
                    };
                    searchBarIconHolder.onmouseup = (e) => {
                        //clearHoverBackground(e, searchBarIconHolder, "none");
                        clearHoverEffect(e, searchBarIconHolder);
                    };
                    searchBarIconHolder.onmouseout = (e) => {
                        //clearHoverBackground(e, searchBarIconHolder, "none");
                        clearHoverEffect(e, searchBarIconHolder);
                    };

                    // For mobile devices
                    searchBarIconHolder.ontouchstart = (e) => {
                        //onTouchAction(e, searchBarIconHolder);
                        addHoverEffect(e, searchBarIconHolder);
                    };
                    searchBarIconHolder.ontouchend = (e) => {
                        //clearHoverBackground(e, searchBarIconHolder, "none");
                        clearHoverEffect(e, searchBarIconHolder);
                    }
                    searchBarIconHolder.ontouchmove = (e) => {
                        //clearHoverBackground(e, searchBarIconHolder, "none");
                        clearHoverEffect(e, searchBarIconHolder);
                    };
                    searchBarIconHolder.ontouchcancel = (e) => {
                        //clearHoverBackground(e, searchBarIconHolder, "none");
                        clearHoverEffect(e, searchBarIconHolder);
                    };
                });
            }
        }, 100);
    }

    document.fonts.ready.then(() => {
        loadMaterialIcons();
    });

    bottomContainerItems.forEach((bottomContainerItem, bottomContainerItemIndex) => {
        bottomContainerItem.onclick = (e) => {
            preventDefaultStopPropagation(e);
            if (selectedBottomNavIndex === bottomContainerItemIndex) {
                return;
            }
            // First deactivate the click action of bottom navigator
            bottomContainer.style.pointerEvents = "none";
            // Let's remove all mainContent item and set it according to click...
            mainContent.replaceChildren();
            switch (bottomContainerItemIndex) {
                case 0: {
                    showHomeNavigation();
                    break;
                }

            }
            selectedBottomNavIndex = bottomContainerItemIndex;
            /*AndroidInterface.showToastMessage("clicked " + selectedBottomNavIndex, 1);*/
            // Get all the spanned icon tags
            const spannedIconTags = document.querySelectorAll(".bottom-container-item > span");
            spannedIconTags.forEach((spannedIconTag, spannedIconTagIndex) => {
                // Remove the active class
                spannedIconTag.classList.remove("active-material-icon");
            });
            // Get all the paragraph tags
            const btmContainerItemLabels = document.querySelectorAll(".bottom-container-item > p");
            btmContainerItemLabels.forEach((btmContainerItemLabel, btmContainerItemLabelIndex) => {
                // Remove the active class
                btmContainerItemLabel.classList.remove("selected-item");
                // Change the material icon style
                if (spannedIconTags[btmContainerItemLabelIndex].classList.contains("material-symbols-filled")) {
                    spannedIconTags[btmContainerItemLabelIndex].classList.replace("material-symbols-filled", "material-symbols-outlined");
                }
            });
            // Set the selected icon
            if (!spannedIconTags[bottomContainerItemIndex].classList.contains("active-material-icon")) {
                spannedIconTags[bottomContainerItemIndex].classList.add("active-material-icon");
            }
            if (spannedIconTags[bottomContainerItemIndex].classList.contains("material-symbols-outlined")) {
                spannedIconTags[bottomContainerItemIndex].classList.replace("material-symbols-outlined", "material-symbols-filled");
            }
            // Set the selected label
            if (!btmContainerItemLabels[bottomContainerItemIndex].classList.contains("selected-item")) {
                btmContainerItemLabels[bottomContainerItemIndex].classList.add("selected-item");
            }
            // Re-activate the click action of bottom navigator
            bottomContainer.style.pointerEvents = "all";
        };

        bottomContainerItem.ontouchstart = (e) => {
            // onTouchAction(e, bottomContainerItem);
            addHoverEffect(e, bottomContainerItem);
        };
        bottomContainerItem.ontouchend = (e) => {
            //clearHoverBackground(e, bottomContainerItem, "none");
            clearHoverEffect(e, bottomContainerItem);
        }
        bottomContainerItem.ontouchmove = (e) => {
            //clearHoverBackground(e, bottomContainerItem, "none");
            clearHoverEffect(e, bottomContainerItem);
        };
        bottomContainerItem.ontouchcancel = (e) => {
            //clearHoverBackground(e, bottomContainerItem, "none");
            clearHoverEffect(e, bottomContainerItem);
        };
    });
});
