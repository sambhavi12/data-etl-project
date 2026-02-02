# Direct | Autonomous Data Command Center 🟢

A full-stack **Data Engineering Platform** featuring a high-performance Python ETL engine and a cinematic real-time dashboard.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Direct-emerald?style=for-the-badge&logo=vercel)](https://direct-website.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Overview
**Direct** is a "Command Center" for autonomous data agents. It visualizes the entire lifecycle of data—from raw extraction to database storage—in a production-ready interface designed for data engineers.

### 🏗 System Architecture
**Wikipedia** (Source) ➔ **Python ETL** (Engine) ➔ **PostgreSQL** (Storage) ➔ **Next.js Dashboard** (Visualization)

## 🖥️ Command Center (Frontend)
The dashboard is built for high information density and visual impact.
- **Tech Stack**: Next.js 14, TypeScript, TailwindCSS, Framer Motion.
- **Features**:
  - **Live Audit Stream**: WebSocket-style real-time logs.
  - **Visual Data**: Recharts integration for data quality trends.
  - **Bento Grid Layout**: Optimized for professional workflows.
  - **Glassmorphism UI**: "Deep Charcoal" & Emerald aesthetic.

## ⚙️ ETL Engine (Backend)
A production-grade pipeline that extracts financial data, normalizes it, and ensures data integrity.
- **Tech Stack**: Python 3.13, Pandas, SQLAlchemy, PostgreSQL.
- **Extract**: Scrapes HTML tables using `requests` with User-Agent rotation.
- **Transform**: Cleans currency data (`$1,200.50` → `1200.50`), normalizes headers to `snake_case`.
- **Load**: Transactional inserts into PostgreSQL using `SQLAlchemy`.
- **Automation**: Cron-ready shell scripts.

## 📂 Project Structure
```bash
data_etl_project/
├── direct/              # Frontend Application (Next.js)
│   ├── src/app/         # App Router & Pages
│   └── src/components/  # Dashboard UI Components
├── etl/                 # Backend ETL Package
│   ├── extract.py       # Scrapes data from web
│   ├── transform.py     # Cleans and normalizes
│   ├── load.py          # Loading logic (Postgres)
│   └── utils.py         # Shared logging
├── tests/               # Unit Test Suite
├── main.py              # Pipeline Entry Point
└── run_etl.sh           # Automation Script
```

## 🚀 How to Run

### 1. Backend (ETL Pipeline)
```bash
# Setup Python Environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run the Pipeline
python main.py
```

### 2. Frontend (Dashboard)
```bash
cd direct
npm install
npm run dev
# Open http://localhost:3000
```

## 📈 Key Features
- **Real-time Monitoring**: Watch agents (validators, scrapers) work in real-time.
- **Robust Error Handling**: Gracefully handles network failures and schema changes.
- **Security**: Database credentials managed via `.env`.
- **Data Quality**: Automated unit tests for data transformation logic.

## 👤 Author
[Shambhavi Pandey] - Data Engineering Enthusiast
