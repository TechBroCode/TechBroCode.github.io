// Check if service worker is supported in the browser
if ("serviceWorker" in navigator) {
    // Register Service Worker
    navigator.serviceWorker.register("../sw.js").then((value) => {
        console.log("Service worker registered", value);
    }).catch((e) => console.error("Service worker not registered", e))
}
// To check if window control overlay is currently supported
if ("windowControlsOverlay" in navigator) {
    console.log("Window Controls Overlay is supported!");
} else {
    console.log("Fallback to default UI.");
}