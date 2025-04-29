"use client"
import { useEffect } from 'react';

export function useCommandMenuToggle(onToggle: () => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'k') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        onToggle();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);
}
