// Check if service worker is supported in the browser
if ("serviceWorker" in navigator) {
    //Check if service worker was registered before...
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        const swRegistered = registrations.some(reg => reg.active && reg.active.scriptURL.includes("sw.js"));
        if (swRegistered) {
            console.log("Specific Service Worker (sw.js) is registered.");
        } else {
            console.log("Service Worker (sw.js) is not registered.");
            // Register Service Worker
            navigator.serviceWorker.register("../sw.js").then((value) => {
                console.log("Service worker registered", value);
            }).catch((e) => console.error("Service worker not registered", e))
        }
    });
}
// To check if window control overlay is currently supported
if ("windowControlsOverlay" in navigator) {
    console.log("Window Controls Overlay is supported!");
} else {
    console.log("Fallback to default UI.");
}