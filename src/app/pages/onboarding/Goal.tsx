import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Moon, Heart, Calendar, Baby, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useUser } from '../../context/UserContext';

export const OnboardingGoal = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<string>('');

  const goals = [
    {
      id: 'cycle',
      icon: Moon,
      label: 'Acompanhar meu ciclo',
      color: '#F7C8E0',
    },
    {
      id: 'wellness',
      icon: Heart,
      label: 'Melhorar meu bem-estar',
      color: '#D9C2F0',
    },
    {
      id: 'contraception',
      icon: Calendar,
      label: 'Controlar anticoncepcional',
      color: '#BFD7ED',
    },
    {
      id: 'pregnancy',
      icon: Baby,
      label: 'Engravidar',
      color: '#CDE7BE',
    },
  ];

  const handleContinue = () => {
    updateUserData({ mainGoal: selected });
    navigate('/onboarding/period');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full ${
              step === 1 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <Sparkles className="mx-auto mb-4 text-[#F7C8E0]" size={40} />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Qual é seu objetivo principal?
        </h1>
        <p className="text-gray-600">
          Vamos personalizar sua experiência
        </p>
      </div>

      {/* Goals */}
      <div className="flex-1 space-y-3 mb-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selected === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => setSelected(goal.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                isSelected
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${goal.color}20`,
                }}
              >
                <Icon size={24} style={{ color: goal.color }} />
              </div>
              <span className="text-base font-medium text-gray-800">
                {goal.label}
              </span>
              {isSelected && (
                <div className="ml-auto w-6 h-6 rounded-full bg-[#F7C8E0] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        Continuar
      </Button>
    </div>
  );
};
