let tabItem = document.querySelectorAll(".tab-item");
let tabIconPath = document.querySelectorAll(".tab_icon_path");
let tabButton = document.querySelectorAll(".tab_btn");
let tabIndicator = document.querySelector(".tab_indicator");
let allContent = document.querySelectorAll(".content");
let tabBox = document.querySelector(".tabBox");
const contentBox = document.querySelector(".content_box");
let vidAdsDetector = false;
const mainTabLayout = document.querySelector(".tabLayout");
const documentBody = document.body;
/*let vidAdsArray = [/!*"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0"*!/"https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/videoPlayerAd.html", "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/youtube_sub_vid.html"];*/
/*let vidAdsArray = ["https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/google-type-ad.html", "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/youtube_sub_vid.html"];*/

/*let vidAdsArray = ["view-source:https://www.youtube.com/watch?v=7Of2rUMjndU"];*/

const moreOptionBottomDivOverlayContainer = document.querySelector(".bottom-sheet-overlay-container");
const moreOptionBottomDivContainer = document.querySelector(".bottom-sheet-container");

let vidAdsArray = [[1721069794167, "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/google-type-ad.html"]/*,

    [
        1720111996338,
        "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/videoPlayerAd.html"
    ]*/];

const pictureCollectionsBaseUrl = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/picture-collections/";
const premiumVideoElement = document.querySelector(".premium-video");
const premiumVideoSource = document.getElementById("premiumVideoSource");

let pictureCollections = [["Plantations", pictureCollectionsBaseUrl + "plantations.json", -1, ""], ["Wrist Watches", pictureCollectionsBaseUrl + "wrist-watches.json", -1, ""], ["Bags", pictureCollectionsBaseUrl + "bags.json", -1, ""], ["Wallpapers Ultra-High-Definition resolution (4k)", pictureCollectionsBaseUrl + "4k-wallpapers.json", -1, ""], ["Vehicles", pictureCollectionsBaseUrl + "vehicles.json", // This is the last index of loaded grid child item. But it's -1 initially means none has been loaded
    -1, // This will store collections.Data as a String...
    ""], ["Caribbean Islands", pictureCollectionsBaseUrl + "caribbean-islands.json", // This is the last index of loaded grid child item. But it's -1 initially means none has been loaded
    -1, // This will store collections.Data as a String...
    ""], ["Electronics", pictureCollectionsBaseUrl + "Electronics.json", // This is the last index of loaded grid child item. But it's -1 initially means none has been loaded
    -1, // This will store collections.Data as a String...
    ""], ["Wildlife", pictureCollectionsBaseUrl + "Wildlife.json", // This is the last index of loaded grid child item. But it's -1 initially means none has been loaded
    -1, // This will store collections.Data json as a String...
    ""]];

let vidArrayPosition = 0;

let selectedContentIndex = 0;

let hasLoadedVideosAtZeroIndex = false;
let hasLoadedMusicAtFirstIndex = false;
let hasLoadedMoviesAtSecondIndex = false;
let hasLoadedCollectionsAtThirdIndex = false;

let lastLoadedCollectionsIndex = 0;
let hasReleasedCollectionsFragmentLock = true;

let lastLoadedVideoIndex = 0;
let videosDataReference = null;

let lastLoadedMusicIndex = 0;
let musicDataReference = null;

let lastLoadedMoviesIndex = 0;
let moviesDataReference = null;

const premiumVideoAdsContainer = document.querySelector(".premium-video-ads-container");
const premiumVideoAdsContainerWrapper = document.querySelector(".premium-video-ads-container-wrapper");
const premiumAdsLogo = document.querySelector(".ads-logo");
const premiumAdsSponsor = document.querySelector(".sponsor");
const premiumAdsActionButton = document.querySelector(".ads-action-button");
const premiumVideoPlayPauseHolder = document.querySelector(".premium-play-pause-holder");
const premiumPlayAdsIcon = document.getElementById("premiumPlayAdsIcon");
const premiumPauseAdsIcon = document.getElementById("premiumPauseAdIcon");
const premiumReplayAdsIcon = document.getElementById("replayPremiumAdIcon");
const premiumAdsTopActionControls = document.querySelector(".top-action-controls");
const premiumAdsSponsoredCountText = document.querySelector(".sponsor-count-text");
const premiumFullscreenButtonHolder = document.querySelector(".fullscreen-button-icon-holder");
const premiumAdsSkipContainer = document.querySelector(".skip-container");
const premiumVideoAdsContainerDim = document.querySelector(".premium-video-ads-container-dim-container");
const premiumAdSponsorSpanCountDuration = document.querySelector(".sponsor-span-count-duration");
const premiumAdsHorizontalProgressContainer = document.querySelector(".premium-ads-horizontal-progress-container");
const premiumAdsHorizontalProgressBar = document.querySelector(".premium-ads-horizontal-progress");
const premiumVideoAdsMetadataContainer = document.querySelector(".premium-video-ads-metadata-container");

const videoMusicMovieTitle = document.querySelector(".video-music-movie-title");
const videoMusicMovieViewsHashtagsPublished = document.querySelector(".video-music-movie-views-hashtags-published");
const videoMusicMovieViewsPublishedMoreSpan = document.querySelector(".video-music-movie-views-published-more-span");
const videoMusicMovieChannelThumbnail = document.querySelector(".video-music-movie-channel-thumbnail");
const videoMusicMovieChannelName = document.querySelector(".video-music-movie-channel-name");
const videoMusicMovieSubscribeButton = document.querySelector(".video-music-movie-channel-subscribe-button");
const videoMusicMovieTubeLikeDislikeVertSeparator = document.querySelector(".video-music-movie-tube-like-dislike-vert-separator");
const videoMusicMovieReactDownloadShareThanksRemixContainer = document.querySelector(".video-music-movie-tube-react-download-thanks-share-remix-container");
const videoMusicMovieFullCommentBottomDivContainer = document.querySelector(".video-music-movie-full-comment-bottom-div-container");
const videoMusicMovieCommentDismissContainer = document.querySelector(".comments-label-dismiss-container");
const videoMusicAllCommentContainer = document.querySelector(".all-comments-container");
const videoMusicMovieMetadataWrapper = document.querySelector(".video-music-movie-metadata-wrapper");

let premiumVideoAdsList = [
    [
        "https://techbrocode.github.io/JetPlayWeb/storage/colgate.mp4",
        `video/mp4; codecs="avc1.64001E, mp4a.40.2"`,
        "https://yt3.googleusercontent.com/Xj-6gqHKmTewewCwB6zMzywmZuQJgn0OMH5FEPt_NVTx-XehTx8l3NOsau5FZ4pO-HhcbdDd=s900-c-k-c0x00ffffff-no-rj",
        "Colgate",
        "Open" // Ads action button text
    ]
];


