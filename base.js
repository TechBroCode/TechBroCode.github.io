window.ACTIVE_VERSION_CODE = 1;
window.ACTIVE_VERSION_NAME = "1.3";
window.ACTIVE_LEAST_SUPPORTED_DEVICE_API = 24;
window.ACTIVE_APP_UPDATE_OR_APK_URL = "https://jetplay.vercel.app";
window.ACTIVE_APP_UPDATE_TITLE = "App Update";
window.ACTIVE_APP_UPDATE_MSG = "Breaking changes were made in this app.\nClick here to update to the latest version!";

const apkUpdateJSON = {
    "min_device_api_level": 24,
    "version_code": 1,
    "version_name": 1.0,
    "apk_file_urls": [
        {
            "buildAbi": "armeabi-v7a",
            "url": ""
        },
        {
            "buildAbi": "arm64-v8a",
            "url": ""
        },
        {
            "buildAbi": "x86",
            "url": ""
        },
        {
            "buildAbi": "x86_64",
            "url": ""
        }
    ],
    "universal_apk_url": ""
};

const UPDATED_VERSION_WARN_MSG = "Make sure you're using the updated version of this app";

window.triggerApkFileUpdate = async (deviceApiLevel, versionCode, versionName, buildAbi, isPrivate) => {
    try {
        if (isNaN(deviceApiLevel)) {
            deviceApiLevel = Number(deviceApiLevel.toString().trim());
        }
        // Check if the new apk update can be allowed on the device
        if (deviceApiLevel < apkUpdateJSON.min_device_api_level) {
            // The device isn't compatible with the new apk file...
            return;
        }
        // Let's check version code...
        if (isNaN(versionCode)) {
            versionCode = Number(versionCode.toString().trim());
        }
        if (apkUpdateJSON.version_code === versionCode) {
            // Let's check the version name...
            if (isNaN(versionName)) {
                versionName = Number(versionName.toString().trim());
            }
            if (apkUpdateJSON.version_code === versionName) {
                // No update found...
                return;
            }
        }
        let apkUrl = null;
        if (buildAbi) {
            buildAbi = buildAbi.toString().trim().toLowerCase();
            for (let c = 0, apkUrlsLength = apkUpdateJSON.apk_file_urls.length; c < apkUrlsLength; c += 1) {
                const urlBuildAbiObject = apkUpdateJSON.apk_file_urls[c];
                if (!urlBuildAbiObject) {
                    continue;
                }
                const selectedBuildAbi = urlBuildAbiObject.buildAbi.trim().toLowerCase();
                if (selectedBuildAbi.includes(buildAbi) || buildAbi.includes(selectedBuildAbi)) {
                    apkUrl = urlBuildAbiObject.url;
                    break;
                }
            }
        }
        if (apkUrl === null) {
            apkUrl = apkUpdateJSON.universal_apk_url;
        }
        AndroidInterface.triggerApkOTAUpdate(apkUrl, isPrivate);
    } catch (e) {
    }
}


window.preventDefaultStopPropagation = (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    /*e.preventDefault();*/
}

window.isNullUndefined = (value) => {
    return value === null || value === undefined;
}

window.isNullUndefinedOrEmpty = (value) => {
    if (value === undefined) return true;
    if (value === null) return true;
    if (!(typeof value === "string")) value = value.toString().trim();
    return value.length === 0;
}

window.clearWebTranslucentBgOverlay = (windowOverlayContainer) => {
    try {
        if (windowOverlayContainer) {
            windowOverlayContainer.replaceChildren();
            windowOverlayContainer.classList.remove("active");
        }
    } catch (e) {
    }
}

/**
 * @return -1 => Not installed
 * @return 0 => Installed & disabled
 * @return 1 => Installed & enabled
 * */
window.checkAppAvailabilityAccessibility = (packageName) => {
    packageName = String(packageName ?? "").trim();
    if (packageName.length === 0) {
        return -1;
    }
    const isAppInstalled = String(AndroidInterface.isAppInstalledEnabled(packageName) ?? "").trim().toLowerCase();
    if (isAppInstalled.length === 0) {
        return -1;
    }
    if (isAppInstalled.includes("Application is installed".toLowerCase())) {
        // App is installed, let's check if it's enabled
        if (isAppInstalled.includes("enabled")) {
            // The App is installed and enabled
            return 1;
        } else {
            // The App is disabled. Let's redirect the user to enable it.
            //AndroidInterface.enableInstalledApplication(packageName);
            return 0;
        }
    } else {
        // The App isn't installed...
        return -1;
    }
}

