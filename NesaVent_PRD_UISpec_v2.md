# NesaVent — Product Requirements Document & UI Screen Specification
**Platform Tiket & Booking Event Universitas Negeri Surabaya (UNESA)**
**Versi:** 1.1.0 | **Tanggal:** Mei 2026 | **Status:** Draft  
**Changelog v1.1:** Revisi scope auth (internal UNESA only via Google OAuth), klarifikasi scope event, update design system ke palette resmi UNESA

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Latar Belakang & Tujuan](#2-latar-belakang--tujuan)
3. [Ruang Lingkup Produk](#3-ruang-lingkup-produk)
4. [Stakeholder & User Persona](#4-stakeholder--user-persona)
5. [Fitur & Functional Requirements](#5-fitur--functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Tech Stack](#7-tech-stack)
8. [Arsitektur Sistem (High-Level)](#8-arsitektur-sistem-high-level)
9. [Data Model (Core Entities)](#9-data-model-core-entities)
10. [UI Screen Specification — Mobile Flutter](#10-ui-screen-specification--mobile-flutter)
11. [Navigation & App Flow](#11-navigation--app-flow)
12. [Design System](#12-design-system)
13. [Phase Roadmap](#13-phase-roadmap)
14. [Out of Scope (v1)](#14-out-of-scope-v1)

---

## 1. Executive Summary

**NesaVent** adalah platform mobile untuk pemesanan tiket dan pendaftaran event yang diselenggarakan di lingkungan Universitas Negeri Surabaya (UNESA).

### Scope v1 — Internal UNESA First

> **Fase pertama NesaVent dikhususkan untuk civitas UNESA sebagai pengguna platform.** Artinya, hanya pemilik akun Google dengan domain `@unesa.ac.id` (mahasiswa, dosen, tendik) yang dapat login dan melakukan pemesanan tiket. Namun demikian, **event yang diposting bisa bersifat internal-only maupun terbuka untuk umum** — perbedaannya ada pada *siapa yang bisa book*, bukan siapa yang bisa melihat event.

Penyelenggara (ormawa, UKM, himpunan, kepanitiaan) tetap dapat memposting event dengan target peserta apapun. Untuk event yang memerlukan peserta eksternal, mekanisme pendaftaran eksternal akan masuk dalam roadmap fase berikutnya.

---

## 2. Latar Belakang & Tujuan

### Masalah yang Diselesaikan

| # | Masalah Saat Ini | Dampak |
|---|---|---|
| 1 | Pendaftaran event tersebar di banyak platform (Google Form, DM Instagram, WhatsApp) | Data peserta tidak terstruktur, rawan human error |
| 2 | Tidak ada validasi peserta yang efisien saat check-in | Antrian panjang, potensi tiket palsu |
| 3 | Penyelenggara kesulitan memantau jumlah pendaftar real-time | Over-capacity atau under-promotion |
| 4 | Tidak ada riwayat event kampus yang terdokumentasi | Kehilangan jejak rekam ormawa/UKM |
| 5 | Pembayaran tiket berbayar tidak aman & tidak transparan | Kepercayaan peserta rendah |

### Tujuan Produk

- Menyediakan satu platform terpusat untuk semua event UNESA
- Memberikan pengalaman pemesanan tiket yang mudah, cepat, dan aman bagi civitas UNESA
- Memudahkan penyelenggara mengelola event dari publikasi hingga check-in
- Meningkatkan visibilitas event kampus kepada seluruh civitas

---

## 3. Ruang Lingkup Produk

### 3.1 Siapa yang Bisa Menggunakan App (v1)

```
┌─────────────────────────────────────────────────────┐
│              PENGGUNA NESAVENT v1                    │
│                                                      │
│  Hanya civitas UNESA dengan akun Google              │
│  domain @unesa.ac.id                                 │
│                                                      │
│  ✓ Mahasiswa  ✓ Dosen  ✓ Tenaga Kependidikan         │
│                                                      │
│  Login method: Google OAuth (@unesa.ac.id only)      │
└─────────────────────────────────────────────────────┘
```

### 3.2 Klasifikasi Event

Meskipun pengguna platform dibatasi civitas UNESA, **penyelenggara tetap bisa memposting event dengan konfigurasi target peserta yang berbeda:**

| Tipe Event | Keterangan | Contoh |
|---|---|---|
| **Internal Only** | Hanya untuk civitas UNESA | PKKMB, Rapat Terbuka BEM, Pesta Rakyat Dies Natalis |
| **Terbuka Umum** | Event yang sebenarnya boleh dihadiri siapapun, tapi sementara booking hanya via civitas UNESA | Seminar Nasional, Konser Kampus, Lomba Nasional |
| **By Invitation** | Event undangan terbatas, memerlukan kode akses | Wisuda Gathering, Workshop Eksklusif |

> **Catatan Produk:** Untuk event "Terbuka Umum" di mana peserta eksternal ingin ikut, mereka tetap tidak bisa book mandiri di v1. Mekanisme booking manual oleh panitia untuk peserta eksternal (walk-in/offline) tidak termasuk dalam scope v1.

### 3.3 Tipe Event yang Didukung

| Tipe | Contoh | Tiket Berbayar? |
|---|---|---|
| Seminar / Webinar | National Student Summit | Bisa ya/tidak |
| Workshop / Pelatihan | Pelatihan Desain UI | Bisa ya/tidak |
| Kompetisi | UNESA Cup Futsal | Ya (uang pendaftaran) |
| Pertunjukan Seni | Pagelaran Wayang Modern | Ya |
| Olahraga | Funwalk Dies Natalis | Bisa ya/tidak |
| Volunteer/Sosial | Bakti Sosial BEM | Gratis |
| Orientasi/PKKMB | PKKMB Fakultas | Gratis |
| Festival Kampus | Pesta Rakyat UNESA | Campuran |

### 3.4 Penyelenggara yang Bisa Mendaftar

- Ormawa Universitas (BEM, DPM, MK)
- Ormawa Fakultas (BEM Fakultas, Senat)
- Himpunan Mahasiswa Jurusan/Prodi
- UKM (Unit Kegiatan Mahasiswa)
- Kepanitiaan Resmi (diverifikasi SK)
- Unit Kerja / Lembaga UNESA (LP2M, LP3, dll.)

---

## 4. Stakeholder & User Persona

> **Semua persona di bawah adalah civitas UNESA** (pemegang akun @unesa.ac.id).

### Persona 1 — Andi, Mahasiswa Aktif (Peserta)
- **Profil:** Mahasiswa UNESA semester 5, aktif di medsos, sering ikut event kampus
- **Goals:** Temukan event dengan mudah, daftar cepat, punya bukti tiket digital
- **Pain Points:** Capek cari event lewat IG story expired, bingung bayar ke mana, lupa print bukti
- **Device:** Android mid-range, koneksi data seluler
- **Login:** Google OAuth `@mhs.unesa.ac.id`

### Persona 2 — Dr. Sari, Dosen (Peserta/Penyelenggara)
- **Profil:** Dosen UNESA, sering mengikuti seminar dan kadang menyelenggarakan workshop prodi
- **Goals:** Daftar event dengan cepat tanpa ribet administrasi, kelola event kecil prodi
- **Pain Points:** Platform lama butuh banyak langkah, tidak ada rekap peserta yang rapi
- **Login:** Google OAuth `@unesa.ac.id`

### Persona 3 — Budi, Ketua Divisi Acara UKM (Penyelenggara)
- **Profil:** Mahasiswa aktif, penanggung jawab event UKM
- **Goals:** Publikasikan event, pantau pendaftar, validasi tiket dengan mudah di hari H
- **Pain Points:** Data peserta dari Google Form berantakan, tidak ada fitur check-in digital
- **Login:** Google OAuth `@mhs.unesa.ac.id`

### Persona 4 — Admin Kemahasiswaan (Admin Platform)
- **Profil:** Staf kemahasiswaan UNESA
- **Goals:** Verifikasi event sebelum tayang, pantau semua aktivitas platform
- **Pain Points:** Event hoaks atas nama UNESA, tidak ada rekap data event per semester

---

## 5. Fitur & Functional Requirements

### 5.1 Modul Autentikasi (AUTH)

> **Keputusan Arsitektur:** NesaVent v1 menggunakan **Google OAuth exclusively** dengan pembatasan domain `@unesa.ac.id` dan `@mhs.unesa.ac.id`. Tidak ada registrasi manual, tidak ada login email/password. Ini menyederhanakan auth secara signifikan dan memastikan semua pengguna terverifikasi sebagai civitas UNESA.

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| AUTH-01 | Login Google OAuth | P0 | Sign in with Google, hanya menerima domain `@unesa.ac.id` dan `@mhs.unesa.ac.id`. Non-UNESA ditolak dengan pesan error yang jelas. |
| AUTH-02 | Validasi domain otomatis | P0 | Setelah OAuth callback, server memvalidasi email domain. Jika bukan UNESA domain → reject dengan pesan "Gunakan akun Google UNESA-mu untuk masuk." |
| AUTH-03 | Auto-detect tipe civitas | P1 | Deteksi otomatis tipe akun berdasarkan domain/sub-domain: `@mhs.unesa.ac.id` → Mahasiswa, `@unesa.ac.id` → Dosen/Tendik. Tampilkan badge sesuai di profil. |
| AUTH-04 | Auto-populate profil | P0 | Nama dan foto profil diambil otomatis dari akun Google. User bisa tambahkan nomor HP dan NIM/NIP setelah login pertama. |
| AUTH-05 | Onboarding setelah login pertama | P0 | Setelah pertama kali login, minta user lengkapi: Nomor HP, Fakultas/Prodi (dropdown), konfirmasi NIM/NIP (optional). |
| AUTH-06 | Logout | P0 | Revoke token, clear local session |
| AUTH-07 | Session persistence | P0 | JWT disimpan aman di secure storage, auto-refresh sebelum expire |
| AUTH-08 | Role management | P0 | Roles: Peserta (default), Penyelenggara (perlu daftar org), Admin (assigned manual) |

### 5.2 Modul Eksplorasi Event (DISCOVER)

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| DISC-01 | Home feed event | P0 | List event upcoming, trending, terdekat tanggalnya |
| DISC-02 | Search event | P0 | Cari berdasarkan judul, penyelenggara, kategori |
| DISC-03 | Filter event | P0 | Filter: kategori, tanggal, harga (gratis/berbayar), tipe peserta (internal only / terbuka) |
| DISC-04 | Kategori event | P0 | Chip/tab: Semua, Seminar, Workshop, Kompetisi, Seni, Olahraga, Sosial, dll. |
| DISC-05 | Detail event | P0 | Info lengkap: poster, deskripsi, jadwal, lokasi, penyelenggara, sisa kursi, harga |
| DISC-06 | Simpan / Bookmark event | P1 | Wishlist event yang diminati |
| DISC-07 | Bagikan event | P1 | Share link event ke WA/medsos (deep link) |

### 5.3 Modul Pemesanan Tiket (ORDER)

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| ORDER-01 | Pilih tipe tiket | P0 | Multiple tipe tiket per event (Early Bird, Reguler, VIP, Gratis) |
| ORDER-02 | Input data peserta | P0 | Form: nama, email (auto dari akun), nomor HP, NIM + custom fields panitia |
| ORDER-03 | Ringkasan pesanan | P0 | Review sebelum konfirmasi |
| ORDER-04 | QR Code tiket unik | P0 | Setiap tiket punya QR Code unik untuk check-in |
| ORDER-05 | Tiket gratis langsung issued | P0 | Tiket aktif otomatis setelah submit untuk event gratis |
| ORDER-06 | Pembayaran tiket berbayar | P1 | Integrasi payment gateway (Midtrans/Xendit) |
| ORDER-07 | Konfirmasi via email | P0 | Email konfirmasi + attachment tiket |
| ORDER-08 | Batas waktu pembayaran | P1 | Countdown 24 jam, otomatis batal jika lewat |
| ORDER-09 | Pembatalan pesanan | P1 | Cancel oleh peserta (refund policy dari panitia) |

### 5.4 Modul Tiket Saya (MY TICKETS)

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| TICK-01 | Daftar tiket yang dimiliki | P0 | Tab: Upcoming, Selesai, Dibatalkan |
| TICK-02 | Detail tiket + QR Code | P0 | Tampilan full-screen QR code untuk scan |
| TICK-03 | Download tiket ke galeri | P1 | Simpan sebagai gambar |
| TICK-04 | Riwayat transaksi | P1 | History pembayaran dan pesanan |

### 5.5 Modul Pengelolaan Event (ORGANIZER)

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| ORG-01 | Dashboard penyelenggara | P0 | Ringkasan event aktif, total peserta, pendapatan |
| ORG-02 | Buat event baru | P0 | Form: judul, deskripsi, poster, tanggal, lokasi, kategori, kuota, tipe tiket, konfigurasi peserta |
| ORG-03 | Kelola tipe tiket | P0 | Add/edit/delete tipe tiket, set harga, kuota, tanggal buka-tutup |
| ORG-04 | Custom form pendaftaran | P1 | Tambah field tambahan |
| ORG-05 | Manajemen peserta | P0 | Lihat daftar peserta, export CSV |
| ORG-06 | Scanner QR Check-in | P0 | Scan QR tiket peserta dengan kamera HP |
| ORG-07 | Statistik event real-time | P1 | Grafik penjualan tiket, persentase kehadiran |
| ORG-08 | Edit event & notifikasi peserta | P1 | Edit info dengan notif ke peserta terdaftar |
| ORG-09 | Tutup pendaftaran manual | P0 | Close registration sebelum deadline |
| ORG-10 | Profil organisasi | P0 | Nama, logo, deskripsi, track record event |

### 5.6 Modul Notifikasi (NOTIF)

| ID | Fitur | Prioritas | Deskripsi |
|---|---|---|---|
| NOTIF-01 | Push notification | P1 | Pengingat H-1, update status pesanan |
| NOTIF-02 | In-app notification center | P0 | Bell icon + daftar notifikasi |
| NOTIF-03 | Email notifikasi | P0 | Konfirmasi order, perubahan event, pembatalan |

### 5.7 Modul Admin (ADMIN — Web Dashboard)

| ID | Fitur | Prioritas |
|---|---|---|
| ADM-01 | Verifikasi & approve event | P0 |
| ADM-02 | Tolak event dengan alasan | P0 |
| ADM-03 | Verifikasi organisasi penyelenggara | P0 |
| ADM-04 | Rekap data event & peserta | P1 |
| ADM-05 | Moderasi konten | P1 |

---

## 6. Non-Functional Requirements

| Kategori | Requirement |
|---|---|
| **Performance** | App load < 3 detik pada 4G; list event render < 1 detik |
| **Availability** | Uptime 99.5% khususnya pada hari pelaksanaan event besar |
| **Scalability** | Mampu 5.000 concurrent users (Dies Natalis, PKKMB) |
| **Security** | HTTPS only; JWT auth; QR Code one-time verifiable; Google OAuth domain restriction di server side (tidak hanya client) |
| **Offline Support** | QR Code tiket tersimpan cache, tampil tanpa internet |
| **Accessibility** | Font size dynamic; contrast ratio ≥ 4.5:1 |
| **Platform** | Flutter (Android ≥ 6.0, iOS ≥ 13) |
| **Lokalisasi** | Bahasa Indonesia default; siap multi-bahasa |

---

## 7. Tech Stack

### Mobile Frontend
| Layer | Teknologi |
|---|---|
| Framework | **Flutter** (Dart) |
| State Management | **Riverpod** (flutter_riverpod + riverpod_annotation) |
| Networking | **Dio** + Retrofit |
| Local Storage | **flutter_secure_storage** (JWT) + **Hive** (cache) |
| Navigation | **Go Router** |
| Auth | **google_sign_in** + validasi domain di backend |
| QR Code | qr_flutter (display) + mobile_scanner (scan) |
| Image | cached_network_image |
| Push Notif | firebase_messaging |
| Font | google_fonts (Plus Jakarta Sans) |

### Backend
| Layer | Teknologi |
|---|---|
| Framework | **Hono.js** (TypeScript) |
| Database | **Supabase** (PostgreSQL) |
| ORM | **Drizzle ORM** |
| Auth | Google OAuth 2.0 + Supabase Auth + domain validation middleware |
| File Storage | Supabase Storage |
| Payment | **Midtrans** Snap |
| Email | Resend |
| Push Notif | Firebase Cloud Messaging (FCM) |
| Deployment | Railway / Fly.io + Supabase Cloud |

---

## 8. Arsitektur Sistem (High-Level)

```
┌──────────────────────────────────────────────────────┐
│                Flutter Mobile App                     │
│         (Civitas UNESA @unesa.ac.id only)             │
└─────────────────────┬────────────────────────────────┘
                      │  HTTPS / REST + JWT
         ┌────────────▼────────────────┐
         │      Hono.js API Server     │
         │  ┌──────────────────────┐   │
         │  │  Auth Middleware      │   │
         │  │  Google OAuth Token  │   │
         │  │  + Domain Validation │   │
         │  │  (@unesa.ac.id only) │   │
         │  └──────────────────────┘   │
         └────────────┬────────────────┘
                      │
         ┌────────────▼────────────────┐
         │      Drizzle ORM            │
         └────────────┬────────────────┘
                      │
         ┌────────────▼────────────────┐
         │         Supabase            │
         │  ┌──────────┐ ┌──────────┐  │
         │  │ Postgres │ │ Storage  │  │
         │  └──────────┘ └──────────┘  │
         └─────────────────────────────┘
                      
         External Services:
         Google OAuth ←→ Midtrans ←→ FCM ←→ Resend Email
```

### Auth Flow (Google OAuth)

```
User tap "Masuk dengan Google"
    ↓
google_sign_in plugin → Google OAuth Consent Screen
    ↓
Google returns: idToken + email
    ↓
Flutter kirim idToken ke POST /api/auth/google
    ↓
Backend verifikasi idToken via Google API
    ↓
Cek email domain: @unesa.ac.id atau @mhs.unesa.ac.id?
    ├── ✓ Valid → Buat/update user → Return JWT
    └── ✗ Invalid → 401 "Akun bukan civitas UNESA"
    ↓
Flutter simpan JWT di flutter_secure_storage
    ↓
Navigate ke Home / Onboarding (jika first time)
```

---

## 9. Data Model (Core Entities)

```sql
users
  id, google_id (unique), email, name, avatar_url,
  phone (nullable), nim_nip (nullable),
  civitas_type (mahasiswa | dosen | tendik),
  faculty (nullable), prodi (nullable),
  role (attendee | organizer | admin),
  is_profile_complete (bool),
  created_at, updated_at

organizations
  id, name, slug, description, logo_url,
  type (ukm | ormawa_univ | ormawa_fakultas | himpunan | lembaga | kepanitiaan),
  faculty (nullable),
  is_verified, verified_at,
  owner_id (FK → users),
  created_at

events
  id, title, slug, description, poster_url,
  organizer_id (FK → organizations),
  category (seminar | workshop | kompetisi | seni | olahraga | sosial | orientasi | festival | lainnya),
  start_date, end_date,
  registration_start, registration_end,
  location_name, location_address, location_maps_url,
  is_online (bool), online_link,
  audience_config (internal_only | open | by_invitation),
  invitation_code (nullable, untuk by_invitation),
  status (draft | pending_review | published | cancelled | completed),
  max_capacity (nullable),
  created_at, updated_at

ticket_types
  id, event_id (FK → events),
  name, description,
  price (decimal, 0 = gratis),
  quota (nullable), sold_count,
  sales_start, sales_end,
  is_active (bool)

orders
  id, user_id (FK → users), event_id (FK → events),
  status (pending | paid | confirmed | cancelled | expired),
  total_amount, payment_method, payment_reference,
  expires_at,
  created_at

order_items
  id, order_id (FK → orders),
  ticket_type_id (FK → ticket_types),
  attendee_name, attendee_email, attendee_phone,
  nim_nip (nullable),
  custom_fields (jsonb),
  quantity

tickets
  id, order_item_id (FK → order_items),
  user_id (FK → users),
  ticket_code (unique),
  qr_data (signed payload untuk verifikasi),
  status (active | used | cancelled),
  checked_in_at, checked_in_by (FK → users)

notifications
  id, user_id (FK → users),
  title, body,
  type (order_confirmed | event_reminder | event_update | general),
  related_id, is_read, created_at

bookmarks
  id, user_id (FK → users), event_id (FK → events), created_at
```

---

## 10. UI Screen Specification — Mobile Flutter

> Ukuran referensi: 390×844pt. Semua warna mengacu Design System Bagian 12 (palette UNESA).

---

### SCREEN GROUP 1: AUTH (Disederhanakan)

---

#### SCR-01 — Splash Screen

**Layout:**
- Background: Gradient `navy-900` → `navy-800` (vertikal)
- Center: Logo NesaVent (SVG putih, 120×120pt)
- Di bawah logo: "NesaVent" (titleLarge, gold-400)
- Tagline: "Satu Tiket, Semua Event UNESA" (bodyMedium, white/70%)
- Auto-navigate ke Home (sudah login) atau Login (belum) setelah 2 detik

---

#### SCR-02 — Onboarding

**Layout:**
- PageView 3 slide dengan dot indicator
- Tombol "Lewati" (text button, gold) di kanan atas
- Background: navy-900, ilustrasi warna cerah (gold + purple accent)

**Slide 1:** "Temukan Event UNESA" — ilustrasi kalender & bintang
**Slide 2:** "Pesan Tiket Sekejap" — ilustrasi HP dengan QR
**Slide 3:** "Kamu Panitia? Kami Bantu" — ilustrasi organizer

CTA slide terakhir: Button "Mulai Sekarang →"

---

#### SCR-03 — Login

> Hanya satu metode: Google OAuth. Screen ini bersih dan minimal.

**Layout:**
```
Background: navy-900 solid

[Center content]
  Logo NesaVent (80pt, putih)
  "NesaVent" (headlineMedium, putih, bold)
  "Platform Event Resmi UNESA" (bodyMedium, white/60%)

  [Spacer 48pt]

  Ilustrasi subtle: pola geometric gold/purple (opacity 10-15%)

  [Spacer 48pt]

  Button "Masuk dengan Akun Google UNESA"
    - Background: putih
    - Teks: navy-900, semibold
    - Google icon di kiri
    - Full width, height 52pt, borderRadius 14pt

  [Spacer 16pt]

  Info text (bodySmall, white/50%):
  "🔒 Hanya untuk civitas UNESA (@unesa.ac.id)"

[Footer]
  "v1.0.0 · NesaVent"  (labelSmall, white/30%)
```

**Error State (domain tidak valid):**
```
Snackbar merah muncul dari bawah:
"⚠️ Gunakan akun Google UNESA-mu (@unesa.ac.id) untuk masuk."
```

---

#### SCR-04 — Onboarding Profil (First Login)

> Muncul sekali setelah login pertama untuk melengkapi profil.

**Layout:**
```
[App Bar] "Lengkapi Profilmu"  (tidak bisa di-skip)

[Header]
  Avatar dari Google (80pt, sudah auto-filled)
  Nama dari Google (sudah auto-filled)
  Email (sudah auto-filled, disabled)
  Badge "Civitas UNESA ✓" (gold)

[Form — yang perlu diisi]
  TextField: Nomor HP *
    - Hint: "08xxxxxxxxxx"
    - Keyboard: phone

  Dropdown: Fakultas *
    (list fakultas UNESA)

  Dropdown: Status *
    ○ Mahasiswa  ○ Dosen  ○ Tenaga Kependidikan

  TextField: NIM / NIP (optional)
    - Hint: "Nomor Induk Mahasiswa / Pegawai"

[CTA]
  Button (full-width, gold filled): "Simpan & Mulai →"
```

---

### SCREEN GROUP 2: BOTTOM NAVIGATION

4 tab utama:
1. **Beranda** (house icon)
2. **Jelajahi** (compass icon)
3. **Tiket Saya** (ticket icon + badge)
4. **Profil** (person icon)

Role Penyelenggara: tab ke-5 **Kelola** (briefcase icon)

---

### SCREEN GROUP 3: BERANDA

---

#### SCR-10 — Beranda Utama

**Layout:**
```
[App Bar — navy-900 background]
  Logo NesaVent (kiri, putih kecil)
  [Bell icon, putih, badge gold jika ada notif]

[Body - CustomScrollView]

  ── Header Greeting ──
  Background: navy-900 melanjutkan dari app bar
  "Halo, {nama singkat}! 👋" (titleLarge, putih)
  "Ada {N} event seru minggu ini" (bodyMedium, white/70%)
  [Padding bawah berbentuk wave/curve ke bg-secondary]

  ── Search Bar ──
  Kartu putih dengan shadow ringan
  [🔍  Cari event, ormawa, kategori...]
  Tap → SCR-20

  ── Featured Event Banner ──
  PageView (aspect 16:9, rounded 16pt)
  Poster full-bleed + gradient overlay bawah (navy → transparent)
  Overlay teks:
    Chip kategori (gold bg)
    Judul event (titleMedium, putih, bold)
    📅 Tanggal | 👥 Sisa N tiket
  Dot indicator (gold)

  ── Kategori ──
  "Kategori" (titleSmall, navy-900)
  Horizontal scroll chips:
    Selected chip: gold-500 bg + navy teks
    Unselected: outline navy-200

  ── Event Segera Berlangsung ──
  "Segera Berlangsung" + "Lihat Semua →" (gold link)
  Horizontal scroll EventCard compact (lebar 180pt):
    Poster (aspect 3:4, rounded 12pt)
    Kategori chip kecil (overlay pojok kiri atas)
    Nama event (titleSmall, 2 baris)
    📅 Tanggal (bodySmall)
    Harga chip: "Gratis" (hijau) / "Rp 25.000" (navy)

  ── Event Populer ──
  "Populer Bulan Ini" + "Lihat Semua →"
  List vertikal EventCard horizontal:
    Thumbnail kiri (80×80, rounded 10pt)
    Kanan: Nama (titleSmall), Kategori chip, Penyelenggara, Tanggal, Harga
    Badge "🔥 N peserta"

  [Safe area padding bawah]
```

---

#### SCR-11 — Notifikasi

**Layout:**
```
[App Bar, navy] "Notifikasi"  |  "Tandai Semua Dibaca" (gold link)

[ListView grouped by: Hari ini / Kemarin / Minggu lalu]
  Setiap item:
  [Dot gold jika unread]
  [Icon warna sesuai tipe]
  Judul (semibold jika unread)
  Isi singkat
  Waktu relatif

[Empty state] ilustrasi + "Belum ada notifikasi"
```

---

### SCREEN GROUP 4: JELAJAHI

---

#### SCR-20 — Jelajahi & Search

**Layout:**
```
[App Bar]
  ← Back  [🔍  Cari event...   ✕]

[Saat search kosong]
  Grid 2×4 CategoryCard:
    Icon besar + label
    Warna card bergantian: navy bg / gold bg / purple bg
    [📚 Seminar] [🔧 Workshop] [🏆 Kompetisi] [🎭 Seni]
    [⚽ Olahraga] [🌿 Sosial] [🎓 Orientasi] [🎪 Festival]

  "Semua Event"
  List vertikal EventCard

[Saat mengetik → dropdown suggestions]
  Event (5 max), Organisasi (3 max), "Lihat semua..."

[Saat hasil muncul]
  Filter chips row:
  [Filter ▼] [Kategori ▼] [Tanggal ▼] [Harga ▼]
  "{N} event ditemukan"
  ListView EventCard
```

---

#### SCR-21 — Filter Bottom Sheet

**Layout (drag handle di atas, rounded top 20pt):**
```
[Header] "Filter"    [Reset — gold link]

Kategori: multi-select chips (gold saat selected)
Harga: ○ Semua  ○ Gratis  ○ Berbayar
Tipe Event: ○ Semua  ○ Internal Only  ○ Terbuka Umum
Tanggal: [DateRangePicker]
Status Tiket: ○ Tersedia saja  ○ Tampilkan semua

[Footer sticky]
Button (gold, full-width): "Tampilkan Hasil"
```

---

### SCREEN GROUP 5: DETAIL EVENT

---

#### SCR-30 — Detail Event

**Layout:**
```
[Custom App Bar — transparan, back putih + share + bookmark]

[SliverAppBar expandedHeight: 280pt]
  Poster full-width hero image
  Pinned collapsed app bar: navy bg + nama event

[Konten]

  [Badges row]
    Chip kategori (gold)
    Badge "GRATIS" (hijau) / "Mulai Rp 25.000" (navy outline)
    Badge "Internal Only" (purple) / "Terbuka Umum" (teal)

  Judul (headlineMedium, navy, bold)

  [Penyelenggara row]
    Logo org (40pt circle)
    "oleh {Nama Org}"
    Badge "✓ Terverifikasi" (gold, jika ada)

  [Info grid — 2 kolom icon]
    📅 Hari, Tanggal Bulan Tahun
    🕐 Jam Mulai – Jam Selesai
    📍 Nama Lokasi
    🗺️ TextLink "Lihat di Google Maps"
    👥 Sisa {N} tiket
    ⏳ Tutup {tanggal}

  [Divider]

  [TabBar: Deskripsi | Jadwal | Penyelenggara]
    Tab selected: gold underline

  Tab Deskripsi:
    Teks deskripsi (expandable "Baca Selengkapnya")
    Galeri foto (horizontal scroll, jika ada)

  Tab Jadwal:
    Timeline (jam – kegiatan), warna accent gold/purple

  Tab Penyelenggara:
    Logo + nama + deskripsi org
    "N event sebelumnya"
    Button: "Lihat Profil Organisasi"

  [Section: Pilih Tiket]
  "Tiket Tersedia"
  TicketTypeCard per tipe:
    Card border (selected: gold border tebal)
    Nama tiket (semibold)
    Harga besar (navy, bold)
    "Tersisa {N}" (merah jika < 10)
    "s/d {tanggal}"
    Status chip
    Radio button

[Footer sticky — bg putih + shadow atas]
  Harga range (kiri)  |  Button "Pesan Tiket →" (gold filled)
  Jika habis: Button disabled "Tiket Habis"
```

---

### SCREEN GROUP 6: CHECKOUT FLOW

#### SCR-40 — Step 1: Data Peserta

```
[App Bar, navy] ← "Pemesanan"
[Progress: ●──○──○]

[Body]
  ── Ringkasan Event ──
  Thumbnail + Nama + Tanggal + Lokasi

  ── Tiket Dipilih ──
  "{Nama tipe}" — Rp {harga}
  [− {N} +] stepper (gold)

  ── Data Peserta ──
  Info box navy: "Data diambil dari akun UNESA-mu"
  TextField: Nama Lengkap (pre-filled, editable)
  TextField: Email (pre-filled dari Google, disabled)
  TextField: Nomor HP (pre-filled, editable)
  TextField: NIM/NIP (pre-filled jika ada)

  [Custom fields panitia jika ada]

[Footer] Button (gold, full-width): "Lanjut →"
```

---

#### SCR-41 — Step 2: Ringkasan

```
[App Bar] ← "Ringkasan"
[Progress: ●──●──○]

[Body]
  Card: Detail event + tiket + peserta

  [Jika berbayar]
  "Metode Pembayaran"
  Radio options: VA Bank | QRIS | Minimarket

  "Rincian Harga"
  Subtotal | Biaya layanan | TOTAL (bold gold)

  Checkbox: Setuju syarat & ketentuan

[Footer] Button: "Konfirmasi" / "Bayar Sekarang →"
```

---

#### SCR-42 — Step 3: Konfirmasi / Pembayaran

**Gratis — Sukses:**
```
Animasi confetti (gold + purple + navy)
"Pendaftaran Berhasil! 🎉"
Preview tiket + QR kecil
Button (gold): "Lihat Tiket"
TextLink: "Kembali ke Beranda"
```

**Berbayar — Menunggu:**
```
Countdown (jam:menit:detik, besar, gold)
"Selesaikan Pembayaran"
Info VA / QRIS dengan tombol Salin
Button (outlined): "Cek Status"
```

---

### SCREEN GROUP 7: TIKET SAYA

---

#### SCR-50 — Daftar Tiket

```
[App Bar, navy] "Tiket Saya"
[TabBar: Upcoming (badge count) | Selesai | Dibatalkan]

TicketCard per item:
  Card dengan left accent bar berwarna gold (upcoming) / abu (selesai) / merah (batal)
  Poster thumbnail (70×90)
  Nama event (titleSmall, bold)
  Organisasi | Tanggal | Jam | Lokasi
  Row bawah: Chip tipe tiket + Chip status

Empty state per tab dengan ilustrasi + CTA
```

---

#### SCR-51 — Detail Tiket & QR

```
[App Bar, navy] ← {Nama Event}  [Share] [Download]

Poster compressed (200pt height)
Nama event (bold) + Tanggal + Lokasi

[Divider bergaya sobek/perforated — ciri khas tiket]

Info grid:
  PEMEGANG TIKET     |  TIPE TIKET
  {Nama}             |  {Reguler}
  ORDER ID           |  STATUS
  #{id}              |  Chip "AKTIF" (gold)

[QR Code — center, 250×250pt, padding putih]
Kode: {ticket_code} (monospace)

Info box: "Tunjukkan QR ini ke panitia saat check-in"

[Jika sudah digunakan] overlay "SUDAH DIGUNAKAN" + cap

Button (full-width, gold outlined): "Perbesar QR Code"
```

---

#### SCR-52 — QR Full Screen

```
Background: putih solid
[App Bar putih] ← {Nama Event}

Center:
  Nama peserta (bodySmall, abu)
  QR Code (300×300pt)
  Kode tiket (monospace)

Bottom bar:
  Nama event | Tanggal
```

*Screen ini prevent sleep/dim dan berfungsi offline.*

---

### SCREEN GROUP 8: PROFIL

---

#### SCR-60 — Profil

```
[App Bar, navy] "Profil"  [Settings]

Header: gradient navy-900 → navy-700
  Avatar Google (80pt, ring gold)
  Nama (bold, putih)
  Email (putih/70%)
  Badge "Civitas UNESA ✓" (gold)
  Badge tipe: "Mahasiswa" / "Dosen" / "Tendik"
  Button outlined putih: "Edit Profil"

[List Menu — bg putih]
  🎫 Riwayat Pesanan
  🔖 Event Tersimpan
  🔔 Pengaturan Notifikasi

  [Jika organizer]
  🏢 Dashboard Penyelenggara
  [Jika belum]
  ➕ Daftar sebagai Penyelenggara

  ❓ Bantuan & FAQ
  📜 Syarat & Ketentuan
  🛡️ Kebijakan Privasi

  [Divider]
  Button merah text: "Keluar dari Akun"
    → Konfirmasi dialog sebelum logout
```

---

#### SCR-61 — Edit Profil

```
[App Bar] ← "Edit Profil"  [Simpan]

Avatar (100pt, tap ganti foto)
"Ganti Foto Profil" (gold link)

TextField: Nama Lengkap
TextField: Email (disabled, "tidak dapat diubah")
TextField: Nomor HP
Dropdown: Fakultas
Dropdown: Status
TextField: NIM / NIP
```

---

### SCREEN GROUP 9: ORGANIZER

---

#### SCR-70 — Dashboard Penyelenggara

```
[App Bar, navy] "Dashboard"  [+ Buat Event (FAB gold)]

Card organisasi: logo + nama + badge verifikasi

Stats grid 2×2:
  [Event Aktif]  [Total Peserta]  [Tiket Terjual]  [Pendapatan]
  Warna card: navy / gold / purple / teal

"Event Aktif & Mendatang"
OrganizerEventCard:
  Thumbnail + Nama + Tanggal
  Progress bar gold: "{sold}/{total} tiket"
  Status chip + [Kelola] [Lihat Publik]
```

---

#### SCR-71 — Buat / Edit Event (Multi-step)

```
Step 1: Informasi Dasar
  Judul, Deskripsi, Upload Poster, Kategori,
  Konfigurasi Peserta:
    ○ Internal Only (hanya civitas UNESA via NesaVent)
    ○ Terbuka Umum (booking tetap hanya civitas, tapi event boleh dihadiri siapapun)
    ○ By Invitation (butuh kode akses)

Step 2: Waktu & Tempat
  Tanggal mulai/selesai, Buka/tutup pendaftaran,
  Toggle Online/Offline, Lokasi / Link online

Step 3: Tiket
  Tambah tipe tiket: nama, gratis/berbayar, harga, kuota, periode

Step 4: Review & Publish
  Preview + info review admin
  [Simpan Draft] / [Kirim untuk Review]
```

---

#### SCR-72 — Manajemen Peserta

```
[App Bar] ← "{Event} — Peserta"
[Search + Filter + Export CSV]
Stats: Total | Check-in | Belum

ListView peserta:
  Avatar initial (circle, navy/gold bg)
  Nama + Email | Tipe tiket
  Status chip: "Hadir" (gold) / "Belum" (abu)

FAB: [📷 Scan QR] → SCR-73
```

---

#### SCR-73 — QR Scanner Check-in

```
[Fullscreen camera]
Viewfinder kotak sudut gold
Label: "Arahkan ke QR Code tiket"
Flashlight toggle

[Bottom panel overlay]
Idle: "Siap memindai..."

Valid ✅: animasi green flash
  Nama + Tipe tiket
  "CHECK-IN BERHASIL" (bold, hijau)
  [Scan Berikutnya]

Sudah digunakan ⚠️: warning kuning
  "TIKET SUDAH DIGUNAKAN"
  Waktu check-in sebelumnya

Tidak valid ❌: error merah
  "TIKET TIDAK VALID"
```

---

#### SCR-74 — Profil Organisasi (Public)

```
[App Bar] ← "{Nama Org}"

Header navy: Logo (100pt) + Nama + Tipe + Badge terverifikasi
Deskripsi
Stats: {N} Event | {N} Peserta

[Tabs: Event Aktif | Event Selesai]
Grid 2 kolom EventCard kompak
```

---

### SCREEN GROUP 10: PENDUKUNG

---

#### SCR-80 — Daftar Penyelenggara

```
[App Bar] ← "Daftar Penyelenggara"

Intro + prosedur verifikasi

Nama Organisasi *
Tipe Organisasi *
Fakultas/Unit
Deskripsi
Upload Logo
Email Organisasi Resmi
Upload Dokumen (SK PDF, max 5MB)

Info box gold: "Verifikasi 1-3 hari kerja"

Button (gold, full-width): "Kirim Permohonan"
```

---

#### SCR-81 — Event Tersimpan

```
[App Bar] "Event Tersimpan"

ListView EventCard + swipe-to-delete

Empty: ilustrasi + "Belum ada event tersimpan" + Button "Jelajahi"
```

---

#### SCR-82 — Riwayat Pesanan

```
[App Bar] "Riwayat Pesanan"
[Tabs: Semua | Berhasil | Menunggu | Dibatalkan]

OrderItem:
  Nama Event + Tanggal
  Order ID + Tipe tiket
  Total (bold)  |  Status chip

  [Jika menunggu] Button kecil: "Selesaikan Pembayaran"
```

---

## 11. Navigation & App Flow

```
App Launch
  ├── JWT valid → Beranda (SCR-10)
  └── Tidak ada JWT → Login (SCR-03)
                        ↓ Tap "Masuk dengan Google"
                        Google OAuth
                        ↓ Backend validate @unesa.ac.id
                        ├── Valid + First Time → Onboarding Profil (SCR-04)
                        ├── Valid + Returning → Beranda (SCR-10)
                        └── Invalid domain → Error snackbar di SCR-03

Main App (Bottom Nav 4-5 tab)
  ├── Beranda → Detail Event → Checkout (3 steps) → Konfirmasi
  ├── Jelajahi → Search/Filter → Detail Event
  ├── Tiket Saya → Detail Tiket → QR Fullscreen
  ├── Profil → Edit → Riwayat → Bookmarks
  └── Kelola (organizer) → Dashboard → Buat Event
                                      → Peserta → QR Scanner
```

---

## 12. Design System

### 12.1 Color Palette — UNESA Official

*Berdasarkan warna resmi identitas UNESA.*

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIMARY — Navy Deep (Biru Tua UNESA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
navy-50:   #EEEDF5
navy-100:  #D5D2E9
navy-200:  #ADA8D2
navy-300:  #847EBB
navy-400:  #5C54A4
navy-500:  #342B8D   ← brand medium
navy-600:  #2C2478
navy-700:  #241E63
navy-800:  #1E1A52
navy-900:  #1A1640   ← bg utama (dari palette UNESA)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCENT — Gold / Amber UNESA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gold-50:   #FDF5E6
gold-100:  #FAE9C2
gold-200:  #F5D68A
gold-300:  #EFC155
gold-400:  #E8AC2A
gold-500:  #C9973C   ← brand gold (dari palette UNESA)
gold-600:  #A87C2E
gold-700:  #876120
gold-800:  #664913
gold-900:  #4A3309

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECONDARY — Royal Purple UNESA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
purple-50:  #EDEBF7
purple-100: #D5D0ED
purple-200: #ABA2DB
purple-300: #8173CA
purple-400: #6258B9
purple-500: #4B3C9C   ← brand purple (dari palette UNESA)
purple-600: #3E3284
purple-700: #31276C
purple-800: #251D54
purple-900: #18133C

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEUTRAL — Light Gray UNESA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gray-50:   #FAFAFA
gray-100:  #F5F5F5
gray-200:  #EEEEEE
gray-300:  #CECECE   ← dari palette UNESA
gray-400:  #BDBDBD
gray-500:  #9E9E9E
gray-600:  #757575
gray-700:  #616161
gray-800:  #424242
gray-900:  #212121

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEMANTIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
success:   #22C55E
warning:   #F59E0B
error:     #EF4444
info:      #3B82F6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SURFACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
surface-primary:   #FFFFFF
surface-secondary: #F8F8FA
surface-card:      #FFFFFF
surface-dark:      #1A1640  (navy-900)
```

### 12.2 Semantic Color Usage

| Konteks | Warna |
|---|---|
| App bar, header utama, splash | `navy-900` / `navy-800` |
| Primary action buttons (CTA) | `gold-500` bg + `navy-900` teks |
| Secondary action, outline btn | `navy-500` border + teks |
| Links & interactive text | `gold-500` |
| Category badges | `purple-500` |
| Selected chip | `gold-500` bg |
| Badge "Civitas UNESA" | `gold-500` |
| Status "Aktif" / tiket valid | `success` green |
| Status "Habis" / error | `error` red |
| Badge "Internal Only" | `purple-500` |
| Card borders | `gray-200` |
| Body text | `gray-900` |
| Secondary text | `gray-600` |

### 12.3 Typography

```dart
// Font: Plus Jakarta Sans
// Package: google_fonts

TextTheme(
  displayLarge:  TextStyle(fontSize: 32, fontWeight: FontWeight.w700, letterSpacing: -0.5),
  displayMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.w700, letterSpacing: -0.25),
  headlineLarge: TextStyle(fontSize: 26, fontWeight: FontWeight.w600),
  headlineMedium:TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
  titleLarge:    TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
  titleMedium:   TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
  titleSmall:    TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
  bodyLarge:     TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
  bodyMedium:    TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
  bodySmall:     TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
  labelLarge:    TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
  labelSmall:    TextStyle(fontSize: 11, fontWeight: FontWeight.w500, letterSpacing: 0.5),
)
```

### 12.4 Spacing

```
4pt base grid:
  xs:  4   sm:  8   md: 16
  lg: 24   xl: 32  2xl: 48  3xl: 64

Screen horizontal padding: 16pt
Card padding: 16pt
Section gap: 24pt
```

### 12.5 Component Specs

```
FilledButton (CTA utama):
  bg: gold-500 | teks: navy-900 | bold
  height: 52pt | borderRadius: 14pt | padding H: 24

OutlinedButton:
  border: navy-500 (1.5pt) | teks: navy-500
  height: 52pt | borderRadius: 14pt

TextButton: teks gold-500 | height: 40pt

ElevatedButton (secondary):
  bg: navy-500 | teks: white
  height: 52pt | borderRadius: 14pt

Card:
  bg: white | borderRadius: 16pt
  shadow: 0 2 8 rgba(26,22,64, 0.08)

TextField:
  borderRadius: 12pt | height: 52pt
  border default: gray-300 (1.5pt)
  border focused: gold-500 (2pt)
  filled bg: gray-50

Chip (selected):   gold-500 bg + navy-900 teks | borderRadius: 100pt | H:12 V:0
Chip (unselected): outline gray-300 | borderRadius: 100pt

BottomNavBar:
  bg: white | height: 64pt + safeArea
  selected: navy-900 icon + gold underline indicator
  unselected: gray-400

FAB: gold-500 bg + navy-900 icon | size: 56pt | borderRadius: 16pt

SnackBar: navy-800 bg + white teks (success/error tinted)

Badge: gold-500 bg | size 18pt | teks 10pt bold
```

### 12.6 Gradient Presets

```dart
// Header gradient (App bar → content)
LinearGradient(
  colors: [Color(0xFF1A1640), Color(0xFF241E63)],
  begin: Alignment.topCenter,
  end: Alignment.bottomCenter,
)

// Poster overlay (untuk teks di atas foto)
LinearGradient(
  colors: [Colors.transparent, Color(0xFF1A1640)],
  begin: Alignment.topCenter,
  end: Alignment.bottomCenter,
  stops: [0.4, 1.0],
)

// Gold accent gradient
LinearGradient(
  colors: [Color(0xFFC9973C), Color(0xFFE8AC2A)],
)
```

### 12.7 Animasi & Transisi

```
Page transition:    Fade + slide bawah 200ms easeOut
Bottom sheet:       Slide bawah 300ms easeOut
Loading shimmer:    Gradient navy-100 → navy-50 → navy-100
Success animation:  Lottie (checkmark gold) + confetti gold/purple
QR scan valid:      Haptic medium + green overlay flash 300ms
QR scan invalid:    Haptic heavy + red overlay flash 300ms
```

---

## 13. Phase Roadmap

### Phase 1 — Mobile FE (Sekarang) ~10 Minggu

| Minggu | Deliverable |
|---|---|
| 1-2 | Setup Flutter project, Design System, komponen dasar |
| 3 | Auth (Splash, Onboarding, SCR-03 Login Google, SCR-04 Profil awal) |
| 4-5 | Beranda, Explore/Search, Filter |
| 6-7 | Detail Event + Checkout flow (3 steps) |
| 8 | Tiket Saya + QR Code display |
| 9 | Profil + Notifikasi |
| 10 | Organizer screens (Dashboard, Buat Event, Scanner) |

### Phase 2 — Backend ~6 Minggu

Hono + Drizzle + Supabase, Google OAuth + domain validation, Event/Ticket CRUD, Order & Midtrans, QR check-in API, FCM push notif

### Phase 3 — Web Admin Dashboard ~3 Minggu

Next.js admin, verifikasi event & org, rekap data

### Phase 4 — Fitur Lanjutan

Booking peserta eksternal (non-civitas), SSO UNESA deeper integration, rating & review, sertifikat digital, notifikasi WhatsApp

---

## 14. Out of Scope (v1)

- Login untuk non-civitas UNESA (v2+)
- Booking mandiri peserta eksternal (v2+)
- Live streaming event dalam app
- Fitur chat panitia-peserta
- Marketplace merchandise
- Sertifikat digital kehadiran
- Review & rating event
- Web app untuk peserta

---

*NesaVent PRD v1.1 | Mei 2026 | Tim Pengembang NesaVent UNESA*
