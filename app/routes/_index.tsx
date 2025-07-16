import { json, type MetaFunction } from '@remix-run/cloudflare';
import { useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

import { LoginForm } from '~/components/ui/login-form';
import { motion, AnimatePresence } from 'framer-motion';

export const meta: MetaFunction = () => {
  return [{ title: 'AskBlake' }, { name: 'description', content: 'Talk with askblake, an AI assistant' }];
};

export const loader = () => json({});

/**
 * Landing page component for Bolt
 * Note: Settings functionality should ONLY be accessed through the sidebar menu.
 * Do not add settings button/panel to this landing page as it was intentionally removed
 * to keep the UI clean and consistent with the design system.
 */
export default function Index() {

  const [isOpen, setOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#E7E2E0] dark:bg-[#292F35] px-2.5 pb-2.5">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            onClick={handleClickOutside}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#858382b3] dark:bg-[#1c1e22c4] items-center flex-col justify-center w-full h-screen absolute left-0 top-0 z-[999] flex"
          >
            <motion.h3
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-black dark:text-white text-3xl font-light mb-3"
            >
              askblake.
            </motion.h3>

            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[444px] bg-[#E7E2E0] dark:bg-[#252a30] p-4 rounded-lg border border-[#c2bdbb] dark:border-[#4b525b]"
            >
              <LoginForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundRays />
      <Header setOpen={setOpen} />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