/*
let premiumVideoAdsJsonList = await getPremiumVideoAdsJsonList();

async function getPremiumVideoAdsJsonList() {
    let json = null;
    try {
        const response = await fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/premium-video-ads-list.json");
        json = await response.json();
        return json;
    } catch (error) {
        return json;
    }
}
*/
let premiumVideoAdsJsonList = null;
fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/premium-video-ads-list.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status} detected`);
        }
        return response.json();
    })
    .then(responseData => {
        premiumVideoAdsJsonList = responseData;
    })
    .catch(error => {
        premiumVideoAdsJsonList = null;
    });

if (vidAdsDetector && vidAdsArray.length !== 0) {
    for (let i = 0; i < vidAdsArray.length; i++) {
        if (Date.now() >= vidAdsArray[i][0]) {
            vidAdsArray.splice(i, 1);
        }
    }
    shuffleJSON(vidAdsArray);
}

const youtubeApiKey = "AIzaSyDT9WSwD1QUNzxnI4ycuy_7SB9AG_J-GKc";

if (!hasLoadedVideosAtZeroIndex) {
    loadVideoTab();
}

window.onload = function () {
    tabIndicator.style.width = tabItem[0].offsetWidth + "px";
    tabIndicator.style.top = (tabItem[0].offsetHeight - 1) + "px";
    tabIndicator.style.left = tabItem[0].offsetLeft + "px";
    /*alert(`${tabBox.offsetHeight}`);*/
    allContent[0].style.marginTop = tabBox.clientHeight + "px";
    allContent[0].classList.add("active");
    moreOptionBottomDivOverlayContainer.onclick = () => {
        clearVidMusicMovBottomDiv();
    };
    moreOptionBottomDivOverlayContainer.ontouchend = () => {
        clearVidMusicMovBottomDiv();
    };
    moreOptionBottomDivOverlayContainer.ontouchcancel = () => {
        clearVidMusicMovBottomDiv();
    };
    moreOptionBottomDivOverlayContainer.onmouseup = () => {
        clearVidMusicMovBottomDiv();
    };
    moreOptionBottomDivOverlayContainer.onmousedown = () => {
        clearVidMusicMovBottomDiv();
    };

}

/*const premiumAdsFrame = document.getElementById("premium-video-ads-frame");
const premiumVideoElement = premiumAdsFrame.contentWindow.document.querySelector(".premium-video");
const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

const premiumAdsVideoChecker = setInterval(() => {
    if (premiumVideoElement !== null && isVideoPlaying(premiumVideoElement)) {
        /!*premiumVideoElement.pause();*!/
        clearInterval(premiumAdsVideoChecker);
    }
}, 0);*/

function getDocumentMaxHeight() {
    const doc = document;
    return Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, doc.body.offsetHeight, doc.documentElement.offsetHeight, doc.body.clientHeight, doc.documentElement.clientHeight)
}

window.addEventListener("scroll", () => {
    /*if(window.scrollTop() + window.height > document.height() - 100) {
        alert("near bottom!");
    }*/
    /*if ((window.innerHeight + window.scrollY) >= getDocumentMaxHeight()) {
        alert("bottom!");
    }*/
    if (/*(window.innerHeight + window.scrollY) >= getDocumentMaxHeight()*/isAlmostAtPageBottom()) {
        switch (selectedContentIndex) {
            case 0:
                if (hasLoadedVideosAtZeroIndex && videosDataReference !== null && videosDataReference !== undefined && videosDataReference.length > 0) {
                    const nextMaxCount = lastLoadedVideoIndex + 11;
                    for (let c = (lastLoadedVideoIndex + 1); c < videosDataReference.length; c++) {
                        if (videosDataReference[c] !== null && videosDataReference[c] !== undefined) {
                            if (c === nextMaxCount) {
                                break;
                            }
                            if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                                //     Create the Iframe to load ads webpage...
                                if (vidArrayPosition === vidAdsArray.length) {
                                    vidArrayPosition = 0;
                                }
                                let iFrame = document.createElement("iframe");
                                iFrame.src = vidAdsArray[vidArrayPosition][1];
                                iFrame.height = "0";
                                iFrame.width = "0";
                                iFrame.classList.add("adsIframe");
                                allContent[selectedContentIndex].appendChild(iFrame);
                                /*iFrame.onload = function () {
                                    this.contentWindow.location.reload();
                                    this.onload = null;
                                };*/
                                let heightChecker = setInterval(() => {
                                    if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                        iFrame.style.width = "100%";
                                        iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                        if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                            /*alert("Cool");*/
                                            clearInterval(heightChecker);
                                        }
                                    }
                                }, 500);
                                vidArrayPosition++;
                            }

                            let channelAvatar = videosDataReference[c].channelAvatar;
                            let channelId = videosDataReference[c].channelId;
                            let channelName = videosDataReference[c].channelName;
                            let duration = videosDataReference[c].duration;
                            let videoId = videosDataReference[c].id;
                            let videoTitle = videosDataReference[c].title;
                            console.log(`json at array index ${c} : \nid: ${videosDataReference[c].id}\nbody: ${videosDataReference[c].body}\nseverity: ${videosDataReference[c].severity}\nstatus: ${videosDataReference[c].status}`);
                            // Create the video container...
                            let videoCard = document.createElement("div");
                            videoCard.style.width = "100%";
                            videoCard.style.height = "auto";
                            videoCard.style.background = "#ffffff";
                            videoCard.classList.add("videoMainContainer");

                            // Create the thumbnail container
                            let videoThumbContainer = document.createElement("div");
                            videoThumbContainer.classList.add("thumbnailContainer");

                            // Create the thumbnail image...
                            let videoThumbnail = document.createElement("img");
                            videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.alt = "";
                            videoThumbnail.style.width = "100%";
                            videoThumbnail.style.height = "auto";
                            videoThumbnail.loading = "lazy";
                            videoThumbnail.classList.add("videoThumbnail")
                            videoThumbnail.onerror = () => {
                                videoCard.style.display = "none";
                            }

                            // Create the play pause holder
                            let playPauseHolder = document.createElement("div");
                            playPauseHolder.classList.add("play-pause-holder");

                            // Create the play button image
                            let play = document.createElement("img");
                            /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                            play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.alt = "";
                            play.style.width = "90%";
                            play.style.height = "auto";
                            play.loading = "lazy";
                            play.classList.add("play");

                            // Create the video duration text
                            let videoDuration = document.createElement("p");
                            videoDuration.innerText = getTimeInHhMmSsString(duration);
                            videoDuration.classList.add("duration");

                            playPauseHolder.appendChild(play);
                            videoThumbContainer.appendChild(videoThumbnail);
                            videoThumbContainer.appendChild(videoDuration);
                            videoThumbContainer.appendChild(playPauseHolder);
                            /*videoThumbContainer.appendChild(addButtonHolder);*/

                            // Create the metadata container
                            let metadataContainer = document.createElement("div");
                            metadataContainer.classList.add("metadataContainer");

                            // Create the videoTitle
                            let videoTitleDom = document.createElement("p");
                            videoTitleDom.innerText = videoTitle;
                            videoTitleDom.classList.add("videoTitle");

                            // Create bottom metadata container
                            let bottomMetadata = document.createElement("div");
                            bottomMetadata.classList.add("bottomMetadata");

                            // Create the channel thumbnail
                            let channelThumbnail = document.createElement("img");
                            channelThumbnail.src = `${channelAvatar}`;
                            channelThumbnail.srcset = `${channelAvatar}`;
                            channelThumbnail.alt = "";
                            channelThumbnail.style.width = "5%";
                            channelThumbnail.style.height = "5%";
                            channelThumbnail.loading = "lazy";
                            channelThumbnail.style.borderRadius = "50%";
                            channelThumbnail.classList.add("channel_thumbnail");

                            // Create the channel name
                            let channelNameDom = document.createElement("p");
                            channelNameDom.innerText = channelName;
                            channelNameDom.classList.add("channel_name");

                            // Create more vertical icons holder
                            let moreVertHolder = document.createElement("div");
                            moreVertHolder.classList.add("more_vert_holder");

                            // Create more vertical icons
                            let moreVert = document.createElement("img");
                            moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                            moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                            moreVert.alt = "";
                            moreVert.loading = "eager";
                            moreVert.classList.add("more-vert");

                            moreVertHolder.appendChild(moreVert);
                            bottomMetadata.appendChild(channelThumbnail);
                            bottomMetadata.appendChild(channelNameDom);
                            bottomMetadata.appendChild(moreVertHolder);

                            // Create divider
                            let divider = document.createElement("hr");
                            divider.style.backgroundColor = "rgb(0,0,0)";
                            divider.style.width = "100%";
                            divider.classList.add("divider");

                            metadataContainer.appendChild(videoTitleDom);
                            metadataContainer.appendChild(bottomMetadata);

                            videoCard.appendChild(videoThumbContainer);
                            /*videoCard.appendChild(addButtonHolder);*/
                            videoCard.appendChild(metadataContainer);
                            videoCard.appendChild(divider);
                            allContent[selectedContentIndex].appendChild(videoCard);

                            let moreVertHolders = document.querySelectorAll(".more_vert_holder");
                            moreVertHolders.forEach((moreVertHolder, position) => {
                                moreVertHolders[position].onmouseup = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].onmouseout = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].onmousedown = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };
                                moreVertHolders[position].ontouchcancel = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].ontouchend = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].ontouchstart = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };

                            });
                            /*if (c === (data.length - 1)) {
                                shuffleItems();
                            }*/
                            lastLoadedVideoIndex = c;
                        }
                    }
                }
                break;
            case 1:
                if (hasLoadedMusicAtFirstIndex && musicDataReference !== null && musicDataReference !== undefined && musicDataReference.length > 0) {
                    const nextMaxCount = lastLoadedMusicIndex + 11;
                    for (let c = (lastLoadedMusicIndex + 1); c < musicDataReference.length; c++) {
                        if (musicDataReference[c] !== null && musicDataReference[c] !== undefined) {
                            if (c === nextMaxCount) {
                                break;
                            }
                            if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                                //     Create the Iframe to load ads webpage...
                                if (vidArrayPosition === vidAdsArray.length) {
                                    vidArrayPosition = 0;
                                }
                                let iFrame = document.createElement("iframe");
                                iFrame.src = vidAdsArray[vidArrayPosition][1];
                                iFrame.height = "0";
                                iFrame.width = "0";
                                iFrame.classList.add("adsIframe");
                                allContent[selectedContentIndex].appendChild(iFrame);
                                /*iFrame.onload = function () {
                                    this.contentWindow.location.reload();
                                    this.onload = null;
                                };*/
                                let heightChecker = setInterval(() => {
                                    if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                        iFrame.style.width = "100%";
                                        iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                        if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                            /*alert("Cool");*/
                                            clearInterval(heightChecker);
                                        }
                                    }
                                }, 500);
                                vidArrayPosition++;
                            }
                            let channelAvatar = musicDataReference[c].channelAvatar;
                            let channelId = musicDataReference[c].channelId;
                            let channelName = musicDataReference[c].channelName;
                            let duration = musicDataReference[c].duration;
                            let videoId = musicDataReference[c].id;
                            let videoTitle = musicDataReference[c].title;
                            console.log(`json at array index ${c} : \nid: ${musicDataReference[c].id}\nbody: ${musicDataReference[c].body}\nseverity: ${musicDataReference[c].severity}\nstatus: ${musicDataReference[c].status}`);
                            // Create the video container...
                            let videoCard = document.createElement("div");
                            videoCard.style.width = "100%";
                            videoCard.style.height = "auto";
                            videoCard.style.background = "#ffffff";
                            videoCard.classList.add("videoMainContainer");

                            // Create the thumbnail container
                            let videoThumbContainer = document.createElement("div");
                            videoThumbContainer.classList.add("thumbnailContainer");

                            // Create the thumbnail image...
                            let videoThumbnail = document.createElement("img");
                            videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.alt = "";
                            videoThumbnail.style.width = "100%";
                            videoThumbnail.style.height = "auto";
                            videoThumbnail.loading = "lazy";
                            videoThumbnail.classList.add("videoThumbnail")
                            videoThumbnail.onerror = () => {
                                videoCard.style.display = "none";
                            }

                            // Create the play pause holder
                            let playPauseHolder = document.createElement("div");
                            playPauseHolder.classList.add("play-pause-holder");

                            // Create the play button image
                            let play = document.createElement("img");
                            /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                            play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.alt = "";
                            play.style.width = "90%";
                            play.style.height = "auto";
                            play.loading = "lazy";
                            play.classList.add("play");

                            // Create the video duration text
                            let videoDuration = document.createElement("p");
                            videoDuration.innerText = getTimeInHhMmSsString(duration);
                            videoDuration.classList.add("duration");

                            playPauseHolder.appendChild(play);
                            videoThumbContainer.appendChild(videoThumbnail);
                            videoThumbContainer.appendChild(videoDuration);
                            videoThumbContainer.appendChild(playPauseHolder);
                            /*videoThumbContainer.appendChild(addButtonHolder);*/

                            // Create the metadata container
                            let metadataContainer = document.createElement("div");
                            metadataContainer.classList.add("metadataContainer");

                            // Create the videoTitle
                            let videoTitleDom = document.createElement("p");
                            videoTitleDom.innerText = videoTitle;
                            videoTitleDom.classList.add("videoTitle");

                            // Create bottom metadata container
                            let bottomMetadata = document.createElement("div");
                            bottomMetadata.classList.add("bottomMetadata");

                            // Create the channel thumbnail
                            let channelThumbnail = document.createElement("img");
                            channelThumbnail.src = `${channelAvatar}`;
                            channelThumbnail.srcset = `${channelAvatar}`;
                            channelThumbnail.alt = "";
                            channelThumbnail.style.width = "5%";
                            channelThumbnail.style.height = "5%";
                            channelThumbnail.loading = "lazy";
                            channelThumbnail.style.borderRadius = "50%";
                            channelThumbnail.classList.add("channel_thumbnail");

                            // Create the channel name
                            let channelNameDom = document.createElement("p");
                            channelNameDom.innerText = channelName;
                            channelNameDom.classList.add("channel_name");

                            // Create more vertical icons holder
                            let moreVertHolder = document.createElement("div");
                            moreVertHolder.classList.add("more_vert_holder");

                            // Create more vertical icons
                            let moreVert = document.createElement("img");
                            moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                            moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                            moreVert.alt = "";
                            moreVert.loading = "eager";
                            moreVert.classList.add("more-vert");

                            moreVertHolder.appendChild(moreVert);
                            bottomMetadata.appendChild(channelThumbnail);
                            bottomMetadata.appendChild(channelNameDom);
                            bottomMetadata.appendChild(moreVertHolder);

                            // Create divider
                            let divider = document.createElement("hr");
                            divider.style.backgroundColor = "rgb(0,0,0)";
                            divider.style.width = "100%";
                            divider.classList.add("divider");

                            metadataContainer.appendChild(videoTitleDom);
                            metadataContainer.appendChild(bottomMetadata);

                            videoCard.appendChild(videoThumbContainer);
                            /*videoCard.appendChild(addButtonHolder);*/
                            videoCard.appendChild(metadataContainer);
                            videoCard.appendChild(divider);
                            allContent[selectedContentIndex].appendChild(videoCard);

                            let moreVertHolders = document.querySelectorAll(".more_vert_holder");
                            moreVertHolders.forEach((moreVertHolder, position) => {
                                moreVertHolders[position].onmouseup = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].onmouseout = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].onmousedown = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };
                                moreVertHolders[position].ontouchcancel = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].ontouchend = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].ontouchstart = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };

                            });
                            /*if (c === (data.length - 1)) {
                                shuffleItems();
                            }*/
                            lastLoadedMusicIndex = c;
                        }
                    }
                }
                break;
            case 2:
                if (hasLoadedMoviesAtSecondIndex && moviesDataReference !== null && moviesDataReference !== undefined && moviesDataReference.length > 0) {
                    const nextMaxCount = lastLoadedMoviesIndex + 11;
                    for (let c = (lastLoadedMoviesIndex + 1); c < moviesDataReference.length; c++) {
                        if (moviesDataReference[c] !== null && moviesDataReference[c] !== undefined) {
                            if (c === nextMaxCount) {
                                break;
                            }
                            if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                                //     Create the Iframe to load ads webpage...
                                if (vidArrayPosition === vidAdsArray.length) {
                                    vidArrayPosition = 0;
                                }
                                let iFrame = document.createElement("iframe");
                                iFrame.src = vidAdsArray[vidArrayPosition][1];
                                iFrame.height = "0";
                                iFrame.width = "0";
                                iFrame.classList.add("adsIframe");
                                allContent[selectedContentIndex].appendChild(iFrame);
                                /*iFrame.onload = function () {
                                    this.contentWindow.location.reload();
                                    this.onload = null;
                                };*/
                                let heightChecker = setInterval(() => {
                                    if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                        iFrame.style.width = "100%";
                                        iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                        iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                        if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                            /*alert("Cool");*/
                                            clearInterval(heightChecker);
                                        }
                                    }
                                }, 500);
                                vidArrayPosition++;
                            }
                            let channelAvatar = moviesDataReference[c].channelAvatar;
                            let channelId = moviesDataReference[c].channelId;
                            let channelName = moviesDataReference[c].channelName;
                            let duration = moviesDataReference[c].duration;
                            let videoId = moviesDataReference[c].id;
                            let videoTitle = moviesDataReference[c].title;
                            console.log(`json at array index ${c} : \nid: ${moviesDataReference[c].id}\nbody: ${moviesDataReference[c].body}\nseverity: ${moviesDataReference[c].severity}\nstatus: ${moviesDataReference[c].status}`);
                            // Create the video container...
                            let videoCard = document.createElement("div");
                            videoCard.style.width = "100%";
                            videoCard.style.height = "auto";
                            videoCard.style.background = "#ffffff";
                            videoCard.classList.add("videoMainContainer");

                            // Create the thumbnail container
                            let videoThumbContainer = document.createElement("div");
                            videoThumbContainer.classList.add("thumbnailContainer");

                            // Create the thumbnail image...
                            let videoThumbnail = document.createElement("img");
                            videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                            videoThumbnail.alt = "";
                            videoThumbnail.style.width = "100%";
                            videoThumbnail.style.height = "auto";
                            videoThumbnail.loading = "lazy";
                            videoThumbnail.classList.add("videoThumbnail")
                            videoThumbnail.onerror = () => {
                                videoCard.style.display = "none";
                            }

                            // Create the play pause holder
                            let playPauseHolder = document.createElement("div");
                            playPauseHolder.classList.add("play-pause-holder");

                            // Create the play button image
                            let play = document.createElement("img");
                            /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                            play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                            play.alt = "";
                            play.style.width = "90%";
                            play.style.height = "auto";
                            play.loading = "lazy";
                            play.classList.add("play");

                            // Create the video duration text
                            let videoDuration = document.createElement("p");
                            videoDuration.innerText = getTimeInHhMmSsString(duration);
                            videoDuration.classList.add("duration");

                            playPauseHolder.appendChild(play);
                            videoThumbContainer.appendChild(videoThumbnail);
                            videoThumbContainer.appendChild(videoDuration);
                            videoThumbContainer.appendChild(playPauseHolder);
                            /*videoThumbContainer.appendChild(addButtonHolder);*/

                            // Create the metadata container
                            let metadataContainer = document.createElement("div");
                            metadataContainer.classList.add("metadataContainer");

                            // Create the videoTitle
                            let videoTitleDom = document.createElement("p");
                            videoTitleDom.innerText = videoTitle;
                            videoTitleDom.classList.add("videoTitle");

                            // Create bottom metadata container
                            let bottomMetadata = document.createElement("div");
                            bottomMetadata.classList.add("bottomMetadata");

                            // Create the channel thumbnail
                            let channelThumbnail = document.createElement("img");
                            channelThumbnail.src = `${channelAvatar}`;
                            channelThumbnail.srcset = `${channelAvatar}`;
                            channelThumbnail.alt = "";
                            channelThumbnail.style.width = "5%";
                            channelThumbnail.style.height = "5%";
                            channelThumbnail.loading = "lazy";
                            channelThumbnail.style.borderRadius = "50%";
                            channelThumbnail.classList.add("channel_thumbnail");

                            // Create the channel name
                            let channelNameDom = document.createElement("p");
                            channelNameDom.innerText = channelName;
                            channelNameDom.classList.add("channel_name");

                            // Create more vertical icons holder
                            let moreVertHolder = document.createElement("div");
                            moreVertHolder.classList.add("more_vert_holder");

                            // Create more vertical icons
                            let moreVert = document.createElement("img");
                            moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                            moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                            moreVert.alt = "";
                            moreVert.loading = "eager";
                            moreVert.classList.add("more-vert");

                            moreVertHolder.appendChild(moreVert);
                            bottomMetadata.appendChild(channelThumbnail);
                            bottomMetadata.appendChild(channelNameDom);
                            bottomMetadata.appendChild(moreVertHolder);

                            // Create divider
                            let divider = document.createElement("hr");
                            divider.style.backgroundColor = "rgb(0,0,0)";
                            divider.style.width = "100%";
                            divider.classList.add("divider");

                            metadataContainer.appendChild(videoTitleDom);
                            metadataContainer.appendChild(bottomMetadata);

                            videoCard.appendChild(videoThumbContainer);
                            /*videoCard.appendChild(addButtonHolder);*/
                            videoCard.appendChild(metadataContainer);
                            videoCard.appendChild(divider);
                            allContent[selectedContentIndex].appendChild(videoCard);

                            let moreVertHolders = document.querySelectorAll(".more_vert_holder");
                            moreVertHolders.forEach((moreVertHolder, position) => {
                                moreVertHolders[position].onmouseup = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].onmouseout = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].onmousedown = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };
                                moreVertHolders[position].ontouchcancel = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };
                                moreVertHolders[position].ontouchend = () => {
                                    let clearBackground = setInterval(() => {
                                        moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                        clearInterval(clearBackground);
                                    }, 150);
                                };

                                moreVertHolders[position].ontouchstart = () => {
                                    moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                                };

                            });
                            /*if (c === (data.length - 1)) {
                                shuffleItems();
                            }*/
                            lastLoadedMoviesIndex = c;
                        }
                    }
                }
                break;
            case 3:
                if (pictureCollections !== null && pictureCollections !== undefined && pictureCollections instanceof Array && pictureCollections.length !== 0 && lastLoadedCollectionsIndex < pictureCollections.length && selectedContentIndex === 3 && hasReleasedCollectionsFragmentLock) {
                    //     Collections tab was selected...
                    hasReleasedCollectionsFragmentLock = false;
                    fetch(pictureCollections[lastLoadedCollectionsIndex][1])
                        .then(response => {
                            if (!response.ok) {
                                const errorMsg = `HTTP Error occurred while fetching ${pictureCollections[lastLoadedCollectionsIndex][1]} with a response of ${response.status}`;
                                console.error(errorMsg);
                                throw new Error(errorMsg);
                            }
                            return response.json();
                        })
                        .then(collectionsData => {
                            console.log(`collection: ${lastLoadedCollectionsIndex} => ${collectionsData.status}`);
                            // create a variable for changing collections data string to json...
                            if (collectionsData.length > 0) {
                                // Convert the collectionsData here and store it...
                                pictureCollections[lastLoadedCollectionsIndex][3] = JSON.stringify(collectionsData);
                                let retrievedCollectionsData = JSON.parse(pictureCollections[lastLoadedCollectionsIndex][3]);
                                shuffleJSON(retrievedCollectionsData);
                                // TODO: PLEASE REMEMBER TO CHANGE THIS AND USE Collections ADS INSTEAD
                                if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
                                    shuffleJSON(vidAdsArray);
                                }
                                let categoryName = pictureCollections[lastLoadedCollectionsIndex][0];
                                // Create the section element container...
                                const sectionElementContainer = document.createElement("div");
                                sectionElementContainer.classList.add("section");

                                // Create show more element...

                                const showMore = document.createElement("button");
                                showMore.innerHTML = "Show more";
                                showMore.classList.add("show-more");

                                // Create the section title element...
                                const sectionTitleElement = document.createElement("p");
                                sectionTitleElement.innerText = categoryName;
                                sectionTitleElement.classList.add("section-title");

                                // Create the Grid parent holder...

                                const gridParentHolder = document.createElement("div");
                                gridParentHolder.classList.add("grid-parent");


                                sectionElementContainer.appendChild(sectionTitleElement);
                                sectionElementContainer.appendChild(gridParentHolder);
                                allContent[selectedContentIndex].appendChild(sectionElementContainer);
                                for (let i = 0; i < retrievedCollectionsData.length; i++) {
                                    // This line will rarely execute...
                                    if (i === retrievedCollectionsData.length - 1) {
                                        sectionElementContainer.removeChild(showMore);
                                    }
                                    if (i === 10) {
                                        // first add and make the show more button visible then, break from loop
                                        sectionElementContainer.appendChild(showMore);
                                        break;
                                    }
                                    // Show ads
                                    if (/*i !== 0 && */i % 4 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                                        //     Create the Iframe to load ads webpage...
                                        if (vidArrayPosition === vidAdsArray.length) {
                                            vidArrayPosition = 0;
                                        }
                                        let iFrame = document.createElement("iframe");
                                        iFrame.src = vidAdsArray[vidArrayPosition][1];
                                        iFrame.height = "0";
                                        iFrame.width = "0";
                                        iFrame.classList.add("adsIframe");
                                        allContent[selectedContentIndex].appendChild(iFrame);

                                        let heightChecker = setInterval(() => {
                                            if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                                iFrame.style.width = "100%";
                                                iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                                iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                                iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                                if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                                    /*alert("Cool");*/
                                                    clearInterval(heightChecker);
                                                }
                                            }
                                        }, 500);
                                        vidArrayPosition++;
                                    }
                                    /*const portraitSrc = pictureCollections[lastLoadedCollectionsIndex][3][i].src.portrait;*/
                                    const portraitSrc = retrievedCollectionsData[i].src.portrait;

                                    /*const title = pictureCollections[lastLoadedCollectionsIndex][3][i].alt;*/
                                    const title = retrievedCollectionsData[i].alt;

                                    //     Create the gridChild
                                    const gridChild = document.createElement("div");
                                    gridChild.classList.add("grid_child");

                                    //     Create the thumbnail...
                                    const thumbnail = document.createElement("img");
                                    thumbnail.src = portraitSrc;
                                    thumbnail.srcset = portraitSrc;
                                    thumbnail.alt = "";
                                    thumbnail.style.width = "100%";
                                    thumbnail.style.height = "100%";
                                    thumbnail.loading = "lazy";
                                    thumbnail.classList.add("thumbnail");
                                    thumbnail.onerror = () => {
                                        gridChild.style.display = "none";
                                    }

                                    //  Create the more vert holder...
                                    const moreVertHolder = document.createElement("div");
                                    moreVertHolder.classList.add("collections_more_vert_holder");

                                    //     Create the svg more vert icon...
                                    const collectionsMoreVertIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                    collectionsMoreVertIcon.setAttribute("height", "18");
                                    collectionsMoreVertIcon.setAttribute("viewBox", "0 -960 960 960");
                                    collectionsMoreVertIcon.setAttribute("width", "18");
                                    collectionsMoreVertIcon.classList.add("collections-more-vert-icon");
                                    collectionsMoreVertIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                                    //     Create the svg path....
                                    const collectionsMoreVertIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                    collectionsMoreVertIconPath.setAttribute("d", "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z");
                                    collectionsMoreVertIconPath.setAttribute("fill", "#ffffff");
                                    collectionsMoreVertIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                                    collectionsMoreVertIcon.appendChild(collectionsMoreVertIconPath);
                                    moreVertHolder.appendChild(collectionsMoreVertIcon);

                                    //     Create the picture title element
                                    const pictureTitleElement = document.createElement("p");
                                    pictureTitleElement.innerText = title;
                                    pictureTitleElement.classList.add("picture-title");

                                    gridChild.appendChild(thumbnail);
                                    gridChild.appendChild(moreVertHolder);
                                    gridChild.appendChild(pictureTitleElement);


                                    gridParentHolder.appendChild(gridChild);
                                    pictureCollections[lastLoadedCollectionsIndex][2] = i;
                                }

                                let collectionsMoreVertHolders = document.querySelectorAll(".collections_more_vert_holder");
                                let showMoreButtons = document.querySelectorAll(".show-more");
                                const sectionElementContainers = document.querySelectorAll(".section");
                                const gridParentHolders = document.querySelectorAll(".grid-parent");
                                const thumbnails = document.querySelectorAll(".thumbnail");
                                collectionsMoreVertHolders.forEach((moreVertHolder, index) => {
                                    moreVertHolder.onmouseup = () => {
                                        let clearBackground = setInterval(() => {
                                            moreVertHolder.style.background = "none";
                                            clearInterval(clearBackground);
                                        }, 150);
                                    }
                                    moreVertHolder.onmouseout = () => {
                                        let clearBackground = setInterval(() => {
                                            moreVertHolder.style.background = "none";
                                            clearInterval(clearBackground);
                                        }, 150);
                                    }

                                    moreVertHolder.onmousedown = () => {
                                        moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                                    }
                                    moreVertHolder.ontouchend = () => {
                                        let clearBackground = setInterval(() => {
                                            moreVertHolder.style.background = "none";
                                            clearInterval(clearBackground);
                                        }, 150);
                                    }
                                    moreVertHolder.ontouchcancel = () => {
                                        let clearBackground = setInterval(() => {
                                            moreVertHolder.style.background = "none";
                                            clearInterval(clearBackground);
                                        }, 150);
                                    }

                                    moreVertHolder.ontouchstart = () => {
                                        moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                                    }

                                    showMoreButtons.forEach((showMoreButton, index) => {
                                        showMoreButton.onmouseup = () => {
                                            let clearBackground = setInterval(() => {
                                                showMoreButton.style.background = "#eaeaea";
                                                clearInterval(clearBackground);
                                            }, 150)
                                        };
                                        showMoreButton.onmouseout = () => {
                                            let clearBackground = setInterval(() => {
                                                showMoreButton.style.background = "#eaeaea";
                                                clearInterval(clearBackground);
                                            }, 150)
                                        };
                                        showMoreButton.onmousedown = () => {
                                            showMoreButton.style.background = "#bcbcbc";
                                        };
                                        showMoreButton.ontouchstart = () => {
                                            showMoreButton.style.background = "#bcbcbc";
                                        };
                                        showMoreButton.ontouchend = () => {
                                            let clearBackground = setInterval(() => {
                                                showMoreButton.style.background = "#eaeaea";
                                                clearInterval(clearBackground);
                                            }, 150)
                                        };
                                        showMoreButton.ontouchcancel = () => {
                                            let clearBackground = setInterval(() => {
                                                showMoreButton.style.background = "#eaeaea";
                                                clearInterval(clearBackground);
                                            }, 150)
                                        };
                                        showMoreButton.onclick = () => {
                                            loadMoreCollectionsTabInSpecificCategory(index, sectionElementContainers[index], showMoreButton, gridParentHolders[index]);
                                        }
                                    });
                                    thumbnails.forEach((thumbnail, index) => {
                                        thumbnail.onclick = () => {
                                            getCollectionsThumbnailMetadata(index, thumbnails[index]);
                                        };
                                    });
                                });
                            }
                            lastLoadedCollectionsIndex += 1;
                            hasReleasedCollectionsFragmentLock = true;
                        })
                        .catch(error => {
                            console.error(`Collections at position: ${lastLoadedCollectionsIndex} fetch error of ${error}`);
                            lastLoadedCollectionsIndex += 1;
                            hasReleasedCollectionsFragmentLock = true;
                        });
                }
                break;
        }
    }
})

function addVidMusicMoviesBottomSheetVertPopupItems(position) {
    if (position !== -1) {
        //     TODO: Create the play next container div item...
        const playNextDivPopupItem = document.createElement("div");
        playNextDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the playNextIconSvg...
        const playNextSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        playNextSvgIcon.setAttribute("height", "30");
        playNextSvgIcon.setAttribute("viewBox", "0 0 24 24");
        playNextSvgIcon.setAttribute("width", "30");
        playNextSvgIcon.classList.add("more-vert-download-icon");
        playNextSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const playNextSvgIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        playNextSvgIconPath.setAttribute("d", "M21,3H3C1.89,3 1,3.89 1,5v12c0,1.1 0.89,2 2,2h5v2h8v-2h2v-2H3V5h18v8h2V5C23,3.89 22.1,3 21,3zM13,10V7h-2v3H8v2h3v3h2v-3h3v-2H13zM24,18l-4.5,4.5L18,21l3,-3l-3,-3l1.5,-1.5L24,18z");
        playNextSvgIconPath.setAttribute("fill", "rgba(0,0,0,1)");
        playNextSvgIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        playNextSvgIcon.appendChild(playNextSvgIconPath);
        playNextSvgIcon.classList.add("bottom-sheet-item-icon");

        //     Create the bottom sheet item title...
        const playNextItemTitle = document.createElement("p");
        switch (selectedContentIndex) {
            case 1:
                playNextItemTitle.innerText = "Play next music in queue";
                break;
            case 2:
                playNextItemTitle.innerText = "Play next movie in queue";
                break;
            default:
                playNextItemTitle.innerText = "Play next video in queue";
        }
        playNextItemTitle.classList.add("bottom-sheet-item-title");
        playNextDivPopupItem.appendChild(playNextSvgIcon);
        playNextDivPopupItem.appendChild(playNextItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(playNextDivPopupItem);

        //     TODO: Create the save to watch later container div item...
        const saveWatchLaterDivPopupItem = document.createElement("div");
        saveWatchLaterDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the saveWatchLaterIconSvg...
        const saveWatchLaterSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        saveWatchLaterSvgIcon.setAttribute("height", "30");
        saveWatchLaterSvgIcon.setAttribute("viewBox", "0 0 24 24");
        saveWatchLaterSvgIcon.setAttribute("width", "30");
        saveWatchLaterSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path 1....
        const saveWatchLaterSvgIconPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        saveWatchLaterSvgIconPath1.setAttribute("d", "M11.99,2C6.47,2 2,6.48 2,12s4.47,10 9.99,10C17.52,22 22,17.52 22,12S17.52,2 11.99,2zM12,20c-4.42,0 -8,-3.58 -8,-8s3.58,-8 8,-8 8,3.58 8,8 -3.58,8 -8,8z");
        saveWatchLaterSvgIconPath1.setAttribute("fill", "rgba(0,0,0,1)");
        saveWatchLaterSvgIconPath1.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path 2....
        const saveWatchLaterSvgIconPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        saveWatchLaterSvgIconPath2.setAttribute("d", "M12.5,7H11v6l5.25,3.15 0.75,-1.23 -4.5,-2.67z");
        saveWatchLaterSvgIconPath2.setAttribute("fill", "rgba(0,0,0,1)");
        saveWatchLaterSvgIconPath2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        saveWatchLaterSvgIcon.appendChild(saveWatchLaterSvgIconPath1);
        saveWatchLaterSvgIcon.appendChild(saveWatchLaterSvgIconPath2);
        saveWatchLaterSvgIcon.classList.add("bottom-sheet-item-icon");

        //     Create the bottom sheet item title...
        const saveWatchLaterItemTitle = document.createElement("p");
        switch (selectedContentIndex) {
            case 1:
                saveWatchLaterItemTitle.innerText = "Save music to watch later";
                break;
            case 2:
                saveWatchLaterItemTitle.innerText = "Save movie to watch later";
                break;
            default:
                saveWatchLaterItemTitle.innerText = "Save video to watch later";
        }
        saveWatchLaterItemTitle.classList.add("bottom-sheet-item-title");
        saveWatchLaterDivPopupItem.appendChild(saveWatchLaterSvgIcon);
        saveWatchLaterDivPopupItem.appendChild(saveWatchLaterItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(saveWatchLaterDivPopupItem);


        //     TODO: Create the download container div item...
        const downloadDivPopupItem = document.createElement("div");
        downloadDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the downloadIconSvg...
        const downloadSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        downloadSvgIcon.setAttribute("height", "30");
        downloadSvgIcon.setAttribute("viewBox", "0 0 24 24");
        downloadSvgIcon.setAttribute("width", "30");
        downloadSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const downloadSvgIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        downloadSvgIconPath.setAttribute("d", "M5,20h14v-2H5V20zM19,9h-4V3H9v6H5l7,7L19,9z");
        downloadSvgIconPath.setAttribute("fill", "rgba(0,0,0,1)");
        downloadSvgIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        downloadSvgIcon.appendChild(downloadSvgIconPath);
        downloadSvgIcon.classList.add("bottom-sheet-item-icon");

        //     Create the bottom sheet item title...
        const downloadItemTitle = document.createElement("p");
        switch (selectedContentIndex) {
            case 1:
                downloadItemTitle.innerText = "Download music";
                break;
            case 2:
                downloadItemTitle.innerText = "Download movie";
                break;
            default:
                downloadItemTitle.innerText = "Download video";
        }
        downloadItemTitle.classList.add("bottom-sheet-item-title");
        downloadDivPopupItem.appendChild(downloadSvgIcon);
        downloadDivPopupItem.appendChild(downloadItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(downloadDivPopupItem);

        //     TODO: Create the add playlist container div item...
        const addPlaylistDivPopupItem = document.createElement("div");
        addPlaylistDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the playlistIconSvg...
        const playlistSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        playlistSvgIcon.setAttribute("height", "30");
        playlistSvgIcon.setAttribute("viewBox", "0 0 24 24");
        playlistSvgIcon.setAttribute("width", "30");
        playlistSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const playlistSvgIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        playlistSvgIconPath.setAttribute("d", "M14,10H3v2h11V10zM14,6H3v2h11V6zM18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18zM3,16h7v-2H3V16z");
        playlistSvgIconPath.setAttribute("fill", "rgba(0,0,0,1)");
        playlistSvgIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        playlistSvgIcon.appendChild(playlistSvgIconPath);
        playlistSvgIcon.classList.add("bottom-sheet-item-icon");

        //     Create the bottom sheet item title...
        const playlistItemTitle = document.createElement("p");
        playlistItemTitle.innerText = "Add to playlist";
        playlistItemTitle.classList.add("bottom-sheet-item-title");
        addPlaylistDivPopupItem.appendChild(playlistSvgIcon);
        addPlaylistDivPopupItem.appendChild(playlistItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(addPlaylistDivPopupItem);

        //     TODO: Create the share container div item...
        const shareDivPopupItem = document.createElement("div");
        shareDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the playlistIconSvg...
        const shareSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        shareSvgIcon.setAttribute("height", "30");
        shareSvgIcon.setAttribute("viewBox", "0 0 24 24");
        shareSvgIcon.setAttribute("width", "30");
        shareSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const shareSvgIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        shareSvgIconPath.setAttribute("d", "M7,8L7,5l-7,7 7,7v-3l-4,-4 4,-4zM13,9L13,5l-7,7 7,7v-4.1c5,0 8.5,1.6 11,5.1 -1,-5 -4,-10 -11,-11z");
        shareSvgIconPath.setAttribute("fill", "rgba(0,0,0,1)");
        shareSvgIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        shareSvgIcon.appendChild(shareSvgIconPath);
        shareSvgIcon.classList.add("bottom-sheet-item-icon");
        shareSvgIcon.classList.add("right-to-left");

        //     Create the bottom sheet item title...
        const shareItemTitle = document.createElement("p");
        switch (selectedContentIndex) {
            case 1:
                shareItemTitle.innerText = "Share music link";
                break;
            case 2:
                shareItemTitle.innerText = "Share movie link";
                break;
            default:
                shareItemTitle.innerText = "Share video link";
        }
        shareItemTitle.classList.add("bottom-sheet-item-title");
        shareDivPopupItem.appendChild(shareSvgIcon);
        shareDivPopupItem.appendChild(shareItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(shareDivPopupItem);

        //     TODO: Create the share container div item...
        const notInterestedDivPopupItem = document.createElement("div");
        notInterestedDivPopupItem.classList.add("bottom-sheet-item-container");

        //     Create the notInterestedIconSvg...
        const notInterestedSvgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        notInterestedSvgIcon.setAttribute("height", "30");
        notInterestedSvgIcon.setAttribute("viewBox", "0 0 24 24");
        notInterestedSvgIcon.setAttribute("width", "30");
        notInterestedSvgIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const notInterestedSvgIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        notInterestedSvgIconPath.setAttribute("d", "M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10,-4.48 10,-10S17.52,2 12,2zM12,20c-4.42,0 -8,-3.58 -8,-8 0,-1.85 0.63,-3.55 1.69,-4.9L16.9,18.31C15.55,19.37 13.85,20 12,20zM18.31,16.9L7.1,5.69C8.45,4.63 10.15,4 12,4c4.42,0 8,3.58 8,8 0,1.85 -0.63,3.55 -1.69,4.9z");
        notInterestedSvgIconPath.setAttribute("fill", "rgba(0,0,0,1)");
        notInterestedSvgIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        notInterestedSvgIcon.appendChild(notInterestedSvgIconPath);
        notInterestedSvgIcon.classList.add("bottom-sheet-item-icon");

        //     Create the bottom sheet item title...
        const notInterestedItemTitle = document.createElement("p");
        switch (selectedContentIndex) {
            case 1:
                notInterestedItemTitle.innerText = "Not interested in this music";
                break;
            case 2:
                notInterestedItemTitle.innerText = "Not interested in this music";
                break;
            default:
                notInterestedItemTitle.innerText = "Not interested in this music";
        }
        notInterestedItemTitle.classList.add("bottom-sheet-item-title");
        notInterestedDivPopupItem.appendChild(notInterestedSvgIcon);
        notInterestedDivPopupItem.appendChild(notInterestedItemTitle);

        // TODO: APPEND ITEM TO THE DIV CONTAINER...
        moreOptionBottomDivContainer.appendChild(notInterestedDivPopupItem);

        const moreOptionBottomDivContainers = document.querySelectorAll(".bottom-sheet-item-container");
        moreOptionBottomDivContainers.forEach((container, index) => {
            container.ontouchstart = (event) => {
                /*moreOptionBottomDivOverlayContainer.style.pointerEvents = "none";*/
                event.stopPropagation();
                container.style.background = "rgba(0,0,0,0.13)";
            };
            container.ontouchend = () => {
                setTimeout(() => {
                    container.style.background = "none";
                }, 150);
            };
            container.ontouchcancel = () => {
                setTimeout(() => {
                    container.style.background = "none";
                }, 150);
            };

            container.onclick = (event) => {
                /*moreOptionBottomDivOverlayContainer.style.pointerEvents = "none";*/
                event.stopPropagation();
                container.style.background = "rgba(0,0,0,0.13)";
            };
            container.onmouseup = () => {
                setTimeout(() => {
                    container.style.background = "none";
                }, 150);
            };
            container.onmouseout = () => {
                setTimeout(() => {
                    container.style.background = "none";
                }, 150);
            };
        });
    }
}

function clearVidMusicMovBottomDiv() {
    moreOptionBottomDivContainer.classList.remove("active");
    setTimeout(() => {
        // Remove the bottom sheet layout items and divs...
        moreOptionBottomDivOverlayContainer.classList.remove("active");
        moreOptionBottomDivContainer.textContent = "";
        documentBody.style.overflow = "auto";
    }, 400);
}

function playPausePremiumVideoAd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (premiumVideoElement !== null && premiumVideoElement !== undefined) {
        if (premiumVideoElement.paused) {
            premiumVideoElement.play();
            premiumPauseAdsIcon.style.display = "block";
            premiumPlayAdsIcon.style.display = "none";
            premiumReplayAdsIcon.style.display = "none";
        } else {
            premiumVideoElement.pause();
            premiumPlayAdsIcon.style.display = "block";
            premiumPauseAdsIcon.style.display = "none";
            premiumReplayAdsIcon.style.display = "none";
        }
        premiumVideoElement.muted = false;
        premiumVideoElement.volume = 1;
    }
}

function togglePremiumVideoAdsDimContainer() {
    if (premiumVideoAdsContainerDim.classList.contains("active")) {
        premiumVideoAdsContainerDim.classList.remove("active");
    } else {
        premiumVideoAdsContainerDim.classList.add("active");
    }
}

function togglePremiumVideoAdsActionControlsVisibility(e) {
    //     Toggle all action controls after 800ms;
    e.preventDefault();
    e.stopPropagation();
    const toggleTimeOut = setTimeout(() => {
        if (premiumAdsTopActionControls.classList.contains("inactive")) {
            premiumAdsTopActionControls.classList.remove("inactive");
        } else {
            premiumAdsTopActionControls.classList.add("inactive");
        }

        if (premiumVideoPlayPauseHolder.classList.contains("inactive")) {
            premiumVideoPlayPauseHolder.classList.remove("inactive");
        } else {
            premiumVideoPlayPauseHolder.classList.add("inactive");
        }

        if (premiumAdsSponsoredCountText.classList.contains("inactive")) {
            premiumAdsSponsoredCountText.classList.remove("inactive");
        } else {
            premiumAdsSponsoredCountText.classList.add("inactive");
        }

        if (premiumFullscreenButtonHolder.classList.contains("inactive")) {
            premiumFullscreenButtonHolder.classList.remove("inactive");
        } else {
            premiumFullscreenButtonHolder.classList.add("inactive");
        }

        if (premiumAdsSkipContainer.classList.contains("inactive")) {
            premiumAdsSkipContainer.classList.remove("inactive");
        } else {
            premiumAdsSkipContainer.classList.add("inactive");
        }

        togglePremiumVideoAdsDimContainer();

        clearTimeout(toggleTimeOut);
    }, 800);
}

function getHtmlVideoDurationMMSS(duration) {
    return /*pad2(((duration / 3600) | 0).toString()) + " : " + */pad2(((duration / 60) | 0).toString()) + " : " + pad2(((duration % 60) | 0).toString());
}

function pad2(s) {
    return parseInt(s) < 10 ? "0" + s : s;
}

function getVideoIdFromThumbnail(value) {
    if (value !== null && value !== undefined && value.trim().length !== 0) {
        const splitter = value.split("/");
        return splitter[splitter.length - 2];
    }
    return null;
}

/**
 * index 0 => video thumbnail.
 * index 1 => video duration.
 * index 2 => video title.
 * index 3 => channel thumbnail.
 * index 4 => channel name.
 * */
function showVidMusicMovPlayPage(position, ...metadata) {
    if (position !== -1) {
        tabBox.style.display = "none";
        contentBox.style.display = "none";
        premiumVideoAdsContainerWrapper.style.display = "flex";
        /*TODO: To show player page and other videos...*/
        videoMusicMovieMetadataWrapper.style.display = "flex";
        premiumVideoAdsMetadataContainer.style.display = "flex";
        videoMusicMovieCommentDismissContainer.style.display = "none";
        /*TODO: To show the comment section*/
        /*videoMusicMovieFullCommentBottomDivContainer.style.display = "flex";*/
        /*videoMusicMovieCommentDismissContainer.style.display = "flex";*/
        /*if (premiumVideoAdsList !== null && premiumVideoAdsList.length !== 0) {
            shuffleJSON(premiumVideoAdsList);
            // Load ads automatically
            premiumVideoSource.setAttribute("src", premiumVideoAdsList[0][0]);
            premiumVideoSource.setAttribute("type", premiumVideoAdsList[0][1]);
            premiumVideoElement.load();
            premiumVideoElement.play();

            const premiumVideoCheckerLoadedData = setInterval(() => {
                premiumVideoElement.onloadeddata = () => {
                    premiumVideoElement.style.opacity = "1";
                    premiumVideoElement.currentTime = 0;
                    togglePremiumVideoAdsDimContainer();
                    premiumVideoElement.muted = false;
                    premiumVideoElement.volume = 1;
                    premiumPauseAdsIcon.style.display = "block";
                    premiumPlayAdsIcon.style.display = "none";
                    premiumReplayAdsIcon.style.display = "none";
                    /!*videoMusicAllCommentContainer.style.marginTop = videoMusicMovieCommentDismissContainer.offsetHeight + 1 + "px";*!/
                    /!*const premiumVideoAdsContainerWrapperOffsetHeight = premiumVideoAdsContainerWrapper.offsetHeight;
                    videoMusicMovieFullCommentBottomDivContainer.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";
                    videoMusicMovieMetadataWrapper.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";*!/
                    clearInterval(premiumVideoCheckerLoadedData);
                };
            }, 500);

            const premiumVideoCheckerMetadataLoad = setInterval(() => {
                premiumVideoElement.onloadedmetadata = () => {
                    premiumAdSponsorSpanCountDuration.innerText = premiumVideoAdsList.length > 1 ? `· 1 of ${(premiumVideoAdsList.length)} · ${getHtmlVideoDurationMMSS(premiumVideoElement.duration)}` : ` · ${getHtmlVideoDurationMMSS(premiumVideoElement.duration)}`;
                    premiumVideoElement.style.opacity = "1";
                    premiumVideoElement.muted = false;
                    premiumVideoElement.volume = 1;
                    /!*const premiumVideoAdsContainerWrapperOffsetHeight = premiumVideoAdsContainerWrapper.offsetHeight;
                    videoMusicMovieFullCommentBottomDivContainer.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";
                    videoMusicMovieMetadataWrapper.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";*!/
                    clearInterval(premiumVideoCheckerMetadataLoad);
                };
            }, 500);

            const adsCountdownTimer = setInterval(() => {
                if (premiumVideoElement !== null && premiumVideoElement !== undefined && !premiumVideoElement.ended) {
                    premiumVideoElement.style.opacity = "1";
                    premiumVideoElement.muted = false;
                    premiumVideoElement.volume = 1;
                    if (!premiumAdsHorizontalProgressContainer.classList.contains("active")) {
                        premiumAdsHorizontalProgressContainer.classList.add("active");
                    }
                    const watched = (premiumVideoElement.currentTime / premiumVideoElement.duration) * 100;
                    premiumAdsHorizontalProgressBar.style.cssText = `width: ${watched}` + "%";
                    premiumAdSponsorSpanCountDuration.innerText = premiumVideoAdsList.length > 1 ? `· 1 of ${(premiumVideoAdsList.length)} · ${getHtmlVideoDurationMMSS(premiumVideoElement.duration - premiumVideoElement.currentTime)}` : ` · ${getHtmlVideoDurationMMSS(premiumVideoElement.duration - premiumVideoElement.currentTime)}`;
                    const premiumVideoAdsContainerWrapperOffsetHeight = premiumVideoAdsContainerWrapper.offsetHeight;
                    videoMusicMovieFullCommentBottomDivContainer.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";
                    videoMusicMovieMetadataWrapper.style.marginTop = premiumVideoAdsContainerWrapperOffsetHeight + "px";
                }
            }, 0);

            premiumAdsLogo.src = premiumVideoAdsList[0][2];
            premiumAdsLogo.loading = "lazy";
            premiumAdsSponsor.innerText = premiumVideoAdsList[0][3];
            premiumAdsActionButton.innerText = premiumVideoAdsList[0][4];
            premiumVideoElement.addEventListener("click", (e) => togglePremiumVideoAdsActionControlsVisibility(e));
            premiumVideoElement.addEventListener("ended", (e) => {
                e.preventDefault();
                e.stopPropagation();
                premiumVideoElement.currentTime = 0;
                premiumReplayAdsIcon.style.display = "block";
                premiumPlayAdsIcon.style.display = "none";
                premiumPauseAdsIcon.style.display = "none";
                premiumAdsHorizontalProgressContainer.classList.remove("active");
            });
            premiumVideoAdsContainerDim.addEventListener("click", (e) => togglePremiumVideoAdsActionControlsVisibility(e));

            premiumVideoPlayPauseHolder.addEventListener("click", (e) => playPausePremiumVideoAd(e));

            if (metadata !== null && metadata.length !== 0) {
                videoMusicMovieTitle.innerText = `${metadata[2].textContent}`;
                videoMusicMovieViewsHashtagsPublished.innerHTML = `265k views 5m ago #subscribe<span class="video-music-movie-views-published-more-span">...more</span>`;

                const channelThumb = metadata[3].getAttribute("src");
                videoMusicMovieChannelThumbnail.setAttribute("src", channelThumb);
                videoMusicMovieChannelThumbnail.setAttribute("srcset", channelThumb);
                videoMusicMovieChannelName.innerHTML = `${metadata[4].textContent}<span class="video-music-movie-channel-subscribe-count">87.5k</span>`;
                videoMusicMovieSubscribeButton.innerText = "Subscribe";

                /!*TODO: Now we must first check if the thumbnail is still valid by making a get request to get the status code*!/
                const videoThumbnailUrl = metadata[0].getAttribute("src");
                alert("" + videoThumbnailUrl);
                fetch(videoThumbnailUrl)
                    .then(response => {
                        if (!response.ok) {
                            if (response.status >= 503) {
                                alert("Service Unavailable... Check your network connection");
                            }
                            throw new Error("Http Error: " + response.status);
                        }
                        return response.json();
                    })
                    .then(thumbnailAvailability => {
                        /!*TODO: Thumbnail is valid, get all the comments...*!/
                        /!*TODO: We need only the raw youtube video id...*!/
                        alert("Video is available...");
                    })
                    .catch(error => {
                        alert("Sorry. This video is unavailable");
                    });

                /!*videoMusicMovieTubeLikeDislikeVertSeparator.style.height = videoMusicMovieReactDownloadShareThanksRemixContainer.clientHeight + "px";*!/
            }

        }*/
        /*const heightChecker = setInterval(() => {
            if (premiumAdsFrame.contentWindow.document.body.scrollHeight > 0) {
                premiumAdsFrame.style.width = "100%";
                premiumAdsFrame.height = premiumAdsFrame.contentWindow.document.body.scrollHeight + "px";
                premiumAdsFrame.style.height = premiumAdsFrame.contentWindow.document.body.scrollHeight + "px";
                premiumAdsFrame.setAttribute("height", premiumAdsFrame.contentWindow.document.body.scrollHeight + "px");
                if (premiumAdsFrame.height === premiumAdsFrame.contentWindow.document.body.scrollHeight.toString()) {
                    /!*alert("Cool");*!/
                    premiumVideoElement.currentTime = 0;
                    premiumAdsVideoChecker.play();
                    premiumVideoElement.muted = false;
                    premiumVideoElement.volume = 1;
                    clearInterval(heightChecker);
                }
            }
        }, 500);*/
    }
}

