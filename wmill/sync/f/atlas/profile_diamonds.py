from enum import Enum
import wmill
import pymongo
import pandas as pd 
from ydata_profiling import ProfileReport

MONGO_URI = wmill.get_variable("f/atlas/connection_string")


def main():
    client = pymongo.MongoClient(MONGO_URI)
    db = client['diamondfoundry']
    diamonds = db['diamonds']
    cursor = diamonds.find({})
    df = pd.DataFrame.from_records(cursor)
    profile = ProfileReport(df, title="Diamonds Profiling Report")
    return profile.to_html()