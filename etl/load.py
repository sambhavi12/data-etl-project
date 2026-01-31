import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
from urllib.parse import quote_plus
from .utils import log_progress

# Load environment variables once at module level (or inside function)
load_dotenv()

def load(df):
    """
    Loads data into PostgreSQL database. 
    Requires .env file with DB details.
    """
    log_progress("Connecting to PostgreSQL...")
    
    DB_USER = 'postgres'
    DB_PASS = os.getenv('DB_PASS')
    DB_HOST = 'localhost'
    
    # Use the port found in .env, default to 5432 if missing.
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = 'postgres'

    if not DB_PASS:
        log_progress("Error: DB_PASS not found in .env file.")
        return

    try:
        # URL encode the password to safely handle special characters (e.g., '@')
        encoded_pass = quote_plus(DB_PASS)
        
        # Create connection string
        conn_string = f'postgresql+psycopg2://{DB_USER}:{encoded_pass}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
        
        engine = create_engine(conn_string)
        
        # Write to SQL
        df.to_sql('largest_companies', engine, if_exists='replace', index=False)
        
        log_progress("Data loaded to Database successfully.")
    except Exception as e:
        log_progress(f"Loading failed: {e}")
