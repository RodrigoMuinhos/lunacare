import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Moon, Pill, Calendar, FileText, AlertCircle, Plus, Clock, CalendarCheck, Activity, Heart, Droplet } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Patient } from '../../data/mockPatients';

interface PatientDetailModalProps {
  patient: Patient;
  onClose: () => void;
  onOpenActionSheet: () => void;
  actions: Array<{
    icon: React.ElementType;
    label: string;
    color: string;
    action: () => void;
  }>;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  patient,
  onClose,
  onOpenActionSheet,
  actions
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {patient.alerts > 0 && (
                <Badge className="bg-red-100 text-red-600 border-0">
                  {patient.alerts} {patient.alerts === 1 ? 'alerta' : 'alertas'}
                </Badge>
              )}
              {patient.clinicalActive && (
                <Badge className="bg-[#CDE7BE] text-green-800 border-0">
                  Clinical Ativo
                </Badge>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {patient.name}
            </h1>
            <p className="text-gray-600">{patient.age} anos • {patient.lastActivity}</p>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-2 flex-wrap">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={action.action}
                  variant="outline"
                  size="sm"
                  className="border-gray-200 hover:bg-gray-50"
                  style={{ borderColor: action.color + '40' }}
                >
                  <Icon size={14} className="mr-2" style={{ color: action.color }} />
                  {action.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile: Open Action Sheet */}
          <div className="lg:hidden">
            <Button
              onClick={onOpenActionSheet}
              className="w-full h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white hover:opacity-90 rounded-xl font-medium"
            >
              <Plus size={18} className="mr-2" />
              Ações rápidas
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          {/* Alerts */}
          {patient.alerts > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={20} className="text-red-600" />
                <h3 className="font-semibold text-red-800">
                  Alertas ({patient.alerts})
                </h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Pausa entre cartelas maior que o habitual (9 dias)</li>
              </ul>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Consultas */}
            <div className="bg-gradient-to-br from-[#F7C8E0]/10 to-[#D9C2F0]/10 rounded-2xl p-5 border border-[#F7C8E0]/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
                  <CalendarCheck size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Consultas</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-xs font-medium text-gray-600">Última consulta</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">15/01/2025</p>
                  <p className="text-xs text-gray-500 mt-0.5">Consulta de rotina • Presencial</p>
                </div>
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-[#F7C8E0]" />
                    <span className="text-xs font-medium text-gray-600">Próxima consulta</span>
                  </div>
                  <p className="text-sm font-bold text-[#F7C8E0]">15/04/2025</p>
                  <p className="text-xs text-gray-500 mt-0.5">Retorno • Telemedicina</p>
                </div>
              </div>
            </div>

            {/* Ciclo Menstrual */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7C8E0]/20 flex items-center justify-center">
                  <Moon size={20} className="text-[#F7C8E0]" />
                </div>
                <h3 className="font-bold text-gray-900">Ciclo Menstrual</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo período:</span>
                  <span className="font-bold text-[#F7C8E0]">Em 16 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duração do ciclo:</span>
                  <span className="font-semibold text-gray-900">28 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Regularidade:</span>
                  <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs px-2 py-0">
                    Regular
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Último período:</span>
                  <span className="font-medium text-gray-900">18/02/2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duração fluxo:</span>
                  <span className="font-medium text-gray-900">5 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Intensidade:</span>
                  <div className="flex items-center gap-1">
                    <Droplet size={12} className="text-[#F7C8E0] fill-[#F7C8E0]" />
                    <Droplet size={12} className="text-[#F7C8E0] fill-[#F7C8E0]" />
                    <Droplet size={12} className="text-gray-300" />
                    <span className="text-xs text-gray-500 ml-1">Moderado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Anticoncepcional */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#BFD7ED]/20 flex items-center justify-center">
                  <Pill size={20} className="text-[#BFD7ED]" />
                </div>
                <h3 className="font-bold text-gray-900">Anticoncepcional</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Método:</span>
                  <span className="font-bold text-gray-900 text-right max-w-[60%]">
                    Depo-Provera (injetável)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Forma:</span>
                  <span className="font-medium text-gray-900">Injeção trimestral</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pausa entre doses:</span>
                  <span className="font-semibold text-gray-900">7 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Última dose:</span>
                  <span className="font-medium text-gray-900">10/02/2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próxima dose:</span>
                  <span className="font-bold text-[#BFD7ED]">10/05/2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emendas:</span>
                  <span className="font-medium text-gray-900">Não</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Aderência ao tratamento</span>
                    <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                      98%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Gravidez */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#CDE7BE]/20 flex items-center justify-center">
                  <Heart size={20} className="text-[#CDE7BE]" />
                </div>
                <h3 className="font-bold text-gray-900">Gravidez</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pode estar grávida:</span>
                  <Badge className="bg-gray-100 text-gray-700 border-0 text-xs px-2 py-0">
                    Não
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tentando:</span>
                  <span className="font-medium text-gray-900">Não</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gestações anteriores:</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Partos:</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Abortos:</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Histórico Médico */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D9C2F0]/20 flex items-center justify-center">
                  <FileText size={20} className="text-[#D9C2F0]" />
                </div>
                <h3 className="font-bold text-gray-900">Histórico Médico</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Medicamentos em uso
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0] mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Depo-Provera</p>
                        <p className="text-xs text-gray-500">Anticoncepcional injetável trimestral</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0] mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Ácido Fólico 400mcg</p>
                        <p className="text-xs text-gray-500">1x ao dia - suplementação</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D9C2F0] mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Vitamina D3 2000 UI</p>
                        <p className="text-xs text-gray-500">1x ao dia - suplementação</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Alergias
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Nenhuma alergia medicamentosa</p>
                        <p className="text-xs text-gray-500">Sem restrições conhecidas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Condições ginecológicas
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dismenorreia leve</p>
                        <p className="text-xs text-gray-500">Cólicas menstruais controladas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sem SOP ou endometriose</p>
                        <p className="text-xs text-gray-500">Exames normais</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Histórico Familiar
                    </p>
                    <p className="text-sm text-gray-700">
                      Mãe: hipertensão controlada • Avó materna: diabetes tipo 2 • Sem histórico de câncer de mama ou ovário na família
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Estilo de vida
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                        Não fumante
                      </Badge>
                      <Badge className="bg-[#BFD7ED] text-blue-800 border-0 text-xs">
                        Atividade física regular
                      </Badge>
                      <Badge className="bg-[#F7C8E0] text-pink-800 border-0 text-xs">
                        Sono adequado
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exames Preventivos */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Exames Preventivos Ginecológicos
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Papanicolau</p>
                      <p className="text-xs text-gray-500">Último: 10/01/2024</p>
                    </div>
                    <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                      Normal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Ultrassom Transvaginal</p>
                      <p className="text-xs text-gray-500">Último: 15/11/2024</p>
                    </div>
                    <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                      Normal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Mamografia</p>
                      <p className="text-xs text-gray-500">Próximo: Ago/2025</p>
                    </div>
                    <Badge className="bg-[#BFD7ED] text-blue-800 border-0 text-xs">
                      Agendado
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Colesterol Total</p>
                      <p className="text-xs text-gray-500">Último: 05/02/2025</p>
                    </div>
                    <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                      145 mg/dL
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">TSH (Tireoide)</p>
                      <p className="text-xs text-gray-500">Último: 05/02/2025</p>
                    </div>
                    <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs">
                      2,1 mUI/L
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Vitamina D</p>
                      <p className="text-xs text-gray-500">Último: 05/02/2025</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                      28 ng/mL
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Sinais Vitais */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Activity size={20} className="text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Sinais Vitais e Medidas</h3>
                  <p className="text-xs text-gray-500">Última atualização: 15/01/2025</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Pressão Arterial</p>
                  <p className="text-lg font-bold text-gray-900">120/80</p>
                  <p className="text-xs text-gray-500">mmHg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Frequência Cardíaca</p>
                  <p className="text-lg font-bold text-gray-900">72</p>
                  <p className="text-xs text-gray-500">bpm</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Peso</p>
                  <p className="text-lg font-bold text-gray-900">58,5</p>
                  <p className="text-xs text-gray-500">kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Altura</p>
                  <p className="text-lg font-bold text-gray-900">1,65</p>
                  <p className="text-xs text-gray-500">m</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">IMC</p>
                  <p className="text-lg font-bold text-gray-900">21,5</p>
                  <Badge className="bg-[#CDE7BE] text-green-800 border-0 text-xs mt-1">
                    Normal
                  </Badge>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Temperatura</p>
                  <p className="text-lg font-bold text-gray-900">36,5</p>
                  <p className="text-xs text-gray-500">°C</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Saturação O₂</p>
                  <p className="text-lg font-bold text-gray-900">98</p>
                  <p className="text-xs text-gray-500">%</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Glicemia</p>
                  <p className="text-lg font-bold text-gray-900">85</p>
                  <p className="text-xs text-gray-500">mg/dL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-4 lg:p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Histórico Recente
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Hoje', event: 'Check-in diário completo', time: '09:30' },
                { date: 'Ontem', event: 'Registrou sintomas: leve cólica', time: '14:20' },
                { date: '18/02', event: 'Início do período', time: '08:00' },
                { date: '10/02', event: 'Nova cartela iniciada', time: '07:45' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#F7C8E0]" />
                    {i !== 3 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {item.event}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};