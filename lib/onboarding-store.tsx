import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "founder" | "accountant" | "ca";
export type Intent = "receivables" | "cash" | "gst" | "mis" | "margin" | "payables";
export type AccountantIntent =
  | "reconciliation"
  | "chasing"
  | "monthend"
  | "gst_prep"
  | "mis_requests"
  | "invoice_entry";
export type CaIntent =
  | "client_chase"
  | "gst_across"
  | "mis_lender"
  | "multi_recon"
  | "client_staff"
  | "scale";
export type Commitment = "extremely" | "very" | "somewhat" | "exploring";

export type FirstClient = { name: string; email: string };

export type OnboardingState = {
  role: Role | null;
  // Founder
  intents: Intent[];
  industry: string | null;
  size: string | null;
  // Accountant
  inviteStatus: "yes" | "no" | null;
  inviteCode: string | null;
  accountantScope: string | null;
  accountantEmployer: "in_house" | "external" | null;
  accountantIntents: AccountantIntent[];
  // CA
  caClients: string | null;
  caPractice: string | null;
  caIntents: CaIntent[];
  firstClient: FirstClient | null;
  // Shared
  commitment: Commitment | null;
  email: string | null;
};

const DEFAULT: OnboardingState = {
  role: null,
  intents: [],
  industry: null,
  size: null,
  inviteStatus: null,
  inviteCode: null,
  accountantScope: null,
  accountantEmployer: null,
  accountantIntents: [],
  caClients: null,
  caPractice: null,
  caIntents: [],
  firstClient: null,
  commitment: null,
  email: null,
};

type Ctx = {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
  reset: () => void;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULT);
  const update = (patch: Partial<OnboardingState>) =>
    setState((s) => ({ ...s, ...patch }));
  const reset = () => setState(DEFAULT);
  return (
    <OnboardingCtx.Provider value={{ state, update, reset }}>
      {children}
    </OnboardingCtx.Provider>
  );
}

export function useOnboarding() {
  const v = useContext(OnboardingCtx);
  if (!v) throw new Error("useOnboarding must be used within OnboardingProvider");
  return v;
}

export function topIntent(intents: Intent[]): Intent | null {
  return intents[0] ?? null;
}

export function topAccountantIntent(intents: AccountantIntent[]): AccountantIntent | null {
  return intents[0] ?? null;
}

export function topCaIntent(intents: CaIntent[]): CaIntent | null {
  return intents[0] ?? null;
}

export function nameFromEmail(email: string | null): string {
  if (!email) return "there";
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._-]/)[0] ?? "";
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1);
}
