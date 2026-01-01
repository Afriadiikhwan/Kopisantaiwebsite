import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { CartPage } from './components/CartPage';
import { MoodRecommendation } from './components/MoodRecommendation';
import { LoginPage } from './components/LoginPage';
import { ReviewsPage } from './components/ReviewsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { StockManagement } from './components/StockManagement';
import { CustomOrderModal } from './components/CustomOrderModal';
import { PaymentModal } from './components/PaymentModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customItem, setCustomItem] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth functions
  const handleLogin = (user: any) => {
    setCurrentUser(user);
    toast.success(`Selamat datang, ${user.name}! ☕`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    toast.success('Berhasil keluar. Sampai jumpa lagi! 👋');
  };

  // Cart functions
  const handleAddToCart = (item: any) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && !item.customized
    );

    if (existingItemIndex !== -1 && !item.customized) {
      // Update quantity for existing item
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + (item.quantity || 1)
      };
      setCartItems(updatedCart);
      toast.success('Item berhasil ditambahkan ke keranjang! 🛒');
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, quantity: item.quantity || 1 }]);
      toast.success('Item berhasil ditambahkan ke keranjang! 🛒');
    }
  };

  const handleUpdateCartQuantity = (itemId: string, change: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as any[];

    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    toast.success('Item dihapus dari keranjang');
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error('Silakan login terlebih dahulu');
      setCurrentPage('login');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    setCartItems([]);
    setIsPaymentModalOpen(false);
    setCurrentPage('home');
    toast.success('Pesanan berhasil! Terima kasih sudah memesan di Kopi Santai! 🎉');
  };

  // Custom order functions
  const handleOpenCustomOrder = (item: any) => {
    setCustomItem(item);
    setIsCustomModalOpen(true);
  };

  const handleCustomOrderAddToCart = (customizedItem: any) => {
    handleAddToCart(customizedItem);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = cartTotal * 0.1;
  const cartGrandTotal = cartTotal + cartTax;

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            cartItemCount={cartItems.length}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );

      case 'menu':
        return (
          <MenuPage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onCustomOrder={handleOpenCustomOrder}
          />
        );

      case 'custom':
        // Open custom modal with default item
        const defaultItem = {
          id: 'custom',
          name: 'Kopi Custom',
          description: 'Buat kopi sesuai seleramu',
          price: 15000,
          image: 'https://images.unsplash.com/photo-1648880689952-4d76f2a10c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBjb3p5fGVufDF8fHx8MTc2NzI1NzUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          level: 'medium',
          rating: 5.0
        };
        setCustomItem(defaultItem);
        setIsCustomModalOpen(true);
        setCurrentPage('home');
        return null;

      case 'cart':
        return (
          <CartPage
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );

      case 'mood':
        return (
          <MoodRecommendation
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        );

      case 'login':
        return (
          <LoginPage
            onNavigate={handleNavigate}
            onLogin={handleLogin}
          />
        );

      case 'reviews':
        return (
          <ReviewsPage
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        );

      case 'admin':
        if (!currentUser || currentUser.role !== 'admin') {
          toast.error('Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
          setCurrentPage('home');
          return null;
        }
        return (
          <AdminDashboard
            onNavigate={handleNavigate}
          />
        );

      case 'stock-management':
        if (!currentUser || currentUser.role !== 'admin') {
          toast.error('Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
          setCurrentPage('home');
          return null;
        }
        return (
          <StockManagement
            onNavigate={handleNavigate}
          />
        );

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            cartItemCount={cartItems.length}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      
      {/* Custom Order Modal */}
      <CustomOrderModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        item={customItem}
        onAddToCart={handleCustomOrderAddToCart}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={cartGrandTotal}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}
