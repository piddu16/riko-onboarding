import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Briefcase, Calculator, FileSpreadsheet } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding, type Role } from "@/lib/onboarding-store";

const ROLES: Array<{
  key: Role;
  title: string;
  subtitle: string;
  Icon: typeof Briefcase;
}> = [
  {
    key: "founder",
    title: "I run my business",
    subtitle: "Founder or owner. You want to see the numbers and make decisions.",
    Icon: Briefcase,
  },
  {
    key: "accountant",
    title: "I work in accounts",
    subtitle: "You handle the books — invoices, ledgers, GST, MIS.",
    Icon: FileSpreadsheet,
  },
  {
    key: "ca",
    title: "I'm a CA",
    subtitle: "You manage multiple client books and cross-client visibility matters.",
    Icon: Calculator,
  },
];

export default function RoleScreen() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const steps = makeSteps("Tell us about you");
  const selected = state.role;

  function onContinue() {
    if (!selected) return;
    router.push("/onboarding/intents");
  }

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <ProgressDots steps={steps} />

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: compact ? 30 : 40, lineHeight: compact ? 36 : 46, letterSpacing: -0.5 }}
          >
            Who are you in your business?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Riko works differently for different roles. Pick yours and we'll tailor everything that follows.
          </Text>

          <View className="gap-3">
            {ROLES.map(({ key, title, subtitle, Icon }) => {
              const active = selected === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => update({ role: key })}
                  className={`flex-row items-start gap-4 rounded-2xl p-5 border ${
                    active ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
                  }`}
                  style={active ? { elevation: 2 } : undefined}
                >
                  <View
                    className={`w-11 h-11 rounded-xl items-center justify-center ${
                      active ? "bg-brand" : "bg-slate-100"
                    }`}
                  >
                    <Icon size={20} color={active ? "#ffffff" : "#0B1F12"} strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-ink mb-1">{title}</Text>
                    <Text className="text-sm text-slate-600" style={{ lineHeight: 21 }}>
                      {subtitle}
                    </Text>
                  </View>
                  <View
                    className={`w-5 h-5 rounded-full mt-1 ${
                      active ? "bg-brand" : "border-2 border-slate-300"
                    }`}
                  />
                </Pressable>
              );
            })}
          </View>

          <View className="mt-8 items-start">
            <Pressable
              onPress={onContinue}
              disabled={!selected}
              className={`flex-row items-center gap-2 rounded-full px-6 py-3.5 ${
                selected ? "bg-ink" : "bg-slate-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${selected ? "text-white" : "text-slate-500"}`}
              >
                Continue
              </Text>
              <ArrowRight
                size={16}
                color={selected ? "#ffffff" : "#94A3B8"}
                strokeWidth={2.25}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
