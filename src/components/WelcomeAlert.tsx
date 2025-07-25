
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomeAlert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('welcomeAlertShown');
    if (!hasBeenShown) {
      setIsOpen(true);
      sessionStorage.setItem('welcomeAlertShown', 'true');
    }
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/20 dark:border-black/20 shadow-xl rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black dark:text-white">{t('welcomeAlertTitle')}</AlertDialogTitle>
          <AlertDialogDescription className="text-black dark:text-white">
            {t('welcomeAlertDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <p className="text-sm text-black dark:text-white">
            {t('welcomeAlertNote')}
          </p>
        </div>
        <AlertDialogFooter className="flex items-center justify-between w-full">
            <LanguageToggle />
          <AlertDialogAction onClick={() => setIsOpen(false)}>{t('gotIt')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WelcomeAlert; 