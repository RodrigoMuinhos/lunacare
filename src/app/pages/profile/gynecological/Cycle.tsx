import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Moon, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useUser } from '../../../context/UserContext';

export const ProfileCycle = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleDuration, setCycleDuration] = useState('28');
  const [flowDuration, setFlowDuration] = useState('5');
  const [regular, setRegular] = useState('yes');

  const handleContinue = () => {
    updateUserData({
      cycleData: {
        lastPeriod,
        cycleDuration: parseInt(cycleDuration),
        flowDuration: parseInt(flowDuration),
        regular: regular === 'yes',
      },
    });
    navigate('/profile/gynecological/contraceptive');
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
                step === 1 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#F7C8E0]/20 flex items-center justify-center">
            <Moon className="text-[#F7C8E0]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 1 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Ciclo Menstrual</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Vamos conhecer seu ciclo para te acompanhar melhor
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="last-period">Data da última menstruação (DUM)</Label>
          <Input
            id="last-period"
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="h-12 rounded-xl"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cycle-duration">Duração do ciclo (dias)</Label>
          <Select value={cycleDuration} onValueChange={setCycleDuration}>
            <SelectTrigger id="cycle-duration" className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 21 }, (_, i) => i + 21).map((days) => (
                <SelectItem key={days} value={String(days)}>
                  {days} dias
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Período entre o primeiro dia de uma menstruação e o primeiro dia da próxima
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="flow-duration">Duração do fluxo (dias)</Label>
          <Select value={flowDuration} onValueChange={setFlowDuration}>
            <SelectTrigger id="flow-duration" className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7, 8, 9, 10].map((days) => (
                <SelectItem key={days} value={String(days)}>
                  {days} dias
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Quantos dias seu período dura normalmente
          </p>
        </div>

        <div className="space-y-2">
          <Label>Seu ciclo é regular?</Label>
          <div className="flex gap-3">
            <button
              onClick={() => setRegular('yes')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                regular === 'yes'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Sim
            </button>
            <button
              onClick={() => setRegular('no')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                regular === 'no'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Não
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={!lastPeriod}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        Continuar
      </Button>
    </div>
  );
};
