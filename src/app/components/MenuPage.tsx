import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  level: 'soft' | 'medium' | 'strong';
  rating: number;
  signature?: boolean;
}

interface MenuPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onCustomOrder: (item: MenuItem) => void;
}

export function MenuPage({ onNavigate, onAddToCart, onCustomOrder }: MenuPageProps) {
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Kopi Susu Strong',
      description: 'Kopi hitam + susu sedikit (rasa kopi dominan)',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1608032797645-8e9ceb991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJvbmclMjBibGFjayUyMGNvZmZlZXxlbnwxfHx8fDE3NjcyNTU4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      level: 'strong',
      rating: 4.7
    },
    {
      id: '2',
      name: 'Kopi Susu Medium',
      description: 'Seimbang antara kopi & susu',
      price: 13000,
      image: 'https://images.unsplash.com/photo-1631155989916-4aabcabcce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY29mZmVlJTIwbGF0dGV8ZW58MXx8fHwxNzY3MjU3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      level: 'medium',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Kopi Susu Soft',
      description: 'Lebih creamy, cocok pemula',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1586558284840-c5d6d3dc2259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbXklMjBjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjcyNTc1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      level: 'soft',
      rating: 4.6
    },
    {
      id: '4',
      name: 'Kopi Susu Gula Aren',
      description: 'Manis alami, favorit lokal',
      price: 14000,
      image: 'https://images.unsplash.com/photo-1658043186384-7add63d278fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxtJTIwc3VnYXIlMjBjb2ZmZWV8ZW58MXx8fHwxNzY3MjU1ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      level: 'medium',
      rating: 4.9
    },
    {
      id: '5',
      name: 'Kopi Susu Santai',
      description: 'Blend khusus, rasa smooth (Signature House Blend)',
      price: 16000,
      image: 'https://images.unsplash.com/photo-1736813133035-6baf4762fd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBjb2ZmZWUlMjBibGVuZHxlbnwxfHx8fDE3NjcyNTU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      level: 'medium',
      rating: 5.0,
      signature: true
    }
  ];

  const levelColors = {
    soft: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    strong: 'bg-red-100 text-red-700 border-red-300'
  };

  const levelLabels = {
    soft: 'Soft',
    medium: 'Medium',
    strong: 'Strong'
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold">Menu Kopi Kami</h1>
          <p className="mt-2">Pilih kopi favorit atau custom sesuai seleramu</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-[#d4c4b0]">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {item.signature && (
                  <Badge className="absolute top-3 right-3 bg-[#b5a18f] text-white border-0">
                    ⭐ Signature
                  </Badge>
                )}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border ${levelColors[item.level]}`}>
                  {levelLabels[item.level]}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#6d5a43] mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-xl text-[#b5a18f]">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => onAddToCart(item)}
                    className="flex-1 bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                  <Button
                    onClick={() => onCustomOrder(item)}
                    variant="outline"
                    className="border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
                  >
                    Custom
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
