import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Moon, Dumbbell, Book, Coffee, Music, Smile } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useUser } from '../../context/UserContext';

export const OnboardingHabits = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selected, setSelected] = useState<string[]>([]);

  const habits = [
    { id: 'sleep', icon: Moon, label: 'Dormir 8h', color: '#D9C2F0' },
    { id: 'exercise', icon: Dumbbell, label: 'Me exercitar', color: '#CDE7BE' },
    { id: 'read', icon: Book, label: 'Ler antes de dormir', color: '#BFD7ED' },
    { id: 'meditate', icon: Sparkles, label: 'Meditar', color: '#F7C8E0' },
    { id: 'coffee', icon: Coffee, label: 'Tomar café da manhã', color: '#CDE7BE' },
    { id: 'music', icon: Music, label: 'Ouvir música', color: '#D9C2F0' },
    { id: 'selfcare', icon: Smile, label: 'Autocuidado', color: '#F7C8E0' },
  ];

  const toggleHabit = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((h) => h !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    updateUserData({ habits: selected, onboardingComplete: true });
    navigate('/profile/gynecological/cycle');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="h-1 flex-1 rounded-full bg-[#F7C8E0]"
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <Sparkles className="mx-auto mb-4 text-[#CDE7BE]" size={40} />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Escolha 3 hábitos para acompanhar
        </h1>
        <p className="text-gray-600">
          Você pode mudar isso depois
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7C8E0]/10">
          <span className="text-sm font-medium text-gray-700">
            {selected.length}/3 selecionados
          </span>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="flex-1 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {habits.map((habit) => {
            const Icon = habit.icon;
            const isSelected = selected.includes(habit.id);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                disabled={isDisabled}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 shadow-sm'
                    : isDisabled
                    ? 'border-gray-200 opacity-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${habit.color}20`,
                  }}
                >
                  <Icon size={24} style={{ color: habit.color }} />
                </div>
                <p className="text-sm font-medium text-gray-800 text-center">
                  {habit.label}
                </p>
                {isSelected && (
                  <div className="mt-2 w-5 h-5 mx-auto rounded-full bg-[#F7C8E0] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        disabled={selected.length !== 3}
        className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
      >
        Começar minha jornada
      </Button>
    </div>
  );
};
