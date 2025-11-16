const body = document.querySelector("body");
const generalContent = document.getElementById("general-content");
//const out = document.getElementById("out");

document.addEventListener("DOMContentLoaded",  async () => {
    try {
        if (isNullUndefinedOrEmpty(body.style.display) || body?.style?.display === "none") {
            body.style.display = "flex";
        }
        let webTagChecker = setInterval(async () => {
            alert("WEB_TAG => " + WEB_TAG);
            if (WEB_TAG !== undefined && WEB_TAG !== null && WEB_TAG.trim().length > 0) {
                clearInterval(webTagChecker);
                const resp = await nativeFetch({
                    url: "https://raw.githubusercontent.com/jetelex/storage/refs/heads/master/JetPlay/all-tabs/home/v1/home.json",
                    method: "GET"
                });
                // check status
                if (!resp.ok) {
                    alert("hey not okay");
                    console.error('Bad status', resp.status, resp.statusText);
                    return;
                }

                // try to parse JSON safely. If JSON.parse fails, fallback to text()
                let data;
                try {
                    data = await resp.json();         // if body is JSON this yields an object/array
                } catch (e) {
                    // body isn't JSON — get as text
                    data = await resp.text();        // data will be a string
                }

                // If data is an object/array, stringify it nicely. If it's a string, print as-is.
                if (data !== null && typeof data === 'object') {
                    generalContent.textContent = JSON.stringify(data, null, 2); // pretty print object/array
                } else {
                    generalContent.textContent = String(data);                  // print raw string
                }
                alert("hey good");
            }
        }, 1000);
    } catch (e) {
        console.error(e);
        alert("hey error");
        generalContent.textContent = e.toString();
    }
})