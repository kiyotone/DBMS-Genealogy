import psycopg2
from psycopg2 import sql
from contextlib import contextmanager
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# PostgreSQL connection URL
DATABASE_URL = os.getenv("DATABASE_URL")


# Connection context manager
@contextmanager
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()

# Function to create tables
def create_tables():
    table_creation_queries = """
    CREATE TABLE IF NOT EXISTS Family (
        FamilyID SERIAL PRIMARY KEY,
        FamilyName VARCHAR(255),
        Description TEXT,
        OriginCountry VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS Person (
        PersonID SERIAL PRIMARY KEY,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Gender VARCHAR(50),
        DateOfBirth DATE,
        DateOfDeath DATE,
        MaternalFamilyID INT REFERENCES Family(FamilyID),
        PaternalFamilyID INT REFERENCES Family(FamilyID)
    );

    CREATE TABLE IF NOT EXISTS Event (
        EventID SERIAL PRIMARY KEY,
        EventType VARCHAR(255),
        Date DATE,
        Location VARCHAR(255),
        Description TEXT,
        AssociatedPersonID INT REFERENCES Person(PersonID),
        AssociatedFamilyID INT REFERENCES Family(FamilyID)
    );

    CREATE TABLE IF NOT EXISTS Relationship (
        RelationshipID SERIAL PRIMARY KEY,
        Person1ID INT REFERENCES Person(PersonID),
        Person2ID INT REFERENCES Person(PersonID),
        RelationshipType VARCHAR(255),
        Status VARCHAR(255)
    );
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(table_creation_queries)
            conn.commit()