window.formatFileSize = (size) => {
    try {
        let bytes;
        // Convert to number if it's a string
        if (typeof size === "number") {
            bytes = size;
        } else {
            bytes = Number(size);
        }

        // Handle invalid input
        if (isNaN(bytes) || bytes < 0) return "Nil";

        if (bytes === 0) return "0 Bytes";

        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    } catch (e) {
        return "Nil"
    }
}

window.capitalizeFirstOnly = (str) => {
    try {
        if (!str || typeof str !== "string") return "";
        // Convert everything to lowercase, then uppercase just the first character
        const lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    } catch (e) {
        return "";
    }
}

/**
 * Returns true if `input` is a Spotify Album or Playlist URL or URI.
 * Supports:
 *   • https://open.spotify.com/{album|playlist}/{22‑char‑id}[?…]
 *   • http://play.spotify.com/{album|playlist}/{22‑char‑id}[?…]
 *   • spotify:{album|playlist}:{22‑char‑id}
 *
 * @param {string} urlInput  The string to test.
 * @returns {boolean}       True if it’s a Spotify album or playlist.
 */
/**
 * Returns true if `input` is a Spotify Album, Playlist or Artist URL or URI.
 * – URL forms:
 *     https://open.spotify.com/{album|playlist|artist}/{22‑char‑id}[?…]
 *     http://play.spotify.com/{album|playlist|artist}/{22‑char‑id}[?…]
 * – URI forms:
 *     spotify:{album|playlist|artist}:{22‑char‑id}
 *
 * @param {string} urlInput
 * @returns {boolean}
 */
window.isSpotifyAlbumOrArtistOrPlaylist = (urlInput) => {
    const VALID_TYPES = new Set(['album', 'playlist', 'artist']);
    const ID_REGEX = /^[A-Za-z0-9]{22}$/;

    // 1) Try URL parsing
    try {
        const url = new URL(urlInput);
        const host = url.hostname.toLowerCase();
        const segments = url.pathname.split('/').filter(Boolean);

        // must be exactly two segments: resourceType + 22‑char ID
        if (
            (host === 'open.spotify.com' || host === 'play.spotify.com') &&
            segments.length === 2 &&
            VALID_TYPES.has(segments[0]) &&
            ID_REGEX.test(segments[1])
        ) {
            return true;
        }
    } catch (e) {
        // not a valid URL — fall through to URI check
    }

    // 2) Check the URI form
    //    spotify:album:{id}   | spotify:playlist:{id}  | spotify:artist:{id}
    const uriRegex = new RegExp(
        `^spotify:(?:${[...VALID_TYPES].join('|')}):[A-Za-z0-9]{22}$`
    );
    if (uriRegex.test(urlInput)) {
        return true;
    }

    // 3) Nope—none of the above
    return false;
};

/**
 * Returns true if `input` is a Spotify Track URL or URI.
 * Supports:
 *   • https://open.spotify.com/track/{22‑char‑id}[?…]
 *   • http://play.spotify.com/track/{22‑char‑id}[?…]
 *   • spotify:track:{22‑char‑id}
 *
 * @param {string} urlInput  The string to test.
 * @returns {boolean}     True if it’s a Spotify track.
 */
window.isSpotifyTrack = (urlInput) => {
    // 1) Try as a URL first
    try {
        const url = new URL(urlInput);
        const host = url.hostname.toLowerCase();       // e.g. "open.spotify.com"
        const path = url.pathname.split('/').filter(Boolean);
        // Must be under "/track/{id}"
        if (
            (host === 'open.spotify.com' || host === 'play.spotify.com') &&
            path.length === 2 &&                      // exactly ["track", "{id}"]
            path[0] === 'track' &&
            /^[A-Za-z0-9]{22}$/.test(path[1])         // Spotify IDs are 22‑chars
        ) {
            return true;
        }
    } catch (e) {
        // not a valid URL, fall through to URI check
    }

    // 2) Check the "spotify:track:{id}" URI form
    //    Must be exactly that form, no extra params
    if (/^spotify:track:[A-Za-z0-9]{22}$/.test(urlInput)) {
        return true;
    }

    // 3) Otherwise not a track link/URI
    return false;
}

window.isSpotifyTrackWithRef = (str) => {
    try {
        const url = new URL(str);

        // 1. host + pathname check
        if (url.origin !== 'https://open.spotify.com') return false;
        if (!url.pathname.startsWith('/track/')) return false;

        // 2. search‑params checks
        const params = url.searchParams;
        return params.has('si') && params.has('ref');
    } catch (e) {
        // not a valid URL
        return false;
    }
}


/**
 * Check if a URL is a valid YouTube playlist link.
 * Matches:
 *  - https://www.youtube.com/playlist?list=PLAYLIST_ID
 *  - https://youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 *  - with or without “www.”, “http(s)://”, and extra query params
 *
 * @param {string} url - The URL to test
 * @returns {boolean} – true if it’s a playlist URL
 */
