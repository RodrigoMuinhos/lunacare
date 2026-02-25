import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, ArrowLeft, Lock, Users } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useUser } from '../../../context/UserContext';

export const ProfileSharing = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [mode, setMode] = useState<'personal' | 'clinical' | null>(null);

  const handleContinue = () => {
    updateUserData({
      profileComplete: true,
      clinicalActive: mode === 'clinical',
    });
    
    if (mode === 'clinical') {
      navigate('/pricing');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="h-1 flex-1 rounded-full bg-[#F7C8E0]" />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#CDE7BE]/20 flex items-center justify-center">
            <Shield className="text-[#CDE7BE]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 6 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Modo de Uso</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Como você quer usar o LunaCare?
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-4 mb-6">
        {/* Personal Mode */}
        <button
          onClick={() => setMode('personal')}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
            mode === 'personal'
              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D9C2F0]/20 flex items-center justify-center flex-shrink-0">
              <Lock size={24} className="text-[#D9C2F0]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Modo Pessoal
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Seus dados ficam privados, apenas para você. Perfeito para autoconhecimento.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0]" />
                  <span>Controle de ciclo e rotina</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0]" />
                  <span>Lembretes e insights</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0]" />
                  <span>100% gratuito</span>
                </div>
              </div>
            </div>
            {mode === 'personal' && (
              <div className="w-6 h-6 rounded-full bg-[#F7C8E0] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </div>
        </button>

        {/* Clinical Mode */}
        <button
          onClick={() => setMode('clinical')}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
            mode === 'clinical'
              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7C8E0]/20 flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-[#F7C8E0]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Modo Clinical
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white font-medium">
                  Premium
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Compartilhe seus dados com sua médica e receba acompanhamento personalizado.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7C8E0]" />
                  <span>Tudo do modo pessoal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7C8E0]" />
                  <span>Chat com sua médica</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7C8E0]" />
                  <span>Planos de cuidado personalizados</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7C8E0]" />
                  <span>Alertas clínicos inteligentes</span>
                </div>
              </div>
            </div>
            {mode === 'clinical' && (
              <div className="w-6 h-6 rounded-full bg-[#F7C8E0] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </div>
        </button>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-600">
            💡 Você pode ativar o modo Clinical a qualquer momento através do seu perfil.
          </p>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={!mode}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        {mode === 'clinical' ? 'Ativar modo Clinical' : 'Começar no modo pessoal'}
      </Button>
    </div>
  );
};