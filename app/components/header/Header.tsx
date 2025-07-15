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

interface Session {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
}

interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  // Add other user properties you need
}

interface AuthResponse {
  session: Session;
  user: User;
}

export function Header({ setOpen }: headerProps) {
  const chat = useStore(chatStore);
      const [data, setData] = useState()


   const checkAuthStatus = async () => {
        try {
            const response = await fetch(`https://the-backend-production.up.railway.app/api/auth/get-session`, {
                credentials: 'include' // Important for cookies
            });
            if (response.ok) {
                const userData = await response.json();
                setData(userData)
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);


    console.log(data)
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
      {data && data.user ? (
        <>
          <div className='text-sm text-white flex items-center gap-1'>
            {data?.user?.image && (
              <img
                src={data.user.image ?? undefined}
                alt="User Avatar"
                className="h-4 w-4 rounded-full border border-white object-cover"
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
