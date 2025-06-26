"use client";

import * as React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils"; // Optional utility for class merging

interface HoverEffectDivProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number;
}

const HoverEffectDiv = React.forwardRef<HTMLDivElement, HoverEffectDivProps>(
  ({ className, children, radius = 100, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    }

    const background = useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        #B15ACD,
        transparent 80%
      )
    `;

    return (
      <motion.div
        ref={ref}
        drag={(e) => console.log(e)}
        style={{ background }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cn(
          "rounded-lg p-[2px] transition duration-300",
          className
        )}
        {...props}
      >
        <div className="w-full rounded-lg bg-white dark:bg-[#171717]">
          {children}
        </div>
      </motion.div>
    );
  }
);

HoverEffectDiv.displayName = "HoverEffectDiv";

export { HoverEffectDiv };