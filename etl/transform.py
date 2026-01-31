import pandas as pd
from datetime import datetime
from .utils import log_progress

def transform(df):
    """
    Transfroms the raw dataframe: cleans columns, parses revenue, adds timestamp.
    """
    log_progress("Starting transformation...")
    
    # Handle MultiIndex columns (nested headers from Wikipedia)
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    # Standardize column names
    df.columns = [c.replace(' ', '_').replace('[', '').replace(']', '').lower() for c in df.columns]
    
    # Target the Revenue column
    try:
        rev_col = [c for c in df.columns if 'revenue' in c][0]
    except IndexError:
        log_progress(f"Revenue column not found in: {df.columns}")
        return df
    
    # Clean Revenue: Remove $, commas, and non-numeric junk
    df[rev_col] = df[rev_col].replace(r'[\$,]', '', regex=True).str.extract(r'(\d+\.?\d*)').astype(float)
    
    # Add a processing timestamp
    df['processed_at'] = datetime.now()
    
    log_progress("Transformation successful.")
    
    # Note: 'rank' from wikipedia usually comes as 'ranks' or similar. 
    # We use 'ranks' based on our debugging.
    try:
        return df[['ranks', 'name', 'industry', rev_col, 'processed_at']]
    except KeyError as e:
         log_progress(f"Column selection failed: {e}. Available columns: {df.columns}")
         return df # Return all if selection fails, for debugging
