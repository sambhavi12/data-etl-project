# Automated Data ETL Pipeline (Wikipedia → PostgreSQL)

A production-grade ETL (Extract, Transform, Load) pipeline that scrapes financial data from Wikipedia, cleans and normalizes it, and loads it into a PostgreSQL database. Designed with **industrial data engineering practices** including modular architecture, automated testing, and secure credential management.

## 🏗 Architecture
**Wikipedia** (Source) ➔ **Python Scripts** (Extract/Transform) ➔ **PostgreSQL** (Destination)

- **Extract**: Scrapes HTML tables using `requests` with custom headers (User-Agent rotation).
- **Transform**: 
  - Standardizes column names (snake_case).
  - Cleans currency data (Regex removal of `$` and `,`).
  - Flattening MultiIndex headers.
- **Load**: Inserts data into PostgreSQL using `SQLAlchemy` (safe paramaterization).
- **Automation**: Shell script wrapper (`run_etl.sh`) for Cron scheduling.

## 🛠 Tech Stack
- **Language**: Python 3.13
- **Libraries**: Pandas, SQLAlchemy, Requests, Pytest, Python-Dotenv
- **Database**: PostgreSQL 16+
- **DevOps**: Cron (Automation), Pytest (Unit Testing)

## 📂 Project Structure
```bash
data_etl_project/
├── etl/                 # Source Code Package
│   ├── extract.py       # Scrapes data from web
│   ├── transform.py     # Cleans and normalizes pandas DataFrame
│   ├── load.py          # Loading logic (Postgres)
│   └── utils.py         # Shared logging configuration
├── tests/               # Unit Test Suite
│   └── test_transform.py
├── main.py              # Entry point for the pipeline
├── run_etl.sh           # Bash wrapper for Cron automation
├── requirements.txt     # Python dependencies
└── .env                 # Database credentials (Not committed)
```

## 🚀 How to Run

### 1. Prerequisites
- Python 3.9+
- PostgreSQL installed and running locally.

### 2. Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/YourUsername/data-etl-project.git
cd data-etl-project
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Configuration
Create a `.env` file in the root directory:
```bash
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
```

### 4. Run Pipeline
```bash
python main.py
```
*Check `etl_log.txt` for execution details.*

### 5. Run Tests
```bash
pytest
```

## 📈 Key Features
- **Robust Error Handling**: Handles 403 Forbidden errors and missing columns gracefully.
- **Security**: Database credentials are never hardcoded (using `python-dotenv`).
- **Data Quality**: Unit tests ensure data cleaning logic handles messy formatting (e.g., "$1,200.50").
- **Modular Design**: Separation of concerns allows for easy maintenance and scaling.

## 👤 Author
[Shambhavi Pandey] - Data Engineering Enthusiast
