"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MessageCircle, Tag, Scale, CheckCircle2, XCircle, RefreshCw, AlertCircle, Menu, X, Camera, MapPin, Phone, ArrowRight, Clock } from 'lucide-react';

// =========================================================================
// PASTE LINK CSV GOOGLE SHEET ANDA DI BAWAH INI
// =========================================================================
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1KQt7u1PZGGWr8hPkpa0wJ3drwGNBlfVKxcMzeep3rL9GWdXsIEGjIlZM7ipHRjdKENazrfbqT9O0/pub?gid=420945959&single=true&output=csv";

// Mendefinisikan tipe data (interface) untuk Sapi
interface Cow {
  id: number;
  kode: string;
  bobot: number;
  harga: number;
  status: "Tersedia" | "Terjual" | "Dipesan";
  pj: string;
  link: string;
}

// Data dummy untuk fallback jika link belum diganti atau terjadi error
const fallbackCows: Cow[] = [
  { id: 1, kode: "156/1", bobot: 265, harga: 18285000, status: "Tersedia", pj: "", link: "" },
  { id: 2, kode: "176/2", bobot: 396, harga: 27324000, status: "Terjual", pj: "UNIBA", link: "" },
  { id: 3, kode: "158/3", bobot: 333, harga: 22977000, status: "Tersedia", pj: "", link: "" },
  { id: 4, kode: "159/4", bobot: 339, harga: 23391000, status: "Tersedia", pj: "", link: "" },
  { id: 5, kode: "160/5", bobot: 318, harga: 21942000, status: "Terjual", pj: "ALI BIN ABI THOLIB", link: "" },
  { id: 6, kode: "162/6", bobot: 311, harga: 21459000, status: "Tersedia", pj: "", link: "" }
];

const WA_NUMBER = "6281210434927"; // Nomor WhatsApp resmi Salamah Farm
const COLORS = {
  primary: '#1F7A63',   // Deep Green
  secondary: '#F5E6CA', // Warm Beige
  accent: '#D4AF37',    // Gold
};

// --- HELPER FUNCTION ---
const getWaLink = (message: string) => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};

const Logo = ({ inFooter = false }: { inFooter?: boolean }) => (
  <img 
    src="/logo.jpeg" 
    alt="Logo Salamah Farm" 
    className={`object-contain transition-transform hover:scale-105 ${inFooter ? 'h-24' : 'h-16 md:h-20'} ${!inFooter ? 'mix-blend-multiply' : ''}`}
    onError={(e) => {
      e.currentTarget.src = "https://ui-avatars.com/api/?name=SF&background=1F7A63&color=fff";
    }}
  />
);

