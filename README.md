# AgentVector

**Law at the Edge.** Deterministic governance for autonomous agents — a constitutional framework for building **reproducible, auditable, safety-minded** AI systems.

**Core principle:** *Intelligence may be probabilistic. Authority must be deterministic.*

> AgentVector is a governance framework: composable Laws define what agents can do, Enforcement Kernels compile those Laws into language-specific guarantees, and a shared Conformance Suite proves they agree. One Codex. Multiple kernels. Deterministic safety wherever agents run.

---

## If You're Evaluating This Repository

**5 minutes to understand the pattern:**

1. **Read the core loop** (below) — this is the entire idea
2. **Read the Codex** — the constitutional framework: Laws, architecture, philosophy  
   → [`The AgentVector Codex`](./docs/agentvector-codex-v2_0.md)
3. **Read the kernel spec** — why the reference implementation is Swift  
   → [`SwiftVector: The Reference Kernel`](./whitepaper/SwiftVector-Whitepaper.md)

The point isn't clever prompts. The point is **governance + reproducibility**: you can explain what happened, reproduce it, and prove what was allowed or denied — regardless of which language the governance kernel runs in.

---

## The Problem AgentVector Solves

Most multi-agent systems fail the same way:

- Prompts become the source of truth
- Memory becomes an append-only text log
- Agents mutate state implicitly
- Failures cannot be replayed or explained

This creates what AgentVector calls the **Stochastic Gap** — the divergence between user intent and model output. Frameworks like LangChain attempt to manage this gap through increasingly complex prompt engineering. That approach scales poorly.

AgentVector takes a different position: **constrain authority, not intelligence.**

Agents remain free to reason, explore, and generate ideas. They are never allowed to redefine truth. Truth lives in state, not in language.

---

## Architecture

```
┌─────────────────┐
│  Agent (LLM/AI) │
└────────┬────────┘
         │ propose
         ▼
┌─────────────────┐
│ Reducer / Policy│  ◄── deterministic gatekeeper
│   (pure func)   │
└────────┬────────┘
         │ accept / reject
         ▼
┌─────────────────┐      ┌─────────────────┐
│   State Store   │─────►│   Audit Log     │
│ (source of truth)│      │  (replayable)   │
└─────────────────┘      └─────────────────┘
```

**The Deterministic Control Loop:**

```
State → Agent → Action → Reducer → New State
```

- **State** is the single source of truth
- **Agents** reason about state and propose Actions
- **Reducers** validate and apply state transitions (deterministic, pure functions)
- **Effects** perform I/O after transitions, never during

The reducer is the gatekeeper. You can change models, prompts, and agent strategies without changing the rules of state.

**The Multi-Kernel Architecture:**

```
┌──────────────────────────────────────────────────────────┐
│  AGENTVECTOR FRAMEWORK (this repo)                       │
│                                                          │
│  Codex — Laws 0–10 (language-agnostic specification)     │
│  Conformance Suite — JSON fixtures (the contract)        │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ SwiftVector  │  │ TSVector    │  │ RustVector  │     │
│  │ Swift        │  │ TypeScript  │  │ Rust        │     │
│  │ Reference    │  │ Integration │  │ Deferred    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
├──────────────────────────────────────────────────────────┤
│  Jurisdictions consume the framework (separate repos):   │
│                                                          │
│  ClawLaw ──────── imports @agentvector/core (TSVector)   │
│  DispatchLaw ──── imports SwiftVectorCore (SwiftVector)  │
│  FlightLaw ────── imports SwiftVectorCore (SwiftVector)  │
│  ChronicleLaw ── imports SwiftVectorCore (SwiftVector)   │
│  YourLaw ──────── imports whichever kernel fits          │
└──────────────────────────────────────────────────────────┘
```

---

## What's in This Repository

This repository ships the governance framework: constitutional specification, enforcement kernels, and conformance infrastructure. Domain-specific jurisdictions live in their own repos.

### The Codex

| Document | Description |
|----------|-------------|
| [**The AgentVector Codex**](./docs/agentvector-codex-v2_0.md) | Constitutional framework: composable Laws, multi-kernel architecture, domain-specific governance |

### Kernel Specification

| Document | Description |
|----------|-------------|
| [**SwiftVector: The Reference Kernel**](./whitepaper/SwiftVector-Whitepaper.md) | Why the reference implementation is Swift — type safety, Actor isolation, conformance fixture derivation |

### Manifestos

| Document | Description |
|----------|-------------|
| [**The Agency Paradox**](./manifestos/Agency-Paradox.md) | Human command and governance in AI-driven development |

### Conformance Suite (planned)

| Artifact | Description |
|----------|-------------|
| `Schemas/` | JSON Schema definitions for the reducer contract: state, action, verdict, config |
| `Fixtures/` | Conformance test fixtures — the contract between kernels |

### Reference Implementation

| Project | Description |
|---------|-------------|
| [**NarrativeDemo**](./examples/NarrativeDemo) | Xcode project demonstrating the full pattern: agent proposals, reducer validation, state transitions, and audit replay |

> **Why a narrative demo?** Long-running narrative systems expose every failure mode of agent architectures — state drift, hallucinated facts, non-replayable failures. If the pattern works here, it works anywhere.

---

## Domain Laws (Jurisdictions)

