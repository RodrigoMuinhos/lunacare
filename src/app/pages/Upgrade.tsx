import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Check, Users, MessageCircle, FileText, Bell, Shield, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useUser } from '../context/UserContext';

export const Upgrade = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUserData, userData } = useUser();
  
  const urlStep = searchParams.get('step');
  const urlPlan = searchParams.get('plan');
  const isTrial = searchParams.get('trial') === 'true';
  const urlCoupon = searchParams.get('coupon');
  const urlDiscount = searchParams.get('discount');
  
  const [step, setStep] = useState<'info' | 'payment' | 'code'>(
    (urlStep as 'info' | 'payment' | 'code') || 'info'
  );
  const [doctorCode, setDoctorCode] = useState('');

  // Get plan details from URL or use default
  const planNames: Record<string, string> = {
    trial: 'Trial - 60 dias grátis',
    basic: 'Basic - R$ 39,90/mês',
    plus: 'Plus - R$ 69,90/mês',
    premium: 'Premium - R$ 99,90/mês',
  };

  const planPrices: Record<string, number> = {
    basic: 39.90,
    plus: 69.90,
    premium: 99.90,
  };
  
  const selectedPlanName = urlPlan ? planNames[urlPlan] : 'LunaCare Clinical - R$ 49,00/mês';
  const selectedPlanPrice = urlPlan ? planPrices[urlPlan] : 49.00;
  const hasDiscount = urlDiscount && parseFloat(urlDiscount) > 0;
  const discountAmount = hasDiscount ? parseFloat(urlDiscount!) : 0;
  const finalPrice = hasDiscount ? selectedPlanPrice * (1 - discountAmount / 100) : selectedPlanPrice;

  const features = [
    {
      icon: Users,
      title: 'Vínculo com sua médica',
      description: 'Compartilhe seus dados de forma segura e criptografada',
    },
    {
      icon: MessageCircle,
      title: 'Chat direto',
      description: 'Tire dúvidas e receba orientações sem sair do app',
    },
    {
      icon: FileText,
      title: 'Planos personalizados',
      description: 'Sua médica cria um plano de cuidado só para você',
    },
    {
      icon: Bell,
      title: 'Alertas clínicos',
      description: 'Sistema inteligente que identifica padrões importantes',
    },
  ];

  const handleActivate = () => {
    updateUserData({ clinicalActive: true });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
      </div>

      {step === 'info' && (
        <div className="p-6 space-y-8">
          {/* Hero */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
              <Sparkles size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              LunaCare Clinical
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Transforme seu autocuidado em um acompanhamento profissional completo
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F7C8E0]/20 to-[#D9C2F0]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-[#F7C8E0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  <Check size={20} className="text-[#CDE7BE] flex-shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Security */}
          <div className="p-4 rounded-2xl bg-[#BFD7ED]/10 border border-[#BFD7ED]/20">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={20} className="text-[#BFD7ED]" />
              <h3 className="font-semibold text-gray-800">
                Segurança e privacidade
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Seus dados são criptografados ponta a ponta. Apenas você e sua médica terão acesso.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/pricing')}
              className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full"
            >
              Ver planos
            </Button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-sm text-gray-600 hover:underline"
            >
              Continuar com modo gratuito
            </button>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pagamento
            </h2>
            <p className="text-gray-600">
              Simule o processo de pagamento
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-600 mb-1">Plano selecionado</p>
              <p className="text-lg font-semibold text-gray-800">
                {selectedPlanName}
              </p>
              {hasDiscount && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Valor original:</span>
                    <span className="line-through text-gray-400">R$ {selectedPlanPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Desconto ({discountAmount}%):</span>
                    <span className="text-[#CDE7BE] font-medium">- R$ {(selectedPlanPrice - finalPrice).toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-[#CDE7BE] text-lg">R$ {finalPrice.toFixed(2).replace('.', ',')}/mês</span>
                  </div>
                  {urlCoupon && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <Check size={14} className="text-[#CDE7BE]" />
                      Cupom aplicado: {urlCoupon}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Número do cartão</Label>
              <Input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Validade</Label>
                <Input
                  type="text"
                  placeholder="MM/AA"
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input
                  type="text"
                  placeholder="000"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => setStep('code')}
            className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full"
          >
            Confirmar pagamento
          </Button>
        </div>
      )}

      {step === 'code' && (
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#CDE7BE]/20 flex items-center justify-center">
              <Check size={32} className="text-[#CDE7BE]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isTrial ? 'Trial ativado!' : 'Pagamento confirmado!'}
            </h2>
            <p className="text-gray-600">
              {isTrial 
                ? 'Agora vincule sua conta com sua médica para começar'
                : 'Agora vincule sua conta com sua médica'
              }
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor-code">Código da médica</Label>
              <Input
                id="doctor-code"
                type="text"
                placeholder="Ex: DRA-SILVA-2024"
                value={doctorCode}
                onChange={(e) => setDoctorCode(e.target.value.toUpperCase())}
                className="h-12 rounded-xl text-center font-mono text-lg"
              />
              <p className="text-xs text-gray-500">
                Sua médica forneceu esse código para você
              </p>
            </div>

            {isTrial && (
              <div className="p-4 rounded-xl bg-[#CDE7BE]/10 border border-[#CDE7BE]/20">
                <p className="text-sm text-gray-700">
                  🎉 <span className="font-medium">Trial de 60 dias ativo!</span> Você tem acesso completo a todos os recursos gratuitamente.
                </p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#BFD7ED]/10 border border-[#BFD7ED]/20">
              <p className="text-sm text-gray-700">
                💡 <span className="font-medium">Não tem o código?</span> Entre em contato com sua médica para obter o código de vínculo.
              </p>
            </div>
          </div>

          <Button
            onClick={handleActivate}
            disabled={!doctorCode}
            className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-full disabled:opacity-50"
          >
            Ativar vínculo
          </Button>
        </div>
      )}
    </div>
  );
};