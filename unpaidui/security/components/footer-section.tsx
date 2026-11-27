import Link from "next/link";
import { CornerPlus } from "./corner-plus";

export function FooterSection() {
  const chamferLarge = {
    clipPath:
      "polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)",
  };

  return (
    <footer className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-10">
      <div className="bg-border p-px" style={chamferLarge}>
        <div className="bg-background p-8 sm:p-10 lg:p-14" style={chamferLarge}>
          <Link
            href="#top"
            className="focus-ring group inline-flex items-center gap-2.5"
            aria-label="Sentinel home"
          >
            <span
              className="h-7 w-7 bg-foreground transition-transform duration-300 group-hover:rotate-3 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
              aria-hidden="true"
            />
            <span className="text-[17px] font-semibold tracking-tight">Sentinel</span>
          </Link>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-x-0">
            <div className="relative md:px-8 md:pl-0">
              <h3 className="text-sm font-semibold tracking-tight">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#platform"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#customers"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#integrations"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative md:px-8 md:border-l md:border-border">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 md:block" />

              <h3 className="text-sm font-semibold tracking-tight">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#docs"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#developers"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Developers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#changelog"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#status"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative md:px-8 md:border-l md:border-border">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 md:block" />

              <h3 className="text-sm font-semibold tracking-tight">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#privacy"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#terms"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative md:px-8 md:border-l md:border-border">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 md:block" />

              <h3 className="text-sm font-semibold tracking-tight">Connect</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#contact"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact Sales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Sentinel. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
