window.isAndroidSensitiveContentsAllowed = () => {
    try {
        return Boolean(window.jetelex42501QbSdkDroid.isSensitiveAllowed() ?? false);
    } catch (e) {
        console.error(e);
        return false;
    }
};