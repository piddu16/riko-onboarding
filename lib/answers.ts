export type AnswerKey = "overdue" | "cash" | "gst" | "margin";

export type AnswerRow = { label: string; value: string };

export type Answer = {
  key: AnswerKey;
  question: string;
  lead: string;
  rows: AnswerRow[];
  followup: string;
};

export const ANSWERS: Record<AnswerKey, Answer> = {
  overdue: {
    key: "overdue",
    question: "Who owes me more than 30 days?",
    lead: "3 parties have overdues beyond 30 days, totalling \u20B912.4L.",
    rows: [
      { label: "Kothari Traders", value: "\u20B95.2L \u00B7 42d" },
      { label: "Sai Enterprises", value: "\u20B94.1L \u00B7 38d" },
      { label: "Patel Distributors", value: "\u20B93.1L \u00B7 31d" },
    ],
    followup: "Want me to send WhatsApp reminders to all three?",
  },
  cash: {
    key: "cash",
    question: "What's my cash position right now?",
    lead: "Cash on hand: \u20B938.6L across 3 bank accounts.",
    rows: [
      { label: "HDFC Current", value: "\u20B924.1L" },
      { label: "ICICI OD", value: "\u20B911.8L" },
      { label: "Petty cash", value: "\u20B92.7L" },
    ],
    followup: "Runway at current burn: ~4.2 months.",
  },
  gst: {
    key: "gst",
    question: "Am I ready for GSTR-3B this month?",
    lead: "You're mostly ready. Tax liability for October: \u20B92.84L.",
    rows: [
      { label: "Output GST", value: "\u20B94.48L" },
      { label: "ITC available", value: "\u20B91.64L" },
      { label: "Net payable", value: "\u20B92.84L" },
    ],
    followup: "\u26A0 4 invoices missing HSN codes. Fix them before filing?",
  },
  margin: {
    key: "margin",
    question: "Which products have the worst margins?",
    lead: "3 SKUs are dragging your blended margin below 18%.",
    rows: [
      { label: "Cotton blend grey 60s", value: "4.2% \u00B7 \u20B98.1L" },
      { label: "Polyester yarn 30s", value: "6.8% \u00B7 \u20B95.4L" },
      { label: "Viscose 24s", value: "9.1% \u00B7 \u20B93.2L" },
    ],
    followup: "Repricing these 3 to category average lifts margin to 22%.",
  },
};

export const SUGGESTED: { key: AnswerKey; label: string }[] = [
  { key: "overdue", label: "Who owes me more than 30 days?" },
  { key: "cash", label: "What's my cash position?" },
  { key: "gst", label: "GSTR-3B status this month" },
  { key: "margin", label: "Worst margin products" },
];

export function matchKey(text: string): AnswerKey | null {
  const t = text.toLowerCase();
  if (/owe|overdue|receivable|30 ?day/.test(t)) return "overdue";
  if (/cash|bank|runway/.test(t)) return "cash";
  if (/gst|3b|gstr/.test(t)) return "gst";
  if (/margin|product|sku/.test(t)) return "margin";
  return null;
}
