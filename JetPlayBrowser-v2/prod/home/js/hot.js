let isLoadingMainContents = false;
const body = document.querySelector("body");
const generalContent = document.getElementById("general-content");
let pornVid = [1, 2, 3, 4, 5];
const veryLargeArr = [];

// This is also a YT Query param and a logged in cookie...
const ytCookie = "VISITOR_INFO1_LIVE=IvKiLIds1lE; VISITOR_PRIVACY_METADATA=CgJORxIEGgAgUw%3D%3D; __Secure-3PAPISID=ipt_uoTPI53B8yus/APqTpkO8hq9_rgeN8; LOGIN_INFO=AFmmF2swRgIhAP-liQy5DsgsgqyHKxGu4mtaTxclN1Gz4EtDcnTEKx7pAiEAlxrkWM-Um4a4BKBJaGF9ljZvsfjYCSYCUsdMezutP5k:QUQ3MjNmeXlIUzljNXpPcHYtdHpoamhmN3ZROWpnRkE1VU1hbS1zZDFXUVpweG5UUEU2ajVVVlgwWWRqY2NacjBYV3BzdEJ0Q0V6NU4zTFVuYjBOVWhyYUd5N0g3dFZNRGtVaF9tejlVWV9BSWtxd0xNWkpOYm53NkRMQ2EtMmpIdVNzTFZkYm1iLUFTN3NJU1c4aGt1YkxCckNUanc4a01BSDJSa25qNkF6cHhmTklZMGxQM2lYZDVGVHBhc05YTmZXNlQwemhQR0lrVmNtS0g0bzdIS2dXYTNwOFBBdl9Cdw==; __Secure-3PSID=g.a0002wh-JA2KxfFP58PesI60afEbbdRyvIOAQY7mODiXzsYeMSoy8X76_KtbYpT-xiHM7_showACgYKAaoSARYSFQHGX2MiLWdT5u61G_-LPYENFbuttRoVAUF8yKr70J92LkHi5owg3bIU4L230076; PREF=f4=4000000&f6=40000000&tz=Africa.Lagos&f7=100&f5=30000; __Secure-ROLLOUT_TOKEN=CNq5uPPZ2tGvShD-_tTf556QAxiGuoOm65eRAw%3D%3D; YSC=mGBQc60k-lY; __Secure-1PSIDTS=sidts-CjQBwQ9iI1AV7w_Zb3yV_erhbHVd3DrEPWukzJPOSnnV1Y6vI66eo_Fpo59XKKXLXe6fezrWEAA; __Secure-3PSIDTS=sidts-CjQBwQ9iI1AV7w_Zb3yV_erhbHVd3DrEPWukzJPOSnnV1Y6vI66eo_Fpo59XKKXLXe6fezrWEAA; CONSISTENCY=AKreu9vGauIEyKmtkcMho67A1b98JNzJzFCDLCOYThrbhpTl_9KjlktG_1GghwkLzEfBKSQf1tP-8tYIFh3SzIm53hnXNhIWYe7xB_BDMRhx8DIuEKhiecpKo5s; __Secure-3PSIDCC=AKEyXzUruZE9XD3zvav3HF3kl3uYa-3yntn7DI-I91UNTVKKCQ7yMI8QQ7FMhi38hn7uyeGCJr0";
// This is an incognito YT-cookie which is similar to the one gotten from DroidWebclient...
const incognitoYTCookie = "GPS=1; YSC=BdTqITCiKIA; VISITOR_INFO1_LIVE=njucfJfDJ_k; VISITOR_PRIVACY_METADATA=CgJORxIEGgAgNw%3D%3D; __Secure-YNID=13.YT=i6ACelbtF7CHPYDZUU_u_Z50JSc60hJgEkFJovrug_Ssy8CY3PkCnHIoI2XJWtnjMZ7_7w467jYVYEkn6rupd6d2NPCSow-eo-F01QoY6Mc0-2H_9q5eNNEc7Y4_R6xXMb6oFJaUJ7bjdsAdGWzAyCxLDX0QiVDSLmjESokU920sgnxLrx9-RB2zUaMJ9_dO0ZWs3EFY7xuQFZthXIEBAhkR4oBSp_hSLZXZTv4zuUQ-drdcgLn0e_GqMg0smK4V9FgKoxEPz4J0faXfOZsk0Z94NND3xfX0WuxB0Q1x9RYjK6LKf_xc3W1Sf-zg9CNbldjVUnrxEVqpCilsUe8_Vg; __Secure-ROLLOUT_TOKEN=COu019zvnMz4xQEQk6CT4LyckQMYuf74_7yckQM%3D; PREF=f4=4000000&f6=40000000&tz=Africa.Lagos&f7=100";
const jetPlayYTStyle = "__Secure-YNID GPS YSC VISITOR_INFO1_LIVE PRIVACY_METADATA __Secure-ROLLOUT_TOKEN";

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
    // Let's get the original sound media object
    const origSoundObjArr = contentItem?.data?.media?.images;
    let originalSoundObj = undefined;
    if (origSoundObjArr && Array.isArray(origSoundObjArr)) {
        // we'll loop...
        for (let c = 0, myLen = origSoundObjArr.length; c < myLen; c++) {
            const soundObj = origSoundObjArr[c];
            if (!soundObj) continue;
            if (soundObj?.category?.toString()?.trim().includes("-original sound")) {
                originalSoundObj = soundObj;
                // No need to continue loop
                break;
            }
        }
    }
    const ownerAvatar = contentItem?.data?.channel?.icon?.toString()?.trim() || "";
    const vertContId = `${docId}-vert-container`;
    const chanVidTitleDesId = `${docId}-channel-title-container`;

    generalContent.insertAdjacentHTML("beforeend", `
        <div id=${docId} class="tiktok-full-size-player-card-container">
            <img class="thumbnail" src=${contentItem?.placeholder?.toString()?.trim() || ""} alt="" loading="lazy">
            <div class="gen-controller">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" class="play-pause">
                    <path d="m406-348 206-132-206-132v264Zm74.17 216q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132Zm-.17-28q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
                <div id=${vertContId} class="vert-container">
                    <!--TODO: Download-->
                    <div class="action-container" style="margin-top: 0; border-radius: 50%; background: var(--colorPrimaryDark); padding: 8px;">
                        <svg style="width: 28px; height: 28px; fill: var(--colorPrimaryDark);" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style="fill: var(--colorPrimaryDark);" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="owner-avatar-container">
                        <img class="owner-avatar" src=${ownerAvatar} alt="cool" loading="lazy">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" style="fill: white; width: 18px; height: 18px; background: var(--colorPrimaryDark); border-radius: 50%; padding: 4px; align-self: center; justify-content: center; display: flex; margin-top: -9px; z-index: 1;">
                            <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/>
                        </svg>
                    </div>
                    <!--TODO: Heart/likes-->
                    <div class="action-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                            <path d="m480-190-22-20q-97-89-160.5-152t-100-110.5Q161-520 146.5-558T132-634q0-71 48.5-119.5T300-802q53 0 99 28.5t81 83.5q35-55 81-83.5t99-28.5q71 0 119.5 48.5T828-634q0 38-14.5 76t-51 85.5Q726-425 663-362T502-210l-22 20Z"/>
                        </svg>
                        <p class="normal-poppins-style text-desc">${formatShort(Number(contentItem?.hearts?.toString()?.trim() ?? 0) || 0)}</p>
                    </div>
                    <!--TODO: comments-->
                    <div class="action-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24">
                            <path fill-rule="evenodd" d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.6 43.6 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5M14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" clip-rule="evenodd"></path>
                        </svg>
                        <p class="normal-poppins-style text-desc">${formatShort(Number(contentItem?.comments?.toString()?.trim() ?? 0) || 0)}</p>
                    </div>
                    <!--TODO: Bookmark-->
                    <div class="action-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#FFFFFF" d="M4 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15.13a1 1 0 0 1-1.555.831l-6.167-4.12a.5.5 0 0 0-.556 0l-6.167 4.12A1 1 0 0 1 4 19.63z"></path><path fill="currentColor" fill-opacity="0.03" d="M4.032 4.144Q4 4.317 4 4.5v15.13a1 1 0 0 0 1.555.831l6.167-4.12a.5.5 0 0 1 .41-.066l-.427-.198a1.49 1.49 0 0 0-1.377.063c-.581.339-1.45.85-2.25 1.339-.59.359-1.427.695-2.187.962-.929.325-1.86-.387-1.86-1.37zm8.251 12.202 6.162 4.115A1 1 0 0 0 20 19.63V4.5a2 2 0 0 0-1.123-1.798c.21.254.334.58.33.936a117 117 0 0 1-.896 13.408c-.124.99-1.17 1.553-2.076 1.133z"></path>
                        </svg>
                        <p class="normal-poppins-style text-desc">${formatShort(Number(contentItem?.bookmarks?.toString()?.trim() ?? 0) || 0)}</p>
                    </div>
                    <!--TODO: Share-->
                    <div class="action-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                            <path fill="#FFFFFF" fill-rule="evenodd" d="M10.938 3.175a.674.674 0 0 1 1.138-.488l6.526 6.215c.574.547.554 1.47-.043 1.991l-6.505 5.676a.674.674 0 0 1-1.116-.508V13.49s-6.985-1.258-9.225 2.854c-.209.384-1.023.518-.857-1.395.692-3.52 2.106-9.017 10.082-9.017z" clip-rule="evenodd"></path><path fill="#161823" fill-rule="evenodd" d="m15.754 6.212 1.295 2.59a1.12 1.12 0 0 1-.268 1.349l-5.799 5.042s-.28 1.403.562 1.403 7.578-6.174 7.578-6.174.28-.842-.561-1.684c-.843-.842-2.807-2.526-2.807-2.526" clip-rule="evenodd" opacity="0.03"></path><path fill="url(#a)" fill-rule="evenodd" d="M10.937 6.23v7.297s-6.683-.942-8.777 2.246C.146 18.839.331 12.309 3.363 9.057s7.574-2.827 7.574-2.827" clip-rule="evenodd" opacity="0.09"></path>
                            <defs>
                                <radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="rotate(-113.046 11.628 5.43)scale(8.93256 8.78076)" gradientUnits="userSpaceOnUse">
                                    <stop></stop>
                                    <stop offset="0.995" stop-opacity="0.01"></stop>
                                    <stop offset="1" stop-opacity="0.01"></stop>
                                </radialGradient>
                            </defs>
                        </svg>
                        <p class="normal-poppins-style text-desc">${formatShort(Number(contentItem?.share?.toString()?.trim() ?? 0) || 0)}</p>
                    </div>
                    <!--TODO: Sound artist-->
                    <div class="action-container">
                        <img src=${originalSoundObj ? originalSoundObj?.src?.[0]?.url?.toString()?.trim() || ownerAvatar : ownerAvatar} alt="cool" loading="lazy" style="width: 36px; height: 36px; border-radius: 50%; align-self: center; display: flex; object-fit: cover;">
                    </div>
                </div>
                <div id=${chanVidTitleDesId} class="channel-title-container">
                    <p class="normal-poppins-style title" style="display: ${contentItem?.data?.channel?.title?.toString()?.trim()?.length > 0 ? 'flex' : 'none'}">${contentItem?.data?.channel?.title?.toString()?.trim() || ""}</p>
                    <p class="normal-poppins-style title" style="font-weight: 600; font-size: 13px; opacity: 0.8; margin-top: 3px; display: ${contentItem?.title?.toString()?.trim()?.length > 0 ? '-webkit-box' : 'none'}; -webkit-line-clamp: 2; word-break: break-word; word-wrap: break-word; overflow-x: hidden; text-overflow: ellipsis;">${contentItem?.title?.toString()?.trim() || ""}</p>
                    <!--TODO: Add music title-->
                    <!--TODO:  background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.2) 100%);-->
                    <p class="normal-poppins-style marquee" style="display: ${originalSoundObj && originalSoundObj?.category !== undefined ? 'webkit-box' : 'none'}; width: 100%; align-self: flex-start; font-weight: 400; font-size: 13px; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 1; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis;">
                        <span style="padding-left: 100%; display: ${originalSoundObj && originalSoundObj?.category !== undefined ? 'inline-block' : 'none'}; align-self: flex-start; width: inherit; text-align: end; animation: marquee 12s linear infinite;">${originalSoundObj?.category?.toString()?.trim() || ""}</span>
                    </p>
                </div>
            </div>
        </div>
    `);
    const vertControllerContEl = document.getElementById(vertContId);
    const chanAndVidTxtContainerEl = document.getElementById(chanVidTitleDesId);
    if (vertControllerContEl && chanAndVidTxtContainerEl) {
        chanAndVidTxtContainerEl.style.width = `calc(100% - ${vertControllerContEl.getBoundingClientRect().width}px)`;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    async function fetchContentsFromJetApi(apiUrl, continuationArr, initOptions) {
        isLoadingMainContents = true;
        //We'll need to call api from here...
        const hotResponse = await fetch(apiUrl, initOptions);
        let resJSON = await hotResponse.json();
        console.log(JSON.stringify(resJSON, null, 4));
        if (typeof resJSON === "string") {
            resJSON = JSON.parse(resJSON);
        }
        if (isNullUndefinedOrEmpty(body.style.display) || body?.style?.display === "none") {
            body.style.display = "flex";
        }
        if (resJSON?.code >= 200 && resJSON?.code <= 399 && resJSON?.contents && Array.isArray(resJSON?.contents)) {
            const contentsArray = resJSON?.contents;
            if (contentsArray && contentsArray.length > 0) {
                const yTDynamicLongVidContainerDocId = `${Date.now()}-${makeUUID()}`;
                for (let contentItem of contentsArray) {
                    if (!contentItem || contentItem?.type <= -99) {
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
        isLoadingMainContents = false;
        return continuationArr;
    }

    try {
        // You can check if user allowed showing of sensitive contents...
        const deviceType = getDeviceTypeBySize()?.type?.toString()?.trim()?.toLowerCase() || undefined;
        if (!deviceType) return;
        if (isAndroidSensitiveContentsAllowed()) {
            pornVid = shuffle(pornVid);
            // add it to the pending response below...
        }
        let continuationArr = [];
        if (!isDroidNetworkAvailable()) {
            showDroidToastMsg("No internet available", 1);
            return;
        }
        if (isLoadingMainContents) {
            showDroidToastMsg("Please wait...", 1);
            return;
        }
        const tagChecker = setInterval( () => {
            if (!isDroidNetworkAvailable()) {
                showDroidToastMsg("No internet available", 1);
                clearInterval(tagChecker);
                return;
            }
            if (WEB_TAG && WEB_TAG.length > 0) {
                clearInterval(tagChecker);
                loadDroidWebUrlCookies("https://www.youtube.com/shorts/FLlU71aL3M4", WEB_TAG, true);
                // We'll create another interval to check for the value of droidcookieValue
                const cookieChecker = setInterval(async () => {
                    if (droidcookieValue?.url === "https://www.youtube.com/shorts/FLlU71aL3M4" && droidcookieValue?.jsonArr) {
                        clearInterval(cookieChecker);
                        try {
                            //We'll append all names + " " + value + ";"...
                            let cookieVal = "";
                            // For GPS Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "GPS") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }
                            // For YSC Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "YSC") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }
                            // For VISITOR_INFO1_LIVE Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "VISITOR_INFO1_LIVE") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }

                            // For VISITOR_PRIVACY_METADATA Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "VISITOR_PRIVACY_METADATA") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }

                            // For __Secure-YNID Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "__Secure-YNID") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }

                            // For __Secure-ROLLOUT_TOKEN Loop...
                            for (let c = 0, cookLen = droidcookieValue?.jsonArr?.length; c < cookLen; c+=1) {
                                const cookObj = droidcookieValue?.jsonArr?.[c];
                                if (!cookObj || !cookObj?.name || !cookObj?.value) continue;
                                if (cookObj?.name === "__Secure-ROLLOUT_TOKEN") {
                                    cookieVal += " " + cookObj?.name + "=" + cookObj?.value + ";";
                                    break;
                                }
                            }

                            cookieVal = cookieVal.trim();
                            alert(`arranged cookie: => ${JSON.stringify(JSON.parse({cookieVal}), null, 4)}`);
                            // Trim to remove any spaces...
                            cookieVal = encodeURIComponent(cookieVal);
                            // We'll build the fetch url...
                            alert(`arranged cookie: enc => ${cookieVal}`);
                            const reqUrl = `${PLAY_BASE_URL}/ret-api/hot?ytCookie=${cookieVal}&isShuffled=true`;
                            continuationArr = await fetchContentsFromJetApi(reqUrl, continuationArr, {credentials: "omit"});
                            /*TODO: To enable adding of continuations...*/
                            // create sentinel at end of body
                            const sentinel = document.createElement('div');
                            sentinel.id = 'near-bottom-sentinel';
                            sentinel.style.cssText = 'width:1px;height:1px;pointer-events:none;'; // invisible
                            body.appendChild(sentinel);

                            // observe with a bottom rootMargin of 300px
                            const io = new IntersectionObserver((entries) => {
                                if (!entries || !entries[0]) return;
                                const entry = entries[0];
                                if (entry.isIntersecting) {
                                    if (isLoadingMainContents) return;
                                    if (continuationArr.length === 0) {
                                        // Send Message to Android telling it that you have reached the end...
                                        showDroidToastMsg("No more contents", 1);
                                        io.disconnect();
                                        return;
                                    }
                                    console.log('within 300px of bottom — do work');
                                    // optionally disconnect if you only need it once:
                                    // io.disconnect();
                                }
                            }, {
                                root: null,                      // viewport
                                rootMargin: '0px 0px 300px 0px', // top right bottom left
                                threshold: 0                     // trigger when any pixel is visible
                            });
                            io.observe(sentinel);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }, 1000);
            }
        }, 1000);
        /* TODO: UNCOMMENT TO EXECUTE... */
        //TODO: To enable adding of continuations...
        /*continuationArr = await fetchContentsFromJetApi(`${PLAY_BASE_URL}/ret-api/hot?isShuffled=false`, continuationArr, {credentials: "omit"});
        // create sentinel at end of body
        const sentinel = document.createElement('div');
        sentinel.id = 'near-bottom-sentinel';
        sentinel.style.cssText = 'width:1px;height:1px;pointer-events:none;'; // invisible
        body.appendChild(sentinel);

        // observe with a bottom rootMargin of 300px
        const io = new IntersectionObserver((entries) => {
            if (!entries || !entries[0]) return;
            const entry = entries[0];
            if (entry.isIntersecting) {
                if (isLoadingMainContents) return;
                if (continuationArr.length === 0) {
                    // Send Message to Android telling it that you have reached the end...
                    showDroidToastMsg("No more contents", 1);
                    return;
                }
                console.log('within 300px of bottom — do work');
                // optionally disconnect if you only need it once:
                // io.disconnect();
            }
        }, {
            root: null,                      // viewport
            rootMargin: '0px 0px 300px 0px', // top right bottom left
            threshold: 0                     // trigger when any pixel is visible
        });
        io.observe(sentinel);*/
        /*TODO: STOP*/
        // cleanup example: io.disconnect(); sentinel.remove();
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
        isLoadingMainContents = false;
        console.error(e);
    }
});