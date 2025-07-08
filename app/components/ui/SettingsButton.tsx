import { memo } from 'react';
import settingIcon from '../../../icons/settings-4-line.svg'


interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton = memo(({ onClick }: SettingsButtonProps) => {
  return (
    <>
    
    <img src={settingIcon} alt="" onClick={onClick} className='invert-90 dark:invert-0 cursor-pointer'/>
    </>
  );
});
