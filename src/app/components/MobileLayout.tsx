import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
  noScroll?: boolean;
}

/**
 * Responsive layout shell.
 * – Mobile  (< lg): full-screen, edge-to-edge, bottom nav
 * – Desktop (≥ lg): full-width, sidebar nav on left, scrollable content area
 */
export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, noScroll }) => {
  return (
    <div
      className={`min-h-screen w-full bg-white ${noScroll ? 'overflow-hidden' : ''}`}
      style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

