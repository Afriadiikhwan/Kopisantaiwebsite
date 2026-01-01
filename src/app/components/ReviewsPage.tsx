import { useState } from 'react';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ReviewsPageProps {
  onNavigate: (page: string) => void;
  currentUser: any;
}

export function ReviewsPage({ onNavigate, currentUser }: ReviewsPageProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: '1',
      userName: 'Andi Wijaya',
      rating: 5,
      comment: 'Kopi Susu Santai-nya enak banget! Signature blend memang beda!',
      date: '2 hari lalu',
      product: 'Kopi Susu Santai'
    },
    {
      id: '2',
      userName: 'Siti Rahma',
      rating: 4,
      comment: 'Suka banget sama fitur custom-nya. Bisa atur sesuai selera!',
      date: '5 hari lalu',
      product: 'Kopi Susu Medium (Custom)'
    },
    {
      id: '3',
      userName: 'Budi Santoso',
      rating: 5,
      comment: 'Kopi Susu Gula Aren favorit! Manisnya pas dan aromanya harum.',
      date: '1 minggu lalu',
      product: 'Kopi Susu Gula Aren'
    }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !reviewText.trim()) {
      alert('Mohon beri rating dan tulis ulasan');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userName: currentUser?.name || 'Anonymous',
      rating,
      comment: reviewText,
      date: 'Baru saja',
      product: 'Pesanan Terakhir'
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText('');
    
    alert('Terima kasih atas ulasan Anda! 🙏');
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (interactive ? (hoveredRating || rating) : count)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold">Rating & Ulasan</h1>
          <p className="mt-2">Bagikan pengalaman Anda dengan Kopi Santai</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write Review */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-4">Tulis Ulasan</h2>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <Label className="font-semibold text-[#6d5a43] mb-2 block">
                    Rating Anda
                  </Label>
                  {renderStars(rating, true)}
                </div>

                <div>
                  <Label htmlFor="review" className="font-semibold text-[#6d5a43] mb-2 block">
                    Ulasan
                  </Label>
                  <Textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda dengan Kopi Santai..."
                    className="resize-none border-gray-200 focus:border-[#b5a18f]"
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Ulasan
                </Button>
              </form>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl text-[#6d5a43]">
                Semua Ulasan ({reviews.length})
              </h2>
            </div>

            {reviews.map((review) => (
              <Card key={review.id} className="p-6 border-2 border-[#d4c4b0]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b5a18f] rounded-full flex items-center justify-center text-white font-bold">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#6d5a43]">{review.userName}</h3>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                    
                    <div className="inline-block bg-[#f5f1ed] px-3 py-1 rounded-full text-xs text-gray-600">
                      Produk: {review.product}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
