import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MoodRecommendationProps {
  onNavigate: (page: string) => void;
  onAddToCart: (item: any) => void;
}

export function MoodRecommendation({ onNavigate, onAddToCart }: MoodRecommendationProps) {
  const moods = [
    {
      emoji: '😊',
      label: 'Happy & Chill',
      description: 'Lagi senang dan ingin bersantai',
      recommendation: {
        id: '3',
        name: 'Kopi Susu Soft',
        description: 'Lebih creamy, cocok pemula',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1586558284840-c5d6d3dc2259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbXklMjBjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjcyNTc1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        level: 'soft',
        rating: 4.6
      },
      reason: 'Rasa creamy yang smooth cocok untuk menemani momen santaimu'
    },
    {
      emoji: '💪',
      label: 'Need Energy',
      description: 'Butuh dorongan semangat',
      recommendation: {
        id: '1',
        name: 'Kopi Susu Strong',
        description: 'Kopi hitam + susu sedikit (rasa kopi dominan)',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1608032797645-8e9ceb991b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJvbmclMjBibGFjayUyMGNvZmZlZXxlbnwxfHx8fDE3NjcyNTU4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        level: 'strong',
        rating: 4.7
      },
      reason: 'Rasa kopi yang kuat akan memberi energi ekstra untuk aktivitasmu'
    },
    {
      emoji: '🧘',
      label: 'Zen & Focus',
      description: 'Ingin fokus dan tenang',
      recommendation: {
        id: '5',
        name: 'Kopi Susu Santai',
        description: 'Blend khusus, rasa smooth (Signature House Blend)',
        price: 16000,
        image: 'https://images.unsplash.com/photo-1736813133035-6baf4762fd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBjb2ZmZWUlMjBibGVuZHxlbnwxfHx8fDE3NjcyNTU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        level: 'medium',
        rating: 5.0,
        signature: true
      },
      reason: 'Blend signature kami dengan rasa balanced, sempurna untuk meditasi atau bekerja'
    },
    {
      emoji: '❤️',
      label: 'Sweet Mood',
      description: 'Ingin sesuatu yang manis',
      recommendation: {
        id: '4',
        name: 'Kopi Susu Gula Aren',
        description: 'Manis alami, favorit lokal',
        price: 14000,
        image: 'https://images.unsplash.com/photo-1658043186384-7add63d278fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxtJTIwc3VnYXIlMjBjb2ZmZWV8ZW58MXx8fHwxNzY3MjU1ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        level: 'medium',
        rating: 4.9
      },
      reason: 'Gula aren memberikan rasa manis alami yang menenangkan'
    },
    {
      emoji: '🎯',
      label: 'Balanced',
      description: 'Ingin yang seimbang',
      recommendation: {
        id: '2',
        name: 'Kopi Susu Medium',
        description: 'Seimbang antara kopi & susu',
        price: 13000,
        image: 'https://images.unsplash.com/photo-1631155989916-4aabcabcce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY29mZmVlJTIwbGF0dGV8ZW58MXx8fHwxNzY3MjU3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        level: 'medium',
        rating: 4.8
      },
      reason: 'Perpaduan sempurna kopi dan susu untuk pengalaman yang seimbang'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold">Rekomendasi Sesuai Mood</h1>
          <p className="mt-2">Temukan kopi yang cocok dengan suasana hatimu hari ini</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moods.map((mood, index) => (
            <Card key={index} className="overflow-hidden border-2 border-[#d4c4b0] hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-[#b5a18f] to-[#9d8a78] text-white p-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-5xl">{mood.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{mood.label}</h3>
                    <p className="text-sm text-white/80">{mood.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-[#6d5a43]">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  <span className="font-semibold">Kami Rekomendasikan:</span>
                </div>

                <div className="flex gap-4 mb-4">
                  <ImageWithFallback
                    src={mood.recommendation.image}
                    alt={mood.recommendation.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-[#6d5a43] mb-1">
                      {mood.recommendation.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {mood.recommendation.description}
                    </p>
                    <p className="font-bold text-[#b5a18f]">
                      Rp {mood.recommendation.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="bg-[#f5f1ed] p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Alasan: </span>
                    {mood.reason}
                  </p>
                </div>

                <Button
                  onClick={() => onAddToCart(mood.recommendation)}
                  className="w-full bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                >
                  Tambah ke Keranjang
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
