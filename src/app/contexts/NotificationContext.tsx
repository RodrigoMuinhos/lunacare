import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bell, Droplets, Wind, Heart, Sparkles, Sun, Pill } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'motivational' | 'medication' | 'hydration' | 'wellness';
  title: string;
  message: string;
  icon: any;
  color: string;
  gradient: string;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const motivationalMessages = [
  {
    title: 'Hidratação',
    message: 'Beba água! Seu corpo agradece 💧',
    icon: Droplets,
    color: '#BFD7ED',
    gradient: 'from-[#BFD7ED] to-[#8FB9DB]',
    type: 'hydration' as const
  },
  {
    title: 'Respire',
    message: 'Pare e respire fundo. Você merece esse momento 🌬️',
    icon: Wind,
    color: '#D9C2F0',
    gradient: 'from-[#D9C2F0] to-[#B794E0]',
    type: 'wellness' as const
  },
  {
    title: 'Relaxe',
    message: 'Que tal relaxar um pouquinho? Você está fazendo ótimo! ✨',
    icon: Sparkles,
    color: '#F7C8E0',
    gradient: 'from-[#F7C8E0] to-[#F39CC8]',
    type: 'motivational' as const
  },
  {
    title: 'Autoestima',
    message: 'Você está linda! Continue brilhando 💖',
    icon: Heart,
    color: '#F7C8E0',
    gradient: 'from-[#F7C8E0] to-[#F39CC8]',
    type: 'motivational' as const
  },
  {
    title: 'Esperança',
    message: 'Amanhã o dia será mais alegre. Acredite! ☀️',
    icon: Sun,
    color: '#FFB347',
    gradient: 'from-[#FFB347] to-[#FF8C42]',
    type: 'motivational' as const
  },
  {
    title: 'Força',
    message: 'Você é mais forte do que imagina! Continue assim 💪',
    icon: Heart,
    color: '#CDE7BE',
    gradient: 'from-[#CDE7BE] to-[#A8D08D]',
    type: 'motivational' as const
  },
  {
    title: 'Cuidado',
    message: 'Cuide de você com o mesmo carinho que cuida dos outros 🌸',
    icon: Heart,
    color: '#F7C8E0',
    gradient: 'from-[#F7C8E0] to-[#F39CC8]',
    type: 'motivational' as const
  },
  {
    title: 'Gratidão',
    message: 'Que tal pensar em 3 coisas boas do seu dia? ✨',
    icon: Sparkles,
    color: '#D9C2F0',
    gradient: 'from-[#D9C2F0] to-[#B794E0]',
    type: 'motivational' as const
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Alerta motivacional automático após 20 segundos de uso
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      addNotification(randomMessage);
    }, 20000); // 20 segundos

    return () => clearTimeout(timer);
  }, []);

  // Verificar alertas de medicação a cada minuto
  useEffect(() => {
    const checkMedications = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

      // Buscar medicações do localStorage
      const storedMedications = localStorage.getItem('medications');
      if (storedMedications) {
        try {
          const medications = JSON.parse(storedMedications);
          
          medications.forEach((med: any) => {
            if (med.time === currentTime) {
              addNotification({
                type: 'medication',
                title: 'Hora da medicação!',
                message: `${med.name} - ${med.dosage}`,
                icon: Pill,
                color: '#F7C8E0',
                gradient: 'from-[#F7C8E0] to-[#F39CC8]'
              });
            }
          });
        } catch (error) {
          console.error('Error parsing medications:', error);
        }
      }
    };

    // Verificar imediatamente
    checkMedications();

    // Verificar a cada minuto
    const interval = setInterval(checkMedications, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
