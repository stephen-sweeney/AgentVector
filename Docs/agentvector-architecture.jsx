import { useState } from "react";

const C = {
  bg: "#0a0e17",
  surface: "#111827",
  surfaceHover: "#1a2234",
  surfaceDeep: "#080c14",
  border: "#1e2d4a",
  borderActive: "#3b82f6",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#475569",
  accent: "#3b82f6",
  accentGlow: "rgba(59, 130, 246, 0.15)",
  swift: "#f97316",
  swiftBg: "rgba(249, 115, 22, 0.08)",
  swiftBorder: "rgba(249, 115, 22, 0.25)",
  ts: "#3b82f6",
  tsBg: "rgba(59, 130, 246, 0.08)",
  tsBorder: "rgba(59, 130, 246, 0.25)",
  rust: "#a855f7",
  rustBg: "rgba(168, 85, 247, 0.08)",
  rustBorder: "rgba(168, 85, 247, 0.25)",
  green: "#10b981",
  greenBg: "rgba(16, 185, 129, 0.08)",
  greenBorder: "rgba(16, 185, 129, 0.25)",
  consumer: "#eab308",
  consumerBg: "rgba(234, 179, 8, 0.06)",
  consumerBorder: "rgba(234, 179, 8, 0.2)",
  thirdParty: "#ec4899",
  thirdPartyBg: "rgba(236, 72, 153, 0.06)",
  thirdPartyBorder: "rgba(236, 72, 153, 0.2)",
};

const MONO = `'SF Mono', 'Fira Code', 'JetBrains Mono', monospace`;
const SANS = `'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif`;

function Tag({ color, children }) {
  const colors = {
    swift: { bg: C.swiftBg, fg: C.swift, border: C.swiftBorder },
    ts: { bg: C.tsBg, fg: C.ts, border: C.tsBorder },
    rust: { bg: C.rustBg, fg: C.rust, border: C.rustBorder },
    green: { bg: C.greenBg, fg: C.green, border: C.greenBorder },
    consumer: { bg: C.consumerBg, fg: C.consumer, border: C.consumerBorder },
    thirdParty: { bg: C.thirdPartyBg, fg: C.thirdParty, border: C.thirdPartyBorder },
    muted: { bg: "rgba(255,255,255,0.03)", fg: C.textMuted, border: "rgba(255,255,255,0.06)" },
  };
  const c = colors[color] || colors.muted;
  return (
    <span style={{
      display: "inline-block", padding: "1px 7px", borderRadius: 4,
      fontSize: 9, fontFamily: MONO, fontWeight: 600, letterSpacing: "0.04em",
      background: c.bg, color: c.fg, border: `1px solid ${c.border}`,
    }}>{children}</span>
  );
}

function DashedBorder({ label, color = C.border, labelColor = C.textDim }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
      <div style={{ flex: 1, height: 1, background: `repeating-linear-gradient(90deg, ${color} 0, ${color} 5px, transparent 5px, transparent 10px)` }} />
      <span style={{ fontSize: 8, fontFamily: MONO, color: labelColor, whiteSpace: "nowrap", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `repeating-linear-gradient(90deg, ${color} 0, ${color} 5px, transparent 5px, transparent 10px)` }} />
    </div>
  );
}

// ─── Architecture Tab ──────────────────────────────────────────────

