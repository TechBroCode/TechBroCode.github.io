// shuffle.js - vanilla JS, exposes window.shuffle
/*
(function (global: Window | any): void {
    function shuffle(array, inplace = true) {
        let a = inplace ? array : array.slice();
        for (let i = (a ? a.length : 0) - 1; i > 0; i--) {
            // (Math.random() * (i + 1)) | 0 floors to a 32-bit integer quickly
            let j = (Math.random() * (i + 1)) | 0;
            let tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a;
    }

    // Expose on window (or fallback to global)
    if (typeof global !== "undefined") {
        global.shuffle = shuffle;
    }
})(typeof window !== "undefined" ? window : (typeof global !== "undefined" ? global : this));
*/
try {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        window.includedHoverClassList = ["more-vert", "yt-shorts-down-icon"];
        window.isMobileDeviceByViewportSize = window.matchMedia('(max-width: 480px)').matches;

        window.WEB_TAG = "";
        window.PLAY_BASE_URL = "https://jetplay.vercel.app";
        window.isNullUndefinedOrEmpty = (value) => {
            if (value === undefined || value === null) return true;
            if (!(typeof value === "string")) value = String(value ?? "").trim();
            return value.length === 0;
        }

        window.__onWebTagReceived = function (webTag) {
            window.WEB_TAG = webTag;
        }

        // Fast and simple — returns any IPv4 (0.0.0.0 - 255.255.255.255)
        window.fastIPv4Generator = () => {
            const n = Math.floor(Math.random() * 0x100000000); // 0 .. 2^32-1
            return (n >>> 24) + '.' + ((n >>> 16) & 255) + '.' + ((n >>> 8) & 255) + '.' + (n & 255);
        }

        // utility to generate v4-like UUID (not cryptographically strong but fine for correlating requests)
        window.makeUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }


        window.shuffle = (array, inplace) => {
            let a = inplace ? array : array.slice();
            for (let i = (a ? a.length : 0) - 1; i > 0; i--) {
                // (Math.random() * (i + 1)) | 0 floors to a 32-bit integer quickly
                const j = (Math.random() * (i + 1)) | 0;
                const tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a;
        }

        window.detectDeviceCategory = () => {
            let ua = navigator.userAgent || '';
            let uaData = navigator.userAgentData || null;

            // 1) client-hint (best when available)
            if (uaData && typeof uaData.mobile === 'boolean') {
                return uaData.mobile ? 'phone' : 'desktop';
            }

            // 2) iPadOS quirk: modern iPads often report mac platform but have touch
            let hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
            if (/\bipad\b/i.test(ua) || (navigator.platform === 'MacIntel' && hasTouch)) {
                return 'tablet';
            }

            // 3) obvious mobile UA tokens
            if (/\b(mobile|iphone|ipod|android.+mobile|windows phone)\b/i.test(ua)) {
                return 'phone';
            }

            // 4) fallback by screen width + touch:
            //    - <= 480px => phone
            //    - touch & <= 1024px => tablet
            //    - otherwise desktop
            let w = Math.min(window.innerWidth || Infinity, window.screen && window.screen.width || Infinity) || window.innerWidth || window.screen.width || 0;
            if (w <= 480) return 'phone';
            if (hasTouch && w <= 1024) return 'tablet';
            return 'desktop';
        }

        /**
         * getDeviceTypeBySize(width?, height?)
         * - width/height: optional numbers in CSS pixels. If omitted, uses window.screen.width/height.
         * - returns { type, diagonalInches, width, height, pxPerInch, aspect }
         *
         * Types: 'phone','tablet','laptop','monitor','desktop','tv','largeTV','unknown'
         *
         * NOTE: classification uses size-only heuristics. Tweak thresholds if you need different behaviour.
         */
        window.getDeviceTypeBySize = (width, height) => {
            // obtain width/height (CSS pixels). Use window.screen if not provided.
            let w = typeof width === 'number' ? width : (typeof window !== 'undefined' && window.screen && window.screen.width) ? window.screen.width : (typeof window !== 'undefined' ? window.innerWidth : undefined);
            let h = typeof height === 'number' ? height : (typeof window !== 'undefined' && window.screen && window.screen.height) ? window.screen.height : (typeof window !== 'undefined' ? window.innerHeight : undefined);

            if (typeof w !== 'number' || typeof h !== 'number' || !isFinite(w) || !isFinite(h)) {
                return {type: 'unknown', reason: 'invalid width/height', width: w, height: h};
            }

            // measure CSS pixels per inch (pxPerInch) by injecting a 1in element into DOM
            function measurePxPerInch() {
                try {
                    let div = document.createElement('div');
                    div.style.width = '1in';
                    div.style.height = '1in';
                    div.style.position = 'absolute';
                    div.style.left = '-100%'; // keep off-screen
                    div.style.top = '-100%';
                    document.documentElement.appendChild(div);
                    let val = div.offsetWidth || 96; // offsetWidth is in CSS px
                    document.documentElement.removeChild(div);
                    return val;
                } catch (e) {
                    return 96; // fallback DPI
                }
            }

            let pxPerInch = (typeof document !== 'undefined') ? measurePxPerInch() : 96;

            // compute diagonal in inches (physical approx)
            let widthInches = w / pxPerInch;
            let heightInches = h / pxPerInch;
            let diagonalInches = Math.sqrt(widthInches * widthInches + heightInches * heightInches);

            // aspect ratio (width / height)
            let aspect = h === 0 ? (w > 0 ? Infinity : 1) : (w / h);

            // Heuristic thresholds (conservative)
            // - largeTV: >= 55"
            // - tv: 40" - 55"
            // - monitor/desktop: 18" - 40" (split by aspect & pixel dims)
            // - laptop: 11" - 18"
            // - tablet: 7" - 11"
            // - phone: < 7"
            let type = 'unknown';

            if (diagonalInches >= 55) {
                type = 'largeTV';
            } else if (diagonalInches >= 40) {
                type = 'tv';
            } else if (diagonalInches >= 18) {
                // differentiate monitor vs desktop vs laptop-like
                // - if wide-ish and large CSS dimensions -> desktop
                // - otherwise monitor (external display)
                if ((aspect >= 1.4 && (w >= 1200 || h >= 800)) || (aspect >= 1.6 && w >= 1366)) {
                    type = 'desktop';
                } else {
                    type = 'monitor';
                }
            } else if (diagonalInches >= 11) {
                type = 'laptop';
            } else if (diagonalInches >= 7) {
                type = 'tablet';
            } else if (diagonalInches > 0) {
                type = 'phone';
            }

            return {
                type: type,
                diagonalInches: Math.round(diagonalInches * 100) / 100,
                width: Math.round(w),
                height: Math.round(h),
                pxPerInch: Math.round(pxPerInch * 100) / 100,
                aspect: Math.round(aspect * 100) / 100
            };
        }

        window.addHover = (ev) => {
            preventDefaultStopPropagation(ev);
            if (!ev || !ev.target) return;
            const targetEl = ev.target;
            if (includedHoverClassList.some((c) => targetEl.classList.toString().trim().includes(c))) {
                if (targetEl.classList.contains("hover")) return;
                targetEl.classList.add("hover");
            }
        }

        window.removeHover = (ev) => {
            preventDefaultStopPropagation(ev);
            if (!ev || !ev.target) return;
            const targetEl = ev.target;
            targetEl.classList.remove("hover");
        }


        window.preventDefaultStopPropagation = (e) => {
            e.stopPropagation();
            //e.stopImmediatePropagation();
            /*e.preventDefault();*/
        }

        /**
         * formatShort( number ) -> string
         * Examples:
         *   formatShort(3300000)    // "3.3M"
         *   formatShort(1200)       // "1.2k"
         *   formatShort(1000)       // "1k"
         *   formatShort(999)        // "999"
         *   formatShort(1234567890) // "1.23B"
         *   formatShort(-1500)      // "-1.5k"
         */
        window.formatShort = (n) => {
            if (typeof n !== 'number' || !isFinite(n)) return String(n);
            const sign = n < 0 ? '-' : '';
            const abs = Math.abs(n);

            const tiers = [
                { value: 1e12, suffix: 'T' },
                { value: 1e9,  suffix: 'B' },
                { value: 1e6,  suffix: 'M' },
                { value: 1e3,  suffix: 'k' }
            ];

            // helper: trim trailing zeros from a "fixed" string
            function trimFixed(s) {
                // removes trailing zeros and optional trailing dot: "1.00"->"1", "1.20"->"1.2"
                return s.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
            }

            for (let i = 0; i < tiers.length; i++) {
                const t = tiers[i];
                if (abs >= t.value) {
                    const v = abs / t.value;
                    // keep 2 decimal places then trim unnecessary zeros
                    const fixed = v.toFixed(2);
                    return sign + trimFixed(fixed) + t.suffix;
                }
            }

            // < 1000: show integer as-is, otherwise up to 2 d.p trimmed
            if (Number.isInteger(n)) return String(n);
            return trimFixed(abs.toFixed(2)) === '0' ? sign + '0' : sign + trimFixed(abs.toFixed(2));
        }

        /*TODO ================== Android Interfaces*/
        window.droidcookieValue = {url: "", jsonArr: ""};
        window.receivedCookie = (urlMapKey, jsonArr) => {
            droidcookieValue.url = urlMapKey;
            droidcookieValue.jsonArr = jsonArr;
            alert("url: " + urlMapKey);
            alert("JSON: " + JSON.stringify(jsonArr, null, 4));s
        }

        window.showDroidToastMsg = (msg, dur) => {
            try {
                window.jetelex42501QbSdkDroid.showToastMessage(msg, dur);
            } catch (e) {
                console.error(e);
            }
        }

        window.loadDroidWebUrlCookies = (urlMapKey, webTag = WEB_TAG, refresh = true) => {
            try {
                window.jetelex42501QbSdkDroid.loadWebUrlCookies(urlMapKey, webTag, refresh);
            } catch (e) {}
        }

        window.isDroidNetworkAvailable = () => {
            try {
                return window.jetelex42501QbSdkDroid.isNetworkAvailable();
            } catch (e) {
                return false;
            }
        }
    }
} catch (e) {}