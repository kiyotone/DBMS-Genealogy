import psycopg2
from psycopg2.extras import DictCursor
from ..database import get_db_connection

# Create a family (using raw SQL)
def create_family(familyname: str = None, origincountry: str = None, description: str = None):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                # Check if the family already exists
                cursor.execute("SELECT FamilyID FROM Family WHERE FamilyName = %s;", (familyname,))
                existing_family = cursor.fetchone()

                if existing_family:
                    return {"status": 200, "data": {"familyId": existing_family[0]}}  # Return existing FamilyID if found
                
                # Get the next available FamilyID by selecting the max and incrementing by 1
                cursor.execute("SELECT MAX(FamilyID) FROM Family;")
                result = cursor.fetchone()
                
                familyId = 1 if result[0] is None else result[0] + 1  # If no data, start from 1
                
                # Insert the new family with the generated familyId
                query = """
                INSERT INTO Family (FamilyID, FamilyName, OriginCountry, Description)
                VALUES (%s, %s, %s, %s);
                """
                
                cursor.execute(query, (familyId, familyname, origincountry, description if description else None))
                
                conn.commit()  # Commit the transaction
        
        return {"status": 200, "data": {"familyId": familyId}}  # Return the generated familyId

    except Exception as e:
        return {"status": 500, "message": str(e)}  # Internal Server Error

# Get a family by its ID
def get_family_by_id(family_id: int):
    try:
        query = """
        SELECT * FROM Family WHERE FamilyID = %s;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (family_id,))
                result = cursor.fetchone()  # Fetch one family
        
        # Custom dictionary for the result
        if result:
            custom_dict = {
                "id": result[0],  # FamilyID
                "name": result[1],  # FamilyName
                "origin_country": result[3],  # OriginCountry
                "description": result[2]  # Description
            }
            return {"status": 200, "data": custom_dict}  # Success response
        else:
            return {"status": 404, "data": {}}  # Not found

    except Exception as e:
        return {"status": 500, "message": str(e)}  # Internal Server Error

# Get all families
def get_families():
    try:
        query = """
        SELECT * FROM Family;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()  # Fetch all families
        
        # Custom dictionary for each record
        families = []
        for row in result:
            custom_dict = {
                "id": row[0],  # FamilyID
                "name": row[1],  # FamilyName
                "origin_country": row[3],  # OriginCountry
                "description": row[2]  # Description
            }
            families.append(custom_dict)

        return {"status": 200, "data": families}  # Success response with data

    except Exception as e:
        return {"status": 500, "message": str(e)}  # Internal Server Error