function ArchitectureDiagram() {
  const [selected, setSelected] = useState(null);

  const details = {
    framework: "AgentVector is the framework you depend on. It ships protocols (Reducer, State, Action, Agent), the audit trail (hash-chained EventLog), and the conformance fixtures. It does NOT contain any domain-specific governance logic. A jurisdiction imports it the same way you'd import Redux — you get the patterns and primitives, you supply the domain rules.",
    conformance: "JSON fixtures that specify input (state + action + config) and expected output (verdict + reason). Derived from SwiftVector's test suite. Any kernel — Swift, TypeScript, Rust, or one you write — that passes all fixtures enforces the same Laws. The fixtures are the contract. Your jurisdiction's test suite loads them.",
    swiftvector: "The Swift package (SwiftVectorCore) that ships the reference protocols, the audit trail, and conformance test infrastructure. Your Swift jurisdiction adds it as a Package.swift dependency. It provides Reducer, StateProtocol, ActionProtocol, AuditEntry, EventLog. You provide the domain types and governance logic.",
    tsvector: "The npm package (@agentvector/core) that ships the TypeScript reducer contract and conformance test runner. Your TS jurisdiction adds it as a package.json dependency. It provides createReducer, state/action types, audit utilities. You provide the domain rules.",
    yours: "A jurisdiction you build. It imports AgentVector's kernel as a dependency, defines domain-specific state/actions/governance modules, and runs conformance fixtures to verify its reducer matches the spec. AgentVector doesn't know your domain exists. Your domain doesn't need AgentVector's permission.",
    reference: "Seraphim's jurisdictions — ClawLaw, DispatchLaw, FlightLaw, ChronicleLaw — are consumers of the framework, not parts of it. They live in their own repos, import SwiftVectorCore or @agentvector/core, and define their own governance logic. They happen to be built by the framework author, but architecturally they're identical to a third-party jurisdiction.",
  };

  return (
    <div style={{ padding: "12px 16px", maxWidth: 740 }}>
      {/* Framework box */}
      <div
        onClick={() => setSelected(selected === "framework" ? null : "framework")}
        style={{
          border: `2px solid ${selected === "framework" ? C.accent : C.border}`,
          borderRadius: 10, padding: 16, cursor: "pointer",
          background: selected === "framework" ? C.surfaceHover : C.surface,
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: SANS, color: C.text }}>
              Agent<span style={{ color: C.accent }}>Vector</span>
            </span>
            <span style={{ fontSize: 10, fontFamily: MONO, color: C.textDim, marginLeft: 8 }}>the framework · you depend on this</span>
          </div>
          <Tag color="green">DEPENDENCY</Tag>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ background: C.surfaceDeep, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text, fontFamily: SANS }}>The Codex</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO, marginTop: 2 }}>Laws 0-10 · philosophy · architecture</div>
            <div style={{ fontSize: 9, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>Specification only. No code.</div>
          </div>

          <div
            onClick={(e) => { e.stopPropagation(); setSelected(selected === "conformance" ? null : "conformance"); }}
            style={{
              background: selected === "conformance" ? C.greenBg : C.surfaceDeep,
              border: `1px solid ${selected === "conformance" ? C.greenBorder : C.border}`,
              borderRadius: 6, padding: "8px 12px", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: SANS }}>Conformance Suite</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO, marginTop: 2 }}>JSON fixtures · schemas</div>
            <div style={{ fontSize: 9, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>The contract between kernels.</div>
          </div>
        </div>

        <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <div
            onClick={(e) => { e.stopPropagation(); setSelected(selected === "swiftvector" ? null : "swiftvector"); }}
            style={{
              background: selected === "swiftvector" ? C.swiftBg : C.surfaceDeep,
              border: `1px solid ${selected === "swiftvector" ? C.swiftBorder : C.border}`,
              borderRadius: 6, padding: "8px 10px", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: C.swift, fontFamily: SANS }}>SwiftVector</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO }}>Reference kernel</div>
            <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>import SwiftVectorCore</div>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); setSelected(selected === "tsvector" ? null : "tsvector"); }}
            style={{
              background: selected === "tsvector" ? C.tsBg : C.surfaceDeep,
              border: `1px solid ${selected === "tsvector" ? C.tsBorder : C.border}`,
              borderRadius: 6, padding: "8px 10px", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: C.ts, fontFamily: SANS }}>TSVector</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO }}>Integration kernel</div>
            <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>@agentvector/core</div>
          </div>
          <div style={{
            background: C.surfaceDeep, border: `1px solid ${C.border}`,
            borderRadius: 6, padding: "8px 10px", opacity: 0.5,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.rust, fontFamily: SANS }}>RustVector</div>
            <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO }}>Transport · deferred</div>
          </div>
        </div>

        <div style={{ marginTop: 8, textAlign: "center", fontSize: 8, fontFamily: MONO, color: C.textDim }}>
          This entire box is what you install. Everything below consumes it.
        </div>
      </div>

      <DashedBorder label="dependency boundary · jurisdictions import the framework" color={C.consumerBorder} labelColor={C.consumer} />

      {/* Reference jurisdictions */}
      <div
        onClick={() => setSelected(selected === "reference" ? null : "reference")}
        style={{
          border: `1px solid ${selected === "reference" ? C.consumerBorder : C.border}`,
          borderRadius: 10, padding: 14, cursor: "pointer",
          background: selected === "reference" ? C.consumerBg : C.surface,
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: SANS, color: C.consumer }}>Reference Jurisdictions</span>
            <span style={{ fontSize: 9, fontFamily: MONO, color: C.textDim, marginLeft: 8 }}>built by framework author · separate repos</span>
          </div>
          <Tag color="consumer">CONSUMERS</Tag>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {[
            { name: "ClawLaw", sub: "Desktop Agents", kernel: "TSVector", color: "ts", laws: "0, 4, 8", dep: "@agentvector/core" },
            { name: "DispatchLaw", sub: "Aviation Ops", kernel: "SwiftVector", color: "swift", laws: "3, 4, 7, 8", dep: "SwiftVectorCore" },
            { name: "FlightLaw", sub: "Drone Safety", kernel: "SwiftVector", color: "swift", laws: "3, 4, 7, 8", dep: "SwiftVectorCore" },
            { name: "ChronicleLaw", sub: "Narrative", kernel: "SwiftVector", color: "swift", laws: "6, 8", dep: "SwiftVectorCore" },
          ].map((j, i) => (
            <div key={i} style={{
              background: C.surfaceDeep, border: `1px solid ${C.border}`,
              borderRadius: 6, padding: "8px 10px",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text, fontFamily: SANS }}>{j.name}</div>
              <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO }}>{j.sub}</div>
              <div style={{ marginTop: 4 }}><Tag color={j.color}>{j.kernel}</Tag></div>
              <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>Laws {j.laws}</div>
              <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO }}>imports {j.dep}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Third party */}
      <div style={{ marginTop: 8 }}>
        <div
          onClick={() => setSelected(selected === "yours" ? null : "yours")}
          style={{
            border: `1px dashed ${selected === "yours" ? C.thirdPartyBorder : C.border}`,
            borderRadius: 10, padding: 14, cursor: "pointer",
            background: selected === "yours" ? C.thirdPartyBg : "transparent",
            transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: SANS, color: C.thirdParty }}>Your Jurisdiction</span>
              <span style={{ fontSize: 9, fontFamily: MONO, color: C.textDim, marginLeft: 8 }}>same relationship as reference jurisdictions</span>
            </div>
            <Tag color="thirdParty">YOU BUILD THIS</Tag>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            {[
              { name: "MedLaw", sub: "Medical Devices", kernel: "SwiftVector", color: "swift", laws: "3, 4, 8, 9", dep: "SwiftVectorCore" },
              { name: "WarehouseLaw", sub: "Robotics", kernel: "TSVector", color: "ts", laws: "0, 4, 7, 8", dep: "@agentvector/core" },
              { name: "TradeLaw", sub: "Financial", kernel: "SwiftVector", color: "swift", laws: "4, 5, 8", dep: "SwiftVectorCore" },
            ].map((j, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)", border: `1px dashed ${C.border}`,
                borderRadius: 6, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.thirdParty, fontFamily: SANS, opacity: 0.7 }}>{j.name}</div>
                <div style={{ fontSize: 9, color: C.textMuted, fontFamily: MONO }}>{j.sub}</div>
                <div style={{ marginTop: 4 }}><Tag color={j.color}>{j.kernel}</Tag></div>
                <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO, marginTop: 4 }}>Laws {j.laws}</div>
                <div style={{ fontSize: 8, color: C.textDim, fontFamily: MONO }}>imports {j.dep}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, fontSize: 9, color: C.textDim, fontFamily: MONO, textAlign: "center" }}>
            These don't exist yet — they're examples of what a third-party implementer would build
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && details[selected] && (
        <div style={{
          marginTop: 12, background: C.surfaceHover, border: `1px solid ${C.border}`,
          borderRadius: 8, padding: "14px 18px",
        }}>
          <div style={{ fontSize: 12, fontFamily: SANS, color: C.textMuted, lineHeight: 1.65 }}>{details[selected]}</div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 10, fontSize: 8, fontFamily: MONO, color: C.textDim }}>
        Click any section for details
      </div>
    </div>
  );
}

