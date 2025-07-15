import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { Button } from '../ui/moving-border';
import userIcon from '../../../icons/user-6-line.svg';
import { useEffect, useState } from 'react';

interface headerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Header({ setOpen, dataAuth }: headerProps) {
  const chat = useStore(chatStore);
  return (
    <header
      className={classNames('flex justify-between items-center px-2.5 pt-2.8 bg-[#E7E2E0]  dark:bg-[#292f35]', {
        'border-transparent': !chat.started,
        '': chat.started,
      })}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <a href="/" className="text-accent text-center flex items-center">
          <h3 className='text-[18px] font-[franie-regular]'>askblake.</h3>
        </a>
      </div>
      {dataAuth && dataAuth.user ? (
        <>
          <div className='text-sm text-white flex items-center gap-1'>
            {dataAuth?.user?.image && (
              <img
                src={dataAuth.user.image ?? undefined}
                alt="User Avatar"
                className="h-4 w-4 rounded-full border border-white object-cover"
              />
            )}
            Hello, {dataAuth.user.name}
          </div>
        </>
      ) : (
        <>
          <div className="text-white mb-1" onClick={() => setOpen(true)}>
            <Button>Sign up / Login</Button>
          </div>
        </>
      )}


    </header>
  );
}
