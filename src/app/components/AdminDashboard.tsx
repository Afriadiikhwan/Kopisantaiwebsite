import { ArrowLeft, TrendingUp, Coffee, Users, DollarSign, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  // Mock data untuk dashboard
  const stats = {
    todaySales: 2450000,
    totalOrders: 87,
    totalCustomers: 156,
    revenue: 15780000
  };

  const topProducts = [
    { name: 'Kopi Susu Santai', sales: 45, revenue: 720000, trend: '+12%' },
    { name: 'Kopi Susu Gula Aren', sales: 38, revenue: 532000, trend: '+8%' },
    { name: 'Kopi Susu Strong', sales: 32, revenue: 480000, trend: '+5%' },
    { name: 'Kopi Susu Medium', sales: 28, revenue: 364000, trend: '+3%' },
    { name: 'Kopi Susu Soft', sales: 24, revenue: 288000, trend: '+2%' }
  ];

  const preferences = {
    soft: 28,
    medium: 42,
    strong: 30
  };

  const recentSales = [
    { id: '#001', customer: 'Budi Santoso', items: 2, total: 28000, time: '10 menit lalu', status: 'Selesai' },
    { id: '#002', customer: 'Siti Rahma', items: 1, total: 16000, time: '25 menit lalu', status: 'Selesai' },
    { id: '#003', customer: 'Andi Wijaya', items: 3, total: 42000, time: '1 jam lalu', status: 'Diproses' },
    { id: '#004', customer: 'Dewi Lestari', items: 1, total: 14000, time: '2 jam lalu', status: 'Selesai' },
    { id: '#005', customer: 'Rudi Hartono', items: 2, total: 30000, time: '3 jam lalu', status: 'Selesai' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="mt-2">Kelola dan pantau performa Kopi Santai</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="stock">Stok</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 border-2 border-[#d4c4b0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Penjualan Hari Ini</span>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-[#6d5a43]">
                  Rp {stats.todaySales.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-green-600 mt-1">+15% dari kemarin</p>
              </Card>

              <Card className="p-6 border-2 border-[#d4c4b0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Pesanan</span>
                  <Coffee className="w-5 h-5 text-[#b5a18f]" />
                </div>
                <p className="text-2xl font-bold text-[#6d5a43]">{stats.totalOrders}</p>
                <p className="text-sm text-green-600 mt-1">+8% dari kemarin</p>
              </Card>

              <Card className="p-6 border-2 border-[#d4c4b0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Pelanggan</span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-[#6d5a43]">{stats.totalCustomers}</p>
                <p className="text-sm text-green-600 mt-1">+12 pelanggan baru</p>
              </Card>

              <Card className="p-6 border-2 border-[#d4c4b0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pendapatan Bulan Ini</span>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-[#6d5a43]">
                  Rp {stats.revenue.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-green-600 mt-1">+22% dari bulan lalu</p>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card className="p-6 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-4">Penjualan Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">ID</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Pelanggan</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Items</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Waktu</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="border-b border-gray-100 hover:bg-[#f5f1ed] transition">
                        <td className="py-3 px-2 text-sm font-semibold text-[#b5a18f]">{sale.id}</td>
                        <td className="py-3 px-2 text-sm text-gray-700">{sale.customer}</td>
                        <td className="py-3 px-2 text-sm text-gray-700">{sale.items} item</td>
                        <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                          Rp {sale.total.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-500">{sale.time}</td>
                        <td className="py-3 px-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            sale.status === 'Selesai' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Top Products */}
            <Card className="p-6 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-4">Menu Terlaris</h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-[#f5f1ed] rounded-lg">
                    <div className="w-8 h-8 bg-[#b5a18f] rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#6d5a43]">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sales} terjual</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#b5a18f]">
                        Rp {product.revenue.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-green-600">{product.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Customer Preferences */}
            <Card className="p-6 border-2 border-[#d4c4b0]">
              <h2 className="font-bold text-xl text-[#6d5a43] mb-4">Preferensi Pelanggan</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Soft</span>
                    <span className="font-bold text-[#b5a18f]">{preferences.soft}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full transition-all"
                      style={{ width: `${preferences.soft}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Medium</span>
                    <span className="font-bold text-[#b5a18f]">{preferences.medium}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-yellow-500 h-full rounded-full transition-all"
                      style={{ width: `${preferences.medium}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Strong</span>
                    <span className="font-bold text-[#b5a18f]">{preferences.strong}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full transition-all"
                      style={{ width: `${preferences.strong}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <span className="font-semibold">Insight:</span> Pelanggan paling banyak memilih level Medium. 
                  Pertimbangkan untuk membuat promo khusus untuk varian Medium.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Stock Management Tab */}
          <TabsContent value="stock" className="space-y-6">
            <Card className="p-6 border-2 border-[#d4c4b0]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#6d5a43]">Manajemen Stok</h2>
                <Button
                  onClick={() => onNavigate('stock-management')}
                  className="bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Kelola Stok Detail
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Biji Kopi', stock: 45, unit: 'kg', status: 'normal', min: 20 },
                  { name: 'Susu', stock: 12, unit: 'liter', status: 'low', min: 15 },
                  { name: 'Gula Aren', stock: 8, unit: 'kg', status: 'critical', min: 10 },
                  { name: 'Gula Pasir', stock: 25, unit: 'kg', status: 'normal', min: 10 },
                  { name: 'Es Batu', stock: 50, unit: 'kg', status: 'normal', min: 20 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#f5f1ed] rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className={`w-10 h-10 ${
                        item.status === 'critical' ? 'text-red-500' :
                        item.status === 'low' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-[#6d5a43]">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Min. stok: {item.min} {item.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-[#b5a18f]">
                        {item.stock} <span className="text-sm text-gray-600">{item.unit}</span>
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'critical' ? 'bg-red-100 text-red-700' :
                        item.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status === 'critical' ? 'Stok Kritis!' :
                         item.status === 'low' ? 'Stok Menipis' :
                         'Stok Aman'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-semibold">
                  ⚠️ Peringatan: Gula Aren stok menipis! Segera lakukan pemesanan ulang.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
