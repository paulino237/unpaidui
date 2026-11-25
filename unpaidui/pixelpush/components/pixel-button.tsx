import React from "react";

export const PIXEL_CLIP =
  "polygon(8px 0, calc(100% - 8px) 0, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0 calc(100% - 8px), 0 8px, 4px 8px, 4px 4px, 8px 4px)";

const sizeClasses = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export interface PixelButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "inverse";
  size?: "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  className?: string;
}

export function PixelButton({
  children,
  variant = "solid",
  size = "md",
  href,
  onClick,
  type = "button",
  ariaLabel,
  className = "",
}: PixelButtonProps) {
  const rootClasses = [
    "group focus-ring relative inline-flex select-none items-center justify-center whitespace-nowrap transition-colors",
    sizeClasses[size],
    variant === "solid"
      ? "text-background font-semibold"
      : variant === "inverse"
        ? "text-foreground font-semibold"
        : "text-foreground font-medium",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const bgElement =
    variant === "solid" ? (
      <span
        aria-hidden="true"
        className="bg-foreground group-hover:bg-foreground/90 absolute inset-0 transition-colors"
        style={{ clipPath: PIXEL_CLIP, WebkitClipPath: PIXEL_CLIP }}
      />
    ) : variant === "inverse" ? (
      <span
        aria-hidden="true"
        className="bg-background group-hover:bg-muted absolute inset-0 transition-colors"
        style={{ clipPath: PIXEL_CLIP, WebkitClipPath: PIXEL_CLIP }}
      />
    ) : (
      <>
        <span
          aria-hidden="true"
          className="bg-border absolute inset-0"
          style={{ clipPath: PIXEL_CLIP, WebkitClipPath: PIXEL_CLIP }}
        />
        <span
          aria-hidden="true"
          className="bg-background group-hover:bg-muted absolute inset-[1px] transition-colors"
          style={{ clipPath: PIXEL_CLIP, WebkitClipPath: PIXEL_CLIP }}
        />
      </>
    );

  const content = (
    <>
      {bgElement}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={rootClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={rootClasses}
    >
      {content}
    </button>
  );
}
