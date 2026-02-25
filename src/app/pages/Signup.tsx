import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Moon, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useUser } from '../context/UserContext';

export const Signup = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData({
      name,
      email,
      userType: 'patient',
    });
    navigate('/onboarding/goal');
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
            <h2 className="text-xl text-gray-700">Crie sua conta</h2>
            <p className="text-gray-500">Comece sua jornada de autocuidado</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

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
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full"
            >
              Criar conta
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#F7C8E0] font-medium hover:underline"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
