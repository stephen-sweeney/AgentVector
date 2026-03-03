# AgentVector Rebrand: Execution Plan for Claude Code

## Context

SwiftVector is being renamed to AgentVector. SwiftVector remains as the name of the Swift Enforcement Kernel (the reference kernel). The project is now a multi-kernel governance framework.

### What IS the AgentVector Framework

The framework repo ships:

- **The Codex** — constitutional philosophy, Laws 0–10, architecture specification
- **The Conformance Suite** — JSON schemas and test fixtures (the contract between kernels)
- **SwiftVector** — the Swift Enforcement Kernel (reference). Package: `SwiftVectorCore`
- **TSVector** — the TypeScript Enforcement Kernel (integration). Package: `@agentvector/core`
- **RustVector** — the Rust transport kernel (deferred, reserved)
- **NarrativeDemo** — an example consumer app demonstrating the pattern (lives in `examples/`)

The framework is domain-agnostic by construction. It provides protocols, audit trail, and conformance infrastructure. It contains zero domain-specific governance logic.

### What is NOT in the AgentVector Framework

Jurisdictions (Domain Laws) are **consumers** of the framework, not parts of it. They live in their own repositories and declare a dependency on an AgentVector kernel — exactly the way a third-party implementer would.

| Jurisdiction | Repo | Depends On | Status |
|---|---|---|---|
| **ClawLaw** | `clawlaw/` (separate repo) | `@agentvector/core` (npm) | Active development |
| **DispatchLaw** | `dispatchlaw/` (separate repo) | `SwiftVectorCore` (SPM) | New |
| **FlightLaw** | `flightlaw/` (separate repo) | `SwiftVectorCore` (SPM) | Planned |
| **ChronicleLaw** | `chroniclelaw/` (separate repo) | `SwiftVectorCore` (SPM) | In development |

These jurisdictions happen to be built by the framework author. Architecturally they are identical to a hypothetical "MedLaw" or "WarehouseLaw" built by a stranger. The framework does not know they exist. They import the framework; the framework never imports them.

**The test:** If you removed all four jurisdictions from the world, the framework would still build, still pass its tests, and still be complete. That's the boundary.

### Naming Rules

These are non-negotiable. Every commit must follow them:

| Term | Refers To | Usage |
|------|-----------|-------|
| AgentVector | The framework, the Codex, the Laws, the architecture | "AgentVector is a governance framework" |
| SwiftVector | The Swift Enforcement Kernel specifically | "SwiftVector is the reference kernel" |
| SwiftVectorCore | The Swift package/module (unchanged in code) | `import SwiftVectorCore` stays |
| TSVector | The TypeScript Enforcement Kernel | "TSVector is the integration kernel" |
| RustVector | The Rust transport kernel (deferred) | "RustVector is reserved for transport-layer determinism" |
| ClawLaw, DispatchLaw, etc. | External consumers (separate repos) | "ClawLaw imports @agentvector/core" — never "ClawLaw is part of AgentVector" |

**The naming test:** If you can replace the term with "the framework" and the sentence still makes sense, use AgentVector. If you can replace it with "the Swift kernel" and the sentence still makes sense, use SwiftVector. If both work, prefer AgentVector.

**The boundary test:** If a sentence implies a jurisdiction lives inside the framework repo, it's wrong. Jurisdictions *consume* the framework. They *import* a kernel. They do not *reside in* the framework.

### Source Documents

The following revised documents define the target state for content. Use them as the authoritative reference, but note that both the README and the Codex contain architecture diagrams that embed jurisdictions visually within the framework. These diagrams need correction during the relevant commits (see Commit 2 and Commit 3 notes).

- `agentvector-codex-v2_0.md` — The constitutional framework (replaces swiftvector-codex-v1_2.md)
- `swiftvector-kernel-spec-v2_0.md` — The reference kernel specification (replaces SwiftVector-Whitepaper.md)
- `README.md` — The revised project README (**requires diagram correction — see Commit 2**)

These files are in the project outputs. Read them before starting any commit.

---

## Commit Plan

Execute these in order. Each commit must leave the project in a buildable, testable state. Run verification after each commit.

---

### Commit 1: CLAUDE.md — Update project source of truth

**Why first:** CLAUDE.md governs all subsequent agent work. Every future commit references it. If it's wrong, everything downstream is wrong.

**Changes:**

1. Update the header/preamble:
   - "Source of Truth for Multi-Agent Workflows in **AgentVector**" (was SwiftVector)
   - Update the alignment statement: "Align with AgentVector Codex and SwiftVector Kernel Specification" (was "SwiftVector whitepaper")
   - Add: "AgentVector is the governance framework. SwiftVector is the Swift Enforcement Kernel (reference implementation). See Naming Rules and Architecture Boundary below."