window.isYouTubePlaylistURL = (url) => {
    // Regex breakdown:
    // ^(?:https?:\/\/)?        → optional protocol (http:// or https://)
    // (?:www\.)?               → optional “www.”
    // youtube\.com\/           → the domain “youtube.com/”
    // (?:                      → start group for the two supported path patterns
    //     playlist\?list=      →   “playlist?list=”  → official playlist page
    //   |                      →   OR
    //     watch\?              →   “watch?” page…
    //     [^#]*[&?]list=       →   …with any params then “&list=” or “?list=”
    // )                        → end group
    // ([A-Za-z0-9_-]+)         → capture the playlist ID (alphanumeric, “-” or “_”)
    // (?:[&?][\w=&-]*)?        → optional extra query params after the ID
    // (?:#.*)?$                → optional fragment/hash at end
    const regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:playlist\?list=|watch\?[^#]*[&?]list=)([A-Za-z0-9_-]+)(?:[&?][\w=&-]*)?(?:#.*)?$/;
    return regex.test(url);
};

/*TODO        ============================                   YOUTUBE VIDEO & SHORTS                ================================*/
window.isYouTubeVideoOrShortsURL = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([A-Za-z0-9_-]{11})(?:[?&][\w=&-]*)?$/;
    return regex.test(url);
}

window.extractYouTubeVideoId = (url) => {
    const patterns = [/(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,  // Standard YouTube link with optional query params
        /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,            // Embed link with optional subdomain and query params
        /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,                                    // Shortened YouTube link
        /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,           // Shorts link with optional subdomain and query params
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1]; // Return the video ID
        }
    }
    return null;
}

/**
 * Check if a URL is any valid TikTok resource:
 * - Video pages           e.g. https://www.tiktok.com/@user/video/1234567890
 * - Short/share links     e.g. https://vm.tiktok.com/AbCdEfGh/
 * - Mobile HTML videos    e.g. https://m.tiktok.com/v/1234567890.html
 * - Embedded players      e.g. https://www.tiktok.com/embed/v2/1234567890
 * - Stories               e.g. https://www.tiktok.com/@user/story/0987654321
 * - Live streams          e.g. https://www.tiktok.com/@user/live
 * - Tag pages             e.g. https://www.tiktok.com/tag/funny
 * - Music/Sound pages     e.g. https://www.tiktok.com/music/original-sound-1234567890
 * - Status links          e.g. https://www.tiktok.com/status/1234567890
 * - User profiles         e.g. https://www.tiktok.com/@username
 * - (Hypothetical) Groups e.g. https://www.tiktok.com/group/abcdef
 *
 * @param {string} url – the URL to test
 * @returns {boolean} true if it matches any known TikTok pattern
 */
