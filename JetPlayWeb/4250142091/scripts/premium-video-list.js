let premiumVideoAdsList = [
    [
        "red",
        0,
        "Open",
        "https://yt3.googleusercontent.com/Xj-6gqHKmTewewCwB6zMzywmZuQJgn0OMH5FEPt_NVTx-XehTx8l3NOsau5FZ4pO-HhcbdDd=s900-c-k-c0x00ffffff-no-rj",
        "Colgate",
        null,
        "video/mp4; codecs=\"avc1.64001E, mp4a.40.2\"",
        1722732266045,
        null,
        "video/mp4",
        "4.0⭐",
        "https://techbrocode.github.io/JetPlayWeb/storage/colgate.mp4"
    ]
];
validatePremiumVideoAdsList();

function validatePremiumVideoAdsList() {
    if (premiumVideoAdsList.length !== 0) {
        for (let i = 0; i < premiumVideoAdsList.length; i++) {
            if (Date.now() >= premiumVideoAdsList[i][7]) {
                premiumVideoAdsList.splice(i, 1);
            }
        }
        shuffleJSON();
    }
}