const FloatingWA = () => (
  <a
    href={getWaLink("Halo Salamah Farm, saya ingin bertanya tentang hewan Qurban.")}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full shadow-2xl transition-transform hover:scale-110 animate-bounce"
    style={{ backgroundColor: '#25D366', color: 'white' }}
    aria-label="Hubungi via WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hanya jalankan auto-hide jika lebar layar adalah mobile (< 768px)
      if (window.innerWidth < 768) {
        // Sembunyikan navbar jika scroll ke bawah dan sudah melewati 80px
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setIsVisible(false);
          setIsOpen(false); // Menutup menu mobile jika sedang terbuka
        } else {
          // Tampilkan navbar saat scroll ke atas
          setIsVisible(true);
        }
      } else {
        // Desktop selalu terlihat
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Panggil sekali untuk memastikan state benar saat di-load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menggunakan prefix '/' agar dari route /katalog dapat kembali ke page utama (home)
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/#about' },
    { name: 'Hewan Qurban', href: '/#products' },
    { name: 'Katalog', href: '/katalog' },
    { name: 'Cara Kerja', href: '/#how-it-works' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav className={`fixed w-full z-40 top-0 bg-white shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <a href="/"><Logo /></a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-700 hover:text-[#1F7A63] font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href={getWaLink("Halo, saya tertarik memesan hewan qurban.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: COLORS.primary }}
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-[#F5E6CA] hover:text-[#1F7A63]"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={getWaLink("Halo, saya tertarik memesan hewan qurban.")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-3 mt-4 rounded-md text-white font-semibold"
              style={{ backgroundColor: COLORS.primary }}
            >
              Hubungi via WA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("kode-asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Fungsi sederhana untuk mem-parsing CSV
  const parseCSV = (csvText: string): Cow[] => {
    const rows = csvText.split('\n').map(row => row.trim()).filter(row => row);
    if (rows.length < 2) return [];

    const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

    const parsedData: Cow[] = [];
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',').map(v => v.trim());
      const rowObj: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        rowObj[header] = values[index] || "";
      });

      // Menyesuaikan identifikasi status menjadi Tersedia / Terjual / Dipesan
      let parsedStatus: "Tersedia" | "Terjual" | "Dipesan" = "Tersedia";
      const rawStatus = rowObj.status ? rowObj.status.toLowerCase() : "";
      
      if (rawStatus.includes('terjual') || rawStatus === 'sold') {
        parsedStatus = "Terjual";
      } else if (rawStatus.includes('book') || rawStatus === 'booking' || rawStatus.includes('pesan')) {
        parsedStatus = "Dipesan";
      }

      parsedData.push({
        id: i,
        kode: rowObj.kode || "-",
        bobot: parseInt(rowObj.bobot) || 0,
        harga: parseInt(rowObj.harga) || 0,
        status: parsedStatus,
        pj: rowObj.pj || "",
        link: rowObj.link || rowObj.media || rowObj.foto || rowObj['link media'] || ""
      });
    }
    return parsedData;
  };

  // Fungsi untuk mengambil data dari Google Sheet
  const fetchSheetData = async () => {
    setIsLoading(true);
    setError(null);

    if (GOOGLE_SHEET_CSV_URL.includes("GANTI_DENGAN_LINK_ASLI_ANDA")) {
      console.warn("Menggunakan data dummy karena URL Spreadsheet belum diubah.");
      setCows(fallbackCows);
      setError("Anda masih menggunakan data contoh. Silakan ganti variabel GOOGLE_SHEET_CSV_URL di dalam kode dengan link Google Sheet CSV Anda yang asli.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL, {
        cache: 'no-store' // Mencegah browser menyimpan cache tabel yang lama
      });
      if (!response.ok) throw new Error("Gagal mengambil data dari Spreadsheet");
      
      const csvText = await response.text();
      const data = parseCSV(csvText);
      setCows(data.length > 0 ? data : fallbackCows);
    } catch (err) {
      console.error(err);
      setCows(fallbackCows);
      setError("Gagal memuat data dari Spreadsheet Anda. Menampilkan data contoh. Pastikan link CSV Google Sheet sudah benar dan dipublikasikan (Publish to web).");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter dan Sorting logic
  const filteredAndSortedCows = useMemo(() => {
    let result = [...cows].filter(cow => 
      cow.kode.toLowerCase().includes(search.toLowerCase()) || 
      cow.pj.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case 'bobot-asc': return a.bobot - b.bobot;
        case 'bobot-desc': return b.bobot - a.bobot;
        case 'harga-asc': return a.harga - b.harga;
        case 'harga-desc': return b.harga - a.harga;
        case 'status': {
          const order = { "Tersedia": 1, "Dipesan": 2, "Terjual": 3 };
          if (order[a.status] === order[b.status]) return a.id - b.id;
          return order[a.status] - order[b.status];
        }
        case 'kode-asc':
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [cows, search, sortBy]);

  // Hitung ringkasan
  const totalTersedia = cows.filter(c => c.status === "Tersedia").length;
  const totalTerjual = cows.filter(c => c.status === "Terjual").length;
  const totalDipesan = cows.filter(c => c.status === "Dipesan").length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pt-24 flex flex-col">
      <div className="flex-grow pb-12">
        <Navbar />
        <FloatingWA />

        {/* Header/Hero Section */}
        <header className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="bg-white p-1.5 rounded-full shadow-2xl shrink-0 ring-4 ring-green-700/50">
              <img 
                src="/logo.jpeg" 
                alt="Logo Salamah Farm" 
                className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-full bg-white mix-blend-multiply"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Salamah+Farm&background=1F7A63&color=fff&size=150&bold=true";
                }}
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
                Katalog Sapi Qurban
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-5 drop-shadow-md">
                SALAMAH FARM SOLO
              </h2>
              
              <div className="inline-block bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-lg">
                <p className="text-sm md:text-base font-semibold text-green-50 tracking-wider flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                  <span>✓ GRATIS PERAWATAN</span>
                  <span className="hidden md:inline text-green-400">•</span>
                  <span>✓ FREE ONGKIR</span>
                  <span className="hidden md:inline text-green-400">•</span>
                  <span>✓ BERGARANSI</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari kode sapi atau nama pembeli..."
                className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent py-2.5 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select
                className="rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-400 py-2.5 px-4 text-sm font-medium"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="kode-asc">Urutkan Kode Sapi</option>
                <option value="bobot-desc">Bobot (Terberat - Teringan)</option>
                <option value="bobot-asc">Bobot (Teringan - Terberat)</option>
                <option value="harga-desc">Harga (Tertinggi - Terendah)</option>
                <option value="harga-asc">Harga (Terendah - Tertinggi)</option>
                <option value="status">Status (Tersedia Dahulu)</option>
              </select>

              <button
                onClick={fetchSheetData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Data Segarkan
              </button>
            </div>
          </div>

          {/* Stats dengan <strong translate="no"> untuk mencegah gangguan Auto-Translate Browser Chrome */}
          <div className="flex gap-4 border-t border-gray-100 pt-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-600">
                Tersedia: <strong className="text-gray-900 text-base" translate="no">{totalTersedia}</strong> Ekor
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="font-medium text-gray-600">
                Dipesan: <strong className="text-gray-900 text-base" translate="no">{totalDipesan}</strong> Ekor
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-medium text-gray-600">
                Terjual: <strong className="text-gray-900 text-base" translate="no">{totalTerjual}</strong> Ekor
              </span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <RefreshCw className="w-10 h-10 animate-spin text-green-600 mb-4" />
            <p className="font-medium">Memuat data dari Spreadsheet...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
            <h3 className="text-lg font-bold mb-1">Terjadi Kesalahan</h3>
            <p className="max-w-md">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-auto max-h-[70vh]">
              <table className="w-full text-left text-sm relative">
                <thead className="sticky top-0 z-20 shadow-sm ring-1 ring-gray-200 text-gray-700 uppercase font-semibold text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 bg-gray-50">Kode Sapi</th>
                    <th className="px-6 py-4 bg-gray-50">Bobot</th>
                    <th className="px-6 py-4 bg-gray-50">Daftar Harga</th>
                    <th className="px-6 py-4 bg-gray-50">Status</th>
                    <th className="px-6 py-4 bg-gray-50">Pembeli (PJ)</th>
                    <th className="px-6 py-4 bg-gray-50 text-center">Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAndSortedCows.map((cow) => (
                    <tr key={cow.id} className={`hover:bg-gray-50/50 transition-colors ${cow.status === 'Terjual' ? 'bg-red-50/30' : cow.status === 'Dipesan' ? 'bg-yellow-50/30' : ''}`}>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-md border border-yellow-200">{cow.kode}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">{cow.bobot} kg</td>
                      <td className="px-6 py-4 font-bold text-green-700">{formatRupiah(cow.harga)}</td>
                      <td className="px-6 py-4">
                        {cow.status === "Terjual" ? (
                          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            SOLD
                          </span>
                        ) : cow.status === "Dipesan" ? (
                          <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold">
                            <Clock className="w-3.5 h-3.5" /> Booked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                            Tersedia
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600">{cow.pj || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        {cow.link ? (
                          <a 
                            href={cow.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-lg text-xs font-bold transition-colors border border-green-200"
                          >
                            <Camera className="w-3.5 h-3.5" /> Lihat
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAndSortedCows.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Data tidak ditemukan berdasarkan filter pencarian Anda.
              </div>
            )}
          </div>
        )}
      </main>
      </div>

      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6 bg-white inline-block p-4 rounded-2xl shadow-xl">
                <Logo inFooter={true} />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Pusat penyedia hewan Qurban terpercaya di Solo Raya. Mengedepankan prinsip Syariah, kualitas, dan pelayanan terbaik untuk kepuasan ibadah Anda.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6" style={{ color: COLORS.accent }}>Kontak Kami</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 mt-1" style={{ color: COLORS.accent }} />
                  <span>Masjid Ali Bin Abi Thalib,<br/>Sawah, Sanggrahan, Grogol,<br/>Kab. Sukoharjo, Jawa Tengah 57552</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0" style={{ color: COLORS.accent }} />
                  <span>+62 812-1043-4927</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6" style={{ color: COLORS.accent }}>Lokasi Rumah Qurban</h4>
              <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <iframe 
                  src="https://maps.google.com/maps?q=-7.592967682618572,110.80127866441777&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Salamah Farm"
                ></iframe>
              </div>
              <a href="https://maps.app.goo.gl/yFhpkq9DoLTNs2Xy6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm hover:text-white transition-colors" style={{ color: COLORS.accent }}>
                Buka di Google Maps <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Rumah Qurban Salamah Farm. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}