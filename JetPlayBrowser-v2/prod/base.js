var WEB_TAG = "";
window.isNullUndefinedOrEmpty = (value) => {
    if (value === undefined || value === null) return true;
    if (!(typeof value === "string")) value = String(value ?? "").trim();
    return value.length === 0;
}

window.__onWebTagReceived = (webTag) => {
    WEB_TAG = webTag;
    alert("WEB_TAG => " + WEB_TAG);
}