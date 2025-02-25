from ..database import get_db_connection

# Create a new relationship
def create_relationship(person1id: int, person2id: int, relationshiptype: str, status: str):
    try:
        check_query = """
        SELECT * FROM Relationship
        WHERE (Person1ID = %s AND Person2ID = %s) OR (Person1ID = %s AND Person2ID = %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(check_query, (person1id, person2id, person2id, person1id))
                existing_relation = cursor.fetchone()

        if existing_relation:
            return {"status": 400, "message": "A relationship between these two persons already exists."}

        insert_query = """
        INSERT INTO Relationship (Person1ID, Person2ID, RelationshipType, Status)
        VALUES (%s, %s, %s, %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(insert_query, (person1id, person2id, relationshiptype, status))
                conn.commit()

        return {"status": 200, "data": {"person1_id": person1id, "person2_id": person2id}}

    except Exception as e:
        return {"status": 500, "message": str(e)}

# Get a relationship by ID
def get_relationship_by_id(relationship_id: int):
    try:
        query = """
        SELECT RelationshipID, Person1ID, Person2ID, RelationshipType, Status
        FROM Relationship WHERE RelationshipID = %s;
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (relationship_id,))
                result = cursor.fetchone()

        if result:
            relationship_dict = {
                "id": result[0],
                "person1_id": result[1],
                "person2_id": result[2],
                "relationship_type": result[3],
                "status": result[4]
            }
            return {"status": 200, "data": relationship_dict}
        else:
            return {"status": 404, "data": {}}

    except Exception as e:
        return {"status": 500, "message": str(e)}

# Get all relationships
def get_all_relationships():
    try:
        query = """
        SELECT RelationshipID, Person1ID, Person2ID, RelationshipType, Status FROM Relationship;
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        relationships = [
            {
                "id": row[0],
                "person1_id": row[1],
                "person2_id": row[2],
                "relationship_type": row[3],
                "status": row[4]
            }
            for row in result
        ]

        return {"status": 200, "data": relationships}

    except Exception as e:
        return {"status": 500, "message": str(e)}
