import logging
import os

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
    Logs a message to both the console (debug) and the log file (info).
    """
    print(f"DEBUG: {message}")
    logging.info(message)
