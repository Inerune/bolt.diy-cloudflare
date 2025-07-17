import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { Button } from '../ui/moving-border';
import userIcon from '../../../icons/user-6-line.svg';
import { useEffect, useRef, useState } from 'react';
import { SettingsButton } from '../ui/SettingsButton';
import { profileStore, updateProfile, } from '~/lib/stores/profile';
import { useSettingsContext } from '@/lib/context/SettingsContext';
import { useSignIn } from '~/lib/context/SignInContext';
import ineruneIcon from '../../../assets/icons/inerune.jpg'
import { motion } from 'framer-motion';
import { themeStore } from '~/lib/stores/theme';

import userIcon2 from '../../../icons/user-3-line.svg'
import settingIcon from '../../../icons/settings-4-line.svg'
import logoutIcon from '../../../icons/logout-teal.svg'
import logoutOrange from '../../../icons/logout-orange.svg'




export function Header() {
  const chat = useStore(chatStore);
  const profile = useStore(profileStore);
  const { setIsSettingsOpen } = useSettingsContext();
  const { openLogin } = useSignIn();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = useStore(themeStore);


  const checkAuthStatus = async () => {
    try {
      // const response = await fetch(`https://the-backend-production.up.railway.app/api/auth/get-session`, {
      const response = await fetch(`http://localhost:3000/api/auth/get-session`, {
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


  // for logout

  const logoutRoute = async () => {
    try {
      // const response = await fetch(`https://the-backend-production.up.railway.app/api/auth/sign-out`, {
      const response = await fetch(`http://localhost:3000/api/auth/sign-out`, {
        credentials: 'include',
        method: "POST"
      });

      if (response.ok) {
        updateProfile({
          username: '',
          avatar: '',
          bio: '',
        });
      }
    } catch (error) {
      console.error('Sign-Out failed:', error);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={classNames(`flex justify-between items-center ${chat.started ? 'px-2.5' : 'pl-2.5 pr-0'}  pt-2.8 bg-[#E7E2E0]  dark:bg-[#292f35]`, {
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
          <div ref={dropdownRef} className='relative'>

            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='  text-sm text-white flex items-center dark:bg-[#292F35] justify-center gap-3 border border-[#c9c5c3] dark:hover:bg-[#363c44] dark:border-[#4B525B] w-[158px] py-1.2 mb-1 rounded-md cursor-pointer'>
              <img
                src={ineruneIcon || userIcon}
                alt="User Avatar"
                crossOrigin="anonymous"
                className="h-5 w-5 rounded-full object-cover"
              />
              <p className='text-[15px] dark:text-white text-black'>{profile.username}</p>
              <p className='w-[1px] h-3 bg-[#4B525B]'></p>
              {/* <SettingsButton onClick={() => setIsSettingsOpen(true)}/> */}
              <div
                className={classNames('i-ph:caret-down text-black dark:text-white w-4 h-4 transition-transform', isDropdownOpen ? 'rotate-180' : '')}
              />
            </div>

            {/* dropdown */}
            {isDropdownOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }} className="absolute right-0 flex flex-col gap-1 z-50 p-1 mt-1 min-w-[9.5rem] dark:bg-[#292e35] rounded-md bg-[#fff] shadow-lg bg-bolt-elements-backgroundDefault border border-bolt-elements-borderColor">
                <div
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive gap-1 rounded-md group relative cursor-pointer"
                >
                  <img
                    className="w-5 h-5 invert-100 dark:invert-0"
                    height="24"
                    width="24"
                    crossOrigin="anonymous"
                    src={userIcon2}
                  />
                  <span className="ml-1">
                    Edit Profile
                  </span>
                </div>
                <div
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-start w-full px-4 py-2 text-sm text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive gap-1 rounded-md group relative cursor-pointer"
                >
                  <img
                    className="w-5 h-5 invert-100 dark:invert-0"
                    height="24"
                    width="24"
                    crossOrigin="anonymous"
                    src={settingIcon}
                    alt="settings"
                  />
                  <span className="ml-1">Settings</span>
                </div>
                <div
                  onClick={() => {
                    logoutRoute(),
                      setIsDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive gap-1 rounded-md group relative cursor-pointer"
                >
                  <img
                    className="w-5 h-5"
                    height="24"
                    width="24"
                    crossOrigin="anonymous"
                    src={theme === 'dark' ? logoutIcon : logoutOrange}
                  />
                  <span className="ml-1 text-orange-400 dark:text-teal-400">Log Out</span>
                </div>
              </motion.div>
            )}

          </div>
        </>
      ) : (
        <>
          <div className="text-white mb-1" onClick={() => openLogin(true)}>
            <Button>Sign up / Login</Button>
          </div>
        </>
      )}


    </header>
  );
}
