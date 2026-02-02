import logging
import os
import requests

# Configure logging configuration - reusable by other modules
# We set force=True to reconfigure if called multiple times (useful in notebooks/testing)
logging.basicConfig(
    filename='etl_log.txt', 
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s',
    force=True
)

def log_progress(message):
    """
    Logs a message to the console, log file, and the Dashboard API.
    """
    print(f"DEBUG: {message}")
    logging.info(message)
    
    # Send to Dashboard API
    try:
        requests.post('http://localhost:3000/api/logs', json={'message': message}, timeout=1)
    except:
        pass # Fail silently if dashboard is not running
