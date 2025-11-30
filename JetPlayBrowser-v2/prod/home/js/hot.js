const body = document.querySelector("body");
const generalContent = document.getElementById("general-content");
let pornVid = [1, 2, 3, 4, 5];
const veryLargeArr = [];

function insertYTShortsToDOM(ytGroupElement, shortItem) {
    // We'll add or replace the value here...
    //veryLargeArr.push(shortItems);
    const imgSrc = shortItem?.placeholder || "";
    ytGroupElement.insertAdjacentHTML("beforeend", `
        <div class="yt-shorts-container">
            <img class="yt-shorts-image" src=${imgSrc} loading="lazy" alt="">
            <svg class="yt-header-logo yt-shorts-down-icon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="normal-poppins-style yt-header-title yt-shorts-title">${shortItem?.title || ""}</p>
        </div>
    `);
}

function createOrInsertToYTSingleDynamicLongFormContainer(docId, singleLongVidItem) {
    let parentContainer = document.getElementById(docId);
    if (!parentContainer || !generalContent.contains(parentContainer)) {
        generalContent.insertAdjacentHTML("beforeend", `
            <div id=${docId} class="yt-group-contents yt-single-long-form-video-drop-container"></div>
        `);
    }
    parentContainer = document.getElementById(docId);
    // Insert item...
    parentContainer.insertAdjacentHTML("beforeend", `
        <div class="yt-long-form-vid-container">
            <div class="thumbnail-container">
                  <img class="thumbnail" src=${singleLongVidItem?.placeholder?.toString()?.trim() || ""} alt="" loading="lazy">
                  <p class="normal-poppins-style" style="position: absolute; bottom: 5px; right: 5px; text-align: center; font-weight: 400; padding: 3px 5px; background: rgba(0,0,0,0.5); color: white; border-radius: 5px;">${singleLongVidItem?.data?.duration?.text?.toString()?.trim() || ""}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" style="fill: white; width: 30px; height: 30px; position: absolute; top: 0; left: 0; background: var(--dark-linear-gradient-background); border-bottom-right-radius: 100%; padding: 4px 8px 8px 4px;align-self: center; justify-content: center; display: flex;">
                    <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/>
                  </svg> 
            </div>
            <div class="metadata-container">
                <img class="channel-thumbnail" src=${singleLongVidItem?.data?.channel?.icon?.toString()?.trim() || ""} alt="" loading="lazy" style="background: darkgray;">
                <div class="vert-container">
                    <div class="title-more">
                        <p class="normal-poppins-style title">${singleLongVidItem?.title?.toString()?.trim() || ""}</p>
                        <svg class="more-vert" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                        </svg>
                    </div>
                    <div class="yt-group-contents" style="margin-top: 5px; width: 100%; gap: 7px; flex-wrap: wrap;">
                        <p class="normal-poppins-style" style="display: flex; opacity: 0.5; font-weight: 400">${singleLongVidItem?.data?.channel?.title?.toString()?.trim() || ""}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: ${Boolean(singleLongVidItem?.data?.channel?.verified ?? false) ? 'flex' : 'none'}; width: 12px; height: 12px; fill: var(--blue-to-white); align-self: center; justify-self: center; justify-content: center;">
                            <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm5.707 7.293a1 1 0 010 1.414L10 17.414l-3.707-3.707a1 1 0 111.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0Z"></path>
                        </svg>
                        <p class="normal-poppins-style" style="display: flex; opacity: 0.5; font-weight: 400">•</p>
                        <p class="normal-poppins-style" style="display: flex; opacity: 0.5; font-weight: 400">${singleLongVidItem?.data?.views?.text?.toString()?.trim() || ""}</p>
                        <p class="normal-poppins-style" style="display: flex; opacity: 0.5; font-weight: 400">${singleLongVidItem?.datePublished?.text?.toString()?.trim() || ""}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function insertTikTokPlaybackFullReelsLength(contentItem) {
    const docId = `${Date.now()}-${makeUUID()}`;
    generalContent.insertAdjacentHTML("beforeend", `
        <div id=${docId} class="tiktok-full-size-player-card-container">
            <img class="thumbnail" src=${contentItem?.placeholder?.toString()?.trim() || ""} alt="" loading="lazy">
            <div class="gen-controller">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" class="play-pause">
                    <path d="m406-348 206-132-206-132v264Zm74.17 216q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132Zm-.17-28q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
            </div>
        </div>
    `);
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // You can check if user allowed showing of sensitive contents...
        const deviceType = getDeviceTypeBySize()?.type?.toString()?.trim()?.toLowerCase() || undefined;
        if (!deviceType) return;
        if (isAndroidSensitiveContentsAllowed()) {
            pornVid = shuffle(pornVid);
            // add it to the pending response below...
        }
        //We'll need to call api from here...
        const hotResponse = await fetch(`${PLAY_BASE_URL}/ret-api/hot?isShuffled=false`, {credentials: "omit"});
        let resJSON = await hotResponse.json();
        console.log(JSON.stringify(resJSON, null, 4));
        if (typeof resJSON === "string") {
            resJSON = JSON.parse(resJSON);
        }
        if (isNullUndefinedOrEmpty(body.style.display) || body?.style?.display === "none") {
            body.style.display = "flex";
        }
        let continuationArr = [];
        if (resJSON?.code >= 200 && resJSON?.code <= 399 && resJSON?.contents && Array.isArray(resJSON?.contents)) {
            const contentsArray = resJSON?.contents;
            if (contentsArray && contentsArray.length > 0) {
                continuationArr = [];
                const yTDynamicLongVidContainerDocId = `${Date.now()}-${makeUUID()}`;
                for (let contentItem of contentsArray) {
                    if (!contentItem || contentItem?.type <= -999) {
                        continuationArr.push(contentItem);
                        continue;
                    }
                    switch (contentItem?.type) {
                        case 1: {
                            // Let's loop through nested items...
                            const groupedItems = contentItem?.data?.meta?.list?.items;
                            if (!groupedItems || !Array.isArray(groupedItems) || (Array.isArray(groupedItems) && groupedItems?.length <= 0)) {
                                // Doesn't exist or empty array
                                break;
                            }
                            const imgSrc = contentItem?.data?.meta?.icon || "";
                            const groupTitle = contentItem?.data?.meta?.title || "";
                            if (groupTitle.toLowerCase() === "shorts") {
                                // Insert YT grouped body...
                                const ytGroupId = `${Date.now()}-${makeUUID()}`;
                                generalContent.insertAdjacentHTML("beforeend", `
                                    <div class="yt-group">
                                        <!--TODO: INSERT HEADER...-->
                                        <div class="yt-header">
                                            <img class="yt-header-logo" src=${imgSrc} loading="lazy" alt="" />
                                            <p class="normal-poppins-style yt-header-title">${groupTitle}</p>
                                        </div>
                                        <!--TODO: INSERT THE BODY...-->
                                        <div id=${ytGroupId} class="yt-group-contents"></div>
                                    </div>
                                `);
                                const yTGroupElement = document.getElementById(ytGroupId);
                                if (!yTGroupElement || !generalContent.contains(yTGroupElement)) break;

                                for (let c = 0, shortLen = groupedItems?.length; c < shortLen; c += 1) {
                                    const groupItem = groupedItems[c];
                                    if (!groupItem || groupItem?.type !== 2) continue;
                                    // Insert YT-shorts into DOM...
                                    insertYTShortsToDOM(yTGroupElement, groupItem);
                                }
                            } else {
                                // It may be breaking news, or any news. etc...
                                generalContent.insertAdjacentHTML("beforeend", `
                                    <div class="yt-group">
                                        <!--TODO: INSERT HEADER...-->
                                        <div class="yt-header">
                                            <p class="normal-poppins-style yt-header-title">${groupTitle}</p>
                                        </div>
                                    </div>
                                `);
                                // Header has been created...
                                const yTGroupingLongVidContainerDocId = `${Date.now()}-${makeUUID()}`;
                                for (let c = 0, longVidGroupLen = groupedItems?.length; c < longVidGroupLen; c += 1) {
                                    const groupItem = groupedItems[c];
                                    if (!groupItem || groupItem?.type !== 3) continue;
                                    // Insert each long-form...
                                    createOrInsertToYTSingleDynamicLongFormContainer(yTGroupingLongVidContainerDocId, groupItem);
                                }
                            }
                            break;
                        }
                        case 3: {
                            createOrInsertToYTSingleDynamicLongFormContainer(yTDynamicLongVidContainerDocId, contentItem);
                            break;
                        }
                        case 9: {
                            //alert(isMobileDeviceByViewportSize);
                            if (isMobileDeviceByViewportSize) {
                                // We'll not support playback of TikTok on mobile phones...
                                insertTikTokPlaybackFullReelsLength(contentItem);
                            }
                            break;
                        }
                    }
                }
            }
        }
        /*const webTagChecker = setInterval(async () => {
            alert("Entry => WEB_TAG: " + window.WEB_TAG);
            if (window.WEB_TAG !== undefined && window.WEB_TAG !== null && window.WEB_TAG.trim().length > 0) {
                clearInterval(webTagChecker);
                const ytPageFeed = await browseYTPageFeed({
                    hl: "en",
                    gl: "NG"
                });
                if (ytPageFeed.code >= 200
                    && ytPageFeed.code <= 399
                    && ytPageFeed.type === "json") {
                    generalContent.textContent = JSON.stringify(ytPageFeed.data, null, 4);
                }
            }
        }, 1000);*/
    } catch (e) {
        console.error(e);
        generalContent.textContent = e.toString();
    }
});