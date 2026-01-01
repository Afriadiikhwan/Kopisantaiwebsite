import { useState } from 'react';
import { CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, total, onPaymentComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'ewallet'>('ewallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      
      // Complete payment after showing success
      setTimeout(() => {
        onPaymentComplete();
        setIsPaid(false);
        setPaymentMethod('ewallet');
      }, 2000);
    }, 2000);
  };

  if (isPaid) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#6d5a43] mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">Pesanan Anda sedang diproses</p>
            <div className="bg-[#f5f1ed] p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Terima kasih telah memesan di Kopi Santai. Kami akan segera memproses pesanan Anda!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#6d5a43]">Pembayaran</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Total Amount */}
          <div className="bg-[#f5f1ed] p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <p className="text-3xl font-bold text-[#b5a18f]">
                Rp {total.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-semibold text-[#6d5a43] mb-3 block">
              Pilih Metode Pembayaran
            </Label>
            
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="space-y-3">
                {/* E-Wallet */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'ewallet'
                      ? 'border-[#b5a18f] bg-[#f5f1ed]'
                      : 'border-gray-200 hover:border-[#b5a18f]'
                  }`}
                  onClick={() => setPaymentMethod('ewallet')}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="ewallet" id="ewallet" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-[#b5a18f] rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="ewallet" className="font-semibold text-[#6d5a43] cursor-pointer">
                          E-Wallet / QRIS
                        </Label>
                        <p className="text-sm text-gray-600">GoPay, OVO, Dana, ShopeePay, dll</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-[#b5a18f] bg-[#f5f1ed]'
                      : 'border-gray-200 hover:border-[#b5a18f]'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-[#b5a18f] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="cash" className="font-semibold text-[#6d5a43] cursor-pointer">
                          Tunai
                        </Label>
                        <p className="text-sm text-gray-600">Bayar saat pesanan diterima</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* QRIS Preview (if e-wallet selected) */}
          {paymentMethod === 'ewallet' && (
            <div className="bg-white border-2 border-[#d4c4b0] p-6 rounded-lg text-center">
              <p className="text-sm font-semibold text-[#6d5a43] mb-3">Scan QRIS untuk membayar</p>
              <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-6xl mb-2">📱</div>
                  <p className="text-xs text-gray-500">QRIS Code</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Scan dengan aplikasi e-wallet favorit Anda
              </p>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              {paymentMethod === 'cash' 
                ? '💡 Siapkan uang pas untuk mempercepat transaksi'
                : '💡 Pastikan saldo e-wallet Anda mencukupi'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300"
              disabled={isProcessing}
            >
              Batal
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
              disabled={isProcessing}
            >
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
