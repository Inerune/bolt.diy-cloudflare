// components/ui/Dropdown.tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { type ReactNode } from 'react';
import { classNames } from '~/utils/classNames';

/* ------------------------------------------------------------------ */
/* ⬤  Item & Separator helpers -------------------------------------- */
/* ------------------------------------------------------------------ */

interface DropdownItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
}

export const DropdownItem = ({
  children,
  onSelect,
  className,
}: DropdownItemProps) => (
  <DropdownMenu.Item
    className={classNames(
      'relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
      'text-bolt-elements-textPrimary hover:text-bolt-elements-textPrimary',
      'dark:hover:bg-[#373f47] hover:bg-[#ddd8d4]',
      'transition-colors cursor-pointer',
      'outline-none',
      className,
    )}
    onSelect={onSelect}
  >
    {children}
  </DropdownMenu.Item>
);

export const DropdownSeparator = () => (
  <DropdownMenu.Separator className="h-px bg-bolt-elements-borderColor my-1" />
);

/* ------------------------------------------------------------------ */
/* ⬤  Root wrapper --------------------------------------------------- */
/* ------------------------------------------------------------------ */

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;

  /* NEW: controlled‐open API -------------------------------------- */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown = ({
  trigger,
  children,
  align = 'end',
  sideOffset = 5,
  open,
  onOpenChange,
}: DropdownProps) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      {/* trigger */}
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      {/* popover */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={classNames(
            'min-w-[220px] rounded-lg p-2',
            'dark:bg-[#292F35] bg-[#EFEAE6]',
            'border border-bolt-elements-borderColor',
            'shadow-lg',
            'animate-in fade-in-80 zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'z-[1000]',
          )}
          sideOffset={sideOffset}
          align={align}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
