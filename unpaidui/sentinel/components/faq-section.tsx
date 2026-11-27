"use client";

import { useState } from "react";
import Link from "next/link";
import { CornerPlus } from "./corner-plus";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly is Sentinel?",
    answer:
      "Sentinel is a unified security platform that collapses detection, response, and governance into one system of record. Every alert, log, and identity event flows into a single correlated graph, so your team acts on real threats instead of stitching together a dozen consoles.",
  },
  {
    question: "Which environments and clouds does Sentinel cover?",
    answer:
      "Sentinel runs across AWS, GCP, Azure, Kubernetes, and on-prem workloads from a single control plane. Agentless connectors cover most sources in minutes, while a lightweight collector handles anything that lives behind your firewall.",
  },
  {
    question: "How does Sentinel handle data security and compliance?",
    answer:
      "Data is encrypted in transit and at rest with hardware-backed keys, and every action is written to an immutable audit trail. Sentinel is SOC 2 Type II and ISO 27001 certified, with regional data residency available for GDPR and HIPAA programs.",
  },
  {
    question: "How long does it take to deploy?",
    answer:
      "Most teams are ingesting signal on day one. Connect your first sources through the guided setup, and Sentinel begins correlating events immediately — no professional-services engagement or multi-quarter rollout required.",
  },
  {
    question: "Will it integrate with our existing stack?",
    answer:
      "Yes. Sentinel ships with native integrations for the common SIEMs, identity providers, ticketing tools, and chat platforms, plus a full REST API and webhooks so you can wire automated playbooks into whatever you already run.",
  },
  {
    question: "How is access controlled and audited?",
    answer:
      "Granular role-based access, SSO, and SCIM provisioning keep permissions tight, while every login and change is logged and exportable. Automated playbooks can revoke access the instant a risky pattern is detected.",
  },
  {
    question: "Can Sentinel be self-hosted?",
    answer:
      "Teams with strict data-control requirements can run Sentinel entirely within their own VPC or private cloud. You keep full ownership of the data plane while still receiving managed updates to the detection engine.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="relative grid border-y border-border lg:grid-cols-[0.85fr_1.15fr]">
        <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        <div className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-16 lg:pr-12">
          <h2 className="text-balance font-serif text-4xl font-normal leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]">
            Frequently asked questions
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            Everything you need to know about deploying Sentinel. Can&apos;t find an answer? Our security
            team is one message away.
          </p>

          <div className="mt-8">
            <span
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex h-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
            >
              <Link
                href="#contact"
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
              >
                Talk to our team
              </Link>
            </span>
          </div>
        </div>

        <div className="py-6 lg:py-12 lg:pl-12">
          <div className="divide-y divide-border/60">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="focus-ring flex w-full items-center justify-between text-left py-2 text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-lg"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-foreground" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
