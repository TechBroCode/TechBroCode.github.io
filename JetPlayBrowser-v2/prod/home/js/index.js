const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
    if (isNullUndefinedOrEmpty(body.style.display) || body.style.display === "none") {
        body.style.display = "flex";
    }
})