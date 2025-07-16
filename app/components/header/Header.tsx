import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { Button } from '../ui/moving-border';
import userIcon from '../../../icons/user-6-line.svg';
import { useEffect } from 'react';
import { SettingsButton } from '../ui/SettingsButton';
import { profileStore, updateProfile, } from '~/lib/stores/profile';


interface headerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Header({ setOpen }: headerProps) {
  const chat = useStore(chatStore);
  const profile = useStore(profileStore);


  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`https://the-backend-production.up.railway.app/api/auth/get-session`, {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        updateProfile({
          username: userData.user.name,
          avatar: userData.user.image,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const printHello = () => {
    console.log("hello")
  }

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
      {profile?.username ? (
        <>
          <div className='text-sm text-white flex items-center gap-2'>
            <img
              src={profile.avatar || userIcon}
              alt="User Avatar"
              crossOrigin="anonymous"
              className="h-5 w-5 rounded-full border border-black dark:border-white object-cover"
            />
            <p className='text-[15px] dark:text-white text-black'>{profile.username}</p>
            <p className='w-[1px] h-3 bg-[#4B525B]'></p>
            <SettingsButton onClick={printHello}/>
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
