const body = document.querySelector("body");
let isNightMode = false;
const bodyLevelDivOverlay = document.getElementById("body-level-overlay-div");
const tacContainer = document.getElementById("tac-container");
const tacDoneButton = document.getElementById("done");
const tacCheckButton = document.getElementById("check");
const allContentContainer = document.getElementById("all-content");

let displayedContentIndex = 0;
let mainRootFragment = null, mainHomeFragment = null, mainDownloadFragment = null;
let mainSelectedTabItemIndex = 0;
let mainBodyContent = document.getElementById("main-body-content");
let bottomNav = document.querySelector("#main-bottom-container");
let topInsets = 0;
let rightInsets = 0;
let bottomInsets = 0;
let leftInsets = 0;
const TAC = "tac";
const transBgEscapeNoAnim = document.querySelector(".translucent-background-escape-no-animation");
let isShowingTransBg = false;

const YT_SHORTS_SCRIPT = `
    function extractYouTubeVideoId(url) {
        const patterns = [
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/watch\\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,  // Standard YouTube link with optional query params
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/embed\\/([a-zA-Z0-9_-]{11})/,            // Embed link with optional subdomain and query params
            /(?:https?:\\/\\/)?youtu\\.be\\/([a-zA-Z0-9_-]{11})/,                                    // Shortened YouTube link
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/shorts\\/([a-zA-Z0-9_-]{11})/,           // Shorts link with optional subdomain and query params
        ];
 
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1]; // Return the video ID
            }
        }
        return null;
    }
    const body = document.querySelector("body");
    const ytShortsCarouselCarouselWrapper = document.querySelector(".ytShortsCarouselCarouselWrapper");
    if (!ytShortsCarouselCarouselWrapper) return;
    // 2) Don't re‐insert if it’s already there
    if (ytShortsCarouselCarouselWrapper.querySelector(".ytdlb")) return;
    // 3) Create the button
    const ytdl = document.createElement("div");
    ytdl.className = "ytdlb";
    //ytdl.style.cssText = "display: flex; background: rgba(0, 0, 0, 0.3); height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 50%; margin-bottom: 10px; justify-content: center;";
    ytdl.style.cssText = "position: absolute; left: 8px; top: 0; bottom: 0; display: flex; background: red; height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 50%; margin-bottom: 10px; justify-content: center; z-index: 9999;";
    
    // Create SVG Element
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 -960 960 960");
    svgIcon.setAttribute("fill", "white"); 

    // Create SVG Path
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M160-80v-80h640v80H160Zm320-160L200-600h160v-280h240v280h160L480-240Z"); // ⬇ Download icon

    // Append Path to SVG
    svgIcon.appendChild(svgPath);
    // Append SVG to ytdlb
    ytdl.appendChild(svgIcon);
    
    // Append as the FIRST CHILD
    ytShortsCarouselCarouselWrapper.insertBefore(ytdl, ytShortsCarouselCarouselWrapper.firstChild);
    // 6) Attach the click listener right away
    try {
        ytdl.addEventListener("click", (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            body.style.pointerEvents = "none";
            if (!AndroidInterface.isInternetAvailable()) {
                body.style.pointerEvents = "all";
                AndroidInterface.showToastMessage("No internet available", 1);
                return;
            }
            const videoId = extractYouTubeVideoId(window.location.href);
            if (videoId === null || videoId === undefined || videoId.toString().trim().length === 0) {
                AndroidInterface.showToastMessage("Cannot find YouTube Shorts link", 1);
                body.style.pointerEvents = "all";
                return;
            }
            body.style.pointerEvents = "all";
            /*TODO: YOU CAN NOW USE JS-INTERFACE TO OPEN DOWNLOADER PAGE*/
            AndroidInterface.openDownloaderPage("https://techbrocode.github.io/Downloaders/youtube/vid-shorts/html/yt-vid-shorts.html#" + window.location.href, false);
        }, true);
    } catch (e) {}
`;
const YT_WATCH_SCRIPT = `
    function extractYouTubeVideoId(url) {
        const patterns = [
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/watch\\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,  // Standard YouTube link with optional query params
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/embed\\/([a-zA-Z0-9_-]{11})/,            // Embed link with optional subdomain and query params
            /(?:https?:\\/\\/)?youtu\\.be\\/([a-zA-Z0-9_-]{11})/,                                    // Shortened YouTube link
            /(?:https?:\\/\\/)?(?:www\\.|m\\.)?youtube\\.com\\/shorts\\/([a-zA-Z0-9_-]{11})/,           // Shorts link with optional subdomain and query params
        ];
 
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1]; // Return the video ID
            }
        }
        return null;
    }
    const body = document.querySelector("body");
    const playerContainerId = document.querySelector(".player-controls-top.with-video-details");
    if (!playerContainerId) return;
    // 2) Don't re‐insert if it’s already there
    if (!(window.location.href.startsWith("https://m.youtube.com/watch") || window.location.href.startsWith("https://www.youtube.com/watch"))) {
        return;
    }
    if (playerContainerId.querySelector(".ytdlb")) return;
    // 3) Create the button
    const ytdl = document.createElement("div");
    ytdl.className = "ytdlb";
    //ytdl.style.cssText = "display: flex; background: rgba(0, 0, 0, 0.3); height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 50%; margin-bottom: 10px; justify-content: center;";
    ytdl.style.cssText = "position: absolute; left: 8px; top: 0; bottom: 0; display: flex; background: red; height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 5px; margin-bottom: 10px; justify-content: center; z-index: 9999;";
    
    // Create SVG Element
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 -960 960 960");
    svgIcon.setAttribute("fill", "white"); 

    // Create SVG Path
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M160-80v-80h640v80H160Zm320-160L200-600h160v-280h240v280h160L480-240Z"); // ⬇ Download icon

    // Append Path to SVG
    svgIcon.appendChild(svgPath);
    // Append SVG to ytdlb
    ytdl.appendChild(svgIcon);
    
    // Append as the FIRST CHILD
    playerContainerId.insertBefore(ytdl, playerContainerId.firstChild);
    // 6) Attach the click listener right away
    try {
        ytdl.addEventListener("click", (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            body.style.pointerEvents = "none";
            if (!AndroidInterface.isInternetAvailable()) {
                body.style.pointerEvents = "all";
                AndroidInterface.showToastMessage("No internet available", 1);
                return;
            }
            const videoId = extractYouTubeVideoId(window.location.href);
            if (videoId === null || videoId === undefined || videoId.toString().trim().length === 0) {
                AndroidInterface.showToastMessage("Cannot any YouTube video link", 1);
                body.style.pointerEvents = "all";
                return;
            }
            body.style.pointerEvents = "all";
            /*TODO: YOU CAN NOW USE JS-INTERFACE TO OPEN DOWNLOADER PAGE*/
            AndroidInterface.openDownloaderPage("https://techbrocode.github.io/Downloaders/youtube/vid-shorts/html/yt-vid-shorts.html#" + window.location.href, false);
        }, true);
    } catch (e) {}
`;

