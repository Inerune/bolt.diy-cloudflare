import { json, type MetaFunction } from '@remix-run/cloudflare';
import { useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';
import { SettingsProvider } from '~/lib/context/SettingsContext';
import { SignInProvider } from '~/lib/context/SignInContext';
import FinalForm from '~/components/ui/FinalForm';

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


  return (
    <SettingsProvider>
      <div className="flex flex-col h-full w-full bg-[#E7E2E0] dark:bg-[#292F35] px-2.5 pb-2.5">
        <SignInProvider>
          <FinalForm />
          <BackgroundRays />
          <Header />
          <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
        </SignInProvider>
      </div>
    </SettingsProvider>
  );
}
