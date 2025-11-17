"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef, forwardRef, useState } from "react";

interface AuroraBackgroundProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  children: ReactNode;
  showRadialGradient?: boolean;
  isDark?: boolean;
}

export const AuroraBackground = forwardRef<HTMLDivElement, AuroraBackgroundProps>(({
  className,
  children,
  showRadialGradient = true,
  isDark = false,
  ...props
}, forwardedRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Merge refs
  useEffect(() => {
    const node = internalRef.current;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [forwardedRef]);

  // Track when element becomes visible
  useEffect(() => {
    if (!internalRef.current || hasBeenVisible) return;

    const checkVisibility = () => {
      if (internalRef.current) {
        const computedStyle = window.getComputedStyle(internalRef.current);
        const opacity = parseFloat(computedStyle.opacity);

        // If opacity is greater than 0.5, element has been shown
        if (opacity > 0.5) {
          setHasBeenVisible(true);
        }
      }
    };

    // Check immediately and set up interval to detect when intersection observer makes it visible
    checkVisibility();
    const interval = setInterval(checkVisibility, 100);

    return () => clearInterval(interval);
  }, [hasBeenVisible]);

  // Force repaint when theme changes while preserving visibility
  useEffect(() => {
    if (internalRef.current && hasBeenVisible) {
      // Remove opacity-0 class permanently once element has been visible
      internalRef.current.classList.remove('opacity-0');

      // Force the element to be fully visible with !important to override any classes
      internalRef.current.style.setProperty('opacity', '1', 'important');

      // Trigger reflow/repaint to force browser to recalculate gradients
      internalRef.current.style.transform = 'translateZ(0)';
      void internalRef.current.offsetHeight; // Force reflow
      internalRef.current.style.transform = '';

      // Clean up inline style after repaint
      requestAnimationFrame(() => {
        if (internalRef.current) {
          internalRef.current.style.removeProperty('opacity');
        }
      });
    }
  }, [isDark, hasBeenVisible]);

  return (
    <div
      ref={internalRef}
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center transition-colors",
        isDark ? "bg-zinc-900 text-white" : "bg-zinc-50 text-slate-950",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          //   I'm sorry but this is what peak developer performance looks like // trigger warning
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0
            after:[background-size:200%,_100%]
            after:[animation:aurora_60s_linear_infinite] after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            isDark
              ? `[background-image:var(--dark-gradient),var(--aurora)] after:[background-image:var(--dark-gradient),var(--aurora)]`
              : `[background-image:var(--white-gradient),var(--aurora)] invert after:[background-image:var(--white-gradient),var(--aurora)]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
});

AuroraBackground.displayName = "AuroraBackground";
