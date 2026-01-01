import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  onNavigate: (page: string) => void;
  cartItems: any[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function CartPage({ onNavigate, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f1ed]">
        <div className="bg-[#b5a18f] text-white py-6">
          <div className="container mx-auto px-4">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </button>
            <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-[#6d5a43] mb-4">Keranjang Kosong</h2>
            <p className="text-gray-600 mb-8">Yuk, pilih kopi favoritmu dan mulai pesan!</p>
            <Button
              onClick={() => onNavigate('menu')}
              className="bg-[#b5a18f] hover:bg-[#9d8a78] text-white px-8 py-6 text-lg"
            >
              Lihat Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
          <p className="mt-2">{cartItems.length} item dalam keranjang</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 border-2 border-[#d4c4b0]">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-[#6d5a43]">{item.name}</h3>
                        {item.customized && (
                          <div className="mt-1 text-sm text-gray-600 space-y-1">
                            <div>Level: <span className="font-semibold capitalize">{item.customization.coffeeLevel}</span></div>
                            <div>Gula: <span className="font-semibold">{item.customization.sugarLevel}%</span></div>
                            <div>Suhu: <span className="font-semibold">{item.customization.temperature === 'hot' ? '🔥 Hot' : '❄️ Ice'}</span></div>
                            {item.customization.notes && (
                              <div>Catatan: <span className="font-semibold">{item.customization.notes}</span></div>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <Button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-xl text-[#b5a18f]">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-gray-500">
                          @ Rp {item.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-4">Ringkasan Pesanan</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Pajak (10%)</span>
                  <span className="font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t pt-3 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-[#6d5a43]">Total</span>
                    <span className="font-bold text-2xl text-[#b5a18f]">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full bg-[#b5a18f] hover:bg-[#9d8a78] text-white py-6 text-lg"
              >
                Lanjut Pembayaran
              </Button>

              <Button
                onClick={() => onNavigate('menu')}
                variant="outline"
                className="w-full mt-3 border-[#b5a18f] text-[#b5a18f] hover:bg-[#b5a18f] hover:text-white"
              >
                Tambah Pesanan
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
