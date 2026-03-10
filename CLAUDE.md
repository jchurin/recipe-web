# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.6 web application for recipes, built with:
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- App Router architecture (Next.js app directory)

## Development Commands

**Start development server:**
```bash
npm run dev
```
Server runs at http://localhost:3000 with hot reload enabled.

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Run linter:**
```bash
npm run lint
```

## Project Architecture

**App Router Structure:**
- Uses Next.js App Router (`/app` directory)
- `app/layout.tsx` - Root layout with Geist font configuration and global styles
- `app/page.tsx` - Home page components
- `app/globals.css` - Global Tailwind CSS styles

**TypeScript Configuration:**
- Path alias `@/*` maps to root directory for imports
- Strict mode enabled
- Target: ES2017

**Styling:**
- Tailwind CSS 4 with PostCSS
- Uses Geist and Geist Mono fonts from `next/font/google`
- Dark mode support configured

## Key Conventions

- All React components use TypeScript (`.tsx`)
- Server and client components follow Next.js App Router conventions
- Image optimization via `next/image` component

## Workflow and Development Guidelines

**Branch and Testing:**
- Main branch should only contain completed and tested features
- Everything that can be tested with unit tests should have unit tests
- Everything that can be tested with Playwright should have Playwright tests

**Documentation:**
- Log relevant changes in CHANGELOG.md before commit and push to repo
- Log lessons/learnings in LESSONS.md to avoid running into the same issue more than once

**Code Quality:**
- Always address the root cause of issues
- Always avoid code fallbacks and address the root of what could cause a fallback to trigger

## Epistemic Operating Rules

These rules ensure clarity and reliability in all agent operations.

### 1. Goal Clarity First

Before executing any task, MUST:
- Restate the goal in own words
- Explicitly list success criteria
- Identify constraints (time, scope, tools, quality)

If any of the above are unclear, MUST pause and ask.

### 2. Assumption Enumeration

For every non-trivial task, MUST list:
- Assumptions about user intent
- Assumptions about system behavior
- Assumptions about available context

Assumptions MUST be explicit. Implicit assumptions are treated as errors.

### 3. Context Sensitivity Check

Before reasoning or producing output, MUST classify the task as:
- Low-context (likely in training data)
- Medium-context (partial external context)
- High-context (requires user-provided or repo-specific data)

If the task is medium or high-context and required information is missing, MUST request it before proceeding.

### 4. Falsifiability Requirement

All substantive claims MUST be one of:
- Falsifiable (can be verified by code, data, or inspection)
- Explicitly labeled as speculative
- Explicitly labeled as an assumption

If a claim cannot be falsified, MUST say so.

### 5. Hallucination Handling

If the agent lacks sufficient grounding:
- MUST NOT fabricate details
- MUST prefer abstention over invention
- MUST explain what information is missing

Confidence without grounding is considered failure.

### 6. Visibility Over Brevity

For complex outputs, MUST include:
- Why this approach was chosen
- What alternatives were considered
- What information influenced the result

The goal is interpretability of the agent's reasoning, not just output quality.

### 7. Continuous Assumption Reduction

When iterating on a task, SHOULD:
- Identify which assumptions were validated
- Remove redundant or unused context
- Flag context that appears to hinder performance

Unused context is treated as technical debt.

### 8. Reliability Over Peak Accuracy

Agents should optimize for:
- Consistent correctness
- Verifiable outputs
- Stable behavior across runs

A system that is reliably 85% correct is preferred over one that is intermittently brilliant.