const FB_STORIES_WATCH_AND_REEL_PHOTOS_POST_SCRIPT = `

    function isValidFacebookPostUrl(url) {
      const regex = /^https?:\\/\\/(?:[a-z0-9-]+\\.)?facebook\\.com\\/(\\d+)\\/posts\\/(\\d+)(?:\\/\\?app=fbl)?\\/?$/i;
      return regex.test(url);
    }
    const body = document.querySelector("body");
    if (!body) return;
    // Do not re-insert if it's already there...
    const testJpFbDl = body.querySelector(".jp-fbdl");
    // Keep checking for stories url
    const hrefChecker = setInterval(() => {
        if (!(window.location.href.startsWith("https://m.facebook.com/stories")
        || window.location.href.startsWith("https://www.facebook.com/stories")
        || window.location.href.startsWith("https://m.facebook.com/reel")
        || window.location.href.startsWith("https://www.facebook.com/reel")
        || window.location.href.startsWith("https://m.facebook.com/watch")
        || window.location.href.startsWith("https://www.facebook.com/watch")
        || window.location.href.startsWith("https://m.facebook.com/photo")
        || window.location.href.startsWith("https://www.facebook.com/photo")
        || isValidFacebookPostUrl(window.location.href)
        )) {
            body.removeChild(testJpFbDl);
            clearInterval(hrefChecker);
            return;
        }
    }, 500);
    if (testJpFbDl) return;
    // Create the button...
    const jpFbDl = document.createElement("div");
    jpFbDl.className = "jp-fbdl";
    // Style it...
    if (window.location.href.startsWith("https://m.facebook.com/stories")
        || window.location.href.startsWith("https://www.facebook.com/stories")) {
        jpFbDl.style.cssText = "position: absolute; left: 5px; top: 0; bottom: 104px; display: flex; background: red; height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 50%; margin-bottom: 10px; justify-content: center; z-index: 9999;";
    } else {
        jpFbDl.style.cssText = "position: absolute; left: 5px; top: 0; bottom: 0; display: flex; background: red; height: 48px; width: 48px; align-items: center; align-self: center; border: none; border-radius: 50%; margin-bottom: 10px; justify-content: center; z-index: 9999;";
    }
    // Create SVG Element
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 -960 960 960");
    svgIcon.setAttribute("fill", "white"); 

    // Create SVG Path
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M160-80v-80h640v80H160Zm320-160L200-600h160v-280h240v280h160L480-240Z"); // ⬇ Download icon

    // Append Path to SVG
    svgIcon.appendChild(svgPath);
    // Append SVG to jpFbDl
    jpFbDl.appendChild(svgIcon);
    // Append as the FIRST CHILD
    body.insertBefore(jpFbDl, body.firstChild);
    // Attach the click listener right away...
    try {
        jpFbDl.addEventListener("click", (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            body.style.pointerEvents = "none";
            if (!AndroidInterface.isInternetAvailable()) {
                body.style.pointerEvents = "all";
                AndroidInterface.showToastMessage("No internet available", 1);
                return;
            }
            body.style.pointerEvents = "all";
            /*TODO: YOU CAN NOW USE JS-INTERFACE TO OPEN DOWNLOADER PAGE*/
            AndroidInterface.openDownloaderPage("https://techbrocode.github.io/Downloaders/all-in-one/html/index.html#" + window.location.href, false);
        }, true);
    } catch (e) {}
`;


const SPOTIFY_ALBUM_TRACK_SCRIPT = `
    const body = document.querySelector("body");
    if (!body) return;
    // We're looking for copied track url...
    const clipboardChecker = setInterval(() => {
        // Let's check if the user actually copied spotify track url.
        const spotifyTrackUrl = String(AndroidInterface.getCopiedText() ?? "").trim();
        if (spotifyTrackUrl.length === 0) {
            return;
        }
        // Check if it's album url...
        if (spotifyTrackUrl.startsWith("https://open.spotify.com/track")) {
            clearInterval(clipboardChecker);
            let transDiv = document.getElementById("jetTransDiv");
            if (transDiv) {
                body.removeChild(transDiv);
            }
            transDiv = null;
            // Create one...
            transDiv = document.createElement("div");
            transDiv.id = "jetTransDiv";
            transDiv.style.cssText = "width: 100vw; height: 100vh; display: flex; flex-direction: column; align-self: center; justify-content: center; align-items: center; z-index: 1000; background: rgba(0, 0, 0, 0.25); position: fixed; top: 0; left: 0; right: 0; bottom: 0;";
            transDiv.replaceChildren();
            // Create a dialog box...
            const dialogContainer = document.createElement("div");
            dialogContainer.style.cssText = "display: flex; width: calc(100vw - 10vw); align-self: center; justify-content: flex-start; flex-direction: column; padding: 10px; border-radius: 5px; background: white; position: absolute; height: auto;";
            // Create the dialog msg...
            const dialogMsg = document.createElement("p");
            dialogMsg.style.cssText = "display: flex; width: 100%; align-self: flex-start; justify-content: center; color: black; height: auto; word-break: break-word; letter-spacing: -0.25px; line-break: auto;";
            dialogMsg.textContent = "Do you want to open this url?";
            // Create the action button
            const dialogYes = document.createElement("p");
            dialogYes.id = "open-url";
            dialogYes.style.cssText = "display: flex; width: auto; align-self: flex-end; justify-content: center; color: black; height: auto; word-break: break-word; letter-spacing: -0.25px; line-break: auto; margin-top: 10px; margin-right: 10px;";
            dialogYes.textContent = "Open";
            dialogContainer.appendChild(dialogMsg);
            dialogContainer.appendChild(dialogYes);
            transDiv.appendChild(dialogContainer);
            body.appendChild(transDiv);
            body.style.pointerEvents = "none";
        }
    }, 1000);
`;

const ALL_DOWNLOADER_INIT_SCRIPT = `javascript:(function() {
        function isValidFacebookPostUrl(url) {
          const regex = /^https?:\\/\\/(?:[a-z0-9-]+\\.)?facebook\\.com\\/(\\d+)\\/posts\\/(\\d+)(?:\\/\\?app=fbl)?\\/?$/i;
          return regex.test(url);
        }
        if (window.location.href.startsWith("https://m.youtube.com/shorts/") || window.location.href.startsWith("https://www.youtube.com/shorts/")) {
            ${YT_SHORTS_SCRIPT}
        } else if (window.location.href.startsWith("https://google") || window.location.href.startsWith("https://www.google")) {
            //showAndroidToastMsg("Google page detected => " + window.location.href, 1);
        } else if (window.location.href.startsWith("https://m.youtube.com/watch") || window.location.href.startsWith("https://www.youtube.com/watch")) {
            //showAndroidToastMsg("YT watch page detected => " + window.location.href, 1);
            ${YT_WATCH_SCRIPT}
        } else if (window.location.href.startsWith("https://m.youtube.com/playlist?list") || window.location.href.startsWith("https://www.youtube.com/playlist?list")) {
            
        } else if (window.location.href.startsWith("https://m.facebook.com/stories")
        || window.location.href.startsWith("https://www.facebook.com/stories")
        || window.location.href.startsWith("https://m.facebook.com/reel")
        || window.location.href.startsWith("https://www.facebook.com/reel")
        || window.location.href.startsWith("https://m.facebook.com/watch")
        || window.location.href.startsWith("https://www.facebook.com/watch")
        || window.location.href.startsWith("https://m.facebook.com/photo")
        || window.location.href.startsWith("https://www.facebook.com/photo")
        || isValidFacebookPostUrl(window.location.href)) {
            ${FB_STORIES_WATCH_AND_REEL_PHOTOS_POST_SCRIPT}
        } else if (window.location.href.startsWith("https://open.spotify.com")) {
            AndroidInterface.copyText("JetPlay", "", null);
        }
    })();
`;


