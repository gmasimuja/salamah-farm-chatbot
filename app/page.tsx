"use client"

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Star,
  ArrowRight,
  Phone,
  Bot,
  Send
} from 'lucide-react';

// --- CONFIGURATION ---
const WA_NUMBER = "6281221595529"; // Nomor WhatsApp resmi Salamah Farm
const COLORS = {
  primary: '#1F7A63',   // Deep Green
  secondary: '#F5E6CA', // Warm Beige
  accent: '#D4AF37',    // Gold
};

// --- HELPER FUNCTION ---
const getWaLink = (message) => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};

// --- COMPONENTS ---

// 1. Logo Component
const Logo = () => (
  <div className="flex items-center gap-2">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill={COLORS.primary}/>
      <path d="M50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80Z" stroke={COLORS.accent} strokeWidth="4" strokeDasharray="8 4"/>
      <path d="M50 70C61.0457 70 70 61.0457 70 50C70 41.6575 64.8872 34.5054 57.5 31.5C59.0838 34.4005 60 37.6627 60 41.1111C60 52.1568 51.0457 61.1111 40 61.1111C36.5516 61.1111 33.2894 60.1949 30.3889 58.6111C33.3945 66.0028 40.5466 71.1111 48.9348 71.1111C49.2882 71.1111 49.6429 71.0739 50 70Z" fill={COLORS.accent}/>
      <path d="M38 35C38 35 45 35 45 42C45 35 52 35 52 35C52 35 45 35 45 28C45 35 38 35 38 35Z" fill={COLORS.secondary}/>
    </svg>
    <div>
      <h1 className="text-xl md:text-2xl font-bold leading-none tracking-tight" style={{ color: COLORS.primary }}>Salamah</h1>
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: COLORS.accent }}>Farm</span>
    </div>
  </div>
);

// 2. Floating WhatsApp Button
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

