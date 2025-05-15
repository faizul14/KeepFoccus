let model;
let tfLoaded = false;

// Load tf.min.js secara dinamis
function injectTensorFlow(callback) {
    if (tfLoaded) return callback();

    const script = document.createElement('script');
    // Gunakan versi terbaru TensorFlow.js
    // script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
    script.src = chrome.runtime.getURL("tf.min.js");
    script.onload = () => {
        tfLoaded = true;
        callback();
    };
    script.onerror = () => {
        console.error("Gagal load tf.min.js");
    };
    document.head.appendChild(script);
}

async function loadModelIfNeeded() {
    if (model) return model;

    try {
        await tf.ready();
        const modelPath = chrome.runtime.getURL('model/model.json');
        model = await tf.loadLayersModel(modelPath);
    } catch (e) {
        console.error("Gagal load model:", e); // Lebih detail
        console.error(e);
    }

    return model;
}

function preprocessImage(imageDataUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageDataUrl;
        img.onload = () => {
            let tensor = tf.browser.fromPixels(img)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .div(tf.scalar(255))
                .expandDims(); // [1, 224, 224, 3]
            // Pastikan bentuknya selalu [1, 224, 224, 3]
            tensor = tensor.reshape([1, 224, 224, 3]);
            resolve(tensor);
        };
        img.onerror = () => {
            alert("Gagal memuat gambar untuk prediksi.");
        };
    });
}

async function predictFromImage(dataUrl) {
    const m = await loadModelIfNeeded();
    if (!m) return;

    const tensor = await preprocessImage(dataUrl);
    try {
        const prediction = m.predict(tensor);
        const result = await prediction.data();
        tf.dispose();
        prediction?.dispose?.();
        const confidence = result[0];

        console.log("Prediction:", result);
        console.log("Confidence:", confidence);

        if (confidence > 0.8) {
            showSavePopup("Konten berpotensi tidak layak!", false)
            setTimeout(() => { chrome.runtime.sendMessage({ block: true }) }, 3000)
        } else {
            showSavePopup("💡 Your Brain Has Been Saved!")
        }
    } catch (e) {
        console.error("Error saat prediksi:", e);
        console.error(e); // Lebih detail
        alert("Terjadi kesalahan saat prediksi: " + e.message);
    }
}

// Dengarkan pesan dari background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "predict" && message.dataUrl) {
        const pageKey = "checked_" + location.href;

        if (sessionStorage.getItem(pageKey)) {
            showSavePopup("✅ Enjoy you'r browsing.")
        } else {
            sessionStorage.setItem(pageKey, "true");

            // Lanjutkan proses prediksi
            injectTensorFlow(() => {
                predictFromImage(message.dataUrl);
            });
        }
    } else if (message.action === "onChange") {
        const isEnabled = message.value;
        if (isEnabled === false) {
            showSavePopup("❌ Ekstensi telah dinonaktifkan", false);
        }
    }
});

chrome.storage.local.get("enabled", (data) => {
    if (data.enabled === false) {
        console.log("❌ Ekstensi dinonaktifkan");
        return;
    }

    window.addEventListener("load", () => {
        chrome.runtime.sendMessage({ action: "capture" });
    });
});

function showSavePopup(message, positive = true) {
    // Hapus semua popup yang sudah ada
    const existingPopups = document.querySelectorAll('.save-brain-popup');
    existingPopups.forEach(popup => popup.remove());

    const popup = document.createElement("div");
    popup.className = 'save-brain-popup'; // Tambahkan class untuk identifikasi
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.zIndex = "9999";
    popup.style.background = positive ? "rgba(0, 204, 102, 0.6)" : "rgba(255, 0, 0, 0.6)"; // transparan 80%
    popup.style.color = "#fff";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    popup.style.fontSize = "16px";
    popup.style.fontFamily = "sans-serif";
    popup.style.transition = "opacity 0.5s ease";
    popup.style.opacity = "1"; // Pastikan opacity dimulai dari 1

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 4000); // tampil 4 detik
}

