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

# Get a relationship by ID (returns a dictionary)
def get_relationship_by_id(relationship_id: int):
    query = """
    SELECT * FROM Relationship WHERE RelationshipID = %s;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (relationship_id,))
            result = cursor.fetchone()

    # Convert tuple result to dictionary
    if result:
        relationship_dict = {
            "id": result[0],  # RelationshipID
            "person1_id": result[1],  # Person1ID
            "person2_id": result[2],  # Person2ID
            "relationship_type": result[3],  # RelationshipType
            "status": result[4]  # Status
        }
    else:
        relationship_dict = {}

    return relationship_dict

# Get all relationships (returns a list of dictionaries)
def get_all_relationships():
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
        relationship_dict = {
            "id": row[0],  # RelationshipID
            "person1_id": row[1],  # Person1ID
            "person2_id": row[2],  # Person2ID
            "relationship_type": row[3],  # RelationshipType
            "status": row[4]  # Status
        }
        relationships.append(relationship_dict)

    return relationships
