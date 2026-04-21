import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Nav } from "@/components/nav";

type Mode = "desktop" | "mobile";

type Step = { label: string; status: "done" | "active" | "pending" };
const PROGRESS: Step[] = [
  { label: "Sign up", status: "done" },
  { label: "Tell us about you", status: "done" },
  { label: "Connect Tally", status: "active" },
  { label: "See your numbers", status: "pending" },
];

export default function ConnectTally() {
  const [mode, setMode] = useState<Mode>("desktop");
  const [waNum, setWaNum] = useState("+91 ");
  const [waSent, setWaSent] = useState(false);

  return (
    <View className="flex-1 bg-surface-bg">
      <Nav
        rightSlot={
          <View className="flex-row items-center gap-2">
            <View className="w-7 h-7 rounded-full bg-green-light items-center justify-center">
              <Text className="text-xs font-medium text-green-darkest">HS</Text>
            </View>
            <Text className="text-[13px] text-ink-secondary">Harsh</Text>
          </View>
        }
      />
      <ScrollView contentContainerClassName="pb-20">
        <View className="w-full self-center px-6 pt-12" style={{ maxWidth: 720 }}>
          <View className="flex-row items-center gap-1.5 mb-6 flex-wrap">
            {PROGRESS.map((p, i) => (
              <View key={p.label} className="flex-row items-center gap-1.5">
                <View
                  className={`w-2 h-2 rounded-full ${
                    p.status === "pending" ? "bg-border-strong" : "bg-green"
                  }`}
                />
                <Text
                  className={`text-[11px] ${
                    p.status === "active" ? "text-ink font-medium" : "text-ink-tertiary"
                  }`}
                >
                  {p.label}
                </Text>
                {i < PROGRESS.length - 1 && <View className="w-7 h-px bg-border mx-1" />}
              </View>
            ))}
          </View>

          <Text
            className="font-medium text-ink mb-2"
            style={{ fontSize: 32, lineHeight: 38, letterSpacing: -0.3 }}
          >
            Last step — let's connect your Tally.
          </Text>
          <Text className="text-base text-ink-secondary mb-7" style={{ maxWidth: 560, lineHeight: 24 }}>
            Riko reads from Tally to answer your questions. It never writes back. Setup takes 5 minutes.
          </Text>

          <View className="self-start flex-row p-1 bg-surface-alt rounded-full mb-6">
            <Pressable
              onPress={() => setMode("desktop")}
              className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 ${
                mode === "desktop" ? "bg-surface" : ""
              }`}
            >
              <Text
                className={`text-[13px] font-medium ${
                  mode === "desktop" ? "text-ink" : "text-ink-secondary"
                }`}
              >
                I'm on the Tally machine
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode("mobile")}
              className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 ${
                mode === "mobile" ? "bg-surface" : ""
              }`}
            >
              <Text
                className={`text-[13px] font-medium ${
                  mode === "mobile" ? "text-ink" : "text-ink-secondary"
                }`}
              >
                I'm on my phone
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

          <Text className="text-center text-[13px] text-ink-tertiary mt-5">
            Stuck?{" "}
            <Text className="text-ink-secondary underline">
              Get a 15-min walkthrough with our team
            </Text>
          </Text>
        </View>
      </ScrollView>
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
    <View className={`flex-row gap-4 py-5 ${last ? "" : "border-b border-border"}`}>
      <View className="w-7 h-7 rounded-full bg-green-light items-center justify-center mt-0.5">
        <Text className="text-[13px] font-medium text-green-darkest">{num}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-ink mb-1">{title}</Text>
        {children}
      </View>
    </View>
  );
}