window.isTikTokURL = (url) => {
    // List of regexes for each flavor of TikTok URL
    const patterns = [
        // 1. Standard desktop/mobile video page
        /^(?:https?:\/\/)?(?:www\.|m\.)?tiktok\.com\/@[\w.-]+\/video\/\d+(?:[?&][^#]*)?(?:#.*)?$/,
        // 2. “Short” share link (vm.tiktok.com)
        /^(?:https?:\/\/)?vm\.tiktok\.com\/[A-Za-z0-9]+\/?(?:[?&][^#]*)?(?:#.*)?$/,
        // 3. Mobile HTML video endpoint
        /^(?:https?:\/\/)?m\.tiktok\.com\/v\/\d+\.html(?:[?&][^#]*)?(?:#.*)?$/,
        // 4. Embedded player
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/embed\/v2\/\d+(?:[?&][^#]*)?(?:#.*)?$/,
        // 5. User stories
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/story\/\d+(?:[?&][^#]*)?(?:#.*)?$/,
        // 6. Live streams
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/live(?:[?&][^#]*)?(?:#.*)?$/,
        // 7. Hashtag/tag pages
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/tag\/[\w-]+(?:[?&][^#]*)?(?:#.*)?$/,
        // 8. Music pages
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/music\/[\w-]+(?:[?&][^#]*)?(?:#.*)?$/,
        // 9. Sound pages
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/sound\/\d+(?:[?&][^#]*)?(?:#.*)?$/,
        // 10. Status links
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/status\/\d+(?:[?&][^#]*)?(?:#.*)?$/,
        // 11. User profile root (no video/path)
        /^(?:https?:\/\/)?(?:www\.|m\.)?tiktok\.com\/@[\w.-]+(?:[?&][^#]*)?(?:#.*)?$/,
        // 12. (Hypothetical) Group pages
        /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/group\/[\w-]+(?:[?&][^#]*)?(?:#.*)?$/
    ];

    // Test the URL against each pattern, return true on first match
    return patterns.some((rx) => rx.test(url));
}

/**
 * Check if a URL is any kind of valid Instagram link in 2025.
 * Supports:
 *  - Profile pages (e.g. https://www.instagram.com/username/)
 *  - Posts (image/video): /p/POST_ID
 *  - Reels:            /reel/REEL_ID
 *  - IGTV:             /tv/VIDEO_ID
 *  - Stories:          /stories/USERNAME/STORY_ID
 *  - Highlights:       /stories/USERNAME/highlights/HIGHLIGHT_ID
 *  - Hashtag pages:    /explore/tags/TAG_NAME/
 *  - Direct inbox:     /direct/inbox/
 *  - Optional query string or URL fragment on any of the above
 *
 * @param {string} url - the string to validate
 * @returns {boolean}
 */
window.isInstagramURL = (url) => {
    // Make sure we’re only looking at instagram.com (with or without www, http(s))
    const base = '^(?:https?:\\/\\/)?(?:www\\.)?instagram\\.com';

    // Array of path‐regex patterns (without the leading domain)
    const patterns = [
        // 1) Posts: /p/POST_ID
        //    POST_ID is usually 11–16 chars of [A-Za-z0-9_-]
        `${base}\\/p\\/([A-Za-z0-9_-]+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 2) Reels: /reel/REEL_ID
        `${base}\\/reel\\/([A-Za-z0-9_-]+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 3) IGTV: /tv/VIDEO_ID
        `${base}\\/tv\\/([A-Za-z0-9_-]+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 4) Stories (single story view): /stories/USERNAME/STORY_ID/
        //    STORY_ID is numeric
        `${base}\\/stories\\/([A-Za-z0-9._]+)\\/(\\d+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 5) Highlight view: /stories/USERNAME/highlights/HIGHLIGHT_ID/
        `${base}\\/stories\\/([A-Za-z0-9._]+)\\/highlights\\/([A-Za-z0-9_-]+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 6) Hashtag pages: /explore/tags/TAG_NAME/
        `${base}\\/explore\\/tags\\/([A-Za-z0-9_]+)\\/?(?:\\?.*)?(?:#.*)?$`,

        // 7) Direct (inbox): /direct/inbox/
        `${base}\\/direct\\/inbox\\/?(?:\\?.*)?(?:#.*)?$`,

        // 8) Profile pages (catch‑all username):
        //    USERNAME is 1–30 chars of [A-Za-z0-9._]
        //    Must come last so it doesn’t preempt more specific patterns
        `${base}\\/([A-Za-z0-9._]{1,30})\\/?(?:\\?.*)?(?:#.*)?$`,
    ];

    // Test the URL against each compiled regex
    return patterns.some((pattern) => {
        const re = new RegExp(pattern, 'i');  // case‑insensitive
        return re.test(url);
    });
};

/**
 * Check if a URL is any kind of Facebook resource in 2025:
 * photos, videos, stories, posts, groups, reels, share URLs, etc.
 *
 * @param {string} url
 * @returns {boolean}
 */

window.isFacebookResourceURL = (urlString) => {
    let url;
    try {
        // 1) Parse the URL
        url = new URL(urlString);

        // 2) Must be on a Facebook subdomain we allow
        const hostMatch = url.host.match(/^(.+)\.facebook\.com$/i);
        if (!hostMatch) return false;
        const sub = hostMatch[1].toLowerCase();
        if (!['www', 'm', 'mbasic', 'touch', 'web'].includes(sub)) return false;

        // 3) Split path into non-empty segments
        const segs = url.pathname
            .split('/')
            .filter(Boolean);

        // 4) Pattern checks:

        // a) stories/{userOrId}/{storyId}
        if (segs[0] === 'stories' && segs.length >= 2) {
            return /^[A-Za-z0-9_=+\-]+$/.test(segs[1]);
        }

        // b) photos/{userOrAlbum}/{photoId}
        if (segs[0] === 'photos' && segs.length >= 3) {
            return /^\d+$/.test(segs[2]);
        }

        // c) video.php?v={id}
        if (segs[0] === 'video.php') {
            return url.searchParams.has('v');
        }

        // d) watch?v={id}
        if (segs[0] === 'watch' && url.searchParams.has('v')) {
            return true;
        }

        // e) videos/{numericId}  OR  {username}/videos/{numericId}
        if (
            (segs[0] === 'videos' && /^\d+$/.test(segs[1] || '')) ||
            (segs[1] === 'videos' && /^\d+$/.test(segs[2] || ''))
        ) {
            return true;
        }

        // f) story.php?story_fbid={id}
        if (segs[0] === 'story.php' && url.searchParams.has('story_fbid')) {
            return true;
        }

        // g) permalink.php?story_fbid={id}
        if (segs[0] === 'permalink.php' && url.searchParams.has('story_fbid')) {
            return true;
        }

        // h) /{username}/posts/{postId}
        if (
            segs[1] === 'posts' &&
            /^\d+$/.test(segs[2] || '')
        ) {
            return true;
        }

        // i) /groups/… and /groups/…/permalink/…
        if (segs[0] === 'groups') {
            if (segs.length === 2) return true;
            if (segs[2] === 'permalink' && /^\d+$/.test(segs[3] || '')) {
                return true;
            }
        }

        // j) /reels/{id} or /reel/{id}
        if (segs[0].match(/^reels?$/i) && segs[1]) {
            return true;
        }

        // k) /share/v/{id} OR /share/r/{id}
        if (
            segs[0] === 'share' &&
            ['v', 'r'].includes(segs[1]) &&
            segs[2]
        ) {
            return true;
        }

        // 5) Fallback: query‑param checks
        const sp = url.searchParams;
        if (sp.has('fbid') || sp.has('story_fbid') || sp.has('v')) {
            return true;
        }

        // No match
        return false;
    } catch (err) {
        return false;
    }
};


/*
window.isFacebookResourceURL = (url) => {
    // Allow common subdomains, including "web."
    const base = /^(?:https?:\/\/)?(?:www|m|mbasic|touch|web)\.facebook\.com\//i;

    const patterns = [
        /photo\.php\?fbid=[A-Za-z0-9_-]+/i,
        /\/photos\/[^\/]+\/[0-9]+\/?/i,
        /video\.php\?v=[A-Za-z0-9_-]+/i,
        /\/watch\/?\?v=[A-Za-z0-9_-]+/i,
        /\/videos\/[0-9]+(?:[\/?]|$)/i,
        /story\.php\?story_fbid=[0-9]+/i,

        // UPDATED! stories/{user}/{storyId}
        //   - first segment: any non-slash (username or numeric ID)
        //   - second segment: any mix of letters, digits, = _ - +
        //   - allow trailing slash or query
        /\/stories\/[^\/]+\/[A-Za-z0-9_=+-]+(?:[\/?]|$)/i,

        /\/[^\/]+\/posts\/[0-9]+\/?/i,
        /permalink\.php\?story_fbid=[0-9]+/i,
        /\/groups\/[A-Za-z0-9_.-]+\/?/i,
        /\/groups\/[^\/]+\/permalink\/[0-9]+\/?/i,
        /\/reels?\/[A-Za-z0-9_-]+\/?/i,
        /\/share\/v\/[A-Za-z0-9_-]+\/?/i
    ];

    if (!base.test(url)) return false;
    return patterns.some(rx => rx.test(url));
};
*/

/**
 * Check whether a URL points to any kind of X/Twitter resource:
 *   • Profiles        (/username)
 *   • Tweets/Statuses (/username/status/1234567890 or /i/web/status/…)
 *   • Photos & Videos (pbs.twimg.com/media/…, video.twimg.com/…)
 *   • t.co short links
 *   • Stories/Fleets (/i/fleets/…)
 *   • Communities    (/i/communities/<id>/posts/<post_id>)
 *   • Spaces         (/i/spaces/<space_id>)
 *   • Lists          (/username/lists/<listname>)
 *   • Moments        (/i/moments/<id>)
 *   • Intents        (/intent/…)
 *   • (Future) reels (/reel/…)
 *
 * @param {string} url
 * @returns {boolean}
 */
window.isXOrTwitterURL = (url) => {
    // Base domains for legacy Twitter and rebranded X, including mobile subdomain
    const host = `(?:https?:\\/\\/)?` + // optional protocol
        `(?:www\\.|mobile\\.)?` + // optional www. or mobile.
        `(?:twitter\\.com|x\\.com)`;

    // Collection of regex patterns for the various resource types
    const patterns = [
        // 1. Tweet / Status pages
        new RegExp(`${host}\\/(?:#!\\/)?[A-Za-z0-9_]{1,15}\\/(?:status|statuses)\\/\\d+`, 'i'),
        // 2. Alternate “web” status path
        new RegExp(`${host}\\/i\\/web\\/status\\/\\d+`, 'i'),

        // 3. Profile pages (just the username, no further path)
        new RegExp(`${host}\\/[A-Za-z0-9_]{1,15}(?:\\/?$|\\?[\\w=&-]+$)`, 'i'),

        // 4. t.co short links
        /^(?:https?:\/\/)?t\.co\/[A-Za-z0-9]+$/i,

        // 5. Photo & Video content on pbs/ video host
        /^(?:https?:\/\/)?pbs\.twimg\.com\/media\/[A-Za-z0-9_-]+(?:\.[A-Za-z]{3,4})(?:\?name=\w+)?$/i,
        /^(?:https?:\/\/)?video\.twimg\.com\/ext_tw_video\/[A-Za-z0-9_-]+\/pu\/vid\/\d+x\d+\/[A-Za-z0-9_-]+\.mp4(?:\?tag=\d+)?$/i,
        /^(?:https?:\/\/)?video\.twimg\.com\/ext_tw_animated_gif\/[A-Za-z0-9_-]+\/pu\/vid\/\d+x\d+\/[A-Za-z0-9_-]+\.mp4(?:\?tag=\d+)?$/i,

        // 6. Fleets / Stories (legacy “stories” feature)
        new RegExp(`${host}\\/i\\/fleets\\/\\d+`, 'i'),

        // 7. Communities / Groups posts
        new RegExp(`${host}\\/i\\/communities\\/\\d+\\/posts\\/\\d+`, 'i'),

        // 8. Spaces (live audio rooms)
        new RegExp(`${host}\\/i\\/spaces\\/[0-9A-Za-z]+`, 'i'),

        // 9. Lists
        new RegExp(`${host}\\/[A-Za-z0-9_]{1,15}\\/lists\\/[A-Za-z0-9_\\-]+`, 'i'),

        // 10. Moments
        new RegExp(`${host}\\/i\\/moments\\/\\d+`, 'i'),

        // 11. Intent URLs (tweet, follow, share, hashtags)
        new RegExp(`${host}\\/intent\\/[A-Za-z]+\\?(?:[\\w=&-]+)`, 'i'),

        // 12. (Future‑proof) Reels/Shorts if ever introduced on X
        new RegExp(`${host}\\/reel\\/[A-Za-z0-9_-]+`, 'i'),
        new RegExp(`${host}\\/shorts\\/[A-Za-z0-9_-]+`, 'i'),
    ];

    // Test the URL against each pattern; return true on first match
    return patterns.some((rx) => rx.test(url));
};

window.sumUpLengths = (...contentLengths) => {
    try {
        let summation = 0;
        if (contentLengths && contentLengths.length > 0) {
            for (let c = 0, size = contentLengths.length; c < size; c += 1) {
                let contentLength = contentLengths[c];
                if (contentLength) {
                    if (typeof contentLength !== "number") {
                        contentLength = Number(contentLength);
                    }
                    if (isNaN(contentLength)) {
                        continue;
                    }
                    summation += contentLength;
                }
            }
        }
        return summation;
    } catch (e) {
        return 0;
    }
}

window.fetchFileSize = async (url) => {
    // Send a HEAD request to get headers only (no body download)
    const res = await fetch(url, {method: 'HEAD'});

    // If the server responded with an HTTP error status, throw
    if (!res.ok) {
        //throw new Error(`Failed to fetch headers: ${res.status} ${res.statusText}`);
        return 0;
    }

    // Read the Content-Length header
    const len = res.headers.get('Content-Length');
    if (!len) {
        //throw new Error('Content-Length header is missing');
        return 0;
    }

    // parseInt with radix 10: always parse as decimal
    return parseInt(len, 10);
}

/*TODO        ============================                   YOUTUBE VIDEO & SHORTS                ================================*/

window.performAndroidSearch = (webInput) => {
    try {
        let webInputValue = String(webInput.value ?? "").trim();
        if (webInputValue.length === 0) {
            showAndroidToastMsg("Nothing to search", 1);
            return;
        }

        if (!isAndroidInternetAvailable()) {
            showAndroidToastMsg("No network available", 1);
            return;
        }
        if (true/*!isNullUndefinedOrEmpty(browsePageHtmlContent) && hasLoadedBrowseHtmlPageCompletely*/) {
            //showSearchPage(webInputValue);
            const isInputValidUrl = isAndroidValidWebUrl(webInputValue);
            if (isInputValidUrl) {
                // Let's check if it's YouTube url due to Android webView foolish behavior
                //AndroidInterface.openBrowserPage(webInputValue, "");
                showAndroidLoadingSpinnerPage();
                switch (true) {
                    // YouTube playlist
                    case isYouTubePlaylistURL(webInputValue) : {
                        showAndroidToastMsg("Youtube playlist feature isn't supported yet!", 1);
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        break;
                    }
                    // YouTube's videos & shorts
                    case isYouTubeVideoOrShortsURL(webInputValue) : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        launchAndroidDownloaderPage("https://techbrocode.github.io/Downloaders/youtube/vid-shorts/html/yt-vid-shorts.html#" + webInputValue, false);
                        break;
                    }
                    // Instagram, Tiktok, facebook, twitter test.
                    case isInstagramURL(webInputValue)
                    || isTikTokURL(webInputValue)
                    || isFacebookResourceURL(webInputValue)
                    || isXOrTwitterURL(webInputValue) : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        launchAndroidDownloaderPage("https://techbrocode.github.io/Downloaders/all-in-one/html/index.html#" + webInputValue, false);
                        break;
                    }
                    case isSpotifyAlbumOrArtistOrPlaylist(webInputValue) : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        showAndroidToastMsg("Spotify playlist, album & artist download isn't supported yet", 1);
                        //sshowAndroidGoogleAds(true);
                        break;
                    }
                    case isSpotifyTrack(webInputValue) || isSpotifyTrack(webInputValue) : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        launchAndroidDownloaderPage("https://techbrocode.github.io/Downloaders/spotify/html/spotify-track-soundcloud.html#" + webInputValue, false);
                        break;
                    }
                    /*case isSpotifyTrackWithRef(webInputValue) : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        launchAndroidDownloaderPage("https://techbrocode.github.io/Downloaders/spotify/html/spotify-track-soundcloud.html#" + webInputValue, false);
                        break;
                    }*/
                    default : {
                        removeAndroidLoadingSpinnerInDownloaderPage();
                        launchAndroidJetPlayBrowserPage(webInputValue, "");
                    }
                }
            } else {
                if (webInputValue.includes(".")) {
                    // If it has spaces then it was never meant to be a valid url
                    if (webInputValue.includes(" ")) {
                        let googleSearchURL = `https://www.google.com/search?tbm=vid&q=${encodeURIComponent(webInputValue)}`;
                        launchAndroidJetPlayBrowserPage(googleSearchURL, "");
                        return;
                    }
                    if (!webInputValue.startsWith("http")) {
                        webInputValue = "https://" + webInputValue;
                        launchAndroidJetPlayBrowserPage(webInputValue, "");
                    }
                } else {
                    let googleSearchURL = `https://www.google.com/search?tbm=vid&q=${encodeURIComponent(webInputValue)}`;
                    launchAndroidJetPlayBrowserPage(googleSearchURL, "");

                }
            }
        }
    } catch (e) {
        removeAndroidLoadingSpinnerInDownloaderPage();
        showAndroidToastMsg("Bad gateway error", 1);
    }
}

/*TODO: ======================== JS INTERFACE =============================*/
window.shareViaText = (text) => {
    try {
        AndroidInterface.shareViaText(text);
    } catch (e) {
        showAndroidToastMsg("Can't perform share action", 1);
    }
}

window.showAndroidToastMsg = (msg, duration) => {
    try {
        const raw = duration ?? 1;
        if (isNaN(Number(raw))) {
            throw new Error();
        }
        AndroidInterface.showToastMessage(msg, raw);
    } catch (e) {
        AndroidInterface.showToastMessage(String(msg ?? ""), 1);
    }
}


window.launchAndroidDownloaderPage = (customUrl, showBottomAds) => {
    AndroidInterface.openDownloaderPage(customUrl, showBottomAds);
}

window.launchAndroidJetPlayBrowserPage = (urlValue, script) => {
    AndroidInterface.openBrowserPage(urlValue, script);
}
window.showAndroidLoadingSpinnerPage = () => {
    AndroidInterface.showLoadingSpinnerInDownloaderPage();
}

window.removeAndroidLoadingSpinnerInDownloaderPage = () => {
    AndroidInterface.removeLoadingSpinnerInDownloaderPage();
}

window.isAndroidValidWebUrl = (urlValue) => {
    return AndroidInterface.isWebUrl(urlValue);
}

window.isAndroidInternetAvailable = () => {
    return AndroidInterface.isInternetAvailable();
}


window.loadAndroidDownloadsPage = () => {
    AndroidInterface.loadDownloadsPage();
}

window.showAndroidGoogleAds = (forceShow) => {
    AndroidInterface.showGoogleAds(forceShow);
}
window.showOnlyIntAds = (forceShow) => {
    AndroidInterface.showOnlyIntAds(forceShow);
}
window.showOnlyRwdIntAds = (forceShow) => {
    AndroidInterface.showOnlyRwdIntAds(forceShow);
}

window.hideAndroidKeyboard = () => {
    AndroidInterface.hideKeyboard();
}

window.getAndroidStorageFolderDetails = () => {
    AndroidInterface.getFolderStorageDetails();
}

window.setAndroidGoogleAdsEnabled = (enable) => {
    AndroidInterface.setGoogleAdsEnable(enable);
}

window.stopAndroidActivityEntirely = () => {
    AndroidInterface.stopActivityEntirely();
}

window.openUrlInDefaultBrowser = (fixedUrl) => {
    AndroidInterface.openUrlInDefaultBrowser(fixedUrl);
}

window.openStatusViewerPage = (pathJsonArray, statusTitle, statusTitleColor, allowExplorer, explorerUrl, loadType) => {
    try {
        AndroidInterface.openStatusViewerPage(pathJsonArray, statusTitle, statusTitleColor, allowExplorer, explorerUrl, loadType);
    } catch (e) {
    }
}

window.getDeviceApi = () => {
    try {
        return Number(AndroidInterface.getDeviceApi() ?? 0);
    } catch (e) {
        return 0;
    }
}

window.enableInstalledApplication = (appId) => {
    AndroidInterface.enableInstalledApplication(appId);
}

window.returnInstantFolderStorageDetails = () => {
    return AndroidInterface.returnInstantFolderStorageDetails();
}

window.showCompatibleUpdate = (leastSupportedDeviceApiLevel, newVersionCode, newVersionName, universalApkDownloadUrl, downloadViaBrowser, title, message, forcedUpdate) => {
    try {
        AndroidInterface.showCompatibleUpdate(leastSupportedDeviceApiLevel, newVersionCode, newVersionName, universalApkDownloadUrl, downloadViaBrowser, title, message, forcedUpdate);
    } catch (e) {
        showAndroidToastMsg("Update to the latest version of this app", 1);
    }
}

window.showOldAppUpdateDialog = (title, message, forcedUpdate, url) => {
    AndroidInterface.showAppUpdateDialog(title, message, forcedUpdate, url);
}

window.getAndroidCopiedText = () => {
    return AndroidInterface.getCopiedText();
}

window.copyAndroidText = (label, text, callback) => {
    AndroidInterface.copyText(label, text, callback);
}


/*TODO: SHARED PREFERENCES==========*/
/**
 * @param key is the preference key and must be a {@link String} data type...
 * @param dataType 0 => {@link String}, 1 => {@link Number}, 2 => {@link Boolean}, 3 => {@link Number} (Float number), 4 => {@link Number} (Long Number)
 * @param value is value maybe of a type {@link String} or {@link Number} etc
 * @param securityType is the type of preference and a data type {@link Number} whereby 0 => SharedPreferences else EncryptedPreference
 * */

window.putAndroidPreference = (key, dataType, value, securityType) => {
    try {
        key = String(key ?? "").trim();
        if (key.length === 0) {
            return;
        }
        dataType = Number(dataType ?? -1);
        if (isNaN(dataType) || dataType === -1) {
            return;
        }
        if (!(dataType >= 0 && dataType <= 4)) {
            // Out of bounds...
            return;
        }
        securityType = Number(securityType ?? 0);
        switch (dataType) {
            case 0: {
                value = String(value ?? "").trim();
                AndroidInterface.putPref(key, dataType, value, securityType);
                break;
            }
            case 2: {
                value = Boolean(value ?? false);
                AndroidInterface.putPref(key, dataType, value, securityType);
                break;
            }
            default : {
                // For case 1 (int) 3 (Float) & 4 (Long);
                value = Number(value ?? 0);
                AndroidInterface.putPref(key, dataType, value, securityType);
                break;
            }
        }
    } catch (e) {
        showAndroidToastMsg(UPDATED_VERSION_WARN_MSG, 1);
    }
}

/**
 * @param key is the preference key and must be a string data securityType...
 * @param value is value maybe of a securityType {@link String} or {@link Number} etc
 * @param securityType is the securityType of preference and a data securityType {@link Number} whereby 0 => SharedPreferences else EncryptedPreference
 * */
window.getAndroidBooleanPreference = (key, value, securityType) => {
    try {
        key = String(key ?? "").trim();
        if (key.length === 0) {
            return;
        }
        securityType = Number(securityType ?? 0);
        return Boolean(AndroidInterface.getBoolPref(key, value, securityType) ?? false);
    } catch (e) {
        showAndroidToastMsg(UPDATED_VERSION_WARN_MSG, 1);
        return false;
    }
}

/*TODO: ======================== JS INTERFACE =============================*/

window.disableWebElementPointer = (elementValue) => {
    try {
        if (elementValue && !elementValue.classList.contains("disabled")) {
            elementValue.classList.add("disabled");
        }
    } catch (e) {
    }
}

window.enableWebElementPointer = (elementValue) => {
    try {
        if (elementValue) {
            elementValue.classList.remove("disabled");
        }
    } catch (e) {
    }
}

window.isEmptyObject = (obj) => {
    // First, make sure it’s really an object
    if (obj === undefined || obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }
    // Check if it has any own properties
    return Object.keys(obj).length === 0;
}
