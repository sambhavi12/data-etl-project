import pandas as pd
import requests
from io import StringIO

url = "https://en.wikipedia.org/wiki/List_of_largest_companies_by_revenue"
headers = {
    "User-Agent": "Mozilla/5.0"
}
response = requests.get(url, headers=headers)
tables = pd.read_html(StringIO(response.text))
df = tables[0]
print("Columns:", df.columns)
print("First row:", df.head(1))
