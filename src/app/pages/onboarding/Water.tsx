import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Droplet } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import { useUser } from '../../context/UserContext';

export const OnboardingWater = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [waterGoal, setWaterGoal] = useState([2000]);

  const handleContinue = () => {
    updateUserData({ waterGoal: waterGoal[0] });
    navigate('/onboarding/habits');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full ${
              step <= 3 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#BFD7ED]/20 flex items-center justify-center">
          <Droplet className="text-[#BFD7ED]" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Qual sua meta diária de água?
        </h1>
        <p className="text-gray-600">
          Hidratação é essencial para seu bem-estar
        </p>
      </div>

      {/* Water Goal */}
      <div className="flex-1 mb-6">
        <div className="space-y-8">
          {/* Visual Display */}
          <div className="text-center">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-6xl font-bold text-[#BFD7ED]">
                {(waterGoal[0] / 1000).toFixed(1)}
              </span>
              <span className="text-2xl text-gray-600">litros</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(waterGoal[0] / 250)} copos de 250ml
            </p>
          </div>

          {/* Slider */}
          <div className="px-4">
            <Slider
              value={waterGoal}
              onValueChange={setWaterGoal}
              min={1000}
              max={4000}
              step={250}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1L</span>
              <span>2.5L</span>
              <span>4L</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Recomendações:</p>
            <div className="space-y-2">
              {[
                { range: '1.5-2L', desc: 'Básico para a maioria' },
                { range: '2-3L', desc: 'Ideal para quem se exercita' },
                { range: '3-4L', desc: 'Alto nível de atividade' },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Droplet size={16} className="text-[#BFD7ED]" />
                  <span className="font-medium">{rec.range}</span>
                  <span className="text-gray-500">- {rec.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full"
      >
        Continuar
      </Button>
    </div>
  );
};
