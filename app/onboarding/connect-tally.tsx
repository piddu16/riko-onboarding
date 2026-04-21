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
import { ArrowRight, Check, Download, Monitor, Smartphone } from "lucide-react-native";
import { Nav } from "@/components/nav";

type Mode = "desktop" | "mobile";

type Step = { label: string; status: "done" | "active" | "pending" };
const PROGRESS: Step[] = [
  { label: "Sign up", status: "done" },
  { label: "Tell us about you", status: "done" },
  { label: "Connect Tally", status: "active" },
  { label: "See your numbers", status: "pending" },
];

const TRUST = ["Read-only", "AES-256 encrypted", "Indian servers", "SOC 2 Type II"];

export default function ConnectTally() {
  const [mode, setMode] = useState<Mode>("desktop");
  const [waNum, setWaNum] = useState("+91 ");
  const [waSent, setWaSent] = useState(false);
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const activeIdx = PROGRESS.findIndex((p) => p.status === "active");

  return (
    <View className="flex-1 bg-surface">
      <Nav
        rightSlot={
          <View className="flex-row items-center gap-2">
            <View className="w-9 h-9 rounded-full bg-brand-tint items-center justify-center">
              <Text className="text-xs font-semibold text-ink-tertiary">HS</Text>
            </View>
            {!compact && <Text className="text-sm text-slate-700 font-medium">Harsh</Text>}
          </View>
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="pb-20" keyboardShouldPersistTaps="handled">
          <View className="w-full self-center px-5" style={{ maxWidth: 720, paddingTop: compact ? 24 : 56 }}>
            {compact ? (
              <View className="mb-6">
                <Text className="text-xs font-semibold uppercase text-ink-tertiary mb-2" style={{ letterSpacing: 1.5 }}>
                  Step {activeIdx + 1} of {PROGRESS.length}
                </Text>
                <View className="flex-row gap-1.5">
                  {PROGRESS.map((p, i) => (
                    <View
                      key={p.label}
                      className={`h-1 flex-1 rounded-full ${
                        i <= activeIdx ? "bg-brand" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </View>
                <Text className="text-sm font-medium text-ink mt-2">{PROGRESS[activeIdx].label}</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-1.5 mb-8 flex-wrap">
                {PROGRESS.map((p, i) => (
                  <View key={p.label} className="flex-row items-center gap-1.5">
                    <View
                      className={`w-2 h-2 rounded-full ${
                        p.status === "pending" ? "bg-slate-300" : "bg-brand"
                      }`}
                    />
                    <Text
                      className={`text-xs font-medium ${
                        p.status === "active"
                          ? "text-ink"
                          : p.status === "done"
                          ? "text-slate-600"
                          : "text-slate-400"
                      }`}
                    >
                      {p.label}
                    </Text>
                    {i < PROGRESS.length - 1 && <View className="w-7 h-px bg-slate-200 mx-1" />}
                  </View>
                ))}
              </View>
            )}

            <Text
              className="font-semibold text-ink mb-3"
              style={{
                fontSize: compact ? 30 : 40,
                lineHeight: compact ? 36 : 46,
                letterSpacing: -0.5,
              }}
            >
              Last step — let's connect your Tally.
            </Text>
            <Text className="text-slate-600 mb-6" style={{ fontSize: 16, lineHeight: 24, maxWidth: 560 }}>
              Riko reads from Tally to answer your questions. It never writes back. Setup takes 5 minutes.
            </Text>

            <View className="self-start flex-row p-1 bg-slate-100 rounded-full mb-6">
              <Pressable
                onPress={() => setMode("desktop")}
                className={`px-4 py-3 rounded-full flex-row items-center gap-2 ${
                  mode === "desktop" ? "bg-surface" : ""
                }`}
                style={
                  mode === "desktop"
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 3,
                        elevation: 2,
                      }
                    : undefined
                }
              >
                <Monitor size={14} color={mode === "desktop" ? "#0B1F12" : "#64748B"} strokeWidth={2} />
                <Text className={`text-sm font-medium ${mode === "desktop" ? "text-ink" : "text-slate-600"}`}>
                  {compact ? "Tally machine" : "I'm on the Tally machine"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMode("mobile")}
                className={`px-4 py-3 rounded-full flex-row items-center gap-2 ${
                  mode === "mobile" ? "bg-surface" : ""
                }`}
                style={
                  mode === "mobile"
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 3,
                        elevation: 2,
                      }
                    : undefined
                }
              >
                <Smartphone size={14} color={mode === "mobile" ? "#0B1F12" : "#64748B"} strokeWidth={2} />
                <Text className={`text-sm font-medium ${mode === "mobile" ? "text-ink" : "text-slate-600"}`}>
                  {compact ? "My phone" : "I'm on my phone"}
                </Text>
              </Pressable>
            </View>

            {mode === "desktop" ? (
              <DesktopPane />
            ) : (
              <MobilePane
                waNum={waNum}
                setWaNum={setWaNum}
                waSent={waSent}
                onSend={() => setWaSent(true)}
              />
            )}

            <Text className="text-center text-sm text-slate-500 mt-6">
              Stuck?{" "}
              <Text className="text-slate-700 underline font-medium">
                Get a 15-min walkthrough with our team
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Row({
  num,
  title,
  children,
  last,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <View className={`flex-row gap-4 py-6 ${last ? "" : "border-b border-slate-200"}`}>
      <View className="w-8 h-8 rounded-full bg-brand-tint items-center justify-center mt-0.5">
        <Text className="text-sm font-semibold text-ink-tertiary">{num}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-ink mb-1.5">{title}</Text>
        {children}
      </View>
    </View>
  );
}

function DesktopPane() {
  return (
    <View className="gap-5">
      <View className="bg-surface border border-slate-200 rounded-2xl px-5">
        <Row num={1} title="Download the Riko Connector">
          <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
            A small Windows app that talks to Tally. 4 MB. Works with Tally Prime and Tally ERP 9.
          </Text>
          <View className="flex-row gap-2.5 mt-3 flex-wrap">
            <Pressable className="flex-row items-center gap-2 bg-ink rounded-full px-5 py-3">
              <Download size={14} color="#ffffff" strokeWidth={2.25} />
              <Text className="text-sm font-semibold text-white">Download for Windows</Text>
            </Pressable>
            <Pressable className="border border-slate-300 rounded-full px-5 py-3 bg-surface">
              <Text className="text-sm font-medium text-slate-700">What does it install?</Text>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-x-4 gap-y-2 mt-4">
            {TRUST.map((t) => (
              <View key={t} className="flex-row items-center gap-1.5">
                <Check size={14} color="#22C55E" strokeWidth={2.5} />
                <Text className="text-xs text-slate-500">{t}</Text>
              </View>
            ))}
          </View>
        </Row>
        <Row num={2} title="Sign in inside the Connector">
          <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
            Open the app and paste this one-time code. It pairs the Connector to your Riko account.
          </Text>
          <View className="self-start mt-3 bg-slate-100 px-4 py-3 rounded-lg">
            <Text
              className="text-base font-semibold text-ink"
              style={{ letterSpacing: 2, fontVariant: ["tabular-nums"] }}
            >
              RKO-7H2K-9XQM
            </Text>
          </View>
        </Row>
        <Row num={3} title="Pick the company to sync" last>
          <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
            If you have multiple companies in Tally, choose one to start. You can add more later.
          </Text>
        </Row>
      </View>
      <View className="bg-slate-50 rounded-xl px-5 py-4">
        <Text className="text-sm font-semibold text-ink mb-1">Tally not on this machine?</Text>
        <Text className="text-sm text-slate-600" style={{ lineHeight: 21 }}>
          Switch to "I'm on my phone" above and we'll send the install link to whoever runs Tally for you — by WhatsApp or email.
        </Text>
      </View>
    </View>
  );
}

function MobilePane({
  waNum,
  setWaNum,
  waSent,
  onSend,
}: {
  waNum: string;
  setWaNum: (v: string) => void;
  waSent: boolean;
  onSend: () => void;
}) {
  return (
    <View className="gap-5">
      <View className="bg-surface border border-slate-200 rounded-2xl px-5">
        <Row num={1} title="Send the install link to your laptop">
          <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
            We'll WhatsApp the Riko Connector download to whoever runs Tally — you, your accountant, or your CA. Takes them 5 minutes.
          </Text>
          <View className="flex-row gap-2 mt-3 items-center">
            <TextInput
              value={waNum}
              onChangeText={setWaNum}
              placeholder="+91 98765 43210"
              placeholderTextColor="#94A3B8"
              className="flex-1 px-4 border border-slate-300 rounded-lg bg-surface text-sm text-ink"
              keyboardType="phone-pad"
              style={{ fontFamily: "Inter_400Regular", height: 44 }}
            />
            <Pressable
              onPress={onSend}
              disabled={waSent}
              className={`flex-row items-center gap-1.5 px-5 justify-center rounded-full ${
                waSent ? "bg-brand-hover" : "bg-brand"
              }`}
              style={{ height: 44 }}
            >
              {waSent && <Check size={14} color="#ffffff" strokeWidth={2.5} />}
              <Text className="text-sm font-semibold text-white">{waSent ? "Sent" : "Send link"}</Text>
            </Pressable>
          </View>
          <View className="mt-3 bg-whatsapp rounded-xl px-4 py-3" style={{ maxWidth: 340 }}>
            <Text className="text-xs text-white font-semibold mb-1" style={{ opacity: 0.85 }}>
              Riko · WhatsApp Business
            </Text>
            <Text className="text-sm text-white" style={{ lineHeight: 20 }}>
              Hi! Harsh from Patel Textiles invited you to set up Riko. Download the Riko Connector for Windows here:{" "}
              <Text className="underline text-white">riko.in/c/7h2k</Text>
            </Text>
          </View>
        </Row>
        <Row num={2} title="We'll WhatsApp you when the sync starts" last>
          <Text className="text-sm text-slate-600" style={{ lineHeight: 22 }}>
            As soon as they install and pair, your books appear in Riko. Usually within an hour of you sending the link.
          </Text>
        </Row>
      </View>

      <View className="flex-row items-start gap-3 bg-amber-50 rounded-xl px-5 py-4 border border-amber-100">
        <View className="w-9 h-9 rounded-full bg-amber-500 items-center justify-center">
          <ArrowRight size={18} color="#ffffff" strokeWidth={2.5} />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-amber-900 mb-1">
            While you wait, keep exploring with sample data.
          </Text>
          <Text className="text-sm text-amber-800" style={{ lineHeight: 21 }}>
            Don't sit on an empty dashboard. Ask Riko anything against a sample textile business — when your real data lands, we'll swap it in.
          </Text>
        </View>
      </View>
      <View className="items-center">
        <Pressable className="flex-row items-center gap-2 bg-amber-600 rounded-full px-6 py-3">
          <Text className="text-sm font-semibold text-white">Continue with sample data</Text>
          <ArrowRight size={14} color="#ffffff" strokeWidth={2.25} />
        </Pressable>
      </View>
    </View>
  );
}
