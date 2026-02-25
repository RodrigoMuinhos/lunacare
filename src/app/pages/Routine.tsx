import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft,
  Check, 
  Plus,
  TrendingUp,
  Calendar,
  Target,
  Droplets,
  Coffee,
  Moon,
  Activity,
  Heart,
  Book,
  Dumbbell,
  Brain,
  Sun,
  X,
  Flame,
  ChevronRight,
  Award,
  Zap,
  Apple,
  Utensils,
  Pill,
  Wind,
  Smile,
  Clock,
  Repeat,
  Bell
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { Checkbox } from '../components/ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNotifications } from '../contexts/NotificationContext';

interface Habit {
  id: string;
  label: string;
  category: 'alimentacao' | 'saude-fisica' | 'saude-mental' | 'autocuidado';
  completed: boolean;
  streak: number;
  frequency: 'diario' | 'semanal' | 'personalizado';
  time?: string;
  icon: any;
}

type HabitCategory = 'alimentacao' | 'saude-fisica' | 'saude-mental' | 'autocuidado';
type HabitFrequency = 'diario' | 'semanal' | 'personalizado';

interface CategoryConfig {
  id: HabitCategory;
  name: string;
  color: string;
  gradient: string;
  icon: any;
  description: string;
}

export const Routine = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('08:00');
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory>('alimentacao');
  const [selectedFrequency, setSelectedFrequency] = useState<HabitFrequency>('diario');
  
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', label: 'Tomar café da manhã', category: 'alimentacao', completed: true, streak: 15, frequency: 'diario', time: '08:00', icon: Coffee },
    { id: '2', label: 'Beber 2L de água', category: 'alimentacao', completed: true, streak: 12, frequency: 'diario', icon: Droplets },
    { id: '3', label: 'Comer frutas', category: 'alimentacao', completed: false, streak: 8, frequency: 'diario', icon: Apple },
    { id: '4', label: 'Me exercitar 30min', category: 'saude-fisica', completed: true, streak: 7, frequency: 'diario', time: '18:00', icon: Dumbbell },
    { id: '5', label: 'Dormir 8h', category: 'saude-fisica', completed: false, streak: 5, frequency: 'diario', time: '23:00', icon: Moon },
    { id: '6', label: 'Alongamento', category: 'saude-fisica', completed: false, streak: 4, frequency: 'diario', icon: Activity },
    { id: '7', label: 'Meditar 10min', category: 'saude-mental', completed: true, streak: 10, frequency: 'diario', time: '07:00', icon: Brain },
    { id: '8', label: 'Diário da gratidão', category: 'saude-mental', completed: false, streak: 6, frequency: 'diario', icon: Book },
    { id: '9', label: 'Ler 30 páginas', category: 'saude-mental', completed: false, streak: 9, frequency: 'diario', icon: Book },
    { id: '10', label: 'Skincare noturno', category: 'autocuidado', completed: true, streak: 20, frequency: 'diario', time: '22:00', icon: Heart },
    { id: '11', label: 'Tomar sol 15min', category: 'autocuidado', completed: false, streak: 3, frequency: 'diario', icon: Sun },
  ]);

  const categories: CategoryConfig[] = [
    { 
      id: 'alimentacao', 
      name: 'Alimentação', 
      color: '#CDE7BE', 
      gradient: 'from-[#CDE7BE] to-[#A8D08D]',
      icon: Utensils,
      description: 'Nutrição e hidratação'
    },
    { 
      id: 'saude-fisica', 
      name: 'Saúde Física', 
      color: '#BFD7ED', 
      gradient: 'from-[#BFD7ED] to-[#8FB9DB]',
      icon: Dumbbell,
      description: 'Exercícios e sono'
    },
    { 
      id: 'saude-mental', 
      name: 'Saúde Mental', 
      color: '#D9C2F0', 
      gradient: 'from-[#D9C2F0] to-[#B794E0]',
      icon: Brain,
      description: 'Bem-estar emocional'
    },
    { 
      id: 'autocuidado', 
      name: 'Autocuidado', 
      color: '#F7C8E0', 
      gradient: 'from-[#F7C8E0] to-[#F39CC8]',
      icon: Heart,
      description: 'Cuidados pessoais'
    }
  ];

  const frequencies = [
    { id: 'diario' as HabitFrequency, name: 'Todos os dias', icon: Repeat },
    { id: 'semanal' as HabitFrequency, name: '3x por semana', icon: Calendar },
    { id: 'personalizado' as HabitFrequency, name: 'Personalizado', icon: Target }
  ];

  // Sugestões de hábitos por categoria
  const habitSuggestions = {
    alimentacao: [
      { label: 'Começar o dia com café', icon: Coffee, time: '08:00' },
      { label: 'Beber bastante água', icon: Droplets, time: '10:00' },
      { label: 'Incluir frutas no dia', icon: Apple, time: '15:00' },
      { label: 'Reduzir açúcar', icon: Utensils, time: '12:00' },
      { label: 'Mais verduras no prato', icon: Apple, time: '12:00' },
      { label: 'Tomar vitaminas', icon: Pill, time: '09:00' },
    ],
    'saude-fisica': [
      { label: 'Mexer o corpo 30min', icon: Dumbbell, time: '18:00' },
      { label: 'Dormir bem (8h)', icon: Moon, time: '23:00' },
      { label: 'Alongar pela manhã', icon: Activity, time: '07:00' },
      { label: 'Caminhar mais', icon: Activity, time: '17:00' },
      { label: 'Praticar yoga', icon: Activity, time: '07:00' },
      { label: 'Subir escadas', icon: Dumbbell, time: '14:00' },
    ],
    'saude-mental': [
      { label: 'Meditar um pouquinho', icon: Brain, time: '07:00' },
      { label: 'Escrever o que sinto', icon: Book, time: '21:00' },
      { label: 'Ler antes de dormir', icon: Book, time: '20:00' },
      { label: 'Respirar fundo', icon: Wind, time: '12:00' },
      { label: 'Desconectar das telas', icon: Brain, time: '19:00' },
      { label: 'Ouvir música que amo', icon: Heart, time: '21:00' },
    ],
    autocuidado: [
      { label: 'Cuidar da pele à noite', icon: Heart, time: '22:00' },
      { label: 'Tomar um solzinho', icon: Sun, time: '09:00' },
      { label: 'Skincare matinal', icon: Heart, time: '07:00' },
      { label: 'Hidratar bem a pele', icon: Droplets, time: '20:00' },
      { label: 'Fazer minhas unhas', icon: Heart, time: '19:00' },
      { label: 'Um momento só meu', icon: Heart, time: '18:00' },
    ]
  };

  const getCategoryColor = (category: HabitCategory) => {
    return categories.find(c => c.id === category)?.color || '#CDE7BE';
  };

  const getCategoryConfig = (category: HabitCategory) => {
    return categories.find(c => c.id === category);
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    
    const categoryConfig = categories.find(c => c.id === selectedCategory);
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      label: newHabitName.trim(),
      category: selectedCategory,
      completed: false,
      streak: 0,
      frequency: selectedFrequency,
      time: newHabitTime,
      icon: categoryConfig?.icon || Activity
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setNewHabitTime('08:00');
    setShowAddHabit(false);
    setShowCategorySelection(false);
    addNotification({
      type: 'motivational',
      title: 'Sucesso!',
      message: 'Hábito adicionado com sucesso! 🎉',
      icon: Heart,
      color: '#CDE7BE',
      gradient: 'from-[#CDE7BE] to-[#A8D08D]'
    });
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);
  const currentStreak = Math.max(...habits.map(h => h.streak), 0);
  const bestStreak = 20;

  // Agrupar hábitos por categoria
  const habitsByCategory = categories.map(cat => ({
    ...cat,
    habits: habits.filter(h => h.category === cat.id)
  })).filter(cat => cat.habits.length > 0);

  const openCategorySelection = () => {
    setShowCategorySelection(true);
  };

  const selectCategoryAndContinue = (categoryId: HabitCategory) => {
    setSelectedCategory(categoryId);
    setShowCategorySelection(false);
    setShowAddHabit(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 content-pb">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#CDE7BE]/20 via-[#BFD7ED]/20 to-[#D9C2F0]/20 p-6 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Minha Rotina</h1>
              <p className="text-xs text-gray-600">Construa hábitos saudáveis</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openCategorySelection}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center shadow-lg"
          >
            <Plus size={22} className="text-white" />
          </motion.button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CDE7BE] to-[#BFD7ED] flex items-center justify-center mb-2">
                <Target size={18} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{completedToday}</p>
              <p className="text-xs text-gray-600">completos</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFB347] to-[#FF8C42] flex items-center justify-center mb-2">
                <Flame size={18} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{currentStreak}</p>
              <p className="text-xs text-gray-600">dias</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9C2F0] to-[#F7C8E0] flex items-center justify-center mb-2">
                <Award size={18} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
              <p className="text-xs text-gray-600">hoje</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 mt-6 space-y-5">
        {/* Hábitos por Categoria */}
        {habitsByCategory.map((category, catIndex) => {
          const CategoryIcon = category.icon;
          const completedInCategory = category.habits.filter(h => h.completed).length;
          const totalInCategory = category.habits.length;
          const categoryProgress = Math.round((completedInCategory / totalInCategory) * 100);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.08 }}
              className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Category Header */}
              <div 
                className={`p-5 bg-gradient-to-br ${category.gradient}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <CategoryIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{category.name}</h3>
                      <p className="text-xs text-white/90">{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{completedInCategory}/{totalInCategory}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${categoryProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: catIndex * 0.1 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>

              {/* Habits List */}
              <div className="p-4">
                <div className="space-y-2">
                  {category.habits.map((habit, habitIndex) => {
                    const HabitIcon = habit.icon;
                    return (
                      <motion.div
                        key={habit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: catIndex * 0.08 + habitIndex * 0.04 }}
                        className={`p-4 rounded-2xl transition-all ${
                          habit.completed 
                            ? 'bg-gray-50' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Checkbox 
                              checked={habit.completed}
                              onCheckedChange={() => toggleHabit(habit.id)}
                            />
                          </motion.div>
                          
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${category.color}15` }}
                          >
                            <HabitIcon size={18} style={{ color: category.color }} />
                          </div>
                          
                          <div className="flex-1">
                            <p className={`font-medium transition-all ${
                              habit.completed 
                                ? 'text-gray-400 line-through' 
                                : 'text-gray-800'
                            }`}>
                              {habit.label}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              {habit.time && (
                                <div className="flex items-center gap-1">
                                  <Clock size={12} className="text-gray-400" />
                                  <span className="text-xs text-gray-500">{habit.time}</span>
                                </div>
                              )}
                              {habit.streak > 0 && (
                                <div className="flex items-center gap-1">
                                  <Flame size={12} className="text-orange-500" />
                                  <span className="text-xs text-gray-500">{habit.streak} dias</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {habit.completed && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${category.color}20` }}
                            >
                              <Check size={18} style={{ color: category.color }} strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Estatísticas Semanais */}
        <div className="bg-gradient-to-br from-[#F7C8E0] via-[#D9C2F0] to-[#BFD7ED] rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-lg mb-1">Estatísticas da Semana</h3>
              <p className="text-sm text-white/90">Você está indo muito bem!</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <TrendingUp size={22} className="text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">7</p>
              <p className="text-xs text-white/80">dias ativos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">78%</p>
              <p className="text-xs text-white/80">conclusão</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">54</p>
              <p className="text-xs text-white/80">hábitos feitos</p>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/90">Progresso semanal</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB347] to-[#FF8C42] flex items-center justify-center">
                <Award size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Conquistas</h3>
                <p className="text-xs text-gray-500">Continue assim!</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '7 dias', icon: Flame, color: '#FF8C42', unlocked: true },
              { label: '30 dias', icon: Zap, color: '#FFB347', unlocked: false },
              { label: '100 dias', icon: Award, color: '#F7C8E0', unlocked: false },
              { label: 'Perfeito', icon: Target, color: '#BFD7ED', unlocked: false }
            ].map((achievement, index) => {
              const AchievementIcon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-3 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-[#FFB347]/20 to-[#FF8C42]/20 border-2 border-[#FFB347]/30'
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-[#FFB347] to-[#FF8C42]'
                      : 'bg-white'
                  }`}>
                    <AchievementIcon 
                      size={16} 
                      className={achievement.unlocked ? 'text-white' : 'text-gray-400'}
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className={`text-xs font-medium text-center leading-tight ${
                    achievement.unlocked ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {achievement.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dica Motivacional */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 border-2 border-[#CDE7BE]/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CDE7BE]/20 flex items-center justify-center flex-shrink-0">
              <Zap size={18} className="text-[#CDE7BE]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Dica do dia</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Você manteve uma sequência de <span className="font-semibold text-[#CDE7BE]">15 dias</span> tomando café da manhã! 
                Que tal adicionar mais frutas à sua rotina? 🍎
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Category Selection */}
      <AnimatePresence>
        {showCategorySelection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategorySelection(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Selecione a categoria</h3>
                    <p className="text-sm text-gray-600">Qual tipo de hábito você quer criar?</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCategorySelection(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-600" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category, index) => {
                    const CategoryIcon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectCategoryAndContinue(category.id)}
                        className={`p-5 rounded-2xl border-2 transition-all bg-gradient-to-br ${category.gradient} border-transparent`}
                      >
                        <div className="flex flex-col items-center gap-3 text-white">
                          <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <CategoryIcon size={28} className="text-white" />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-sm mb-0.5">{category.name}</p>
                            <p className="text-xs text-white/90">{category.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal: Add Habit */}
      <AnimatePresence>
        {showAddHabit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddHabit(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-6"
            >
              <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl md:mx-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl md:rounded-t-3xl z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getCategoryConfig(selectedCategory)?.gradient}`}
                      >
                        <Plus size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Novo Hábito</h3>
                        <p className="text-sm text-gray-600">{getCategoryConfig(selectedCategory)?.name}</p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAddHabit(false)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X size={20} className="text-gray-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Habit Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Qual hábito você quer adicionar?
                    </label>
                    <Input
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      placeholder="Ex: Tomar café da manhã"
                      className="w-full h-14 px-5 rounded-2xl border-2 border-gray-200 focus:border-[#CDE7BE] text-base bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Frequency Selection */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Com que frequência?
                    </label>
                    <div className="space-y-3">
                      {frequencies.map((freq) => {
                        const FreqIcon = freq.icon;
                        const isSelected = selectedFrequency === freq.id;
                        
                        return (
                          <motion.button
                            key={freq.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedFrequency(freq.id)}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                              isSelected
                                ? 'border-[#CDE7BE] bg-[#CDE7BE]/5'
                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div 
                              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-[#CDE7BE]/20' : 'bg-white'
                              }`}
                            >
                              <FreqIcon 
                                size={20} 
                                className={isSelected ? 'text-[#CDE7BE]' : 'text-gray-500'} 
                              />
                            </div>
                            <span className={`font-medium text-base flex-1 text-left ${
                              isSelected ? 'text-[#CDE7BE]' : 'text-gray-700'
                            }`}>
                              {freq.name}
                            </span>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              >
                                <Check size={22} className="text-[#CDE7BE]" strokeWidth={3} />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Horário (opcional)
                    </label>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 bg-gray-50">
                      <Clock size={22} className="text-gray-400 flex-shrink-0" />
                      <Input
                        type="time"
                        value={newHabitTime}
                        onChange={(e) => setNewHabitTime(e.target.value)}
                        className="flex-1 border-0 p-0 focus:ring-0 text-base bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Que tal começar por aqui? 💫
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {habitSuggestions[selectedCategory].map((suggestion, index) => {
                        const SuggestionIcon = suggestion.icon;
                        return (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => {
                              setNewHabitName(suggestion.label);
                              setNewHabitTime(suggestion.time);
                            }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all border-2 border-gray-200 hover:border-gray-300"
                          >
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${getCategoryConfig(selectedCategory)?.color}15` }}
                            >
                              <SuggestionIcon 
                                size={18} 
                                style={{ color: getCategoryConfig(selectedCategory)?.color }} 
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 text-left flex-1 leading-tight">
                              {suggestion.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
                  <Button
                    className={`w-full h-14 bg-gradient-to-r ${getCategoryConfig(selectedCategory)?.gradient} hover:opacity-90 text-white rounded-2xl font-semibold text-base shadow-lg transition-all active:scale-[0.98]`}
                    onClick={addHabit}
                  >
                    Adicionar Hábito
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};