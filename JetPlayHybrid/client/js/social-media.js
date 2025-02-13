let hasInternetConnection = null;
const socket = io();
let messagePort;

socket.on("connect", () => {
    console.log("Connected to server");
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
    } else {
        AndroidInterface.goBack();
    }
}

function preventDefaultStopPropagation(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    /*e.preventDefault();*/
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
    console.log("Text => ", AndroidInterface.getClipboardText());
}

async function getClipboardText() {
    try {
        let text = await navigator.clipboard.readText();
        console.log("Copied text:", text);
        return text;
    } catch (err) {
        console.error("Clipboard access denied:", err);
        return null;
    }
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

window.changeSocialMediaUri = (socialMediaUri) => {
    // Change the value of the Uri
    console.log("Reached changeSocialMediaUri");
    if (socialMediaUri !== null && socialMediaUri !== undefined && socialMediaUri.toString().trim().length > 0) {
        window.localStorage.setItem("social-media-uri", socialMediaUri.toString().trim());
    }
}

window.reloadWebPage = () => {
    window.location.replace(window.location.href);
}

/*window.addEventListener("message", (event) => {
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
});*/
// Example usage
document.addEventListener("DOMContentLoaded", () => {
    // Now, let's check the platform
    try {
        const selectedPlatform = JSON.parse(window.localStorage.getItem("selectedPlatform"));
        switch (true) {
            case selectedPlatform.appId === "com.whatsapp" : {
                // This is whatsapp...
                // Let's call the Android Interface for social media. Passing Whatsapp Application id as a param.
                // We'll also check if tree uri for Whatsapp is saved
                const socialMediaTreeUri = window.localStorage.getItem("social-media-uri");
                AndroidInterface.receiveSocialPlatformPath("content://com.android.externalstorage.documents/tree/primary:", "Android/media/com.whatsapp/WhatsApp/Media/.Statuses", "WhatsApp/Media/.Statuses", socialMediaTreeUri);
                break;
            }
        }
    } catch (error) {
        console.error(error);
        AndroidInterface.showToastMessage("Sorry, an error has occurred", 1);
    }
});