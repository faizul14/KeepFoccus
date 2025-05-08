# Save You’r Brain - Chrome Extension

![Maintained](https://img.shields.io/badge/Maintained%20by-faizul14-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/version-v1.0-blue?style=flat-square)

## 🎯 Tujuan Proyek

**Save You’r Brain** adalah ekstensi Chrome yang dibangun untuk membantumu tetap fokus dengan **mendeteksi dan memblokir konten visual yang tidak layak atau mengganggu** secara otomatis.

Ekstensi ini menggunakan **model Machine Learning berbasis TensorFlow.js** untuk menganalisis konten situs web secara real-time — bukan hanya berdasarkan URL, tetapi juga **dari screenshot tampilan halaman yang sedang dibuka**.

---

## 🤖 Teknologi

- TensorFlow.js untuk pemrosesan model Machine Learning langsung di browser
- JavaScript + Chrome Extension API (manifest v2)
- Model klasifikasi berbasis gambar (content-safe vs unsafe)

---

## 🚀 Cara Pemasangan Manual

Kamu bisa mencoba ekstensi ini langsung dari file hasil rilis. Berikut langkah-langkahnya:

1. Kunjungi halaman [Releases](https://github.com/faizul14/KeepFoccus/releases) di repo ini.
2. **Download file `.zip` dari versi terbaru** (`v1.0.zip`).
3. **Ekstrak file tersebut** ke dalam folder lokal di komputer kamu.
4. Buka Chrome, masuk ke:
5. Aktifkan **Developer Mode** (di pojok kanan atas).
6. Klik tombol **"Load unpacked"** lalu pilih folder hasil ekstraksi tadi.
7. Ekstensi akan langsung terpasang dan aktif di browser kamu ✅

---

## 📦 Isi Folder

- `background.js` — Script utama untuk handle komunikasi dan redirect
- `predictor.js` — Script yang menangkap screenshot dan memproses prediksi
- `popup.html` — UI kontrol ekstensi
- `model/` — Model TensorFlow.js untuk prediksi konten
- `blockpage/index.html` — Halaman kustom yang muncul saat situs diblokir

---

## 🧪 Status Proyek

📌 **v1.0 Stable** — Siap digunakan, cocok untuk eksperimen, riset, atau penggunaan pribadi.  
💡 Akan terus dikembangkan untuk dukungan model yang lebih akurat dan sistem kontrol pengguna.

---

## 💙 Kontribusi & Lisensi

Dikelola & dikembangkan oleh **[@faizul14](https://github.com/faizul14)**  
Lisensi: [MIT](LICENSE)