function loadVideoTab() {
    fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/video.json")
        .then(response => {
            hasLoadedVideosAtZeroIndex = true;
            if (!response.ok) {
                /*alert(`Http Error ${response.status}`);*/
                console.error(`HTTP Error ${response.status}`);
                hasLoadedVideosAtZeroIndex = false;
                throw new Error(`HTTP Error ${response.status}`);
            }
            /*loadScript();*/
            hasLoadedVideosAtZeroIndex = true;
            return response.json();
        })
        .then(videosData => {
            hasLoadedVideosAtZeroIndex = true;
            console.log(`json: videos ${videosData.toString()}`);
            /*alert(`Good ${data.length}`);*/
            shuffleJSON(videosData);
            videosDataReference = videosData;
            if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
                shuffleJSON(vidAdsArray);
            }
            for (let c = 0; c < videosData.length; c++) {
                if (videosData[c] !== null && videosData[c] !== undefined) {
                    if (c === 10) {
                        break;
                    }
                    if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                        //     Create the Iframe to load ads webpage...
                        if (vidArrayPosition === vidAdsArray.length) {
                            vidArrayPosition = 0;
                        }
                        let iFrame = document.createElement("iframe");
                        iFrame.src = vidAdsArray[vidArrayPosition][1];
                        iFrame.height = "0";
                        iFrame.width = "0";
                        iFrame.classList.add("adsIframe");
                        allContent[0].appendChild(iFrame);
                        /*iFrame.onload = function () {
                            this.contentWindow.location.reload();
                            this.onload = null;
                        };*/
                        let heightChecker = setInterval(() => {
                            if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                iFrame.style.width = "100%";
                                iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                    /*alert("Cool");*/
                                    clearInterval(heightChecker);
                                }
                            }
                        }, 500);
                        vidArrayPosition++;
                    }

                    let channelAvatar = videosData[c].channelAvatar;
                    let channelId = videosData[c].channelId;
                    let channelName = videosData[c].channelName;
                    let duration = videosData[c].duration;
                    let videoId = videosData[c].id;
                    let videoTitle = videosData[c].title;
                    console.log(`json at array index ${c} : \nid: ${videosData[c].id}\nbody: ${videosData[c].body}\nseverity: ${videosData[c].severity}\nstatus: ${videosData[c].status}`);
                    // Create the video container...
                    let videoCard = document.createElement("div");
                    videoCard.style.width = "100%";
                    videoCard.style.height = "auto";
                    videoCard.style.background = "#ffffff";
                    videoCard.classList.add("videoMainContainer");

                    // Create the thumbnail container
                    let videoThumbContainer = document.createElement("div");
                    videoThumbContainer.classList.add("thumbnailContainer");

                    // Create the thumbnail image...
                    let videoThumbnail = document.createElement("img");
                    videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.alt = "";
                    videoThumbnail.style.width = "100%";
                    videoThumbnail.style.height = "auto";
                    videoThumbnail.loading = "lazy";
                    videoThumbnail.classList.add("videoThumbnail")
                    videoThumbnail.onerror = () => {
                        videoCard.style.display = "none";
                    }

                    // Create the play pause holder
                    let playPauseHolder = document.createElement("div");
                    playPauseHolder.classList.add("play-pause-holder");

                    // Create the play button image
                    let play = document.createElement("img");
                    /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                    play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.alt = "";
                    play.style.width = "90%";
                    play.style.height = "auto";
                    play.loading = "lazy";
                    play.classList.add("play");

                    // Create the video duration text
                    let videoDuration = document.createElement("p");
                    videoDuration.innerText = getTimeInHhMmSsString(duration);
                    videoDuration.classList.add("duration");

                    playPauseHolder.appendChild(play);
                    videoThumbContainer.appendChild(videoThumbnail);
                    videoThumbContainer.appendChild(videoDuration);
                    videoThumbContainer.appendChild(playPauseHolder);
                    /*videoThumbContainer.appendChild(addButtonHolder);*/

                    // Create the metadata container
                    let metadataContainer = document.createElement("div");
                    metadataContainer.classList.add("metadataContainer");

                    // Create the videoTitle
                    let videoTitleDom = document.createElement("p");
                    videoTitleDom.innerText = videoTitle;
                    videoTitleDom.classList.add("videoTitle");

                    // Create bottom metadata container
                    let bottomMetadata = document.createElement("div");
                    bottomMetadata.classList.add("bottomMetadata");

                    // Create the channel thumbnail
                    let channelThumbnail = document.createElement("img");
                    channelThumbnail.src = `${channelAvatar}`;
                    channelThumbnail.srcset = `${channelAvatar}`;
                    channelThumbnail.alt = "";
                    channelThumbnail.style.width = "5%";
                    channelThumbnail.style.height = "5%";
                    channelThumbnail.loading = "lazy";
                    channelThumbnail.style.borderRadius = "50%";
                    channelThumbnail.classList.add("channel_thumbnail");

                    // Create the channel name
                    let channelNameDom = document.createElement("p");
                    channelNameDom.innerText = channelName;
                    channelNameDom.classList.add("channel_name");

                    // Create more vertical icons holder
                    let moreVertHolder = document.createElement("div");
                    moreVertHolder.classList.add("more_vert_holder");

                    // Create more vertical icons
                    let moreVert = document.createElement("img");
                    moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                    moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                    moreVert.alt = "";
                    moreVert.loading = "eager";
                    moreVert.classList.add("more-vert");

                    moreVertHolder.appendChild(moreVert);
                    bottomMetadata.appendChild(channelThumbnail);
                    bottomMetadata.appendChild(channelNameDom);
                    bottomMetadata.appendChild(moreVertHolder);

                    // Create divider
                    let divider = document.createElement("hr");
                    divider.style.backgroundColor = "rgb(0,0,0)";
                    divider.style.width = "100%";
                    divider.classList.add("divider");

                    metadataContainer.appendChild(videoTitleDom);
                    metadataContainer.appendChild(bottomMetadata);

                    videoCard.appendChild(videoThumbContainer);
                    /*videoCard.appendChild(addButtonHolder);*/
                    videoCard.appendChild(metadataContainer);
                    videoCard.appendChild(divider);
                    allContent[0].appendChild(videoCard);

                    const moreVertHolders = document.querySelectorAll(".more_vert_holder");
                    const playPauseHolders = document.querySelectorAll(".play-pause-holder");

                    const videoThumbnails = document.querySelectorAll(".videoThumbnail");
                    const videoDurations = document.querySelectorAll(".duration");
                    const videoTitles = document.querySelectorAll(".videoTitle");
                    const channelThumbnails = document.querySelectorAll(".channel_thumbnail");
                    const channelNames = document.querySelectorAll(".channel_name");
                    moreVertHolders.forEach((moreVertHolder, position) => {
                        moreVertHolders[position].onmouseup = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].onmouseout = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].onmousedown = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };
                        moreVertHolders[position].ontouchcancel = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].ontouchend = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].ontouchstart = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };

                        moreVertHolders[position].onclick = () => {
                            //     It's time to show bottom popup
                            if (!moreOptionBottomDivOverlayContainer.classList.contains("active".trim())) {
                                moreOptionBottomDivOverlayContainer.classList.add("active");
                                documentBody.style.overflow = "hidden";
                                setTimeout(() => {
                                    // Add the bottom sheet layout items and divs...
                                    addVidMusicMoviesBottomSheetVertPopupItems(position,);
                                    moreOptionBottomDivContainer.classList.add("active");
                                }, 400);
                            } else {
                                clearVidMusicMovBottomDiv();
                            }

                        }

                        playPauseHolders[position].onclick = (event) => {
                            showVidMusicMovPlayPage(position, videoThumbnails[position], videoDurations[position], videoTitles[position], channelThumbnails[position], channelNames[position]);
                        };
                    });
                    /*if (c === (data.length - 1)) {
                        shuffleItems();
                    }*/
                    lastLoadedVideoIndex = c;
                }
            }

        })
        .catch(error => {
            hasLoadedVideosAtZeroIndex = false;
        });
}

