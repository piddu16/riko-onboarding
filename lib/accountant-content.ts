import type { AccountantIntent } from "./onboarding-store";

export const ACC_INTENT_LABEL: Record<AccountantIntent, string> = {
  reconciliation: "Bank & cash reconciliation eats my day",
  chasing: "Chasing owners for approvals and missing info",
  monthend: "Month-end closes always slip by 2-3 days",
  gst_prep: "GST return prep every month",
  mis_requests: "Last-minute MIS requests from owners / lenders",
  invoice_entry: "Manual invoice and voucher data entry",
};

export const ACC_INTENT_VERB: Record<AccountantIntent, string> = {
  reconciliation: "finishing bank reconciliation in minutes",
  chasing: "cutting owner-chase time",
  monthend: "closing month-end on day one",
  gst_prep: "pre-filing GST without firefighting",
  mis_requests: "turning MIS around in 2 minutes",
  invoice_entry: "eliminating manual voucher entry",
};

export const ACC_STAT: Record<AccountantIntent, { big: string; line: string }> = {
  reconciliation: {
    big: "4 hrs/day",
    line: "is what a typical in-house accountant spends on bank and cash reconciliation across a 3-entity book. Riko closes it in 12 minutes.",
  },
  chasing: {
    big: "32 hrs/mo",
    line: "is what Indian accountants spend chasing owners for missing bills, approvals, and notes. Riko automates 80% of it.",
  },
  monthend: {
    big: "3 days",
    line: "is the average slip at month-end — closes that were supposed to wrap on day one. Riko compresses the same workload to 6 hours.",
  },
  gst_prep: {
    big: "27 hrs/mo",
    line: "goes into GSTR prep across clients. Riko's GSTR-2B matching runs in 4 minutes per book and flags mismatches before you file.",
  },
  mis_requests: {
    big: "12 MIS PDFs",
    line: "is a typical month-end backlog waiting on you. Riko writes any MIS in 2 minutes — before the owner finishes their question.",
  },
  invoice_entry: {
    big: "400 entries/day",
    line: "is peak manual data entry at a busy small firm. Riko reads every invoice photo or PDF and files it to the right party in 30 seconds.",
  },
};

export type Benefit = { title: string; body: string };

export const ACC_BENEFIT: Record<AccountantIntent, Benefit> = {
  reconciliation: {
    title: "Bank & cash reconciliation in 12 minutes",
    body: "Riko matches bank statements against Tally ledgers automatically. You review and approve — no more line-by-line ticking.",
  },
  chasing: {
    title: "No more WhatsApp chases",
    body: "Riko drafts polite follow-ups and sends them to owners every weekday at 9 AM. You step in only when it's a judgement call.",
  },
  monthend: {
    title: "Close month-end 3 days earlier",
    body: "Automated postings, auto-matched receipts, one-click close. Riko catches the exceptions so you don't have to.",
  },
  gst_prep: {
    title: "GSTR-3B in 35 minutes flat",
    body: "Riko matches GSTR-2B against your purchase register, highlights ITC mismatches, and prepares the return before filing day.",
  },
  mis_requests: {
    title: "2-minute MIS, any client, any date",
    body: "Owner asks at 11 PM? Send it before you go to bed. Riko generates investor-grade PDFs directly from Tally.",
  },
  invoice_entry: {
    title: "Invoices in 30 seconds, not 5 minutes",
    body: "Drop a photo or PDF into Riko; it reads the vendor, amount, GST, and files it to the right party. You approve in one tap.",
  },
};

export const ACC_HERO_BY_INTENT: Record<AccountantIntent, { number: string; clause: string }> = {
  reconciliation: { number: "12 minutes", clause: "to close bank and cash reconciliation — from hours" },
  chasing: { number: "80%", clause: "of owner-chase automated, ethically" },
  monthend: { number: "3 days", clause: "off your month-end cycle" },
  gst_prep: { number: "5 minutes", clause: "to match GSTR-2B per book" },
  mis_requests: { number: "2 minutes", clause: "to investor-grade MIS, any time of day" },
  invoice_entry: { number: "30 seconds", clause: "per invoice, from photo to ledger" },
};
