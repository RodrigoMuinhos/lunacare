import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Moon, ListTodo, MessageCircle, User, Sparkles } from 'lucide-react';

const navItems = [
  { icon: Home,          label: 'Home',      path: '/dashboard' },
  { icon: Moon,          label: 'Ciclo',     path: '/cycle' },
  { icon: ListTodo,      label: 'Rotina',    path: '/routine' },
  { icon: MessageCircle, label: 'Mensagens', path: '/messages' },
  { icon: User,          label: 'Perfil',    path: '/profile' },
];

export const BottomNav = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <>
      {/* ── DESKTOP SIDEBAR (lg+) ───────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-60 bg-white border-r border-gray-100 shadow-sm z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-7 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F7C8E0] to-[#D9C2F0] flex items-center justify-center shadow-sm">
            <Moon size={18} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-display font-semibold bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] bg-clip-text text-transparent">
            LunaCare
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon    = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-gradient-to-r from-[#F7C8E0]/20 to-[#D9C2F0]/10 text-[#C9A0BC]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F7C8E0]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer CTA */}
        <div className="px-4 py-5 border-t border-gray-100">
          <button
            onClick={() => navigate('/pricing')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#F7C8E0]/15 to-[#D9C2F0]/10 hover:from-[#F7C8E0]/25 hover:to-[#D9C2F0]/20 text-[#C9A0BC] text-sm font-medium transition-all"
          >
            <Sparkles size={17} />
            Upgrade para Clinical
          </button>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV (< lg) ────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div
          className="flex justify-around items-center h-14"
          style={{
            paddingLeft:  'max(0.5rem, env(safe-area-inset-left,  0.5rem))',
            paddingRight: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))',
          }}
        >
          {navItems.map((item) => {
            const Icon    = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-colors flex-1 ${
                  isActive ? 'text-[#D9A8C7]' : 'text-gray-400 active:bg-gray-100'
                }`}
                style={{ minHeight: '44px' }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] landscape:hidden">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};


