
from etl.extract import extract
from etl.transform import transform
from etl.load import load
from etl.utils import log_progress
import time

if __name__ == "__main__":
    log_progress("Initializing ETL Pipeline...")
    time.sleep(1) # Simulate startup
    
    df = extract()
    
    if df is not None:
        time.sleep(1)
        df_transformed = transform(df)
        
        if df_transformed is not None:
            time.sleep(1)
            load(df_transformed)
            log_progress("ETL Pipeline Execution Completed Successfully.")
        else:
            log_progress("ETL Pipeline Failed at Transformation Stage.")
    else:
        log_progress("ETL Pipeline Failed at Extraction Stage.")
