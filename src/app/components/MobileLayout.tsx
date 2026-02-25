import React from 'react';

/**
 * Mobile-first layout shell.
 * – On phones: full screen, edge-to-edge
 * – On tablets/desktop: centered phone-sized frame so the app always looks like a mobile app
 */
interface MobileLayoutProps {
  children: React.ReactNode;
  /** Set true for pages that have their own scroll control */
  noScroll?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, noScroll }) => {
  return (
    /* Outer — dark backdrop on large screens */
    <div className="flex items-center justify-center min-h-screen bg-gray-900 sm:bg-gray-200">
      {/* Inner — phone frame */}
      <div
        className="relative w-full bg-white overflow-hidden
                   sm:w-[390px] sm:max-h-[844px] sm:rounded-[2.5rem] sm:shadow-2xl sm:overflow-auto"
        style={{
          /* Full height on real mobile, capped on desktop */
          height: '100dvh',
        }}
      >
        <div
          className={`w-full h-full ${noScroll ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
