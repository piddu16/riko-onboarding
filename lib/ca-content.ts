import type { CaIntent } from "./onboarding-store";

export const CA_INTENT_LABEL: Record<CaIntent, string> = {
  client_chase: "Chasing clients for invoices and approvals",
  gst_across: "Juggling GST deadlines across 40+ books",
  mis_lender: "Last-minute MIS for lenders and investors",
  multi_recon: "Reconciling across client books",
  client_staff: "Coordinating with client staff — WhatsApp, phone, email",
  scale: "Scaling the practice without hiring more juniors",
};

export const CA_INTENT_VERB: Record<CaIntent, string> = {
  client_chase: "automating client follow-ups",
  gst_across: "running GST across every client from one calendar",
  mis_lender: "generating lender-ready MIS on demand",
  multi_recon: "reconciling every client's books overnight",
  client_staff: "consolidating client communications",
  scale: "adding clients without adding juniors",
};

export const CA_STAT: Record<CaIntent, { big: string; line: string }> = {
  client_chase: {
    big: "4-6 days/mo",
    line: "is what CAs with 50+ clients spend chasing invoices, approvals, and missing documents. Riko sends client reminders on WhatsApp automatically.",
  },
  gst_across: {
    big: "127 hrs/mo",
    line: "is the GST calendar load for a 40-client practice. Riko batches filings, matches GSTR-2B across clients, and flags mismatches in one view.",
  },
  mis_lender: {
    big: "11 PM, again",
    line: "is when a client's lender request lands in your inbox. Riko writes the MIS by the time you finish replying — no re-opening Tally needed.",
  },
  multi_recon: {
    big: "22 hrs/mo",
    line: "per CA goes into cross-client reconciliation. Riko runs every client's books overnight and drops a clean summary in your inbox by 7 AM.",
  },
  client_staff: {
    big: "3 channels/day",
    line: "— WhatsApp, phone, and email per client, per day. Riko consolidates every message into one client-tagged inbox.",
  },
  scale: {
    big: "\u20B98L/yr",
    line: "is the fully-loaded cost of the next junior you won't need to hire. Riko handles the first-pass work your juniors would have done.",
  },
};

export type Benefit = { title: string; body: string };

export const CA_BENEFIT: Record<CaIntent, Benefit> = {
  client_chase: {
    title: "Automated client follow-ups",
    body: "Riko pings clients for invoices, approvals, and missing docs on WhatsApp — politely, daily, until it's done. You only step in on exceptions.",
  },
  gst_across: {
    title: "One calendar, every client, every filing",
    body: "See every client's GST status in a single view. File in batches. Riko flags ITC mismatches before the deadline, not after.",
  },
  mis_lender: {
    title: "Lender-ready MIS in 2 minutes",
    body: "Any client, any date range, one tap. Tell Riko the lender's format — it remembers next time.",
  },
  multi_recon: {
    title: "Cross-client reconciliation, overnight",
    body: "Riko runs every client's books in parallel while you sleep. You walk in to clean books and a short exceptions list.",
  },
  client_staff: {
    title: "One inbox per client",
    body: "WhatsApp, email, voice notes, and phone logs — all routed to the right client file. Nothing falls between cracks.",
  },
  scale: {
    title: "Manage 3x more clients per junior",
    body: "Riko handles invoice entry, reconciliation, and chase-ups. Your team focuses on judgement calls, advisory, and filings.",
  },
};

export const CA_HERO_BY_INTENT: Record<CaIntent, { number: string; clause: string }> = {
  client_chase: { number: "4 hrs/day", clause: "back from chasing clients" },
  gst_across: { number: "1 calendar", clause: "for every GST deadline across your practice" },
  mis_lender: { number: "2 minutes", clause: "to lender-ready MIS, any client" },
  multi_recon: { number: "overnight", clause: "for cross-client reconciliation" },
  client_staff: { number: "1 inbox", clause: "for every client conversation" },
  scale: { number: "3x", clause: "more clients per junior on your team" },
};