loadScript();

function loadMusicTab() {
    fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/music.json")
        .then(response => {
            hasLoadedMusicAtFirstIndex = true;
            if (!response.ok) {
                /*alert(`Http Error ${response.status}`);*/
                console.error(`HTTP Error ${response.status}`);
                hasLoadedMusicAtFirstIndex = false;
                throw new Error(`HTTP Error ${response.status}`);
            }
            /*loadScript();*/
            hasLoadedMusicAtFirstIndex = true;
            return response.json();
        })
        .then(musicData => {
            hasLoadedMusicAtFirstIndex = true;
            console.log(`json: ${musicData.toString()}`);
            /*alert(`Good ${data.length}`);*/
            shuffleJSON(musicData);
            musicDataReference = musicData;
            // TODO: PLEASE REMEMBER TO CHANGE THIS AND USE MUSIC ADS INSTEAD
            if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
                shuffleJSON(vidAdsArray);
            }
            for (let c = 0; c < musicData.length; c++) {
                if (musicData[c] !== null && musicData[c] !== undefined) {
                    if (c === 10) {
                        break;
                    }
                    if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                        //     Create the Iframe to load ads webpage...
                        if (vidArrayPosition === vidAdsArray.length) {
                            vidArrayPosition = 0;
                        }
                        let iFrame = document.createElement("iframe");
                        iFrame.src = vidAdsArray[vidArrayPosition][1];
                        iFrame.height = "0";
                        iFrame.width = "0";
                        iFrame.classList.add("adsIframe");
                        allContent[selectedContentIndex].appendChild(iFrame);
                        /*iFrame.onload = function () {
                            this.contentWindow.location.reload();
                            this.onload = null;
                        };*/
                        let heightChecker = setInterval(() => {
                            if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                iFrame.style.width = "100%";
                                iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                    /*alert("Cool");*/
                                    clearInterval(heightChecker);
                                }
                            }
                        }, 500);
                        vidArrayPosition++;
                    }
                    let channelAvatar = musicData[c].channelAvatar;
                    let channelId = musicData[c].channelId;
                    let channelName = musicData[c].channelName;
                    let duration = musicData[c].duration;
                    let videoId = musicData[c].id;
                    let videoTitle = musicData[c].title;
                    console.log(`json at array index ${c} : \nid: ${musicData[c].id}\nbody: ${musicData[c].body}\nseverity: ${musicData[c].severity}\nstatus: ${musicData[c].status}`);
                    // Create the video container...
                    let videoCard = document.createElement("div");
                    videoCard.style.width = "100%";
                    videoCard.style.height = "auto";
                    videoCard.style.background = "#ffffff";
                    videoCard.classList.add("videoMainContainer");

                    // Create the thumbnail container
                    let videoThumbContainer = document.createElement("div");
                    videoThumbContainer.classList.add("thumbnailContainer");

                    // Create the thumbnail image...
                    let videoThumbnail = document.createElement("img");
                    videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.alt = "";
                    videoThumbnail.style.width = "100%";
                    videoThumbnail.style.height = "auto";
                    videoThumbnail.loading = "lazy";
                    videoThumbnail.classList.add("videoThumbnail")
                    videoThumbnail.onerror = () => {
                        videoCard.style.display = "none";
                    }

                    // Create the play pause holder
                    let playPauseHolder = document.createElement("div");
                    playPauseHolder.classList.add("play-pause-holder");

                    // Create the play button image
                    let play = document.createElement("img");
                    /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                    play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.alt = "";
                    play.style.width = "90%";
                    play.style.height = "auto";
                    play.loading = "lazy";
                    play.classList.add("play");

                    // Create the video duration text
                    let videoDuration = document.createElement("p");
                    videoDuration.innerText = getTimeInHhMmSsString(duration);
                    videoDuration.classList.add("duration");

                    playPauseHolder.appendChild(play);
                    videoThumbContainer.appendChild(videoThumbnail);
                    videoThumbContainer.appendChild(videoDuration);
                    videoThumbContainer.appendChild(playPauseHolder);
                    /*videoThumbContainer.appendChild(addButtonHolder);*/

                    // Create the metadata container
                    let metadataContainer = document.createElement("div");
                    metadataContainer.classList.add("metadataContainer");

                    // Create the videoTitle
                    let videoTitleDom = document.createElement("p");
                    videoTitleDom.innerText = videoTitle;
                    videoTitleDom.classList.add("videoTitle");

                    // Create bottom metadata container
                    let bottomMetadata = document.createElement("div");
                    bottomMetadata.classList.add("bottomMetadata");

                    // Create the channel thumbnail
                    let channelThumbnail = document.createElement("img");
                    channelThumbnail.src = `${channelAvatar}`;
                    channelThumbnail.srcset = `${channelAvatar}`;
                    channelThumbnail.alt = "";
                    channelThumbnail.style.width = "5%";
                    channelThumbnail.style.height = "5%";
                    channelThumbnail.loading = "lazy";
                    channelThumbnail.style.borderRadius = "50%";
                    channelThumbnail.classList.add("channel_thumbnail");

                    // Create the channel name
                    let channelNameDom = document.createElement("p");
                    channelNameDom.innerText = channelName;
                    channelNameDom.classList.add("channel_name");

                    // Create more vertical icons holder
                    let moreVertHolder = document.createElement("div");
                    moreVertHolder.classList.add("more_vert_holder");

                    // Create more vertical icons
                    let moreVert = document.createElement("img");
                    moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                    moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                    moreVert.alt = "";
                    moreVert.loading = "eager";
                    moreVert.classList.add("more-vert");

                    moreVertHolder.appendChild(moreVert);
                    bottomMetadata.appendChild(channelThumbnail);
                    bottomMetadata.appendChild(channelNameDom);
                    bottomMetadata.appendChild(moreVertHolder);

                    // Create divider
                    let divider = document.createElement("hr");
                    divider.style.backgroundColor = "rgb(0,0,0)";
                    divider.style.width = "100%";
                    divider.classList.add("divider");

                    metadataContainer.appendChild(videoTitleDom);
                    metadataContainer.appendChild(bottomMetadata);

                    videoCard.appendChild(videoThumbContainer);
                    /*videoCard.appendChild(addButtonHolder);*/
                    videoCard.appendChild(metadataContainer);
                    videoCard.appendChild(divider);
                    allContent[selectedContentIndex].appendChild(videoCard);

                    let moreVertHolders = document.querySelectorAll(".more_vert_holder");
                    moreVertHolders.forEach((moreVertHolder, position) => {
                        moreVertHolders[position].onmouseup = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].onmouseout = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].onmousedown = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };
                        moreVertHolders[position].ontouchcancel = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].ontouchend = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].ontouchstart = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };

                    });
                    /*if (c === (data.length - 1)) {
                        shuffleItems();
                    }*/
                    lastLoadedMusicIndex = c;
                }
            }

        })
        .catch(error => {
            console.error(`Music tab fetch error: ${error}`);
            hasLoadedMusicAtFirstIndex = false;
        });
}

