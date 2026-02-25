import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, MessageCircle, Hash, Search, Moon, Pill, Calendar, AlertCircle, FileText, LogOut, X, Send, Plus, ClipboardList, Stethoscope, CalendarCheck, TestTube, ChevronRight, Menu, Smile, Camera, Upload, Check, ShieldCheck, Lock, BarChart3, TrendingUp, Activity, Settings, HelpCircle, Home, FileSpreadsheet, ClipboardPlus, Bell, Archive } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockPatients, Patient } from '../../data/mockPatients';
import { PatientDetailModal } from './PatientDetailModal';
import { ActionModals } from './ActionModals';

interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: string;
  prescriptionType: 'simple' | 'controlled' | 'antimicrobial';
  cid: string;
  patientCpf: string;
  patientAddress: string;
  usageMode: string;
  via: '1' | '2';
}

export const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('patients');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLetter, setSelectedLetter] = React.useState<string>('Todos');
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [showActionSheet, setShowActionSheet] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = React.useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = React.useState(false);
  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [showNoteModal, setShowNoteModal] = React.useState(false);
  const [showExamsModal, setShowExamsModal] = React.useState(false);
  const [showCarePlanModal, setShowCarePlanModal] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [note, setNote] = React.useState('');
  const [prescription, setPrescription] = React.useState<Prescription>({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: '',
    prescriptionType: 'simple',
    cid: '',
    patientCpf: '',
    patientAddress: '',
    usageMode: '',
    via: '1',
  });
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [appointments, setAppointments] = React.useState([
    { id: 1, date: '2026-02-24', time: '09:00', patient: 'Maria Silva', type: 'Consulta de rotina', status: 'confirmed' },
    { id: 2, date: '2026-02-24', time: '10:30', patient: 'Ana Costa', type: 'Retorno', status: 'confirmed' },
    { id: 3, date: '2026-02-24', time: '14:00', patient: 'Julia Santos', type: 'Primeira consulta', status: 'pending' },
    { id: 4, date: '2026-02-25', time: '09:30', patient: 'Carla Oliveira', type: 'Exames', status: 'confirmed' },
    { id: 5, date: '2026-02-25', time: '11:00', patient: 'Beatriz Lima', type: 'Consulta de rotina', status: 'pending' },
  ]);
  const [messages, setMessages] = React.useState([
    { id: 1, patient: 'Maria Silva', message: 'Dra., esqueci de tomar a pílula ontem. O que devo fazer?', time: '10:30', unread: true },
    { id: 2, patient: 'Ana Costa', message: 'Bom dia! Gostaria de agendar um retorno.', time: '09:15', unread: true },
    { id: 3, patient: 'Julia Santos', message: 'Recebi os resultados dos exames, quando podemos conversar?', time: 'Ontem', unread: true },
    { id: 4, patient: 'Carla Oliveira', message: 'Muito obrigada pela consulta de ontem!', time: '2 dias', unread: false },
  ]);
  const [recentPrescriptions, setRecentPrescriptions] = React.useState([
    { id: 1, patient: 'Maria Silva', medication: 'Anticoncepcional Oral Combinado', date: '20/02/2026', type: 'simple' },
    { id: 2, patient: 'Ana Costa', medication: 'Ácido Fólico 5mg', date: '19/02/2026', type: 'simple' },
    { id: 3, patient: 'Julia Santos', medication: 'Fluconazol 150mg', date: '18/02/2026', type: 'antimicrobial' },
    { id: 4, patient: 'Carla Oliveira', medication: 'Depo-Provera', date: '17/02/2026', type: 'controlled' },
  ]);
  const [recentExams, setRecentExams] = React.useState([
    { id: 1, patient: 'Maria Silva', exam: 'Papanicolau', date: '21/02/2026', status: 'pending' },
    { id: 2, patient: 'Ana Costa', exam: 'Ultrassom Transvaginal', date: '20/02/2026', status: 'completed' },
    { id: 3, patient: 'Julia Santos', exam: 'Hemograma Completo', date: '19/02/2026', status: 'completed' },
    { id: 4, patient: 'Beatriz Lima', exam: 'Colposcopia', date: '18/02/2026', status: 'pending' },
  ]);

  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Alphabet filter
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const letterFilteredPatients = filteredPatients.filter((patient) => {
    if (selectedLetter === 'Todos') return true;
    return patient.name.charAt(0).toUpperCase() === selectedLetter;
  });

  // Get avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#F7C8E0', '#D9C2F0', '#BFD7ED', '#CDE7BE', '#FFB347', 
      '#FF8C42', '#F09999', '#B4A7D6', '#A8D5E2', '#D4E9C0'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleSendPrescription = () => {
    // Logic to send prescription
    console.log('Sending prescription:', prescription);
    setShowPrescriptionModal(false);
    setPrescription({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      quantity: '',
      prescriptionType: 'simple',
      cid: '',
      patientCpf: '',
      patientAddress: '',
      usageMode: '',
      via: '1',
    });
  };

  const actions = [
    { icon: MessageCircle, label: 'Enviar mensagem', color: '#F7C8E0', action: () => setShowMessageModal(true) },
    { icon: FileText, label: 'Receita eletrônica', color: '#D9C2F0', action: () => setShowPrescriptionModal(true) },
    { icon: ClipboardList, label: 'Adicionar nota', color: '#BFD7ED', action: () => setShowNoteModal(true) },
    { icon: CalendarCheck, label: 'Agendar consulta', color: '#CDE7BE', action: () => setShowAppointmentModal(true) },
    { icon: TestTube, label: 'Solicitar exames', color: '#FFB347', action: () => setShowExamsModal(true) },
    { icon: Stethoscope, label: 'Plano de cuidado', color: '#FF8C42', action: () => setShowCarePlanModal(true) },
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', badge: null },
    { id: 'patients', icon: Users, label: 'Pacientes', badge: mockPatients.length, badgeColor: '#F7C8E0' },
    { id: 'calendar', icon: CalendarCheck, label: 'Agenda', badge: 5, badgeColor: '#BFD7ED' },
    { id: 'messages', icon: MessageCircle, label: 'Mensagens', badge: 3, badgeColor: '#FF0000' },
    { id: 'prescriptions', icon: FileText, label: 'Receitas', badge: null },
    { id: 'exams', icon: TestTube, label: 'Exames', badge: null },
    { id: 'reports', icon: BarChart3, label: 'Relatórios', badge: null },
  ];

  const secondaryNavItems = [
    { id: 'code', icon: Hash, label: 'Código de Vínculo' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
    { id: 'help', icon: HelpCircle, label: 'Ajuda' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={24} className="text-[#F7C8E0]" />
            <div>
              <h1 className="font-bold text-gray-800">LunaCare</h1>
              <p className="text-xs text-gray-500">Painel Médica</p>
            </div>
          </div>
          <button
            onClick={() => setShowMobileMenu(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center"
          >
            <Menu size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col overflow-y-auto"
            >
              {/* Logo */}
              <div className="p-6 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon size={28} className="text-[#F7C8E0]" />
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">LunaCare</h1>
                      <p className="text-xs text-gray-500">Painel Médica</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6 border-b flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white font-semibold">
                    AA
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dra. Aline Araújo</p>
                    <p className="text-sm text-gray-500">CRM 123456</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-[#F7C8E0]/10 text-[#F7C8E0]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          className="ml-auto text-white border-0" 
                          style={{ backgroundColor: item.badgeColor || '#F7C8E0' }}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-gray-100">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === item.id
                            ? 'bg-[#F7C8E0]/10 text-[#F7C8E0]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Logout */}
              <div className="p-4 border-t flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col fixed left-0 top-0 bottom-0">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Moon size={28} className="text-[#F7C8E0]" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">LunaCare</h1>
                <p className="text-xs text-gray-500">Painel Médica</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white font-semibold">
                AA
              </div>
              <div>
                <p className="font-medium text-gray-800">Dra. Aline Araújo</p>
                <p className="text-sm text-gray-500">CRM 123456</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-[#F7C8E0]/10 text-[#F7C8E0]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      className="ml-auto text-white border-0" 
                      style={{ backgroundColor: item.badgeColor || '#F7C8E0' }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}

            <div className="pt-2 mt-2 border-t border-gray-100">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-[#F7C8E0]/10 text-[#F7C8E0]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          {activeTab === 'dashboard' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Dashboard
                </h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Total de Pacientes</p>
                      <Users size={20} className="text-[#F7C8E0]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{mockPatients.length}</p>
                    <p className="text-xs text-green-600 mt-2">+2 este mês</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Consultas Hoje</p>
                      <CalendarCheck size={20} className="text-[#BFD7ED]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">3</p>
                    <p className="text-xs text-gray-500 mt-2">2 confirmadas</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Mensagens</p>
                      <MessageCircle size={20} className="text-[#D9C2F0]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">3</p>
                    <p className="text-xs text-red-600 mt-2">Não lidas</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Receitas Enviadas</p>
                      <FileText size={20} className="text-[#CDE7BE]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">12</p>
                    <p className="text-xs text-gray-500 mt-2">Este mês</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {actions.slice(0, 6).map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={action.action}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${action.color}20` }}
                          >
                            <Icon size={20} style={{ color: action.color }} />
                          </div>
                          <span className="text-xs text-gray-700 text-center font-medium">
                            {action.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Próximas Consultas */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Próximas Consultas</h3>
                    <div className="space-y-3">
                      {appointments.filter(a => a.date === '2026-02-24').slice(0, 3).map((apt) => (
                        <div key={apt.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white text-xs font-semibold">
                            {getInitials(apt.patient)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{apt.patient}</p>
                            <p className="text-xs text-gray-500">{apt.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#F7C8E0] text-sm">{apt.time}</p>
                            <Badge className={`text-xs ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border-0`}>
                              {apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mensagens Recentes */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Mensagens Recentes</h3>
                    <div className="space-y-3">
                      {messages.slice(0, 3).map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9C2F0] to-[#BFD7ED] flex items-center justify-center text-white text-xs font-semibold">
                            {getInitials(msg.patient)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-800 text-sm">{msg.patient}</p>
                              <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
                          </div>
                          {msg.unread && (
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="p-4 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Minhas Pacientes
                </h2>
                <p className="text-gray-600">
                  {mockPatients.length} pacientes vinculadas ao seu perfil
                </p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
              </div>

              {/* Alfabético Filter - Select */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Filtrar por letra:
                  </label>
                  <select
                    value={selectedLetter}
                    onChange={(e) => setSelectedLetter(e.target.value)}
                    className="h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white focus:border-[#F7C8E0] focus:ring-2 focus:ring-[#F7C8E0]/20 outline-none font-medium text-gray-700 max-w-xs"
                  >
                    <option value="Todos">Todas as pacientes</option>
                    {alphabet.map((letter) => {
                      const count = filteredPatients.filter(p => p.name.charAt(0).toUpperCase() === letter).length;
                      return (
                        <option 
                          key={letter} 
                          value={letter}
                          disabled={count === 0}
                        >
                          {letter} {count > 0 ? `(${count})` : ''}
                        </option>
                      );
                    })}
                  </select>
                  
                  {selectedLetter !== 'Todos' && (
                    <button
                      onClick={() => setSelectedLetter('Todos')}
                      className="text-sm text-[#F7C8E0] hover:text-[#D9C2F0] font-medium transition-colors"
                    >
                      Limpar filtro
                    </button>
                  )}
                </div>
              </div>

              {/* Results count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {letterFilteredPatients.length} {letterFilteredPatients.length === 1 ? 'paciente encontrada' : 'pacientes encontradas'}
                  {selectedLetter !== 'Todos' && (
                    <span className="font-semibold text-[#F7C8E0]"> • Letra {selectedLetter}</span>
                  )}
                </p>
              </div>

              {/* Patient Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {letterFilteredPatients.map((patient) => (
                  <motion.button
                    key={patient.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPatient(patient)}
                    className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      {/* Avatar */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-sm flex-shrink-0"
                        style={{ backgroundColor: getAvatarColor(patient.name) }}
                      >
                        {getInitials(patient.name)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-800 mb-1 truncate">
                            {patient.name}
                          </h3>
                          {patient.alerts > 0 && (
                            <Badge className="bg-red-100 text-red-600 border-0 ml-2 flex-shrink-0">
                              {patient.alerts}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{patient.age} anos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Calendar size={12} />
                      <span>{patient.lastActivity}</span>
                    </div>
                    
                    {patient.clinicalActive && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#CDE7BE]/10 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-[#CDE7BE]" />
                        <span className="text-xs text-gray-700 font-medium">Clinical Ativo</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Agenda
                </h2>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">Consultas Hoje</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">Esta Semana</p>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">Pendentes</p>
                    <p className="text-2xl font-bold text-gray-800">2</p>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-4">Próximas Consultas</h3>
                  <div className="space-y-3">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center text-white text-sm font-semibold">
                          {getInitials(apt.patient)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{apt.patient}</p>
                          <p className="text-sm text-gray-500">{apt.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{apt.date.split('-').reverse().join('/')}</p>
                          <p className="font-medium text-[#F7C8E0]">{apt.time}</p>
                        </div>
                        <Badge className={`${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border-0`}>
                          {apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Mensagens
                </h2>
                
                {/* Messages List */}
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      className="w-full flex items-start gap-4 p-6 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D9C2F0] to-[#BFD7ED] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {getInitials(msg.patient)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-800">{msg.patient}</p>
                          <span className="text-sm text-gray-400">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                      </div>
                      {msg.unread && (
                        <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Receitas Enviadas
                </h2>
                
                {/* Prescriptions List */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="space-y-3">
                    {recentPrescriptions.map((rx) => (
                      <div key={rx.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D9C2F0] to-[#BFD7ED] flex items-center justify-center flex-shrink-0">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{rx.patient}</p>
                          <p className="text-sm text-gray-600">{rx.medication}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{rx.date}</p>
                          <Badge className={`${
                            rx.type === 'simple' ? 'bg-blue-100 text-blue-700' : 
                            rx.type === 'controlled' ? 'bg-orange-100 text-orange-700' : 
                            'bg-purple-100 text-purple-700'
                          } border-0`}>
                            {rx.type === 'simple' ? 'Simples' : rx.type === 'controlled' ? 'Controlado' : 'Antimicrobiano'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Exames Solicitados
                </h2>
                
                {/* Exams List */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="space-y-3">
                    {recentExams.map((exam) => (
                      <div key={exam.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CDE7BE] to-[#BFD7ED] flex items-center justify-center flex-shrink-0">
                          <TestTube size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{exam.patient}</p>
                          <p className="text-sm text-gray-600">{exam.exam}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{exam.date}</p>
                          <Badge className={`${
                            exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          } border-0`}>
                            {exam.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Relatórios e Estatísticas
                </h2>
                <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
                  Relatórios médicos em desenvolvimento
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Código de Vínculo
                </h2>
                <p className="text-gray-600 mb-8">
                  Compartilhe este código com suas pacientes para que elas possam vincular a conta delas com você.
                </p>

                <div className="bg-white rounded-2xl p-6 lg:p-8 text-center">
                  <p className="text-sm text-gray-600 mb-4">Seu código único:</p>
                  <div className="inline-flex items-center justify-center px-6 lg:px-8 py-4 bg-gradient-to-r from-[#F7C8E0]/10 to-[#D9C2F0]/10 rounded-xl border-2 border-dashed border-[#F7C8E0]/30 mb-6">
                    <span className="text-2xl lg:text-3xl font-bold font-mono text-[#F7C8E0]">
                      DRA-ALINE-2024
                    </span>
                  </div>
                  <Button className="w-full lg:w-auto bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white hover:opacity-90">
                    Copiar código
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Configurações
                </h2>
                <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
                  Configurações da conta em desenvolvimento
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Central de Ajuda
                </h2>
                <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
                  FAQ e suporte em desenvolvimento
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <PatientDetailModal
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
            onOpenActionSheet={() => setShowActionSheet(true)}
            actions={actions}
          />
        )}
      </AnimatePresence>

      {/* Action Modals */}
      <ActionModals
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        message={message}
        setMessage={setMessage}
        showNoteModal={showNoteModal}
        setShowNoteModal={setShowNoteModal}
        note={note}
        setNote={setNote}
        showExamsModal={showExamsModal}
        setShowExamsModal={setShowExamsModal}
        showCarePlanModal={showCarePlanModal}
        setShowCarePlanModal={setShowCarePlanModal}
        selectedPatientName={selectedPatient?.name}
      />
    </div>
  );
};