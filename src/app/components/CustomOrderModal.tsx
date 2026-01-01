import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onAddToCart: (customItem: any) => void;
}

export function CustomOrderModal({ isOpen, onClose, item, onAddToCart }: CustomOrderModalProps) {
  const [coffeeLevel, setCoffeeLevel] = useState<'soft' | 'medium' | 'strong'>('medium');
  const [sugarLevel, setSugarLevel] = useState(50);
  const [temperature, setTemperature] = useState<'hot' | 'ice'>('ice');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAddToCart = () => {
    const customItem = {
      ...item,
      id: `${item.id}-custom-${Date.now()}`,
      customization: {
        coffeeLevel,
        sugarLevel,
        temperature,
        notes
      },
      quantity,
      customized: true
    };
    onAddToCart(customItem);
    onClose();
    // Reset form
    setCoffeeLevel('medium');
    setSugarLevel(50);
    setTemperature('ice');
    setNotes('');
    setQuantity(1);
  };

  const levelDescriptions = {
    soft: 'Lebih banyak susu, rasa kopi ringan',
    medium: 'Seimbang antara kopi dan susu',
    strong: 'Rasa kopi lebih dominan, susu sedikit'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#6d5a43]">Custom Kopi</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Preview */}
          <div className="flex gap-4 bg-[#f5f1ed] p-4 rounded-lg">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg text-[#6d5a43]">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-bold text-[#b5a18f] mt-1">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Coffee Level */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              1. Level Kopi
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {(['soft', 'medium', 'strong'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setCoffeeLevel(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    coffeeLevel === level
                      ? 'border-[#b5a18f] bg-[#b5a18f] text-white shadow-lg'
                      : 'border-gray-200 bg-white hover:border-[#b5a18f]'
                  }`}
                >
                  <div className="font-bold capitalize mb-1">{level}</div>
                  <div className={`text-xs ${coffeeLevel === level ? 'text-white/90' : 'text-gray-500'}`}>
                    {levelDescriptions[level]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sugar Level */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              2. Level Gula: {sugarLevel}%
            </Label>
            <div className="px-2">
              <Slider
                value={[sugarLevel]}
                onValueChange={(value) => setSugarLevel(value[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>0% (Tanpa gula)</span>
                <span>50% (Normal)</span>
                <span>100% (Manis banget)</span>
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              3. Suhu
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTemperature('hot')}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  temperature === 'hot'
                    ? 'border-[#b5a18f] bg-[#b5a18f] text-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-[#b5a18f]'
                }`}
              >
                <span className="text-2xl">🔥</span>
                <span className="font-bold">Hot</span>
              </button>
              <button
                onClick={() => setTemperature('ice')}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  temperature === 'ice'
                    ? 'border-[#b5a18f] bg-[#b5a18f] text-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-[#b5a18f]'
                }`}
              >
                <span className="text-2xl">❄️</span>
                <span className="font-bold">Ice</span>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              4. Catatan Khusus (Opsional)
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Less ice, extra shot, dll"
              className="resize-none border-gray-200 focus:border-[#b5a18f]"
              rows={3}
            />
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              Jumlah
            </Label>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                variant="outline"
                size="icon"
                className="border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                variant="outline"
                size="icon"
                className="border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-[#f5f1ed] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#6d5a43]">Total Harga:</span>
              <span className="font-bold text-2xl text-[#b5a18f]">
                Rp {(item.price * quantity).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              Batal
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
            >
              Tambah ke Keranjang
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
