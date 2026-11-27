import { CornerPlus } from "./corner-plus";
import { UsersRound } from "lucide-react";

export function LogoTicker() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-10">
      <div className="relative border border-border">
        <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        <div className="flex flex-col items-stretch md:flex-row">
          <div className="flex shrink-0 items-center justify-center border-b border-border px-6 py-5 md:border-b-0 md:border-r md:py-7">
            <span className="text-xs font-medium text-muted-foreground">
              Protecting industry leaders
            </span>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-evenly gap-x-8 gap-y-6 px-8 py-7">
            <span
              role="img"
              aria-label="Stripe"
              style={{
                width: "53px",
                height: "22px",
                mask: "url(/logos/stripe_wordmark.svg) center / contain no-repeat",
                WebkitMask: "url(/logos/stripe_wordmark.svg) center / contain no-repeat",
              }}
              className="block bg-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
            <span
              role="img"
              aria-label="Dropbox"
              style={{
                width: "96px",
                height: "26px",
                mask: "url(/logos/dropbox_wordmark.svg) center / contain no-repeat",
                WebkitMask: "url(/logos/dropbox_wordmark.svg) center / contain no-repeat",
              }}
              className="block bg-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
            <span
              role="img"
              aria-label="Spotify"
              style={{
                width: "73px",
                height: "22px",
                mask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
                WebkitMask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
              }}
              className="block bg-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
            <span
              role="img"
              aria-label="Anthropic"
              style={{
                width: "99px",
                height: "13px",
                mask: "url(/logos/anthropic_black_wordmark.svg) center / contain no-repeat",
                WebkitMask: "url(/logos/anthropic_black_wordmark.svg) center / contain no-repeat",
              }}
              className="block bg-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
            <span
              role="img"
              aria-label="Vercel"
              style={{
                width: "86px",
                height: "17px",
                mask: "url(/logos/vercel_wordmark.svg) center / contain no-repeat",
                WebkitMask: "url(/logos/vercel_wordmark.svg) center / contain no-repeat",
              }}
              className="block bg-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-2 border-t border-border px-6 py-5 text-muted-foreground md:border-l md:border-t-0 md:py-7">
            <UsersRound className="h-4 w-4" />
            <span className="text-xs font-medium">And 10,000+ more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
