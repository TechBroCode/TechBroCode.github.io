const body = document.querySelector("body");
let isNightMode = false;
const allContentContainer = document.getElementById("all-content");
const DEF_STORAGE_LOCATION = "/storage/emulated/0/Download/JetPlay";
let topInsets = 0;
let rightInsets = 0;
let bottomInsets = 0;
let leftInsets = 0;
const topBlueBg = document.getElementById("top-blue-bg");
const contents = document.getElementById("contents");
const domThumb = document.getElementById("thumbnail");
const domTitle = document.getElementById("title");
const domRename = document.getElementById("rename");
const domPath = document.getElementById("path");
const domSpace = document.getElementById("space");
const downloadArrayQueueSet = new Set();

let hasLoadedPage = false;
let isLoadingPage = false;

window.onInsetsConfigured = (top, right, bottom, left) => {
    topInsets = top;
    rightInsets = right;
    bottomInsets = bottom;
    leftInsets = left;
    adjustContents();
}
window.onReceiveClipboardText = (text) => {

}

window.onWindowFocusChanged = (hasFocus, hasWindowFocus) => {

}

window.onPause = () => {

}

window.onResume = () => {

}

window.onBackPressed = () => {
    const allDownloadItems = document.querySelectorAll(".dwnl-item-selector");
    if (allDownloadItems && downloadArrayQueueSet.size > 0) {
        allDownloadItems.forEach((downloadItem) => {
            downloadItem.classList.remove("dwnl-item-active");
            const downloadItemCheck = downloadItem.querySelector(".dwnl-item-check-selector");
            if (downloadItemCheck) {
                downloadItemCheck.classList.remove("dwnl-item-check-active");
            }
        });
        downloadArrayQueueSet.clear();
        return;
    }
    getAndroidStorageFolderDetails();
    //showAndroidGoogleAds(true);
    stopAndroidActivityEntirely();
}

window.onHostNetChanged = (hasNetwork) => {

}
window.onGoogleAdLoaded = (available, type) => {

}
window.onConfigurationChanged = (isNight) => {
    if (typeof isNight === "boolean") {
        isNightMode = isNight;
    } else {
        isNightMode = isNight === "true";
    }

    if (isNightMode) {
        body.classList.remove("light-theme");
        if (!body.classList.contains("dark-theme")) {
            body.classList.add("dark-theme");
        }
    } else {
        body.classList.remove("dark-theme");
        if (!body.classList.contains("light-theme")) {
            body.classList.add("light-theme");
        }
    }
    AndroidInterface.changeStatusBar(false);
    AndroidInterface.changeNavBar(!isNightMode);
}

