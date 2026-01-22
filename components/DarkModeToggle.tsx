import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-[#E6E6E6] dark:hover:bg-[#2A2A2A] transition-colors"
      aria-label="Toggle dark mode"
      type="button"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#EFEFEF]" />
      ) : (
        <Moon className="w-5 h-5 text-[#111111]" />
      )}
    </button>
  );
};
