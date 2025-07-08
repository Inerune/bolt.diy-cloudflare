import { useStore } from '@nanostores/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Tooltip } from '~/components/ui/Tooltip';
import { useEditChatDescription } from '~/lib/hooks';
import { description as descriptionStore } from '~/lib/persistence';


import pencilLine from '../../../icons/pencil-line.svg'

export function ChatDescription() {
  const initialDescription = useStore(descriptionStore)!;

  const { editing, handleChange, handleBlur, handleSubmit, handleKeyDown, currentDescription, toggleEditMode } =
    useEditChatDescription({
      initialDescription,
      syncWithGlobalStore: true,
    });

  if (!initialDescription) {
    // doing this to prevent showing edit button until chat description is set
    return null;
  }

  return (
    <div className="flex items-center justify-center font-[sf-regular] text-[14px] ">
      {editing ? (
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <input
            type="text"
            className="bg-bolt-elements-background-depth-1  text-bolt-elements-textPrimary rounded px-2 mr-2 w-fit"
            autoFocus
            value={currentDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{ width: `${Math.max(currentDescription.length * 8, 100)}px` }}
          />
            <Tooltip content="Save title">
              <div className="flex justify-between items-center p-2 rounded-md bg-bolt-elements-item-backgroundAccent">
                <button
                  type="submit"
                  className="i-ph:check-bold scale-110 hover:text-bolt-elements-item-contentAccent"
                  onMouseDown={handleSubmit}
                />
              </div>
            </Tooltip>
        </form>
      ) : (
        <>
          {currentDescription}
            <Tooltip content="Rename chat">
              <div className="flex justify-between items-center px-2 py-1 rounded-md bg-bolt-elements-item-backgroundAccent ml-2">
                <img src={pencilLine} alt="" className='invert-100 dark:invert-0 scale-110 hover:text-bolt-elements-item-contentAccent' onClick={(event) => {
                    event.preventDefault();
                    toggleEditMode();
                  }} />
              </div>
            </Tooltip>
        </>
      )}
    </div>
  );
}
