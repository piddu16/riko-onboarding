import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight, FileText, TrendingUp, Wallet } from "lucide-react-native";
import { Nav } from "@/components/nav";

const BENEFITS = [
  {
    key: "receivables",
    Icon: Wallet,
    title: "Receivables stuck beyond 30 days",
    body: "Riko users in your industry recover ₹4.2L in the first 60 days through automated WhatsApp reminders.",
  },
  {
    key: "gst",
    Icon: FileText,
    title: "GST filing stress",
    body: "Average filing time drops from 3 days to 35 minutes per month — and Riko flags ITC mismatches before you file.",
  },
  {
    key: "mis",
    Icon: TrendingUp,
    title: "MIS for lenders and investors",
    body: "Investor-ready MIS PDF generates in under 2 minutes. No more chasing your accountant the night before.",
  },
];

export default function OutcomeScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const heroSize = compact ? 34 : width < 880 ? 44 : 56;

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <ScrollView contentContainerClassName="pb-24">
        <View className="w-full self-center px-5" style={{ maxWidth: 760, paddingTop: compact ? 24 : 56 }}>
          <View className="self-start flex-row items-center gap-2 bg-brand-tint px-3 py-1.5 rounded-full mb-5">
            <View className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Text
              className="font-semibold text-xs uppercase text-ink-tertiary"
              style={{ letterSpacing: 2 }}
            >
              Based on 840 textile businesses on Riko
            </Text>
          </View>

          <Text
            className="font-semibold text-ink mb-3"
            style={{ fontSize: heroSize, lineHeight: heroSize * 1.12, letterSpacing: -0.75 }}
          >
            In 60 days, businesses like yours recover{" "}
            <Text className="text-brand" style={{ fontFamily: "Inter_700Bold" }}>
              ₹4.2L
            </Text>{" "}
            in stuck receivables.
          </Text>
          <Text className="text-slate-600 mb-10" style={{ fontSize: 17, lineHeight: 26, maxWidth: 560 }}>
            Not a projection. Median result across Riko users in textiles, ₹1–10 Cr revenue, running Tally Prime.
          </Text>

          <View className="gap-3 mb-10">
            {BENEFITS.map(({ key, Icon, title, body }) => (
              <View
                key={key}
                className="flex-row items-start gap-4 bg-surface border border-slate-200 rounded-2xl p-5"
              >
                <View className="w-11 h-11 rounded-xl bg-brand-tint items-center justify-center">
                  <Icon size={20} color="#16A34A" strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-ink mb-1.5">{title}</Text>
                  <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
                    {body}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="items-start">
            <Pressable
              onPress={() => router.push("/onboarding/signup")}
              className="flex-row items-center gap-2 bg-ink rounded-full px-6 py-3.5"
            >
              <Text className="text-sm font-semibold text-white">Show me my Riko</Text>
              <ArrowRight size={16} color="#ffffff" strokeWidth={2.25} />
            </Pressable>
            <Text className="text-xs text-slate-500 mt-3">
              One more step. We'll email you a magic link — no password to remember.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
