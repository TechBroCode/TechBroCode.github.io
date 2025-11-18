const body = document.querySelector("body");
const generalContent = document.getElementById("general-content");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (isNullUndefinedOrEmpty(body.style.display) || body?.style?.display === "none") {
            body.style.display = "flex";
        }
        const webTagChecker = setInterval(async () => {
            alert("Dots => WEB_TAG: " + window.WEB_TAG);
            if (window.WEB_TAG !== undefined && window.WEB_TAG !== null && window.WEB_TAG.trim().length > 0) {
                clearInterval(webTagChecker);
                const ytPageFeed = await browseYTPageFeed({
                    hl: "en",
                    gl: "NG"
                });
                if (ytPageFeed.code >= 200
                    && ytPageFeed.code <= 399
                    && ytPageFeed.type === "json") {
                    generalContent.textContent = JSON.stringify(ytPageFeed.data, null, 4);
                }
            }
        }, 1000);
    } catch (e) {
        generalContent.textContent = e.toString();
    }
})