#!/bin/bash

# Cron Execution Script for Data ETL Project
# This script ensures the cron job runs with the correct directory and environment.

# 1. Navigate to the project directory
cd /Users/shambhavipandey/data_etl_project

# 2. Run the main ETL script using the virtual environment's Python
# We redirect stdout and stderr to the log file explicitly as well, just in case python crashes before logging starts.
./venv/bin/python main.py >> etl_log.txt 2>&1
