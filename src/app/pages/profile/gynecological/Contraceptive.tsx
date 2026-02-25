import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Pill, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useUser } from '../../../context/UserContext';

export const ProfileContraceptive = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [uses, setUses] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [pillName, setPillName] = useState('');
  const [packType, setPackType] = useState<string>('21');
  const [takesPause, setTakesPause] = useState<string>('yes');
  const [pauseDays, setPauseDays] = useState('7');
  const [skippedPills, setSkippedPills] = useState<string>('no');

  const handleContinue = () => {
    updateUserData({
      contraceptive: {
        uses: uses === 'yes',
        type: uses === 'yes' ? type : undefined,
        isPill: type === 'pill',
        pillName: type === 'pill' ? pillName : undefined,
        packType: type === 'pill' ? (packType as any) : undefined,
        takesPause: type === 'pill' ? takesPause === 'yes' : undefined,
        pauseDays: type === 'pill' && takesPause === 'yes' ? parseInt(pauseDays) : undefined,
        skippedPills: type === 'pill' ? skippedPills === 'yes' : undefined,
      },
    });
    navigate('/profile/gynecological/pregnancy');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 content-pb">
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
                step <= 2 ? 'bg-[#F7C8E0]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#BFD7ED]/20 flex items-center justify-center">
            <Pill className="text-[#BFD7ED]" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Etapa 2 de 6</p>
            <h1 className="text-xl font-bold text-gray-800">Anticoncepcional</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Nos conte sobre seu método contraceptivo
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
        <div className="space-y-2">
          <Label>Você usa algum método contraceptivo?</Label>
          <div className="flex gap-3">
            <button
              onClick={() => setUses('yes')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                uses === 'yes'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Sim
            </button>
            <button
              onClick={() => setUses('no')}
              className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                uses === 'no'
                  ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              Não
            </button>
          </div>
        </div>

        {uses === 'yes' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="contraceptive-type">Tipo de método</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="contraceptive-type" className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pill">Pílula anticoncepcional</SelectItem>
                  <SelectItem value="iud">DIU</SelectItem>
                  <SelectItem value="implant">Implante</SelectItem>
                  <SelectItem value="injection">Injeção</SelectItem>
                  <SelectItem value="ring">Anel vaginal</SelectItem>
                  <SelectItem value="patch">Adesivo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {type === 'pill' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pill-name">Nome da pílula</Label>
                  <Input
                    id="pill-name"
                    type="text"
                    placeholder="Ex: Yasmin, Selene, etc."
                    value={pillName}
                    onChange={(e) => setPillName(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pack-type">Tipo de cartela</Label>
                  <Select value={packType} onValueChange={setPackType}>
                    <SelectTrigger id="pack-type" className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21">21 comprimidos</SelectItem>
                      <SelectItem value="24">24 comprimidos</SelectItem>
                      <SelectItem value="28">28 comprimidos</SelectItem>
                      <SelectItem value="continuous">Uso contínuo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {packType !== 'continuous' && (
                  <>
                    <div className="space-y-2">
                      <Label>Você faz pausa entre cartelas?</Label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setTakesPause('yes')}
                          className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                            takesPause === 'yes'
                              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setTakesPause('no')}
                          className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                            takesPause === 'no'
                              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          Não (emendo)
                        </button>
                      </div>
                    </div>

                    {takesPause === 'yes' && (
                      <div className="space-y-2">
                        <Label htmlFor="pause-days">Quantos dias de pausa?</Label>
                        <Select value={pauseDays} onValueChange={setPauseDays}>
                          <SelectTrigger id="pause-days" className="h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[4, 5, 6, 7, 8].map((days) => (
                              <SelectItem key={days} value={String(days)}>
                                {days} dias
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Você emendou cartela recentemente?</Label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSkippedPills('yes')}
                          className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                            skippedPills === 'yes'
                              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setSkippedPills('no')}
                          className={`flex-1 h-12 rounded-xl border-2 font-medium transition-all ${
                            skippedPills === 'no'
                              ? 'border-[#F7C8E0] bg-[#F7C8E0]/5 text-[#F7C8E0]'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          Não
                        </button>
                      </div>
                      {skippedPills === 'yes' && (
                        <p className="text-xs text-[#F7C8E0] bg-[#F7C8E0]/10 p-3 rounded-xl">
                          Registraremos isso no seu histórico para sua médica
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t">
        <Button
          onClick={handleContinue}
          disabled={uses === '' || (uses === 'yes' && !type)}
          className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50 max-w-md mx-auto block"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
