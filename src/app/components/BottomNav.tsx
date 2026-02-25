import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Moon, ListTodo, MessageCircle, User } from 'lucide-react';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Moon, label: 'Ciclo', path: '/cycle' },
    { icon: ListTodo, label: 'Rotina', path: '/routine' },
    { icon: MessageCircle, label: 'Mensagens', path: '/messages' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-14 landscape:h-11 max-w-md mx-auto px-2"
           style={{
             paddingLeft:  'max(0.5rem, env(safe-area-inset-left,  0.5rem))',
             paddingRight: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))',
           }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-colors flex-1 ${
                isActive
                  ? 'text-[#D9A8C7]'
                  : 'text-gray-400 active:bg-gray-100'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] landscape:hidden">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

