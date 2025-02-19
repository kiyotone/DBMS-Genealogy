import psycopg2
from psycopg2.extras import DictCursor
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

def get_family_by_id(family_id: int):
    query = """
    SELECT * FROM Family WHERE FamilyID = %s;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (family_id,))
            result = cursor.fetchone()  # Fetch one family
    
    # Custom dictionary
    if result:
        custom_dict = {
            "id": result[0],  # FamilyID
            "name": result[1],  # FamilyName
            "origin_country": result[3],  # OriginCountry
            "description": result[2]  # Description
        }
    else:
        custom_dict = {}
    
    return custom_dict


# Get all families (using raw SQL)
def get_families():
    query = """
    SELECT * FROM Family;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()  # Fetch all families
    
    # Create custom dictionary for each record
    families = []
    for row in result:
        custom_dict = {
            "id": row[0],  # FamilyID
            "name": row[1],  # FamilyName
            "origin_country": row[3],  # OriginCountry
            "description": row[2]  # Description
        }
        families.append(custom_dict)
    return families
