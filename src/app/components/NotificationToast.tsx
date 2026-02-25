import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useNotifications, Notification } from '../contexts/NotificationContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-20 left-0 right-0 z-[100] px-6 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification, index) => {
          const NotificationIcon = notification.icon;
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: index * 90, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto mb-3"
            >
              <div 
                className={`bg-white rounded-2xl shadow-2xl border-2 overflow-hidden max-w-md mx-auto`}
                style={{ borderColor: `${notification.color}40` }}
              >
                <div className={`h-1 bg-gradient-to-r ${notification.gradient}`} />
                
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 20 }}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${notification.gradient}`}
                    >
                      <NotificationIcon size={22} className="text-white" strokeWidth={2.5} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm mb-0.5">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeNotification(notification.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    className={`h-1 bg-gradient-to-r ${notification.gradient} rounded-full mt-3`}
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
