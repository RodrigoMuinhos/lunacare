import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Moon, 
  Droplet, 
  ListTodo, 
  Heart, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Check,
  Pill,
  Flame,
  Bell,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Apple,
  Dumbbell,
} from 'lucide-react';
import { DonutChart } from '../components/DonutChart';
import { BottomNav } from '../components/BottomNav';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface Habit {
  id: string;
  text: string;
  completed: boolean;
}

interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'success';
  message: string;
  icon: any;
  color: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', text: 'Dormir 8h', completed: true },
    { id: '2', text: 'Me exercitar', completed: false },
    { id: '3', text: 'Meditar 10min', completed: true },
  ]);
  
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitText, setNewHabitText] = useState('');

  const insights: Insight[] = [
    {
      id: '1',
      type: 'tip',
      message: 'Lembre-se de tomar sua pílula hoje às 22:00',
      icon: Pill,
      color: '#F7C8E0'
    },
    {
      id: '2',
      type: 'success',
      message: 'Você está a 3 dias da janela fértil',
      icon: Calendar,
      color: '#BFD7ED'
    },
    {
      id: '3',
      type: 'tip',
      message: 'Sequência de 7 dias mantendo hábitos saudáveis!',
      icon: Flame,
      color: '#FFB347'
    }
  ];

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (!newHabitText.trim()) return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      text: newHabitText.trim(),
      completed: false,
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitText('');
    setShowAddHabit(false);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Mock data para métricas
  const weeklyStats = {
    waterIntake: 85, // %
    sleepQuality: 78, // %
    exerciseStreak: 5, // dias
    mood: 'Ótimo'
  };

  return (
    <div className="min-h-screen bg-gray-50 content-pb">
      {/* Header Premium */}
      <div className="bg-gradient-to-br from-[#F7C8E0]/30 via-[#D9C2F0]/20 to-[#BFD7ED]/30 p-6 lg:px-10 rounded-b-[2.5rem]">
        <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Olá, {userData.name || 'Ana'} 🌙
            </h1>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F7C8E0] rounded-full"></span>
          </motion.button>
        </div>

        {/* Cycle Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
                <Moon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fase do Ciclo</p>
                <p className="text-lg font-bold text-gray-800">Fase Folicular</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Próxima menstruação</span>
                <span className="text-xs font-semibold text-[#F7C8E0]">12 dias</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-10 mt-6 space-y-6 max-w-5xl mx-auto">
        {/* Clinical Plan Card */}
        {userData.clinicalActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/messages')}
            className="bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] rounded-2xl p-6 text-white shadow-lg cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Plano da Médica</h3>
                  <p className="text-sm text-white/90">Dra. Silva</p>
                </div>
              </div>
              <ArrowUpRight size={20} />
            </div>
            <p className="text-sm leading-relaxed text-white/95">
              Continuar uso da pílula, observar padrão de sono e manter hidratação.
            </p>
          </motion.div>
        )}

        {/* Quick Insights Carousel */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Insights do dia</h2>
          <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
            {insights.map((insight, index) => {
              const InsightIcon = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-gray-100"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${insight.color}15` }}
                  >
                    <InsightIcon size={18} style={{ color: insight.color }} />
                  </div>
                  <p className="text-sm text-gray-700 flex-1 leading-relaxed pt-1.5">
                    {insight.message}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Minha Jornada</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate('/cycle')}
              className="cursor-pointer"
            >
              <DonutChart
                value={userData.cycleProgress || 45}
                color="#F7C8E0"
                label="Ciclo"
                icon={<Moon size={18} className="text-[#F7C8E0]" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/routine')}
              className="cursor-pointer"
            >
              <DonutChart
                value={completionPercentage}
                color="#CDE7BE"
                label="Rotina"
                icon={<ListTodo size={18} className="text-[#CDE7BE]" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DonutChart
                value={userData.waterProgress || 85}
                color="#BFD7ED"
                label="Hidratação"
                icon={<Droplet size={18} className="text-[#BFD7ED]" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <DonutChart
                value={userData.wellnessProgress || 78}
                color="#D9C2F0"
                label="Bem-estar"
                icon={<Heart size={18} className="text-[#D9C2F0]" />}
              />
            </motion.div>
          </div>
        </div>

        {/* Weekly Summary Cards */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Esta semana</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#BFD7ED]/10 flex items-center justify-center">
                  <Droplet size={16} className="text-[#BFD7ED]" />
                </div>
                <span className="text-xs text-gray-600">Água</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{weeklyStats.waterIntake}%</p>
              <p className="text-xs text-gray-500">Meta atingida</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#D9C2F0]/10 flex items-center justify-center">
                  <Moon size={16} className="text-[#D9C2F0]" />
                </div>
                <span className="text-xs text-gray-600">Sono</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{weeklyStats.sleepQuality}%</p>
              <p className="text-xs text-gray-500">Qualidade</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB347] to-[#FF8C42] flex items-center justify-center">
                  <Flame size={16} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">Sequência</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{weeklyStats.exerciseStreak}</p>
              <p className="text-xs text-gray-500">dias seguidos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#CDE7BE]/10 flex items-center justify-center">
                  <Heart size={16} className="text-[#CDE7BE]" />
                </div>
                <span className="text-xs text-gray-600">Humor</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">😊</p>
              <p className="text-xs text-gray-500">{weeklyStats.mood}</p>
            </motion.div>
          </div>
        </div>

        {/* Daily Activities */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Hábitos de Hoje</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddHabit(true)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#CDE7BE] to-[#BFD7ED] flex items-center justify-center text-white shadow-sm"
            >
              <Plus size={18} />
            </motion.button>
          </div>
          
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {habits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    delay: index * 0.05 
                  }}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleHabit(habit.id)}
                      className={`
                        w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all
                        ${habit.completed 
                          ? 'bg-gradient-to-br from-[#CDE7BE] to-[#BFD7ED] border-transparent shadow-sm' 
                          : 'border-gray-300 bg-white'
                        }
                      `}
                    >
                      <AnimatePresence>
                        {habit.completed && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          >
                            <Check size={16} className="text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <span className={`
                      text-sm font-medium transition-all
                      ${habit.completed ? 'line-through text-gray-400' : 'text-gray-700'}
                    `}>
                      {habit.text}
                    </span>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteHabit(habit.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          {habits.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progresso diário</span>
                <span className="text-sm font-bold text-[#CDE7BE]">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#CDE7BE] to-[#BFD7ED] rounded-full"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Upgrade CTA - Only show if not clinical */}
        {!userData.clinicalActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/pricing')}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-[#F7C8E0]/30 cursor-pointer shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Quer acompanhamento profissional?
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Ative o modo Clinical e compartilhe seus dados com sua médica
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F7C8E0]">
                  Conhecer Clinical
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Ações rápidas</h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Pill, label: 'Medicação', color: '#F7C8E0', path: '/cycle' },
              { icon: Apple, label: 'Nutrição', color: '#CDE7BE', path: '/routine' },
              { icon: Dumbbell, label: 'Exercício', color: '#BFD7ED', path: '/routine' },
            ].map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(action.path)}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 shadow-sm"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <ActionIcon size={20} style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {showAddHabit && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddHabit(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[480px] bg-white rounded-t-3xl lg:rounded-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CDE7BE] to-[#BFD7ED] flex items-center justify-center">
                    <Plus size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Novo Hábito</h3>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddHabit(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <Input
                  autoFocus
                  type="text"
                  placeholder="Ex: Beber 2L de água"
                  value={newHabitText}
                  onChange={(e) => setNewHabitText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                  className="h-14 rounded-2xl text-base border-2"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setShowAddHabit(false)}
                    variant="outline"
                    className="h-12 rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={addHabit}
                    disabled={!newHabitText.trim()}
                    className="h-12 rounded-xl bg-gradient-to-r from-[#CDE7BE] to-[#BFD7ED] hover:opacity-90 text-white disabled:opacity-50"
                  >
                    Adicionar
                  </Button>
                </div>

                {/* Quick Suggestions */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Beber água', 'Tomar vitamina', 'Alongar', 'Ler 10 minutos'].map((suggestion) => (
                      <motion.button
                        key={suggestion}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNewHabitText(suggestion)}
                        className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs hover:bg-gray-200 transition-colors font-medium"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Check-in Button */}
      <div className="fixed bottom-20 lg:bottom-8 left-0 right-0 lg:left-60 px-6 z-30 flex justify-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
          <Button 
            className="w-14 h-14 bg-gradient-to-r from-[#F7C8E0] via-[#D9C2F0] to-[#BFD7ED] hover:opacity-90 text-white rounded-full shadow-lg active:scale-95 transition-transform p-0 flex items-center justify-center"
          >
            <Check size={24} strokeWidth={3} />
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};