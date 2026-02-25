import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { useUser } from '../../../context/UserContext';

export const ProfileMedicalHistory = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [surgeries, setSurgeries] = useState('');

  const handleContinue = () => {
    updateUserData({
      medicalHistory: {
        medications: medications || 'Nenhum',
        allergies: allergies || 'Nenhuma',
        surgeries: surgeries || 'Nenhuma',
      },
    });
    navigate('/profile/gynecological/sharing');
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
                step <= 5 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#D9C2F0]/20 flex items-center justify-center">
            <FileText className="text-[#D9C2F0]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 5 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Histórico Médico</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Informações importantes para seu acompanhamento
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Todos os campos são opcionais
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="medications">Medicamentos em uso</Label>
          <Textarea
            id="medications"
            placeholder="Liste os medicamentos que você usa regularmente..."
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            className="min-h-24 rounded-xl resize-none"
          />
          <p className="text-xs text-gray-500">
            Inclua nome e dosagem, se souber
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allergies">Alergias medicamentosas</Label>
          <Textarea
            id="allergies"
            placeholder="Medicamentos ou substâncias que causam alergia..."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="min-h-24 rounded-xl resize-none"
          />
          <p className="text-xs text-gray-500">
            Importante para evitar reações adversas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="surgeries">Cirurgias anteriores</Label>
          <Textarea
            id="surgeries"
            placeholder="Cirurgias que você já realizou..."
            value={surgeries}
            onChange={(e) => setSurgeries(e.target.value)}
            className="min-h-24 rounded-xl resize-none"
          />
          <p className="text-xs text-gray-500">
            Especialmente cirurgias ginecológicas ou abdominais
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F7C8E0]/10 border border-[#F7C8E0]/20">
          <p className="text-sm text-gray-700">
            <span className="font-medium">🔒 Privacidade garantida:</span> Seus dados médicos são criptografados e só serão compartilhados com sua médica se você ativar o modo Clinical.
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
