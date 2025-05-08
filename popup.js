const toggleBtn = document.getElementById("toggle");
const statusSpan = document.getElementById("status");

chrome.storage.local.get("enabled", (data) => {
    const enabled = data.enabled ?? true;
    updateUI(enabled);
});

function updateUI(enabled) {
    statusSpan.textContent = enabled ? "Aktif" : "Nonaktif";
    toggleBtn.textContent = enabled ? "Matikan Ekstensi" : "Aktifkan Ekstensi";
    toggleBtn.className = enabled ? "off" : "on";
}

toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("enabled", (data) => {
        const current = data.enabled ?? true;
        const next = !current;
        
        if (next === true) {
            chrome.runtime.sendMessage({ action: "capture" })
        }
        chrome.storage.local.set({ enabled: next }, () => {
            updateUI(next);
        });
    });
});
