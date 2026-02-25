import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useUser } from '../../context/UserContext';

export const OnboardingPeriod = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [date, setDate] = useState('');

  const handleContinue = () => {
    updateUserData({ lastPeriod: date });
    navigate('/onboarding/water');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full ${
              step <= 2 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7C8E0]/20 flex items-center justify-center">
          <Calendar className="text-[#F7C8E0]" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Quando foi sua última menstruação?
        </h1>
        <p className="text-gray-600">
          Isso nos ajuda a calcular seu ciclo
        </p>
      </div>

      {/* Date Input */}
      <div className="flex-1 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="period-date">Data de início</Label>
            <Input
              id="period-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 rounded-xl mt-2"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {date && (
            <div className="p-4 rounded-xl bg-[#F7C8E0]/10 border border-[#F7C8E0]/20">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Data selecionada:</span>{' '}
                {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          <button className="text-sm text-[#F7C8E0] hover:underline">
            Não me lembro exatamente
          </button>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={!date}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        Continuar
      </Button>
    </div>
  );
};
