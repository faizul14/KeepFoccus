// const redirectList = [
//     "facebook.com",
//     "tiktok.com",
//     "netflix.com",
//     "pornhub.com",
//     "jav",
//     "av"
// ];

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         const url = details.url.toLowerCase();
//         for (let keyword of redirectList) {
//             if (url.includes(keyword) || new RegExp(keyword, 'gi').test(url)) {
//                 return { redirectUrl: chrome.runtime.getURL("redirect.html") };
//             }
//         }
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking"]
// );


let redirectList = [];

async function proccesBg() {
    try {
        const response = await fetch(chrome.runtime.getURL('listblock.json'))
        const dataBlock = await response.json()
        redirectList = dataBlock
        console.log(`load succes: ${redirectList}`);

        chrome.webRequest.onBeforeRequest.addListener(
            function (details) {
                const url = details.url.toLowerCase();
                for (let keyword of redirectList) {
                    if (url.includes(keyword) || new RegExp(keyword, 'gi').test(url)) {
                        return { redirectUrl: chrome.runtime.getURL("redirect.html") };
                    }
                }
            },
            { urls: ["<all_urls>"] },
            ["blocking"]
        );
    } catch (e) {
        console.log('Failed load json: ' + e.message);
    }
}

proccesBg()