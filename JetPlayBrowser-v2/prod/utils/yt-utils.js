window.INNERTUBE_API_KEY = "AIzaSyDyT5W0Jh49F30Pqqtyfdf7pDLFKLJoAnw";
const SAPISID_HASH = "SAPISIDHASH 1763323025_f0db5b303811b7a69a6756097ab550197225d5ce_u SAPISID3PHASH 1763323025_f0db5b303811b7a69a6756097ab550197225d5ce_u";
const COOKIE = "VISITOR_INFO1_LIVE=IvKiLIds1lE; VISITOR_PRIVACY_METADATA=CgJORxIEGgAgUw%3D%3D; __Secure-3PAPISID=ipt_uoTPI53B8yus/APqTpkO8hq9_rgeN8; LOGIN_INFO=AFmmF2swRgIhAP-liQy5DsgsgqyHKxGu4mtaTxclN1Gz4EtDcnTEKx7pAiEAlxrkWM-Um4a4BKBJaGF9ljZvsfjYCSYCUsdMezutP5k:QUQ3MjNmeXlIUzljNXpPcHYtdHpoamhmN3ZROWpnRkE1VU1hbS1zZDFXUVpweG5UUEU2ajVVVlgwWWRqY2NacjBYV3BzdEJ0Q0V6NU4zTFVuYjBOVWhyYUd5N0g3dFZNRGtVaF9tejlVWV9BSWtxd0xNWkpOYm53NkRMQ2EtMmpIdVNzTFZkYm1iLUFTN3NJU1c4aGt1YkxCckNUanc4a01BSDJSa25qNkF6cHhmTklZMGxQM2lYZDVGVHBhc05YTmZXNlQwemhQR0lrVmNtS0g0bzdIS2dXYTNwOFBBdl9Cdw==; __Secure-3PSID=g.a0002wh-JA2KxfFP58PesI60afEbbdRyvIOAQY7mODiXzsYeMSoy8X76_KtbYpT-xiHM7_showACgYKAaoSARYSFQHGX2MiLWdT5u61G_-LPYENFbuttRoVAUF8yKr70J92LkHi5owg3bIU4L230076; PREF=f4=4000000&f6=40000000&tz=Africa.Lagos&f7=100&f5=30000; YSC=u2B8DsPcdgQ; __Secure-ROLLOUT_TOKEN=CNq5uPPZ2tGvShD-_tTf556QAxj75_WCsPeQAw%3D%3D; __Secure-1PSIDTS=sidts-CjQBwQ9iI5Y52eZ54w7i-owbISZdiY4qGNupUAGj4B45mxPMp-1HP9abWQTCXfi2zik0v0JHEAA; __Secure-3PSIDTS=sidts-CjQBwQ9iI5Y52eZ54w7i-owbISZdiY4qGNupUAGj4B45mxPMp-1HP9abWQTCXfi2zik0v0JHEAA; __Secure-3PSIDCC=AKEyXzXHvBcrICXpE-ZZAO1U09MDTMhYaWcm-GvugB6tFXJKA2iGfiGNe4-DeeDBYTz01GmQ3LU";
const PAGE_URL = "https://m.youtube.com";
const PO_TOKEN = "MlWi8ZKJGkshNKLP1aKV5XMYW1DmQOsoFRrK42eL6YPLuH5ExdoNdnYm_jNOdYN5XIMZwAMJOfOaNdGN4u8UxOi1-PRaLn5yw270QeGzkdb52cYKR9jY";
// TODO: TO BROWSE NORMAL YOUTUBE PAGE...
window.browseYTPageFeed = async (options) => {
    try {
        const requestId = String(options.reqId ?? 'yt-' + (Math.random().toString(16).slice(2) + Date.now().toString(16)));
        const apiUrl = `${PAGE_URL}/youtubei/v1/browse?key=${INNERTUBE_API_KEY}`;
        const headers = {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "AcceptType": "application/json",
            "AcceptContentType": "application/json",
            "AcceptRange": "*/*",
            "Authorization": SAPISID_HASH,
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Priority": "u=1, i",
            "Sec-CH-UA": "Chromium;v=142, Google Chrome;v=142, Not_A Brand;v=99",
            "Sec-CH-UA-Arch": "",
            "Sec-CH-UA-Bitness": "64",
            "Sec-CH-UA-Form-Factors": "Mobile",
            "Sec-CH-UA-Full-Version": "142.0.7444.163",
            "Sec-CH-UA-Full-Version-List": "Chromium;v=142.0.7444.163, Google Chrome;v=142.0.7444.163, Not_A Brand;v=99.0.0.0",
            "Sec-CH-UA-Mobile": "?1",
            "Sec-CH-UA-Model": "SamSung S24",
            "Sec-CH-UA-Platform": "Android",
            "Sec-CH-UA-Platform-Version": "15.0",
            "Sec-CH-UA-WOW64": "?0",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "same-origin",
            "Sec-Fetch-Site": "same-origin",
            "X-Browser-Channel": "stable",
            "X-Browser-Copyright": "Copyright 2025 Google LLC. All Rights reserved.",
            "X-Browser-Validation": "Aj9fzfu+SaGLBY9Oqr3S7RokOtM=",
            "X-Browser-Year": "2025",
            "X-Client-Data": "CIi2yQEIpbbJAQipncoBCKWMywEIlKHLAQiFoM0BCJeMzwEIx5HPAQiJlc8BCPSYzwEIqJnPAQjUmc8BCNybzwEY6eTOARiyhs8BGLGKzwE=",
            "X-Goog-AuthUser": "0",
            "X-Goog-PageId": "113836201943108713336",
            "X-Goog-Visitor-Id": "CgtJdktpTElkczFsRSjq1ejIBjIKCgJORxIEGgAgUw%3D%3D",
            "X-Origin": PAGE_URL,
            "X-Youtube-Bootstrap-Logged-In": "true",
            "X-Youtube-Client-Name": "2",
            "X-Youtube-Client-Version": "2.20251114.01.00",
            // cookies are combined into one header string
            "Cookie": COOKIE,
            "Referer": `${PAGE_URL}/`
        };
        const body = {
            "continuation": String(options.continuation ?? ""),
            "context": {
                "client": {
                    "hl": String(options.hl ?? "en"),
                    "gl": String(options.gl ?? "NG"),
                    "remoteHost": fastIPv4Generator(),
                    "deviceMake": "SamSung",
                    "deviceModel": "Samsung S24",
                    "visitorData": "CgtJdktpTElkczFsRSjq1ejIBjIKCgJORxIEGgAgUw%3D%3D",
                    "userAgent": "Mozilla/5.0 (Linux; Android 15.0; SamSung S24 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36,gzip(gfe)",
                    "clientName": "MWEB",
                    "clientVersion": "2.20251114.01.00",
                    "osName": "Android",
                    "osVersion": "15.0",
                    "playerType": "UNIPLAYER",
                    "screenPixelDensity": 2,
                    "platform": "MOBILE",
                    "clientFormFactor": "SMALL_FORM_FACTOR",
                    "configInfo": {
                        "appInstallData": "COrV6MgGEJT-sAUQp6XQHBDe6c8cEIfUrwUQsqLQHBD8ss4cEOWygBMQuOTOHBCc188cEL2ZsAUQrqLQHBCJsM4cEPOQ0BwQt-r-EhDhjNAcEOK4zxwQzOvPHBCDntAcEPCr0BwQ2vfOHBDyndAcENiW0BwQvbauBRC72c4cEMzfrgUQ-__PHBC0kdAcEJX3zxwQ3rzOHBCttYATEL6KsAUQi_fPHBDzs4ATEKL7zxwQgpDQHBCu1s8cENPhrwUQ5uDPHBD2q7AFENHgzxwQrKbQHBC52c4cEJbbzxwQ2YXQHBCTg9AcELyU0BwQwY_QHBD1l9AcEIHNzhwQiYPQHBDJ968FEIeszhwQndCwBRDkpNAcEIKPzxwQyIfQHBCNzLAFEJmNsQUQrKexBRCIh7AFEKer0BwQyPfPHBCClNAcEJTyzxwQjOnPHBCgp9AcEKim0BwQv5nQHBChjNAcELOq0BwQ3rqAExCWj9AcEOyM0BwqVENBTVNPaFV4LVpxLURNZVVFdWdCczlydUM0R3RDb2RNTXFDc0JBUEx2Z1g2T2FHQUJxSXVtaUdDT1BjT3hBX2tnd2IyRDRBVjV5S1ZpT3NlSFFjPTAA",
                        "coldConfigData": "COrV6MgGEPG6rQUQvbauBRCmla8FEL6KsAUQndCwBRDP0rAFEOP4sAUQgo7OHBD8ss4cEP_7zhwQnqvPHBDiuM8cEPjGzxwQ29PPHBCc188cEM_gzxwQ5efPHBDn588cELCC0BwQk4PQHBCahdAcEMiH0BwQuInQHBDMi9AcEKGM0BwQ7IzQHBCWj9AcEIKQ0BwQ85DQHBDYltAcEI-a0BwQqpzQHBCnpdAcEKim0BwQrKbQHBCgp9AcELOq0BwQp6vQHBDwq9AcEKet0BwaMkFPakZveDBoOWlJOW5Sd2pXMlRDdjNOSEZFTDRGNjR6UXFDb3pubGEwZTYxNmxPa2ZRIjJBT2pGb3gxUHMwVVlYZ200d3FQVFNnRXRaM1VNaWZ6Rzh0NElkYi1LLXdaRFdVTDI0ZyqAAUNBTVNXdzBqdU4yM0FxUVpseC1mVDVtU21oRFZDcTREalRiLUk2Y05fQlZxTk0wVDJBUEJBYWdDRlRTWnNiY2ZoYVFGa1p3RjRkc0J6OElBb0h6bklfM1VCakxQZ0FYWnBBWURvcklGajc0R3hnbnpBOGJqQnJjOW0wUExTZ1E9",
                        "coldHashData": "COrV6MgGEhIzMjMzNDA1OTAzMDkxNTEzNjIY6tXoyAYyMkFPakZveDBoOWlJOW5Sd2pXMlRDdjNOSEZFTDRGNjR6UXFDb3pubGEwZTYxNmxPa2ZROjJBT2pGb3gxUHMwVVlYZ200d3FQVFNnRXRaM1VNaWZ6Rzh0NElkYi1LLXdaRFdVTDI0Z0KAAUNBTVNXdzBqdU4yM0FxUVpseC1mVDVtU21oRFZDcTREalRiLUk2Y05fQlZxTk0wVDJBUEJBYWdDRlRTWnNiY2ZoYVFGa1p3RjRkc0J6OElBb0h6bklfM1VCakxQZ0FYWnBBWURvcklGajc0R3hnbnpBOGJqQnJjOW0wUExTZ1E9",
                        "hotHashData": "COrV6MgGEhQxODMwMDM5MjI5OTA3NDYwOTEyNxjq1ejIBiiU5PwSKKXQ_RIonpH-EijIyv4SKLfq_hIo95CAEyjLkYATKOGlgBMo8qaAEyjYsIATKOWygBMovbSAEyiut4ATKNq3gBMoybmAEyi9uoATKN66gBMyMkFPakZveDBoOWlJOW5Sd2pXMlRDdjNOSEZFTDRGNjR6UXFDb3pubGEwZTYxNmxPa2ZROjJBT2pGb3gxUHMwVVlYZ200d3FQVFNnRXRaM1VNaWZ6Rzh0NElkYi1LLXdaRFdVTDI0Z0I0Q0FNU0lnMEtvdGY2RmE3QkJwTk5zeGJNUnhVVzNjX0NETlBvRC11MzVndll6UW56a0FRPQ%3D%3D"
                    },
                    "screenDensityFloat": 2.0000000596046448,
                    "userInterfaceTheme": "USER_INTERFACE_THEME_DARK",
                    "timeZone": String(options.timeZone ?? "Africa/Lagos"),
                    "browserName": "Chrome Mobile",
                    "browserVersion": "142.0.0.0",
                    "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "deviceExperimentId": "ChxOelUzTXpReE1qa3dPREk1TXpNNE9EVXlOZz09EOrV6MgGGOrV6MgG",
                    "rolloutToken": "CNq5uPPZ2tGvShD-_tTf556QAxj75_WCsPeQAw%3D%3D"
                },
                "user": {
                    "lockedSafetyMode": false
                },
                "request": {
                    "useSsl": true,
                    "internalExperimentFlags": [],
                    "consistencyTokenJars": []
                },
                "clickTracking": {
                    "clickTrackingParams": "CKwBEIf2BBgBIhMI2YnUyrj3kAMVQegCBx0xehWpMgZnLWhpZ2haD0ZFd2hhdF90b193YXRjaJoBBQgkEI4eygEEdACpXQ=="
                },
                "adSignalsInfo": {
                    "params": [
                        {
                            "key": "dt",
                            "value": "1763322599265"
                        },
                        {
                            "key": "flash",
                            "value": "0"
                        },
                        {
                            "key": "frm",
                            "value": "0"
                        },
                        {
                            "key": "u_tz",
                            "value": "60"
                        },
                        {
                            "key": "u_his",
                            "value": "1"
                        },
                        {
                            "key": "u_h",
                            "value": "464"
                        },
                        {
                            "key": "u_w",
                            "value": "321"
                        },
                        {
                            "key": "u_ah",
                            "value": "464"
                        },
                        {
                            "key": "u_aw",
                            "value": "321"
                        },
                        {
                            "key": "u_cd",
                            "value": "24"
                        },
                        {
                            "key": "bc",
                            "value": "31"
                        },
                        {
                            "key": "bih",
                            "value": "464"
                        },
                        {
                            "key": "biw",
                            "value": "321"
                        },
                        {
                            "key": "brdim",
                            "value": "0,0,0,0,321,0,321,464,321,464"
                        },
                        {
                            "key": "vis",
                            "value": "1"
                        },
                        {
                            "key": "wgl",
                            "value": "true"
                        },
                        {
                            "key": "ca_type",
                            "value": "image"
                        }
                    ]
                }
            },
            "browseId": "FEwhat_to_watch",
            "params": "YAHIAQHwAQG6AwIYAroFBBICZW7oBQGiBhUBZwzyaL9231hqfJ_jYi6lPRIiUo6QBwI%3D",
            "racyCheckOk": false,
            "contentCheckOk": false,
            "serviceIntegrityDimensions": {
                "poToken": PO_TOKEN
            }
        };
        const response = await nativeFetch({
            requestId: requestId,
            url: apiUrl,
            method: 'POST',
            headers: JSON.stringify(headers),
            body: JSON.stringify(body),
            returnType: 'text' // use 'text' because bridge returns base64 decoded text; you'll parse JSON below
        });
        // Handle Response...
        if (!response.ok) {
            // non-2xx
            return {
                message: "Error" + String(`: ${await response.text()}` ?? "."),
                code: Number(response.status ?? 500),
                status: String(response.statusText ?? "Error occurred."),
                type: "json",
                data: undefined
            }
        } else {
            // parse JSON body
            const text = await response.text();
            alert("Value: " + String(text?.trackingParams ?? ""));
            try {
                const data = JSON.parse(text);
                return {
                    message: "success",
                    code: Number(response.status ?? 204),
                    status: String(response.statusText ?? "success"),
                    type: "json",
                    data
                }
            } catch (e) {
                return {
                    message: "success",
                    code: Number(response.status ?? 204),
                    status: String(response.statusText ?? "success"),
                    type: "text",
                    data: text
                }
            }
        }
    } catch (e) {
        return {
            message: "INTERNAL ERROR!",
            code: 500,
            status: "error",
            type: "json",
            data: undefined
        }
    }
}