function loadMoviesTab() {
    fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/movie.json")
        .then(response => {
            hasLoadedMoviesAtSecondIndex = true;
            if (!response.ok) {
                /*alert(`Http Error ${response.status}`);*/
                console.error(`HTTP Error ${response.status}`);
                hasLoadedMoviesAtSecondIndex = false;
                throw new Error(`HTTP Error ${response.status}`);
            }
            /*loadScript();*/
            hasLoadedMoviesAtSecondIndex = true;
            return response.json();
        })
        .then(moviesData => {
            hasLoadedMoviesAtSecondIndex = true;
            console.log(`json: ${moviesData.toString()}`);
            /*alert(`Good ${data.length}`);*/
            shuffleJSON(moviesData);
            moviesDataReference = moviesData;
            // TODO: PLEASE REMEMBER TO CHANGE THIS AND USE MOVIES ADS INSTEAD
            if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
                shuffleJSON(vidAdsArray);
            }
            for (let c = 0; c < moviesData.length; c++) {
                if (moviesData[c] !== null && moviesData[c] !== undefined) {
                    if (c === 10) {
                        break;
                    }
                    if (/*c !== 0 && */c % 5 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                        //     Create the Iframe to load ads webpage...
                        if (vidArrayPosition === vidAdsArray.length) {
                            vidArrayPosition = 0;
                        }
                        let iFrame = document.createElement("iframe");
                        iFrame.src = vidAdsArray[vidArrayPosition][1];
                        iFrame.height = "0";
                        iFrame.width = "0";
                        iFrame.classList.add("adsIframe");
                        allContent[selectedContentIndex].appendChild(iFrame);
                        /*iFrame.onload = function () {
                            this.contentWindow.location.reload();
                            this.onload = null;
                        };*/
                        let heightChecker = setInterval(() => {
                            if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                iFrame.style.width = "100%";
                                iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                    /*alert("Cool");*/
                                    clearInterval(heightChecker);
                                }
                            }
                        }, 500);
                        vidArrayPosition++;
                    }
                    let channelAvatar = moviesData[c].channelAvatar;
                    let channelId = moviesData[c].channelId;
                    let channelName = moviesData[c].channelName;
                    let duration = moviesData[c].duration;
                    let videoId = moviesData[c].id;
                    let videoTitle = moviesData[c].title;
                    console.log(`json at array index ${c} : \nid: ${moviesData[c].id}\nbody: ${moviesData[c].body}\nseverity: ${moviesData[c].severity}\nstatus: ${moviesData[c].status}`);
                    // Create the video container...
                    let videoCard = document.createElement("div");
                    videoCard.style.width = "100%";
                    videoCard.style.height = "auto";
                    videoCard.style.background = "#ffffff";
                    videoCard.classList.add("videoMainContainer");

                    // Create the thumbnail container
                    let videoThumbContainer = document.createElement("div");
                    videoThumbContainer.classList.add("thumbnailContainer");

                    // Create the thumbnail image...
                    let videoThumbnail = document.createElement("img");
                    videoThumbnail.src = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.srcset = `https://img.youtube.com/vi_webp/${videoId}/maxresdefault.webp`;
                    videoThumbnail.alt = "";
                    videoThumbnail.style.width = "100%";
                    videoThumbnail.style.height = "auto";
                    videoThumbnail.loading = "lazy";
                    videoThumbnail.classList.add("videoThumbnail")
                    videoThumbnail.onerror = () => {
                        videoCard.style.display = "none";
                    }

                    // Create the play pause holder
                    let playPauseHolder = document.createElement("div");
                    playPauseHolder.classList.add("play-pause-holder");

                    // Create the play button image
                    let play = document.createElement("img");
                    /*play.setAttribute("s", "../assets/svg/ic_baseline_play_arrow_24.svg");*/
                    play.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/ic_baseline_play_arrow_24.svg";
                    play.alt = "";
                    play.style.width = "90%";
                    play.style.height = "auto";
                    play.loading = "lazy";
                    play.classList.add("play");

                    // Create the video duration text
                    let videoDuration = document.createElement("p");
                    videoDuration.innerText = getTimeInHhMmSsString(duration);
                    videoDuration.classList.add("duration");

                    playPauseHolder.appendChild(play);
                    videoThumbContainer.appendChild(videoThumbnail);
                    videoThumbContainer.appendChild(videoDuration);
                    videoThumbContainer.appendChild(playPauseHolder);
                    /*videoThumbContainer.appendChild(addButtonHolder);*/

                    // Create the metadata container
                    let metadataContainer = document.createElement("div");
                    metadataContainer.classList.add("metadataContainer");

                    // Create the videoTitle
                    let videoTitleDom = document.createElement("p");
                    videoTitleDom.innerText = videoTitle;
                    videoTitleDom.classList.add("videoTitle");

                    // Create bottom metadata container
                    let bottomMetadata = document.createElement("div");
                    bottomMetadata.classList.add("bottomMetadata");

                    // Create the channel thumbnail
                    let channelThumbnail = document.createElement("img");
                    channelThumbnail.src = `${channelAvatar}`;
                    channelThumbnail.srcset = `${channelAvatar}`;
                    channelThumbnail.alt = "";
                    channelThumbnail.style.width = "5%";
                    channelThumbnail.style.height = "5%";
                    channelThumbnail.loading = "lazy";
                    channelThumbnail.style.borderRadius = "50%";
                    channelThumbnail.classList.add("channel_thumbnail");

                    // Create the channel name
                    let channelNameDom = document.createElement("p");
                    channelNameDom.innerText = channelName;
                    channelNameDom.classList.add("channel_name");

                    // Create more vertical icons holder
                    let moreVertHolder = document.createElement("div");
                    moreVertHolder.classList.add("more_vert_holder");

                    // Create more vertical icons
                    let moreVert = document.createElement("img");
                    moreVert.src = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg"
                    moreVert.srcset = "https://techbrocode.github.io/JetPlayWeb/4250142091/assets/svg/more_vert_24dp_FILL1_wght400_GRAD0_opsz24.svg";
                    moreVert.alt = "";
                    moreVert.loading = "eager";
                    moreVert.classList.add("more-vert");

                    moreVertHolder.appendChild(moreVert);
                    bottomMetadata.appendChild(channelThumbnail);
                    bottomMetadata.appendChild(channelNameDom);
                    bottomMetadata.appendChild(moreVertHolder);

                    // Create divider
                    let divider = document.createElement("hr");
                    divider.style.backgroundColor = "rgb(0,0,0)";
                    divider.style.width = "100%";
                    divider.classList.add("divider");

                    metadataContainer.appendChild(videoTitleDom);
                    metadataContainer.appendChild(bottomMetadata);

                    videoCard.appendChild(videoThumbContainer);
                    /*videoCard.appendChild(addButtonHolder);*/
                    videoCard.appendChild(metadataContainer);
                    videoCard.appendChild(divider);
                    allContent[selectedContentIndex].appendChild(videoCard);

                    let moreVertHolders = document.querySelectorAll(".more_vert_holder");
                    moreVertHolders.forEach((moreVertHolder, position) => {
                        moreVertHolders[position].onmouseup = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].onmouseout = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].onmousedown = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };
                        moreVertHolders[position].ontouchcancel = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };
                        moreVertHolders[position].ontouchend = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolders[position].style.backgroundColor = "rgba(255, 255, 255, 1)";
                                clearInterval(clearBackground);
                            }, 150);
                        };

                        moreVertHolders[position].ontouchstart = () => {
                            moreVertHolders[position].style.backgroundColor = "rgb(228,228,228)";
                        };

                    });
                    /*if (c === (data.length - 1)) {
                        shuffleItems();
                    }*/
                    lastLoadedMoviesIndex = c;
                }
            }

        })
        .catch(error => {
            console.error(`Movies tab fetch error: ${error}`);
            hasLoadedMoviesAtSecondIndex = false;
        });
}

