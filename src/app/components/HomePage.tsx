import { Coffee, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
  cartItemCount: number;
  currentUser: any;
  onLogout: () => void;
}

export function HomePage({ onNavigate, cartItemCount, currentUser, onLogout }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* Header */}
      <header className="bg-[#b5a18f] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-8 h-8 text-white" />
            <h1 className="text-white text-2xl font-bold">Kopi Santai</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-white hover:text-[#f5e6d3] transition">
              Beranda
            </button>
            <button onClick={() => onNavigate('menu')} className="text-white hover:text-[#f5e6d3] transition">
              Menu
            </button>
            <button onClick={() => onNavigate('mood')} className="text-white hover:text-[#f5e6d3] transition">
              Rekomendasi
            </button>
            {currentUser && (
              <button onClick={() => onNavigate('reviews')} className="text-white hover:text-[#f5e6d3] transition">
                Ulasan
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('cart')} 
              className="relative text-white hover:text-[#f5e6d3] transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-white text-sm hidden md:inline">{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="bg-[#8b7355] text-white px-3 py-1 rounded-md hover:bg-[#6d5a43] transition text-sm"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="bg-white text-[#b5a18f] px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')} 
                className="flex items-center gap-2 bg-white text-[#b5a18f] px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Masuk</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1648880689952-4d76f2a10c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBjb3p5fGVufDF8fHx8MTc2NzI1NzUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Kopi Santai"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Santai Ngopi, Nikmati Hari</h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Kopi lokal pilihan dengan cita rasa istimewa</p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              onClick={() => onNavigate('menu')}
              className="bg-[#b5a18f] hover:bg-[#9d8a78] text-white px-8 py-6 text-lg rounded-lg shadow-lg"
            >
              Lihat Menu
            </Button>
            <Button
              onClick={() => onNavigate('custom')}
              className="bg-white hover:bg-gray-100 text-[#b5a18f] px-8 py-6 text-lg rounded-lg shadow-lg"
            >
              Custom Kopi
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#8b7355]">Kenapa Kopi Santai?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-[#f5f1ed] hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#b5a18f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-[#6d5a43]">100% Lokal</h4>
              <p className="text-gray-600">Kopi pilihan dari petani lokal Indonesia</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-[#f5f1ed] hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#b5a18f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-[#6d5a43]">Custom Sesuai Selera</h4>
              <p className="text-gray-600">Atur level kopi, gula, dan suhu sesukamu</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-[#f5f1ed] hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#b5a18f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😊</span>
              </div>
              <h4 className="text-xl font-bold mb-2 text-[#6d5a43]">Rekomendasi Mood</h4>
              <p className="text-gray-600">Temukan kopi yang cocok dengan suasana hatimu</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#b5a18f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Siap Menikmati Kopi Santai?</h3>
          <p className="text-xl mb-8">Pesan sekarang dan rasakan pengalaman ngopi yang berbeda!</p>
          <Button
            onClick={() => onNavigate('menu')}
            className="bg-white hover:bg-gray-100 text-[#b5a18f] px-8 py-6 text-lg rounded-lg shadow-lg"
          >
            Pesan Sekarang
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6d5a43] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6" />
            <span className="font-bold">Kopi Santai</span>
          </div>
          <p className="text-gray-300 text-sm">© 2026 Kopi Santai. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