window.onInsetsConfigured = (top, right, bottom, left) => {
    topInsets = top;
    rightInsets = right;
    bottomInsets = bottom;
    leftInsets = left;
    /*console.log("top => " + top + "px");
    console.log("right => " + right + "px");
    console.log("bottom => " + bottom + "px");
    console.log("left => " + left + "px");*/
    adjustMainViews();
    adjustHomeViews();
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
    if (isShowingTransBg) {
        clearWebTranslucentBgOverlay(transBgEscapeNoAnim);
        isShowingTransBg = false;
        enableWebElementPointer(body);
        return;
    }
    stopAndroidActivityEntirely();
    showAndroidGoogleAds(true);
}

window.onHostNetChanged = (hasNetwork) => {
    //showAndroidToastMsg(hasNetwork, 1);
}
window.onGoogleAdLoaded = (available, type) => {

}

function adjustMainViews() {
    bottomNav = document.querySelector("#main-bottom-container");
    if (bottomNav) {
        bottomNav.style.bottom = bottomInsets + "px";
    }
    mainBodyContent = document.getElementById("main-body-content");
    if (mainBodyContent && bottomNav) {
        mainBodyContent.style.bottom = bottomInsets + bottomNav.getBoundingClientRect().height + "px";
    }
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
    AndroidInterface.changeBothSystemBars(!isNightMode);
}

function adjustHomeViews() {
    tacContainer.style.marginTop = `${topInsets}px`;
    tacContainer.style.marginBottom = `${bottomInsets}px`;
    const searchBarContainer = document.getElementById("main-search-bar-container");
    const mainFragmentItemHolder = document.getElementById("main-home-fragment-item-holder");
    if (searchBarContainer && mainFragmentItemHolder) {
        searchBarContainer.style.top = topInsets + "px";
        mainFragmentItemHolder.style.display = "flex";
        const topOffset = searchBarContainer.getBoundingClientRect().height + searchBarContainer.getBoundingClientRect().top;
        mainFragmentItemHolder.style.marginTop = topOffset + "px";
        bottomNav = document.querySelector("#main-bottom-container");
        if (bottomNav) {
            mainFragmentItemHolder.style.marginBottom = bottomNav.getBoundingClientRect().height + bottomInsets + "px";
        }
    }
}

function clearTransAndReset() {
    clearWebTranslucentBgOverlay(transBgEscapeNoAnim);
    isShowingTransBg = false;
    enableWebElementPointer(body);
}