function loadMoreCollectionsTabInSpecificCategory(showMoreButtonClickedPosition, sectionElementContainerAtSpecificCategory, showMoreButton, gridParentHolder) {
    if (pictureCollections !== null && pictureCollections !== undefined) {
        /*alert(`${showMoreButtonClickedPosition} is having ${pictureCollections[showMoreButtonClickedPosition][2]}`)*/
        if (pictureCollections[showMoreButtonClickedPosition][2] !== -1 && pictureCollections[showMoreButtonClickedPosition][3] !== null && pictureCollections[showMoreButtonClickedPosition][3].length !== 0) {
            const multipliedValue = pictureCollections[showMoreButtonClickedPosition][2] + 20 + 1 //to make grid numbering even;
            const collectionsData = JSON.parse(pictureCollections[showMoreButtonClickedPosition][3]);
            //     Now, add more children...
            if (collectionsData.length > 0) {
                for (let i = (pictureCollections[showMoreButtonClickedPosition][2] + 1); i < collectionsData.length; i++) {
                    // This line will rarely execute...
                    if (i === collectionsData.length - 1) {
                        // First remove the show more button from the sectionContainer...
                        sectionElementContainerAtSpecificCategory.removeChild(showMoreButton);
                    }
                    if (i === multipliedValue) {
                        // first add and make the show more button visible then, break from loop
                        sectionElementContainerAtSpecificCategory.appendChild(showMoreButton);
                        break;
                    }
                    // Show ads
                    if (/*i !== 0 && */i % 4 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                        //     Create the Iframe to load ads webpage...
                        if (vidArrayPosition === vidAdsArray.length) {
                            vidArrayPosition = 0;
                        }
                        let iFrame = document.createElement("iframe");
                        iFrame.src = vidAdsArray[vidArrayPosition][1];
                        iFrame.height = "0";
                        iFrame.width = "0";
                        iFrame.classList.add("adsIframe");
                        allContent[selectedContentIndex].appendChild(iFrame);

                        let heightChecker = setInterval(() => {
                            if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                iFrame.style.width = "100%";
                                iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                    /*alert("Cool");*/
                                    clearInterval(heightChecker);
                                }
                            }
                        }, 500);
                        vidArrayPosition++;
                    }
                    const portraitSrc = collectionsData[i].src.portrait;
                    const title = collectionsData[i].alt;
                    //     Create the gridChild
                    const gridChild = document.createElement("div");
                    gridChild.classList.add("grid_child");

                    //     Create the thumbnail...
                    const thumbnail = document.createElement("img");
                    thumbnail.src = portraitSrc;
                    thumbnail.srcset = portraitSrc;
                    thumbnail.alt = "";
                    thumbnail.style.width = "100%";
                    thumbnail.style.height = "100%";
                    thumbnail.loading = "lazy";
                    thumbnail.classList.add("thumbnail");
                    thumbnail.onerror = () => {
                        gridChild.style.display = "none";
                    }

                    //  Create the more vert holder...
                    const moreVertHolder = document.createElement("div");
                    moreVertHolder.classList.add("collections_more_vert_holder");

                    //     Create the svg more vert icon...
                    const collectionsMoreVertIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    collectionsMoreVertIcon.setAttribute("height", "18");
                    collectionsMoreVertIcon.setAttribute("viewBox", "0 -960 960 960");
                    collectionsMoreVertIcon.setAttribute("width", "18");
                    collectionsMoreVertIcon.classList.add("collections-more-vert-icon");
                    collectionsMoreVertIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                    //     Create the svg path....
                    const collectionsMoreVertIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    collectionsMoreVertIconPath.setAttribute("d", "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z");
                    collectionsMoreVertIconPath.setAttribute("fill", "#ffffff");
                    collectionsMoreVertIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                    collectionsMoreVertIcon.appendChild(collectionsMoreVertIconPath);
                    moreVertHolder.appendChild(collectionsMoreVertIcon);

                    //     Create the picture title element
                    const pictureTitleElement = document.createElement("p");
                    pictureTitleElement.innerText = title;
                    pictureTitleElement.classList.add("picture-title");

                    gridChild.appendChild(thumbnail);
                    gridChild.appendChild(moreVertHolder);
                    gridChild.appendChild(pictureTitleElement);


                    gridParentHolder.appendChild(gridChild);
                    pictureCollections[showMoreButtonClickedPosition][2] = i;
                }

                let collectionsMoreVertHolders = document.querySelectorAll(".collections_more_vert_holder");
                let showMoreButtons = document.querySelectorAll(".show-more");
                const sectionElementContainers = document.querySelectorAll(".section");
                const gridParentHolders = document.querySelectorAll(".grid-parent");
                const thumbnails = document.querySelectorAll(".thumbnail");

                collectionsMoreVertHolders.forEach((moreVertHolder, index) => {
                    moreVertHolder.onmouseup = () => {
                        let clearBackground = setInterval(() => {
                            moreVertHolder.style.background = "none";
                            clearInterval(clearBackground);
                        }, 150);
                    }
                    moreVertHolder.onmouseout = () => {
                        let clearBackground = setInterval(() => {
                            moreVertHolder.style.background = "none";
                            clearInterval(clearBackground);
                        }, 150);
                    }

                    moreVertHolder.onmousedown = () => {
                        moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                    }
                    moreVertHolder.ontouchend = () => {
                        let clearBackground = setInterval(() => {
                            moreVertHolder.style.background = "none";
                            clearInterval(clearBackground);
                        }, 150);
                    }
                    moreVertHolder.ontouchcancel = () => {
                        let clearBackground = setInterval(() => {
                            moreVertHolder.style.background = "none";
                            clearInterval(clearBackground);
                        }, 150);
                    }

                    moreVertHolder.ontouchstart = () => {
                        moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                    }

                    showMoreButtons.forEach((showMoreButton, index) => {
                        showMoreButton.onmouseup = () => {
                            let clearBackground = setInterval(() => {
                                showMoreButton.style.background = "#eaeaea";
                                clearInterval(clearBackground);
                            }, 150)
                        };
                        showMoreButton.onmouseout = () => {
                            let clearBackground = setInterval(() => {
                                showMoreButton.style.background = "#eaeaea";
                                clearInterval(clearBackground);
                            }, 150)
                        };
                        showMoreButton.onmousedown = () => {
                            showMoreButton.style.background = "#bcbcbc";
                        };
                        showMoreButton.ontouchstart = () => {
                            showMoreButton.style.background = "#bcbcbc";
                        };
                        showMoreButton.ontouchend = () => {
                            let clearBackground = setInterval(() => {
                                showMoreButton.style.background = "#eaeaea";
                                clearInterval(clearBackground);
                            }, 150)
                        };
                        showMoreButton.ontouchcancel = () => {
                            let clearBackground = setInterval(() => {
                                showMoreButton.style.background = "#eaeaea";
                                clearInterval(clearBackground);
                            }, 150)
                        };
                        showMoreButton.onclick = () => {
                            loadMoreCollectionsTabInSpecificCategory(index, sectionElementContainers[index], showMoreButton, gridParentHolders[index]);
                        }
                    });

                    thumbnails.forEach((thumbnail, index) => {
                        thumbnail.onclick = () => {
                            /*alert(`index ${index} clicked`);*/
                            getCollectionsThumbnailMetadata(index, thumbnails[index]);
                        };
                    });

                });
            }
        }
    }
}

