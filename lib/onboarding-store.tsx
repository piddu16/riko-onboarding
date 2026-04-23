import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "founder" | "accountant" | "ca";
export type Intent = "receivables" | "cash" | "gst" | "mis" | "margin" | "payables";
export type Commitment = "extremely" | "very" | "somewhat" | "exploring";

export type OnboardingState = {
  role: Role | null;
  intents: Intent[];
  industry: string | null;
  size: string | null;
  commitment: Commitment | null;
  email: string | null;
};

const DEFAULT: OnboardingState = {
  role: null,
  intents: [],
  industry: null,
  size: null,
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

export function nameFromEmail(email: string | null): string {
  if (!email) return "there";
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._-]/)[0] ?? "";
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1);
}
