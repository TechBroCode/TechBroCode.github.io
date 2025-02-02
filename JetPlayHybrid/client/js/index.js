let hasInternetConnection = null;
const socket = io("http://localhost:3000");

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
