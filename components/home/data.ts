import { colors } from "@/constants/theme";
import {
  MockUser,
  Category,
  TrendingEvent,
  LoopingTrendingEvent,
  ForYouEvent,
  UpcomingEvent,
  Ticket,
  Banner,
  LoopingBanner,
  Article,
} from "./types";

export const mockUser: MockUser = {
  name: "Firaz Fulvian Hafiz",
  role: "Mahasiswa",
  faculty: "Teknik",
  avatar: "https://i.pravatar.cc/150?img=8",
  notifCount: 3,
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "Semua", icon: "grid-outline" },
  { id: "seminar", label: "Seminar", icon: "mic-outline" },
  { id: "workshop", label: "Workshop", icon: "construct-outline" },
  { id: "kompetisi", label: "Kompetisi", icon: "trophy-outline" },
  { id: "seni", label: "Seni & Budaya", icon: "musical-notes-outline" },
  { id: "olahraga", label: "Olahraga", icon: "football-outline" },
  { id: "sosial", label: "Sosial", icon: "people-outline" },
  { id: "festival", label: "Festival", icon: "sparkles-outline" },
];

export const TRENDING_EVENTS: TrendingEvent[] = [
  {
    id: "1",
    title: "National Student Summit 2025",
    organizer: "BEM UNESA",
    category: "Seminar",
    date: "Sabtu, 14 Jun 2025",
    time: "08.00 WIB",
    location: "Gedung Rektorat UNESA",
    price: 0,
    quota: 500,
    remaining: 127,
    image:
      "https://images.unsplash.com/photo-1756367274325-5e3fd0a83652?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Gratis", "Internal"],
    isHot: true,
  },
  {
    id: "2",
    title: "UNESA Design Sprint Challenge",
    organizer: "Himpunan Teknik Informatika",
    category: "Kompetisi",
    date: "Minggu, 22 Jun 2025",
    time: "09.00 WIB",
    location: "Gedung T8 Kampus Ketintang",
    price: 50000,
    quota: 120,
    remaining: 34,
    image:
      "https://images.unsplash.com/photo-1673252412864-db659fd8707a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Terbuka"],
    isHot: true,
  },
  {
    id: "3",
    title: "Pagelaran Wayang Modern — Lakon Arjuna",
    organizer: "UKM Seni Budaya",
    category: "Seni",
    date: "Jumat, 27 Jun 2025",
    time: "19.00 WIB",
    location: "Auditorium UNESA",
    price: 35000,
    quota: 300,
    remaining: 89,
    image:
      "https://images.unsplash.com/photo-1751083384534-e4d49e674712?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Internal"],
    isHot: false,
  },
  {
    id: "4",
    title: "Workshop UI/UX Design System",
    organizer: "Himpunan Teknologi Pendidikan",
    category: "Workshop",
    date: "Sabtu, 5 Jul 2025",
    time: "08.30 WIB",
    location: "Lab Komputer B4",
    price: 75000,
    quota: 50,
    remaining: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1658506729016-b0beeebda208?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Berbayar", "Sertifikat"],
    isHot: false,
  },
];

export const LOOPING_TRENDING: LoopingTrendingEvent[] = Array.from({ length: 100 })
  .flatMap(() => TRENDING_EVENTS)
  .map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));

export const FOR_YOU_EVENTS: ForYouEvent[] = [
  {
    id: "5",
    title: "Pelatihan Pemrograman Web Modern",
    organizer: "UKM Coding UNESA",
    category: "Workshop",
    date: "Rabu, 18 Jun 2025",
    time: "13.00 WIB",
    location: "Lab Terpadu FMIPA",
    price: 0,
    quota: 80,
    remaining: 45,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    tags: ["Gratis", "Internal"],
  },
  {
    id: "6",
    title: "Seminar Kewirausahaan Mahasiswa",
    organizer: "LP2M UNESA",
    category: "Seminar",
    date: "Kamis, 19 Jun 2025",
    time: "09.00 WIB",
    location: "Aula Rektorat Lt. 3",
    price: 0,
    quota: 200,
    remaining: 178,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    tags: ["Gratis", "Terbuka"],
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "7",
    title: "PKKMB Mahasiswa Baru 2025",
    organizer: "BEM UNESA",
    date: "Senin, 21 Jul 2025",
    time: "07.00 WIB",
    location: "Lapangan Rektorat",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    daysLeft: 33,
  },
  {
    id: "8",
    title: "UNESA Cup Futsal 2025",
    organizer: "BEM Fakultas Teknik",
    date: "Sabtu, 26 Jul 2025",
    time: "08.00 WIB",
    location: "GOR UNESA Kampus Lidah",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    daysLeft: 38,
  },
  {
    id: "9",
    title: "Dies Natalis UNESA ke-61",
    organizer: "Panitia Dies Natalis",
    date: "Selasa, 19 Ags 2025",
    time: "08.00 WIB",
    location: "Kampus UNESA Ketintang",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    daysLeft: 62,
  },
];

export const MY_TICKETS: Ticket[] = [
  {
    id: "t1",
    eventTitle: "National Student Summit 2025",
    organizer: "BEM UNESA",
    date: "Sabtu, 14 Jun 2025",
    time: "08.00 WIB",
    location: "Gedung Rektorat",
    ticketType: "Reguler",
    ticketCode: "NSS-2025-00142",
    status: "upcoming",
    color: colors.primary.DEFAULT,
  },
  {
    id: "t2",
    eventTitle: "Workshop UI/UX Design System",
    organizer: "Himpunan TP",
    date: "Sabtu, 5 Jul 2025",
    time: "08.30 WIB",
    location: "Lab Komputer B4",
    ticketType: "Early Bird",
    ticketCode: "WRK-2025-00089",
    status: "upcoming",
    color: colors.accent.DEFAULT,
  },
];

export const BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Event Bulan Juni",
    subtitle: "20+ event seru menanti kamu",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Lihat Semua",
  },
  {
    id: "b2",
    title: "Daftarkan Organisasimu",
    subtitle: "Buat dan kelola event UNESA",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    cta: "Daftar Sekarang",
  },
  {
    id: "b3",
    title: "Tiket Gratis Tersedia!",
    subtitle: "Seminar Kewirausahaan — 19 Jun",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    cta: "Ambil Tiket",
  },
];

export const LOOPING_BANNERS: LoopingBanner[] = Array.from({ length: 100 })
  .flatMap(() => BANNERS)
  .map((item, index) => ({
    ...item,
    uniqueId: `${item.id}-${index}`,
  }));

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Saksikan Aksi Seru Bob Odenkirk di Film Terbarunya, 'Normal'",
    date: "3 hari lalu",
    views: "432",
    likes: "1",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "2",
    title:
      "Perankan Guru di Film 'Children of Heaven', Dodit Mulyanto Pernah Jadi Peng...",
    date: "4 hari lalu",
    views: "984",
    likes: "3",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "3",
    title: "Yuk Berpetualang di Gunung Klawih Bareng Geng Sekawan Limo!",
    date: "6 hari lalu",
    views: "2K",
    likes: "33",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  },
];