Domain Laws are **consumers** of the AgentVector framework, not parts of it. Each lives in its own repository and declares a dependency on an AgentVector kernel package. The framework does not know they exist.

AgentVector governs through domain-specific compositions of Laws. Each Domain Law selects the Laws relevant to its domain, compiles them through an Enforcement Kernel, and provides the governance modules for its operational context.

| Domain Law | Kernel | Laws | Domain |
|------------|--------|------|--------|
| [**ClawLaw**](https://github.com/stephen-sweeney/ClawLaw) | TSVector (TypeScript) | Boundary, Resource, Authority | Desktop agents with tool access (OpenClaw) |
| **DispatchLaw** | SwiftVector (Swift) | Observation, Resource, Spatial, Authority | Manned aviation dispatch and flight release |
| **FlightLaw** | SwiftVector (Swift) | Observation, Resource, Spatial, Authority | Autonomous drone operations |
| **ChronicleLaw** | SwiftVector (Swift) | Persistence, Authority | AI-assisted storytelling |

**ClawLaw** is in active development — governing desktop agents like OpenClaw through a TypeScript enforcement kernel that integrates natively with the Node.js ecosystem.

**DispatchLaw** applies the identical four Laws as FlightLaw to manned aviation operations — fuel reserves instead of battery health, runway performance instead of geofences, dispatcher/chief pilot/PIC authority ladder instead of operator approval. Same governance pattern, completely different domain state.

---

## Enforcement Kernels

| Kernel | Language | Role | Trust Basis |
|--------|----------|------|-------------|
| **SwiftVector** | Swift | Reference kernel | Compile-time type safety, Actor isolation, value types |
| **TSVector** | TypeScript | Integration kernel | Conformance-tested against reference; native to Node.js agent ecosystems |
| **RustVector** | Rust | Transport layer (deferred) | Ownership model, `no_std` for protocol handling |

**SwiftVector** is the reference — conformance fixtures are derived from its test suite. When the specification is ambiguous, SwiftVector's behavior is authoritative.

**TSVector** provides native integration with the ecosystem where most agents live. Weaker static guarantees, compensated by verified equivalence with the reference kernel through the Conformance Suite.

**RustVector** handles transport-layer determinism (MAVLink protocol handling for drone telemetry). Governance decisions remain in SwiftVector or TSVector. Deferred until transport requirements demand it.

---

## Design Constraints

AgentVector is designed to be:

- **Deterministic at decision points** — reducers and policies are pure functions
- **Model-agnostic** — works with any LLM, local or cloud
- **Language-agnostic** — the Laws are universal; enforcement is kernel-specific
- **Auditable by construction** — every state change is logged and replayable

AgentVector is **not**:

- A promise of "perfect AI"
- A flight-certified autopilot
- A replacement for formal safety certification processes

The pattern enables certification. It does not replace it.

---

## Why Swift as the Reference?

AgentVector's architectural principles apply to any language. The *guarantees* depend on the Enforcement Kernel.

| Context | Any Kernel | SwiftVector Required |
|---------|------------|----------------------|
| Research & prototyping | ✓ | |
| Desktop agent governance | ✓ (TSVector) | |
| **Safety-critical systems** | | ✓ Certification required |
| **Regulated industries** | | ✓ Compile-time proof required |
| **Conformance fixture derivation** | | ✓ Reference must be most trustworthy |

The reference kernel is the one from which all conformance tests are derived. If the reference is wrong, every conformant kernel inherits the error. Swift provides:

- **Compile-time type safety** — no runtime type errors
- **Actor isolation** — compiler-enforced concurrency safety
- **Deterministic memory** — no GC pauses, stable iteration order
- **Reproducible execution** — same binary, same inputs → identical outputs

For systems where correctness is a *preference*, use whatever kernel integrates with your platform. For systems where correctness is a *requirement*, SwiftVector's compile-time guarantees are the foundation.

---

## Roadmap

**Current Focus**
- ClawLaw v1.0: governed desktop agents via TSVector, end-to-end on Mac Mini
- Conformance Suite: JSON fixtures + schemas for Laws 0, 4, 8
- DispatchLaw: governed flight release for manned aviation operations

**Near Term**
- `@agentvector/clawlaw-core` npm package (TSVector governance reducer)
- StackMint pipeline integration via native TypeScript dependency
- 15+ conformance fixtures passing in both Swift and TypeScript

**Future**
- Formal verification of reducer state machine properties
- RustVector transport layer for FlightLaw telemetry
- SBIR funding acquisition for FAA-aligned governance tooling
- Community contributions welcome once conformance suite stabilizes

---

## Contributing

Questions, suggestions, or discussion about applications? Open an issue.

Pull requests welcome for documentation improvements, conformance fixture contributions, or bug fixes.

---

## License

- **Code:** MIT
- **Documentation:** CC BY 4.0
- **Conformance Fixtures:** CC BY 4.0

---

## Author

**Stephen Sweeney**

- Website: [agentincommand.ai](https://agentincommand.ai)
- GitHub: [github.com/stephen-sweeney](https://github.com/stephen-sweeney)
- LinkedIn: [linkedin.com/in/macsweeney](https://linkedin.com/in/macsweeney)
- Email: stephen@agentincommand.ai
