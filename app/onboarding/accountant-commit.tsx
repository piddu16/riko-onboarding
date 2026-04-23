import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding, topAccountantIntent, type Commitment } from "@/lib/onboarding-store";
import { ACC_INTENT_VERB } from "@/lib/accountant-content";

const OPTIONS: Array<{ key: Commitment; label: string; note: string }> = [
  { key: "extremely", label: "Extremely important", note: "I want this fixed this month." },
  { key: "very", label: "Very important", note: "A priority this quarter." },
  { key: "somewhat", label: "Somewhat important", note: "On the list but not urgent." },
  { key: "exploring", label: "Just exploring", note: "Seeing what's out there." },
];

export default function AccountantCommit() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Sign up", ["Tell us about you"], state.role);

  const intent = topAccountantIntent(state.accountantIntents) ?? "reconciliation";
  const verb = ACC_INTENT_VERB[intent];

  function pick(key: Commitment) {
    update({ commitment: key });
    setTimeout(() => router.push("/onboarding/signup"), 200);
  }

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 640, paddingTop: compact ? 24 : 56 }}>
          <ProgressDots steps={steps} />

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: compact ? 28 : 36, lineHeight: compact ? 34 : 42, letterSpacing: -0.5 }}
          >
            How important is {verb} to you in the next 30 days?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 16, lineHeight: 24, maxWidth: 540 }}>
            No right answer — just helps us tune how often Riko nudges you.
          </Text>

          <View className="gap-2.5">
            {OPTIONS.map(({ key, label, note }) => {
              const active = state.commitment === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => pick(key)}
                  className={`flex-row items-start gap-3 rounded-2xl p-4 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                >
                  <View className={`w-5 h-5 rounded-full mt-0.5 ${active ? "bg-brand" : "border-2 border-slate-300"}`} />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-ink">{label}</Text>
                    <Text className="text-sm text-slate-600 mt-0.5" style={{ lineHeight: 20 }}>
                      {note}
                    </Text>
                  </View>
                  <ArrowRight size={18} color={active ? "#16A34A" : "#CBD5E1"} strokeWidth={2} />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
