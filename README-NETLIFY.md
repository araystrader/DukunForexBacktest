# DukunForex Backtest Studio — Netlify

Paket berisi halaman simulator dan fungsi backend Dukascopy. Unggah seluruh isinya; halaman saja tidak bisa mengambil histori.

## Deploy melalui GitHub
1. Ekstrak ZIP.
2. Unggah seluruh isi proyek ke root repository GitHub, termasuk `site/`, `netlify/`, `netlify.toml`, `package.json`, dan `package-lock.json`.
3. Hubungkan repository ke Netlify atau pastikan situs yang ada sudah terhubung ke repository tersebut.
4. Build command biarkan kosong. `netlify.toml` mengatur publish folder `site` dan functions `netlify/functions`.
5. Commit perubahan dan tunggu deploy berstatus Published.

Struktur yang wajib ada:
```
netlify.toml
package.json
package-lock.json
site/index.html
site/logo-dukunforex.jpeg
netlify/functions/history.js
```

Data M1 diminta per bulan untuk mengurangi beban fungsi. Histori memakai UTC dan feed Dukascopy, yang dapat berbeda dari broker. Netlify gratis dapat membatasi waktu dan pemakaian function.
