import React from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useUser } from '../context/UserContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export const Messages = () => {
  const { userData } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 content-pb">
      <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-[#D9C2F0]/20 to-[#F7C8E0]/20 p-6 rounded-b-3xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mensagens</h1>
        <p className="text-sm text-gray-600">
          {userData.clinicalActive ? 'Chat com sua médica' : 'Ative o modo Clinical para conversar com sua médica'}
        </p>
      </div>

      {userData.clinicalActive ? (
        <div className="flex flex-col h-[calc(100vh-200px)]">
          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                DS
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-xs">
                <p className="text-sm text-gray-800">
                  Olá Ana! Como você está se sentindo hoje?
                </p>
                <p className="text-xs text-gray-500 mt-2">10:30</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] rounded-2xl rounded-tr-sm p-4 max-w-xs">
                <p className="text-sm text-white">
                  Oi Dra.! Estou bem, obrigada. Segui as orientações sobre a hidratação.
                </p>
                <p className="text-xs text-white/70 mt-2">10:32</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                DS
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-xs">
                <p className="text-sm text-gray-800">
                  Que ótimo! Continue assim. Notei que você está na fase folicular, como está o humor?
                </p>
                <p className="text-xs text-gray-500 mt-2">10:35</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 h-12 rounded-xl"
              />
              <Button className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white p-0">
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="bg-white rounded-2xl p-8 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Modo Clinical necessário
            </h3>
            <p className="text-gray-600 mb-6">
              Ative o modo Clinical para conversar diretamente com sua médica
            </p>
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white hover:opacity-90"
            >
              Ativar modo Clinical
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
      </div>
    </div>
  );
};