2. Add a Naming Rules section (copy the table from this plan). Place it immediately after the preamble, before Current Module Map. This is the most important addition.

3. Add an Architecture Boundary section immediately after Naming Rules:
   - "This repo IS the AgentVector framework: Codex, Conformance Suite, SwiftVectorCore (Swift kernel), @agentvector/core (TS kernel), and NarrativeDemo (example consumer)."
   - "This repo is NOT: ClawLaw, DispatchLaw, FlightLaw, ChronicleLaw, or any other jurisdiction. Jurisdictions are separate repos that depend on this framework. They import a kernel package. The framework never imports them."
   - "NarrativeDemo is an example app that lives in `examples/` to demonstrate the pattern. It is a consumer of SwiftVectorCore, not a framework component."

4. Update Current Module Map:
   - SwiftVectorCore stays as-is (it's the Swift package name)
   - NarrativeDemo description: "Example consumer app demonstrating AgentVector patterns through the SwiftVector kernel"
   - Update Whitepaper reference: "SwiftVector Kernel Specification in repo docs"
   - Update GitHub repo URL if org has changed

5. Update Doc Sync rule:
   - "If a commit changes public API, behavior, or Phase 2 protocols, include doc diffs (README + Codex/Kernel Spec where applicable) in the same commit."

6. Update Definition of Done references:
   - Whitepaper references → "Kernel Specification" or "Codex" as appropriate

7. Add to the invariants/non-negotiables:
   - "No domain-specific types in SwiftVectorCore. Domain logic belongs in consumer repos (jurisdictions), never in the framework."
   - This reinforces the existing dependency leak prevention rules in swiftvector-invariants.md but makes the principle explicit at the CLAUDE.md level.

8. Leave all build commands, verification workflows, and risk mitigations unchanged. These are SwiftVectorCore-specific and correct.

**Verification:**
- `swift build` passes
- `swift test` passes
- No functional changes — this is documentation only

**Commit message:** `docs: update CLAUDE.md for AgentVector rebrand — naming rules, architecture boundary, doc references`

---

### Commit 2: README.md — Replace project README (with diagram correction)

**Changes:**

1. Start from the revised README in project outputs, but **fix the multi-kernel architecture diagram** before committing. The current draft (lines 78-91) nests jurisdictions inside the framework box. This is architecturally wrong.

**Replace the diagram with one that shows the boundary:**

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

The lower section is visually separated and labeled "separate repos." The `imports` keyword makes the dependency direction explicit.

2. Update the "Domain Laws (Jurisdictions)" section to open with:
   - "Domain Laws are **consumers** of the AgentVector framework, not parts of it. Each lives in its own repository and declares a dependency on an AgentVector kernel package. The framework does not know they exist."

3. Update the "What's in This Repository" section to be explicit:
   - Add a one-line framing at the top: "This repository ships the governance framework: constitutional specification, enforcement kernels, and conformance infrastructure. Domain-specific jurisdictions live in their own repos."

4. Verify all internal links point to files that exist (or will exist after Commit 3).

**Verification:**
- `swift build` passes
- All markdown links resolve
- The diagram clearly shows the framework/consumer boundary

**Commit message:** `docs: replace README for AgentVector rebrand — framework/consumer boundary, multi-kernel architecture`

---

### Commit 3: Replace Codex and Kernel Specification documents

**Changes:**

1. Place `agentvector-codex-v2_0.md` in the appropriate docs location. If a `codex/` directory doesn't exist, create it.

2. Replace `SwiftVector-Whitepaper.md` content with `swiftvector-kernel-spec-v2_0.md` content. Keep the file at its current path if other files reference it, OR move it and update all references. Choose whichever approach produces fewer broken links.

3. **Codex diagram note:** The Codex v2.0 architecture diagram (Section III) shows jurisdictions below the Deployment Boundary. This is conceptually correct — the Codex describes the *system architecture* including consumers. However, add a clarifying note after the diagram:
   > "Domain Laws are shown here to illustrate the complete system architecture. In practice, each Domain Law is an independent package that imports the framework as a dependency. The framework repo contains the layers above the Deployment Boundary."

   This one sentence prevents a reader from thinking FlightLaw ships inside the AgentVector package.

4. Update any cross-references between the two documents to use correct relative paths.

5. If `swiftvector-codex-v1_2.md` exists as a separate file in the repo, archive it (move to an `archive/` directory) rather than deleting it.

**Important:** Do NOT rename the `whitepaper/` directory in this commit if other build scripts or CI reference it. Prefer placing the new file alongside the old and updating references.

**Verification:**
- All markdown links between Codex, Kernel Spec, and README resolve correctly
- `swift build` passes
- `swift test` passes

**Commit message:** `docs: add AgentVector Codex v2.0, update SwiftVector Kernel Specification v2.0`

---

### Commit 4: Update manifestos and supporting documents

**Changes:**

1. **Agency-Paradox.md**:
   - Replace "SwiftVector" with "AgentVector" where it refers to the framework
   - Keep "SwiftVector" where it refers to the Swift kernel specifically
   - Apply the naming test from the Naming Rules table
   - Update any links to the whitepaper → kernel specification

2. **Swift-at-the-Edge.md** (if still in repo):
   - This document's thesis is Swift-specific, so "SwiftVector" references to the kernel are likely correct
   - Update framework-level references to AgentVector
   - Add a note that this document is being revised as "Law at the Edge" (if that's the plan)

3. **Any other .md files in manifestos/ or docs/**:
   - Apply the same naming rules
   - Update cross-references
   - Check for any text that implies jurisdictions are framework components and correct it

**Verification:**
- All markdown links resolve
- No remaining instances of "SwiftVector" that should be "AgentVector" (grep and review)
- `swift build` passes

**Commit message:** `docs: update manifestos and supporting docs for AgentVector rebrand`

---

### Commit 5: Update Swift source file headers and comments

**Scope:** Documentation comments, file headers, and inline comments only. NO functional code changes.

**Changes:**

1. Grep all `.swift` files for "SwiftVector" in comments, doc comments, and string literals
2. Apply naming rules:
   - `/// SwiftVector's control loop...` → `/// AgentVector's control loop...` (framework concept)
   - `/// SwiftVector uses Actor isolation...` → stays as "SwiftVector" (kernel-specific)
   - `import SwiftVectorCore` → UNCHANGED (this is the module name)
   - Any `print()` or logging strings that say "SwiftVector" → update if framework-level
3. Update file headers (copyright/description blocks) to reference AgentVector where they describe the framework

**DO NOT change:**
- Module names (`SwiftVectorCore` stays)
- Type names
- Protocol names
- Test target names
- Package.swift
- Any functional code

**Verification:**
- `swift build` passes
- `swift test` passes
- `grep -rn "SwiftVector" Sources/ Tests/` — review every remaining instance. Each should be either:
  - `import SwiftVectorCore` (correct — module name)
  - A reference to the Swift kernel specifically (correct — naming rules)
  - A type/protocol name (correct — not renamed in this phase)

**Commit message:** `docs: update Swift source comments and headers for AgentVector rebrand`

---

### Commit 6: Update agent prompt files

**Changes:**

1. Update all agent prompt/persona files to reflect AgentVector:
   - `swiftvector-architect.md` — Update to reference AgentVector framework, SwiftVector kernel. Add the architecture boundary rule: "Domain logic belongs in consumer repos, never in SwiftVectorCore."
   - `swiftvector-reviewer.md` — Same treatment. The reviewer should flag any PR that adds domain-specific types to the framework.
   - `swiftvector-invariants.md` — Update framework references; keep SwiftVectorCore module references. Add the framework/consumer boundary as an invariant: "SwiftVectorCore must never import or reference any jurisdiction (ClawLaw, DispatchLaw, FlightLaw, ChronicleLaw, or any other Domain Law)."
   - `library-extractor.md` — Update framework references. The dependency leak prevention rules already cover this, but reinforce with AgentVector naming.
   - `swift-expert.md` — Likely needs minimal changes (Swift-specific)
   - `chroniclers-ledger.md` — Update to reference ChronicleLaw as a consumer of the AgentVector framework through SwiftVector

2. For each file, apply both the naming test and the boundary test. These prompts guide future agent work, so getting both the naming and the architecture right here prevents compounding errors.

3. Consider whether any agent prompts need new content:
   - `swiftvector-architect.md` should mention TSVector, the Conformance Suite, and the framework/consumer boundary
   - `swiftvector-invariants.md` should add: "No jurisdiction imports in SwiftVectorCore" to the forbidden imports list
   - Use judgment — add a sentence or two where it clarifies scope, but don't rewrite entire prompts

**Verification:**
- Read each updated file and verify naming consistency
- Verify no prompt implies jurisdictions are framework components
- No build verification needed (these are prompt files, not code)

**Commit message:** `docs: update agent prompts for AgentVector rebrand — naming rules, architecture boundary`

---

## Post-Commit Verification

After all six commits, run the full verification suite:

```bash
# Core build and test
swift build
swift test

# Consumer verification (if NarrativeDemo is buildable)
cd examples/NarrativeDemo
xcodebuild -project NarrativeDemo.xcodeproj \
  -scheme NarrativeDemo \
  -destination 'platform=iOS Simulator,name=iPhone 15' \
  build

# Naming audit
echo "=== Remaining 'SwiftVector' references (review each) ==="
grep -rn "SwiftVector" --include="*.md" --include="*.swift" . | grep -v "SwiftVectorCore" | grep -v "archive/" | grep -v ".build/"

# Architecture boundary audit
echo "=== Checking for boundary violations ==="
echo "These phrases should NOT appear in docs (jurisdictions are not framework components):"
grep -rn "part of AgentVector" --include="*.md" . || echo "  ✓ No 'part of AgentVector' violations"
grep -rn "ships with\|included in\|contains.*Law" --include="*.md" . | grep -i "claw\|dispatch\|flight\|chronicle" || echo "  ✓ No jurisdiction-in-framework violations"

# Link audit
echo "=== Broken markdown links ==="
grep -rohn '\[.*\](\./[^)]*\.md)' --include="*.md" . | while read line; do
  file=$(echo "$line" | sed 's/.*(\.\///' | sed 's/).*//')
  if [ ! -f "./$file" ]; then
    echo "BROKEN: $line -> $file"
  fi
done
```

Every remaining "SwiftVector" instance should be one of:
- `SwiftVectorCore` (module name — correct)
- `SwiftVector` referring to the Swift kernel (correct)
- Inside `archive/` (old versions — correct)

Every reference to a jurisdiction should use `imports` or `depends on` language, never `contains` or `part of`.

---

## What This Plan Does NOT Cover

These are separate work items, not part of the rebrand:

**Framework-level (future work within this repo):**
- **Renaming the Swift package** (`SwiftVectorCore` → `AgentVectorCore` or similar) — Breaking change affecting all consumers. Requires migration plan with deprecation aliases. Defer until multi-kernel architecture is proven.
- **Creating the `@agentvector/core` npm package** — TSVector lives in this repo but the npm package doesn't exist yet. Covered by the ClawLaw Development Plan.
- **Building out the Conformance Suite** — `Schemas/` and `Fixtures/` directories need to be created and populated. Covered by the ClawLaw Development Plan, Phase 2.

**Consumer-level (separate repos, separate work):**
- **ClawLaw implementation** — Separate repo. Imports `@agentvector/core`. Covered by ClawLaw Development Plan.
- **DispatchLaw implementation** — Separate repo. Imports `SwiftVectorCore`. No code exists yet.
- **FlightLaw implementation** — Separate repo. Imports `SwiftVectorCore`. Formerly the Flightworks GCS work.
- **ChronicleLaw implementation** — Separate repo. Imports `SwiftVectorCore`. Formerly embedded in Chronicle Quest.

**Infrastructure:**
- **Renaming the GitHub repository** — Coordinate with GitHub org creation (`agentvector/`). Separate from content changes.
- **Updating the agentincommand.ai website** — Separate deployment. The docs in this repo feed the site, but the site build is a different workflow.

**Content:**
- **Removing or archiving outdated content** (e.g., `Swift-at-the-Edge.md` if being replaced by "Law at the Edge") — Flag for review but don't delete in this pass.

---

## Architectural Invariant: The Framework/Consumer Boundary

This invariant must survive every future commit, not just the rebrand:

```
AgentVector Framework (this repo)
    ├── Codex (specification)
    ├── Conformance Suite (contract)
    ├── SwiftVectorCore (Swift kernel — protocols, audit, DI)
    ├── @agentvector/core (TS kernel — types, reducer, audit)
    └── examples/NarrativeDemo (example consumer)

Consumer Jurisdictions (separate repos, import the framework)
    ├── ClawLaw ──── imports @agentvector/core
    ├── DispatchLaw ── imports SwiftVectorCore
    ├── FlightLaw ──── imports SwiftVectorCore
    ├── ChronicleLaw ── imports SwiftVectorCore
    └── YourLaw ────── imports whichever kernel fits
```

**Rules:**
1. The framework repo never imports a jurisdiction.
2. A jurisdiction declares a dependency on exactly one kernel package.
3. `SwiftVectorCore` must build and pass tests with zero knowledge of any jurisdiction.
4. `@agentvector/core` must build and pass tests with zero knowledge of any jurisdiction.
5. NarrativeDemo lives in `examples/` as a demonstration of how consumers use the framework. It is not a jurisdiction — it is a teaching tool.
6. The Conformance Suite fixtures are framework-level (they test kernel behavior). Jurisdiction-specific test fixtures live in the jurisdiction's own repo.
7. If you can't tell whether something belongs in the framework or a jurisdiction, apply the removal test: "If I deleted all jurisdictions, would the framework still be complete?" If yes, it belongs in the framework. If no, it belongs in a jurisdiction.
