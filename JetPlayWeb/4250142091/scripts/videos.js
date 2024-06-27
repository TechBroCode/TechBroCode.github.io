let tabItem = document.querySelectorAll(".tab-item");
let tabIconPath = document.querySelectorAll(".tab_icon_path");
let tabButton = document.querySelectorAll(".tab_btn");
let tabIndicator = document.querySelector(".tab_indicator");
let allContent = document.querySelectorAll(".content");
let tabBox = document.querySelector(".tabBox");
let vidAdsDetector = true;
/*let vidAdsArray = [/!*"https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0"*!/"https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/videoPlayerAd.html", "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/youtube_sub_vid.html"];*/
let vidAdsArray = ["https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/google-type-ad.html", "https://techbrocode.github.io/JetPlayWeb/4250142091/ads/directory/youtube_sub_vid.html"];

/*let vidAdsArray = ["view-source:https://www.youtube.com/watch?v=7Of2rUMjndU"];*/

let vidArrayPosition = 0;

let adsToday = new Date();
let selectedContentIndex = 0;


window.onload = function () {
    tabIndicator.style.width = tabItem[0].offsetWidth + "px";
    tabIndicator.style.top = (tabItem[0].offsetHeight - 1) + "px";
    tabIndicator.style.left = tabItem[0].offsetLeft + "px";
    /*alert(`${tabBox.offsetHeight}`);*/
    allContent[0].style.marginTop = tabBox.clientHeight + "px";
    allContent[0].classList.add("active");
}

fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/video.json")
    .then(response => {
        if (!response.ok) {
            /*alert(`Http Error ${response.status}`);*/
            console.error(`HTTP Error ${response.status}`);
        }
        /*loadScript();*/
        return response.json();
    })
    .then(data => {
        console.log(`json: ${data.toString()}`);
        /*alert(`Good ${data.length}`);*/
        shuffleJSON(data);
        if (vidAdsDetector && vidAdsArray !== null && vidAdsArray !== undefined && vidAdsArray.length > 0) {
            shuffleJSON(vidAdsArray);
        }
        for (let c = 0; c < data.length; c++) {
            if (data[c] !== null && data[c] !== undefined) {
                if (/*c !== 0 && */c % 5 === 0
                    && vidAdsDetector
                    && vidAdsArray !== null
                    && vidAdsArray !== undefined
                    && vidAdsArray instanceof Array
                    && vidAdsArray.length !== 0) {
                    //     Create the Iframe to load ads webpage...
                    if (vidArrayPosition === vidAdsArray.length) {
                        vidArrayPosition = 0;
                    }
                    let iFrame = document.createElement("iframe");
                    iFrame.src = vidAdsArray[vidArrayPosition];
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
                let channelAvatar = data[c].channelAvatar;
                let channelId = data[c].channelId;
                let channelName = data[c].channelName;
                let duration = data[c].duration;
                let videoId = data[c].id;
                let videoTitle = data[c].name;
                console.log(`json at array index ${c} : \nid: ${data[c].id}\nbody: ${data[c].body}\nseverity: ${data[c].severity}\nstatus: ${data[c].status}`);
                // Create the video container...
                let videoCard = document.createElement("div");
                videoCard.style.width = "100%";
                videoCard.style.height = "auto";
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
                videoDuration.innerText = duration;
                videoDuration.classList.add("duration");

                playPauseHolder.appendChild(play);
                videoThumbContainer.appendChild(videoThumbnail);
                videoThumbContainer.appendChild(playPauseHolder);
                videoThumbContainer.appendChild(videoDuration);

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
                videoCard.appendChild(metadataContainer);
                videoCard.appendChild(divider);
                allContent[0].appendChild(videoCard);
                /*if (c === (data.length - 1)) {
                    shuffleItems();
                }*/
            }
        }

    })
/*.catch(error => {

});*/
loadScript();

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
        });
    })
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
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
