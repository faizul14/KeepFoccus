chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "capture") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];

            chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
                chrome.tabs.sendMessage(tab.id, {
                    action: "predict",
                    dataUrl: dataUrl
                });

            });

        })
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.block) {
        // Kalau hasil prediksi lebih dari 0.8, alihkan ke halaman blockpage
        chrome.tabs.update(sender.tab.id, {
            url: chrome.runtime.getURL("blockpage/index.html")
        });
    }
});
