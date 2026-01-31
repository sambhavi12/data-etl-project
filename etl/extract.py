import requests
import pandas as pd
from io import StringIO
from .utils import log_progress

def extract():
    """
    Extracts data from Wikipedia using requests and pandas.
    Returns a pandas DataFrame or None if failed.
    """
    log_progress("Starting extraction from Wikipedia...")
    url = "https://en.wikipedia.org/wiki/List_of_largest_companies_by_revenue"
    
    try:
        # CONCEPT: User-Agent
        # We need to tell Wikipedia who we are to avoid 403 Forbidden checks.
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            # Use StringIO to avoid the "Expected file path" warning/error
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
