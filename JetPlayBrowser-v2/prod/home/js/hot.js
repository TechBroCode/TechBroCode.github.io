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
            </div>
            <div class="metadata-container">
                <img class="channel-thumbnail" src=${singleLongVidItem?.data?.channel?.icon?.toString()?.trim() || ""} alt="" loading="lazy" style="background: darkgray;">
                <div class="vert-container">
                    <div class="title-more">
                        <p class="normal-poppins-style title">${singleLongVidItem?.title?.toString()?.trim() || ""}</p>
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
                            // Insert YT grouped body...
                            const ytGroupId = `${Date.now()}-${makeUUID()}`;
                            const imgSrc = contentItem?.data?.meta?.icon || "";
                            const groupTitle = contentItem?.data?.meta?.title || "";
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
                            if (groupTitle.toLowerCase() === "shorts") {
                                for (let c = 0, shortLen = groupedItems?.length; c < shortLen; c += 1) {
                                    const groupItem = groupedItems[c];
                                    if (!groupItem) continue;
                                    // Insert YT-shorts into DOM...
                                    insertYTShortsToDOM(yTGroupElement, groupItem);
                                }
                            }
                            break;
                        }
                        case 3:{
                            createOrInsertToYTSingleDynamicLongFormContainer(yTDynamicLongVidContainerDocId, contentItem);
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