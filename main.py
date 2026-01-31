from etl.extract import extract
from etl.transform import transform
from etl.load import load
from etl.utils import log_progress

if __name__ == "__main__":
    log_progress("ETL Process Started (Modular)")
    
    # 1. Extract
    data = extract()
    
    if data is not None:
        # 2. Transform
        clean_data = transform(data)
        
        # 3. Load
        load(clean_data)
        
    log_progress("ETL Process Completed (Modular)")
