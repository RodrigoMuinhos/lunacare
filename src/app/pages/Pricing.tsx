import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Sparkles, Zap, Crown, Gift, Tag, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useUser } from '../context/UserContext';

interface Plan {
  id: string;
  name: string;
  icon: typeof Sparkles;
  price: number;
  period: string;
  description: string;
  isTrial?: boolean;
  isPopular?: boolean;
  gradient: string;
  features: string[];
}

export const Pricing = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);

  const plans: Plan[] = [
    {
      id: 'trial',
      name: 'Trial',
      icon: Gift,
      price: 0,
      period: '60 dias',
      description: 'Experimente todos os recursos gratuitamente',
      isTrial: true,
      gradient: 'from-[#CDE7BE] to-[#BFD7ED]',
      features: [
        'Acesso completo por 60 dias',
        'Vínculo com sua médica',
        'Chat direto com sua médica',
        'Planos personalizados',
        'Alertas clínicos',
        'Sem compromisso',
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      icon: Sparkles,
      price: 39.90,
      period: 'mês',
      description: 'Ideal para começar seu acompanhamento',
      gradient: 'from-[#F7C8E0] to-[#F7C8E0]',
      features: [
        'Vínculo com sua médica',
        'Chat direto com sua médica',
        'Plano personalizado de cuidados',
        'Alertas clínicos essenciais',
        'Histórico completo de dados',
        'Controle de ciclo e sintomas',
      ],
    },
    {
      id: 'plus',
      name: 'Plus',
      icon: Zap,
      price: 69.90,
      period: 'mês',
      description: 'Acompanhamento completo e inteligente',
      isPopular: true,
      gradient: 'from-[#F7C8E0] to-[#D9C2F0]',
      features: [
        'Tudo do plano Basic',
        'Respostas prioritárias',
        'Relatórios mensais automatizados',
        'Análises de padrões e tendências',
        'Lembretes personalizados avançados',
        'Integração com exames laboratoriais',
        'Suporte via email prioritário',
        'Biblioteca de conteúdo educativo',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: 99.90,
      period: 'mês',
      description: 'Experiência VIP com acompanhamento exclusivo',
      gradient: 'from-[#D9C2F0] to-[#BFD7ED]',
      features: [
        'Tudo do plano Plus',
        'Videochamadas mensais incluídas',
        'Análises preditivas com IA',
        'Sugestões proativas de cuidados',
        'Integração com wearables',
        'Consultoria nutricional personalizada',
        'Planos de bem-estar holísticos',
        'Suporte prioritário 24/7',
        'Acesso antecipado a novidades',
      ],
    },
  ];

  const applyCoupon = () => {
    // Simulate coupon validation - Accept any coupon from doctor (prefix DRA-, DOUTORA-, MEDICA-)
    const upperCoupon = couponCode.toUpperCase().trim();
    
    if (upperCoupon.startsWith('DRA-') || 
        upperCoupon.startsWith('DOUTORA-') || 
        upperCoupon.startsWith('MEDICA-') ||
        upperCoupon === 'DOCTOR30') {
      setDiscount(30);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupom inválido');
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setDiscount(0);
    setCouponError('');
  };

  const calculateDiscountedPrice = (price: number) => {
    if (discount > 0) {
      return price * (1 - discount / 100);
    }
    return price;
  };

  const handleSelectPlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    setSelectedPlan(planId);
    
    const finalPrice = calculateDiscountedPrice(plan.price);
    
    // Update user context with selected plan and coupon info
    updateUserData({ 
      selectedPlan: planId,
      planPrice: finalPrice,
      couponCode: couponApplied ? couponCode : undefined,
      discount: couponApplied ? discount : undefined,
      clinicalActive: true 
    });

    // Navigate to payment/activation flow
    if (plan.isTrial) {
      // For trial, go directly to doctor code
      navigate('/upgrade?step=code&trial=true');
    } else {
      // For paid plans, go through payment flow
      const params = new URLSearchParams({
        step: 'payment',
        plan: planId,
        ...(couponApplied && { coupon: couponCode, discount: discount.toString() })
      });
      navigate('/upgrade?' + params.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F7C8E0]/5 to-[#D9C2F0]/10">
      {/* Header */}
      <div className="p-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para ter acompanhamento profissional completo com sua médica de confiança
          </p>
        </div>

        {/* Coupon Section */}
        <div className="max-w-2xl mx-auto mb-8">
          {!showCouponInput && !couponApplied && (
            <button
              onClick={() => setShowCouponInput(true)}
              className="flex items-center gap-2 mx-auto text-sm text-[#F7C8E0] hover:text-[#D9C2F0] font-medium"
            >
              <Tag size={16} />
              Tenho um cupom
            </button>
          )}

          {showCouponInput && !couponApplied && (
            <div className="bg-white rounded-2xl p-6 border-2 border-[#F7C8E0]/30 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Tag size={20} className="text-[#F7C8E0]" />
                  Aplicar cupom de desconto
                </h3>
                <button
                  onClick={() => setShowCouponInput(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Ex: DRA-SILVA-2024"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                  className="h-12 rounded-xl uppercase font-mono"
                />
                <Button
                  onClick={applyCoupon}
                  disabled={!couponCode}
                  className="h-12 px-6 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-xl disabled:opacity-50"
                >
                  Aplicar
                </Button>
              </div>
              
              {couponError && (
                <p className="text-sm text-red-500 mt-2">{couponError}</p>
              )}
              
              <p className="text-xs text-gray-500 mt-3">
                💡 Sua médica forneceu um cupom de desconto especial para você
              </p>
            </div>
          )}

          {couponApplied && (
            <div className="bg-gradient-to-r from-[#CDE7BE]/20 to-[#BFD7ED]/20 rounded-2xl p-6 border-2 border-[#CDE7BE] shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#CDE7BE] flex items-center justify-center">
                    <Check size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Cupom aplicado! 🎉
                    </h3>
                    <p className="text-sm text-gray-600">
                      Desconto de {discount}% nos planos pagos
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            
            return (
              <div
                key={plan.id}
                className={`
                  relative bg-white rounded-3xl p-6 border-2 transition-all duration-300
                  ${
                    selectedPlan === plan.id
                      ? 'border-[#F7C8E0] shadow-xl scale-105'
                      : 'border-gray-100 hover:border-[#F7C8E0]/50 hover:shadow-lg'
                  }
                  ${plan.isPopular ? 'ring-2 ring-[#F7C8E0] ring-offset-2' : ''}
                `}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white text-xs font-semibold rounded-full">
                    Mais popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <Icon size={28} className="text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">Grátis</span>
                    </div>
                  ) : (
                    <>
                      {couponApplied && discount > 0 && (
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-sm text-gray-400 line-through">
                            R$ {plan.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="ml-2 px-2 py-0.5 bg-[#CDE7BE] text-white text-xs font-semibold rounded-full">
                            -{discount}%
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-600">R$</span>
                        <span className={`text-4xl font-bold ${couponApplied ? 'text-[#CDE7BE]' : 'text-gray-900'}`}>
                          {calculateDiscountedPrice(plan.price).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-sm text-gray-600">/{plan.period}</span>
                      </div>
                      {couponApplied && discount > 0 && (
                        <p className="text-xs text-[#CDE7BE] mt-1 font-medium">
                          Economia de R$ {(plan.price - calculateDiscountedPrice(plan.price)).toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </>
                  )}
                  {plan.isTrial && (
                    <p className="text-xs text-gray-500 mt-1">
                      Sem cartão de crédito
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={16} className="text-[#CDE7BE] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`
                    w-full h-12 rounded-xl font-semibold transition-all
                    ${
                      plan.isPopular || plan.isTrial
                        ? 'bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }
                  `}
                >
                  {plan.isTrial ? 'Começar grátis' : 'Selecionar plano'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ/Info Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Perguntas frequentes
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Como funciona o trial de 60 dias?
              </p>
              <p className="text-gray-600">
                Você tem acesso completo a todos os recursos por 60 dias, gratuitamente e sem precisar cadastrar cartão de crédito.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Posso trocar de plano depois?
              </p>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Como funciona o cupom da médica?
              </p>
              <p className="text-gray-600">
                Sua médica pode fornecer um cupom de desconto exclusivo de 30% que pode ser aplicado em qualquer plano pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};