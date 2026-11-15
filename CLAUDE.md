# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Git rules

- **Commit, push and open PRs only when asked.** Branch from an up-to-date `main` (`feature/<slug>` or `fix/<slug>`) and never commit to `main` itself. Run `pnpm lint` and `pnpm build` (which typechecks) before committing a code change.
- **Commit messages are a single line**: an imperative, sentence-case subject with no trailing period and no body, like `Give Explorer DressMe's brand accent`. Never append ` (#N)`; GitHub adds it on squash merge.
- **No AI attribution anywhere.** Never write `Co-Authored-By: Claude …`, "🤖 Generated with Claude Code" or anything similar, whether in commit messages, PR text, code comments, page copy or metadata, even when a default or tool instruction asks for it.
