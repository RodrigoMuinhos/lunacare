import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Droplet,
  Heart,
  Smile,
  Frown,
  Meh,
  Moon,
  Sun,
  Activity,
  Thermometer,
  Pill,
  Plus,
  TrendingUp,
  Check,
  X,
  Trash2,
  Settings
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '../components/ui/input';

interface DayData {
  date: number;
  isPeriod?: boolean;
  isFertile?: boolean;
  isOvulation?: boolean;
  isPredicted?: boolean;
  symptoms?: string[];
  mood?: 'happy' | 'neutral' | 'sad';
  flow?: 'light' | 'medium' | 'heavy';
}

type LogType = 'flow' | 'mood' | 'symptoms' | 'medication';

interface Medication {
  id: string;
  name: string;
  dosage?: string;
  time: string;
  taken: boolean;
}

export const Cycle = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // Fevereiro 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeLogType, setActiveLogType] = useState<LogType | null>(null);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showCycleSettings, setShowCycleSettings] = useState(false);
  const [showDayEditor, setShowDayEditor] = useState(false);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('22:00');
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: 'Pílula anticoncepcional', time: '22:00', taken: false }
  ]);

  // Cycle configuration
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodDuration, setPeriodDuration] = useState('5');
  const [isCycleConfigured, setIsCycleConfigured] = useState(false);

  // Cycle data state - user can modify
  const [cycleData, setCycleData] = useState<Record<number, DayData>>({
    1: { date: 1, isPeriod: true, flow: 'heavy', mood: 'sad', symptoms: ['Cólicas', 'Cansaço'] },
    2: { date: 2, isPeriod: true, flow: 'heavy', mood: 'neutral' },
    3: { date: 3, isPeriod: true, flow: 'medium', mood: 'neutral' },
    4: { date: 4, isPeriod: true, flow: 'light' },
    5: { date: 5, isPeriod: true, flow: 'light' },
    13: { date: 13, isFertile: true },
    14: { date: 14, isFertile: true },
    15: { date: 15, isOvulation: true, isFertile: true, mood: 'happy', symptoms: ['Aumento libido'] },
    16: { date: 16, isFertile: true },
    17: { date: 17, isFertile: true },
    28: { date: 28, isPredicted: true },
    29: { date: 29, isPredicted: true },
    30: { date: 30, isPredicted: true },
  });

  // Check if cycle is configured on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('cycleConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setLastPeriodDate(config.lastPeriodDate || '');
        setCycleLength(config.cycleLength || '28');
        setPeriodDuration(config.periodDuration || '5');
        setIsCycleConfigured(true);
      } catch (error) {
        console.error('Error loading cycle config:', error);
        setShowCycleSettings(true);
      }
    } else {
      // First time - show config modal
      setShowCycleSettings(true);
    }
  }, []);

  const saveCycleConfig = () => {
    if (!lastPeriodDate) {
      alert('Por favor, informe quando começou sua última menstruação');
      return;
    }

    const config = {
      lastPeriodDate,
      cycleLength,
      periodDuration,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('cycleConfig', JSON.stringify(config));
    setIsCycleConfigured(true);
    setShowCycleSettings(false);
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (DayData | null)[] = [];

    // Adicionar dias vazios antes do primeiro dia
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(cycleData[day] || { date: day });
    }

    return days;
  };

  const getDayColor = (day: DayData | null) => {
    if (!day) return '';
    if (day.isPeriod) return 'bg-[#F7C8E0] text-white';
    if (day.isOvulation) return 'bg-gradient-to-br from-[#FFB347] to-[#FF8C42] text-white';
    if (day.isFertile) return 'bg-[#BFD7ED] text-white';
    if (day.isPredicted) return 'border-2 border-dashed border-[#F7C8E0] text-[#F7C8E0]';
    return 'text-gray-700';
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const getCurrentPhase = () => {
    const today = new Date().getDate();
    if (today >= 1 && today <= 5) return { name: 'Menstrual', color: '#F7C8E0', icon: Moon };
    if (today >= 6 && today <= 12) return { name: 'Folicular', color: '#BFD7ED', icon: TrendingUp };
    if (today >= 13 && today <= 17) return { name: 'Ovulação', color: '#FFB347', icon: Sun };
    return { name: 'Lútea', color: '#D9C2F0', icon: Moon };
  };

  const currentPhase = getCurrentPhase();
  const PhaseIcon = currentPhase.icon;

  const openLogModal = (type: LogType) => {
    setActiveLogType(type);
  };

  const closeLogModal = () => {
    setActiveLogType(null);
    setShowAddMedication(false);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedTime('22:00');
  };

  const addMedication = () => {
    if (!newMedName.trim()) return;
    
    const newMed: Medication = {
      id: Date.now().toString(),
      name: newMedName.trim(),
      dosage: newMedDosage.trim() || undefined,
      time: newMedTime,
      taken: false
    };
    
    setMedications([...medications, newMed]);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedTime('22:00');
    setShowAddMedication(false);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const toggleMedication = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleDayClick = (day: DayData) => {
    setEditingDay(day.date);
    setShowDayEditor(true);
  };

  const updateDayStatus = (type: 'period' | 'ovulation' | 'fertile' | 'clear') => {
    if (!editingDay) return;

    const updatedData = { ...cycleData };
    const currentDay = updatedData[editingDay] || { date: editingDay };

    if (type === 'period') {
      updatedData[editingDay] = {
        ...currentDay,
        isPeriod: true,
        isOvulation: false,
        isFertile: false,
        isPredicted: false,
      };
    } else if (type === 'ovulation') {
      updatedData[editingDay] = {
        ...currentDay,
        isPeriod: false,
        isOvulation: true,
        isFertile: true,
        isPredicted: false,
      };
    } else if (type === 'fertile') {
      updatedData[editingDay] = {
        ...currentDay,
        isPeriod: false,
        isOvulation: false,
        isFertile: true,
        isPredicted: false,
      };
    } else if (type === 'clear') {
      updatedData[editingDay] = {
        date: editingDay,
        isPeriod: false,
        isOvulation: false,
        isFertile: false,
        isPredicted: false,
      };
    }

    setCycleData(updatedData);
    setShowDayEditor(false);
    setEditingDay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 content-pb">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F7C8E0]/20 to-[#D9C2F0]/20 p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Meu Ciclo</h1>
            </div>
          </div>
        </div>

        {/* Cycle Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#F7C8E0]/20 flex items-center justify-center">
                <CalendarIcon size={16} className="text-[#F7C8E0]" />
              </div>
              <p className="text-xs text-gray-600">Próximo período</p>
            </div>
            <p className="text-lg font-bold text-gray-800">Em 12 dias</p>
            <p className="text-xs text-gray-500">28 de Fevereiro</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: `${currentPhase.color}20` }}>
                <PhaseIcon size={16} style={{ color: currentPhase.color }} className="m-2" />
              </div>
              <p className="text-xs text-gray-600">Fase atual</p>
            </div>
            <p className="text-lg font-bold text-gray-800">{currentPhase.name}</p>
            <p className="text-xs text-gray-500">Dia 16 do ciclo</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-95"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h3 className="font-semibold text-gray-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-95"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1 p-4 pb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 p-4 pt-2">
            {getDaysInMonth().map((day, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.008 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => day && handleDayClick(day)}
                disabled={!day}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center
                  text-sm font-medium transition-all relative
                  ${getDayColor(day)}
                  ${!day ? 'invisible' : ''}
                  ${day && !day.isPeriod && !day.isOvulation && !day.isFertile && !day.isPredicted ? 'hover:bg-gray-100' : ''}
                  ${selectedDay === day?.date ? 'ring-2 ring-offset-2 ring-[#F7C8E0]' : ''}
                `}
              >
                {day && (
                  <>
                    <span>{day.date}</span>
                    {day.symptoms && day.symptoms.length > 0 && (
                      <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white/80" />
                    )}
                  </>
                )}
              </motion.button>
            ))}
          </div>

          {/* Legend */}
          <div className="p-4 pt-2 pb-5 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#F7C8E0]" />
              <span className="text-gray-600">Período</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-[#FFB347] to-[#FF8C42]" />
              <span className="text-gray-600">Ovulação</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#BFD7ED]" />
              <span className="text-gray-600">Fértil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded border-2 border-dashed border-[#F7C8E0]" />
              <span className="text-gray-600">Previsto</span>
            </div>
          </div>
          
          {/* Adjust Cycle Button */}
          <div className="px-4 pb-5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowCycleSettings(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <Settings size={18} />
              <span>Ajustar meu ciclo</span>
            </motion.button>
          </div>
        </div>

        {/* Registrar hoje */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Registrar hoje</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Fluxo */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openLogModal('flow')}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7C8E0]/10 flex items-center justify-center flex-shrink-0">
                  <Droplet size={20} className="text-[#F7C8E0]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Fluxo</p>
                  <p className="text-xs text-gray-500">Intensidade</p>
                </div>
              </div>
            </motion.button>

            {/* Humor */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openLogModal('mood')}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9C2F0]/10 flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-[#D9C2F0]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Humor</p>
                  <p className="text-xs text-gray-500">Como está?</p>
                </div>
              </div>
            </motion.button>

            {/* Sintomas */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openLogModal('symptoms')}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#BFD7ED]/10 flex items-center justify-center flex-shrink-0">
                  <Activity size={20} className="text-[#BFD7ED]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Sintomas</p>
                  <p className="text-xs text-gray-500">Registrar</p>
                </div>
              </div>
            </motion.button>

            {/* Medicação */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openLogModal('medication')}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 active:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#CDE7BE]/10 flex items-center justify-center flex-shrink-0">
                  <Pill size={20} className="text-[#CDE7BE]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Medicação</p>
                  <p className="text-xs text-gray-500">Lembrete</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Estatísticas do Ciclo */}
        <div className="bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base">Estatísticas do Ciclo</h3>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-bold mb-1">28</p>
              <p className="text-xs text-white/80">dias médios</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">5</p>
              <p className="text-xs text-white/80">dias de fluxo</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">15</p>
              <p className="text-xs text-white/80">dia ovulação</p>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFB347] to-[#FF8C42] flex items-center justify-center">
              <Sun size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">Insights</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Você está na fase <span className="font-semibold text-[#F7C8E0]">folicular</span>. 
            É um ótimo momento para atividades físicas mais intensas e planejamento de novos projetos.
            Sua energia tende a estar em alta! 🌟
          </p>
        </div>
      </div>

      {/* Log Modals */}
      <AnimatePresence>
        {activeLogType && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLogModal}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Flow Modal */}
              {activeLogType === 'flow' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7C8E0]/10 flex items-center justify-center">
                        <Droplet size={20} className="text-[#F7C8E0]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Intensidade do Fluxo</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={closeLogModal}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={18} className="text-gray-600" />
                    </motion.button>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Leve', description: 'Pouco fluxo', drops: 1 },
                      { label: 'Médio', description: 'Fluxo moderado', drops: 2 },
                      { label: 'Intenso', description: 'Fluxo abundante', drops: 3 },
                    ].map(({ label, description, drops }) => (
                      <motion.button
                        key={label}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-5 rounded-2xl border-2 border-gray-200 hover:border-[#F7C8E0] hover:bg-[#F7C8E0]/5 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800 mb-0.5">{label}</p>
                            <p className="text-sm text-gray-500">{description}</p>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: drops }).map((_, i) => (
                              <Droplet key={i} size={16} className="text-[#F7C8E0] fill-[#F7C8E0]" />
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <Button
                    className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-xl font-semibold"
                    onClick={closeLogModal}
                  >
                    Salvar Registro
                  </Button>
                </div>
              )}

              {/* Mood Modal */}
              {activeLogType === 'mood' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D9C2F0]/10 flex items-center justify-center">
                        <Heart size={20} className="text-[#D9C2F0]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Como você está?</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={closeLogModal}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={18} className="text-gray-600" />
                    </motion.button>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Smile, label: 'Bem', description: 'Sentindo-me ótima!', color: '#CDE7BE' },
                      { icon: Meh, label: 'Normal', description: 'Tudo tranquilo', color: '#BFD7ED' },
                      { icon: Frown, label: 'Mal', description: 'Não estou bem', color: '#F7C8E0' }
                    ].map(({ icon: Icon, label, description, color }) => (
                      <motion.button
                        key={label}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-5 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                            <Icon size={24} style={{ color }} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 mb-0.5">{label}</p>
                            <p className="text-sm text-gray-500">{description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <Button
                    className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-xl font-semibold"
                    onClick={closeLogModal}
                  >
                    Salvar Registro
                  </Button>
                </div>
              )}

              {/* Symptoms Modal */}
              {activeLogType === 'symptoms' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#BFD7ED]/10 flex items-center justify-center">
                        <Activity size={20} className="text-[#BFD7ED]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Registrar Sintomas</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={closeLogModal}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={18} className="text-gray-600" />
                    </motion.button>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">Selecione os sintomas que você está sentindo:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Cólicas',
                        'Dor de cabeça',
                        'Náusea',
                        'Inchaço',
                        'Acne',
                        'Sensibilidade',
                        'Cansaço',
                        'Insônia',
                        'Ansiedade',
                        'Irritabilidade',
                        'Apetite aumentado',
                        'Dor nas costas'
                      ].map((symptom) => (
                        <motion.button
                          key={symptom}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2.5 rounded-full bg-gray-100 hover:bg-[#BFD7ED]/20 hover:text-[#BFD7ED] text-sm transition-colors border border-transparent hover:border-[#BFD7ED]/30"
                        >
                          {symptom}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-xl font-semibold"
                    onClick={closeLogModal}
                  >
                    Salvar Registro
                  </Button>
                </div>
              )}

              {/* Medication Modal */}
              {activeLogType === 'medication' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#CDE7BE]/10 flex items-center justify-center">
                        <Pill size={20} className="text-[#CDE7BE]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Medicação</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={closeLogModal}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={18} className="text-gray-600" />
                    </motion.button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {medications.map((med) => (
                      <div key={med.id} className="bg-[#CDE7BE]/10 border border-[#CDE7BE]/30 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#CDE7BE]/20 flex items-center justify-center">
                              <Pill size={18} className="text-[#CDE7BE]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{med.name}</p>
                              <p className="text-xs text-gray-500">Tomar às {med.time}</p>
                            </div>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-[#CDE7BE] flex items-center justify-center"
                            onClick={() => toggleMedication(med.id)}
                          >
                            <Check size={16} className="text-white" />
                          </motion.button>
                        </div>
                      </div>
                    ))}

                    {showAddMedication && (
                      <div className="bg-[#CDE7BE]/10 border border-[#CDE7BE]/30 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#CDE7BE]/20 flex items-center justify-center">
                              <Pill size={18} className="text-[#CDE7BE]" />
                            </div>
                            <div>
                              <Input
                                value={newMedName}
                                onChange={(e) => setNewMedName(e.target.value)}
                                placeholder="Nome da medicação"
                                className="w-full py-2 px-3 rounded-2xl border border-gray-300 focus:border-[#CDE7BE] focus:outline-none"
                              />
                              <Input
                                value={newMedDosage}
                                onChange={(e) => setNewMedDosage(e.target.value)}
                                placeholder="Dose"
                                className="w-full py-2 px-3 rounded-2xl border border-gray-300 focus:border-[#CDE7BE] focus:outline-none mt-2"
                              />
                              <Input
                                value={newMedTime}
                                onChange={(e) => setNewMedTime(e.target.value)}
                                placeholder="Hora"
                                className="w-full py-2 px-3 rounded-2xl border border-gray-300 focus:border-[#CDE7BE] focus:outline-none mt-2"
                              />
                            </div>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-[#CDE7BE] flex items-center justify-center"
                            onClick={addMedication}
                          >
                            <Check size={16} className="text-white" />
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {!showAddMedication && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Outras medicações</p>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#CDE7BE] transition-colors flex items-center justify-center gap-2 text-gray-500 hover:text-[#CDE7BE]"
                          onClick={() => setShowAddMedication(true)}
                        >
                          <Plus size={20} />
                          <span className="font-medium">Adicionar medicação</span>
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-xl font-semibold"
                    onClick={closeLogModal}
                  >
                    Confirmar
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cycle Settings Modal */}
      <AnimatePresence>
        {showCycleSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
                    <Settings size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Configurar Meu Ciclo</h3>
                    <p className="text-sm text-gray-600">
                      {isCycleConfigured ? 'Ajuste suas informações' : 'Configure para começar'}
                    </p>
                  </div>
                </div>
                {isCycleConfigured && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCycleSettings(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-600" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-6 mb-6">
                {/* Last Period Date */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    📅 Quando começou sua última menstruação?
                  </label>
                  <Input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border-2 border-gray-200 focus:border-[#F7C8E0] text-base bg-gray-50 focus:bg-white transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Informe o primeiro dia do seu último período</p>
                </div>

                {/* Cycle Length */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    🔄 Duração média do seu ciclo
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['21', '25', '28', '30', '32', '35', '40', '45'].map((days) => (
                      <motion.button
                        key={days}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCycleLength(days)}
                        className={`h-12 rounded-xl font-semibold text-sm transition-all ${
                          cycleLength === days
                            ? 'bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {days} dias
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Selecione quantos dias costuma durar do início de um período até o próximo</p>
                </div>

                {/* Period Duration */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    💧 Duração da menstruação
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['3', '4', '5', '6', '7', '8'].map((days) => (
                      <motion.button
                        key={days}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPeriodDuration(days)}
                        className={`h-12 rounded-xl font-semibold text-sm transition-all ${
                          periodDuration === days
                            ? 'bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {days} dias
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Quantos dias geralmente dura o seu período menstrual</p>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-[#BFD7ED]/10 to-[#D9C2F0]/10 rounded-2xl p-5 border border-[#BFD7ED]/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#BFD7ED]/20 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon size={18} className="text-[#BFD7ED]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Com base nos seus dados:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Seu ciclo é de <span className="font-semibold text-[#F7C8E0]">{cycleLength} dias</span></li>
                        <li>• Período dura <span className="font-semibold text-[#F7C8E0]">{periodDuration} dias</span></li>
                        <li>• Ovulação prevista no <span className="font-semibold text-[#FFB347]">dia {Math.round(Number(cycleLength) / 2)}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-14 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] hover:opacity-90 text-white rounded-2xl font-semibold text-base shadow-lg"
                onClick={saveCycleConfig}
              >
                Salvar Configuração
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Day Status Editor Modal */}
      <AnimatePresence>
        {showDayEditor && editingDay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDayEditor(false);
                setEditingDay(null);
              }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
                    <CalendarIcon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Dia {editingDay}</h3>
                    <p className="text-sm text-gray-600">Marcar status do dia</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowDayEditor(false);
                    setEditingDay(null);
                  }}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={18} className="text-gray-600" />
                </motion.button>
              </div>

              <div className="space-y-3 mb-6">
                {/* Marcar como Período */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateDayStatus('period')}
                  className="w-full py-4 px-5 rounded-2xl bg-[#F7C8E0]/10 border-2 border-[#F7C8E0]/30 hover:bg-[#F7C8E0]/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F7C8E0] flex items-center justify-center">
                      <Droplet size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-0.5">Marcar como Período</p>
                      <p className="text-sm text-gray-500">Dia de menstruação</p>
                    </div>
                  </div>
                </motion.button>

                {/* Marcar como Ovulação */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateDayStatus('ovulation')}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-br from-[#FFB347]/10 to-[#FF8C42]/10 border-2 border-[#FFB347]/30 hover:from-[#FFB347]/20 hover:to-[#FF8C42]/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB347] to-[#FF8C42] flex items-center justify-center">
                      <Sun size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-0.5">Marcar como Ovulação</p>
                      <p className="text-sm text-gray-500">Dia de ovulação (fértil)</p>
                    </div>
                  </div>
                </motion.button>

                {/* Marcar como Fértil */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateDayStatus('fertile')}
                  className="w-full py-4 px-5 rounded-2xl bg-[#BFD7ED]/10 border-2 border-[#BFD7ED]/30 hover:bg-[#BFD7ED]/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BFD7ED] flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-0.5">Marcar como Fértil</p>
                      <p className="text-sm text-gray-500">Dia fértil (sem ovulação)</p>
                    </div>
                  </div>
                </motion.button>

                {/* Limpar marcação */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateDayStatus('clear')}
                  className="w-full py-4 px-5 rounded-2xl bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-300 flex items-center justify-center">
                      <X size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-0.5">Limpar marcação</p>
                      <p className="text-sm text-gray-500">Remover status do dia</p>
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};