import pandas as pd
import pytest
from etl.transform import transform

def test_transform_clean_data():
    """
    Test that transform() correctly cleans 'Revenue' and standardizes columns.
    """
    # 1. Create Fake Data (Mocking)
    fake_data = {
        'Ranks': [1, 2],
        'Name': ['Company A', 'Company B'],
        'Industry': ['Tech', 'Retail'],
        'Revenue (USD millions)': ['$1,000.50', '$2.00'], # Dirty data
        'Profit': ['100', '2'],
        'Employees': ['50', '10']
    }
    df_fake = pd.DataFrame(fake_data)
    
    # 2. Run your code
    df_clean = transform(df_fake)
    
    # 3. Assert (Verify)
    
    # Check if column names are standardized
    assert 'ranks' in df_clean.columns, "Column 'Rank' should be renamed to 'ranks'"
    # The clean logic replaces spaces with underscores and lowercases.
    # 'Revenue (USD millions)' -> 'revenue_(usd_millions)'
    rev_col_name = 'revenue_(usd_millions)'
    assert rev_col_name in df_clean.columns, f"Revenue column {rev_col_name} not found"
    
    # Check if Revenue was cleaned to float (No $ or ,)
    # $1,000.50 -> 1000.5
    expected_revenue = 1000.5
    actual_revenue = df_clean[rev_col_name].iloc[0]
    
    assert actual_revenue == expected_revenue, f"Expected {expected_revenue}, but got {actual_revenue}"
    assert isinstance(actual_revenue, float), "Revenue should be a float"
    
def test_transform_missing_revenue():
    """
    Test how it handles missing revenue column (Edge Case).
    """
    fake_data = {
        'Rank': [1],
        'Name': ['No Money Corp']
    }
    df_fake = pd.DataFrame(fake_data)
    
    df_result = transform(df_fake)
    
    # It should return the original dataframe if revenue is missing (based on our logic)
    # Or at least not crash.
    assert len(df_result) == 1
