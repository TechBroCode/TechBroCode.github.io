const body = document.querySelector("body");
let isNightMode = false;
const topRedBg = document.getElementById("top-red-bg");
const mainSearchBarContainer = document.getElementById("main-search-bar-container");
const mainSearchBarInput = document.getElementById("global-search-input");
const contents = document.getElementById("contents");
const DEF_STORAGE_LOCATION = "/storage/emulated/0/Download/JetPlay";
let topInsets = 0;
let rightInsets = 0;
let bottomInsets = 0;
let leftInsets = 0;
const domThumb = document.getElementById("thumbnail");
const domTitle = document.getElementById("title");
const domRename = document.getElementById("rename");
const domPath = document.getElementById("path");
const domSpace = document.getElementById("space");
const hrDiv = document.getElementById("hrDiv");
const downloadArrayQueueSet = new Set();
let hasDefThumbnail = false;
let originalUrl = "";
const showGoogleAdsDiv = document.getElementById("show-googleAds");
const googleAdsImg = showGoogleAdsDiv?.querySelector("img");


function adjustContents() {
    if (contents) {
        const totalRedBgPadding = topInsets + 10;
        topRedBg.style.paddingTop = `${totalRedBgPadding}px`;
        contents.style.height = `calc(100vh - ${topRedBg.getBoundingClientRect().height}px)`;
        contents.style.marginTop = `${topRedBg.getBoundingClientRect().height}px`;
        const value = domRename.getBoundingClientRect().height + 7 + "px";
        domTitle.style.height = `calc(100% - ${value})`;
    }
}

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
    if (showGoogleAdsDiv.style.visibility === "hidden") {
        // Let's check for the img size...
        const imgWidth = googleAdsImg.naturalWidth;
        if (imgWidth > 0) {
            showGoogleAdsDiv.style.visibility = "visible";
        }
    }
    if (!hasDefThumbnail) {
        return;
    }
    if (domThumb.style.visibility === "visible") return;
    hasNetwork = Boolean(hasNetwork ?? false);
    if (hasNetwork) {
        const domThumbWidth = domThumb.naturalWidth;
        const domThumbHeight = domThumb.naturalHeight;
        if (domThumbWidth > 0 && domThumbHeight > 0) {
            domThumb.style.visibility = "visible";
            hrDiv.style.display = "flex";
            // Add the grid title and grid container
            const pathSpaceRem = document.getElementById("path-space-rem-container");
            if (pathSpaceRem) {
                pathSpaceRem.insertAdjacentHTML("afterend", `
                    <div id="thumbnails-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                        <div id="thumbnail-label" class="normal-flex-div" style="flex-direction: row;">
                            <div class="label-title-bg" style="border-radius: 3px; border: none;">
                                <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                    <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM300-300h366.15L553.08-450.77 448.46-318.46l-70-84.62L300-300Zm40-280q16.54 0 28.27-11.73T380-620q0-16.54-11.73-28.27T340-660q-16.54 0-28.27 11.73T300-620q0 16.54 11.73 28.27T340-580Z"/>
                                </svg>
                            </div>
                            <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Thumbnail</p>
                        </div>
                        <div id="thumb-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                    </div>
                `);
                // Let's add the grid items...
                const thumbGridContainer = document.getElementById("thumb-grid-container");
                const divId = `thumb-0`;
                // We'll need to wait for full-drawn size...
                const thumbSize = `${domThumbWidth} X ${domThumbHeight}p`;
                thumbGridContainer.insertAdjacentHTML("beforeend", `
                    <div id=${divId} class="dwnl-item-selector normal-flex-div" style="margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${String(domThumb.src ?? "")} data-type="image" data-dimen=${thumbSize} data-length="0" data-name="thumb" data-ext="webp" data-mime="image/webp">
                        <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                        <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                            <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px; font-style: italic;">${thumbSize}</p>
                            <!--<p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${String(domThumb.src ?? "")}</p>-->
                        </div>
                    </div>
                `);
            }
        }
    }
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


