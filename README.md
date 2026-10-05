<div align="center">

<img src="frontend/public/logo.svg" alt="Jardam" height="64" />

# Jardam · Жардам

**Every som in the open. Every document verified by AI.**
*Бардык сом ачык. Ар бир документ жасалма интеллект менен текшерилет.*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://postgresql.org)
[![Groq AI](https://img.shields.io/badge/Groq_AI-F55036)](https://groq.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black)](https://render.com)

</div>

---

## 💚 The problem

In Kyrgyzstan, people and NGOs raise money every day, and fraud makes donors hesitate. Donors can't see proof, statistics or official documents. **Jardam** is a feed of fundraising campaigns where every one comes with its paperwork, its budget and an AI trust report.

## ✨ Key features

- 🤖 **AI document verification**: Groq analyses uploaded stamps, IDs and bills. A confidence score of **≥ 0.85** gives a *Verified by AI* badge, and anything less goes to *Pending Human Review*.
- 📦 **Street-collector QR codes**: each campaign generates a QR code. Volunteers can download a printable sheet for their collection box, so passers-by can scan it and check the documents on the spot.
- 🌍 **Bilingual UI**: switch between 🇷🇺 RU and 🇰🇬 KG live, with seeded campaigns written in both languages.
- 🔍 **Full financial transparency**: itemised budget, expenditure history with receipt numbers, and an AI report with its checks and red flags.
- ⚡ **Frictionless demo**: no login or registration. The app seeds 9 realistic Kyrgyz campaigns on first start.
- 🔌 **Works offline from AI**: without a `GROQ_API_KEY` a mock verifier takes over, so the demo never breaks.

## 🗂 Monorepo structure

```
jardam/
├── backend/                  FastAPI · clean architecture
│   ├── app/
│   │   ├── core/             settings, DB session, exceptions
│   │   ├── models/           SQLAlchemy: Campaign, Document, VerificationLog
│   │   ├── schemas/          Pydantic request/response models
│   │   ├── repositories/     DB access behind an abstract interface
│   │   ├── services/         business logic + Groq / mock verifiers
│   │   ├── routers/          HTTP endpoints + dependency wiring
│   │   ├── seed.py           first-run seeding (data in seed_data.py)
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
└── frontend/                 React + Vite + Tailwind
    ├── public/               logo.svg, favicon.svg
    └── src/
        ├── components/       Navbar, CampaignCard, QrSection, detail/…
        ├── pages/            FeedPage, DetailPage, CreatePage
        ├── hooks/            useFetch, useCampaign
        ├── locales/          ru.json, kg.json
        └── api.js
```

## 🚀 Quick start

**Prerequisites:** Python 3.12+, Node 18+

```bash
# 1 · Backend  → http://localhost:8000  (API docs at /docs)
cd backend
python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 2 · Frontend → http://localhost:5173
cd frontend
npm install
npm run dev
```

With no environment variables set, the backend uses a local SQLite file, seeds itself and runs the mock AI verifier.

## 🔐 Environment variables

| Done | Variable | Where | Purpose |
|:---:|---|---|---|
| ☐ | `DATABASE_URL` | backend | PostgreSQL URL (Render). Optional locally (SQLite fallback) |
| ☐ | `GROQ_API_KEY` | backend | Enables real AI verification. Optional (mock if empty) |
| ☐ | `CORS_ORIGINS` | backend | Allowed frontend origin(s), e.g. `https://jardam.vercel.app` |
| ☐ | `VITE_API_BASE_URL` | frontend | Backend URL, e.g. `https://jardam-api.onrender.com` |

Optional: `GROQ_MODEL` (defaults to a Llama 4 vision model).

## ☁️ Deploy

1. **Render:** create a free PostgreSQL, then a Web Service from `backend/` (Docker). Set `DATABASE_URL`, `GROQ_API_KEY` and `CORS_ORIGINS`.
2. **Vercel:** import the repo with root `frontend/` (Vite preset). Set `VITE_API_BASE_URL` to the Render URL.

---

<div align="center">Built for Kyrgyzstan 🇰🇬 with 💚 — <b>Жардам</b> means "help".</div>