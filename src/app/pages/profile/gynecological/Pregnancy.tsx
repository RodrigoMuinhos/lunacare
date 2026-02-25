import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Baby, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { useUser } from '../../../context/UserContext';

export const ProfilePregnancy = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [possible, setPossible] = useState<string>('');
  const [trying, setTrying] = useState<string>('');
  const [history, setHistory] = useState('');

  const handleContinue = () => {
    updateUserData({
      pregnancy: {
        possible: possible === 'yes',
        trying: trying === 'yes',
        history: history || undefined,
      },
    });
    navigate('/profile/gynecological/intimate-health');
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
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step <= 3 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#CDE7BE]/20 flex items-center justify-center">
            <Baby className="text-[#CDE7BE]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 3 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Gravidez</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Informações sobre planejamento familiar
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 mb-6">
        <div className="space-y-2">
          <Label>Você pode estar grávida?</Label>
          <div className="flex gap-3">
            <button
              onClick={() => setPossible('yes')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                possible === 'yes'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Sim
            </button>
            <button
              onClick={() => setPossible('no')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                possible === 'no'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Não
            </button>
          </div>
          {possible === 'yes' && (
            <p className="text-xs text-[#F7C8E0] bg-[#F7C8E0]/10 p-3 rounded-xl">
              Recomendamos fazer um teste e consultar sua médica
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Você está tentando engravidar?</Label>
          <div className="flex gap-3">
            <button
              onClick={() => setTrying('yes')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                trying === 'yes'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Sim
            </button>
            <button
              onClick={() => setTrying('no')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                trying === 'no'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Não
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pregnancy-history">Histórico gestacional (opcional)</Label>
          <Textarea
            id="pregnancy-history"
            placeholder="Ex: 2 gestações, 1 parto, 0 abortos..."
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="min-h-24 rounded-xl resize-none"
          />
          <p className="text-xs text-gray-500">
            Compartilhe apenas se se sentir confortável
          </p>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={!possible || !trying}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        Continuar
      </Button>
    </div>
  );
};
