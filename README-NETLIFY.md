# Terbitkan Backtest Studio di Netlify

Paket ini sudah berisi halaman web dan Netlify Function untuk mengambil histori Dukascopy bertahap. **Jangan mengunggah `index.html` saja**; Netlify harus menerima seluruh proyek agar fungsi API ikut terpasang.

## Sekali saja: GitHub → Netlify

1. Unduh dan ekstrak `Backtest-Studio-Netlify.zip`.
2. Di GitHub, buat repository baru bernama `backtest-studio`.
3. Pada repo, pilih **Add file → Upload files**. Unggah isi folder proyek, termasuk folder `site/`, folder `netlify/functions/`, serta `package.json`, `package-lock.json`, dan `netlify.toml`. Tekan **Commit changes**.
4. Di Netlify, pilih **Add new site → Import an existing project → GitHub**, beri izin mengakses repo `backtest-studio`, lalu pilih repo itu.
5. Biarkan build command kosong; pengaturan `netlify.toml` sudah menunjuk folder publik dan function. Tekan **Deploy site**.
6. Buka URL `*.netlify.app` yang diberikan Netlify. URL yang sama dapat dibuka di PC dan browser HP.

## Penting
- Jangan memilih drag-and-drop hanya untuk `site/index.html`: backend function tidak ikut terbit.
- Pengunduhan M1 untuk 2025-01-01–2026-11-01 dilakukan per bulan agar lebih terkelola. Koneksi Dukascopy atau batas fungsi Netlify dapat membuat sebagian bulan gagal; tombol dapat dicoba ulang.
- Netlify Free memiliki batas penggunaan dan waktu fungsi. Jika histori lengkap terlalu berat, gunakan rentang lebih pendek atau naikkan paket hosting.
- Harga Dukascopy tidak selalu sama dengan broker Anda.
