'use client';

import { motion } from 'motion/react';
import { springSnappy } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export function TabBar({ tabs, activeIndex, onTabChange }: TabBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onTabChange(Math.min(index + 1, tabs.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onTabChange(Math.max(index - 1, 0));
    }
  };

  return (
    <div
      className="flex border-b border-[var(--border)] sticky top-0 z-10 bg-[var(--bg-primary)]/90 backdrop-blur-xl"
      role="tablist"
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          role="tab"
          aria-selected={i === activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          className={cn(
            'relative flex-1 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]',
            i === activeIndex
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-secondary)]'
          )}
          onClick={() => onTabChange(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        >
          {tab}
          {i === activeIndex && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
              layoutId="tab-indicator"
              transition={springSnappy}
            />
          )}
        </button>
      ))}
    </div>
  );
}
