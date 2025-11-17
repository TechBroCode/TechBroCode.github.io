window.WEB_TAG = "";
window.isNullUndefinedOrEmpty = (value) => {
    if (value === undefined || value === null) return true;
    if (!(typeof value === "string")) value = String(value ?? "").trim();
    return value.length === 0;
}

window.__onWebTagReceived = (webTag) => {
    window.WEB_TAG = webTag;
}

// Fast and simple — returns any IPv4 (0.0.0.0 - 255.255.255.255)
window.fastIPv4Generator = () => {
    const n = Math.floor(Math.random() * 0x100000000); // 0 .. 2^32-1
    return (n >>> 24) + '.' + ((n >>> 16) & 255) + '.' + ((n >>> 8) & 255) + '.' + (n & 255);
}