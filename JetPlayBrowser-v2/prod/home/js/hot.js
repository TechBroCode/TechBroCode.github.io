const body = document.querySelector("body");
const generalContent = document.getElementById("general-content");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (isNullUndefinedOrEmpty(body.style.display) || body?.style?.display === "none") {
            body.style.display = "flex";
        }
        const resp = await nativeFetch({
            url: "https://raw.githubusercontent.com/jetelex/storage/refs/heads/master/JetPlay/all-tabs/home/v1/home.json",
            method: "GET",
        })
        // check status
        if (!resp.ok) {
            console.error('Bad status', resp.status, resp.statusText);
            return;
        }

        // parse JSON with await
        const data = await resp.json();
        // pretty-print JSON into the <pre> using textContent (safe against XSS)
        generalContent.textContent = JSON.stringify(data, null, 4); // 4-space indent
    } catch (e) {
        console.error(e);
        generalContent.textContent = e.toString();
    }
})