// ─── Code Tab ──────────────────────────────────────────────────────

function CodeStructure() {
  const [view, setView] = useState("framework");

  const trees = {
    framework: {
      label: "AgentVector Framework",
      desc: "What you install as a dependency. Ships protocols, audit trail, and conformance fixtures. Contains zero domain logic.",
      color: C.accent,
      tree: [
        { t: "d", n: "agentvector/", c: "# The framework repo" },
        { t: "d", n: "├── codex/", c: "# Constitutional docs (Laws, philosophy)" },
        { t: "f", n: "│   └── agentvector-codex-v2_0.md" },
        { t: "d", n: "├── Schemas/", c: "# JSON Schema for reducer contract" },
        { t: "f", n: "│   ├── state.schema.json" },
        { t: "f", n: "│   ├── action.schema.json" },
        { t: "f", n: "│   └── verdict.schema.json" },
        { t: "d", n: "├── Fixtures/", c: "# Conformance test fixtures" },
        { t: "f", n: "│   ├── law0_boundary_basic.json" },
        { t: "f", n: "│   ├── law4_resource_budget.json" },
        { t: "f", n: "│   └── law8_authority_escalation.json" },
        { t: "s", n: "│" },
        { t: "h", n: "│   ── Swift Kernel (SwiftVectorCore) ──" },
        { t: "d", n: "├── Sources/SwiftVectorCore/", c: "# Reference kernel" },
        { t: "f", n: "│   ├── Protocols/StateProtocol.swift", c: "# Your state conforms to this" },
        { t: "f", n: "│   ├── Protocols/ActionProtocol.swift", c: "# Your actions conform to this" },
        { t: "f", n: "│   ├── Protocols/Reducer.swift", c: "# Your reducer implements this" },
        { t: "f", n: "│   ├── Protocols/Agent.swift", c: "# Your agents implement this" },
        { t: "f", n: "│   ├── Audit/AuditEntry.swift", c: "# Hash-chained audit trail" },
        { t: "f", n: "│   ├── Audit/EventLog.swift", c: "# Append-only, verifiable log" },
        { t: "f", n: "│   └── Determinism/", c: "# Clock/UUID/Random DI" },
        { t: "d", n: "├── Tests/SwiftVectorCoreTests/" },
        { t: "d", n: "├── Tests/ConformanceTests/", c: "# Swift fixture runner" },
        { t: "s", n: "│" },
        { t: "h", n: "│   ── TypeScript Kernel (@agentvector/core) ──" },
        { t: "d", n: "├── packages/core/", c: "# npm: @agentvector/core" },
        { t: "f", n: "│   ├── src/reducer.ts", c: "# createReducer() factory" },
        { t: "f", n: "│   ├── src/types.ts", c: "# State, Action, Verdict types" },
        { t: "f", n: "│   ├── src/audit.ts", c: "# Hash-chained audit in TS" },
        { t: "f", n: "│   └── tests/conformance.test.ts", c: "# TS fixture runner" },
        { t: "s", n: "│" },
        { t: "f", n: "├── Package.swift", c: "# Swift package manifest" },
        { t: "f", n: "└── README.md" },
      ],
      insight: {
        title: "What ships vs. what's consumed",
        color: C.accent,
        bg: C.accentGlow,
        border: "rgba(59,130,246,0.25)",
        text: `This repo contains the protocols, the audit trail, the conformance fixtures, and the kernel implementations (Swift + TypeScript). It does NOT contain ClawLaw, DispatchLaw, FlightLaw, or ChronicleLaw. Those are separate repos that import this framework. The framework is domain-agnostic by construction — it literally cannot contain domain logic.`,
      },
    },
    consumer: {
      label: "Your Jurisdiction (Consumer)",
      desc: "What you build. Imports the framework as a dependency. Defines your domain-specific state, actions, reducer, and governance modules.",
      color: C.thirdParty,
      tree: [
        { t: "d", n: "medlaw/", c: "# Your jurisdiction repo" },
        { t: "f", n: "├── Package.swift", c: '# dependencies: [.package(url: "...SwiftVectorCore")]' },
        { t: "s", n: "│" },
        { t: "d", n: "├── Sources/MedLaw/", c: "# Your governance package" },
        { t: "f", n: "│   ├── MedState.swift", c: "# struct MedState: StateProtocol" },
        { t: "f", n: "│   ├── MedAction.swift", c: "# enum MedAction: ActionProtocol" },
        { t: "f", n: "│   ├── MedReducer.swift", c: "# struct MedReducer: Reducer" },
        { t: "d", n: "│   ├── Laws/", c: "# Which Laws you compose" },
        { t: "f", n: "│   │   ├── ObservationEnforcer.swift", c: "# Law 3: device telemetry" },
        { t: "f", n: "│   │   ├── ResourceEnforcer.swift", c: "# Law 4: battery/power mgmt" },
        { t: "f", n: "│   │   └── AuthorityEnforcer.swift", c: "# Law 8: clinician approval" },
        { t: "d", n: "│   └── Governance/", c: "# Domain-specific modules" },
        { t: "f", n: "│       ├── DosingGovernance.swift", c: "# Medication dosing limits" },
        { t: "f", n: "│       └── AlarmGovernance.swift", c: "# Critical alarm escalation" },
        { t: "s", n: "│" },
        { t: "d", n: "├── Tests/MedLawTests/" },
        { t: "f", n: "│   ├── MedReducerTests.swift", c: "# Your domain-specific tests" },
        { t: "f", n: "│   └── ConformanceTests.swift", c: "# Loads AgentVector fixtures" },
        { t: "s", n: "│" },
        { t: "f", n: "└── README.md" },
      ],
      insight: {
        title: "The key insight",
        color: C.thirdParty,
        bg: C.thirdPartyBg,
        border: C.thirdPartyBorder,
        text: `MedLaw's Package.swift declares a dependency on SwiftVectorCore. That's it. MedLaw defines its own state, its own actions, its own reducer, its own governance modules. It selects which Laws to compose (3, 4, 8) and implements them with domain expertise (device telemetry, power management, clinician approval). AgentVector provides the constitutional primitives. MedLaw provides the domain expertise. Neither knows the other's internals.`,
      },
    },
    clawlaw: {
      label: "ClawLaw (Reference — TypeScript)",
      desc: "Seraphim's desktop agent jurisdiction. Imports @agentvector/core as a dependency. Architecturally identical to a third-party jurisdiction.",
      color: C.ts,
      tree: [
        { t: "d", n: "clawlaw/", c: "# Separate repo from AgentVector" },
        { t: "f", n: "├── package.json", c: '# "dependencies": { "@agentvector/core": "^1.0" }' },
        { t: "s", n: "│" },
        { t: "d", n: "├── packages/clawlaw-shim/", c: "# OpenClaw gateway plugin" },
        { t: "f", n: "│   ├── src/interceptor.ts", c: "# Intercepts tool calls" },
        { t: "f", n: "│   └── src/ipc.ts", c: "# IPC to Swift sidecar (optional)" },
        { t: "s", n: "│" },
        { t: "d", n: "├── packages/clawlaw-core/", c: "# @agentvector/clawlaw-core" },
        { t: "f", n: "│   ├── src/ClawState.ts", c: "# Domain state (sandbox, budget, auth)" },
        { t: "f", n: "│   ├── src/ClawAction.ts", c: "# shell_exec, file_write, etc." },
        { t: "f", n: "│   ├── src/ClawReducer.ts", c: "# Composes Laws 0, 4, 8" },
        { t: "d", n: "│   ├── src/governance/" },
        { t: "f", n: "│   │   ├── ShellGovernance.ts", c: "# Command whitelisting" },
        { t: "f", n: "│   │   ├── BrowserGovernance.ts", c: "# Domain restrictions" },
        { t: "f", n: "│   │   └── FileSystemGovernance.ts", c: "# R/W scope enforcement" },
        { t: "f", n: "│   └── tests/conformance.test.ts", c: "# Loads AgentVector fixtures" },
        { t: "s", n: "│" },
        { t: "f", n: "└── README.md" },
      ],
      insight: {
        title: "Same pattern, different kernel",
        color: C.ts,
        bg: C.tsBg,
        border: C.tsBorder,
        text: `ClawLaw imports @agentvector/core from npm instead of SwiftVectorCore from SPM. Different package manager, different language, identical architectural relationship. The conformance fixtures in conformance.test.ts load the same JSON files that SwiftVector's test suite uses. Same inputs, same expected verdicts. The dependency boundary is the same — ClawLaw is a consumer, not part of the framework.`,
      },
    },
    dispatchlaw: {
      label: "DispatchLaw (Reference — Swift)",
      desc: "Manned aviation dispatch. Same four Laws as FlightLaw, completely different domain state. Imports SwiftVectorCore as a dependency.",
      color: C.swift,
      tree: [
        { t: "d", n: "dispatchlaw/", c: "# Separate repo from AgentVector" },
        { t: "f", n: "├── Package.swift", c: '# dependencies: [.package(url: "...SwiftVectorCore")]' },
        { t: "s", n: "│" },
        { t: "d", n: "├── Sources/DispatchLaw/", c: "# Domain governance package" },
        { t: "f", n: "│   ├── DispatchState.swift", c: "# Weather, fuel, crew, aircraft" },
        { t: "f", n: "│   ├── DispatchAction.swift", c: "# release_flight, hold, escalate" },
        { t: "f", n: "│   ├── DispatchReducer.swift", c: "# Composes Laws 3, 4, 7, 8" },
        { t: "d", n: "│   ├── Laws/" },
        { t: "f", n: "│   │   ├── ObservationEnforcer.swift", c: "# Weather/NOTAM/crew validation" },
        { t: "f", n: "│   │   ├── ResourceEnforcer.swift", c: "# Fuel reserves, duty time" },
        { t: "f", n: "│   │   ├── SpatialEnforcer.swift", c: "# Runway perf, W&B envelope" },
        { t: "f", n: "│   │   └── AuthorityEnforcer.swift", c: "# Dispatcher→CP→PIC ladder" },
        { t: "d", n: "│   └── Governance/" },
        { t: "f", n: "│       ├── FuelGovernance.swift", c: "# IFR/VFR reserve calcs" },
        { t: "f", n: "│       ├── RunwayGovernance.swift", c: "# Contamination, W&B limits" },
        { t: "f", n: "│       ├── CrewDutyGovernance.swift", c: "# Rest requirements" },
        { t: "f", n: "│       └── AuthorityGovernance.swift", c: "# Escalation documentation" },
        { t: "s", n: "│" },
        { t: "d", n: "├── Tests/DispatchLawTests/" },
        { t: "f", n: "│   ├── DispatchReducerTests.swift", c: "# Domain-specific tests" },
        { t: "f", n: "│   └── ConformanceTests.swift", c: "# Loads AgentVector fixtures" },
        { t: "s", n: "│" },
        { t: "f", n: "└── README.md" },
      ],
      insight: {
        title: "Same Laws, different domain — the proof",
        color: C.swift,
        bg: C.swiftBg,
        border: C.swiftBorder,
        text: `DispatchLaw and FlightLaw both compose Laws 3, 4, 7, 8 through SwiftVector. But DispatchLaw's ObservationEnforcer validates weather and NOTAMs while FlightLaw's validates GPS fix and battery health. DispatchLaw's SpatialEnforcer checks runway performance envelopes while FlightLaw's checks geofences. The Laws are the same. The enforcers are domain-specific. The framework doesn't care what "spatial boundary" means in your domain — it only cares that you evaluate it deterministically and log the verdict.`,
      },
    },
  };

  const current = trees[view];

  return (
    <div style={{ padding: "12px 16px", maxWidth: 740 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {Object.entries(trees).map(([key, t]) => (
          <button key={key} onClick={() => setView(key)} style={{
            background: view === key ? C.surfaceHover : "transparent",
            border: `1px solid ${view === key ? t.color + "66" : C.border}`,
            borderRadius: 6, padding: "6px 12px",
            color: view === key ? t.color : C.textMuted,
            fontFamily: MONO, fontSize: 10, cursor: "pointer",
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{
        padding: "8px 12px", borderRadius: 6, marginBottom: 10,
        borderLeft: `2px solid ${current.color}`,
        background: C.surface, fontSize: 11, fontFamily: SANS,
        color: C.textMuted, lineHeight: 1.55,
      }}>{current.desc}</div>

      <div style={{
        background: C.surfaceDeep, border: `1px solid ${C.border}`, borderRadius: 8,
        padding: "14px 16px", fontFamily: MONO, fontSize: 11, lineHeight: 1.9,
        overflow: "auto",
      }}>
        {current.tree.map((line, i) => {
          if (line.t === "s") return <div key={i} style={{ color: C.textDim }}>{line.n}</div>;
          if (line.t === "h") return <div key={i} style={{ color: C.textDim, fontSize: 9, letterSpacing: "0.05em" }}>{line.n}</div>;
          const isDir = line.t === "d";
          return (
            <div key={i}>
              <span style={{ color: isDir ? C.text : C.textMuted }}>{line.n}</span>
              {line.c && <span style={{ color: C.textDim, fontSize: 10 }}>  {line.c}</span>}
            </div>
          );
        })}
      </div>

      {current.insight && (
        <div style={{
          marginTop: 10, padding: "10px 14px", background: current.insight.bg,
          border: `1px solid ${current.insight.border}`, borderRadius: 8,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: SANS, color: current.insight.color, marginBottom: 4 }}>
            {current.insight.title}
          </div>
          <div style={{ fontSize: 11, fontFamily: SANS, color: C.textMuted, lineHeight: 1.6 }}>
            {current.insight.text}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("arch");

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: SANS }}>
      <div style={{ padding: "20px 16px 0", maxWidth: 740 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Agent<span style={{ color: C.accent }}>Vector</span>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: MONO, marginTop: 2 }}>
          Framework vs. Consumer — how jurisdictions actually work
        </div>

        <div style={{ display: "flex", gap: 2, marginTop: 14, borderBottom: `1px solid ${C.border}` }}>
          {[["arch", "Architecture"], ["code", "Code Structure"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              background: "transparent", border: "none",
              borderBottom: `2px solid ${tab === key ? C.accent : "transparent"}`,
              padding: "8px 16px", color: tab === key ? C.text : C.textMuted,
              fontFamily: MONO, fontSize: 11, cursor: "pointer",
              transition: "all 0.15s", letterSpacing: "0.02em",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {tab === "arch" ? <ArchitectureDiagram /> : <CodeStructure />}
    </div>
  );
}
