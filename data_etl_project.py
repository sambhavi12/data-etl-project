
import pandas as pd
import requests
from sqlalchemy import create_engine
from datetime import datetime
import logging
import os
from io import StringIO
from urllib.parse import quote_plus

# 1. SETUP LOGGING
# Load environment variables (secrets) from the .env file
from dotenv import load_dotenv
import os

load_dotenv() # This command finds the .env file and loads the variables

logging.basicConfig(filename='etl_log.txt', level=logging.INFO, 
					format='%(asctime)s - %(levelname)s - %(message)s')

def log_progress(message):
	print(f"DEBUG: {message}")
	logging.info(message)

# 2. EXTRACT
def extract():
	log_progress("Starting extraction from Wikipedia...")
	url = "https://en.wikipedia.org/wiki/List_of_largest_companies_by_revenue"
	
	try:
		# CONCEPT: User-Agent
		# We need to tell Wikipedia who we are. If we don't, it thinks we are a bot and blocks us (403 Error).
		# This header makes us look like a normal web browser.
		headers = {
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
		}
		
		# Send the request with our "business card" (headers)
		response = requests.get(url, headers=headers)
		
		# Check if the request was successful (Status Code 200 = OK)
		if response.status_code == 200:
			# Parse the HTML text from the response
			tables = pd.read_html(StringIO(response.text))
			df = tables[0]
			log_progress("Extraction successful.")
			return df
		else:
			log_progress(f"Extraction failed. Status Code: {response.status_code}")
			return None
			
	except Exception as e:
		log_progress(f"Extraction failed: {e}")
		return None

# 3. TRANSFORM
def transform(df):
	log_progress("Starting transformation...")
	# Handle MultiIndex columns (nested headers from Wikipedia)
	if isinstance(df.columns, pd.MultiIndex):
		df.columns = df.columns.get_level_values(0)

	# Standardize column names
	df.columns = [c.replace(' ', '_').replace('[', '').replace(']', '').lower() for c in df.columns]
    
	# Target the Revenue column
	# Since we flattened the columns, it should just be 'revenue'
	try:
		rev_col = [c for c in df.columns if 'revenue' in c][0]
	except IndexError:
		log_progress(f"Revenue column not found in: {df.columns}")
		return df # Return original or fail gracefully? Better to raise error or return empty.

    
	# Clean Revenue: Remove $, commas, and non-numeric junk
	# Added 'r' before the strings to make them raw strings
	df[rev_col] = df[rev_col].replace(r'[\$,]', '', regex=True).str.extract(r'(\d+\.?\d*)').astype(float)
    
	# Add a processing timestamp
	df['processed_at'] = datetime.now()
    
	log_progress("Transformation successful.")
	return df[['ranks', 'name', 'industry', rev_col, 'processed_at']]

# 4. LOAD
def load(df):
	log_progress("Connecting to PostgreSQL...")
	# Change these to your actual database credentials
	DB_USER = 'postgres'
	# CONCEPT: Environment Variables
	# We fetch the password from the hidden .env file so it's not visible in the code.
	DB_PASS = os.getenv('DB_PASS') 
	DB_HOST = 'localhost'
	DB_PORT = os.getenv('DB_PORT', '5432')
	DB_NAME = 'postgres'

	if not DB_PASS:
		log_progress("Error: DB_PASS not found in .env file.")
		return

	try:
		# Using the psycopg2-binary driver we just installed
		# URL encode the password to handle special characters like '@'
		encoded_pass = quote_plus(DB_PASS)
		engine = create_engine(f'postgresql+psycopg2://{DB_USER}:{encoded_pass}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
		df.to_sql('largest_companies', engine, if_exists='replace', index=False)
		log_progress("Data loaded to Database successfully.")
	except Exception as e:
		log_progress(f"Loading failed: {e}")

if __name__ == "__main__":
	log_progress("ETL Process Started")
	data = extract()
	if data is not None:
		clean_data = transform(data)
		load(clean_data)
	log_progress("ETL Process Completed")
