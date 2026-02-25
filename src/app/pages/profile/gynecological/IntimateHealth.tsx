import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import { useUser } from '../../../context/UserContext';

export const ProfileIntimateHealth = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [symptoms, setSymptoms] = useState({
    painDuringSex: false,
    discharge: false,
    burning: false,
    recurrentInfections: false,
  });

  const toggleSymptom = (key: keyof typeof symptoms) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    updateUserData({
      intimateHealth: symptoms,
    });
    navigate('/profile/gynecological/medical-history');
  };

  const symptomsList = [
    {
      id: 'painDuringSex',
      label: 'Dor durante a relação sexual',
      description: 'Dispareunia',
    },
    {
      id: 'discharge',
      label: 'Corrimento anormal',
      description: 'Cor, odor ou textura diferente',
    },
    {
      id: 'burning',
      label: 'Ardor ou coceira',
      description: 'Na região íntima',
    },
    {
      id: 'recurrentInfections',
      label: 'Infecções recorrentes',
      description: 'Candidíase, cistite, etc.',
    },
  ];

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
                step <= 4 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#F7C8E0]/20 flex items-center justify-center">
            <Heart className="text-[#F7C8E0]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 4 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Saúde Íntima</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Marque se você apresenta algum destes sintomas
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Todas as informações são confidenciais
        </p>
      </div>

      {/* Symptoms List */}
      <div className="flex-1 space-y-4 mb-6">
        {symptomsList.map((symptom) => (
          <div
            key={symptom.id}
            className="p-4 rounded-2xl border-2 border-gray-200 hover:border-[#F7C8E0]/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id={symptom.id}
                checked={symptoms[symptom.id as keyof typeof symptoms]}
                onCheckedChange={() => toggleSymptom(symptom.id as keyof typeof symptoms)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={symptom.id}
                  className="text-base font-medium text-gray-800 cursor-pointer"
                >
                  {symptom.label}
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  {symptom.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl bg-[#BFD7ED]/10 border border-[#BFD7ED]/20">
          <p className="text-sm text-gray-700">
            <span className="font-medium">💡 Dica:</span> Essas informações ajudarão sua médica a te acompanhar melhor e identificar padrões importantes.
          </p>
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
