import { Text, useWindowDimensions, View } from "react-native";
import type { Role } from "@/lib/onboarding-store";

export type OnboardingStep = { label: string; status: "done" | "active" | "pending" };

function labelsForRole(role?: Role | null): [string, string, string, string] {
  if (role === "ca") {
    return ["Tell us about you", "Sign up", "Invite first client", "Your clients"];
  }
  return ["Tell us about you", "Sign up", "Connect Tally", "See your numbers"];
}

export function makeSteps(
  activeLabel: string,
  doneLabels: string[] = [],
  role?: Role | null,
): OnboardingStep[] {
  const labels = labelsForRole(role);
  return labels.map((label) => {
    if (doneLabels.includes(label)) return { label, status: "done" };
    if (label === activeLabel) return { label, status: "active" };
    return { label, status: "pending" };
  });
}

export function ProgressDots({ steps }: { steps: OnboardingStep[] }) {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const activeIdx = steps.findIndex((s) => s.status === "active");

  if (compact) {
    return (
      <View className="mb-6">
        <Text
          className="text-xs font-semibold uppercase text-ink-tertiary mb-2"
          style={{ letterSpacing: 1.5 }}
        >
          Step {activeIdx + 1} of {steps.length}
        </Text>
        <View className="flex-row gap-1.5">
          {steps.map((s, i) => (
            <View
              key={s.label}
              className={`h-1 flex-1 rounded-full ${
                i <= activeIdx || s.status === "done" ? "bg-brand" : "bg-slate-200"
              }`}
            />
          ))}
        </View>
        <Text className="text-sm font-medium text-ink mt-2">
          {activeIdx >= 0 ? steps[activeIdx].label : steps[0].label}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-1.5 mb-8 flex-wrap">
      {steps.map((s, i) => (
        <View key={s.label} className="flex-row items-center gap-1.5">
          <View
            className={`w-2 h-2 rounded-full ${
              s.status === "pending" ? "bg-slate-300" : "bg-brand"
            }`}
          />
          <Text
            className={`text-xs font-medium ${
              s.status === "active"
                ? "text-ink"
                : s.status === "done"
                ? "text-slate-600"
                : "text-slate-400"
            }`}
          >
            {s.label}
          </Text>
          {i < steps.length - 1 && <View className="w-7 h-px bg-slate-200 mx-1" />}
        </View>
      ))}
    </View>
  );
}