function isAlmostAtPageBottom() {
    const scrolledTo = window.scrollY + window.innerHeight;
    const scrollThreshold = 300;
    return document.body.scrollHeight - scrollThreshold <= scrolledTo;
}

function createCollectionsImageViewerPage(parentContainer, imageSrc, ...metadata) {
    if (imageSrc !== null && imageSrc !== undefined && imageSrc.toString().trim().length !== 0 && metadata !== null && metadata !== undefined && metadata.length !== 0) {
        //     create the collections image container...
        const collectionsImageContainer = document.createElement("div");
        collectionsImageContainer.classList.add("collections-image-container");

        //     Create the collection image src tag
        const imageType = document.createElement("img");
        imageType.src = imageSrc;
        imageType.srcset = imageSrc;
        imageType.alt = "";
        imageType.loading = "lazy";
        imageType.classList.add("collection-image-src");
        imageType.onerror = () => parentContainer.removeChild(collectionsImageContainer);

        // Create the title cancel image holder...
        const collectionsImageTitleCancelHolder = document.createElement("div");
        collectionsImageTitleCancelHolder.classList.add("collections-image-title-cancel-Holder");

        // create the back button image holder...
        const collectionsBackButtonHolder = document.createElement("div");
        collectionsBackButtonHolder.classList.add("collections-image-back-button_vert_holder");

        // Create the back button svg icon...

        const collectionBackButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        collectionBackButtonIcon.setAttribute("height", "20");
        collectionBackButtonIcon.setAttribute("viewBox", "0 0 24 24");
        collectionBackButtonIcon.setAttribute("width", "20");
        collectionBackButtonIcon.classList.add("more-vert-download-icon");
        collectionBackButtonIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const collectionBackButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        collectionBackButtonIconPath.setAttribute("d", "M15.41,16.59L10.83,12l4.58,-4.59L14,6l-6,6 6,6 1.41,-1.41z");
        collectionBackButtonIconPath.setAttribute("fill", "#ffffff");
        collectionBackButtonIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        collectionBackButtonIcon.appendChild(collectionBackButtonIconPath);
        collectionsBackButtonHolder.appendChild(collectionBackButtonIcon);

        // Create the image title element
        const imageTitle = document.createElement("p");
        metadata[4].trim() === "Original size".trim() ? imageTitle.innerText = metadata[3] + ` (${metadata[4]})` : imageTitle.innerText = metadata[3] + ` (${metadata[5]} X ${metadata[6]})`;
        imageTitle.classList.add("collections-image-title");

        collectionsImageTitleCancelHolder.appendChild(collectionsBackButtonHolder);
        collectionsImageTitleCancelHolder.appendChild(imageTitle);

        //     Create the more vert holder
        const collectionImageViewerMoreVertHolder = document.createElement("div");
        collectionImageViewerMoreVertHolder.classList.add("collections-image-more_vert_holder");

        //     Create the moreVertIconSvg...
        const collectionImageViewerMoreVertHolderIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        collectionImageViewerMoreVertHolderIcon.setAttribute("height", "20");
        collectionImageViewerMoreVertHolderIcon.setAttribute("viewBox", "0 -960 960 960");
        collectionImageViewerMoreVertHolderIcon.setAttribute("width", "20");
        collectionImageViewerMoreVertHolderIcon.classList.add("more-vert-download-icon");
        collectionImageViewerMoreVertHolderIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const collectionsMoreVertIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        collectionsMoreVertIconPath.setAttribute("d", "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z");
        collectionsMoreVertIconPath.setAttribute("fill", "#ffffff");
        collectionsMoreVertIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the download holder...
        const collectionImageViewerDownloadHolder = document.createElement("div");
        collectionImageViewerDownloadHolder.classList.add("download-holder");

        //     Create the downloadIconSvg...
        const collectionImageViewerDownloadHolderIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        collectionImageViewerDownloadHolderIcon.setAttribute("height", "20");
        collectionImageViewerDownloadHolderIcon.setAttribute("viewBox", "0 0 24 24");
        collectionImageViewerDownloadHolderIcon.setAttribute("width", "20");
        collectionImageViewerDownloadHolderIcon.classList.add("more-vert-download-icon");
        collectionImageViewerDownloadHolderIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        //     Create the svg path....
        const collectionsDownloadIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        collectionsDownloadIconPath.setAttribute("d", "M5,20h14v-2H5V20zM19,9h-4V3H9v6H5l7,7L19,9z");
        collectionsDownloadIconPath.setAttribute("fill", "#ffffff");
        collectionsDownloadIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

        collectionImageViewerMoreVertHolderIcon.appendChild(collectionsMoreVertIconPath);
        collectionImageViewerMoreVertHolder.appendChild(collectionImageViewerMoreVertHolderIcon);

        collectionImageViewerDownloadHolderIcon.appendChild(collectionsDownloadIconPath);
        collectionImageViewerDownloadHolder.appendChild(collectionImageViewerDownloadHolderIcon);

        collectionsImageContainer.appendChild(imageType);
        collectionsImageContainer.appendChild(collectionsImageTitleCancelHolder);
        collectionsImageContainer.appendChild(collectionImageViewerMoreVertHolder);
        collectionsImageContainer.appendChild(collectionImageViewerDownloadHolder);
        parentContainer.appendChild(collectionsImageContainer);
    }
}

