from ..database import get_db_connection

# Create a new relationship
def create_relationship(person1_id: int, person2_id: int, relationship_type: str, status: str):
    query = """
    INSERT INTO Relationship (Person1ID, Person2ID, RelationshipType, Status)
    VALUES (%s, %s, %s, %s);
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (person1_id, person2_id, relationship_type, status))
            conn.commit()

# Get a relationship by ID
def get_relationship_by_id(relationship_id: int):
    query = """
    SELECT * FROM Relationship WHERE RelationshipID = %s;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (relationship_id,))
            result = cursor.fetchone()

    return result

# Get all relationships
def get_all_relationships():
    query = """
    SELECT * FROM Relationship;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

    return result