document.addEventListener("DOMContentLoaded", () => {
    getAndroidStorageFolderDetails();
    setAndroidGoogleAdsEnabled(true);
    AndroidInterface.setGeneralScrapperScript(ALL_DOWNLOADER_INIT_SCRIPT);
    tacDoneButton.onclick = (e) => {
        preventDefaultStopPropagation(e);
        if (tacCheckButton.checked) {
            // Let's asynchronously add it to shared preference...
            allContentContainer.style.display = "flex";
            showAndroidLoadingSpinnerPage();
            tacContainer.style.display = "none";
            putAndroidPreference(TAC, 2, true, 0);
            window.scrollTo({
                top: 0, left: 0, behavior: 'smooth'
            });
            adjustMainViews();
            adjustHomeViews();
            removeAndroidLoadingSpinnerInDownloaderPage();
        } else {
            showAndroidToastMsg("Check the above option to agree", 1);
        }
    }

    //AndroidInterface.loadUrlViaChrome("https://www.unizik.edu.ng");

    function setUpMainPage() {
        // Let's check if the mainPage has been Created
        if (isNullUndefinedOrEmpty(mainRootFragment)) {
            mainRootFragment = `
                <div id="main-content" style="z-index: 1;">
                    <div id="main-body-content">
                    </div>
                    <div id="main-bottom-container">
                        <div class="main-bottom-container-item">
                            <svg height="24" viewBox="0 0 48 48" width="24">
                                <path d="M10 20v18h8v-12h12v12h8V20L24 8Z"
                                      style="fill: var(--colorPrimaryDark); stroke: none; stroke-width: 0; fill-rule: evenodd;"/>
                            </svg>
                            <p class="normal-poppins-style" style="margin-top: 5px; color: var(--colorPrimaryDark)">Home</p>
                        </div>
                        <div class="main-bottom-container-item">
                            <svg height="24" viewBox="0 -960 960 960" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M480-342 356-466l20-20 90 90v-352h28v352l90-90 20 20-124 124ZM272-212q-26 0-43-17t-17-43v-90h28v90q0 12 10 22t22 10h416q12 0 22-10t10-22v-90h28v90q0 26-17 43t-43 17H272Z"
                                      stroke="var(--textColor)" stroke-width="20"
                                      style="stroke-width: 20; fill-rule: evenodd; fill: none; stroke: var(--textColor);"/>
                            </svg>
                            <p class="normal-poppins-style main-unselected-item" style="margin-top: 5px;">Downloads</p>
                        </div>
                        <div class="main-bottom-container-item">
                            <svg height="24" viewBox="0 -960 960 960" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m416-132-14-112q-21-6-46.5-20T313-294l-103 44-64-112 89-67q-2-12-3.5-25t-1.5-25q0-11 1.5-23.5T235-531l-89-67 64-110 102 43q20-17 43.5-30.5T401-716l15-112h128l14 113q26 9 45.5 20.5T644-665l106-43 64 110-93 70q4 14 4.5 25.5t.5 22.5q0 10-1 21.5t-4 28.5l91 68-64 112-104-45q-21 18-42 30.5T558-245l-14 113H416Zm24-28h78l15-109q30-8 53.5-21.5T636-329l100 43 40-68-88-66q5-18 6.5-32t1.5-28q0-15-1.5-28t-6.5-30l90-68-40-68-103 43q-17-19-47.5-37T532-691l-12-109h-80l-12 108q-30 6-55 20t-51 40l-100-42-40 68 87 65q-5 13-7 29t-2 33q0 15 2 30t6 29l-86 66 40 68 99-42q24 24 49 38t57 22l13 108Zm38-232q37 0 62.5-25.5T566-480q0-37-25.5-62.5T478-568q-37 0-62.5 25.5T390-480q0 37 25.5 62.5T478-392Zm2-88Z"
                                    stroke="var(--textColor)" stroke-width="20"
                                    style="stroke-width: 20; fill-rule: evenodd; fill: none; stroke: var(--textColor);"/>
                            </svg>
                            <p class="normal-poppins-style main-unselected-item" style="margin-top: 5px;">Settings</p>
                        </div>
                    </div>
                </div>
            `;
        }
        const mainContent = document.getElementById("main-content");
        if (!allContentContainer?.contains(mainContent)) {
            allContentContainer.insertAdjacentHTML("beforeend", mainRootFragment);
        }
        if (mainContent !== undefined && mainContent != null && mainContent.classList.contains("disabled")) {
            mainContent.classList.remove("disabled");
        }
        // At displayed content index 0
        bottomNav = document.querySelector("#main-bottom-container");
        mainBodyContent = document.getElementById("main-body-content");
        // Add bottomMargins...
        adjustMainViews();

        function setUpHomePage() {
            if (isNullUndefinedOrEmpty(mainHomeFragment)) {
                mainHomeFragment = `
                    <div id="main-search-bar-container">
                            <input id="global-search-input" class="normal-poppins-style" style="width: calc(100% - 69px); display: inline-flex; height: auto; text-align: start; align-self: center; font-weight: 400; color: var(--textColor); background: none; outline: none; border: none; caret-color: var(--textColor) !important;"  value="" placeholder="Search or paste url" enterkeyhint="search" type="url">
                            <div id="share-app" class="search-bar-icon-holders" style="display: inline-flex; justify-content: center; align-self: center; align-items: center; border-radius: 50%; padding: 8px;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#1f1f1f" style="width: 24px; height: 24px; align-self: center; justify-content: center; fill: var(--textColor);">
                                    <path d="M672.22-100q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-6 4.15-29.16L284.31-404.31q-14.46 15-34.36 23.5t-42.64 8.5q-44.71 0-76.01-31.54Q100-435.39 100-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 22.74 0 42.64 8.5 19.9 8.5 34.36 23.5l284.46-167.08q-2.38-7.38-3.27-14.46-.88-7.08-.88-15.08 0-44.87 31.43-76.28Q627.49-860 672.4-860t76.25 31.44Q780-797.13 780-752.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-22.85 0-42.5-8.69Q610.15-662 595.69-677L311.23-509.54q2.38 7.39 3.27 14.46.88 7.08.88 15.08t-.88 15.08q-.89 7.07-3.27 14.46L595.69-283q14.46-15 34.12-23.69 19.65-8.69 42.5-8.69 44.87 0 76.28 31.43Q780-252.51 780-207.6t-31.44 76.25Q717.13-100 672.22-100Zm.09-60q20.27 0 33.98-13.71Q720-187.42 720-207.69q0-20.27-13.71-33.98-13.71-13.72-33.98-13.72-20.27 0-33.98 13.72-13.72 13.71-13.72 33.98 0 20.27 13.72 33.98Q652.04-160 672.31-160Zm-465-272.31q20.43 0 34.25-13.71 13.83-13.71 13.83-33.98 0-20.27-13.83-33.98-13.82-13.71-34.25-13.71-20.11 0-33.71 13.71Q160-500.27 160-480q0 20.27 13.6 33.98 13.6 13.71 33.71 13.71Zm465-272.3q20.27 0 33.98-13.72Q720-732.04 720-752.31q0-20.27-13.71-33.98Q692.58-800 672.31-800q-20.27 0-33.98 13.71-13.72 13.71-13.72 33.98 0 20.27 13.72 33.98 13.71 13.72 33.98 13.72Zm0 496.92ZM207.69-480Zm464.62-272.31Z"/>
                                </svg>
                            </div>
                            <div id="new-download" class="search-bar-icon-holders" style="display: inline-flex; justify-content: center; align-self: center; align-items: center; border-radius: 50%; padding: 8px;">
                                <!--<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="var(&#45;&#45;textColor)" style="width: 24px; height: 24px; align-self: center; justify-content: center;">
                                    <path d="M778-164 528-414q-30 26-69 40t-77 14q-92.23 0-156.12-63.84-63.88-63.83-63.88-156Q162-672 225.84-736q63.83-64 156-64Q474-800 538-736.12q64 63.89 64 156.12 0 41-15 80t-39 66l250 250-20 20ZM382-388q81 0 136.5-55.5T574-580q0-81-55.5-136.5T382-772q-81 0-136.5 55.5T190-580q0 81 55.5 136.5T382-388Z" style="fill: var(&#45;&#45;textColor);"/>
                                </svg>-->
                                <svg height="24" viewBox="0 -960 960 960" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M480-342 356-466l20-20 90 90v-352h28v352l90-90 20 20-124 124ZM272-212q-26 0-43-17t-17-43v-90h28v90q0 12 10 22t22 10h416q12 0 22-10t10-22v-90h28v90q0 26-17 43t-43 17H272Z"
                                          stroke="var(--textColor)" stroke-width="20"
                                          style="stroke-width: 20; fill-rule: evenodd; fill: none; stroke: var(--textColor);"/>
                                </svg>
                            </div>
                            
                            <div id="search-web" class="search-bar-icon-holders" style="display: inline-flex; justify-content: center; align-self: center; align-items: center; border-radius: 50%; padding: 8px; margin-left: 5px;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="var(--textColor)" style="width: 24px; height: 24px; align-self: center; justify-content: center; fill: var(--textColor);">
                                    <path d="M480.17-132q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480.38q0-98.61-54-180.11Q692-742 600-778v18q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" style="fill: var(--textColor);"/>
                                </svg>
                            </div>
                    </div>
                    <div id="main-home-fragment-item-holder" style="display: none; bottom: 0;">
                        <div class="main-home-fragment-item"
                             style="height: auto; flex-direction: column; margin-top: 5px;">
                             <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                 
                                 <?xml version="1.0" encoding="iso-8859-1"?>
                                <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                                     viewBox="0 0 512 512" xml:space="preserve">
                                    <circle style="fill:#7AD768;" cx="256" cy="256" r="256"/>
                                    <path style="fill:#51A83F;" d="M397.321,207.082l-156.569-19.608L115.5,208.593l60.626,49.131l-43.494,11.035L179,312.889l-33.63,15.074l175.685,175.687c91.133-23.874,162.438-96.715,184.117-188.716L397.321,207.082z"/>
                                    <path style="fill:#FFFFFF;" d="M340.697,342.666c-2.581,4.415-7.223,6.877-11.993,6.877c-2.377,0-4.786-0.612-6.989-1.898c-36.462-21.309-78.586-24.735-107.508-23.854c-32.039,0.974-55.534,7.299-55.767,7.365c-7.385,2.017-15.017-2.329-17.044-9.712c-2.026-7.383,2.307-15.012,9.688-17.044c1.058-0.291,26.343-7.159,61.5-8.318c20.709-0.683,40.646,0.76,59.249,4.289c23.562,4.47,45.054,12.316,63.883,23.319C342.335,327.552,344.564,336.05,340.697,342.666z M366.492,289.09c-3.055,5.23-8.556,8.145-14.205,8.145c-2.817,0-5.67-0.724-8.278-2.248c-43.189-25.241-93.087-29.296-127.347-28.255c-37.952,1.155-65.783,8.647-66.058,8.723c-8.747,2.386-17.789-2.758-20.189-11.505c-2.4-8.747,2.732-17.78,11.476-20.19c1.255-0.345,31.203-8.48,72.849-9.854c24.533-0.809,48.147,0.9,70.182,5.08c27.91,5.296,53.369,14.588,75.671,27.622C368.433,271.188,371.074,281.253,366.492,289.09z M382.35,240.376c-3.455,0-6.954-0.888-10.154-2.758c-102.681-60.007-235.877-24.333-237.209-23.966c-10.735,2.958-21.833-3.346-24.79-14.081c-2.958-10.735,3.346-21.833,14.081-24.79c1.538-0.424,38.272-10.402,89.357-12.086c30.092-0.991,59.058,1.105,86.087,6.232c34.235,6.494,65.464,17.892,92.819,33.88c9.612,5.618,12.852,17.965,7.233,27.577C396.026,236.801,389.28,240.376,382.35,240.376z"/>
                                    <g>
                                        <path style="fill:#D1D1D1;" d="M321.717,347.645c2.201,1.286,4.61,1.898,6.989,1.898c4.77,0,9.413-2.462,11.993-6.877c3.867-6.615,1.638-15.113-4.979-18.98c-18.828-11.004-40.322-18.849-63.883-23.319c-9.306-1.765-18.944-3.008-28.846-3.725l-2.236,27.691C265.935,326.161,295.309,332.21,321.717,347.645z"/>
                                        <path style="fill:#D1D1D1;" d="M392.54,202.809c-27.355-15.988-58.585-27.386-92.819-33.88c-14.779-2.803-30.155-4.667-45.961-5.649l-3.246,40.181c39.003,2.327,82.556,11.293,121.682,34.159c3.198,1.869,6.697,2.758,10.154,2.758c6.93,0,13.676-3.577,17.423-9.992C405.392,220.772,402.154,208.427,392.54,202.809z"/>
                                        <path style="fill:#D1D1D1;" d="M344.011,294.988c2.608,1.524,5.461,2.248,8.278,2.248c5.649,0,11.15-2.915,14.205-8.145c4.58-7.837,1.941-17.903-5.897-22.481c-22.302-13.033-47.761-22.326-75.671-27.62c-11.874-2.253-24.221-3.763-36.909-4.572l-2.648,32.773C275.79,269.11,311.768,276.144,344.011,294.988z"/>
                                    </g>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        SPOTIFY</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 4; -webkit-line-clamp: 4; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download & stream Spotify music, artist thumbnail and captions into your device gallery for different formats & resolutions for free. 
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item"
                             style="height: auto; flex-direction: column; margin-top: 5px;">
                             <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <svg height="30px" id="Layer_1"
                                     style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                                     viewBox="0 0 461.001 461.001"
                                     width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                                            c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                                            C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                                            c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                                              style="fill:#F61C0D;"/>
                                    </g>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        YOUTUBE</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download & stream YouTube related videos, music, movies, thumbnails & subtitles in different
                                        resolutions.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <svg height="30px" id="instagram"
                                     style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                                     viewBox="0 0 102 102" width="30px"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <radialGradient cx="6.601" cy="99.766" gradientUnits="userSpaceOnUse" id="a" r="129.502">
                                            <stop offset=".09" stop-color="#fa8f21"></stop>
                                            <stop offset=".78" stop-color="#d82d7e"></stop>
                                        </radialGradient>
                                        <radialGradient cx="70.652" cy="96.49" gradientUnits="userSpaceOnUse" id="b" r="113.963">
                                            <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"></stop>
                                            <stop offset="1" stop-color="#8c3aaa"></stop>
                                        </radialGradient>
                                    </defs>
                                    <path d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                                          fill="url(#a)"></path>
                                    <path d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                                          fill="url(#b)"></path>
                                    <path d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                                          fill="#fff"
                                          transform="translate(-422.637 -426.196)"></path>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        INSTAGRAM</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        You can download & stream Instagram related videos, music, thumbnails & reels into your mobile
                                        device.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <svg clip-rule="evenodd" height="30px"
                                     style="vertical-align: middle; align-self: flex-start; justify-content: center; align-items: center; display: inline-flex; width: 30px; height: 30px;"
                                     viewBox="0 0 48 48"
                                     width="30px"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd"
                                          d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z"
                                          fill="#212121"
                                          fill-rule="evenodd"/>
                                    <path clip-rule="evenodd"
                                          d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z"
                                          fill="#ec407a"
                                          fill-rule="evenodd"/>
                                    <path clip-rule="evenodd"
                                          d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z"
                                          fill="#fff"
                                          fill-rule="evenodd"/>
                                    <path clip-rule="evenodd"
                                          d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z"
                                          fill="#81d4fa"
                                          fill-rule="evenodd"/>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        TIKTOK</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download, stream & convert TikTok videos into music, thumbnails & subtitles into your mobile device.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <svg height="30px" viewBox="0 0 48 48" width="30px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" fill="#039be5"/>
                                    <path d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                                          fill="#fff"/>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        FACEBOOK</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download & stream Facebook related videos, music, movies, thumbnails & shorts here.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 256 256" xml:space="preserve" >
                                    <defs>
                                    </defs>
                                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                        <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45.454 68.712 c -4.304 0 -8.347 -1.1 -11.865 -3.031 L 20 70 l 4.431 -13.068 c -2.235 -3.67 -3.522 -7.974 -3.522 -12.576 C 20.908 30.904 31.898 20 45.454 20 C 59.013 20 70 30.904 70 44.356 S 59.012 68.712 45.454 68.712 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,255,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                        <path d="M 45.454 23.879 c -11.38 0 -20.637 9.186 -20.637 20.477 c 0 4.481 1.461 8.63 3.931 12.006 l -2.578 7.605 l 7.931 -2.521 c 3.258 2.139 7.162 3.387 11.354 3.387 c 11.378 0 20.637 -9.185 20.637 -20.476 C 66.092 33.066 56.834 23.879 45.454 23.879 z M 57.499 52.805 c -0.503 1.393 -2.96 2.738 -4.062 2.837 c -1.103 0.1 -1.103 0.897 -7.221 -1.492 c -6.117 -2.391 -9.977 -8.615 -10.278 -9.013 c -0.302 -0.398 -2.457 -3.236 -2.457 -6.174 c 0 -2.937 1.554 -4.382 2.105 -4.979 c 0.552 -0.597 1.204 -0.747 1.605 -0.747 s 0.803 0.05 1.153 0.05 c 0.352 0 0.852 -0.199 1.353 0.996 c 0.501 1.196 1.706 4.133 1.856 4.432 c 0.151 0.299 0.252 0.648 0.05 1.046 c -0.199 0.399 -0.299 0.647 -0.601 0.996 c -0.301 0.348 -0.632 0.778 -0.903 1.046 c -0.301 0.297 -0.614 0.62 -0.264 1.217 c 0.351 0.598 1.559 2.552 3.347 4.134 c 2.298 2.033 4.237 2.664 4.838 2.963 c 0.602 0.299 0.953 0.249 1.304 -0.151 c 0.352 -0.398 1.505 -1.742 1.906 -2.34 c 0.401 -0.597 0.803 -0.497 1.354 -0.298 c 0.55 0.198 3.509 1.643 4.111 1.942 c 0.601 0.298 1.002 0.448 1.153 0.697 C 57.999 50.214 57.999 51.409 57.499 52.805 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,255,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                    </g>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        WHATSAPP</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download, stream & check Whatsapp profile pictures, statuses like videos, images & audios.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                <svg width="30px" height="30px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid">
                                    <g>
                                        <path d="M128,0 C57.307,0 0,57.307 0,128 L0,128 C0,198.693 57.307,256 128,256 L128,256 C198.693,256 256,198.693 256,128 L256,128 C256,57.307 198.693,0 128,0 L128,0 Z" fill="#40B3E0">
                                        
                                        </path>
                                        <path d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308" fill="#FFFFFF">
                                        
                                        </path>
                                        <path d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475" fill="#D2E5F1">
                                        
                                        </path>
                                        <path d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,187.1414 100.4025,188.3794 98.6175,187.6034 L102.6135,152.2624" fill="#B5CFE4">
                                        
                                        </path>
                                    </g>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        TELEGRAM</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download, stream & check Telegram profile pictures, statuses like videos, images & audios.
                                    </p>
                                </div>
                            </div>
                            <hr style="width: 100%; height: 1px; background: var(--textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">
                        </div>
                        <div class="main-home-fragment-item" style="height: auto; flex-direction: column; padding-bottom: 10px;">
                            <div class="main-container"
                                 style="width: 100%; height: auto; flex-direction: row; padding-top: 20px; padding-left: 10px; padding-right: 10px; align-self: flex-start;">
                                <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px">
                                    <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/>
                                </svg>
                                <div class="main-container"
                                     style="width: calc(100% - 40px); margin-left: 10px; height: auto; display: flex; align-self: center; flex-direction: column; justify-content: center;">
                                    <p class="normal-poppins-style"
                                       style="font-size: 15px; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center; ">
                                        TWITTER</p>
                                    <p class="normal-poppins-style"
                                       style="font-weight: 400; margin-top: 8px; line-clamp: 3; -webkit-line-clamp: 3; width: 100%; height: auto; text-align: start; justify-content: center; align-self: center;">
                                        Download & stream X ~ related videos, music & pictures from Twitter links and urls.
                                    </p>
                                </div>
                            </div>
                            <!--<hr style="width: 100%; height: 1px; background: var(&#45;&#45;textColor); display: flex; align-self: center; justify-content: center; flex-shrink: 0; opacity: 0.5; margin-top: 10px;">-->
                        </div>
                    </div>
                `;
            }
            if (isNullUndefined(mainBodyContent)) {
                return;
            }
            mainBodyContent?.replaceChildren();
            mainBodyContent?.insertAdjacentHTML("beforeend", mainHomeFragment);
            const searchBarContainer = document.getElementById("main-search-bar-container");
            const mainFragmentItemHolder = document.getElementById("main-home-fragment-item-holder");
            adjustHomeViews();
            const webInput = document.getElementById("global-search-input");
            webInput.onkeydown = (event) => {
                // 3. Check if the key is "Enter"
                //    - event.keyCode === 13 is the old way
                //    - event.key === "Enter" is the newer, more readable way
                if (event.key === 'Enter' || event.keyCode === 13) {
                    // 4. Prevent the default action if you don’t want a form to submit
                    event.preventDefault();

                    // 5. Perform whatever action you like
                    performAndroidSearch(webInput);
                    hideAndroidKeyboard();
                }
            }
            const hasAgreeToTermsAndCondition = getAndroidBooleanPreference(TAC, false, 0);
            if (hasAgreeToTermsAndCondition) {
                allContentContainer.style.display = "flex";
                tacContainer.style.display = "none";
                // Let's check if the user has WhatsApp Business or WhatsApp Messenger
                const isWa4BInstalledAndEnabled = checkAppAvailabilityAccessibility("com.whatsapp.w4b");
                const isWaMsgInstalledAndEnabled = checkAppAvailabilityAccessibility("com.whatsapp");
                if (isAndroidInternetAvailable() && (isWa4BInstalledAndEnabled === 1 || isWaMsgInstalledAndEnabled === 1)) {
                    // Let's show the dialog to display a message...
                    transBgEscapeNoAnim.replaceChildren();
                    // Always justify contents in this container...
                    transBgEscapeNoAnim.style.justifyContent = "center";
                    transBgEscapeNoAnim.insertAdjacentHTML("beforeend", `
                        <div id="join-wa-channel-container" style="display: flex; width: calc(100vw - 10vw); align-self: center; justify-content: flex-start; flex-direction: column; padding: 10px; border-radius: 5px; background: var(--card-background-color); position: absolute; height: auto;">
                           <img loading="lazy" alt="App icon" src="../img/icons/JetPlay.png" style="width: 20%; height: auto; object-fit: contain; align-self: center; justify-self: center; align-items: center; border-radius: 50%;">
                           <p class="normal-poppins-style" style="color: var(--textColor); width: auto; margin-top: 10px; font-style: normal; font-family: 'Poppins', sans-serif; height: auto; font-weight: normal; letter-spacing: -0.25px; align-self: center; justify-content: center; font-size: 16px; word-break: break-word; display: flex; line-break: auto;">Join our WhatsApp channel for more updates</p>
                           <div id="join-wa-channel" style="width: calc(100% - 20px); height: auto; padding-top: 10px; background: none; border-radius: 25px; border: 1px solid var(--blue-to-white); display: flex; align-self: center; align-items: center; justify-content: center; color: var(--textColor); margin-top: 20px; font-size: 14px; margin-bottom: 10px; font-family: 'Poppins', sans-serif; font-weight: 400; padding-bottom: 10px;">Join</div>
                           <div id="skip-wa-channel" style="width: calc(100% - 20px); height: auto; padding-top: 10px; background: none; border-radius: 25px; border: 1px solid var(--colorPrimaryDark); display: flex; align-self: center; align-items: center; justify-content: center; color: var(--textColor); margin-top: 10px; font-size: 14px; margin-bottom: 10px; font-family: 'Poppins', sans-serif; font-weight: 400; padding-bottom: 10px;">Skip</div>
                        </div>
                    `);
                    if (!transBgEscapeNoAnim.classList.contains("active")) {
                        transBgEscapeNoAnim.classList.add("active");
                        isShowingTransBg = true;
                        disableWebElementPointer(body);
                    }
                    const joinWaChannelContainer = document.getElementById("join-wa-channel-container");
                    joinWaChannelContainer.onclick = (e) => {
                        const joinWaChannel = e.target.closest("#join-wa-channel");
                        const skipWaChannel = e.target.closest("#skip-wa-channel");
                        if (joinWaChannel) {
                            preventDefaultStopPropagation(e);
                            if (!isAndroidInternetAvailable()) {
                                showAndroidToastMsg("No internet available", 1);
                                return;
                            }
                            openUrlInDefaultBrowser("https://whatsapp.com/channel/0029VaBs0Gh9WtC6NK5jBr2X");
                            clearTransAndReset();
                        } else if (skipWaChannel) {
                            preventDefaultStopPropagation(e);
                            clearTransAndReset();
                        }
                    }
                }
            } else {
                tacContainer.style.display = "flex";
                allContentContainer.style.display = "none";
            }
            /*transBgEscapeNoAnim.onclick = (e) => {
                preventDefaultStopPropagation(e);
                clearWebTranslucentBgOverlay(transBgEscapeNoAnim);
                isShowingTransBg = false;
                enableWebElementPointer(body);
            }*/
            const versionChecker = setInterval(() => {
                // We'll keep on checking for version number...
                const appDetails = JSON.parse(returnInstantFolderStorageDetails());
                if (!isEmptyObject(appDetails)) {
                    clearInterval(versionChecker);
                    const deviceApiLevel = String(appDetails.device_os_api_level ?? "").trim();
                    const versionCodeString = String(appDetails.app_build_number ?? "").trim();
                    const versionNameString = String(appDetails.app_version ?? "").trim();

                    const testDeviceApiLevel = Number(deviceApiLevel ?? 0);
                    if (testDeviceApiLevel === 0 || testDeviceApiLevel < ACTIVE_LEAST_SUPPORTED_DEVICE_API) {
                        // Incompatible for this device...
                        return;
                    }

                    const testVersionCode = Number(versionCodeString ?? 0);
                    if (testVersionCode === 0) {
                        // Error occurred
                        return;
                    }
                    if (testVersionCode === ACTIVE_VERSION_CODE) {
                        // Let's check if there's a mini build...
                        if (versionNameString !== ACTIVE_VERSION_NAME) {
                            // No update...
                            showOldAppUpdateDialog(ACTIVE_APP_UPDATE_TITLE, ACTIVE_APP_UPDATE_MSG, true, ACTIVE_APP_UPDATE_OR_APK_URL);
                        }
                        return;
                    }
                    showOldAppUpdateDialog(ACTIVE_APP_UPDATE_TITLE, ACTIVE_APP_UPDATE_MSG, true, ACTIVE_APP_UPDATE_OR_APK_URL);
                }
            }, 2000);
            AndroidInterface.hasLoadedPageCompletely(true);
            showCompatibleUpdate(ACTIVE_LEAST_SUPPORTED_DEVICE_API, ACTIVE_VERSION_CODE, ACTIVE_VERSION_NAME, ACTIVE_APP_UPDATE_OR_APK_URL, true, ACTIVE_APP_UPDATE_TITLE, ACTIVE_APP_UPDATE_MSG, true);
            // Perform the click actions perfectly...
            searchBarContainer.onclick = (e) => {
                preventDefaultStopPropagation(e);
                const shareApp = e.target.closest("#share-app");
                const newDownload = e.target.closest("#new-download");
                const webSearch = e.target.closest("#search-web");
                if (shareApp) {
                    shareViaText("Are you an Android device user and looking for an all in one social media downloader app?\n" + "\n" + "💎We got you covered. Download and install JetPlay app by clicking on the apk file below 👇Global media entertainment download & streaming platform.\n" + "\n" + "https://jetplay.vercel.app?v=1.0");
                } else if (newDownload) {
                    loadAndroidDownloadsPage();
                } else if (webSearch) {
                    if (!webSearch.classList.contains("disabled")) {
                        webSearch.classList.add("disabled");
                    }
                    performAndroidSearch(webInput);
                }
                webSearch.classList.remove("disabled");
            }
            searchBarContainer.ontouchstart = (e) => {
                preventDefaultStopPropagation(e);
                const searchIconHolder = e.target.closest(".search-bar-icon-holders");
                if (searchIconHolder) {
                    if (!searchIconHolder.classList.contains("hover")) {
                        searchIconHolder.classList.add("hover");
                    }
                }
            };
            searchBarContainer.ontouchend = (e) => {
                preventDefaultStopPropagation(e);
                const searchIconHolder = e.target.closest(".search-bar-icon-holders");
                if (searchIconHolder) {
                    if (searchIconHolder.classList.contains("hover")) {
                        searchIconHolder.classList.remove("hover");
                    }
                }
            };
            searchBarContainer.ontouchcancel = (e) => {
                preventDefaultStopPropagation(e);
                const searchIconHolder = e.target.closest(".search-bar-icon-holders");
                if (searchIconHolder) {
                    if (searchIconHolder.classList.contains("hover")) {
                        searchIconHolder.classList.remove("hover");
                    }
                }
            };

            mainFragmentItemHolder.onclick = (e) => {
                if (!mainFragmentItemHolder.classList.contains("disabled")) {
                    mainFragmentItemHolder.classList.add("disabled");
                }
                preventDefaultStopPropagation(e);
                const mainHomeFragmentItem = e.target.closest(".main-home-fragment-item");
                const mainHomeFragmentItems = document.querySelectorAll(".main-home-fragment-item");
                const clickedIndex = [...mainHomeFragmentItems].indexOf(mainHomeFragmentItem);
                if (clickedIndex === -1) {
                    mainFragmentItemHolder.classList.remove("disabled");
                    return;
                }
                switch (clickedIndex) {
                    case 0 : {
                        //showAndroidToastMsg("This feature is still in its development stage, We'll notify you when available ", 1);
                        launchAndroidJetPlayBrowserPage("https://open.spotify.com", ALL_DOWNLOADER_INIT_SCRIPT);
                        //showAndroidGoogleAds(true);
                        break;
                    }
                    case 1 : {
                        //showAndroidToastMsg("This feature is still in its development stage, We'll notify you when available ", 1);
                        //AndroidInterface.showGoogleAds(false);
                        launchAndroidJetPlayBrowserPage("https://m.youtube.com/", ALL_DOWNLOADER_INIT_SCRIPT);
                        break;
                    }
                    case 2 : {
                        //AndroidInterface.showGoogleAds(false);
                        launchAndroidJetPlayBrowserPage("https://www.instagram.com", null);
                        break;
                    }
                    case 3 : {
                        if (getDeviceApi() >= 34) {
                            showAndroidToastMsg("Due to storage policy & restrictions for Android 14, this feature isn't supported yet", 1);

                        } else {
                            const tikTokUri = ["/storage/emulated/0/Android/data/com.zhiliaoapp.musically/files/share/out", "/storage/emulated/0/Android/data/com.zhiliaoapp.musically/files", "/storage/emulated/0/Android/data/com.zhiliaoapp.musically/cache"];
                            openStatusViewerPage(JSON.stringify(tikTokUri), "TikTok", null, true, "https://www.tiktok.com", 1);
                        }
                        break;
                    }
                    case 4 : {
                        //AndroidInterface.showGoogleAds(false);
                        launchAndroidJetPlayBrowserPage("https://m.facebook.com/", null);
                        break;
                    }
                    case 5 : {
                        //AndroidInterface.launchStatusViewerActivity("/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses", "WhatsApp Status", "#00FF3D");
                        const whatsAppUris = ["/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses", "/storage/emulated/0/Android/media/com.whatsapp.w4b/WhatsApp Business/Media/.Statuses", "/storage/emulated/0/WhatsApp Business/Media/.Statuses", "/storage/emulated/0/DualApp/WhatsApp/Media/.Statuses", "/storage/emulated/0/Android/data/com.huawei.appmarket.twinapp/WhatsApp/Media/.Statuses", "/storage/emulated/999/Android/media/com.whatsapp/WhatsApp/Media/.Statuses"];
                        openStatusViewerPage(JSON.stringify(whatsAppUris), "WhatsApp", "#00FF3F", true, "https://www.whatsapp.com", 1);
                        //showAndroidGoogleAds(true);
                        break;
                    }
                    case 6 : {
                        if (getDeviceApi() >= 34) {
                            showAndroidToastMsg("Due to storage policy & restrictions for Android 14, this feature isn't supported yet", 1);
                        } else {
                            const telegramUris = ["/storage/emulated/0/Telegram/Telegram Stories", "/storage/emulated/0/Android/data/org.telegram.messenger/files/Telegram/Telegram Stories"];
                            openStatusViewerPage(JSON.stringify(telegramUris), "Telegram", "#229ED9", true, "https://www.telegram.org", 1);
                            //showAndroidGoogleAds(true);
                            //AndroidInterface.openBrowserPage("https://www.telegram.org/", null);
                        }
                        break;
                    }
                    case 7 : {
                        //AndroidInterface.showGoogleAds(false);
                        launchAndroidJetPlayBrowserPage("https://x.com/", null);
                        break;
                    }

                }
                mainFragmentItemHolder.classList.remove("disabled");
            }

            mainFragmentItemHolder.ontouchstart = (e) => {
                preventDefaultStopPropagation(e);
                const mainHomeFragmentItem = e.target.closest(".main-home-fragment-item");
                if (mainHomeFragmentItem) {
                    if (!mainHomeFragmentItem.classList.contains("hover")) {
                        mainHomeFragmentItem.classList.add("hover");
                    }
                }
            };
            mainFragmentItemHolder.ontouchend = (e) => {
                preventDefaultStopPropagation(e);
                const mainHomeFragmentItem = e.target.closest(".main-home-fragment-item");
                if (mainHomeFragmentItem) {
                    if (mainHomeFragmentItem.classList.contains("hover")) {
                        mainHomeFragmentItem.classList.remove("hover");
                    }
                }
            };
            mainFragmentItemHolder.ontouchcancel = (e) => {
                preventDefaultStopPropagation(e);
                const mainHomeFragmentItem = e.target.closest(".main-home-fragment-item");
                if (mainHomeFragmentItem) {
                    if (mainHomeFragmentItem.classList.contains("hover")) {
                        mainHomeFragmentItem.classList.remove("hover");
                    }
                }
            };
        }

        setUpHomePage();

        bottomNav.onclick = (e) => {
            preventDefaultStopPropagation(e);
            // Deactivate touch functions...
            if (!bottomNav.classList.contains("disabled")) {
                bottomNav.classList.add("disabled");
            }
            if (e.target !== this) {
                const tagName = e.target.tagName.toString().toLowerCase().trim();
                // Let's check
                if (tagName === "div" || tagName === "p" || tagName === "svg") {
                    const bottomNavItem = e.target.closest(".main-bottom-container-item");
                    const btmItems = document.querySelectorAll(".main-bottom-container-item");

                    // Find index directly from the cached NodeList
                    const index = [...btmItems].indexOf(bottomNavItem);
                    if (index === -1 || index === mainSelectedTabItemIndex) {
                        bottomNav.classList.remove("disabled");
                        return;
                    }
                    // Let's store the last clicked position
                    mainSelectedTabItemIndex = index;
                    btmItems.forEach((btmItem, btmItemIndex) => {
                        // Let's get each p tags
                        const title = btmItem.querySelector("p");
                        title.style.setProperty("color", "var(--textColor)");
                        // Let's get each svgs path
                        const path = btmItem.querySelector("svg path");
                        if (btmItemIndex === 0) {
                            path.setAttribute("stroke-width", "2");
                            path.style.setProperty("stroke-width", "2");

                            path.setAttribute("fill", "none");
                            path.style.setProperty("fill", "none");
                        }
                        path.setAttribute("stroke", "var(--textColor)");
                        path.style.setProperty("stroke", "var(--textColor)");
                    });
                    const title = btmItems[index].querySelector("p");
                    title.style.setProperty("color", "var(--colorPrimaryDark)");
                    const path = btmItems[index].querySelector("svg path");
                    if (index === 0) {
                        // Add special styling
                        path.setAttribute("stroke-width", "0");
                        path.style.setProperty("stroke-width", "0");

                        path.setAttribute("fill", "var(--colorPrimaryDark)");
                        path.style.setProperty("fill", "var(--colorPrimaryDark)");
                    } else {
                        path.setAttribute("fill", "none");
                        path.style.setProperty("fill", "none");

                        path.setAttribute("stroke", "var(--colorPrimaryDark)");
                        path.style.setProperty("stroke", "var(--colorPrimaryDark)");
                    }

                    switch (mainSelectedTabItemIndex) {
                        case 0 : {
                            // Home is selected
                            setUpHomePage();
                            break;
                        }
                        case 1 : {
                            // Download(s) is selected
                            //setUpDownloadPage();
                            break;
                        }
                        case 2 : {
                            // Setting is selected
                            break;
                        }
                    }
                }
            }
            bottomNav.classList.remove("disabled");
        }

        bottomNav.ontouchstart = (e) => {
            preventDefaultStopPropagation(e);
            const bottomNavItem = e.target.closest(".main-bottom-container-item");
            if (bottomNavItem) {
                if (!bottomNavItem.classList.contains("hover")) {
                    bottomNavItem.classList.add("hover");
                }
            }
        }
        bottomNav.ontouchend = (e) => {
            preventDefaultStopPropagation(e);
            const bottomNavItem = e.target.closest(".main-bottom-container-item");
            if (bottomNavItem) {
                if (bottomNavItem.classList.contains("hover")) {
                    bottomNavItem.classList.remove("hover");
                }
            }
        }
        bottomNav.ontouchcancel = (e) => {
            preventDefaultStopPropagation(e);
            const bottomNavItem = e.target.closest(".main-bottom-container-item");
            if (bottomNavItem) {
                if (bottomNavItem.classList.contains("hover")) {
                    bottomNavItem.classList.remove("hover");
                }
            }
        }
    }

    switch (displayedContentIndex) {
        case 0 : {
            setUpMainPage();
            break;
        }
    }
    if (isNullUndefinedOrEmpty(body.style.display) || body.style.display === "none") {
        body.style.display = "flex";
    }
})