function adjustContents() {
    if (contents) {
        topBlueBg.style.height = `${topInsets}px`;
        contents.style.height = `calc(100vh - ${topBlueBg.getBoundingClientRect().height}px)`;
        const value = domRename.getBoundingClientRect().height + 7 + "px";
        domTitle.style.height = `calc(100% - ${value})`;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        getAndroidStorageFolderDetails();
        //showAndroidGoogleAds(true);
        setAndroidGoogleAdsEnabled(true);
        //AndroidInterface.showAppUpdateDialog("App Update", null, true, "https://www.youtube.com");
        let anyAvailContent = 0;
        if (isNullUndefinedOrEmpty(body.style.display) || body.style.display === "none") {
            body.style.display = "flex";
        }
        const appDetails = JSON.parse(returnInstantFolderStorageDetails());
        const storagePath = appDetails.storage_path;
        const storageSize = appDetails.storage_size;
        const availableSpace = appDetails.available_space;
        const usedSpace = appDetails.used_space;
        let exactStorageSize = appDetails.exact_storage_size.toString().trim();
        let exactAvailableSpace = appDetails.exact_available_space.toString().trim();
        const exactAvailableSpaceValue = Number(exactAvailableSpace);
        const deviceIsRootedOrEmulator = appDetails.device_is_rooted.toString().trim();
        //showAndroidToastMsg("rooted: " + deviceIsRootedOrEmulator, 1);
        const deviceApiLevel = appDetails.device_os_api_level.toString().trim();
        const versionCode = appDetails.app_build_number.toString().trim();
        const versionName = appDetails.app_version.toString().trim();
        const buildAbi = appDetails.build_abi.toString().trim();
        triggerApkFileUpdate(deviceApiLevel, versionCode, versionName, buildAbi, true);
        exactStorageSize = Number(exactStorageSize);
        exactAvailableSpace = Number(exactAvailableSpace);
        domPath.textContent = `Path: ${storagePath}`;
        domSpace.textContent = `${availableSpace} FREE/ ${storageSize}`;
        adjustContents();
        AndroidInterface.hasLoadedDownloaderPageCompletely(true);
        AndroidInterface.changeStatusBar(false);
        AndroidInterface.changeNavBar(!isNightMode);
        showAndroidLoadingSpinnerPage();
        if (!isAndroidInternetAvailable()) {
            throw new Error("No internet connection");
        }
        // Let's fetch video contents here
        // returns "#huc78s"
        const fullHash = window.location.hash;

        // if you just want "huc78s" (without the "#"), drop the first character:
        let originalVideoUrl = fullHash.startsWith('#') ? fullHash.slice(1) : fullHash;
        //alert(originalVideoUrl);
        let videoId = extractYouTubeVideoId(originalVideoUrl);
        if (videoId !== null && videoId !== undefined && videoId.toString().trim().length !== 0) {
            videoId = videoId.toString().trim();
            // let's pick a random key...
            const keyIndex = Math.floor(Math.random() * YT_KEYS.length);
            const key = YT_KEYS[keyIndex];
            const keyValue = key.value;
            const url = "https://yt-api.p.rapidapi.com/dl?id=" + videoId + "&cgeo=" + AndroidInterface.getUserDefaultCode();
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": keyValue,
                    "x-rapidapi-host": "yt-api.p.rapidapi.com"
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Let's declare the download array queue...
            downloadArrayQueueSet.clear();
            let highestAudioQualityUrl = "";
            let lowestAudioQualityUrl = "";
            let highestAudioQualityUrlContentLength = "0";
            let lowestAudioQualityUrlContentLength = "0";
            let data = await response.json(); // Assuming response is JSON
            const videoTitle = data.title; // Returns a string...
            domTitle.textContent = `${videoTitle}`;
            const thumbnails = data.thumbnail; // Returns an array...
            if (thumbnails !== null && thumbnails !== undefined) {
                const thumbnailsLength = thumbnails?.length;
                if (typeof thumbnailsLength === "number" && thumbnailsLength > 0) {
                    anyAvailContent += 1;
                    // The Highest thumbnail object is in the last index
                    const highestThumbObject = thumbnails[(thumbnailsLength - 1)];
                    // Highest thumbnail image...
                    const highestThumbObjectUrl = highestThumbObject.url;
                    // Let's loop to get all the thumbnail values...
                    domThumb.src = `${highestThumbObjectUrl}`;
                    // Add the grid title and grid container
                    contents.insertAdjacentHTML("beforeend", `
                        <div id="thumbnails-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                            <div id="thumbnail-label" class="normal-flex-div" style="flex-direction: row;">
                                <div class="label-title-bg" style="border-radius: 3px; border: none;">
                                    <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                        <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM300-300h366.15L553.08-450.77 448.46-318.46l-70-84.62L300-300Zm40-280q16.54 0 28.27-11.73T380-620q0-16.54-11.73-28.27T340-660q-16.54 0-28.27 11.73T300-620q0 16.54 11.73 28.27T340-580Z"/>
                                    </svg>
                                </div>
                                <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Thumbnails</p>
                            </div>
                            <div id="thumb-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                        </div>
                    `);
                    // Let's add the grid items...
                    const thumbGridContainer = document.getElementById("thumb-grid-container");
                    thumbnails.forEach((thumbnail, index) => {
                        const divId = `thumb-${index}`;
                        const thumbSize = `${thumbnail.width} X ${thumbnail.height}`;
                        thumbGridContainer.insertAdjacentHTML("beforeend", `
                            <div id=${divId} class="dwnl-item-selector normal-flex-div" style="margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${thumbnail.url} data-type="image" data-dimen=${thumbSize} data-length="0" data-name="">
                                <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                                <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                    <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px; font-style: italic;">${thumbSize}</p>
                                    <!--<p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${thumbnail.url}</p>-->
                                </div>
                            </div>
                        `);
                    });
                }
            }
            // Captions...

            const captions = data.captions;
            if (captions !== null && captions !== undefined) {
                // Captions is available...
                const captionTracks = captions.captionTracks;
                if (captionTracks !== null && captionTracks !== undefined) {
                    const captionsTrackLength = captionTracks?.length;
                    if (typeof captionsTrackLength === "number" && captionsTrackLength > 0) {
                        anyAvailContent += 1;
                        contents.insertAdjacentHTML("beforeend", `
                                <div style="margin-top: 10px; width: 100%; height: 0.5px; display: flex; align-self: center; background: var(--textColor); align-items: center; opacity: 0.3;  flex-shrink: 0;"></div>
                                <div id="captions-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                                    <div id="captions-label" class="normal-flex-div" style="flex-direction: row;">
                                        <div class="label-title-bg" style="border-radius: 3px; border: none;">
                                            <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                                <path d="M224.62-200q-27.62 0-46.12-18.5Q160-237 160-264.62v-430.76q0-27.62 18.5-46.12Q197-760 224.62-760h510.76q27.62 0 46.12 18.5Q800-723 800-695.38v430.76q0 27.62-18.5 46.12Q763-200 735.38-200H224.62Zm86.15-172.31H400q17.77 0 30.42-12.65 12.66-12.66 12.66-30.42v-15.39h-35.39V-420q0 4.62-3.84 8.46-3.85 3.85-8.47 3.85h-80q-4.61 0-8.46-3.85-3.84-3.84-3.84-8.46v-120q0-4.62 3.84-8.46 3.85-3.85 8.46-3.85h80q4.62 0 8.47 3.85 3.84 3.84 3.84 8.46v12.31h35.39v-16.93q0-17.76-12.66-30.42-12.65-12.65-30.42-12.65h-89.23q-17.77 0-30.42 12.65-12.66 12.66-12.66 30.42v129.24q0 17.76 12.66 30.42 12.65 12.65 30.42 12.65Zm249.23 0h89.23q17.77 0 30.42-12.65 12.66-12.66 12.66-30.42v-15.39h-35.39V-420q0 4.62-3.84 8.46-3.85 3.85-8.46 3.85h-80q-4.62 0-8.47-3.85-3.84-3.84-3.84-8.46v-120q0-4.62 3.84-8.46 3.85-3.85 8.47-3.85h80q4.61 0 8.46 3.85 3.84 3.84 3.84 8.46v12.31h35.39v-16.93q0-17.76-12.66-30.42-12.65-12.65-30.42-12.65H560q-17.77 0-30.42 12.65-12.66 12.66-12.66 30.42v129.24q0 17.76 12.66 30.42 12.65 12.65 30.42 12.65Z"/>
                                            </svg>
                                        </div>
                                        <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Captions</p>
                                    </div>
                                    <div id="captions-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                                </div>
                            `);
                        // Let's add the grid items...
                        const captionsGridContainer = document.getElementById("captions-grid-container");
                        captionTracks.forEach((caption, index) => {
                            const divId = `caption-${index}`;
                            captionsGridContainer.insertAdjacentHTML("beforeend", `
                                <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${caption.baseUrl} data-type="text" data-dimen="" data-length="0" data-name=${caption.name}>
                                    <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                                    <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                        <p style="display: flex; font-style: italic; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${caption.name}</p>
                                        <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${caption.languageCode}</p>
                                    </div>
                                </div>
                            `);
                        });
                    }
                }
            }
            // Audios & Videos...
            const adaptiveFormats = data.adaptiveFormats;
            if (adaptiveFormats !== null && adaptiveFormats !== undefined) {
                const adaptiveFormatsLength = adaptiveFormats?.length;
                if (typeof adaptiveFormatsLength === "number" && adaptiveFormatsLength > 0) {
                    // Adaptive formats are available...
                    anyAvailContent += 1;
                    // Let's create the audio first
                    contents.insertAdjacentHTML("beforeend", `
                        <div style="margin-top: 10px; width: 100%; height: 0.5px; display: flex; align-self: center; background: var(--textColor); align-items: center; opacity: 0.3; flex-shrink: 0;  flex-shrink: 0;"></div>
                        <div id="audios-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                            <div id="audios-label" class="normal-flex-div" style="flex-direction: row;">
                                <div class="label-title-bg" style="border-radius: 3px; border: none;">
                                    <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                        <path d="M402.31-167.69q-49.5 0-84.75-35.25t-35.25-84.75q0-49.5 35.25-84.75t84.75-35.25q23 0 43.65 8.19 20.66 8.19 36.35 24.58v-417.39h195.38v101.54H522.31v403.08q0 49.5-35.25 84.75t-84.75 35.25Z"/>
                                    </svg>
                                </div>
                                <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Audio</p>
                            </div>
                            <div id="audios-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                        </div>
                    `);
                    // Let's add the grid items...
                    const audiosGridContainer = document.getElementById("audios-grid-container");
                    adaptiveFormats.forEach((myAudio, index) => {
                        const mime = myAudio.mimeType.toString();
                        if (mime.includes("audio")) {
                            const [exactMime] = mime.split(";");
                            const mimeType = exactMime;
                            const [, ext] = exactMime.split("/");
                            const iTagValue = myAudio.itag.toString() + "K";
                            const audioUrl = String(myAudio.url ?? "");
                            const qualityArray = myAudio.audioQuality.toString().split("_");
                            const quality = qualityArray[(qualityArray.length - 1)];
                            const contentLength = myAudio.contentLength;
                            const qualityAndLength = `${capitalizeFirstOnly(quality)} (${formatFileSize(contentLength)})`;
                            if (highestAudioQualityUrl.length === 0 && (quality.toString().toLowerCase().includes("Medium") || quality.toString().toLowerCase().includes("medium"))) {
                                highestAudioQualityUrl = audioUrl;
                                highestAudioQualityUrlContentLength = contentLength;
                            }
                            if (lowestAudioQualityUrl.length === 0 && (quality.toString().toLowerCase().includes("Low") || quality.toString().toLowerCase().includes("low"))) {
                                lowestAudioQualityUrl = audioUrl;
                                lowestAudioQualityUrlContentLength = contentLength;
                            }
                            //const qualityAndLength = `(${formatFileSize(myAudio.contentLength)})`;
                            const divId = `myAudio-${index}`;
                            audiosGridContainer.insertAdjacentHTML("beforeend", `
                                <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${audioUrl} data-type="audio" data-dimen="" data-length=${contentLength} data-name="" data-mime="audio/mp3" data-ext="mp3">
                                    <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                                    <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                        <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                        <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                                    </div>
                                </div>
                            `);
                        }
                    });
                    if (highestAudioQualityUrl.length > 0) {
                        lowestAudioQualityUrl = "";
                        lowestAudioQualityUrlContentLength = 0;
                    } else {
                        highestAudioQualityUrl = lowestAudioQualityUrl;
                        highestAudioQualityUrlContentLength = lowestAudioQualityUrlContentLength;
                    }

                    // Let's create the video
                    contents.insertAdjacentHTML("beforeend", `
                        <div style="margin-top: 10px; width: 100%; height: 0.5px; display: flex; align-self: center; background: var(--textColor); align-items: center; opacity: 0.3;  flex-shrink: 0;"></div>
                        <div id="videos-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                            <div id="videos-label" class="normal-flex-div" style="flex-direction: row;">
                                <div class="label-title-bg" style="border-radius: 3px; border: none;">
                                    <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                        <path d="m184.62-760 60 120h120l-60-120h80l60 120h120l-60-120h80l60 120h120l-60-120h70.76q27.62 0 46.12 18.5Q840-723 840-695.38v430.76q0 27.62-18.5 46.12Q803-200 775.38-200H184.62q-27.62 0-46.12-18.5Q120-237 120-264.62v-430.76q0-27.62 18.5-46.12Q157-760 184.62-760Z"/>
                                    </svg>
                                </div>
                                <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Videos</p>
                            </div>
                            <div id="videos-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                        </div>
                    `);
                    // Let's add the grid items...
                    const videosGridContainer = document.getElementById("videos-grid-container");
                    const videoArray = [];
                    adaptiveFormats.forEach((myVideo, index) => {
                        const mime = myVideo.mimeType.toString();
                        if (mime.includes("video")) {
                            const [exactMime] = mime.split(";");
                            const mimeType = String(exactMime ?? "").trim().toLowerCase();
                            if (mimeType.includes("mp4")) {
                                const [, ext] = exactMime.split("/");
                                const iTagValue = myVideo.itag.toString() + "K - " + mimeType;
                                const videoUrl = String(myVideo.url ?? "");
                                const videoQuality = String(myVideo.qualityLabel ?? "").trim();
                                // We need to check if video quality wasn't on a map...
                                if (!(videoArray.includes(videoQuality))) {
                                    videoArray.push(videoQuality);
                                    let totalLengths = sumUpLengths(myVideo.contentLength, highestAudioQualityUrlContentLength);
                                    const qualityAndLength = `${videoQuality} (${formatFileSize(totalLengths)})`;
                                    //const qualityAndLength = `(${formatFileSize(myAudio.contentLength)})`;
                                    const divId = `myVideo-${index}`;
                                    videosGridContainer.insertAdjacentHTML("beforeend", `
                                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${videoUrl} data-type="video" data-dimen="" data-length=${totalLengths} data-name="" data-mime=${mimeType} data-ext=${ext}>
                                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                                            </div>
                                        </div>
                                    `);
                                }
                            }
                        }
                    });
                }
            }
            // Let's add the refresh container
            /*contents.insertAdjacentHTML("beforeend", `
                <div style="width: 100%; height: auto; background: none; padding-top: 7px; padding-bottom: 7px; margin-top: 10px; display: flex; flex-direction: row; align-self: center; align-items: center; flex-shrink: 0; justify-content: center; margin-bottom: 10px; border: 1px solid #00A3FF; border-radius: 2px;">
                    <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" style="fill: var(--textColor); width: 24px; height: 24px; display: flex;">
                        <path d="M483.08-200q-117.25 0-198.63-81.34-81.37-81.34-81.37-198.54 0-117.2 81.37-198.66Q365.83-760 483.08-760q71.3 0 133.54 33.88 62.23 33.89 100.3 94.58V-760h40v209.23H547.69v-40h148q-31.23-59.85-87.88-94.54Q551.15-720 483.08-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h42.46Q725.08-310.15 651-255.08 576.92-200 483.08-200Z"/>
                    </svg>
                    <p style="width: auto; height: auto; text-desc-align: center; color: var(--textColor); font-size: 14px; font-weight: 400; font-family: 'Poppins', system-ui; display: flex; align-self: center; margin-left: 8px;">Refresh</p>
                </div>
            `);*/
            if (anyAvailContent > 0) {
                // Let's add the download container
                contents.insertAdjacentHTML("beforeend", `
                    <div id="download-button" style="width: 100%; height: auto; background: #000cff; padding-top: 7px; padding-bottom: 7px; display: flex; flex-direction: row; align-self: center; align-items: center; flex-shrink: 0; justify-content: center; margin-bottom: 10px; margin-top: 10px; border: none; border-radius: 2px;">
                        <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" style="fill: white; width: 24px; height: 24px; display: flex;">
                            <path d="M480-342 356-466l20-20 90 90v-352h28v352l90-90 20 20-124 124ZM272-212q-26 0-43-17t-17-43v-90h28v90q0 12 10 22t22 10h416q12 0 22-10t10-22v-90h28v90q0 26-17 43t-43 17H272Z"/>
                        </svg>
                        <p style="width: auto; height: auto; text-align: center; color: white; font-size: 14px; font-weight: 400; font-family: 'Poppins', system-ui; display: flex; align-self: center; margin-left: 8px;">Download</p>
                    </div>
                `);
                contents.onclick = (e) => {
                    showCompatibleUpdate(ACTIVE_LEAST_SUPPORTED_DEVICE_API, ACTIVE_VERSION_CODE, ACTIVE_VERSION_NAME, ACTIVE_APP_UPDATE_OR_APK_URL, true, ACTIVE_APP_UPDATE_TITLE, ACTIVE_APP_UPDATE_MSG, true);
                    const downloadButton = e.target.closest("#download-button");
                    const downloadItemSelector = e.target.closest(".dwnl-item-selector");
                    if (downloadButton) {
                        preventDefaultStopPropagation(e);
                        showOnlyIntAds(true);
                        showAndroidGoogleAds(true);
                        if (!AndroidInterface.isInternetAvailable()) {
                            showAndroidToastMsg("No internet connection available", 1);
                            return;
                        }
                        if (downloadArrayQueueSet.size === 0) {
                            showAndroidToastMsg("No download item was selected", 1);
                            return;
                        }
                        // Now, let's first loop through the set
                        let allContentLengths = 0;
                        // Show Android loader page...
                        showAndroidLoadingSpinnerPage();
                        downloadArrayQueueSet.forEach((selectedId) => {
                            // Check if this existed in DOM...
                            const selectedElement = document.getElementById(selectedId.toString());
                            if (selectedElement) {
                                // Get dataset
                                const datasets = selectedElement.dataset;
                                let dataLength = datasets?.length;
                                if (dataLength) {
                                    let datasetType = datasets?.type;
                                    if (datasetType) {
                                        datasetType = datasetType.toString().trim();
                                        if (datasetType.includes("video")) {
                                            if (typeof dataLength !== "number") {
                                                dataLength = Number(dataLength);
                                            }
                                            dataLength *= 2;
                                        }
                                    }
                                    allContentLengths = sumUpLengths(allContentLengths, dataLength);
                                }
                            }
                        });
                        const preOccupiedSpace = (exactAvailableSpaceValue - allContentLengths);
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        if (preOccupiedSpace < 100) {
                            showAndroidToastMsg("Insufficient storage space available! Free some space and try again.", 1);
                            return;
                        }
                        // Show Android loader page...
                        showAndroidLoadingSpinnerPage();
                        let fileNameTextValue = domTitle.value;
                        fileNameTextValue = fileNameTextValue.toString().trim().replace(/[^a-zA-Z0-9()]+/g, "_");
                        // Let's assume that the user entered only symbols then it'll definitely become empty
                        if (fileNameTextValue.length <= 2) {
                            fileNameTextValue = Date.now();
                            fileNameTextValue = fileNameTextValue.toString().trim().replace(/[^a-zA-Z0-9()]+/g, "_");
                        }
                        downloadArrayQueueSet.forEach((selectedId) => {
                            // Check if this existed in DOM...
                            const selectedElement = document.getElementById(selectedId.toString());
                            if (selectedElement) {
                                // Get dataset
                                const myDataset = selectedElement.dataset;
                                const docType = myDataset.type.toString() || "";
                                if (docType.trim()) {
                                    switch (true) {
                                        case docType.includes("image") : {
                                            let downloadUrl = myDataset.url;
                                            if (downloadUrl) {
                                                let dimensionValue = myDataset.dimen?.toString() || "";
                                                const fileNameProper = `${fileNameTextValue}(${dimensionValue}).webp`;
                                                downloadUrl = downloadUrl.toString();
                                                const urlArr = JSON.stringify([downloadUrl]);
                                                const fileNameArr = JSON.stringify([fileNameProper]);
                                                const contentLengthArr = JSON.stringify([0]);
                                                AndroidInterface.triggerManualDownload(originalVideoUrl, `${downloadUrl} |${DEF_STORAGE_LOCATION}/${fileNameProper}`, urlArr, "image/webp", fileNameArr, null, null, contentLengthArr, null, null, false, null, "0");
                                            }
                                            break;
                                        }
                                        case docType.includes("text"): {
                                            let downloadUrl = myDataset.url;
                                            if (downloadUrl) {
                                                let captionName = myDataset.name?.toString() || "";
                                                const fileNameProper = `${fileNameTextValue}(${captionName}).srt`;
                                                downloadUrl = downloadUrl.toString();
                                                const urlArr = JSON.stringify([downloadUrl.includes("&fmt=srt") ? downloadUrl : `${downloadUrl}&fmt=srt`]);
                                                const fileNameArr = JSON.stringify([fileNameProper]);
                                                const contentLengthArr = JSON.stringify([0]);
                                                AndroidInterface.triggerManualDownload(originalVideoUrl, null, urlArr, "application/x-subrip", fileNameArr, null, null, contentLengthArr, null, null, false, null, "0");
                                            }
                                            break;
                                        }
                                        case docType.includes("audio"): {
                                            let downloadUrl = myDataset.url;
                                            if (downloadUrl) {
                                                const contentLength = myDataset.length?.toString() || "0";
                                                const exactMime = myDataset.mime?.toString() || "audio/webm";
                                                const ext = myDataset.ext?.toString().toLocaleLowerCase() || "webm";
                                                const fileNameProper = `${fileNameTextValue}.${ext}`;
                                                downloadUrl = downloadUrl.toString();
                                                const urlArr = JSON.stringify([downloadUrl]);
                                                const fileNameArr = JSON.stringify([fileNameProper]);
                                                const contentLengthArr = JSON.stringify([contentLength]);
                                                AndroidInterface.triggerManualDownload(originalVideoUrl, null, urlArr, exactMime, fileNameArr, null, null, contentLengthArr, null, null, false, null, contentLength);
                                            }
                                            break;
                                        }
                                        case docType.includes("video"): {
                                            let downloadUrl = myDataset.url;
                                            if (downloadUrl) {
                                                const videoContentLength = myDataset.length?.toString() || "0";
                                                const exactMime = myDataset.mime?.toString() || "video/webm";
                                                const ext = myDataset.ext?.toString().toLocaleLowerCase() || "webm";
                                                const videoFileNameProper = `${fileNameTextValue}(jpv).${ext}`;
                                                const audioFileNameProper = `.${fileNameTextValue}(jpa).${ext}`;
                                                const outPutFileNameProper = `${fileNameTextValue}`;
                                                downloadUrl = downloadUrl.toString();
                                                const urlArr = JSON.stringify([downloadUrl, highestAudioQualityUrl]);
                                                const fileNameArr = JSON.stringify([videoFileNameProper, audioFileNameProper]);
                                                const contentLengthArr = JSON.stringify([videoContentLength, highestAudioQualityUrlContentLength]);
                                                const ffmpegCmd = `${DEF_STORAGE_LOCATION}/${videoFileNameProper}|${DEF_STORAGE_LOCATION}/${audioFileNameProper}|${DEF_STORAGE_LOCATION}/${outPutFileNameProper}`;
                                                const originalFFMpegCmd = `-y -i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -c copy -map 0:v:0 -map 1:a:0 -shortest -reset_timestamps 1 -vsync vfr -fflags +genpts ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}.${ext}`;
                                                //const originalFFMpegCmdCompat = `-y -i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -filter_complex "[0:v]setpts=PTS-STARTPTS[v];[1:a]asetpts=PTS-STARTPTS[a]" -map "[v]" -map "[a]" -c:v libx264 -preset slower -crf 18 -c:a copy -shortest ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}`;
                                                //const originalFFMpegCmdCompat = `-i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -r 30 -vsync cfr -c:v libx264 -c:a aac -map 0:v:0 -map 1:a:0 -preset slower -crf 18 -c:a copy -shortest ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}`;
                                                let originalFfmpegCmdCompat = null;
                                                /*if (ext.includes("mp4")) {
                                                    originalFfmpegCmdCompat = `-fflags +genpts -y -i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest -movflags +faststart -avoid_negative_ts make_zero ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}.${ext}`;
                                                } else if (ext.includes("webm")) {
                                                    originalFfmpegCmdCompat = `-fflags +genpts -y -i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -c:v libvpx-vp9 -c:a libopus -map 0:v:0 -map 1:a:0 -shortest -movflags +faststart -avoid_negative_ts make_zero ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}.${ext}`;
                                                } else {
                                                    originalFfmpegCmdCompat = originalFFMpegCmd;
                                                }*/
                                                originalFfmpegCmdCompat = `-y -i ${DEF_STORAGE_LOCATION}/${videoFileNameProper} -i ${DEF_STORAGE_LOCATION}/${audioFileNameProper} -c:v libx264 -preset ultrafast -crf 18 -c:a aac -shortest -reset_timestamps 1 -vsync vfr -fflags +genpts ${DEF_STORAGE_LOCATION}/${outPutFileNameProper}.mp4`;
                                                const ffmpegCBackCmd = `${DEF_STORAGE_LOCATION}/${videoFileNameProper}|${DEF_STORAGE_LOCATION}/${audioFileNameProper}`;
                                                const ffmpegFailCmd = `${DEF_STORAGE_LOCATION}/${outPutFileNameProper}.${ext}`;
                                                AndroidInterface.triggerManualDownload(originalVideoUrl, null, urlArr, exactMime, fileNameArr, null, originalFFMpegCmd, contentLengthArr, ffmpegCBackCmd, ffmpegFailCmd, false, null, `${videoContentLength}|${highestAudioQualityUrlContentLength}`);
                                            }
                                            break;
                                        }

                                    }
                                }
                            }
                        });
                        // Dismiss Android loader page...
                        removeAndroidLoadingSpinnerInDownloaderPage();
                    } else if (downloadItemSelector) {
                        preventDefaultStopPropagation(e);
                        // Let's get the checkbox element
                        let selectedId = downloadItemSelector.id || null;
                        if (selectedId) {
                            selectedId = selectedId.toString().trim();
                            if (downloadArrayQueueSet.has(selectedId)) {
                                // It is available, remove from the set
                                downloadArrayQueueSet.delete(selectedId);
                            } else {
                                downloadArrayQueueSet.add(selectedId);
                            }
                            downloadItemSelector.classList.toggle("dwnl-item-active");
                            const checkBoxDiv = downloadItemSelector.querySelector(".dwnl-item-check-selector");
                            if (checkBoxDiv) {
                                checkBoxDiv.classList.toggle("dwnl-item-check-active");
                            }
                        }
                    }
                }
            } else {
                showAndroidToastMsg("No downloadable content found!", 1);
            }
            // Since we're allowing bottom ads here, please don't add bottom padding...
            // contents.style.marginBottom = `${bottomInsets}px`;
            // But we're not allowing it
            contents.style.marginBottom = `${bottomInsets}px`;

        } else {
            throw new Error("");
        }
        removeAndroidLoadingSpinnerInDownloaderPage();
    } catch (e) {
        removeAndroidLoadingSpinnerInDownloaderPage();
        //showAndroidToastMsg("" + e.message, 1);
        showAndroidToastMsg("Api session failed for https://admin.google.com/youtube?c=JetPlay&s=" + Date.now(), 1);
        //showAndroidGoogleAds(true);
        stopAndroidActivityEntirely();
    }
})