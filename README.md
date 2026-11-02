# `CR1MS0N-Operator/.github`

The one CI home for the estate. Two files, no runtime:

- **`commitlint.config.cjs`** — the single conventional-commit policy: header ≤ 100 characters,
  body and footer line-length rules disabled (prose wraps in git; enforcing a column produced red
  builds for no readability gain), merge messages ignored. Proven locally before it was pushed:
  a 118-character header fails, a 175-character body line passes, `type-enum` still fails on a
  bad type.
- **`.github/workflows/commitlint.yml`** — the reusable workflow (`on: workflow_call`).

Repositories in the estate carry a six-line caller and **no local config**. A local
`commitlint.config.cjs` would silently override the shared policy, which is the one failure this
design cannot tolerate.

## Calling it

```yaml
name: Lint Commits

on:
  pull_request:
  push:
    branches: [main]

jobs:
  conventional-commits:
    uses: CR1MS0N-Operator/.github/.github/workflows/commitlint.yml@main
```

## Why a reusable workflow and not copies

Before this repo existed the estate held **five byte-identical copies** of the 35-line workflow and
**six byte-identical configs** — the same git blob shas in each repository — plus one repository
(`nightforge`) with a config and nothing consuming it. One policy in one place means a rule change
is a single commit, and a repository cannot disagree with the policy it claims to follow.

## Two behaviours that are load-bearing

1. **`fetch-depth: 0`** — commitlint now throws *"Cannot find merge-base … (e.g., a shallow clone)"*
   on a shallow checkout.
2. **The sentinel** — commitlint exits **0** when a commit range resolves to nothing (a merge-only
   push, a backwards range), so a green job does not prove a commit was linted. The workflow counts
   **non-merge** commits in the resolved range and fails the run when the count is zero.

## What this is not

Not an application, not a service, and not a home for build logic. Build jobs stay in the
repository that owns the build. Stage 2 adds the `no-mistakes` attestation caller here once a gate
agent is authenticated on the workstation.
