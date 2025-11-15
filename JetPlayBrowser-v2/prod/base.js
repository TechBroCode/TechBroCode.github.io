window.isNullUndefinedOrEmpty = (value) => {
    if (value === undefined || value === null) return true;
    if (!(typeof value === "string")) value = String(value ?? "").trim();
    return value.length === 0;
}