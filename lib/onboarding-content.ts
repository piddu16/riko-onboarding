import type { Intent } from "./onboarding-store";

export const INTENT_LABEL: Record<Intent, string> = {
  receivables: "Money stuck in receivables",
  cash: "No real-time view of cash and bank",
  gst: "GST filing stress every month",
  mis: "Slow or messy MIS for investors / lenders",
  margin: "Inventory bleeding margin",
  payables: "Vendor payments and payables visibility",
};

export const INTENT_VERB: Record<Intent, string> = {
  receivables: "reducing stuck receivables",
  cash: "having real-time cash visibility",
  gst: "simplifying GST filing",
  mis: "generating investor-ready MIS",
  margin: "fixing margin leaks",
  payables: "tracking vendor payments on time",
};

export const STAT: Record<Intent, { big: string; line: string }> = {
  receivables: {
    big: "\u20B98.6L",
    line: "is stuck in invoices older than 60 days in the median Indian SMB. Your peers on Riko recovered most of theirs inside 8 weeks.",
  },
  cash: {
    big: "62%",
    line: "of Indian SMB owners can't tell you their cash position without calling their CA. You've been one of them \u2014 not for long.",
  },
  gst: {
    big: "27 hrs/mo",
    line: "is what Indian SMBs spend reconciling GST. That's 3.4 working days a month \u2014 lost to paperwork Riko does in minutes.",
  },
  mis: {
    big: "3 days",
    line: "is the median wait for an MIS from your CA. Riko renders the same PDF in 2 minutes, on your phone, any day of the month.",
  },
  margin: {
    big: "6\u20138 pts",
    line: "is how much your bottom-20% SKUs drag blended margin. Riko flags them every Monday before the weekly review.",
  },
  payables: {
    big: "2.3%",
    line: "is what Indian SMBs lose in early-payment discounts every month \u2014 because nobody sees the window closing. Riko surfaces every one.",
  },
};

export type Benefit = { title: string; body: string };

export const BENEFIT: Record<Intent, Benefit> = {
  receivables: {
    title: "Receivables stuck beyond 30 days",
    body: "Riko users in your industry recover \u20B94.2L in the first 60 days through automated reminders.",
  },
  cash: {
    title: "Real-time cash visibility",
    body: "See cash across every account within 60 seconds of opening Riko. No more calls to your accountant.",
  },
  gst: {
    title: "GST filing stress",
    body: "Filing time drops from 3 days to 35 minutes per month. Riko flags ITC mismatches before you file.",
  },
  mis: {
    title: "MIS for lenders and investors",
    body: "Investor-ready MIS PDF in under 2 minutes. Lender due-diligence no longer derails your week.",
  },
  margin: {
    title: "Margin leaks on SKUs",
    body: "Riko flags the 3\u20135 SKUs dragging your blended margin. Users lift margin 2.5 pts in 90 days.",
  },
  payables: {
    title: "Vendor payment visibility",
    body: "Every pending payable with exact due dates and discount windows. Never miss an early-payment cut.",
  },
};

export const HERO_BY_INTENT: Record<Intent, { number: string; clause: string }> = {
  receivables: { number: "\u20B94.2L", clause: "in stuck receivables" },
  cash: { number: "60 seconds", clause: "to your full cash position, any morning" },
  gst: { number: "2.5 hours/mo", clause: "back from GST paperwork" },
  mis: { number: "2 minutes", clause: "to lender-ready MIS" },
  margin: { number: "2.5 points", clause: "of blended margin lifted" },
  payables: { number: "\u20B91.3L", clause: "in early-payment discounts captured" },
};
