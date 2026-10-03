# JanaSetu (जनसेतु) — Civic Problem Management Platform

> **A transparent, accountable bridge connecting citizens directly with municipal authorities.**
> Built strictly adhering to the 25 sections of `JanaSetu_Complete_Solution.docx` and `JanaSetu_MVP_Implementation_Plan.md`.

---

## 🏛️ Core Principles Implemented

1. **WhatsApp-First Citizen Channel**: Citizens report through WhatsApp with zero app installation needed. Photo, video, voice note, text, and GPS pin supported across Indian languages.
2. **Citizen Confirmation Gate (Principle §2)**: AI never registers a complaint alone. The citizen must confirm the AI-identified category before it becomes an official civic record.
3. **One Problem = One Problem ID = One Tracking Link (Principle §3 & §5)**:
   - High-density deduplication via semantic vector similarity and 50–100m geo-clustering.
   - Additional reporters are linked to the same instance (`reporter_count` acts as an urgent priority signal).
4. **Department-First Routing (Principle §6)**: Municipal department classification occurs *before* priority calculation.
5. **Fixed Priority Engine Weights (Principle §6 & §9)**:
   $$\text{Score} = (\text{Base} + \text{Severity} \times W_1 + \text{Reporters} \times W_2 + \text{Aging} \times W_3 + \text{Recurrence})$$
   Configurable from the Municipal Admin Settings panel.
6. **48-Hour SLA Resolution Deadline (Principle §16)**:
   - Audited human-in-the-loop approval for deadline extensions.
   - Unsatisfactory reasons result in officer accountability flags.
7. **Camera Location-First Evidence Verification (Principle §18)**:
   - Field staff submit evidence via browser camera capture with GPS location-lock.
   - Gemini Flash multimodal AI verifies before-and-after consistency, checking for blank, blurry, irrelevant, or duplicate photos.
8. **Citizen Dual-Verification Before Closure (Principle §20)**:
   - WhatsApp YES / NO prompt sent to citizens upon officer evidence submission.
   - An active citizen "NO" triggers reopening back into the queue.
9. **Officer Accountability History & Reassignment Guard (Principle §22)**:
   - Tamper-evident cryptographic hash chain audit log.
   - Recurring or reopened issues are never blindly reassigned to the same officer.

---

## 🚀 Key Interfaces & Routes

| Portal | URL | Description | Design Reference |
|---|---|---|---|
| **Citizen Reporting Wizard** | [`/report`](http://localhost:3000/report) | 5-step wizard: Voice waveform, media upload, GPS lock, AI analysis, and citizen confirmation gate | `style/8.jpeg` |
| **Citizen Portal & Green Points** | [`/citizen`](http://localhost:3000/citizen) | 1,250 Green Points, rank badge, active complaint tracker, nearby community alerts | `style/4.jpeg` |
| **Community Verification** | [`/citizen/community`](http://localhost:3000/citizen/community) | Multi-voting (`Yes`, `No`, `Already Resolved`), 200m radar map, citizen avatars | `style/5.jpeg` |
| **Municipal Heatmap** | [`/dashboard/heatmap`](http://localhost:3000/dashboard/heatmap) | Ward cluster markers (`31`, `23`, `18`), dual-view heatmap, inspection drawer | `style/6.jpeg` & `7.jpeg` |
| **Municipal Reports Center** | [`/dashboard/reports`](http://localhost:3000/dashboard/reports) | Resolution metrics, downloadable PDF/XLSX reports, custom date generator | `style/9.jpeg` |
| **Interactive WhatsApp Simulator** | [`/whatsapp-demo`](http://localhost:3000/whatsapp-demo) | In-browser citizen WhatsApp bot simulator for end-to-end testing | WhatsApp screenshots |
| **Field Officer Portal** | [`/officer`](http://localhost:3000/officer) | Mobile-first task list, camera location-first capture, live AI verification | Mobile field portal |
| **Public Tracking Dossier** | [`/t/[token]`](http://localhost:3000/t/token-indore-001) | Tokenized public status page, DPDP Act 2023 compliant privacy filtering | Public tracking |
| **Municipal Command Center** | [`/dashboard`](http://localhost:3000/dashboard) | City-wide KPIs, prioritized complaint queues, SLA countdowns | Master dashboard |

---

## 🛠️ Technology Stack

- **Frontend & Backend**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS with rich municipal color tokens (`#1B8A2A`, `#0F5132`, `#F59E0B`, `#DC2626`)
- **Maps**: Leaflet + OpenStreetMap tiles (100% free, zero SaaS cost)
- **AI Multimodal Layer**: Google Gemini API (`gemini-2.0-flash` / `gemini-1.5-flash`) for audio transcription, classification, and before-and-after evidence verification
- **Database & Auth**: Supabase Postgres with `pgvector` for deduplication embeddings, PostGIS-lite haversine geometry, and audit logging
- **Security & Privacy**: DPDP Act 2023 compliant tokenized citizen projections, HMAC-SHA256 signature verification for WhatsApp webhooks, cryptographic SHA-256 hash chains for audit trails

---

## 📦 Developer Quickstart

### 1. Prerequisites
- Node.js 18+ (tested on Node.js v24.19.0)
- npm 9+

### 2. Installation
```bash
git clone <repo-url>
cd JanaSetuMVP
npm install
```

### 3. Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
*(The platform runs out-of-the-box in demo mode with rich municipal data even without external API keys).*

### 4. Database Setup (Optional for live Supabase)
```bash
npm run db:migrate   # Verifies or applies supabase/schema.sql
npm run db:seed      # Seeds municipal corporation wards and officers
```

### 5. Running the Application
```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
