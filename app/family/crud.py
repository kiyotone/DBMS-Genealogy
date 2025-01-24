import psycopg2
from ..database import get_db_connection

# Create a family (using raw SQL)
def create_family(family_name: str, origin_country: str, description: str = None):
    query = """
    INSERT INTO Family (FamilyName, OriginCountry, Description)
    VALUES (%s, %s, %s);
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (family_name, origin_country, description))
            conn.commit()

# Get family by ID (using raw SQL)
def get_family_by_id(family_id: int):
    query = """
    SELECT * FROM Family WHERE FamilyID = %s;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (family_id,))
            result = cursor.fetchone()
    
    return result

# Get all families (using raw SQL)
def get_families():
    query = """
    SELECT * FROM Family;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
    
    return result
