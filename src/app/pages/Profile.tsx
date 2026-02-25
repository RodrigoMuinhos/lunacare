import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, X, Droplet, Moon, Heart, Calendar, Camera, Upload, Smile } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

export const Profile = () => {
  const { userData, logout } = useUser();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Avatar options with different gradients
  const avatarOptions = [
    { id: 1, gradient: 'from-[#F7C8E0] to-[#D9C2F0]' },
    { id: 2, gradient: 'from-[#D9C2F0] to-[#BFD7ED]' },
    { id: 3, gradient: 'from-[#BFD7ED] to-[#CDE7BE]' },
    { id: 4, gradient: 'from-[#CDE7BE] to-[#F7C8E0]' },
    { id: 5, gradient: 'from-[#FFB347] to-[#FF8C42]' },
    { id: 6, gradient: 'from-[#FF8C42] to-[#F7C8E0]' },
    { id: 7, gradient: 'from-[#D9C2F0] to-[#CDE7BE]' },
    { id: 8, gradient: 'from-rose-400 to-pink-500' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setSelectedAvatar(null);
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAvatar = (gradient: string) => {
    setSelectedAvatar(gradient);
    setUploadedPhoto(null);
    setShowAvatarPicker(false);
  };

  const getCurrentAvatarGradient = () => {
    return selectedAvatar || 'from-[#F7C8E0] to-[#D9C2F0]';
  };

  // Health metrics - circle stats
  const circleStats = [
    { label: 'Dia do ciclo', value: '15', icon: Calendar, color: '#F7C8E0' },
    { label: 'Dias de período', value: '5', icon: Droplet, color: '#D9C2F0' },
    { label: 'Qualidade sono', value: '87', icon: Moon, color: '#BFD7ED' },
    { label: 'Bem-estar', value: '92', icon: Heart, color: '#CDE7BE' },
  ];

  // Weekly tracking data
  const weeklyData = [
    { day: 'S', active: false },
    { day: 'T', active: true },
    { day: 'Q', active: true },
    { day: 'Q', active: true },
    { day: 'S', active: true },
    { day: 'S', active: true },
    { day: 'D', active: false },
  ];

  // Performance data for simple line chart (last 7 days activity)
  const performanceData = [30, 45, 38, 52, 48, 65, 58];
  const maxValue = Math.max(...performanceData);
  const normalizedData = performanceData.map(val => (val / maxValue) * 100);

  // Days labels for X axis
  const daysLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // Generate SVG path for line chart with proper scaling
  const generateLinePath = () => {
    const padding = 10;
    const width = 100 - padding * 2;
    const height = 100 - padding * 2;
    
    const points = normalizedData.map((value, index) => {
      const x = padding + (index / (normalizedData.length - 1)) * width;
      const y = padding + (100 - value) * (height / 100);
      return { x, y };
    });
    
    // Create smooth curve
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      
      path += ` C ${midX},${current.y} ${midX},${next.y} ${next.x},${next.y}`;
    }
    
    return { path, points };
  };

  const { path, points } = generateLinePath();

  // Program metrics
  const programMetrics = [
    { label: 'Taxa de adesão', value: '94%' },
    { label: 'Dias consecutivos', value: '12' },
    { label: 'Meta semanal', value: '5/7' },
  ];

  const menuItems = [
    { icon: User, label: 'Dados pessoais', onClick: () => {} },
    { icon: Settings, label: 'Configurações', onClick: () => {} },
    { icon: Bell, label: 'Notificações', onClick: () => {} },
    { icon: Shield, label: 'Privacidade e segurança', onClick: () => {} },
    { icon: HelpCircle, label: 'Ajuda e suporte', onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-white content-pb">
      <div className="max-w-3xl mx-auto">
        {/* Header with Avatar - Centered */}
      <div className="pt-8 pb-6 px-6 text-center">
        <div className="relative inline-block">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAvatarPicker(true)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${getCurrentAvatarGradient()} flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-md relative overflow-hidden`}
          >
            {uploadedPhoto ? (
              <img src={uploadedPhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              userData.name?.charAt(0) || 'A'
            )}
          </motion.button>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white cursor-pointer"
          >
            <Camera size={16} className="text-gray-700" />
          </motion.div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-4">
          {userData.name || 'Ana Silva'}
        </h1>
        <p className="text-sm text-gray-500">{userData.email}</p>
      </div>

      {/* Dashboard - Circle Stats */}
      <div className="px-6 mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Dashboard</p>
        <div className="grid grid-cols-4 gap-4">
          {circleStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-full aspect-square rounded-full border-2 flex items-center justify-center mb-2" style={{ borderColor: stat.color }}>
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                    <Icon size={14} className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weekly Tracking */}
      <div className="px-6 mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Esta semana</p>
        <div className="flex justify-between gap-2">
          {weeklyData.map((day, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1"
            >
              <div className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold mb-1 ${
                day.active 
                  ? 'bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {day.day}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="px-6 mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Performance</p>
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 font-medium">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart container with margin for Y-axis */}
            <div className="ml-6">
              <svg className="w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                {[0, 25, 50, 75, 100].map((value) => (
                  <line
                    key={value}
                    x1="10"
                    y1={10 + (100 - value) * 0.8}
                    x2="90"
                    y2={10 + (100 - value) * 0.8}
                    stroke="#E5E7EB"
                    strokeWidth="0.3"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Area under curve */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D9C2F0" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D9C2F0" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d={`${path} L 90,90 L 10,90 Z`}
                  fill="url(#chartGradient)"
                />

                {/* Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  d={path}
                  fill="none"
                  stroke="#D9C2F0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Dots on line */}
                {points.map((point, index) => (
                  <g key={index}>
                    <motion.circle
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 300 }}
                      cx={point.x}
                      cy={point.y}
                      r="2.5"
                      fill="white"
                      stroke="#D9C2F0"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2">
                {daysLabels.map((day, index) => (
                  <span key={index} className="text-xs text-gray-400 font-medium">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Program Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-gray-200">
            {programMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-lg font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Settings Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSettings(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] shadow-lg flex items-center justify-center z-30"
      >
        <Settings size={24} className="text-white" />
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Configurações</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={16} className="text-gray-600" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-6">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4">
                  {menuItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        onClick={item.onClick}
                        className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} className="text-gray-600" />
                          <span className="text-gray-900">{item.label}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Logout */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sair</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarPicker(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 m-6 max-w-sm mx-auto flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-3xl p-6 w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center">
                      <Smile size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Escolher Avatar</h3>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAvatarPicker(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={16} className="text-gray-600" />
                  </motion.button>
                </div>

                {/* Upload Photo Button */}
                <label className="block mb-6">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload size={20} />
                    <span>Enviar Foto</span>
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Avatar Grid */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Ou escolha um avatar</p>
                  <div className="grid grid-cols-4 gap-3">
                    {avatarOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSelectAvatar(option.gradient)}
                        className={`aspect-square rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center text-white text-xl font-bold shadow-md hover:shadow-lg transition-shadow`}
                      >
                        {userData.name?.charAt(0) || 'A'}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
      </div>
    </div>
  );
};