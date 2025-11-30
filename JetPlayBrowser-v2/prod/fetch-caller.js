/* ===== nativeFetch emulates browser fetch using jetelex42501QbSdkDroid.fetchRequest(...) ===== */

// create a callbacks registry to pair requestId -> { resolve, reject }
window.__fetchNativeCallbacks = window.__fetchNativeCallbacks || {}; // registry object

// responder called by native code (FetchBridge) via evaluateJavascript
window.__fetchNativeResponse = function (resp) { // resp is an object sent from Java
    // if no resp or no requestId, bail
    if (!resp || !resp.requestId) return;
    // find the registered callbacks by id
    const cb = window.__fetchNativeCallbacks[resp.requestId];
    // if no callback found, log and return
    if (!cb) {
        console.warn("No callback for native fetch id", resp.requestId, resp);
        return;
    }
    // remove callback from registry to avoid leaks
    delete window.__fetchNativeCallbacks[resp.requestId];
    // if status < 0 -> treat as error
    if (!resp || typeof resp.status !== 'number' || resp.status < 0) {
        // reject with the whole resp object for debugging
        cb.reject(resp);
        return;
    }
    // otherwise resolve with a Response-like object
    try {
        // helper: convert headers JSONObject to a Map-like object
        const headersObj = resp.headers || {};
        const headers = {
            // get header by name (case-insensitive)
            get: function (name) {
                if (!name) return null;
                const key = Object.keys(headersObj).find(function (k) {
                    return k.toLowerCase() === name.toLowerCase();
                });
                return key ? headersObj[key] : null;
            },
            // list all header names
            keys: function () {
                return Object.keys(headersObj);
            },
            // iterate pairs
            entries: function () {
                return Object.entries(headersObj);
            }
        };

        // decode the base64 body into a binary string
        const bodyB64 = resp.bodyBase64 || "";
        const bodyBinary = atob(bodyB64 || ""); // binary string

        // create the Response-like object
        const responseLike = {
            // HTTP status number
            status: resp.status,
            // status text-desc like 'OK' from native
            statusText: resp.statusText || "",
            // boolean ok (status 200-299)
            ok: resp.status >= 200 && resp.status < 300,
            // headers helper
            headers: headers,
            // returnType passed from JS -> native (kept for compatibility)
            returnType: resp.returnType || "text",
            // text-desc() returns a Promise resolving to string decoded as UTF-8
            text: function () {
                return new Promise(function (resolve) {
                    try {
                        // convert binary string to JS string using TextDecoder for UTF-8 correctness
                        if (typeof TextDecoder !== 'undefined') {
                            // create a TextDecoder instance for UTF-8 (must be created before use)
                            const td = new TextDecoder('utf-8');
                            const bytes = new Uint8Array(bodyBinary.length);
                            for (let i = 0; i < bodyBinary.length; i++) bytes[i] = bodyBinary.charCodeAt(i);
                            resolve(td.decode(bytes));
                        } else {
                            // fallback: treat as Latin1-ish
                            resolve(bodyBinary);
                        }
                    } catch (e) {
                        resolve(bodyBinary);
                    }
                });
            },
            // json() returns a Promise that parses the text-desc as JSON
            json: function () {
                return this.text().then(function (t) {
                    return JSON.parse(t);
                });
            },
            // arrayBuffer() returns an ArrayBuffer of bytes
            arrayBuffer: function () {
                return new Promise(function (resolve) {
                    const len = bodyBinary.length;
                    const buf = new ArrayBuffer(len);
                    const view = new Uint8Array(buf);
                    for (let i = 0; i < len; i++) view[i] = bodyBinary.charCodeAt(i) & 0xff;
                    resolve(buf);
                });
            },
            // blob() returns a Blob constructed from the arrayBuffer (type not preserved)
            blob: function () {
                return this.arrayBuffer().then(function (buf) {
                    return new Blob([buf]);
                });
            }
        };

        // resolve the original Promise with the Response-like object
        cb.resolve(responseLike);
    } catch (err) {
        // on any error constructing response, reject
        cb.reject({requestId: resp.requestId, error: String(err)});
    }
};

// The main function you call from page code to perform a native fetch.
// options: { url, method, headers, body, requestId(optional), returnType(optional) }
window.nativeFetch = function (options) {
    // return a Promise like real fetch
    return new Promise(function (resolve, reject) {
        // sanitize input object
        options = options || {};
        const requestId = options?.requestId || makeUUID(); // generate id if not provided
        const url = options?.url; // request URL
        const method = (options?.method || "GET").toUpperCase(); // HTTP method (uppercased)
        const body = options?.body === undefined ? "" : options?.body; // request body or empty string
        const headers = options?.headers || {}; // headers object
        const returnType = options?.returnType || "text"; // optional returnType

        // small validation
        if (!url) {
            reject({error: "missing url"});
            return;
        }

        // register callbacks so native side can resolve/reject
        window.__fetchNativeCallbacks[requestId] = {resolve: resolve, reject: reject};

        // call the native bridge: jetelex42501QbSdkDroid.fetchRequest(requestId, url, method, body, headersJson, returnType)
        try {
            const headersJson = JSON.stringify(headers); // stringify headers
            if (window.jetelex42501QbSdkDroid && typeof window.jetelex42501QbSdkDroid.fetchRequest === 'function') {
                // call the native interface provided by WebView.addJavascriptInterface
                window.jetelex42501QbSdkDroid.fetchRequest(String(requestId), String(WEB_TAG), String(url), String(method), String(body), String(headersJson), String(returnType));
            } else {
                // no native bridge available -> reject and cleanup
                delete window.__fetchNativeCallbacks[requestId];
                reject({requestId: requestId, error: "native bridge not available"});
            }
        } catch (err) {
            // on error calling native, cleanup and reject
            delete window.__fetchNativeCallbacks[requestId];
            reject({requestId: requestId, error: String(err)});
        }
    });
};

// cancellation helper: calls Android to cancel a request by id (if you need to cancel)
window.nativeFetchCancel = function (requestId) {
    if (window.jetelex42501QbSdkDroid && typeof window.jetelex42501QbSdkDroid.cancelRequest === 'function') {
        try {
            window.jetelex42501QbSdkDroid.cancelRequest(requestId);
        } catch (e) { /* ignore */
        }
    }
};

window.__fetchNativeError = function (err) {
    // err = { requestId, errorType, errorMessage, errorStack, cause }
    /*console.error("NativeFetchError:", err.errorType, err.errorMessage);
    if (err.errorStack) {
        // print stack (maybe long)
        console.error("stack:", err.errorStack);
    }
    // show a small overlay for visibility (remove for production)
    try {
        var pre = document.getElementById('__native_error_box');
        if (!pre) {
            pre = document.createElement('pre');
            pre.id = '__native_error_box';
            pre.style.position = 'fixed';
            pre.style.bottom = '0';
            pre.style.left = '0';
            pre.style.right = '0';
            pre.style.maxHeight = '40%';
            pre.style.overflow = 'auto';
            pre.style.background = 'rgba(0,0,0,0.85)';
            pre.style.color = '#fff';
            pre.style.zIndex = "9999999";
            pre.style.fontSize = '12px';
            pre.style.padding = '8px';
            document.body.appendChild(pre);
        }
        pre.textContent = 'NativeFetchError: ' + err.errorType + '\\n' + err.errorMessage + '\\n' + (err.errorStack || '');
    } catch(e) { /!* ignore UI errors *!/ }*/
};