document.addEventListener("DOMContentLoaded", async () => {

    function createVideoContent(mediaArray) {
        // Let's check if we have any audio grid container somewhere
        let videoGridContainer = document.getElementById("videos-grid-container");
        if (videoGridContainer) {
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").trim();
                if (mediaType.toLowerCase().includes("video")) {
                    const videoUrl = String(myMedia.url ?? "");
                    const ext = String(myMedia.extension ?? "mp4");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let totalLengths = myMedia.data_size || 0;
                    const mimeType = `${mediaType}/${ext}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(totalLengths === 0 ? "nil" : String(totalLengths ?? "0"))})`;
                    const divId = `myVideo-${index}`;
                    videoGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${videoUrl} data-type="video" data-dimen="" data-length=${totalLengths} data-name="" data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        } else {
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
            videoGridContainer = document.getElementById("videos-grid-container");
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").trim();
                if (mediaType.toLowerCase().includes("video")) {
                    const videoUrl = String(myMedia.url ?? "");
                    const ext = String(myMedia.extension ?? "mp4");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let totalLengths = myMedia.data_size || 0;
                    const mimeType = `${mediaType}/${ext}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(totalLengths === 0 ? "nil" : String(totalLengths ?? "0"))})`;
                    const divId = `myVideo-${index}`;
                    videoGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${videoUrl} data-type="video" data-dimen="" data-length=${totalLengths} data-name="" data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        }
    }

    function createAudioContent(mediaArray) {
        // Let's check if we have any audio grid container somewhere
        let audioGridContainer = document.getElementById("audios-grid-container");
        if (audioGridContainer) {
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").trim();
                if (mediaType.toLowerCase().includes("audio")) {
                    const audioUrl = String(myMedia.url ?? "");
                    const ext = String(myMedia.extension ?? "mp3");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let contentLength = myMedia.data_size || 0;
                    const mimeType = `${mediaType}/${ext}`;
                    const divId = `myAudio-${index}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(contentLength === 0 ? "nil" : String(contentLength ?? "0"))})`;
                    audioGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${audioUrl} data-type="audio" data-dimen="" data-length=${contentLength} data-name="" data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        } else {
            // Let's create the audio first
            contents.insertAdjacentHTML("beforeend", `
                <div style="margin-top: 10px; width: 100%; height: 0.5px; display: flex; align-self: center; background: var(--textColor); align-items: center; opacity: 0.3; flex-shrink: 0;"></div>
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
            audioGridContainer = document.getElementById("audios-grid-container");
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").trim();
                if (mediaType.toLowerCase().includes("audio")) {
                    const audioUrl = String(myMedia.url ?? "");
                    const ext = String(myMedia.extension ?? "mp3");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let contentLength = myMedia.data_size || 0;
                    const mimeType = `${mediaType}/${ext}`;
                    const divId = `myAudio-${index}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(contentLength === 0 ? "nil" : String(contentLength ?? "0"))})`;
                    audioGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${audioUrl} data-type="audio" data-dimen="" data-length=${contentLength} data-name="" data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        }
    }

    function createImagesContent(mediaArray) {
        // Let's check if we have any image grid container somewhere
        let imagesGridContainer = document.getElementById("images-grid-container");
        if (imagesGridContainer) {
            // It exists... insert all of them
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").toLowerCase().trim();
                if (mediaType.includes("image")) {
                    const imageUrl = String(myMedia.url ?? "").trim();
                    const ext = String(myMedia.extension ?? "webp");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let contentLength = myMedia.data_size ?? 0;
                    if (isNaN(Number(contentLength))) {
                        contentLength = 0;
                    }
                    const mimeType = `${mediaType}/${ext.toLowerCase().trim() === "jpg" ? "jpeg" : ext}`;
                    const divId = `myImage-${index}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(contentLength === 0 ? "nil" : String(contentLength ?? "0"))})`;
                    imagesGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${imageUrl} data-type="image" data-dimen="" data-length=${contentLength} data-name=${index} data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        } else {
            contents.insertAdjacentHTML("beforeend", `
                <div style="margin-top: 10px; width: 100%; height: 0.5px; display: flex; align-self: center; background: var(--textColor); align-items: center; opacity: 0.3; flex-shrink: 0;"></div>
                <div id="images-container" class="normal-flex-div" style="justify-content: flex-start; margin-top: 10px;">
                    <div id="images-label" class="normal-flex-div" style="flex-direction: row;">
                        <div class="label-title-bg" style="border-radius: 3px; border: none;">
                            <svg class="label-title-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM300-300h366.15L553.08-450.77 448.46-318.46l-70-84.62L300-300Zm40-280q16.54 0 28.27-11.73T380-620q0-16.54-11.73-28.27T340-660q-16.54 0-28.27 11.73T300-620q0 16.54 11.73 28.27T340-580Z"/>
                            </svg>
                        </div>
                        <p class="normal-poppins-style" style="font-weight: 600; font-size: 14px; margin-left: 10px;">Images</p>
                    </div>
                    <div id="images-grid-container" style="display: grid; width: 100%; height: auto; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 4px; padding: 0;"></div>
                </div>
            `);
            // Let's add the grid items...
            imagesGridContainer = document.getElementById("images-grid-container");
            mediaArray.forEach((myMedia, index) => {
                const mediaType = String(myMedia.type ?? "").toLowerCase().trim();
                if (mediaType.includes("image")) {
                    const imageUrl = String(myMedia.url ?? "").trim();
                    const ext = String(myMedia.extension ?? "webp");
                    const mediaQuality = String(myMedia.quality ?? "");
                    let contentLength = myMedia.data_size ?? 0;
                    if (isNaN(Number(contentLength))) {
                        contentLength = 0;
                    }
                    const mimeType = `${mediaType}/${ext.toLowerCase().trim() === "jpg" ? "jpeg" : ext}`;
                    const divId = `myImage-${index}`;
                    const iTagValue = mimeType;
                    const qualityAndLength = `${mediaQuality.includes("_") ? capitalizeFirstOnly(mediaQuality) : mediaQuality} (${formatFileSize(contentLength === 0 ? "nil" : String(contentLength ?? "0"))})`;
                    imagesGridContainer.insertAdjacentHTML("beforeend", `
                        <div id=${divId} class="dwnl-item-selector normal-flex-div" style=" margin-top: 10px; height: auto; padding: 10px; justify-content: flex-start; flex-direction: row;" data-url=${imageUrl} data-type="image" data-dimen="" data-length=${contentLength} data-name=${index} data-mime=${mimeType} data-ext=${ext}>
                            <div class="dwnl-item-check-selector" style="display: flex; align-self: center; width: 15px; height: 15px; border: 1px solid var(--colorPrimaryDark); border-radius: 50%;"></div>
                            <div class="normal-flex-div" style="height: auto; width: calc(100% - 20px); justify-content: flex-start; flex-direction: column; margin-left: 5px;">
                                <p style="display: flex; align-self: center; align-items: center; justify-content: flex-start; width: 100%; font-size: 12px; font-weight: 600; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;  font-style: italic;">${iTagValue}</p>
                                <p style="width: 100%; font-size: 12px; font-weight: 400; opacity: 0.5; word-break: break-all; overflow-wrap: break-word; font-family: 'Poppins', sans-serif; letter-spacing: -0.25px;">${qualityAndLength}</p>
                            </div>
                        </div>
                    `);
                }
            });
        }
    }

    try {
        getAndroidStorageFolderDetails();
        setAndroidGoogleAdsEnabled(true);
        //showAndroidGoogleAds(true);
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
        let exactStorageSize = String(appDetails.exact_storage_size ?? "").trim();
        let exactAvailableSpace = String(appDetails.exact_available_space ?? "").trim();
        const exactAvailableSpaceValue = Number(exactAvailableSpace);
        const deviceIsRootedOrEmulator = String(appDetails.device_is_rooted ?? "").trim();
        //showAndroidToastMsg("rooted: " + deviceIsRootedOrEmulator, 1);
        const deviceApiLevel = String(appDetails.device_os_api_level ?? "").trim();
        const versionCode = String(appDetails.app_build_number ?? "").trim();
        const versionName = String(appDetails.app_version ?? "").trim();
        const buildAbi = String(appDetails.build_abi ?? "").trim();
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
        let originalMediaUrl = fullHash.startsWith('#') ? fullHash.slice(1) : fullHash;
        //alert(originalMediaUrl);
        originalMediaUrl = String(originalMediaUrl ?? "").trim();
        if (originalMediaUrl.length === 0) throw new Error("");
        // let's pick a random key...
        const keyIndex = Math.floor(Math.random() * AUTO_DOWNLOAD_ALL_KEYS.length);
        const key = AUTO_DOWNLOAD_ALL_KEYS[keyIndex];
        const keyValue = key.value;
        const urlEndpoint = "https://auto-download-all-in-one-big.p.rapidapi.com/v1/social/autolink";
        const host = "auto-download-all-in-one-big.p.rapidapi.com";
        const options = {
            method: "POST",
            headers: {
                "x-rapidapi-key": keyValue,
                "x-rapidapi-host": host,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: originalMediaUrl
            }),
        };
        const response = await fetch(urlEndpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Let's declare the download array queue...
        downloadArrayQueueSet.clear();
        let data = await response.json(); // Assuming response is JSON
        originalUrl = String(data.url ?? originalMediaUrl).trim();
        mainSearchBarInput.value = originalUrl;
        mainSearchBarInput.onkeydown = (event) => {
            // 3. Check if the key is "Enter"
            //    - event.keyCode === 13 is the old way
            //    - event.key === "Enter" is the newer, more readable way
            if (event.key === 'Enter' || event.keyCode === 13) {
                // 4. Prevent the default action if you don’t want a form to submit
                event.preventDefault();
                event.stopPropagation();

                // 5. Perform whatever action you like
                performAndroidSearch(mainSearchBarInput);
                hideAndroidKeyboard();
            }
        }
        mainSearchBarContainer.onclick = (e) => {
            preventDefaultStopPropagation(e);
            const showGoogleAdsDiv = e.target.closest("#show-googleAds");
            const webSearch = e.target.closest("#search-web");
            if (showGoogleAdsDiv) {
                showOnlyIntAds(true);
                showAndroidGoogleAds(true);
            } else if (webSearch) {
                if (!webSearch.classList.contains("disabled")) {
                    webSearch.classList.add("disabled");
                }
                // Let's get the value of the input
                const newValue = String(mainSearchBarInput.value ?? "").trim();
                if (newValue.length === 0) {
                    webSearch.classList.remove("disabled");
                    showAndroidToastMsg("Input a url", 1);
                    //showAndroidGoogleAds(true);
                    return;
                }
                // Let's do comparison to avoid unnecessary api calls.
                if (newValue === originalUrl || newValue === originalMediaUrl) {
                    webSearch.classList.remove("disabled");
                    showAndroidToastMsg("Content already loaded", 1);
                    //showAndroidGoogleAds(true);
                    return;
                }
                performAndroidSearch(mainSearchBarInput);
            }
            webSearch.classList.remove("disabled");
        }

        mainSearchBarContainer.ontouchstart = (e) => {
            preventDefaultStopPropagation(e);
            const searchIconHolder = e.target.closest(".search-bar-icon-holders");
            if (searchIconHolder) {
                if (!searchIconHolder.classList.contains("hover")) {
                    searchIconHolder.classList.add("hover");
                }
            }
        };
        mainSearchBarContainer.ontouchend = (e) => {
            preventDefaultStopPropagation(e);
            const searchIconHolder = e.target.closest(".search-bar-icon-holders");
            if (searchIconHolder) {
                if (searchIconHolder.classList.contains("hover")) {
                    searchIconHolder.classList.remove("hover");
                }
            }
        };
        mainSearchBarContainer.ontouchcancel = (e) => {
            preventDefaultStopPropagation(e);
            const searchIconHolder = e.target.closest(".search-bar-icon-holders");
            if (searchIconHolder) {
                if (searchIconHolder.classList.contains("hover")) {
                    searchIconHolder.classList.remove("hover");
                }
            }
        };
        let fileTitle = String(data.title ?? "").trim();
        //if (fileTitle.length <= 2 || fileTitle.toLowerCase().includes("reel"))
        fileTitle = `${crypto.randomUUID()}-${Date.now()}`;
        domTitle.textContent = fileTitle;
        let thumbnail = String(data.thumbnail ?? "").trim();
        if (thumbnail.length > 0) {
            anyAvailContent += 1;
            hasDefThumbnail = true;
            domThumb.src = thumbnail;
        }
        // Audios & Videos...
        const medias = data.medias;
        if (medias !== null && medias !== undefined) {
            const mediasLength = medias?.length;
            if (typeof mediasLength === "number" && mediasLength > 0) {
                anyAvailContent += 1;
                let hasImage = false;
                let hasAudio = false;
                let hasVideo = false;
                // Let's check if there's an image...
                for (let c = 0; c < mediasLength; c++) {
                    const mediaItem = medias[c];
                    if (mediaItem === null || mediaItem === undefined) {
                        continue;
                    }
                    const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                    if (mediaType.includes("image")) {
                        hasImage = true;
                        break;
                    }
                }
                // Let's check if there's audio...
                for (let c = 0; c < mediasLength; c++) {
                    const mediaItem = medias[c];
                    if (mediaItem === null || mediaItem === undefined) {
                        continue;
                    }
                    const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                    if (mediaType.includes("audio")) {
                        hasAudio = true;
                        break;
                    }
                }

                // Let's check if there's a video...
                for (let c = 0; c < mediasLength; c++) {
                    const mediaItem = medias[c];
                    if (mediaItem === null || mediaItem === undefined) {
                        continue;
                    }
                    const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                    if (mediaType.includes("video")) {
                        hasVideo = true;
                        break;
                    }
                }
                if (hasImage) {
                    createImagesContent(medias);
                }
                if (hasAudio) {
                    createAudioContent(medias);
                }

                if (hasVideo) {
                    createVideoContent(medias);
                }
            }
        }
        // Let's try to check the data.data
        const nestedData = data.data;
        if (nestedData !== null && nestedData !== undefined) {
            // Let's update  thumbnail if possible
            if (thumbnail.length === 0) {
                // No thumbnail was loaded...
                thumbnail = String(nestedData.thumbnail ?? "").trim();
                if (thumbnail.length > 0) {
                    anyAvailContent += 1;
                    hasDefThumbnail = true;
                    domThumb.src = thumbnail;
                }
            }
            // new sets of audios and videos...
            const nestedMedias = nestedData.medias;
            if (nestedMedias !== null && nestedMedias !== undefined) {
                const nestedMediasLength = Number(nestedMedias.length ?? 0);
                if (nestedMediasLength > 0) {
                    anyAvailContent += 1;
                    let hasImage = false;
                    let hasAudio = false;
                    let hasVideo = false;
                    // Let's check if there's an image...
                    for (let c = 0; c < nestedMediasLength; c++) {
                        const mediaItem = nestedMedias[c];
                        if (mediaItem === null || mediaItem === undefined) {
                            continue;
                        }
                        const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                        if (mediaType.includes("image")) {
                            hasImage = true;
                            break;
                        }
                    }
                    // Let's check if there's audio...
                    for (let c = 0; c < nestedMediasLength; c++) {
                        const mediaItem = nestedMedias[c];
                        if (mediaItem === null || mediaItem === undefined) {
                            continue;
                        }
                        const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                        if (mediaType.includes("audio")) {
                            hasAudio = true;
                            break;
                        }
                    }

                    // Let's check if there's a video...
                    for (let c = 0; c < nestedMediasLength; c++) {
                        const mediaItem = nestedMedias[c];
                        if (mediaItem === null || mediaItem === undefined) {
                            continue;
                        }
                        const mediaType = String(mediaItem.type ?? "").toLowerCase().trim();
                        if (mediaType.includes("video")) {
                            hasVideo = true;
                            break;
                        }
                    }
                    if (hasImage) {
                        createImagesContent(nestedMedias);
                    }
                    if (hasAudio) {
                        createAudioContent(nestedMedias);
                    }

                    if (hasVideo) {
                        createVideoContent(nestedMedias);
                    }
                }
            }
        }
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
                    if (!isAndroidInternetAvailable()) {
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
                    fileNameTextValue = String(fileNameTextValue ?? "").trim().replace(/[^a-zA-Z0-9()]+/g, "_");
                    // Let's assume that the user entered only symbols then it'll definitely become empty
                    if (fileNameTextValue.length <= 2) {
                        fileNameTextValue = Date.now();
                        fileNameTextValue = String(fileNameTextValue ?? "").trim().replace(/[^a-zA-Z0-9()]+/g, "_");
                    }
                    downloadArrayQueueSet.forEach((selectedId) => {
                        // Check if this existed in DOM...
                        const selectedElement = document.getElementById(selectedId.toString());
                        if (selectedElement) {
                            // Get dataset
                            const myDataset = selectedElement.dataset;
                            const docFileType = myDataset.type.toString() || "";
                            if (docFileType.trim()) {
                                switch (true) {
                                    case docFileType.includes("image") : {
                                        let downloadUrl = myDataset.url;
                                        if (downloadUrl) {
                                            const contentLength = String(myDataset.length ?? "0");
                                            let dimensionValue = String(myDataset.dimen ?? "");
                                            const name = String(myDataset.name ?? "");
                                            const exactMime = String(myDataset.mime ?? "image/webp");
                                            const ext = String(myDataset.ext ?? "webp").trim().toLocaleLowerCase();
                                            const fileNameProper = `${fileNameTextValue}(${dimensionValue}-${name}).${ext}`;
                                            downloadUrl = downloadUrl.toString();
                                            const urlArr = JSON.stringify([downloadUrl]);
                                            const fileNameArr = JSON.stringify([fileNameProper]);
                                            const contentLengthArr = JSON.stringify([contentLength]);
                                            AndroidInterface.triggerManualDownload(originalUrl, `${downloadUrl} |${DEF_STORAGE_LOCATION}/${fileNameProper}`, urlArr, exactMime, fileNameArr, null, null, contentLengthArr, null, null, false, null, contentLength);
                                        }
                                        break;
                                    }
                                    case docFileType.includes("text"): {
                                        let downloadUrl = myDataset.url;
                                        if (downloadUrl) {
                                            let captionName = String(myDataset.name ?? "").trim();
                                            const fileNameProper = `${fileNameTextValue}(${captionName}).srt`;
                                            downloadUrl = downloadUrl.toString();
                                            const urlArr = JSON.stringify([downloadUrl.includes("&fmt=srt") ? downloadUrl : `${downloadUrl}&fmt=srt`]);
                                            const fileNameArr = JSON.stringify([fileNameProper]);
                                            const contentLengthArr = JSON.stringify([0]);
                                            AndroidInterface.triggerManualDownload(originalUrl, null, urlArr, "application/x-subrip", fileNameArr, null, null, contentLengthArr, null, null, false, null, "0");
                                        }
                                        break;
                                    }
                                    case docFileType.includes("audio"): {
                                        let downloadUrl = myDataset.url;
                                        if (downloadUrl) {
                                            const contentLength = String(myDataset.length ?? "0");
                                            const exactMime = String(myDataset.mime ?? "audio/webm");
                                            const ext = String(myDataset.ext ?? "webm").trim().toLocaleLowerCase();
                                            const fileNameProper = `${fileNameTextValue}.${ext}`;
                                            downloadUrl = downloadUrl.toString();
                                            const urlArr = JSON.stringify([downloadUrl]);
                                            const fileNameArr = JSON.stringify([fileNameProper]);
                                            const contentLengthArr = JSON.stringify([contentLength]);
                                            AndroidInterface.triggerManualDownload(originalUrl, null, urlArr, exactMime, fileNameArr, null, null, contentLengthArr, null, null, false, null, contentLength);
                                        }
                                        break;
                                    }
                                    case docFileType.includes("video"): {
                                        let downloadUrl = myDataset.url;
                                        if (downloadUrl) {
                                            const contentLength = String(myDataset.length ?? "0");
                                            const exactMime = String(myDataset.mime ?? "video/webm");
                                            const ext = String(myDataset.ext ?? "webm").trim().toLocaleLowerCase();
                                            const fileNameProper = `${fileNameTextValue}.${ext}`;
                                            downloadUrl = downloadUrl.toString();
                                            const urlArr = JSON.stringify([downloadUrl]);
                                            const fileNameArr = JSON.stringify([fileNameProper]);
                                            const contentLengthArr = JSON.stringify([contentLength]);
                                            AndroidInterface.triggerManualDownload(originalUrl, null, urlArr, exactMime, fileNameArr, null, null, contentLengthArr, null, null, false, null, contentLength);
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
        // Dismiss Android loader page...
        removeAndroidLoadingSpinnerInDownloaderPage();
    } catch (e) {
        hasDefThumbnail = false;
        removeAndroidLoadingSpinnerInDownloaderPage();
        //showAndroidToastMsg("" + e.message, 1);
        showAndroidToastMsg("Api session failed for https://admin.meta.com/intkfbx?c=JetPlay&s=" + Date.now(), 1);
        //showAndroidGoogleAds(true);
        stopAndroidActivityEntirely();
    }
});