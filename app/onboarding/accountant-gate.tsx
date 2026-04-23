import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, Mail, UserPlus } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";
import { useOnboarding } from "@/lib/onboarding-store";

export default function AccountantGate() {
  const { state, update } = useOnboarding();
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const steps = makeSteps("Tell us about you", [], state.role);

  function pick(answer: "yes" | "no") {
    update({ inviteStatus: answer });
    setTimeout(() => router.push("/onboarding/accountant-scope"), 200);
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
            Were you invited to Riko by a business owner or CA?
          </Text>
          <Text className="text-slate-600 mb-8" style={{ fontSize: 16, lineHeight: 24, maxWidth: 520 }}>
            Riko is usually set up by the owner or lead CA — we just want to make sure you're in the right place.
          </Text>

          <View className="gap-2.5">
            <Pressable
              onPress={() => pick("yes")}
              className={`flex-row items-start gap-4 rounded-2xl p-5 border ${
                state.inviteStatus === "yes" ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
              }`}
            >
              <View className="w-11 h-11 rounded-xl bg-brand-tint items-center justify-center">
                <Mail size={20} color="#16A34A" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-ink mb-1">Yes, I have an invite</Text>
                <Text className="text-sm text-slate-600" style={{ lineHeight: 21 }}>
                  You'll enter your invite code and get straight to the books.
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => pick("no")}
              className={`flex-row items-start gap-4 rounded-2xl p-5 border ${
                state.inviteStatus === "no" ? "border-brand bg-brand-tint" : "border-slate-200 bg-surface"
              }`}
            >
              <View className="w-11 h-11 rounded-xl bg-slate-100 items-center justify-center">
                <UserPlus size={20} color="#0B1F12" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-ink mb-1">No, I'm setting up on my own</Text>
                <Text className="text-sm text-slate-600" style={{ lineHeight: 21 }}>
                  That's fine. We'll tailor Riko around how your practice works — and offer to loop in the owner later.
                </Text>
              </View>
            </Pressable>
          </View>

          <View className="mt-6 flex-row items-center gap-2">
            <ArrowRight size={14} color="#94A3B8" strokeWidth={2.25} />
            <Text className="text-xs text-slate-500">Your answer only shapes the next few screens — nothing is locked in.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