// 3. Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Hewan Qurban', href: '#products' },
    { name: 'Cara Kerja', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed w-full z-40 top-0 bg-white shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#home"><Logo /></a>
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

// 4. Chatbot Component (AI Assistant)
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Assalamu\'alaikum! Saya asisten virtual Salamah Farm. Ada yang bisa saya bantu terkait info hewan Qurban?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Endpoint yang akan ditangkap oleh app/api/chat/route.js di Next.js
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: messages
        })
      });

      if (!response.ok) throw new Error('Gagal menghubungi server');
      
      const data = await response.json();
      // Menyesuaikan dengan struktur balasan dari route.js Anda nantinya
      // (Bisa data.reply, data.message, atau struktur lain)
      setMessages(prev => [...prev, { role: 'bot', text: data.reply || data.message || data.text || 'Pesan diterima, namun format balasan AI belum sesuai.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Maaf, sistem AI sedang offline atau terjadi gangguan jaringan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center p-4 rounded-full shadow-2xl transition-transform hover:scale-110 bg-white border border-gray-100"
        style={{ color: COLORS.primary }}
        aria-label="Buka AI Chatbot"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[400px]">
          {/* Header */}
          <div className="p-4 text-white flex items-center gap-3" style={{ backgroundColor: COLORS.primary }}>
            <Bot size={24} />
            <div>
              <h3 className="font-bold leading-none">Asisten AI Salamah</h3>
              <span className="text-xs opacity-80">Didukung oleh Gemini</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1F7A63] text-white self-end rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none'
                }`}
              >
                
                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
              
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-200 text-gray-500 self-start p-3 rounded-xl rounded-bl-none text-sm flex gap-1 shadow-sm">
                <span className="animate-bounce">.</span><span className="animate-bounce" style={{animationDelay: '0.2s'}}>.</span><span className="animate-bounce" style={{animationDelay: '0.4s'}}>.</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya soal hewan qurban..."
              className="flex-1 bg-gray-100 border border-transparent rounded-lg px-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-[#1F7A63] transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg text-white disabled:opacity-50 transition-colors"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- MAIN PAGES SECTIONS ---

export default function App() {
  const products = [
    {
      id: 'kambing',
      title: 'Kambing Qurban',
      desc: 'Kambing Jawa / Randu pilihan, dirawat secara alami.',
      weight: '25 - 35 kg',
      price: 'Mulai Rp 2.500.000',
      image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'domba',
      title: 'Domba Merino / Garut',
      desc: 'Bulu lebat, daging tebal, sehat dan gesit.',
      weight: '30 - 45 kg',
      price: 'Mulai Rp 3.200.000',
      image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'sapi',
      title: 'Sapi Bali',
      desc: 'Sapi Bali kualitas premium dengan persentase daging tinggi. Cocok untuk qurban rombongan (7 orang).',
      weight: '250 - 400 kg',
      price: 'Mulai Rp 18.000.000',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=600',
    }
  ];

  const steps = [
    { num: "01", title: "Pilih Hewan", desc: "Lihat katalog kami atau konsultasi via WhatsApp untuk memilih hewan yang sesuai budget & kebutuhan." },
    { num: "02", title: "Pembayaran", desc: "Lakukan pembayaran DP atau Lunas secara aman. Kami akan mengirimkan bukti tanda terima." },
    { num: "03", title: "Perawatan Gratis", desc: "Hewan dititipkan dan dirawat dengan pakan terbaik di kandang kami tanpa biaya tambahan hingga hari H." },
    { num: "04", title: "Pengiriman / Potong", desc: "Hewan dikirim ke lokasi Anda (Gratis Ongkir Solo Raya) atau dipotong di tempat kami sesuai syariat." }
  ];

  const faqs = [
    { q: "Apakah hewan qurban di Salamah Farm sesuai syariat?", a: "Tentu. Semua hewan qurban kami telah diperiksa kesehatannya, cukup umur (poel), tidak cacat, dan sah untuk dijadikan ibadah qurban." },
    { q: "Apakah bisa memilih hewannya secara langsung?", a: "Sangat bisa! Kami mengundang Anda untuk datang langsung ke kandang kami di Solo untuk memilih hewan secara langsung. Atau bisa kami fotokan/videokan via WhatsApp." },
    { q: "Apakah ada biaya tambahan untuk pengiriman?", a: "Kami memberikan GRATIS ONGKIR untuk pengiriman hewan qurban ke wilayah Solo Raya (Surakarta, Sukoharjo, Karanganyar, Boyolali, dll)." },
    { q: "Bisakah dipotong di Salamah Farm lalu dagingnya disalurkan?", a: "Bisa. Kami melayani jasa pemotongan, pengemasan, hingga penyaluran ke pondok pesantren atau panti asuhan rekanan kami." },
  ];

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
      <Navbar />
      <FloatingWA />
      <Chatbot />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#e8f1ef] to-white">
        {/* Decorative Islamic Pattern Background (Subtle) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1F7A63 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}>
                🌿 Peternakan Qurban Solo Raya
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
                Qurban Terpercaya, <br/>
                <span style={{ color: COLORS.primary }}>Dirawat Sepenuh Hati.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Salamah Farm menyediakan Kambing, Domba, dan Sapi qurban terbaik. Dijamin sehat, cukup umur, dan memenuhi syariat untuk kesempurnaan ibadah Anda.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#products" className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-white transition-all hover:shadow-lg hover:-translate-y-1 text-center" style={{ backgroundColor: COLORS.primary }}>
                  Lihat Hewan Qurban
                </a>
                <a href={getWaLink("Assalamu'alaikum, saya ingin info lebih lanjut tentang hewan Qurban di Salamah Farm.")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 border-2 hover:bg-gray-50" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>
                  <Phone size={20} /> Konsultasi WA
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 rounded-3xl transform translate-x-4 translate-y-4" style={{ backgroundColor: COLORS.secondary }}></div>
              <img 
                src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1000" 
                alt="Peternakan Salamah Farm" 
                className="relative z-10 rounded-3xl object-cover w-full h-[400px] md:h-[500px] shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: COLORS.secondary, color: COLORS.accent }}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">100% Syar'i</p>
                  <p className="text-sm text-gray-500">Sehat & Cukup Umur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION / FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow bg-gray-50">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Sesuai Syariat</h3>
              <p className="text-gray-600">Hewan telah diperiksa ketat. Dijamin sehat, tidak cacat, dan poel (cukup umur).</p>
            </div>
            <div className="p-6 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow bg-gray-50">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}>
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Perawatan Alami</h3>
              <p className="text-gray-600">Diberi pakan hijauan segar dan konsentrat bernutrisi di kandang yang bersih.</p>
            </div>
            <div className="p-6 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow bg-gray-50">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}>
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Gratis Ongkir & Rawat</h3>
              <p className="text-gray-600">Gratis biaya penitipan hingga hari H dan gratis ongkir untuk wilayah Solo Raya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US */}
      <section id="about" className="py-20" style={{ backgroundColor: '#fcfaf8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1596733430284-f743727521a0?auto=format&fit=crop&q=80&w=400" alt="Peternakan" className="rounded-xl w-full h-48 object-cover shadow-md" />
                <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=400" alt="Kambing" className="rounded-xl w-full h-48 object-cover shadow-md mt-8" />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>Tentang Salamah Farm</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Berlokasi di Solo, Jawa Tengah, <strong>Salamah Farm</strong> hadir sebagai mitra terpercaya umat muslim dalam menunaikan ibadah Qurban. Kami memahami bahwa Qurban bukan sekadar menyembelih hewan, melainkan wujud ketaatan kepada Allah SWT.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Oleh karena itu, kami merawat setiap hewan dengan prinsip <em>Ihsan</em> (kebaikan). Mulai dari kebersihan kandang, kualitas pakan, hingga proses penyembelihan (jika diamanahkan kepada kami) dilakukan dengan profesional dan penuh adab Islami.
              </p>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold" style={{ color: COLORS.accent }}>500+</span>
                  <span className="text-sm text-gray-500">Hewan Terjual</span>
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold" style={{ color: COLORS.accent }}>100%</span>
                  <span className="text-sm text-gray-500">Amanah & Syar'i</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS / HEWAN QURBAN */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Pilihan Hewan Qurban</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai pilihan berat dan ras hewan qurban. Hubungi kami untuk mendapatkan foto/video update terbaru dari kandang.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-green-700 shadow flex items-center gap-1">
                    <CheckCircle2 size={16} /> Ready Stock
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{prod.title}</h3>
                  <p className="text-gray-600 mb-4 h-12">{prod.desc}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">Estimasi Berat</span>
                      <span className="font-semibold text-gray-800">{prod.weight}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">Status Kesehatan</span>
                      <span className="font-semibold text-green-600">Sehat & Poel</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500">Harga</span>
                      <span className="font-bold text-xl" style={{ color: COLORS.primary }}>{prod.price}</span>
                    </div>
                  </div>

                  <a 
                    href={getWaLink(`Bismillah, saya tertarik dengan ${prod.title} (${prod.weight}). Mohon info ketersediaan dan foto aslinya.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-bold transition-transform hover:-translate-y-1"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    <MessageCircle size={20} /> Pesan Sekarang
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Cara Mudah Berqurban</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Proses pemesanan transparan, aman, dan dapat dilakukan dari rumah Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-[#d8c39e] -translate-y-1/2 z-0"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 bg-white p-8 rounded-2xl shadow-md text-center">
                <div 
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.primary }}>{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>Apa Kata Mereka?</h2>
            <p className="text-gray-600">Alhamdulillah, telah dipercaya oleh ratusan shohibul qurban setiap tahunnya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Bpk. Ahmad", loc: "Banjarsari, Solo", text: "Kambingnya besar dan sehat. Pelayanan ramah, kandang bersih. Sangat direkomendasikan untuk warga Solo!" },
              { name: "Ibu Fatimah", loc: "Sukoharjo", text: "Alhamdulillah tahun lalu beli sapi rombongan di sini. Pengiriman tepat waktu hari H pagi, sapi tidak stres." },
              { name: "Mas Budi", loc: "Colomadu", text: "Praktis banget. Tinggal WA, dikasih video hewannya, bayar DP, langsung dirawat sampai Idul Adha. Terima kasih Salamah Farm." }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-20" style={{ backgroundColor: '#fcfaf8' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>Tanya Jawab (FAQ)</h2>
            <p className="text-gray-600">Pertanyaan yang sering diajukan seputar layanan Salamah Farm.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-gray-500 shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 shrink-0" size={20} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siapkan Ibadah Qurban Terbaik Anda Tahun Ini</h2>
              <p className="text-green-50 mb-10 text-lg max-w-2xl mx-auto">
                Stok hewan unggulan terbatas menjelang hari raya. Amankan hewan qurban pilihan Anda sekarang juga dengan sistem DP ringan.
              </p>
              <a 
                href={getWaLink("Assalamu'alaikum, saya ingin tanya-tanya dulu seputar Qurban tahun ini.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
                style={{ color: COLORS.primary }}
              >
                <MessageCircle size={24} /> Hubungi Kami via WA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6 bg-white inline-block p-2 rounded-xl">
                <Logo />
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
                  <span>Jl. Peternakan Damai No. 123,<br/>Kec. Banjarsari, Kota Surakarta,<br/>Jawa Tengah 57135</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0" style={{ color: COLORS.accent }} />
                  <span>0812-2159-5529</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6" style={{ color: COLORS.accent }}>Lokasi Kandang</h4>
              {/* Placeholder untuk Google Maps Embed */}
              <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 border border-gray-700">
                [Google Maps Embed Placeholder]
              </div>
              <a href="#" className="inline-flex items-center gap-1 mt-3 text-sm hover:text-white transition-colors" style={{ color: COLORS.accent }}>
                Buka di Google Maps <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Salamah Farm Solo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}