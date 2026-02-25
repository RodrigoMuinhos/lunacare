import React from 'react';
import { useNavigate } from 'react-router';
import { Moon, Sparkles, Heart, Flower2, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5FA] via-white to-[#F5F3FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Flower2 size={120} className="text-[#F7C8E0]" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Flower2 size={150} className="text-[#D9C2F0]" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-5">
        <Star size={80} className="text-[#BFD7ED]" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Moon Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] blur-2xl opacity-40 rounded-full" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] rounded-full flex items-center justify-center shadow-lg">
                  <Moon size={40} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl font-display font-semibold mb-3 bg-gradient-to-r from-[#F7C8E0] via-[#D9C2F0] to-[#BFD7ED] bg-clip-text text-transparent"
              style={{ letterSpacing: '-0.02em' }}
            >
              LunaCare
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles size={16} className="text-[#D9C2F0]" />
              <p className="text-lg font-body font-medium text-gray-600">
                Seu acompanhamento íntimo inteligente
              </p>
              <Sparkles size={16} className="text-[#D9C2F0]" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-base font-body text-gray-500 max-w-md mx-auto leading-relaxed"
            >
              Controle seu ciclo, rotina e bem-estar em um só lugar.{' '}
              <span className="text-[#F7C8E0] font-medium">
                Com inteligência e cuidado.
              </span>
            </motion.p>
          </motion.div>

          {/* Features Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <div className="px-4 py-2 rounded-full bg-[#F7C8E0]/10 border border-[#F7C8E0]/20">
              <span className="text-sm font-body text-[#F7C8E0] font-medium">Ciclo Menstrual</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#D9C2F0]/10 border border-[#D9C2F0]/20">
              <span className="text-sm font-body text-[#D9C2F0] font-medium">Anticoncepcional</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#BFD7ED]/10 border border-[#BFD7ED]/20">
              <span className="text-sm font-body text-[#BFD7ED] font-medium">Bem-estar</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-3"
          >
            <Button
              onClick={() => navigate('/signup')}
              className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-2xl text-base font-body font-semibold shadow-lg shadow-[#F7C8E0]/30 transition-all hover:shadow-xl hover:shadow-[#F7C8E0]/40"
            >
              Começar minha jornada
            </Button>
            
            <Button
              onClick={() => navigate('/login')}
              variant="ghost"
              className="w-full h-14 text-gray-700 hover:bg-gray-100 rounded-2xl text-base font-body font-medium"
            >
              Já tenho uma conta
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-xs font-body text-gray-400 text-center mt-8"
          >
            Ao continuar, você concorda com nossos{' '}
            <span className="text-[#F7C8E0] underline cursor-pointer">Termos de Uso</span>
            {' '}e{' '}
            <span className="text-[#F7C8E0] underline cursor-pointer">Política de Privacidade</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};