function DesktopPane() {
  return (
    <View className="gap-5">
      <View className="bg-surface border border-border rounded-xl px-6">
        <Row num={1} title="Download the Riko Connector">
          <Text className="text-sm text-ink-secondary" style={{ lineHeight: 21 }}>
            A small Windows app that talks to Tally. 4 MB. Works with Tally Prime and Tally ERP 9.
          </Text>
          <View className="flex-row gap-2.5 mt-3 flex-wrap">
            <Pressable className="bg-green px-4 py-2.5 rounded-lg">
              <Text className="text-[13px] font-medium text-white">⬇ Download for Windows</Text>
            </Pressable>
            <Pressable className="border border-border px-4 py-2.5 rounded-lg">
              <Text className="text-[13px] text-ink-secondary">What does it install?</Text>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-x-4 gap-y-1.5 mt-3.5">
            {["Read-only", "AES-256 encrypted", "Indian servers", "SOC 2 Type II"].map((t) => (
              <View key={t} className="flex-row items-center gap-1">
                <Text className="text-xs text-green font-medium">✓</Text>
                <Text className="text-xs text-ink-tertiary">{t}</Text>
              </View>
            ))}
          </View>
        </Row>
        <Row num={2} title="Sign in inside the Connector">
          <Text className="text-sm text-ink-secondary" style={{ lineHeight: 21 }}>
            Open the app and paste this one-time code. It pairs the Connector to your Riko account.
          </Text>
          <View className="self-start mt-2.5 bg-surface-alt px-4 py-2.5 rounded-lg">
            <Text className="font-mono text-base font-medium text-ink" style={{ letterSpacing: 2 }}>
              RKO-7H2K-9XQM
            </Text>
          </View>
        </Row>
        <Row num={3} title="Pick the company to sync" last>
          <Text className="text-sm text-ink-secondary" style={{ lineHeight: 21 }}>
            If you have multiple companies in Tally, choose one to start. You can add more later.
          </Text>
        </Row>
      </View>
      <View className="bg-surface-alt rounded-lg px-4 py-3.5">
        <Text className="text-[13px] font-medium text-ink mb-1">Tally not on this machine?</Text>
        <Text className="text-[13px] text-ink-secondary" style={{ lineHeight: 20 }}>
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
      <View className="bg-surface border border-border rounded-xl px-6">
        <Row num={1} title="Send the install link to your laptop">
          <Text className="text-sm text-ink-secondary" style={{ lineHeight: 21 }}>
            We'll WhatsApp the Riko Connector download to whoever runs Tally — you, your accountant, or your CA. Takes them 5 minutes.
          </Text>
          <View className="flex-row gap-2 mt-2.5">
            <TextInput
              value={waNum}
              onChangeText={setWaNum}
              placeholder="+91 98765 43210"
              placeholderTextColor="#888780"
              className="flex-1 h-[38px] px-3 border border-border rounded-lg bg-surface text-sm text-ink"
              keyboardType="phone-pad"
            />
            <Pressable
              onPress={onSend}
              disabled={waSent}
              className={`px-4 justify-center rounded-lg ${waSent ? "bg-green-dark" : "bg-green"}`}
            >
              <Text className="text-[13px] font-medium text-white">
                {waSent ? "✓ Sent" : "Send link"}
              </Text>
            </Pressable>
          </View>
          <View className="mt-3 bg-whatsapp rounded-lg px-3.5 py-3" style={{ maxWidth: 320 }}>
            <Text className="text-[11px] text-white/85 font-medium mb-1">
              Riko · WhatsApp Business
            </Text>
            <Text className="text-[13px] text-white" style={{ lineHeight: 20 }}>
              Hi! Harsh from Patel Textiles invited you to set up Riko. Download the Riko Connector for Windows here:{" "}
              <Text className="underline text-white">riko.in/c/7h2k</Text>
            </Text>
          </View>
        </Row>
        <Row num={2} title="We'll WhatsApp you when the sync starts" last>
          <Text className="text-sm text-ink-secondary" style={{ lineHeight: 21 }}>
            As soon as they install and pair, your books appear in Riko. Usually within an hour of you sending the link.
          </Text>
        </Row>
      </View>

      <View className="flex-row items-start gap-3 bg-amber-light rounded-xl px-4 py-4">
        <View className="w-7 h-7 rounded-full bg-amber items-center justify-center">
          <Text className="text-white font-semibold">→</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-amber-dark font-medium mb-1">
            While you wait, keep exploring with sample data.
          </Text>
          <Text className="text-sm text-amber-dark" style={{ lineHeight: 21 }}>
            Don't sit on an empty dashboard. Ask Riko anything against a sample textile business — when your real data lands, we'll swap it in.
          </Text>
        </View>
      </View>
      <View className="items-center">
        <Pressable className="bg-amber px-4 py-2.5 rounded-lg">
          <Text className="text-[13px] font-medium text-white">Continue with sample data →</Text>
        </Pressable>
      </View>
    </View>
  );
}
