import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Moon, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useUser } from '../context/UserContext';

export const Login = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDoctor) {
      updateUserData({
        email,
        name: 'Dra. Silva',
        userType: 'doctor',
        onboardingComplete: true,
        profileComplete: true,
      });
      navigate('/doctor/dashboard');
    } else {
      updateUserData({
        email,
        name: 'Ana',
        userType: 'patient',
        onboardingComplete: true,
        profileComplete: true,
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <button onClick={() => navigate('/')} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon size={32} className="text-[#F7C8E0]" />
              <h1 className="text-3xl font-bold text-gray-800">LunaCare</h1>
            </div>
            <h2 className="text-xl text-gray-700">Bem-vinda de volta!</h2>
          </div>

          {/* Toggle User Type */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setIsDoctor(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                !isDoctor
                  ? 'bg-white text-[#F7C8E0] shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Paciente
            </button>
            <button
              onClick={() => setIsDoctor(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                isDoctor
                  ? 'bg-white text-[#F7C8E0] shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Médica
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="text-sm text-[#F7C8E0] hover:underline"
            >
              Esqueceu a senha?
            </button>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full"
            >
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#F7C8E0] font-medium hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
