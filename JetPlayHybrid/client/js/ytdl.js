let hasInternetConnection = null;
//const socket = io("ws://192.168.43.180:3000", {transports: ["websocket"]});
const socket = io();
const body = document.body;
const html = document.documentElement;

const translucentBackgroundNoAnimation = document.querySelector(".translucent-background-escape-no-animation");
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

window.onBackPressed = () => {
    AndroidInterface.showToastMessage("On back pressed clicked", 1);
    const canNavigateBack = AndroidInterface.canWebNavigateBack();
    if (canNavigateBack === true) {
        // Load ads from Android app and go back
        AndroidInterface.loadAdGoBack(1);
    } else {
        AndroidInterface.goBack();
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

function preventDefaultStopPropagation(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    /*e.preventDefault();*/
}

function removeTranslucentBackgroundNoAnimation(rootParentElement) {
    translucentBackgroundNoAnimation.classList.remove("overlay-active");
    if (rootParentElement !== undefined && rootParentElement !== null) {
        rootParentElement.classList.remove("inactive");
        rootParentElement.style.overflow = "auto";
    }
    translucentBackgroundNoAnimation.replaceChildren();
}

// Super Fast Hex to String Decoder (Using slice instead of substr)
/*function hexToString(hex) {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    }
    return str;
}

window.addEventListener("message", (event) => {
    if (event.data === "Connect" && event.ports.length > 0) {
        messagePort = event.ports[0];

        messagePort.onmessage = function (msgEvent) {
            try {
                let [hexFunction, hexParams] = msgEvent.data.split("|");

                let functionName = hexToString(hexFunction);
                let params = hexParams === "00" ? [] : hexToString(hexParams).split(";;");

                console.log(`Executing: ${functionName} with params:`, params);

                if (typeof window[functionName] === "function") {
                    window[functionName](...params);
                }
            } catch (error) {
                console.error("Error processing message:", error);
            }
        };

        messagePort.postMessage("Ready");
    }
});*/


window.addEventListener("message", (event) => {
    if (event.data === "Connect" && event.ports.length > 0) {
        messagePort = event.ports[0];

        // Listen for function calls from Android
        messagePort.onmessage = function (msgEvent) {
            try {
                let data = msgEvent.data.split("|");
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
        };

        // ✅ Notify Android that WebMessagePort is ready
        messagePort.postMessage("Ready");
    }
});*/

document.addEventListener("DOMContentLoaded", () => {
    function createBottomNavigation() {
        removeTranslucentBackgroundNoAnimation(body);
        translucentBackgroundNoAnimation.insertAdjacentHTML("beforeend", `
            <div class="popup-menu-window" id="bottom-sheet-container" style="overflow-y: scroll; background: var(--card-background-color); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); bottom: 0; border-radius: 0; border-top-left-radius: 20px; border-top-right-radius: 20px; position: absolute; align-self: center; align-items: flex-start; width: 100%; height: auto; left: 50%; display: flex; flex-direction: column; transform: translate(-50%, 100vh); transition: transform 0.4s ease-in-out; flex-shrink: 0;">
                <div id="icon-container" style="display: flex; align-self: center; width: auto; height: auto; flex-shrink: 0; margin-top: 12px;">
                    <svg height="30px" id="Layer_1"
                             style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 60px; height: 60px;"
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
                </div>
                <p class="normal-poppins-style" style="width: 100%; display: flex; height: auto; text-align: center; align-self: center; font-weight: 500; font-size: 14pt; color: var(--textColor); margin: 12px; justify-content: center;">YOUTUBE HD DOWNLOADER</p>
                <input class="normal-poppins-style" id="videoLinkInput" placeholder="Input / Paste video link" type="text" style="width: calc(100% - 24px); height: auto; display: flex; border-radius: 8px; align-self: center; text-align: start; outline: none; margin-left: 12px; margin-right: 12px; justify-content: center; padding: 12px; font-weight: 400; color: var(--textColor); font-size: 16px; border: 1px solid var(--textColor); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); background: var(--windowBackground);">
                <div id="download-button" class="normal-poppins-style" style="width: calc(100% - 24px); height: auto; margin-top: 15px; font-weight: 400; color: white; justify-content: center; align-self: center; display: flex; flex-shrink: 0; background: #F61C0D; text-align: center; padding: 15px; border: none; border-radius: 25px; font-size: 16px; background-blend-mode: screen; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); pointer-events: none; opacity: 0.5;">Download</div>
            </div>
        `);

        translucentBackgroundNoAnimation.classList.add("overlay-active");
        setTimeout(async () => {
            const bottomSheet = document.querySelector("#bottom-sheet-container");
            const downloadButton = document.querySelector("#download-button");
            bottomSheet.style.transform = "translate(-50%, 0)";

            const videoLinkInput = document.querySelector("#videoLinkInput");
            videoLinkInput.focus();
            videoLinkInput.oninput = async e => {
                preventDefaultStopPropagation(e);
                const videoInputText = videoLinkInput.value;
                if (videoInputText.toString().trim().length > 0) {
                    videoLinkInput.style.border = "1px solid #F61C0D";
                    downloadButton.style.opacity = "1.0";
                    downloadButton.style.pointerEvents = "all";
                } else {
                    videoLinkInput.style.border = "1px solid var(--textColor)";
                    downloadButton.style.opacity = "0.5";
                    downloadButton.style.pointerEvents = "none";
                }
            }
            downloadButton.onclick = async e => {
                preventDefaultStopPropagation(e);
                videoLinkInput.style.border = "1px solid var(--textColor)";

                /*TODO: Validate YouTube url...*/

                // Regular expressions for different YouTube video formats

                function isValidUrl(url) {
                    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator
                    return urlPattern.test(url);
                }

                // Check if the input matches any of the patterns
                if (isValidUrl(videoLinkInput.value.toString().trim()) === false) {
                    AndroidInterface.showToastMessage("Can't find Instagram link", 1);
                    return;
                }

                if (hasInternetConnection !== true) {
                    AndroidInterface.showToastMessage("Internet connection error.\nIf error persists while internet is connected, restart your app and try again", 1);
                    return;
                }

                if (socket === null || socket === undefined) {
                    AndroidInterface.showToastMessage("Internal error detected...\nTry again", 1);
                    return;
                }
                /*TODO: Calculate the height of div removing paddings*/
                const downloadButtonHeightExcludePaddings = downloadButton.getBoundingClientRect().height - 30; // 15 * 2 (top & bottom)

                downloadButton.style.opacity = "0.5";
                downloadButton.style.pointerEvents = "none";
                downloadButton.replaceChildren();
                downloadButton.insertAdjacentHTML("beforeend", `
                <div id="progress-waiter" style="animation: circle-loader 1s linear infinite; width: ${downloadButtonHeightExcludePaddings}px; height: ${downloadButtonHeightExcludePaddings}px; background: none; border: 1px solid white; align-self: center; justify-content: center; display: flex; vertical-align: middle; vert-align: middle; border-radius: 50%; border-top-color: transparent;"></div>
            `);
                socket.emit("fetch-insta-video", {
                    urlValue: videoLinkInput.value.toString().trim()
                });
            }
        }, 400);
    }

    createBottomNavigation();
});
