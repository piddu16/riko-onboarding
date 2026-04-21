import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react-native";
import { Nav } from "@/components/nav";
import { ProgressDots, makeSteps } from "@/components/progress-dots";

const LOGOS = ["ICAI", "NASSCOM", "MSME", "Tally Certified"];

function isValidEmail(s: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.trim());
}

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { width } = useWindowDimensions();
  const compact = width < 640;

  const steps = makeSteps("Sign up", ["Tell us about you"]);
  const valid = isValidEmail(email);

  function send() {
    if (!valid) return;
    setSent(true);
    setTimeout(() => router.push("/onboarding/connect-tally"), 900);
  }

  return (
    <View className="flex-1 bg-surface">
      <Nav rightSlot={<View />} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="pb-24" keyboardShouldPersistTaps="handled">
          <View className="w-full self-center px-5" style={{ maxWidth: 520, paddingTop: compact ? 24 : 64 }}>
            <ProgressDots steps={steps} />

            <Text
              className="font-semibold text-ink mb-3"
              style={{ fontSize: compact ? 30 : 40, lineHeight: compact ? 36 : 46, letterSpacing: -0.5 }}
            >
              Where should we send your Riko?
            </Text>
            <Text className="text-slate-600 mb-7" style={{ fontSize: 17, lineHeight: 26 }}>
              We'll email you a magic link. No password to remember — just click from your inbox.
            </Text>

            <View className="relative">
              <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                <Mail size={18} color="#94A3B8" strokeWidth={2} />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@patel-textiles.in"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!sent}
                onSubmitEditing={send}
                returnKeyType="send"
                className="pl-12 pr-4 border border-slate-300 rounded-xl bg-surface text-base text-ink"
                style={{ fontFamily: "Inter_400Regular", height: 52 }}
              />
            </View>

            <Pressable
              onPress={send}
              disabled={!valid || sent}
              className={`flex-row items-center justify-center gap-2 rounded-full mt-3 ${
                valid && !sent ? "bg-ink" : "bg-slate-200"
              }`}
              style={{ height: 52 }}
            >
              <Text
                className={`text-sm font-semibold ${
                  valid && !sent ? "text-white" : "text-slate-500"
                }`}
              >
                {sent ? "Magic link on the way…" : "Send my magic link"}
              </Text>
              {!sent && (
                <ArrowRight
                  size={16}
                  color={valid ? "#ffffff" : "#94A3B8"}
                  strokeWidth={2.25}
                />
              )}
            </Pressable>

            <View className="flex-row items-center gap-2 mt-4">
              <ShieldCheck size={14} color="#22C55E" strokeWidth={2.25} />
              <Text className="text-xs text-slate-500">
                Your email is only used for login. No marketing spam — ever.
              </Text>
            </View>

            <Text className="text-[11px] text-slate-500 mt-4" style={{ lineHeight: 18 }}>
              By continuing you agree to our{" "}
              <Text className="underline text-slate-600">Terms</Text> and{" "}
              <Text className="underline text-slate-600">Privacy Policy</Text>.
            </Text>

            <View className="mt-12 pt-8 border-t border-slate-100">
              <Text
                className="text-xs font-semibold uppercase text-ink-tertiary mb-4 text-center"
                style={{ letterSpacing: 1.5 }}
              >
                Trusted by accountants across India
              </Text>
              <View className="flex-row flex-wrap justify-center gap-x-6 gap-y-3">
                {LOGOS.map((l) => (
                  <Text key={l} className="text-sm font-semibold text-slate-400">
                    {l}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
