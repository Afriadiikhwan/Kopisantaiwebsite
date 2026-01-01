import { useState } from 'react';
import { ArrowLeft, Plus, Minus, History, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface StockManagementProps {
  onNavigate: (page: string) => void;
}

interface StockItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  lastUpdated: string;
}

export function StockManagement({ onNavigate }: StockManagementProps) {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    { id: '1', name: 'Biji Kopi', stock: 45, unit: 'kg', minStock: 20, lastUpdated: '1 jam lalu' },
    { id: '2', name: 'Susu', stock: 12, unit: 'liter', minStock: 15, lastUpdated: '2 jam lalu' },
    { id: '3', name: 'Gula Aren', stock: 8, unit: 'kg', minStock: 10, lastUpdated: '3 jam lalu' },
    { id: '4', name: 'Gula Pasir', stock: 25, unit: 'kg', minStock: 10, lastUpdated: '4 jam lalu' },
    { id: '5', name: 'Es Batu', stock: 50, unit: 'kg', minStock: 20, lastUpdated: '30 menit lalu' }
  ]);

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [updateAmount, setUpdateAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateType, setUpdateType] = useState<'add' | 'subtract'>('add');

  const [stockHistory] = useState([
    { item: 'Biji Kopi', action: 'Tambah', amount: 10, unit: 'kg', time: '1 jam lalu', user: 'Admin' },
    { item: 'Susu', action: 'Kurang', amount: 5, unit: 'liter', time: '2 jam lalu', user: 'Admin' },
    { item: 'Gula Aren', action: 'Tambah', amount: 3, unit: 'kg', time: '3 jam lalu', user: 'Admin' },
    { item: 'Es Batu', action: 'Kurang', amount: 15, unit: 'kg', time: '4 jam lalu', user: 'Admin' }
  ]);

  const handleOpenUpdate = (item: StockItem, type: 'add' | 'subtract') => {
    setSelectedItem(item);
    setUpdateType(type);
    setUpdateAmount('');
    setIsModalOpen(true);
  };

  const handleUpdateStock = () => {
    if (!selectedItem || !updateAmount) return;

    const amount = parseFloat(updateAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Jumlah tidak valid');
      return;
    }

    setStockItems(items =>
      items.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              stock: updateType === 'add' 
                ? item.stock + amount 
                : Math.max(0, item.stock - amount),
              lastUpdated: 'Baru saja'
            }
          : item
      )
    );

    setIsModalOpen(false);
    setSelectedItem(null);
    setUpdateAmount('');
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) return { label: 'Kritis', color: 'text-red-700 bg-red-100' };
    if (stock <= minStock) return { label: 'Menipis', color: 'text-yellow-700 bg-yellow-100' };
    return { label: 'Aman', color: 'text-green-700 bg-green-100' };
  };

  const lowStockItems = stockItems.filter(item => item.stock <= item.minStock);

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('admin')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold">Manajemen Stok Detail</h1>
          <p className="mt-2">Update dan monitor stok bahan kopi</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
              <Card className="p-4 bg-red-50 border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 mb-1">Peringatan Stok Menipis!</h3>
                    <p className="text-sm text-red-700">
                      {lowStockItems.length} item stok menipis: {lowStockItems.map(i => i.name).join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Stock List */}
            <Card className="p-6 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-6">Daftar Stok Bahan</h2>
              
              <div className="space-y-4">
                {stockItems.map((item) => {
                  const status = getStockStatus(item.stock, item.minStock);
                  return (
                    <div key={item.id} className="p-4 bg-[#f5f1ed] rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-[#6d5a43]">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Min. stok: {item.minStock} {item.unit}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Update terakhir: {item.lastUpdated}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-[#b5a18f]">
                            {item.stock}
                            <span className="text-lg text-gray-600 ml-2">{item.unit}</span>
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleOpenUpdate(item, 'subtract')}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Minus className="w-4 h-4 mr-1" />
                            Kurangi
                          </Button>
                          <Button
                            onClick={() => handleOpenUpdate(item, 'add')}
                            size="sm"
                            className="bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Tambah
                          </Button>
                        </div>
                      </div>

                      {/* Stock Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              item.stock <= item.minStock * 0.5 ? 'bg-red-500' :
                              item.stock <= item.minStock ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, (item.stock / (item.minStock * 2)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Stock History */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-[#d4c4b0] sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-[#b5a18f]" />
                <h2 className="font-bold text-xl text-[#6d5a43]">Riwayat Update</h2>
              </div>

              <div className="space-y-3">
                {stockHistory.map((history, index) => (
                  <div key={index} className="p-3 bg-[#f5f1ed] rounded-lg border-l-4 border-[#b5a18f]">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm text-[#6d5a43]">{history.item}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        history.action === 'Tambah' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {history.action}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {history.action === 'Tambah' ? '+' : '-'}{history.amount} {history.unit}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{history.time}</span>
                      <span>oleh {history.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Update Stock Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#6d5a43]">
              {updateType === 'add' ? 'Tambah' : 'Kurangi'} Stok
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f1ed] rounded-lg">
                <h3 className="font-bold text-lg text-[#6d5a43]">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600">
                  Stok saat ini: {selectedItem.stock} {selectedItem.unit}
                </p>
              </div>

              <div>
                <Label htmlFor="amount" className="font-semibold text-[#6d5a43] mb-2 block">
                  Jumlah ({selectedItem.unit})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                  className="text-lg"
                  min="0"
                  step="0.1"
                />
              </div>

              {updateAmount && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Stok baru akan menjadi:{' '}
                    <span className="font-bold">
                      {updateType === 'add'
                        ? selectedItem.stock + parseFloat(updateAmount)
                        : Math.max(0, selectedItem.stock - parseFloat(updateAmount))
                      } {selectedItem.unit}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleUpdateStock}
                  className={`flex-1 ${
                    updateType === 'add'
                      ? 'bg-[#b5a18f] hover:bg-[#9d8a78]'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white`}
                >
                  {updateType === 'add' ? 'Tambah' : 'Kurangi'} Stok
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
