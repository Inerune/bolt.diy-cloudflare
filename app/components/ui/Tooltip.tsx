import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement } from 'react';
import { classNames } from '~/utils/classNames';

// Original WithTooltip component
interface WithTooltipProps {
  tooltip: React.ReactNode;
  children: ReactElement;
  sideOffset?: number;
  className?: string;
  arrowClassName?: string;
  tooltipStyle?: React.CSSProperties;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  delay?: number;
}

const WithTooltip = forwardRef(
  (
    {
      tooltip,
      children,
      sideOffset = 5,
      className = '',
      arrowClassName = '',
      tooltipStyle = {},
      position = 'top',
      maxWidth = 250,
      delay = 0,
    }: WithTooltipProps,
    _ref: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root delayDuration={delay}>
          <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side={position}
              className={`
                z-[2000]
                px-2.5
                py-1.5
                max-h-[300px]
                select-none
                rounded-md
                bg-bolt-elements-background-depth-3
                text-bolt-elements-textPrimary
                text-sm
                leading-tight
                shadow-lg
                animate-in
                fade-in-0
                zoom-in-95
                data-[state=closed]:animate-out
                data-[state=closed]:fade-out-0
                data-[state=closed]:zoom-out-95
                ${className}
              `}
              sideOffset={sideOffset}
              style={{
                maxWidth,
                ...tooltipStyle,
              }}
            >
              <div className="break-words">{tooltip}</div>
              <TooltipPrimitive.Arrow
                className={`
                  fill-bolt-elements-background-depth-3
                  ${arrowClassName}
                `}
                width={12}
                height={6}
              />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);

// New Tooltip component with simpler API
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  className,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
  side={side}
  align={align}
  className={classNames(
    'z-50 overflow-hidden rounded-md bg-[#1D2125] dark:bg-[#EFEAE6] px-3 py-1.5 text-xs text-white dark:text-black shadow-md',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:scale-in-100',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:scale-out-95',
    'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
    className,
  )}
  sideOffset={5}
>
          {content}
          <TooltipPrimitive.Arrow className="fill-[#1D2125] dark:fill-[#EFEAE6]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export default WithTooltip;
