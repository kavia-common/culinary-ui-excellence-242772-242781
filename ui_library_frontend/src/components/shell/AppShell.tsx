"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { SearchIcon, SettingsIcon, SparklesIcon } from "@/components/ui/Icons";
import { getApiBaseUrl, getNodeEnv, getWsBaseUrl } from "@/lib/env";
import { healthCheck } from "@/lib/api";

type IngredientRow = {
  name: string;
  qty: string;
  notes: string;
};

const sampleIngredients: IngredientRow[] = [
  { name: "San Marzano tomatoes", qty: "400g", notes: "Crushed" },
  { name: "Extra virgin olive oil", qty: "2 tbsp", notes: "Fruity" },
  { name: "Garlic", qty: "2 cloves", notes: "Thinly sliced" },
  { name: "Basil", qty: "6 leaves", notes: "Torn" },
  { name: "Sea salt", qty: "To taste", notes: "Finish" },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function ReelCard({
  title,
  author,
  minutes,
  className,
}: {
  title: string;
  author: string;
  minutes: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "min-w-[260px] max-w-[260px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden",
        "shadow-[var(--ui-shadow-sm)]",
        className,
      )}
    >
      <div className="h-28 bg-gradient-to-br from-white/10 to-white/0" />
      <div className="p-3">
        <div className="text-sm font-semibold text-white/90 line-clamp-1">{title}</div>
        <div className="mt-1 flex items-center justify-between text-xs text-white/55">
          <span className="truncate">{author}</span>
          <span>{minutes}</span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function AppShell() {
  /** High-fidelity shell screen implementing command bar, workspace, toggles, and reels. */
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState("ingredients");
  const [autoSync, setAutoSync] = React.useState(true);
  const [apiStatus, setApiStatus] = React.useState<"checking" | "online" | "offline">("checking");

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      setApiStatus("checking");
      try {
        await healthCheck();
        if (!cancelled) setApiStatus("online");
      } catch {
        if (!cancelled) setApiStatus("offline");
      }
    }

    run();
    const interval = setInterval(run, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const filtered = sampleIngredients.filter((r) =>
    `${r.name} ${r.qty} ${r.notes}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(37,99,235,.20),transparent_60%),radial-gradient(900px_500px_at_80%_10%,rgba(245,158,11,.18),transparent_55%),linear-gradient(180deg,rgba(10,12,18,1),rgba(8,10,14,1))] text-white">
      {/* Command bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[var(--ui-accent)]/35 to-white/0 border border-white/10 shadow-[var(--ui-shadow-sm)] grid place-items-center">
                <SparklesIcon className="h-5 w-5 text-white/90" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight text-white/95 truncate">
                  Culinary Workspace
                </div>
                <div className="text-xs text-white/55 truncate">
                  Ocean Professional · {getNodeEnv()}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl px-3">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ingredients, steps, notes…"
                leading={<SearchIcon className="h-4 w-4" />}
              />
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={apiStatus === "online" ? "success" : apiStatus === "offline" ? "danger" : "neutral"}
                className="hidden sm:inline-flex"
              >
                <span
                  className={cx(
                    "h-1.5 w-1.5 rounded-full",
                    apiStatus === "online"
                      ? "bg-emerald-300"
                      : apiStatus === "offline"
                        ? "bg-rose-300"
                        : "bg-white/40",
                  )}
                />
                API {apiStatus}
              </Badge>

              <IconButton label="Settings">
                <SettingsIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace */}
      <main className="mx-auto max-w-6xl px-4 pt-6 pb-28">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Tabs
                items={[
                  { id: "ingredients", label: "Ingredients", badge: String(filtered.length) },
                  { id: "steps", label: "Steps" },
                  { id: "notes", label: "Notes" },
                ]}
                activeId={tab}
                onChange={setTab}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <Toggle
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                  label="Auto-sync"
                  description={autoSync ? "On" : "Off"}
                />
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  // Placeholder action for future AI-run operation.
                  // Intent: this becomes the primary “Generate / Plan / Cook mode” action later.
                  alert("Primary action (hook into backend later).");
                }}
              >
                Create session
              </Button>
            </div>
          </div>

          <Card tone="elevated" className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white/90">Workspace</div>
                <div className="text-xs text-white/55 mt-1">
                  API base:{" "}
                  <span className="text-white/75">
                    {getApiBaseUrl() || "(relative)"}
                  </span>
                  {" · "}
                  WS base:{" "}
                  <span className="text-white/75">
                    {getWsBaseUrl() ?? "(not set)"}
                  </span>
                </div>
              </div>

              <Badge variant="neutral">Premium 2D</Badge>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              {tab === "ingredients" ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-white/70">
                    <tr>
                      <th className="py-3 px-3 font-medium">Ingredient</th>
                      <th className="py-3 px-3 font-medium w-[140px]">Qty</th>
                      <th className="py-3 px-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filtered.map((r) => (
                      <tr key={r.name} className="hover:bg-white/[0.04]">
                        <td className="py-3 px-3 text-white/90">{r.name}</td>
                        <td className="py-3 px-3 text-white/75">{r.qty}</td>
                        <td className="py-3 px-3 text-white/65">{r.notes}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-6 px-3 text-white/55">
                          No matches. Try a different search.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              ) : tab === "steps" ? (
                <div className="p-4 text-sm text-white/70">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Warm olive oil; gently bloom garlic.</li>
                    <li>Add crushed tomatoes; simmer 12–15 minutes.</li>
                    <li>Season; finish with basil. Taste and adjust.</li>
                  </ol>
                </div>
              ) : (
                <div className="p-4 text-sm text-white/70 space-y-2">
                  <p>Keep it bright: add saffron/amber accents only where it matters.</p>
                  <p>Use subtle shadows and rounded corners for depth, not noise.</p>
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm font-semibold text-white/90">Mixing zone</div>
              <div className="mt-2 text-xs text-white/55">
                Reserved surface for future interactive mixing/drag-drop.
              </div>
              <div className="mt-4 h-20 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--ui-accent)]/15 to-white/0" />
            </Card>

            <Card className="p-4">
              <div className="text-sm font-semibold text-white/90">Taste dial</div>
              <div className="mt-2 text-xs text-white/55">
                Screen-specific 2D element placeholder (slider/dial).
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[58%] bg-[var(--ui-secondary)]" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-sm font-semibold text-white/90">Session log</div>
              <div className="mt-2 text-xs text-white/55">
                Shows connectivity and actions (future WS streaming).
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-white/70">
                  <span>Backend</span>
                  <span>{apiStatus === "online" ? "reachable" : apiStatus}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Auto-sync</span>
                  <span>{autoSync ? "enabled" : "disabled"}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom reels */}
      <section className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white/85">Community reels</div>
            <div className="text-xs text-white/55 hidden sm:block">
              Side-scroll for quick inspiration
            </div>
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            <ReelCard title="Perfect pan sauce in 60s" author="Chef Mira" minutes="0:58" />
            <ReelCard title="Knife skills: chiffonade basil" author="Studio Knife" minutes="1:22" />
            <ReelCard title="Saffron risotto glow-up" author="Arancio" minutes="2:05" />
            <ReelCard title="Crispy garlic without bitterness" author="Noir Kitchen" minutes="1:10" />
            <ReelCard title="Tomato acidity balancing" author="Salt & Heat" minutes="1:48" />
          </div>
        </div>
      </section>
    </div>
  );
}
