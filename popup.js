const toggleBtn = document.getElementById("toggle");
const statusSpan = document.getElementById("status");

chrome.storage.local.get("enabled", (data) => {
    const enabled = data.enabled ?? true;
    updateUI(enabled);
});

function updateUI(enabled) {
    statusSpan.textContent = enabled ? "Aktif" : "Nonaktif";
    statusSpan.className = enabled ? "active" : "inactive";
    toggleBtn.className = enabled ? "toggle-button on" : "toggle-button off";
}

toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("enabled", (data) => {
        const current = data.enabled ?? true;
        const next = !current;

        // Get current active tab and send message with tab ID
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "onChange",
                    value: next
                });
            }
        });

        if (next === true) {
            chrome.runtime.sendMessage({ action: "capture" })
        }
        chrome.storage.local.set({ enabled: next }, () => {
            updateUI(next);
        });
    });
});
