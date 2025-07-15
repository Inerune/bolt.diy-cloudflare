import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { Button } from '../ui/moving-border';
import { useSession } from "@/lib/auth-client";
import userIcon from '../../../icons/user-6-line.svg';

interface headerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ setOpen }: headerProps) {
  const chat = useStore(chatStore);
  const { data } = useSession();

  return (
    <header
      className={classNames('flex justify-between items-center px-2.5 pt-2.8 bg-[#E7E2E0]  dark:bg-[#292f35]', {
        'border-transparent': !chat.started,
        '': chat.started,
      })}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        {/* {!chat.started && <div className="i-ph:sidebar-simple-duotone text-xl" />} */}
        <a href="/" className="text-accent text-center flex items-center">
          {/* <span className="i-bolt:logo-text?mask w-[46px] inline-block" /> */}
          {/* <img src="/logo-light-styled.png" alt="logo" className="w-[90px] inline-block dark:hidden" />
          <img src="/logo-dark-styled.png" alt="logo" className="w-[90px] inline-block hidden dark:block" /> */}
          <h3 className='text-[18px] font-[franie-regular]'>askblake.</h3>
        </a>
      </div>
      {data && data.user ? (
        <>
          <div className='text-sm text-white flex items-center gap-1'>
            {data?.user?.image && (
              <img
                src={data.user.image ?? undefined}
                alt="User Avatar"
                className="h-5 w-5 rounded-full border border-white object-cover"
              />
            )}
            Hello, {data.user.name}
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
