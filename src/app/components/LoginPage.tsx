import { useState } from 'react';
import { ArrowLeft, Coffee } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');

  // Mock accounts for demo
  const mockAccounts = [
    { email: 'admin@kopisantai.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { email: 'customer@example.com', password: 'customer123', name: 'Budi', role: 'customer' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const account = mockAccounts.find(
      acc => acc.email === loginEmail && acc.password === loginPassword
    );

    if (account) {
      onLogin({
        email: account.email,
        name: account.name,
        role: account.role
      });
      onNavigate('home');
    } else {
      setError('Email atau password salah');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!registerName || !registerEmail || !registerPassword) {
      setError('Semua field harus diisi');
      return;
    }

    // Simulate registration success
    onLogin({
      email: registerEmail,
      name: registerName,
      role: 'customer'
    });
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <div className="bg-[#b5a18f] text-white py-6">
        <div className="container mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:text-[#f5e6d3] transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coffee className="w-10 h-10 text-[#b5a18f]" />
              <h1 className="text-3xl font-bold text-[#6d5a43]">Kopi Santai</h1>
            </div>
            <p className="text-gray-600">Masuk atau daftar untuk melanjutkan</p>
          </div>

          <Card className="p-6 border-2 border-[#d4c4b0]">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                  >
                    Masuk
                  </Button>

                  <div className="mt-4 p-4 bg-[#f5f1ed] rounded-lg text-sm">
                    <p className="font-semibold text-[#6d5a43] mb-2">Demo Akun:</p>
                    <div className="space-y-1 text-gray-700">
                      <p>👤 Customer: customer@example.com / customer123</p>
                      <p>👨‍💼 Admin: admin@kopisantai.com / admin123</p>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Nama Lengkap</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="email@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#b5a18f] hover:bg-[#9d8a78] text-white"
                  >
                    Daftar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