function getCollectionsThumbnailMetadata(collectionThumbnailClickPosition, collectionThumbnail) {
    // show a dialog to prevent user interaction please in case there are very large set of files...
    if (pictureCollections !== null && pictureCollections !== undefined && pictureCollections instanceof Array && pictureCollections.length !== 0) {
        outerLoop:
            for (let c = 0; c < pictureCollections.length; c++) {
                //     Now, we're inside the parent array, now we'll iterate again to enter each child array
                for (let i = 0; i < pictureCollections[c].length; i++) {
                    //     Now we'll locate the third index which contains the collectionData Json String and check if string value is null or empty
                    if (pictureCollections[c][3] !== null && pictureCollections[c][3].trim().length !== 0) {
                        //     Convert the string back to json and loop...
                        const jsonFromConvertedString = JSON.parse(pictureCollections[c][3]);
                        //     Check if json is not null && json length is not zero...
                        if (jsonFromConvertedString !== null && jsonFromConvertedString.length !== 0) {
                            for (let j = 0; j < jsonFromConvertedString.length; j++) {
                                const thumbnailSrcUrl = collectionThumbnail.getAttribute("src");

                                if (thumbnailSrcUrl !== null && thumbnailSrcUrl !== undefined && thumbnailSrcUrl.trim().length !== 0 && thumbnailSrcUrl.trim() === jsonFromConvertedString[j].src.portrait.trim()) {
                                    // j is the index, now we have to fetch all contents from there...
                                    const photographerName = jsonFromConvertedString[j].photographer;
                                    const photographerId = jsonFromConvertedString[j].photographer_id;
                                    const originalSize = jsonFromConvertedString[j].src.original;
                                    const large2x = jsonFromConvertedString[j].src.large2x;
                                    const large = jsonFromConvertedString[j].src.large;
                                    const medium = jsonFromConvertedString[j].src.medium;
                                    const smallSize = jsonFromConvertedString[j].src.small;
                                    const portrait = jsonFromConvertedString[j].src.portrait;
                                    const landscape = jsonFromConvertedString[j].src.landscape;
                                    const tiny = jsonFromConvertedString[j].src.tiny;
                                    const liked = jsonFromConvertedString[j].liked;
                                    const pictureTitle = jsonFromConvertedString[j].alt;

                                    if (photographerName !== null && photographerName !== undefined && photographerName.toString().trim().length !== 0) {
                                        //     Create the main image viewer div...
                                        const collectionsMainImageViewerDiv = document.createElement("div");
                                        collectionsMainImageViewerDiv.classList.add("collections-main-image-viewer");
                                        //     Append div to the document body...
                                        documentBody.appendChild(collectionsMainImageViewerDiv);
                                        if (originalSize !== null && originalSize !== undefined && originalSize.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, originalSize, photographerName, photographerId, liked, pictureTitle, "Original size");
                                        }
                                        if (large2x !== null && large2x !== undefined && large2x.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, large2x, photographerName, photographerId, liked, pictureTitle, "Large 2x", "940", "650");
                                        }
                                        if (large !== null && large !== undefined && large.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, large, photographerName, photographerId, liked, pictureTitle, "Large", "940", "650");
                                        }
                                        if (medium !== null && medium !== undefined && medium.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, medium, photographerName, photographerId, liked, pictureTitle, "Medium", "1", "350");
                                        }
                                        if (smallSize !== null && smallSize !== undefined && smallSize.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, smallSize, photographerName, photographerId, liked, pictureTitle, "Small size", "1", "130");
                                        }
                                        if (portrait !== null && portrait !== undefined && portrait.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, portrait, photographerName, photographerId, liked, pictureTitle, "Portrait", "800", "1200");
                                        }
                                        if (landscape !== null && landscape !== undefined && landscape.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, landscape, photographerName, photographerId, liked, pictureTitle, "Landscape", "1200", "627");
                                        }
                                        if (tiny !== null && tiny !== undefined && tiny.toString().trim().length !== 0) {
                                            createCollectionsImageViewerPage(collectionsMainImageViewerDiv, tiny, photographerName, photographerId, liked, pictureTitle, "Tiny", "280", "200");
                                        }
                                        mainTabLayout.style.display = "none";

                                        const collectionsBackButtonHolders = document.querySelectorAll(".collections-image-back-button_vert_holder");
                                        const collectionsMoreVertHolders = document.querySelectorAll(".collections-image-more_vert_holder");
                                        const collectionsDownloadHolders = document.querySelectorAll(".download-holder");

                                        collectionsBackButtonHolders.forEach((collectionsBackButtonHolder, position) => {
                                            collectionsBackButtonHolder.onmouseup = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsBackButtonHolder.style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsBackButtonHolder.onmouseout = () => {
                                                let clearBackground = setInterval(() => {
                                                    collectionsBackButtonHolder.style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsBackButtonHolder.onmousedown = () => {
                                                collectionsBackButtonHolder.style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsBackButtonHolder.ontouchstart = () => {
                                                collectionsBackButtonHolder.style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsBackButtonHolder.ontouchend = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsBackButtonHolder.style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsBackButtonHolder.ontouchcancel = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsBackButtonHolder.style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };

                                            collectionsBackButtonHolder.onclick = (e) => {
                                                e.preventDefault();
                                                //     First do slide down animation, make tabLayout visible and remove child from document body...
                                                const collectionsMainImageViewer = document.querySelector(".collections-main-image-viewer");
                                                collectionsMainImageViewer.classList.add("slide-down");

                                                mainTabLayout.style.display = "block";
                                                collectionsMainImageViewer.classList.remove("slide-down");
                                                documentBody.removeChild(collectionsMainImageViewer);
                                            }


                                            collectionsMoreVertHolders[position].onmouseup = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsMoreVertHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsMoreVertHolders[position].onmouseout = () => {
                                                let clearBackground = setInterval(() => {
                                                    collectionsMoreVertHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsMoreVertHolders[position].onmousedown = () => {
                                                collectionsMoreVertHolders[position].style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsMoreVertHolders[position].ontouchstart = () => {
                                                collectionsMoreVertHolders[position].style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsMoreVertHolders[position].ontouchend = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsMoreVertHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsMoreVertHolders[position].ontouchcancel = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsMoreVertHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };


                                            collectionsDownloadHolders[position].onmouseup = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsDownloadHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsDownloadHolders[position].onmouseout = () => {
                                                let clearBackground = setInterval(() => {
                                                    collectionsDownloadHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsDownloadHolders[position].onmousedown = () => {
                                                collectionsDownloadHolders[position].style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsDownloadHolders[position].ontouchstart = () => {
                                                collectionsDownloadHolders[position].style.background = "rgba(255,255,255,0.5)";
                                            };
                                            collectionsDownloadHolders[position].ontouchend = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsDownloadHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };
                                            collectionsDownloadHolders[position].ontouchcancel = () => {
                                                const clearBackground = setInterval(() => {
                                                    collectionsDownloadHolders[position].style.background = "none";
                                                    clearInterval(clearBackground);
                                                }, 150)
                                            };


                                        });

                                    }
                                    break outerLoop;
                                }
                            }
                        }
                    }
                }
            }
    }
}

function loadCollectionsTab() {
    if (hasReleasedCollectionsFragmentLock && pictureCollections !== null && pictureCollections !== undefined && pictureCollections instanceof Array && pictureCollections.length !== 0 && lastLoadedCollectionsIndex < pictureCollections.length) {
        hasReleasedCollectionsFragmentLock = false;
        hasLoadedCollectionsAtThirdIndex = true;
        // First shuffle the list...
        shuffleJSON(pictureCollections);
        fetch(pictureCollections[lastLoadedCollectionsIndex][1])
            .then(response => {
                hasLoadedCollectionsAtThirdIndex = true;
                if (!response.ok) {
                    const errorMsg = `HTTP Error occurred while fetching ${pictureCollections[lastLoadedCollectionsIndex][1]} with a response of ${response.status}`;
                    console.error(errorMsg);
                    hasLoadedCollectionsAtThirdIndex = false;
                    throw new Error(errorMsg);
                }
                hasLoadedCollectionsAtThirdIndex = true;
                return response.json();
            })
            .then(collectionsData => {
                hasLoadedCollectionsAtThirdIndex = true;
                console.log(`collection: ${lastLoadedCollectionsIndex} => ${collectionsData.status}`);
                // create a variable for changing collections data string to json...
                if (collectionsData.length > 0) {
                    // Convert the collectionsData here and store it...
                    pictureCollections[lastLoadedCollectionsIndex][3] = JSON.stringify(collectionsData);
                    let retrievedCollectionsData = JSON.parse(pictureCollections[lastLoadedCollectionsIndex][3]);
                    shuffleJSON(retrievedCollectionsData);
                    // TODO: PLEASE REMEMBER TO CHANGE THIS AND USE Collections ADS INSTEAD
                    if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
                        shuffleJSON(vidAdsArray);
                    }
                    let categoryName = pictureCollections[lastLoadedCollectionsIndex][0];
                    // Create the section element container...
                    const sectionElementContainer = document.createElement("div");
                    sectionElementContainer.classList.add("section");

                    // Create show more element...

                    const showMore = document.createElement("button");
                    showMore.innerHTML = "Show more";
                    showMore.classList.add("show-more");

                    // Create the section title element...
                    const sectionTitleElement = document.createElement("p");
                    sectionTitleElement.innerText = categoryName;
                    sectionTitleElement.classList.add("section-title");

                    // Create the Grid parent holder...

                    const gridParentHolder = document.createElement("div");
                    gridParentHolder.classList.add("grid-parent");


                    sectionElementContainer.appendChild(sectionTitleElement);
                    sectionElementContainer.appendChild(gridParentHolder);
                    allContent[selectedContentIndex].appendChild(sectionElementContainer);
                    for (let i = 0; i < retrievedCollectionsData.length; i++) {
                        // This line will rarely execute...
                        if (i === retrievedCollectionsData.length - 1) {
                            sectionElementContainer.removeChild(showMore);
                        }
                        if (i === 10) {
                            // first add and make the show more button visible then, break from loop
                            sectionElementContainer.appendChild(showMore);
                            break;
                        }
                        // Show ads
                        if (/*i !== 0 && */i % 4 === 0 && vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray instanceof Array && vidAdsArray.length !== 0) {
                            //     Create the Iframe to load ads webpage...
                            if (vidArrayPosition === vidAdsArray.length) {
                                vidArrayPosition = 0;
                            }
                            let iFrame = document.createElement("iframe");
                            iFrame.src = vidAdsArray[vidArrayPosition][1];
                            iFrame.height = "0";
                            iFrame.width = "0";
                            iFrame.classList.add("adsIframe");
                            allContent[selectedContentIndex].appendChild(iFrame);

                            let heightChecker = setInterval(() => {
                                if (iFrame.contentWindow.document.body.scrollHeight > 0) {
                                    iFrame.style.width = "100%";
                                    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                    iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + "px";
                                    iFrame.setAttribute("height", iFrame.contentWindow.document.body.scrollHeight + "px");
                                    if (iFrame.height === iFrame.contentWindow.document.body.scrollHeight.toString()) {
                                        /*alert("Cool");*/
                                        clearInterval(heightChecker);
                                    }
                                }
                            }, 500);
                            vidArrayPosition++;
                        }
                        /*const portraitSrc = pictureCollections[lastLoadedCollectionsIndex][3][i].src.portrait;*/
                        const portraitSrc = retrievedCollectionsData[i].src.portrait;

                        /*const title = pictureCollections[lastLoadedCollectionsIndex][3][i].alt;*/
                        const title = retrievedCollectionsData[i].alt;

                        //     Create the gridChild
                        const gridChild = document.createElement("div");
                        gridChild.classList.add("grid_child");

                        //     Create the thumbnail...
                        const thumbnail = document.createElement("img");
                        thumbnail.src = portraitSrc;
                        thumbnail.srcset = portraitSrc;
                        thumbnail.alt = "";
                        thumbnail.style.width = "100%";
                        thumbnail.style.height = "100%";
                        thumbnail.loading = "lazy";
                        thumbnail.classList.add("thumbnail");
                        thumbnail.onerror = () => {
                            gridChild.style.display = "none";
                        }

                        //  Create the more vert holder...
                        const moreVertHolder = document.createElement("div");
                        moreVertHolder.classList.add("collections_more_vert_holder");

                        //     Create the svg more vert icon...
                        const collectionsMoreVertIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        collectionsMoreVertIcon.setAttribute("height", "18");
                        collectionsMoreVertIcon.setAttribute("viewBox", "0 -960 960 960");
                        collectionsMoreVertIcon.setAttribute("width", "18");
                        collectionsMoreVertIcon.classList.add("collections-more-vert-icon");
                        collectionsMoreVertIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                        //     Create the svg path....
                        const collectionsMoreVertIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        collectionsMoreVertIconPath.setAttribute("d", "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z");
                        collectionsMoreVertIconPath.setAttribute("fill", "#ffffff");
                        collectionsMoreVertIconPath.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                        collectionsMoreVertIcon.appendChild(collectionsMoreVertIconPath);
                        moreVertHolder.appendChild(collectionsMoreVertIcon);

                        //     Create the picture title element
                        const pictureTitleElement = document.createElement("p");
                        pictureTitleElement.innerText = title;
                        pictureTitleElement.classList.add("picture-title");

                        gridChild.appendChild(thumbnail);
                        gridChild.appendChild(moreVertHolder);
                        gridChild.appendChild(pictureTitleElement);


                        gridParentHolder.appendChild(gridChild);
                        pictureCollections[lastLoadedCollectionsIndex][2] = i;
                    }

                    let collectionsMoreVertHolders = document.querySelectorAll(".collections_more_vert_holder");
                    let showMoreButtons = document.querySelectorAll(".show-more");
                    const sectionElementContainers = document.querySelectorAll(".section");
                    const gridParentHolders = document.querySelectorAll(".grid-parent");
                    const thumbnails = document.querySelectorAll(".thumbnail");
                    collectionsMoreVertHolders.forEach((moreVertHolder, index) => {
                        moreVertHolder.onmouseup = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolder.style.background = "none";
                                clearInterval(clearBackground);
                            }, 150);
                        }
                        moreVertHolder.onmouseout = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolder.style.background = "none";
                                clearInterval(clearBackground);
                            }, 150);
                        }

                        moreVertHolder.onmousedown = () => {
                            moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                        }
                        moreVertHolder.ontouchend = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolder.style.background = "none";
                                clearInterval(clearBackground);
                            }, 150);
                        }
                        moreVertHolder.ontouchcancel = () => {
                            let clearBackground = setInterval(() => {
                                moreVertHolder.style.background = "none";
                                clearInterval(clearBackground);
                            }, 150);
                        }

                        moreVertHolder.ontouchstart = () => {
                            moreVertHolder.style.background = "rgba(255,255,255,0.25)";
                        }

                        showMoreButtons.forEach((showMoreButton, index) => {
                            showMoreButton.onmouseup = () => {
                                let clearBackground = setInterval(() => {
                                    showMoreButton.style.background = "#eaeaea";
                                    clearInterval(clearBackground);
                                }, 150)
                            };
                            showMoreButton.onmouseout = () => {
                                let clearBackground = setInterval(() => {
                                    showMoreButton.style.background = "#eaeaea";
                                    clearInterval(clearBackground);
                                }, 150)
                            };
                            showMoreButton.onmousedown = () => {
                                showMoreButton.style.background = "#bcbcbc";
                            };
                            showMoreButton.ontouchstart = () => {
                                showMoreButton.style.background = "#bcbcbc";
                            };
                            showMoreButton.ontouchend = () => {
                                let clearBackground = setInterval(() => {
                                    showMoreButton.style.background = "#eaeaea";
                                    clearInterval(clearBackground);
                                }, 150)
                            };
                            showMoreButton.ontouchcancel = () => {
                                let clearBackground = setInterval(() => {
                                    showMoreButton.style.background = "#eaeaea";
                                    clearInterval(clearBackground);
                                }, 150)
                            };
                            showMoreButton.onclick = () => {
                                loadMoreCollectionsTabInSpecificCategory(index, sectionElementContainers[index], showMoreButton, gridParentHolders[index]);
                            }
                        });
                        thumbnails.forEach((thumbnail, index) => {
                            thumbnail.onclick = () => {
                                getCollectionsThumbnailMetadata(index, thumbnails[index]);
                            };
                        });
                    });
                }
                lastLoadedCollectionsIndex += 1;
                hasReleasedCollectionsFragmentLock = true;
            })
            .catch(error => {
                console.error(`Collections at position: ${lastLoadedCollectionsIndex} fetch error of ${error}`);
                hasLoadedCollectionsAtThirdIndex = false;
                lastLoadedCollectionsIndex = 0;
                hasReleasedCollectionsFragmentLock = true;
            });
    } else {
        hasLoadedCollectionsAtThirdIndex = false;
    }
}

function getTimeInHhMmSsString(totalSeconds) {
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    const mFormatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2, useGrouping: false
    });

    if (hours > 0) {
        return mFormatter.format(hours) + " : " + mFormatter.format(minutes) + " : " + mFormatter.format(seconds);
    } else {
        return mFormatter.format(minutes) + " : " + mFormatter.format(seconds);
    }
}

function loadScript() {
    for (let c = 0; c < tabItem.length; c++) {
        tabItem[c].onmouseup = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(255, 255, 255, 1)";
                clearInterval(clearBackground);
            }, 150);
        }

        tabItem[c].onmousedown = () => {
            tabItem[c].style.backgroundColor = "rgb(228,228,228)";
        };

        tabItem[c].onmouseout = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(255, 255, 255, 1)";
                clearInterval(clearBackground);
            }, 150);
        };

        tabItem[c].ontouchstart = () => {
            tabItem[c].style.backgroundColor = "rgb(228,228,228)";
        };

        tabItem[c].ontouchend = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(255, 255, 255, 1)";
                clearInterval(clearBackground);
            }, 150);
        };

        tabItem[c].ontouchcancel = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(255, 255, 255, 1)";
                clearInterval(clearBackground);
            }, 150);
        };
    }

    tabItem.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabIconPath.forEach(svgPath => {
                svgPath.classList.remove("active");
            });
            tabButton.forEach(eachTabButton => {
                eachTabButton.classList.remove("active");
            });
            tab.firstElementChild.firstElementChild.classList.add("active");
            tab.lastElementChild.classList.add("active");
            tabIndicator.style.width = tab.offsetWidth + "px";
            tabIndicator.style.top = (tab.offsetHeight - 1) + "px";
            tabIndicator.style.left = tab.offsetLeft + "px";
            allContent.forEach(content => (content.classList.remove("active")));
            /*allContent[index].style.marginTop = tabBox.offsetHeight + "px";*/
            allContent[index].style.marginTop = tabBox.clientHeight + "px";
            allContent[index].classList.add("active");
            selectedContentIndex = index;
            switch (selectedContentIndex) {
                case 0:
                    if (!hasLoadedVideosAtZeroIndex) {
                        loadVideoTab();
                    }
                    break;
                case 1:
                    if (!hasLoadedMusicAtFirstIndex) {
                        loadMusicTab();
                    }
                    break;
                case 2:
                    if (!hasLoadedMoviesAtSecondIndex) {
                        loadMoviesTab();
                    }
                    break;
                case 3:
                    if (!hasLoadedCollectionsAtThirdIndex) {
                        loadCollectionsTab();
                    }
            }
        });
    })

    /*let videoAdsFrameSelector = document.querySelectorAll(".adsIframe");
    if (videoAdsFrameSelector[0] !== null) {
        alert("not null")
    }
    videoAdsFrameSelector.forEach((videoAdsFrame, position) => {
        /!*videoAdsFrame = videoAdsFrameSelector[position].contentDocument || videoAdsFrameSelector[position].contentWindow.document;*!/
        /!*let video = videoAdsFrame.documentBody.querySelector(".video");*!/
        let video = videoAdsFrame.contentWindow.document.getElementsByTagName("video")[0];
        if (video !== null) {
            alert("cool");
            const observer = new window.IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    // Meaning that videoFrame is starting to become visible in viewport...
                    video.play();
                    return;
                }
                video.pause();
                video.currentTime = 0;
            }, {
                root: null,
                threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
            });
            observer.observe(video);
        }
    });*/
}

function shuffleItems() {
    if (selectedContentIndex !== null && selectedContentIndex !== undefined && selectedContentIndex.toString().trim().length !== 0 && selectedContentIndex !== -1) {
        if (allContent[selectedContentIndex] !== null) {
            const elementsArray = Array.prototype.slice.call(allContent[selectedContentIndex].getElementsByClassName("videoMainContainer"));
            if (elementsArray !== null && elementsArray !== undefined && elementsArray.length !== 0) {
                elementsArray.forEach(element => {
                    allContent[selectedContentIndex].removeChild(element);
                })
                shuffleArray(elementsArray);
                elementsArray.forEach(element => {
                    allContent[selectedContentIndex].appendChild(element);
                })
            }
        }
    }
}

function shuffleArray(array) {
    for (let c = array.length - 1; c >= 0; c--) {
        let i = Math.floor(Math.random() * (c + 1));
        let temp = array[c];
        array[c] = array[i];
        array[i] = temp;
    }
    return array;
}

function shuffleJSON(array) {
    let currentLength = array.length;

    // While there remain elements to shuffle...
    while (currentLength !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentLength);
        currentLength--;

        // And swap it with the current element.
        [array[currentLength], array[randomIndex]] = [array[randomIndex], array[currentLength]];
    }
}
