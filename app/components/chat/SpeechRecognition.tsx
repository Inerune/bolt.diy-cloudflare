import { IconButton } from '~/components/ui/IconButton';
import { classNames } from '~/utils/classNames';
import micIcon from '../../../icons/mic-line.svg'
import { Tooltip } from '../ui/Tooltip';

export const SpeechRecognitionButton = ({
  isListening,
  onStart,
  onStop,
  disabled,
}: {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled: boolean;
}) => {
  return (
    <IconButton
      disabled={disabled}
      className={classNames('transition-all', {
        'text-bolt-elements-item-contentAccent': isListening,
      })}
      onClick={isListening ? onStop : onStart}
    >
      {isListening ? <div className="i-ph:microphone-slash text-xl" /> : 
    <Tooltip content="Record your prompt" side='bottom'><img src={micIcon}  className='invert-100 dark:invert-0' /></Tooltip> }
    </IconButton>
  );
};
