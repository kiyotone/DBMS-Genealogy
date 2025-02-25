from ..database import get_db_connection

# Create a new relationship
def create_relationship(person1id: int, person2id: int, relationshiptype: str, status: str):
    try:
        # First, check if a relationship already exists between the two persons
        check_query = """
        SELECT * FROM Relationship
        WHERE (Person1ID = %s AND Person2ID = %s) OR (Person1ID = %s AND Person2ID = %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(check_query, (person1id, person2id, person2id, person1id))
                existing_relation = cursor.fetchone()

        if existing_relation:
            # If a relationship already exists, return a message indicating so
            return {"status": 400, "message": "A relationship between these two persons already exists."}

        # If no relationship exists, proceed to create a new one
        insert_query = """
        INSERT INTO Relationship (Person1ID, Person2ID, RelationshipType, Status)
        VALUES (%s, %s, %s, %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(insert_query, (person1id, person2id, relationshiptype, status))
                conn.commit()

        # Return success status with the inserted data
        return {"status": 200, "data": {"person1id": person1id, "person2id": person2id, "relationshiptype": relationshiptype, "status": status}}

    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}

# Get a relationship by ID (returns a dictionary)
def get_relationship_by_id(relationship_id: int):
    try:
        query = """
        SELECT * FROM Relationship WHERE RelationshipID = %s;
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (relationship_id,))
                result = cursor.fetchone()

        # Convert tuple result to dictionary
        if result:
            person1_name = get_person_name_by_id(result[1])
            person2_name = get_person_name_by_id(result[2])
            relationship_dict = {
                "id": result[0],  # RelationshipID
                "person1_id": result[1],  # Person1ID
                "person2_id": result[2],  # Person2ID
                "person1_name": person1_name,
                "person2_name": person2_name,                                
                "relationship_type": result[3],  # RelationshipType
                "status": result[4]  # Status
            }
            return {"status": 200, "data": relationship_dict}  # Success response
        else:
            return {"status": 404, "data": {}}  # Not found

    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}

# Get all relationships (returns a list of dictionaries)
def get_all_relationships():
    try:
        query = """
        SELECT * FROM Relationship;
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        # Convert list of tuples to list of dictionaries
        relationships = []
        for row in result:
            person1_name = get_person_name_by_id(row[1])
            person2_name = get_person_name_by_id(row[2])
            relationship_dict = {
                "id": row[0],  # RelationshipID
                "person1_id": row[1],  # Person1ID
                "person2_id": row[2],  # Person2ID
                "person1_name": person1_name,
                "person2_name": person2_name,
                "relationship_type": row[3],  # RelationshipType
                "status": row[4]  # Status
            }
            relationships.append(relationship_dict)

        return {"status": 200, "data": relationships}  # Success response with all relationships

    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}

def get_person_name_by_id(person_id: int):
    try:
        query = """
        SELECT FirstName, LastName FROM Person WHERE PersonID = %s;
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (person_id,))
                result = cursor.fetchone()

        if result:
            return f"{result[0]} {result[1]}"
        else:
            return "Unknown"

    except Exception as e:
        return "Unknown"  # Return "Unknown" if there's an
    

def get_relationship_by_persons(person1id,person2id):
    try :
        query = """
        SELECT * FROM Relationship WHERE (Person1ID = %s AND Person2ID = %s) OR (Person1ID = %s AND Person2ID = %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (person1id, person2id, person2id, person1id))
                result = cursor.fetchone()
        if result:
            return result
        else:
            return None
    except Exception as e:        
        return None
    